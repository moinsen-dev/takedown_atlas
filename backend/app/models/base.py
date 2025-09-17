"""Shared model utilities."""
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class BaseTable(SQLModel, table=False):
  id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
  created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
  updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

  def touch(self, timestamp: Optional[datetime] = None) -> None:
    """Update the `updated_at` timestamp."""
    self.updated_at = timestamp or datetime.utcnow()
