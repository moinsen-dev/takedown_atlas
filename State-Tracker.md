# 📌 Takedown Atlas — State Tracker

_Last updated: 2025-09-18_

## 🖥️ Frontend

- ✅ Magic link UI defaults to researcher access and clarifies upgrade path.
- ✅ Admin moderation queue handles 401/403 gracefully and refresh UX copy.
- 🔧 TODO: Backport auth session tests to frontend (Cypress/Playwright) once API fixtures exist.
- 🔭 Future: Add branded hero visuals using `takedown-atlas-brand-starter-kit/social/` assets.

## 🛠️ Backend

- ✅ Magic-link provisioning locked to default role + optional domain allowlist.
- ✅ Added moderation auth regression tests (401/403/200 coverage).
- 🔧 TODO: Implement admin elevation workflow (invite/approval pipeline).
- 🔧 TODO: Expand pytest coverage for `/admin/notices` happy-path and failure modes.
- 🔭 Future: Replace Alembic catch-all migration with incremental revisions per model domain.

## ☁️ Infrastructure

- ✅ Docker Compose stack committed for Postgres, Redis, MinIO, MailHog.
- 🔧 TODO: Add CI service containers (Postgres/Redis) for integration tests.
- 🔧 TODO: Provide Terraform or Fly.io manifests for staging parity.

## 📄 Docs & Governance

- ✅ README, architecture notes, and .env template cover new auth settings.
- ✅ Pre-commit + GitHub Actions CI in place.
- 🔧 TODO: Author contributor guide (workflow, branching, release cadence).
- 🔧 TODO: Publish transparency policy and data retention summary alongside `usage/brand-guidelines.md` update.

## 🎨 Brand & Comms

- ✅ Brand kit integrated; README mentions key assets.
- 🔧 TODO: Generate light/dark preview renders before merging brand updates.
- 🔧 TODO: Document legal notice templates referencing CC BY 4.0 visuals.

---

Legend: ✅ Complete · 🔧 In progress/next · 🔭 Later
