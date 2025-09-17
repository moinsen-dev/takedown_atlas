"""Schemas for moderation/admin endpoints."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from ..models.incident import IncidentOutcome
from ..models.moderation import ActorRole, ModerationActionType, NoticeActionStatus
from ..models.submission import SubmissionStatus
from .submission import SubmissionDetail


class ModerationQueueFilters(BaseModel):
  status: SubmissionStatus | None = None
  assignee_id: UUID | None = None
  country: str | None = None


class ModerationActionCreate(BaseModel):
  submission_id: UUID
  action_type: ModerationActionType
  notes: Optional[str] = None
  new_value: Optional[str] = None


class ModerationActionResponse(BaseModel):
  id: UUID
  created_at: datetime
  actor_id: Optional[UUID]
  actor_role: ActorRole
  action_type: ModerationActionType
  previous_value: Optional[str]
  new_value: Optional[str]
  notes: Optional[str]

  class Config:
    orm_mode = True


class NoticeActionCreate(BaseModel):
  incident_id: Optional[UUID] = None
  requester_type: str
  request_summary: str
  reporter_email: Optional[str] = None


class NoticeActionResponse(BaseModel):
  id: UUID
  incident_id: Optional[UUID]
  requester_type: str
  request_summary: str
  status: NoticeActionStatus
  resolution_notes: Optional[str]
  responded_at: Optional[datetime]
  created_at: datetime
  updated_at: datetime

  class Config:
    orm_mode = True


class ModerationQueueItem(BaseModel):
  submission: SubmissionDetail
  authenticity_score: Optional[float]
  queue_received_at: datetime


class PublishIncidentRequest(BaseModel):
  business_id: UUID
  summary: str
  reason_code: Optional[str] = None
  outcome: IncidentOutcome
  incident_date: datetime
  country: Optional[str] = None
  latitude: Optional[float] = None
  longitude: Optional[float] = None
  incident_score: float
