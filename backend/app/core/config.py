"""Application configuration using pydantic BaseSettings."""
from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings

from ..models.account import AccountRole


class Settings(BaseSettings):
  api_v1_prefix: str = "/v1"
  project_name: str = "Takedown Atlas API"
  debug: bool = False

  database_url: str = Field(
    default="postgresql+psycopg://postgres:postgres@localhost:5432/takedown_atlas",
    description="SQLAlchemy connection URL for Postgres with PostGIS",
  )
  database_echo: bool = False

  redis_url: str = Field(
    default="redis://localhost:6379/0",
    description="Redis connection string used by Celery and caching layers",
  )

  s3_endpoint_url: str = "http://localhost:9000"
  s3_bucket_raw: str = "takedown-atlas-raw"
  s3_bucket_public: str = "takedown-atlas-public"
  s3_access_key: str = "minio"
  s3_secret_key: str = "minio123"
  s3_region: str = "eu-central-1"

  security_secret_key: str = Field(
    default="development-secret-key-change-me",
    description="Secret key for signing tokens and encrypting sensitive data",
  )
  security_token_expiry_minutes: int = 60 * 24
  allowed_cors_origins: List[AnyHttpUrl] = []

  mapbox_token: str | None = None
  magic_link_sender: str = "noreply@takedownatlas.org"
  smtp_host: str = "localhost"
  smtp_port: int = 1025
  mailgun_signing_key: str = "test-signing-key"
  base_url: str = "http://localhost:8000"
  magic_link_allowed_domains: List[str] = Field(default_factory=list)
  magic_link_default_role: str = AccountRole.RESEARCHER.value

  class Config:
    env_file = ".env"
    env_prefix = "TAKEDOWN_ATLAS_"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
  """Return cached settings instance."""
  return Settings()
