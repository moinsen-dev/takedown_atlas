"""Incident, business, and ranking models."""
from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from uuid import UUID

from sqlalchemy import JSON
from sqlmodel import Column, Field, Relationship

from .base import BaseTable

if TYPE_CHECKING:
  from .submission import Submission


class IncidentOutcome(str, Enum):
  REMOVED = "removed"
  RESTORED = "restored"
  PENDING = "pending"
  UNKNOWN = "unknown"


class Incident(BaseTable, table=True):
  __tablename__ = "incidents"

  submission_id: UUID = Field(foreign_key="submissions.id", nullable=False, index=True)
  business_id: UUID = Field(foreign_key="businesses.id", nullable=False, index=True)
  published_at: Optional[datetime] = Field(default=None, nullable=True)
  publicly_visible: bool = Field(default=False, nullable=False)
  summary: Optional[str] = Field(default=None, nullable=True)
  reason_code: Optional[str] = Field(default=None, nullable=True, index=True)
  reason_confidence: float = Field(default=0.0, nullable=False)
  outcome: IncidentOutcome = Field(default=IncidentOutcome.UNKNOWN, nullable=False)
  country: Optional[str] = Field(default=None, index=True)
  incident_date: datetime = Field(default_factory=datetime.utcnow, nullable=False)
  latitude: Optional[float] = Field(default=None, nullable=True)
  longitude: Optional[float] = Field(default=None, nullable=True)
  incident_score: float = Field(default=0.0, nullable=False, index=True)

  submission: "Submission" = Relationship(back_populates="incidents")
  business: "Business" = Relationship(back_populates="incidents")
  notice_actions: List["NoticeActionRequest"] = Relationship(back_populates="incident")


class Business(BaseTable, table=True):
  __tablename__ = "businesses"

  name: str = Field(nullable=False, index=True)
  slug: str = Field(nullable=False, unique=True, index=True)
  place_id: Optional[str] = Field(default=None, unique=True, nullable=True)
  website: Optional[str] = Field(default=None, nullable=True)
  country: Optional[str] = Field(default=None, index=True)
  address: Optional[str] = Field(default=None, nullable=True)
  latitude: Optional[float] = Field(default=None, nullable=True)
  longitude: Optional[float] = Field(default=None, nullable=True)
  incident_count: int = Field(default=0, nullable=False)
  last_incident_at: Optional[datetime] = Field(default=None, nullable=True)

  incidents: List[Incident] = Relationship(back_populates="business")
  claims: List["BusinessClaim"] = Relationship(back_populates="business")


class BusinessClaimStatus(str, Enum):
  PENDING = "pending"
  APPROVED = "approved"
  REJECTED = "rejected"


class BusinessClaim(BaseTable, table=True):
  __tablename__ = "business_claims"

  business_id: UUID = Field(foreign_key="businesses.id", nullable=False)
  contact_name: str = Field(nullable=False)
  contact_email: str = Field(nullable=False, index=True)
  justification: Optional[str] = Field(default=None, nullable=True)
  status: BusinessClaimStatus = Field(default=BusinessClaimStatus.PENDING, nullable=False)
  reviewed_at: Optional[datetime] = Field(default=None, nullable=True)
  reviewer_id: Optional[UUID] = Field(default=None, nullable=True)

  business: Business = Relationship(back_populates="claims")


class LeaderboardSnapshot(BaseTable, table=True):
  __tablename__ = "leaderboard_snapshots"

  period_start: datetime = Field(nullable=False)
  period_end: datetime = Field(nullable=False)
  leaderboard_type: str = Field(nullable=False)
  payload: Dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON, nullable=False))
