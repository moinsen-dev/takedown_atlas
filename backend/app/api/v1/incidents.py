"""Public incident listing endpoints."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlmodel import Session

from ...schemas.incident import (
  BusinessPublicProfile,
  IncidentFilter,
  IncidentLeaderboardEntry,
  IncidentPublicResponse,
)
from ...services.incidents import filter_incidents, leaderboard_top_businesses
from ..deps import get_db

router = APIRouter(prefix="/incidents", tags=["incidents"])


@router.get("", response_model=list[IncidentPublicResponse])
def list_incidents(
  filters: IncidentFilter = Depends(),
  db: Session = Depends(get_db),
) -> list[IncidentPublicResponse]:
  incidents = filter_incidents(db, filters)
  return [IncidentPublicResponse.from_orm(incident) for incident in incidents]


@router.get("/leaderboard", response_model=list[IncidentLeaderboardEntry])
def incidents_leaderboard(db: Session = Depends(get_db)) -> list[IncidentLeaderboardEntry]:
  rows = leaderboard_top_businesses(db)
  return [IncidentLeaderboardEntry(**row) for row in rows]
