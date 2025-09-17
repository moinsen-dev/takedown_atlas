"""Account and magic link helpers."""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from fastapi import HTTPException, status
from sqlmodel import Session, select

from ..core.config import get_settings
from ..models import Account, AccountRole, MagicLinkToken
from .security import create_magic_link_token, hash_token

settings = get_settings()


def get_account_by_email(session: Session, email: str) -> Optional[Account]:
  normalized = email.strip().lower()
  return session.exec(select(Account).where(Account.email == normalized)).first()


def get_or_create_account(session: Session, email: str) -> Account:
  normalized = email.strip().lower()
  account = get_account_by_email(session, normalized)
  if account:
    return account
  allowed_domains = settings.magic_link_allowed_domains
  if allowed_domains:
    domain = normalized.split("@")[-1]
    if domain not in {d.lower() for d in allowed_domains}:
      raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email domain not permitted")
  default_role = AccountRole(settings.magic_link_default_role)
  account = Account(email=normalized, role=default_role)
  session.add(account)
  session.flush()
  return account


def issue_magic_link(session: Session, account: Account, *, expires_minutes: int = 30) -> tuple[str, MagicLinkToken]:
  token, hashed_token, expires_at = create_magic_link_token(expires_minutes=expires_minutes)
  magic_link = MagicLinkToken(
    account_id=account.id,
    token_hash=hashed_token,
    expires_at=expires_at,
    one_time=True,
  )
  session.add(magic_link)
  session.flush()
  return token, magic_link


def verify_magic_link_token(session: Session, token: str) -> Account:
  hashed = hash_token(token)
  magic_link = session.exec(
    select(MagicLinkToken).where(MagicLinkToken.token_hash == hashed)
  ).first()
  if not magic_link:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
  if magic_link.expires_at < datetime.utcnow():
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
  if magic_link.one_time and magic_link.used_at is not None:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token already used")
  if not magic_link.account:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token not linked to account")

  magic_link.used_at = datetime.utcnow()
  session.add(magic_link)

  account = magic_link.account
  account.last_login_at = datetime.utcnow()
  session.add(account)
  session.flush()
  return account
