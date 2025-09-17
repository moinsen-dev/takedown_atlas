"""Shared dependencies for FastAPI routes."""
from __future__ import annotations

from collections.abc import Generator
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlmodel import Session

from ..db import SessionLocal
from ..models import Account
from ..services.security import decode_access_token


def get_db() -> Generator[Session, None, None]:
  session = SessionLocal()
  try:
    yield session
  finally:
    session.close()


DbSession = Depends(get_db)


bearer_scheme = HTTPBearer(auto_error=False)


def get_current_account(
  credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
  db: Session = Depends(get_db),
) -> Account:
  if credentials is None:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")
  payload = decode_access_token(credentials.credentials)
  account_id = payload.get("sub")
  if not account_id:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
  account = db.get(Account, UUID(account_id))
  if not account:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account not found")
  return account
