"""Email parsing helpers (stubs for MVP)."""
from __future__ import annotations

from email import message_from_bytes
from email.message import Message
from typing import Any


class ParsedEmail:
  def __init__(self, headers: dict[str, Any], body: str, attachments: list[dict[str, Any]]):
    self.headers = headers
    self.body = body
    self.attachments = attachments


def parse_raw_email(raw_bytes: bytes) -> ParsedEmail:
  """Parse an RFC822 message into structured metadata.

  For the MVP scaffold we do minimal parsing; production will add DKIM/DMARC checks
  and robust attachment handling.
  """
  message: Message = message_from_bytes(raw_bytes)
  headers = {k: v for k, v in message.items()}
  body = message.get_payload(decode=True)
  if isinstance(body, bytes):
    body_text = body.decode(errors="replace")
  else:
    body_text = str(body)
  attachments: list[dict[str, Any]] = []

  return ParsedEmail(headers=headers, body=body_text, attachments=attachments)
