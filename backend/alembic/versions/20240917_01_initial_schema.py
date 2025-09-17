"""Initial database schema."""

from __future__ import annotations

from alembic import op
from sqlmodel import SQLModel

import backend.app.models  # noqa: F401 ensures models import

revision = "20250917_01"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    SQLModel.metadata.create_all(bind)


def downgrade() -> None:
    bind = op.get_bind()
    SQLModel.metadata.drop_all(bind)
