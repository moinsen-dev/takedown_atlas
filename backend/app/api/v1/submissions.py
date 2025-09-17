"""Endpoints for reporters submitting takedown notices."""
from __future__ import annotations

import base64
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ...core.config import get_settings
from ...schemas.submission import (
  SubmissionDetail,
  SubmissionIngestRequest,
  SubmissionStatusResponse,
)
from ...services.storage import StorageService
from ...services.submission import (
  create_submission,
  get_submission_by_status_token,
)
from ..deps import get_db

router = APIRouter(prefix="/submissions", tags=["submissions"])
settings = get_settings()
storage = StorageService()


@router.post("", response_model=SubmissionStatusResponse, status_code=status.HTTP_201_CREATED)
def submit_notice(payload: SubmissionIngestRequest, db: Session = Depends(get_db)) -> SubmissionStatusResponse:
  try:
    raw_bytes = base64.b64decode(payload.raw_notice)
  except Exception as exc:  # noqa: BLE001 broad intentionally for decoding errors
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid base64 payload") from exc

  object_key = f"submissions/{uuid4()}/{payload.filename or 'notice.eml'}"
  storage.put_object(
    bucket=settings.s3_bucket_raw,
    key=object_key,
    body=raw_bytes,
    content_type=payload.content_type or "application/octet-stream",
  )

  submission, status_token = create_submission(
    db,
    payload,
    raw_object_key=object_key,
    channel=payload.channel,
    platform="google_maps",
    evidence_count=1,
  )
  db.commit()
  db.refresh(submission)

  return SubmissionStatusResponse(
    status=submission.status,
    status_token=status_token,
    submission_id=submission.id,
    received_at=submission.received_at,
    queue_position=None,
  )


@router.get("/{token}", response_model=SubmissionDetail)
def get_submission_status(token: str, db: Session = Depends(get_db)) -> SubmissionDetail:
  submission = get_submission_by_status_token(db, token)
  if not submission:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")
  return SubmissionDetail.from_orm(submission)
