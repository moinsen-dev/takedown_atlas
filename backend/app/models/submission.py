"""Submission and verification related models."""
from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

from sqlmodel import Field, Relationship

from .base import BaseTable

if TYPE_CHECKING:
  from .incident import Incident
  from .moderation import ModerationAction
  from .reporter import Reporter


class SubmissionChannel(str, Enum):
  EMAIL = "email"
  UPLOAD = "upload"
  FORM = "form"


class SubmissionStatus(str, Enum):
  PENDING = "pending"
  PROCESSING = "processing"
  NEEDS_VERIFICATION = "needs_verification"
  PUBLISHED = "published"
  REJECTED = "rejected"


class Submission(BaseTable, table=True):
  __tablename__ = "submissions"

  reporter_id: UUID = Field(foreign_key="reporters.id", nullable=False)
  status_token_hash: str = Field(index=True, nullable=False)
  channel: SubmissionChannel = Field(sa_column_kwargs={"nullable": False})
  status: SubmissionStatus = Field(default=SubmissionStatus.PENDING)
  platform: str = Field(default="google_maps", nullable=False)
  locale: Optional[str] = Field(default=None, nullable=True)
  subject: Optional[str] = Field(default=None, nullable=True)
  received_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
  raw_object_key: str = Field(nullable=False)
  evidence_count: int = Field(default=0, nullable=False)
  ai_summary: Optional[str] = Field(default=None, nullable=True)
  duplicate_of_id: Optional[UUID] = Field(default=None, foreign_key="submissions.id")

  reporter: "Reporter" = Relationship(back_populates="submissions")
  verification: Optional["VerificationRecord"] = Relationship(back_populates="submission")
  incidents: List["Incident"] = Relationship(back_populates="submission")
  attachments: List["Attachment"] = Relationship(back_populates="submission")
  moderation_actions: List["ModerationAction"] = Relationship(back_populates="submission")


class VerificationRecord(BaseTable, table=True):
  __tablename__ = "verification_records"

  submission_id: UUID = Field(foreign_key="submissions.id", unique=True, nullable=False)
  dkim_pass: bool = Field(default=False, nullable=False)
  dmarc_pass: bool = Field(default=False, nullable=False)
  spf_pass: bool = Field(default=False, nullable=False)
  authenticity_score: float = Field(default=0.0, nullable=False)
  header_hash: Optional[str] = Field(default=None, nullable=True)
  signature_hash: Optional[str] = Field(default=None, nullable=True)
  processed_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

  submission: Submission = Relationship(back_populates="verification")


class Attachment(BaseTable, table=True):
  __tablename__ = "attachments"

  submission_id: UUID = Field(foreign_key="submissions.id", nullable=False)
  object_key: str = Field(nullable=False)
  filename: str = Field(nullable=False)
  content_type: str = Field(nullable=False)
  size_bytes: int = Field(nullable=False)

  submission: Submission = Relationship(back_populates="attachments")
