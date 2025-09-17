# Port Allocation Strategy for Multiple Projects

When working on multiple projects that use similar infrastructure (Postgres, Redis, MinIO, etc.), port conflicts are inevitable. This guide provides strategies to manage ports cleanly across projects.

## 🎯 Quick Solution

If you're having port conflicts right now:

1. **Copy the alternative config:**

   ```bash
   cp infrastructure/.env.conflicts infrastructure/.env
   ```

2. **Start with alternative ports:**

   ```bash
   ./scripts/dev.sh
   ```

3. **Update your backend config** to match the new ports in `backend/.env`

## 📊 Recommended Port Allocation Strategy

### Standard Service Ports

- **Postgres**: 5432 (default), 5433, 5434, 5435...
- **Redis**: 6379 (default), 6380, 6381, 6382...
- **MinIO API**: 9000 (default), 9002, 9004, 9006...
- **MinIO Console**: 9001 (default), 9003, 9005, 9007...
- **MailHog SMTP**: 1025 (default), 1026, 1027, 1028...
- **MailHog Web**: 8025 (default), 8026, 8027, 8028...

### Project-Specific Ranges

Assign each project a specific range to avoid conflicts:

```bash
# Project A (takedown_atlas)
POSTGRES_PORT=5432
REDIS_PORT=6379
MINIO_API_PORT=9000
MINIO_CONSOLE_PORT=9001
MAILHOG_SMTP_PORT=1025
MAILHOG_WEB_PORT=8025

# Project B (my_other_project)
POSTGRES_PORT=5433
REDIS_PORT=6380
MINIO_API_PORT=9002
MINIO_CONSOLE_PORT=9003
MAILHOG_SMTP_PORT=1026
MAILHOG_WEB_PORT=8026

# Project C (third_project)
POSTGRES_PORT=5434
REDIS_PORT=6381
MINIO_API_PORT=9004
MINIO_CONSOLE_PORT=9005
MAILHOG_SMTP_PORT=1027
MAILHOG_WEB_PORT=8027
```

## 🛠️ Configuration Files

### 1. Infrastructure Environment File

Create `infrastructure/.env` for each project:

```bash
# Takedown Atlas - infrastructure/.env
PROJECT_NAME=takedown_atlas
POSTGRES_PORT=5432
REDIS_PORT=6379
MINIO_API_PORT=9000
MINIO_CONSOLE_PORT=9001
MAILHOG_SMTP_PORT=1025
MAILHOG_WEB_PORT=8025
```

### 2. Backend Environment File

Update `backend/.env` to match infrastructure ports:

```bash
# Takedown Atlas - backend/.env
TAKEDOWN_ATLAS_DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/takedown_atlas
TAKEDOWN_ATLAS_REDIS_URL=redis://localhost:6379/0
TAKEDOWN_ATLAS_S3_ENDPOINT_URL=http://localhost:9000
```

## 🔧 Management Commands

### Check Which Ports Are In Use

```bash
# Check if specific ports are occupied
lsof -i :5432  # Postgres
lsof -i :6379  # Redis
lsof -i :9000  # MinIO
lsof -i :8025  # MailHog
```

### Stop All Docker Containers

```bash
# Stop all running containers
docker stop $(docker ps -q)

# Stop specific project containers
docker stop takedown_atlas_postgres takedown_atlas_redis takedown_atlas_minio takedown_atlas_mailhog
```

### List Active Projects

```bash
# See all running compose projects
docker compose ls

# See containers by project
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}"
```

## 🚀 Quick Start Templates

### Template 1: Default Ports (infrastructure/.env)

```bash
PROJECT_NAME=takedown_atlas
POSTGRES_PORT=5432
REDIS_PORT=6379
MINIO_API_PORT=9000
MINIO_CONSOLE_PORT=9001
MAILHOG_SMTP_PORT=1025
MAILHOG_WEB_PORT=8025
```

### Template 2: Alternative Ports (infrastructure/.env.conflicts)

```bash
PROJECT_NAME=takedown_atlas
POSTGRES_PORT=5433
REDIS_PORT=6380
MINIO_API_PORT=9002
MINIO_CONSOLE_PORT=9003
MAILHOG_SMTP_PORT=1026
MAILHOG_WEB_PORT=8026
```

## 📋 Project Setup Checklist

When setting up a new project:

- [ ] Choose unique port range for the project
- [ ] Create `infrastructure/.env` with project-specific ports
- [ ] Update `backend/.env` to match infrastructure ports
- [ ] Update any frontend configuration that connects to backend
- [ ] Document the chosen ports in project README
- [ ] Test that all services start without conflicts

## 🐛 Troubleshooting

### "Port already in use" Error

1. Check what's using the port: `lsof -i :5432`
2. Stop the conflicting service or choose different port
3. Update both `infrastructure/.env` and `backend/.env`

### Services Can't Connect

1. Verify ports match between infrastructure and backend configs
2. Check Docker network connectivity: `docker network ls`
3. Restart all services: `docker compose restart`

### Database Connection Issues

1. Ensure Postgres port matches in both configs
2. Check database name and credentials
3. Wait for Postgres to fully start (can take 10-30 seconds)

## 💡 Pro Tips

1. **Use consistent naming**: Always prefix containers with project name
2. **Document port assignments**: Keep a master list of which projects use which ports
3. **Use environment files**: Never hardcode ports in compose files
4. **Automate checks**: Add port conflict detection to your setup scripts
5. **Separate networks**: Use project-specific Docker networks to isolate services

This strategy ensures that you can run multiple projects simultaneously without any port conflicts or service name collisions.
