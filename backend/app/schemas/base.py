"""Base Pydantic schemas."""
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class TimestampedModel(BaseModel):
  id: UUID
  created_at: datetime
  updated_at: datetime

  class Config:
    orm_mode = True
