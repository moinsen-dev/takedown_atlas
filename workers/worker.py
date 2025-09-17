"""Celery worker entrypoint for local development."""
from backend.app.tasks.celery_app import celery_app


def main() -> None:
  celery_app.worker_main()


if __name__ == "__main__":
  main()
