"""Email notification utilities."""
from __future__ import annotations

import smtplib
from email.message import EmailMessage

from ..core.config import get_settings
from ..core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


def send_magic_link(recipient: str, link: str) -> None:
  """Send a magic login link via SMTP."""
  msg = EmailMessage()
  msg["Subject"] = "Your Takedown Atlas access link"
  msg["From"] = settings.magic_link_sender
  msg["To"] = recipient
  msg.set_content(
    f"Hello,\n\nUse the link below to access the Takedown Atlas moderation tools:\n{link}\n\nThis link expires soon and can only be used once."
  )

  try:
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as smtp:
      smtp.send_message(msg)
  except Exception as exc:  # noqa: BLE001 n.b. log for local dev
    logger.error("Failed to send magic link", error=str(exc))
    raise
