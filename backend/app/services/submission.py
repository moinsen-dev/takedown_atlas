"""Domain services for submissions and moderation queue."""
from __future__ import annotations

import hashlib
from datetime import datetime
from typing import Iterable, Optional

from sqlmodel import Session, select

from ..models import (
  ActorRole,
  Business,
  Incident,
  IncidentOutcome,
  ModerationAction,
  ModerationActionType,
  Reporter,
  Submission,
  SubmissionChannel,
  SubmissionStatus,
  VerificationRecord,
)
from ..schemas.submission import SubmissionCreate
from .security import create_status_token, hash_token


def _hash_email(email: str) -> str:
  return hashlib.sha256(email.strip().lower().encode("utf-8")).hexdigest()


def get_or_create_reporter(session: Session, email: str, *, consent_public: bool, consent_contact: bool) -> Reporter:
  email_hash = _hash_email(email)
  reporter = session.exec(select(Reporter).where(Reporter.email_hash == email_hash)).first()
  if reporter:
    reporter.consent_public_dataset = consent_public
    reporter.consent_contact = consent_contact
    session.add(reporter)
    return reporter
  reporter = Reporter(
    email_hash=email_hash,
    consent_public_dataset=consent_public,
    consent_contact=consent_contact,
  )
  session.add(reporter)
  session.flush()
  return reporter


def create_submission(
  session: Session,
  payload: SubmissionCreate,
  raw_object_key: str,
  channel: SubmissionChannel,
  platform: str = "google_maps",
  evidence_count: int = 0,
) -> tuple[Submission, str]:
  reporter = get_or_create_reporter(
    session,
    payload.reporter_email,
    consent_public=payload.consent_public_dataset,
    consent_contact=payload.consent_contact,
  )
  status_token, status_token_hash = create_status_token()
  submission = Submission(
    reporter_id=reporter.id,
    status_token_hash=status_token_hash,
    channel=channel,
    platform=platform,
    locale=payload.locale,
    subject=payload.subject,
    received_at=payload.received_at or datetime.utcnow(),
    raw_object_key=raw_object_key,
    evidence_count=evidence_count,
  )
  session.add(submission)
  session.flush()

  if payload.notes:
    action = ModerationAction(
      submission_id=submission.id,
      actor_role=ActorRole.REPORTER,
      action_type=ModerationActionType.NOTE,
      new_value=payload.notes,
    )
    session.add(action)

  return submission, status_token


def get_submission_by_status_token(session: Session, token: str) -> Optional[Submission]:
  token_hash = hash_token(token)
  return session.exec(select(Submission).where(Submission.status_token_hash == token_hash)).first()


def list_moderation_queue(session: Session, *, limit: int = 50) -> Iterable[Submission]:
  pending_statuses = [
    SubmissionStatus.NEEDS_VERIFICATION,
    SubmissionStatus.PENDING,
    SubmissionStatus.PROCESSING,
  ]
  stmt = (
    select(Submission)
    .where(Submission.status.in_(pending_statuses))
    .order_by(Submission.created_at.asc())
    .limit(limit)
  )
  return session.exec(stmt).all()


def publish_incident(
  session: Session,
  *,
  submission: Submission,
  business: Business,
  summary: str,
  reason_code: Optional[str],
  outcome: IncidentOutcome,
  incident_date: datetime,
  country: Optional[str],
  latitude: Optional[float],
  longitude: Optional[float],
  incident_score: float,
) -> Incident:
  incident = Incident(
    submission_id=submission.id,
    business_id=business.id,
    publicly_visible=True,
    published_at=datetime.utcnow(),
    summary=summary,
    reason_code=reason_code,
    outcome=outcome,
    incident_date=incident_date,
    country=country,
    latitude=latitude,
    longitude=longitude,
    incident_score=incident_score,
  )
  session.add(incident)
  business.incident_count += 1
  business.last_incident_at = datetime.utcnow()
  submission.status = SubmissionStatus.PUBLISHED
  session.add(submission)
  session.add(business)
  session.flush()
  return incident


def attach_verification_result(
  session: Session,
  submission: Submission,
  *,
  dkim_pass: bool,
  dmarc_pass: bool,
  spf_pass: bool,
  authenticity_score: float,
  header_hash: str | None = None,
  signature_hash: str | None = None,
) -> VerificationRecord:
  verification = VerificationRecord(
    submission_id=submission.id,
    dkim_pass=dkim_pass,
    dmarc_pass=dmarc_pass,
    spf_pass=spf_pass,
    authenticity_score=authenticity_score,
    header_hash=header_hash,
    signature_hash=signature_hash,
  )
  session.add(verification)
  submission.status = SubmissionStatus.NEEDS_VERIFICATION
  session.add(submission)
  session.flush()
  return verification
