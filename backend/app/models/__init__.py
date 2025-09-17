"""Aggregate exports for SQLModel metadata discovery."""
from datetime import datetime

from sqlalchemy import event

from .base import BaseTable
from .account import Account, AccountRole
from .incident import (
  Business,
  BusinessClaim,
  BusinessClaimStatus,
  Incident,
  IncidentOutcome,
  LeaderboardSnapshot,
)
from .moderation import (
  ActorRole,
  ModerationAction,
  ModerationActionType,
  NoticeActionRequest,
  NoticeActionStatus,
)
from .reporter import MagicLinkToken, Reporter
from .submission import (
  Attachment,
  Submission,
  SubmissionChannel,
  SubmissionStatus,
  VerificationRecord,
)


@event.listens_for(BaseTable, "before_update", propagate=True)
def _update_timestamp(mapper, connection, target):  # type: ignore[override]
  if hasattr(target, "updated_at"):
    target.updated_at = datetime.utcnow()

__all__ = [
  "Attachment",
  "ActorRole",
  "Account",
  "AccountRole",
  "Business",
  "BusinessClaim",
  "BusinessClaimStatus",
  "Incident",
  "IncidentOutcome",
  "LeaderboardSnapshot",
  "MagicLinkToken",
  "ModerationAction",
  "ModerationActionType",
  "NoticeActionRequest",
  "NoticeActionStatus",
  "Reporter",
  "Submission",
  "SubmissionChannel",
  "SubmissionStatus",
  "VerificationRecord",
]
