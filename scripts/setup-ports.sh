#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
INFRA_DIR="$ROOT_DIR/infrastructure"

echo "🔧 Takedown Atlas - Port Configuration Setup"
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -i ":$port" >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to show current port usage
show_port_status() {
    echo "📊 Current port status:"
    echo ""

    local ports=(5432 5433 6379 6380 9000 9002 9001 9003 1025 1026 8025 8026)
    local services=("Postgres (default)" "Postgres (alt)" "Redis (default)" "Redis (alt)" "MinIO API (default)" "MinIO API (alt)" "MinIO Console (default)" "MinIO Console (alt)" "MailHog SMTP (default)" "MailHog SMTP (alt)" "MailHog Web (default)" "MailHog Web (alt)")

    for i in "${!ports[@]}"; do
        local port=${ports[$i]}
        local service=${services[$i]}
        if check_port "$port"; then
            echo "   🔴 $port - $service (IN USE)"
        else
            echo "   🟢 $port - $service (FREE)"
        fi
    done
    echo ""
}

# Function to create default configuration
setup_default() {
    cp "$INFRA_DIR/.env.example" "$INFRA_DIR/.env"
    echo "✅ Created infrastructure/.env with default ports"
    echo "   • Postgres: 5432"
    echo "   • Redis: 6379"
    echo "   • MinIO: 9000/9001"
    echo "   • MailHog: 1025/8025"
}

# Function to create alternative configuration
setup_alternative() {
    cp "$INFRA_DIR/.env.conflicts" "$INFRA_DIR/.env"
    echo "✅ Created infrastructure/.env with alternative ports"
    echo "   • Postgres: 5433"
    echo "   • Redis: 6380"
    echo "   • MinIO: 9002/9003"
    echo "   • MailHog: 1026/8026"
}

# Function to create custom configuration
setup_custom() {
    echo "🎛️  Custom port configuration:"
    echo ""

    read -p "Project name (takedown_atlas): " project_name
    project_name=${project_name:-takedown_atlas}

    read -p "Postgres port (5432): " postgres_port
    postgres_port=${postgres_port:-5432}

    read -p "Redis port (6379): " redis_port
    redis_port=${redis_port:-6379}

    read -p "MinIO API port (9000): " minio_api_port
    minio_api_port=${minio_api_port:-9000}

    read -p "MinIO Console port (9001): " minio_console_port
    minio_console_port=${minio_console_port:-9001}

    read -p "MailHog SMTP port (1025): " mailhog_smtp_port
    mailhog_smtp_port=${mailhog_smtp_port:-1025}

    read -p "MailHog Web port (8025): " mailhog_web_port
    mailhog_web_port=${mailhog_web_port:-8025}

    # Create custom .env file
    cat > "$INFRA_DIR/.env" << EOF
# Takedown Atlas - Custom Port Configuration
PROJECT_NAME=$project_name
POSTGRES_PORT=$postgres_port
POSTGRES_DB=takedown_atlas
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
REDIS_PORT=$redis_port
MINIO_API_PORT=$minio_api_port
MINIO_CONSOLE_PORT=$minio_console_port
MINIO_ROOT_USER=minio
MINIO_ROOT_PASSWORD=minio123
MAILHOG_SMTP_PORT=$mailhog_smtp_port
MAILHOG_WEB_PORT=$mailhog_web_port
EOF

    echo ""
    echo "✅ Created custom infrastructure/.env configuration"
}

# Function to update backend configuration
update_backend_config() {
    local postgres_port=${1:-5432}
    local redis_port=${2:-6379}
    local minio_port=${3:-9000}

    local backend_env="$ROOT_DIR/backend/.env"

    if [[ -f "$backend_env" ]]; then
        echo "📝 Updating existing backend/.env..."
        sed -i.bak "s|localhost:[0-9]*|localhost:$postgres_port|g" "$backend_env"
        sed -i.bak "s|redis://localhost:[0-9]*|redis://localhost:$redis_port|g" "$backend_env"
        sed -i.bak "s|http://localhost:[0-9]*|http://localhost:$minio_port|g" "$backend_env"
    else
        echo "📝 Creating backend/.env from template..."
        cp "$ROOT_DIR/backend/.env.example" "$backend_env"
        if [[ "$postgres_port" != "5432" ]] || [[ "$redis_port" != "6379" ]] || [[ "$minio_port" != "9000" ]]; then
            sed -i.bak "s|localhost:5432|localhost:$postgres_port|g" "$backend_env"
            sed -i.bak "s|localhost:6379|localhost:$redis_port|g" "$backend_env"
            sed -i.bak "s|localhost:9000|localhost:$minio_port|g" "$backend_env"
        fi
    fi

    echo "✅ Backend configuration updated to match infrastructure ports"
}

# Main menu
show_port_status

echo "Choose an option:"
echo "1) Use default ports (5432, 6379, 9000, etc.)"
echo "2) Use alternative ports (5433, 6380, 9002, etc.)"
echo "3) Configure custom ports"
echo "4) Show port status only"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        setup_default
        update_backend_config 5432 6379 9000
        ;;
    2)
        echo ""
        setup_alternative
        update_backend_config 5433 6380 9002
        ;;
    3)
        echo ""
        setup_custom
        # Extract ports from created .env file for backend update
        source "$INFRA_DIR/.env"
        update_backend_config "$POSTGRES_PORT" "$REDIS_PORT" "$MINIO_API_PORT"
        ;;
    4)
        echo "ℹ️  Port status displayed above"
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Configuration complete!"
echo ""
echo "Next steps:"
echo "   1. Run: ./scripts/dev.sh"
echo "   2. Check that all services start without conflicts"
echo "   3. Run: cd backend && poetry run alembic upgrade head"
echo ""
echo "Need help? Check infrastructure/PORT-ALLOCATION.md"
