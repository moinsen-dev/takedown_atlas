# Takedown Atlas — MVP Stack

This repository implements the MVP described in `prd.md`: a privacy-preserving transparency platform that ingests Google review removal notices, routes them through a verification workflow, and publishes anonymized incidents for public research.

## Repository Map
- `backend/`: FastAPI application with Postgres/PostGIS models, public API, moderation endpoints, and Celery tasks.
- `frontend/`: Next.js 14 App Router project for the landing page, submission flow, map, business profiles, and moderation console.
- `workers/`: Celery worker entrypoint (reuses backend code).
- `docs/`: Architectural overview tying implementation back to the PRD.
- `takedown-atlas-brand-starter-kit/`: Existing brand assets and tokens consumed by the frontend.

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- Poetry and npm
- Postgres 16 with PostGIS, Redis, and MinIO/S3-compatible storage (Docker compose example pending)

### Backend
```bash
cd backend
poetry install
poetry run uvicorn backend.app.main:app --reload
```

Environment variables (prefixed with `TAKEDOWN_ATLAS_`) can override defaults. Key settings live in `backend/app/core/config.py`.

### Worker
```bash
cd backend
poetry run celery -A backend.app.tasks.celery_app.celery_app worker -l info
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend imports design tokens from `takedown-atlas-brand-starter-kit/tokens/` and references brand SVGs under `frontend/public/`.

## Key Endpoints (FastAPI)
- `POST /v1/submissions`: ingest base64-encoded removal notice payloads.
- `GET /v1/submissions/{token}`: reporter status view.
- `GET /v1/incidents`: filterable public incidents.
- `GET /v1/incidents/leaderboard`: business leaderboard.
- `POST /v1/businesses/{id}/claims`: business representative workflow.
- `GET /v1/moderation/queue`: moderation backlog for verifiers.
- `POST /v1/moderation/submissions/{id}/publish`: publish verified incidents.
- `POST /v1/admin/notices`: log notice-and-action requests against our platform.

## Implementation Notes
- SQLModel models cover reporters, submissions, verification records, incidents, businesses, claims, moderation actions, and legal notices.
- Celery tasks (`backend/app/tasks/`) stub ingestion, verification, and AI summary generation for future extension with production NLP pipelines.
- Next.js pages follow the MVP user journeys: landing mission, submission form with base64 encoding, MapLibre map for incidents, business profile pages, and moderation console.
- `docs/architecture.md` describes service responsibilities, data model, and workflows aligned with the PRD.

## Next Steps
- Wire real email ingestion (SES/Mailgun) and DKIM/DMARC verification.
- Implement role-based auth, magic links, and session expiry enforcement.
- Expand map clustering, add CSV/JSON exports, and embed transparency reports.
- Finish Docker Compose stack plus automated tests covering ingestion → publication flow.
