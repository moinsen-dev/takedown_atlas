"""Schemas for submission and verification endpoints."""
from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field

from ..models.submission import SubmissionChannel, SubmissionStatus
from .base import TimestampedModel


class AttachmentRef(BaseModel):
  id: UUID
  filename: str
  content_type: str
  size_bytes: int

  class Config:
    orm_mode = True


class VerificationSummary(BaseModel):
  dkim_pass: bool
  dmarc_pass: bool
  spf_pass: bool
  authenticity_score: float
  processed_at: datetime

  class Config:
    orm_mode = True


class SubmissionCreate(BaseModel):
  reporter_email: str = Field(..., description="Email of the reporter forwarding the notice")
  consent_public_dataset: bool = Field(default=True)
  consent_contact: bool = Field(default=False)
  channel: SubmissionChannel = Field(default=SubmissionChannel.UPLOAD)
  locale: Optional[str] = None
  subject: Optional[str] = None
  received_at: Optional[datetime] = None
  notes: Optional[str] = Field(default=None, description="Reporter-provided notes")


class SubmissionIngestRequest(SubmissionCreate):
  raw_notice: str = Field(
    ..., description="Base64-encoded raw notice (email or PDF)"
  )
  filename: Optional[str] = Field(default="notice.eml")
  content_type: Optional[str] = Field(default="message/rfc822")


class SubmissionStatusResponse(BaseModel):
  status: SubmissionStatus
  status_token: str
  submission_id: UUID
  received_at: datetime
  queue_position: Optional[int] = None

  class Config:
    orm_mode = True


class SubmissionDetail(TimestampedModel):
  status: SubmissionStatus
  channel: SubmissionChannel
  platform: str
  locale: Optional[str]
  subject: Optional[str]
  received_at: datetime
  reporter_id: UUID
  evidence_count: int
  ai_summary: Optional[str]
  verification: Optional[VerificationSummary]
  attachments: List[AttachmentRef]


class SubmissionListItem(TimestampedModel):
  status: SubmissionStatus
  channel: SubmissionChannel
  platform: str
  evidence_count: int
  authenticity_score: Optional[float]
  received_at: datetime

  class Config:
    orm_mode = True
