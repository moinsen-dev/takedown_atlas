"""Alembic environment configuration."""
from __future__ import annotations

from logging.config import fileConfig
from typing import Any

from alembic import context
from sqlmodel import SQLModel

from backend.app.core.config import get_settings
from backend.app.db import engine
import backend.app.models  # noqa: F401 ensures models import

config = context.config

if config.config_file_name is not None:
  fileConfig(config.config_file_name)

settings = get_settings()
target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:
  url = settings.database_url
  context.configure(
    url=url,
    target_metadata=target_metadata,
    literal_binds=True,
    dialect_opts={"paramstyle": "named"},
  )

  with context.begin_transaction():
    context.run_migrations()


def run_migrations_online() -> None:
  connectable = engine

  with connectable.connect() as connection:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
      context.run_migrations()


def run_migrations() -> None:
  if context.is_offline_mode():
    run_migrations_offline()
  else:
    run_migrations_online()


run_migrations()
