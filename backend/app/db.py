"""Database engine, session management, and base metadata."""
from contextlib import contextmanager
from typing import Iterator

from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, create_engine

from .core.config import get_settings

settings = get_settings()
engine = create_engine(settings.database_url, echo=settings.database_echo, future=True)
SessionLocal = sessionmaker(bind=engine)


def init_db() -> None:
  """Create all tables. Alembic should handle this in prod, but helps in dev/tests."""
  import backend.app.models  # noqa: F401  # ensure models are registered

  SQLModel.metadata.create_all(bind=engine)


@contextmanager
def session_scope() -> Iterator[SessionLocal]:
  """Provide a transactional scope around a series of operations."""
  session = SessionLocal()
  try:
    yield session
    session.commit()
  except Exception:
    session.rollback()
    raise
  finally:
    session.close()
