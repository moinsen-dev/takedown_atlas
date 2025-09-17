#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd -- "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

if command -v poetry >/dev/null 2>&1; then
  (cd "$ROOT_DIR/backend" && poetry install --with dev && poetry run ruff check .)
else
  echo "Poetry not found; skipping backend lint" >&2
fi

if command -v npm >/dev/null 2>&1; then
  (cd "$ROOT_DIR/frontend" && npm install && npm run lint)
else
  echo "npm not found; skipping frontend lint" >&2
fi
