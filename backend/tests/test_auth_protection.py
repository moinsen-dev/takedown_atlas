"""Regression tests for protected moderation/admin endpoints."""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine

import backend.app.models  # noqa: F401 ensure models are registered
from backend.app.api.deps import get_db
from backend.app.main import create_app
from backend.app.models import (
  Account,
  AccountRole,
  Reporter,
  Submission,
  SubmissionChannel,
  SubmissionStatus,
)
from backend.app.services.security import create_access_token, hash_token


@pytest.fixture()
def engine():
  engine = create_engine("sqlite://", connect_args={"check_same_thread": False})
  SQLModel.metadata.create_all(engine)
  try:
    yield engine
  finally:
    SQLModel.metadata.drop_all(engine)


@pytest.fixture()
def client(engine):
  app = create_app()

  def get_test_db():
    with Session(engine) as session:
      yield session

  app.dependency_overrides[get_db] = get_test_db
  return TestClient(app)


def create_submission_fixture(engine):
  with Session(engine) as session:
    reporter = Reporter(
      email_hash="test-hash",
      consent_public_dataset=True,
      consent_contact=False,
    )
    session.add(reporter)
    session.flush()
    submission = Submission(
      reporter_id=reporter.id,
      status_token_hash=hash_token("status-token"),
      channel=SubmissionChannel.EMAIL,
      status=SubmissionStatus.PENDING,
      raw_object_key="mailgun/test.eml",
      evidence_count=1,
    )
    session.add(submission)
    session.commit()


def issue_token_for_account(engine, role: AccountRole) -> str:
  with Session(engine) as session:
    account = Account(email=f"{role.value}@example.org", role=role)
    session.add(account)
    session.commit()
    session.refresh(account)
    return create_access_token(str(account.id), account.role.value, expires_minutes=5)


def test_moderation_queue_requires_auth(client):
  response = client.get("/v1/moderation/queue")
  assert response.status_code == 401


def test_moderation_queue_rejects_researcher(engine, client):
  create_submission_fixture(engine)
  token = issue_token_for_account(engine, AccountRole.RESEARCHER)
  response = client.get(
    "/v1/moderation/queue",
    headers={"Authorization": f"Bearer {token}"},
  )
  assert response.status_code == 403


def test_moderation_queue_allows_verifier(engine, client):
  create_submission_fixture(engine)
  token = issue_token_for_account(engine, AccountRole.VERIFIER)
  response = client.get(
    "/v1/moderation/queue",
    headers={"Authorization": f"Bearer {token}"},
  )
  assert response.status_code == 200
  assert isinstance(response.json(), list)
