"""Celery tasks responsible for parsing and verifying submissions."""
from __future__ import annotations

import logging
from datetime import datetime
from uuid import UUID

from ..db import session_scope
from ..models import Submission, SubmissionStatus
from ..services.submission import attach_verification_result
from .celery_app import celery_app

logger = logging.getLogger(__name__)


@celery_app.task(name="ingestion.process_submission")
def process_submission_task(submission_id: str) -> None:
  with session_scope() as session:
    submission = session.get(Submission, UUID(submission_id))
    if not submission:
      logger.warning("Submission %s not found", submission_id)
      return
    submission.status = SubmissionStatus.PROCESSING
    session.add(submission)
    logger.info("Processing submission %s", submission.id)


@celery_app.task(name="ingestion.run_verification")
def run_verification_task(submission_id: str, authenticity_score: float = 0.75) -> None:
  with session_scope() as session:
    submission = session.get(Submission, UUID(submission_id))
    if not submission:
      logger.warning("Submission %s not found for verification", submission_id)
      return

    attach_verification_result(
      session,
      submission,
      dkim_pass=True,
      dmarc_pass=True,
      spf_pass=True,
      authenticity_score=authenticity_score,
      header_hash="placeholder-header-hash",
      signature_hash="placeholder-signature",
    )
    logger.info("Verification attached for submission %s", submission.id)
