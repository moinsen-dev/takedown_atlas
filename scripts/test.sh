#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd -- "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

if ! command -v poetry >/dev/null 2>&1; then
  echo "Poetry is required to run backend tests" >&2
  exit 1
fi

(cd "$ROOT_DIR/backend" && poetry install --with dev && poetry run pytest)
