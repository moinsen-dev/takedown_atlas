"""Schemas for business-facing endpoints."""
from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr

from ..models.incident import BusinessClaimStatus
from .base import TimestampedModel


class BusinessClaimCreate(BaseModel):
  contact_name: str
  contact_email: EmailStr
  justification: Optional[str] = None


class BusinessClaimResponse(TimestampedModel):
  business_id: UUID
  contact_name: str
  contact_email: EmailStr
  justification: Optional[str]
  status: BusinessClaimStatus
  reviewed_at: Optional[datetime]
  reviewer_id: Optional[UUID]


class BusinessClaimDecision(BaseModel):
  status: BusinessClaimStatus
  reviewer_id: UUID
  notes: Optional[str] = None
