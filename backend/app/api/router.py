"""Register API routers."""
from fastapi import APIRouter

from .v1 import admin, auth, business, incidents, moderation, submissions, webhooks

api_router = APIRouter()
api_router.include_router(submissions.router)
api_router.include_router(incidents.router)
api_router.include_router(business.router)
api_router.include_router(moderation.router)
api_router.include_router(admin.router)
api_router.include_router(auth.router)
api_router.include_router(webhooks.router)
