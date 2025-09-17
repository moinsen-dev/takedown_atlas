"""Verifier and admin moderation endpoints."""
from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ...models import Account, AccountRole, Business, IncidentOutcome, Submission, SubmissionStatus
from ...schemas.moderation import ModerationQueueItem, PublishIncidentRequest
from ...services.security import require_role
from ...services.submission import list_moderation_queue, publish_incident
from ..deps import get_current_account, get_db

router = APIRouter(prefix="/moderation", tags=["moderation"])


@router.get("/queue", response_model=list[ModerationQueueItem])
def moderation_queue(
  db: Session = Depends(get_db),
  account: Account = Depends(get_current_account),
) -> list[ModerationQueueItem]:
  require_role(account.role.value, (AccountRole.VERIFIER.value, AccountRole.ADMIN.value))
  submissions = list_moderation_queue(db)
  items: list[ModerationQueueItem] = []
  for submission in submissions:
    authenticity = None
    if submission.verification:
      authenticity = submission.verification.authenticity_score
    items.append(
      ModerationQueueItem(
        submission=submission,
        authenticity_score=authenticity,
        queue_received_at=submission.created_at,
      )
    )
  return items


@router.post("/submissions/{submission_id}/publish", status_code=status.HTTP_201_CREATED)
def publish_submission(
  submission_id: UUID,
  payload: PublishIncidentRequest,
  db: Session = Depends(get_db),
  account: Account = Depends(get_current_account),
) -> dict:
  require_role(account.role.value, (AccountRole.VERIFIER.value, AccountRole.ADMIN.value))
  submission = db.get(Submission, submission_id)
  if not submission:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")
  if submission.status == SubmissionStatus.PUBLISHED:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Submission already published")

  business = db.get(Business, payload.business_id)
  if not business:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")

  incident = publish_incident(
    db,
    submission=submission,
    business=business,
    summary=payload.summary,
    reason_code=payload.reason_code,
    outcome=payload.outcome,
    incident_date=payload.incident_date,
    country=payload.country,
    latitude=payload.latitude,
    longitude=payload.longitude,
    incident_score=payload.incident_score,
  )
  db.commit()
  db.refresh(incident)
  return {"incident_id": incident.id, "submission_id": submission.id}
