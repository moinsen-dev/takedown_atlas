# Takedown Atlas — MVP Architecture

This document translates the PRD into a concrete, implementable architecture for the MVP release. It describes the repository layout, services, data model, and key workflows that the code implements.

## Repository Layout

```
backend/                FastAPI application (API + admin + auth)
  app/
    api/                Route definitions grouped by domain
    core/               Settings, logging, security helpers
    db.py               Database engine & session handling
    main.py             ASGI entrypoint
    models/             SQLModel ORM models and relationships
    schemas/            Pydantic response/request schemas
    services/           Domain services (verification, redaction, scoring)
    tasks/              Async job orchestration helpers
  pyproject.toml        Poetry configuration
  alembic/              Database migrations
  tests/                Backend unit/integration tests

workers/                Background processing (Celery + FastAPI shared code)
  worker.py
  tasks/

frontend/               Next.js 14 app router project
  app/
    layout.tsx          Global layout & providers (theme, map)
    page.tsx            Landing page with counters & CTA
    submit/
      page.tsx          Submission flow (upload, consent, status)
    incidents/
      page.tsx          Map + filters + leaderboard table
    businesses/[id]/    Business detail route
    admin/
      layout.tsx        Admin shell (protected)
      page.tsx          Moderation queue view
  components/           Shared UI components (map, tables, forms)
  lib/                  API clients & auth helpers
  public/               Static assets (favicons, logos)
  tailwind.config.ts
  package.json

infrastructure/
  docker-compose.yml    Local dev stack (Postgres + MinIO + services)
  migrations/seed/      Seed scripts for reference data

scripts/
  dev.sh                Spins up full stack for local development
  lint.sh               Runs lint & type checks
  test.sh               Aggregated test runner
```

The `takedown-atlas-brand-starter-kit/` directory remains untouched and is referenced by the frontend build for logos, colors, and voice guidance.

## Services & Responsibilities

### Backend API (FastAPI)

- Ingestion endpoints accept emails/uploads and hand off to async pipeline.
- Moderation endpoints expose incident queues, verification actions, and publication toggles.
- Public read endpoints provide anonymized incident data, leaderboard rankings, and business profiles with role-based access control (RLS enforced in Postgres, mirrored in app auth checks).
- Admin endpoints manage policies, takedown requests against our own site, and audit exports.

### Worker Layer (Celery + Redis)

- Processes ingestion jobs (parse email, extract headers, attachments, dedupe, geocode).
- Runs verification checks (DKIM/DMARC, hash signatures) and redaction (spaCy + custom regex).
- Generates AI-assisted summaries and classification using self-hosted models (stubs provided for plugging in actual model runners).
- Emits scoring updates and map aggregation caches.

### Frontend (Next.js)

- Landing page communicates mission, live counters (via SWR polling), and directs users to submit incidents.
- Submission flow guides forwarding/upload, performs client-side redaction preview, and shows status once a reporter submits.
- Map & leaderboard screen uses MapLibre GL JS and TanStack Table to filter incidents (country, platform, reason, business, timeframe).
- Business detail page surfaces stats, incident timelines, and verified responses from business representatives.
- Admin shell (protected by magic-link auth) exposes moderation queue, notice-and-action requests, and appeals trail.

### Shared Infrastructure

- PostgreSQL 16 with PostGIS extension stores incidents, businesses, audit logs, and row-level security policies. `scripts/dev.sh` boots a PostGIS container for local development.
- MinIO (S3-compatible) buckets store raw email blobs and attachments in private storage with hashed object keys. The docker-compose stack exposes the console on `localhost:9001` for manual inspection; create `takedown-atlas-raw` and `takedown-atlas-public` buckets before testing uploads.
- Redis handles Celery broker/backing store; also used for magic link tokens and rate limiting.
- OpenTelemetry instrumentation ships traces/metrics to configured endpoint (placeholder exporter for local dev).

## Data Model Overview

**Reporter** — pseudonymous user entry storing contact email hash, magic link tokens, consent flags.

**Account** — internal moderator/admin/researcher account linked to magic-link authentication. Stores role, last login, and issued magic link tokens.

**Submission** — initial payload received (raw email, metadata, attachments); references Reporter, stores storage keys, status (`pending`, `processing`, `needs_verification`, `published`, `rejected`).

**VerificationRecord** — DKIM/DMARC, checksum, authenticity score, redaction completeness. Linked to Submission.

**Incident** — public-facing record derived from Submission after moderation. Contains business link, reason classification, summary, publish flags, map coordinates, evidence references.

**Business** — canonical business entry (name, address, Google Place ID, coordinates). Maintains aggregates (`incident_count`, `last_incident_at`).

**BusinessClaim** — business representative requests to manage profile. Tracks verification (email domain, documents) and statements posted.

**ModerationAction** — audit log of every change (status transitions, redactions, takedown responses). Captures actor, action type, notes, timestamp.

**NoticeActionRequest** — inbound legal notices targeting our platform content; includes workflow for response, resolution, and appeals.

**Attachment** — metadata for stored files (filename, type, checksum) tied to Submission.

**AuditTrail** — append-only log mirrored to cold storage for compliance.

## Key Workflows

1. **Email Ingestion**

   - Reporter forwards notice to alias (handled by SES/Mailgun route → webhook) or uploads via UI.
   - FastAPI endpoint stores raw payload in MinIO, creates Submission row, enqueues `process_submission` task.
   - Worker parses headers, runs verification + redaction, and publishes structured metadata.
   - On success, submission moves to moderation queue.

2. **Magic Link Authentication**

- Staff requests link via `/v1/auth/magic-links`; backend issues one-time token, emails login URL through SMTP (MailHog in dev).
- Frontend exchanges token for JWT at `/v1/auth/magic-links/verify`, stores it locally, and attaches `Authorization: Bearer` headers for protected routes.
- Self-service requests provision researcher-level accounts only; elevated roles must be approved/admin-seeded and can be restricted via `TAKEDOWN_ATLAS_MAGIC_LINK_ALLOWED_DOMAINS`.

3. **Moderation & Publication**

   - Verifier reviews queue in frontend, sees redaction diffs, verification scores, duplicate suggestions.
   - Approve → Incident created/updated, published flag set, map caches refreshed.
   - Reject → reason recorded, reporter notified via status page/email.

4. **Business Response**

   - Business representative requests claim; admin verifies and grants access.
   - Rep can post contextual statement (rate limited) and see aggregate stats.

5. **Notice & Action**

   - Incoming legal request stored as NoticeActionRequest.
   - Admin records decision, attaches evidence, triggers transparency log export.

6. **Transparency Reporting**
   - Scheduled worker job compiles quarterly stats, dumps anonymized dataset (CSV/JSON) to exports bucket, updates transparency page.

## Security & Privacy Controls

- Row Level Security ensures reporters only view their own submissions via status token.
- Stored emails encrypted at rest (S3 SSE-S3 for MinIO; database column encryption for sensitive fields using Fernet key).
- Audit logs immutable by storing hash chain and replicating to append-only table.
- PII redaction for public endpoints enforced in service layer and validated by tests.

## Open Questions & Follow-ups

- Exact ML/NLP model selection pending benchmarking (stubs accept pluggable interface).
- Final decision on OAuth providers (initial scaffolding uses email magic links + optional GitHub for admin/researcher roles).
- Map tiles: default to MapLibre + OpenMapTiles; confirm licensing alignment.
- Need DPA templates for third-party processors (Mailgun, Supabase, etc.).
