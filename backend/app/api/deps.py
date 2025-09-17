"""Shared dependencies for FastAPI routes."""
from collections.abc import Generator

from fastapi import Depends
from sqlmodel import Session

from ..db import SessionLocal


def get_db() -> Generator[Session, None, None]:
  session = SessionLocal()
  try:
    yield session
  finally:
    session.close()


DbSession = Depends(get_db)
