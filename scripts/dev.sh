#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)

COMPOSE_FILE="$ROOT_DIR/infrastructure/docker-compose.yml"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run the development stack" >&2
  exit 1
fi

docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d

echo "Infrastructure started. Services: Postgres (5432), Redis (6379), MinIO (9000/9001), MailHog (8025)."
