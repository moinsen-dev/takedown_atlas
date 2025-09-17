"""Account and access control models."""
from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from .base import BaseTable

if TYPE_CHECKING:
  from .reporter import MagicLinkToken


class AccountRole(str, Enum):
  VERIFIER = "verifier"
  ADMIN = "admin"
  RESEARCHER = "researcher"


class Account(BaseTable, table=True):
  __tablename__ = "accounts"

  email: str = Field(unique=True, index=True, nullable=False)
  role: AccountRole = Field(nullable=False)
  display_name: Optional[str] = Field(default=None, nullable=True)
  last_login_at: Optional[datetime] = Field(default=None, nullable=True)

  magic_links: list["MagicLinkToken"] = Relationship(back_populates="account")
