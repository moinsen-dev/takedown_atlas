"""Authentication endpoints for staff accounts."""
from __future__ import annotations

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ...core.config import get_settings
from ...schemas.auth import (
  AuthSession,
  MagicLinkRequest,
  MagicLinkResponse,
  MagicLinkVerifyRequest,
)
from ...services import auth as auth_service
from ...services.notifications import send_magic_link
from ...services.security import create_access_token
from ..deps import get_db

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.post("/magic-links", response_model=MagicLinkResponse)
def request_magic_link(
  payload: MagicLinkRequest,
  db: Session = Depends(get_db),
) -> MagicLinkResponse:
  account = auth_service.get_or_create_account(db, payload.email)
  token, magic_link = auth_service.issue_magic_link(db, account)
  db.commit()

  login_url = f"{settings.base_url}/magic-login?token={token}"
  try:
    send_magic_link(account.email, login_url)
  except Exception as exc:  # noqa: BLE001 email failures bubble up for user feedback
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send email") from exc

  return MagicLinkResponse(message="Magic link sent to registered email")


@router.post("/magic-links/verify", response_model=AuthSession)
def verify_magic_link(
  payload: MagicLinkVerifyRequest,
  db: Session = Depends(get_db),
) -> AuthSession:
  account = auth_service.verify_magic_link_token(db, payload.token)
  db.commit()
  expiry_minutes = settings.security_token_expiry_minutes
  expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
  access_token = create_access_token(str(account.id), account.role.value, expires_minutes=expiry_minutes)
  return AuthSession(
    access_token=access_token,
    account_id=str(account.id),
    role=account.role,
    expires_at=expires_at,
    display_name=account.display_name,
  )
