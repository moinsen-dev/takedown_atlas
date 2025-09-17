"""Inbound webhook handlers (Mailgun etc.)."""
from __future__ import annotations

import hashlib
import hmac
from uuid import uuid4

from fastapi import APIRouter, Depends, Form, HTTPException, status
from sqlmodel import Session

from ...core.config import get_settings
from ...schemas.submission import SubmissionCreate
from ...services.storage import StorageService
from ...services.submission import SubmissionChannel, create_submission
from ..deps import get_db

try:
  from ...tasks.ingestion import process_submission_task  # type: ignore
except Exception:  # pragma: no cover - celery optional during dev
  process_submission_task = None

router = APIRouter(prefix="/webhooks", tags=["webhooks"])
settings = get_settings()
storage = StorageService()


@router.post("/mailgun", status_code=status.HTTP_202_ACCEPTED)
async def mailgun_ingest(
  timestamp: str = Form(...),
  token: str = Form(...),
  signature: str = Form(...),
  sender: str = Form(...),
  subject: str | None = Form(default=None),
  body_plain: str | None = Form(default=None, alias="body-plain"),
  body_html: str | None = Form(default=None, alias="body-html"),
  body_mime: str | None = Form(default=None, alias="body-mime"),
  db: Session = Depends(get_db),
):
  expected = hmac.new(
    key=settings.mailgun_signing_key.encode("utf-8"),
    msg=f"{timestamp}{token}".encode("utf-8"),
    digestmod=hashlib.sha256,
  ).hexdigest()
  if not hmac.compare_digest(expected, signature):
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid webhook signature")

  raw_payload = (body_mime or body_html or body_plain or "").encode("utf-8")
  object_key = f"mailgun/{uuid4()}.eml"
  storage.put_object(
    bucket=settings.s3_bucket_raw,
    key=object_key,
    body=raw_payload,
    content_type="message/rfc822",
  )

  submission_payload = SubmissionCreate(
    reporter_email=sender,
    consent_public_dataset=True,
    consent_contact=False,
    channel=SubmissionChannel.EMAIL,
    subject=subject,
  )
  submission, status_token = create_submission(
    db,
    submission_payload,
    raw_object_key=object_key,
    channel=SubmissionChannel.EMAIL,
    platform="google_maps",
    evidence_count=1,
  )
  db.commit()

  if process_submission_task:
    process_submission_task.delay(str(submission.id))

  return {"submission_id": submission.id, "status_token": status_token}
