# PrizePulse

PrizePulse is a runnable prototype for transparent, budget-aware instant-win lead capture. A visitor selects a campaign, supplies a valid email and explicit consent, plays, receives a deterministic demo reward, and can copy its code. The FastAPI backend implements the real weighted allocation domain operation with inventory checks.

> All campaign metrics, brands, leads, and rewards are fictional demo data. GitHub Pages hosts the static frontend only; the Python API is source-only and is not deployed.

## Run

```bash
npm ci
npm run dev
```

```bash
cd api
uv sync --frozen
uv run uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run audit:prod
PAGES_BASE_PATH=/prizepulse-20260921 npm run build
cd api && uv run pytest
```

## What works

- Three switchable campaign previews
- Email and consent validation, loading, error, reward, copy, and reset states
- Responsive/mobile-safe workflow with accessible labels and focus styles
- Weighted backend draw that ignores depleted inventory and returns an auditable roll
- Locked Node and Python dependencies, CI, static export, and Dockerfile

Research and product decisions live in [`research/notes.md`](research/notes.md) and [`docs/`](docs/).
