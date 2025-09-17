"""Security helper functions for hashing tokens and generating magic links."""
from __future__ import annotations

import secrets
from datetime import datetime, timedelta
from hashlib import blake2b
from typing import Tuple

from fastapi import HTTPException, status
from passlib.context import CryptContext

from ..core.config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_token(token: str) -> str:
  digest = blake2b(digest_size=32)
  digest.update(token.encode("utf-8"))
  return digest.hexdigest()

def create_status_token() -> Tuple[str, str]:
  token = secrets.token_urlsafe(32)
  return token, hash_token(token)

def create_magic_link_token(expires_minutes: int = 15) -> Tuple[str, str, datetime]:
  token = secrets.token_urlsafe(48)
  hashed = pwd_context.hash(token)
  expires_at = datetime.utcnow() + timedelta(minutes=expires_minutes)
  return token, hashed, expires_at

def verify_magic_token(raw_token: str, hashed_token: str) -> bool:
  return pwd_context.verify(raw_token, hashed_token)

def require_role(user_role: str, allowed: tuple[str, ...]) -> None:
  if user_role not in allowed:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
