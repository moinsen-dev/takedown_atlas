"""Business-facing endpoints."""
from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ...schemas.business import BusinessClaimCreate, BusinessClaimResponse
from ...schemas.incident import BusinessPublicProfile
from ...services.business import get_business, submit_claim
from ..deps import get_db

router = APIRouter(prefix="/businesses", tags=["businesses"])


@router.get("/{business_id}", response_model=BusinessPublicProfile)
def business_profile(business_id: UUID, db: Session = Depends(get_db)) -> BusinessPublicProfile:
  business = get_business(db, business_id)
  if not business:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
  return BusinessPublicProfile.from_orm(business)


@router.post("/{business_id}/claims", response_model=BusinessClaimResponse, status_code=status.HTTP_201_CREATED)
def create_business_claim(
  business_id: UUID,
  payload: BusinessClaimCreate,
  db: Session = Depends(get_db),
) -> BusinessClaimResponse:
  business = get_business(db, business_id)
  if not business:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
  claim = submit_claim(db, business, payload)
  db.commit()
  db.refresh(claim)
  return BusinessClaimResponse.from_orm(claim)
