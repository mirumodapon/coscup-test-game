.PHONY: dev lint

dev:
	uv run uvicorn app.main:app --reload

lint:
	uv run ruff format
