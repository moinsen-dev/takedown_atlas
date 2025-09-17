"""Schemas for incidents and public datasets."""
from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from ..models.incident import IncidentOutcome
from .base import TimestampedModel


class IncidentFilter(BaseModel):
  country: Optional[str] = None
  platform: Optional[str] = None
  reason: Optional[str] = None
  business_id: Optional[UUID] = None
  outcome: Optional[IncidentOutcome] = None
  q: Optional[str] = None
  start_date: Optional[datetime] = None
  end_date: Optional[datetime] = None


class IncidentPublicResponse(TimestampedModel):
  submission_id: UUID
  business_id: UUID
  published_at: Optional[datetime]
  publicly_visible: bool
  summary: Optional[str]
  reason_code: Optional[str]
  reason_confidence: float
  outcome: IncidentOutcome
  country: Optional[str]
  incident_date: datetime
  latitude: Optional[float]
  longitude: Optional[float]
  incident_score: float


class IncidentLeaderboardEntry(BaseModel):
  business_id: UUID
  business_name: str
  incident_count: int
  incident_score_avg: float
  country: Optional[str]


class BusinessPublicProfile(TimestampedModel):
  name: str
  slug: str
  place_id: Optional[str]
  website: Optional[str]
  country: Optional[str]
  address: Optional[str]
  latitude: Optional[float]
  longitude: Optional[float]
  incident_count: int
  last_incident_at: Optional[datetime]

