"""Reporter and authentication models."""
from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

from sqlmodel import Field, Relationship

from .base import BaseTable

if TYPE_CHECKING:
  from .account import Account
  from .submission import Submission


class Reporter(BaseTable, table=True):
  __tablename__ = "reporters"

  email_hash: str = Field(index=True, nullable=False)
  contact_method: Optional[str] = Field(default=None, nullable=True)
  consent_public_dataset: bool = Field(default=True, nullable=False)
  consent_contact: bool = Field(default=False, nullable=False)

  submissions: List["Submission"] = Relationship(back_populates="reporter")
  magic_links: List["MagicLinkToken"] = Relationship(back_populates="reporter")


class MagicLinkToken(BaseTable, table=True):
  __tablename__ = "magic_link_tokens"

  reporter_id: UUID | None = Field(default=None, foreign_key="reporters.id")
  account_id: UUID | None = Field(default=None, foreign_key="accounts.id")
  token_hash: str = Field(nullable=False, index=True)
  expires_at: datetime = Field(nullable=False, index=True)
  used_at: Optional[datetime] = Field(default=None, nullable=True)
  one_time: bool = Field(default=True, nullable=False)

  reporter: Optional[Reporter] = Relationship(back_populates="magic_links")
  account: Optional["Account"] = Relationship(back_populates="magic_links")
