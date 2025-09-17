"""Centralised logging configuration using structlog."""
from __future__ import annotations

import logging
from typing import Any

import structlog


def configure_logging(debug: bool = False) -> None:
  """Configure structlog for JSON-friendly logs."""
  timestamper = structlog.processors.TimeStamper(fmt="iso")

  structlog.configure(
    processors=[
      structlog.contextvars.merge_contextvars,
      structlog.stdlib.add_log_level,
      timestamper,
      structlog.processors.StackInfoRenderer(),
      structlog.processors.format_exc_info,
      structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(
      logging.DEBUG if debug else logging.INFO
    ),
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
  )

  logging.basicConfig(level=logging.DEBUG if debug else logging.INFO)


def get_logger(name: str) -> structlog.stdlib.BoundLogger:
  """Return a structured logger bound to a module."""
  return structlog.get_logger(name)
