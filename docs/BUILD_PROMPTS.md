# Phased build prompts

1. **Ledger phase:** Replace browser draw with authenticated FastAPI campaign lookup, Postgres migrations, transactional inventory decrement, code reservation, idempotency, and contention tests. Preserve the static demo mode.
2. **Merchant phase:** Build a campaign editor for identity, schedule, consent text, weights, inventory, and preview. Add role-based access, audit history, accessible validation, and draft/publish rollback.
3. **Measurement phase:** Add view/submit/play/reward/redemption events, transactional outbox, holdout assignment, funnel dashboard, cost-per-incremental-purchase calculation, and alert/runbook coverage.
4. **Integration phase:** Add least-privilege Shopify/Klaviyo connectors, retries/dead-letter handling, consent provenance, deletion/export workflows, and sandbox contract tests.
5. **Expansion gate:** Only after three retained brands and positive holdout lift, add one new reveal mechanic against the same allocation contract and test whether it improves economics—not merely plays.
