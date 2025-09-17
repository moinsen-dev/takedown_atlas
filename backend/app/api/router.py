"""Register API routers."""
from fastapi import APIRouter

from .v1 import admin, business, incidents, moderation, submissions

api_router = APIRouter()
api_router.include_router(submissions.router)
api_router.include_router(incidents.router)
api_router.include_router(business.router)
api_router.include_router(moderation.router)
api_router.include_router(admin.router)
