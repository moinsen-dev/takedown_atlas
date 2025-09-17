"""Business profile and claim helpers."""
from __future__ import annotations

from uuid import UUID

from sqlmodel import Session, select

from ..models import Business, BusinessClaim, BusinessClaimStatus
from ..schemas.business import BusinessClaimCreate


def get_business(session: Session, business_id: UUID) -> Business | None:
  return session.get(Business, business_id)


def submit_claim(session: Session, business: Business, payload: BusinessClaimCreate) -> BusinessClaim:
  claim = BusinessClaim(
    business_id=business.id,
    contact_name=payload.contact_name,
    contact_email=payload.contact_email,
    justification=payload.justification,
  )
  session.add(claim)
  session.flush()
  return claim


def list_claims_by_email(session: Session, email: str) -> list[BusinessClaim]:
  stmt = select(BusinessClaim).where(BusinessClaim.contact_email == email)
  return list(session.exec(stmt))


def update_claim_status(
  session: Session,
  claim: BusinessClaim,
  status: BusinessClaimStatus,
  reviewer_id: str,
  notes: str | None = None,
) -> BusinessClaim:
  claim.status = status
  claim.reviewer_id = reviewer_id
  claim.justification = claim.justification or notes
  session.add(claim)
  session.flush()
  return claim
