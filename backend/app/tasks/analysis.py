"""AI-assisted analysis and scoring tasks."""
from __future__ import annotations

import logging
from uuid import UUID

from ..db import session_scope
from ..models import Submission
from .celery_app import celery_app

logger = logging.getLogger(__name__)


@celery_app.task(name="analysis.generate_summary")
def generate_summary_task(submission_id: str) -> None:
  with session_scope() as session:
    submission = session.get(Submission, UUID(submission_id))
    if not submission:
      logger.warning("Submission %s not found for summary", submission_id)
      return

    submission.ai_summary = (
      "According to the forwarded notice, Google informed the reporter about a"
      " removal request. AI analysis pending for production."
    )
    session.add(submission)
    logger.info("Generated placeholder summary for submission %s", submission.id)
