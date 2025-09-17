"""Security helper functions for hashing tokens and generating auth artefacts."""
from __future__ import annotations

import secrets
from datetime import datetime, timedelta
from hashlib import blake2b
from typing import Any, Tuple

from fastapi import HTTPException, status
from jose import JWTError, jwt

from ..core.config import get_settings

settings = get_settings()


def hash_token(token: str) -> str:
  digest = blake2b(digest_size=32)
  digest.update(token.encode("utf-8"))
  return digest.hexdigest()


def create_status_token() -> Tuple[str, str]:
  token = secrets.token_urlsafe(32)
  return token, hash_token(token)


def create_magic_link_token(expires_minutes: int = 15) -> Tuple[str, str, datetime]:
  token = secrets.token_urlsafe(48)
  hashed = hash_token(token)
  expires_at = datetime.utcnow() + timedelta(minutes=expires_minutes)
  return token, hashed, expires_at


def verify_magic_token(raw_token: str, hashed_token: str) -> bool:
  return hash_token(raw_token) == hashed_token


def require_role(user_role: str, allowed: tuple[str, ...]) -> None:
  if user_role not in allowed:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")


def create_access_token(subject: str, role: str, *, expires_minutes: int | None = None) -> str:
  expiry = expires_minutes or settings.security_token_expiry_minutes
  expire_at = datetime.utcnow() + timedelta(minutes=expiry)
  payload = {"sub": subject, "role": role, "exp": expire_at}
  return jwt.encode(payload, settings.security_secret_key, algorithm="HS256")


def decode_access_token(token: str) -> dict[str, Any]:
  try:
    return jwt.decode(token, settings.security_secret_key, algorithms=["HS256"])
  except JWTError as exc:  # noqa: BLE001
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc
