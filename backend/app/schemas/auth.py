"""Auth related schemas."""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr

from ..models.account import AccountRole


class MagicLinkRequest(BaseModel):
  email: EmailStr


class MagicLinkResponse(BaseModel):
  message: str


class MagicLinkVerifyRequest(BaseModel):
  token: str


class AuthSession(BaseModel):
  access_token: str
  token_type: str = "bearer"
  account_id: str
  role: AccountRole
  expires_at: datetime
  display_name: Optional[str]
