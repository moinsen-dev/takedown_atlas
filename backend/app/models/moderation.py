"""Moderation and notice handling models."""
from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional
from uuid import UUID

from sqlmodel import Field, Relationship

from .base import BaseTable

if TYPE_CHECKING:
  from .incident import Incident
  from .submission import Submission


class ActorRole(str, Enum):
  REPORTER = "reporter"
  VERIFIER = "verifier"
  ADMIN = "admin"
  BUSINESS_REP = "business_rep"


class ModerationActionType(str, Enum):
  STATUS_CHANGE = "status_change"
  REDACTION_UPDATE = "redaction_update"
  NOTE = "note"
  NOTICE_RESPONSE = "notice_response"


class ModerationAction(BaseTable, table=True):
  __tablename__ = "moderation_actions"

  submission_id: UUID = Field(foreign_key="submissions.id", nullable=False)
  actor_id: Optional[UUID] = Field(default=None, nullable=True)
  actor_role: ActorRole = Field(nullable=False)
  action_type: ModerationActionType = Field(nullable=False)
  previous_value: Optional[str] = Field(default=None, nullable=True)
  new_value: Optional[str] = Field(default=None, nullable=True)
  notes: Optional[str] = Field(default=None, nullable=True)

  submission: "Submission" = Relationship(back_populates="moderation_actions")


class NoticeActionStatus(str, Enum):
  RECEIVED = "received"
  UNDER_REVIEW = "under_review"
  ACTIONED = "actioned"
  REJECTED = "rejected"
  APPEALED = "appealed"
  CLOSED = "closed"


class NoticeActionRequest(BaseTable, table=True):
  __tablename__ = "notice_action_requests"

  incident_id: UUID = Field(foreign_key="incidents.id", nullable=True)
  reporter_email: Optional[str] = Field(default=None, nullable=True)
  requester_type: str = Field(nullable=False)
  request_summary: str = Field(nullable=False)
  status: NoticeActionStatus = Field(default=NoticeActionStatus.RECEIVED, nullable=False)
  resolution_notes: Optional[str] = Field(default=None, nullable=True)
  responded_at: Optional[datetime] = Field(default=None, nullable=True)

  incident: Optional["Incident"] = Relationship(back_populates="notice_actions")
