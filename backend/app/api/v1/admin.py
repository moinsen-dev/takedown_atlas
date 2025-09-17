"""Admin endpoints for handling notice-and-action workflows."""
from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ...models import Account, AccountRole, NoticeActionRequest
from ...schemas.moderation import NoticeActionCreate, NoticeActionResponse
from ...services.security import require_role
from ..deps import get_current_account, get_db

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/notices", response_model=NoticeActionResponse, status_code=status.HTTP_201_CREATED)
def create_notice(
  payload: NoticeActionCreate,
  db: Session = Depends(get_db),
  account: Account = Depends(get_current_account),
) -> NoticeActionResponse:
  require_role(account.role.value, (AccountRole.ADMIN.value,))
  notice = NoticeActionRequest(
    incident_id=payload.incident_id,
    requester_type=payload.requester_type,
    request_summary=payload.request_summary,
    reporter_email=payload.reporter_email,
  )
  db.add(notice)
  db.commit()
  db.refresh(notice)
  return NoticeActionResponse.from_orm(notice)


@router.get("/notices/{notice_id}", response_model=NoticeActionResponse)
def get_notice(
  notice_id: UUID,
  db: Session = Depends(get_db),
  account: Account = Depends(get_current_account),
) -> NoticeActionResponse:
  require_role(account.role.value, (AccountRole.ADMIN.value,))
  notice = db.get(NoticeActionRequest, notice_id)
  if not notice:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notice not found")
  return NoticeActionResponse.from_orm(notice)
