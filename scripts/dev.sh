#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)

COMPOSE_FILE="$ROOT_DIR/infrastructure/docker-compose.yml"
ENV_FILE="$ROOT_DIR/infrastructure/.env"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run the development stack" >&2
  exit 1
fi

echo "🚀 Starting Takedown Atlas development infrastructure..."

# Check for environment file and load it
if [[ -f "$ENV_FILE" ]]; then
    echo "📋 Using environment file: $ENV_FILE"
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "⚠️  No .env file found. Using default ports."
    echo "💡 Create infrastructure/.env from infrastructure/.env.example to customize ports"
fi

# Set defaults if not defined
export PROJECT_NAME=${PROJECT_NAME:-takedown_atlas}
export POSTGRES_PORT=${POSTGRES_PORT:-5432}
export REDIS_PORT=${REDIS_PORT:-6379}
export MINIO_API_PORT=${MINIO_API_PORT:-9000}
export MINIO_CONSOLE_PORT=${MINIO_CONSOLE_PORT:-9001}
export MAILHOG_SMTP_PORT=${MAILHOG_SMTP_PORT:-1025}
export MAILHOG_WEB_PORT=${MAILHOG_WEB_PORT:-8025}

# Pull latest images and start services
docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d

echo "✅ Infrastructure started successfully!"
echo ""
echo "📍 Services available at:"
echo "   • Postgres:      localhost:$POSTGRES_PORT (user: postgres, db: takedown_atlas)"
echo "   • Redis:         localhost:$REDIS_PORT"
echo "   • MinIO API:     localhost:$MINIO_API_PORT (user: minio, pass: minio123)"
echo "   • MinIO Console: localhost:$MINIO_CONSOLE_PORT"
echo "   • MailHog SMTP:  localhost:$MAILHOG_SMTP_PORT"
echo "   • MailHog Web:   localhost:$MAILHOG_WEB_PORT"
echo ""
echo "🔧 Next steps:"
echo "   • cd backend && poetry run alembic upgrade head"
echo "   • Create MinIO buckets:"
echo "     aws --endpoint-url http://localhost:$MINIO_API_PORT s3 mb s3://takedown-atlas-raw"
echo "     aws --endpoint-url http://localhost:$MINIO_API_PORT s3 mb s3://takedown-atlas-public"
