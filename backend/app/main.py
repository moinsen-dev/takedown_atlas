"""ASGI entrypoint for the FastAPI application."""
from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.router import api_router
from .core.config import get_settings
from .core.logging import configure_logging

settings = get_settings()
configure_logging(debug=settings.debug)


@asynccontextmanager
def lifespan(app: FastAPI) -> AsyncIterator[None]:
  yield


def create_app() -> FastAPI:
  app = FastAPI(title=settings.project_name, lifespan=lifespan)

  if settings.allowed_cors_origins:
    app.add_middleware(
      CORSMiddleware,
      allow_origins=[str(origin) for origin in settings.allowed_cors_origins],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
    )

  app.include_router(api_router, prefix=settings.api_v1_prefix)
  return app


app = create_app()
