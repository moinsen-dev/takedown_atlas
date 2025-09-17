"""Incident listing, filtering, and leaderboard helpers."""
from __future__ import annotations

from typing import Iterable

from sqlalchemy import func
from sqlmodel import Session, select

from ..models import Business, Incident
from ..schemas.incident import IncidentFilter


def filter_incidents(session: Session, filters: IncidentFilter, limit: int = 100, offset: int = 0) -> list[Incident]:
  stmt = select(Incident).where(Incident.publicly_visible.is_(True))

  if filters.country:
    stmt = stmt.where(Incident.country == filters.country)
  if filters.platform:
    stmt = stmt.join(Incident.submission).where(Incident.submission.has(platform=filters.platform))
  if filters.reason:
    stmt = stmt.where(Incident.reason_code == filters.reason)
  if filters.business_id:
    stmt = stmt.where(Incident.business_id == filters.business_id)
  if filters.outcome:
    stmt = stmt.where(Incident.outcome == filters.outcome)
  if filters.start_date:
    stmt = stmt.where(Incident.incident_date >= filters.start_date)
  if filters.end_date:
    stmt = stmt.where(Incident.incident_date <= filters.end_date)

  stmt = stmt.order_by(Incident.incident_score.desc()).offset(offset).limit(limit)
  return list(session.exec(stmt))


def leaderboard_top_businesses(session: Session, limit: int = 10) -> list[dict]:
  stmt = (
    select(
      Business.id,
      Business.name,
      Business.country,
      func.count(Incident.id).label("incident_count"),
      func.avg(Incident.incident_score).label("incident_score_avg"),
    )
    .join(Incident, Incident.business_id == Business.id)
    .where(Incident.publicly_visible.is_(True))
    .group_by(Business.id)
    .order_by(func.count(Incident.id).desc())
    .limit(limit)
  )
  rows = session.exec(stmt).all()
  return [
    {
      "business_id": row.id,
      "business_name": row.name,
      "country": row.country,
      "incident_count": row.incident_count,
      "incident_score_avg": float(row.incident_score_avg or 0),
    }
    for row in rows
  ]
