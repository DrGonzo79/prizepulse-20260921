# Product plan

## ICP and JTBD

**ICP:** US-based DTC brands doing $1M–$20M GMV, with a small lifecycle team, meaningful paid traffic, Shopify-like commerce, and insufficient developer time. **JTBD:** “When I launch a paid campaign, help me turn anonymous traffic into consented, purchase-ready leads without losing control of discount liability.”

## MVP and data model

The wedge is one instant-win campaign: merchant configures identity, schedule, consent copy, prizes, weights, inventory, and fallback; shopper submits email/consent; server atomically allocates inventory; events report view → submit → play → reward → redemption.

Entities: `Merchant`, `Campaign`, `Prize(weight, inventory, unit_cost)`, `Lead(consent_at, source)`, `Draw(audit_roll, prize_id, idempotency_key)`, `RewardCode(status)`, and append-only `Event`. Unique constraints on idempotency key and reward code; inventory decremented transactionally.

## Architecture and AI strategy

Static/edge-capable Next.js embed calls a versioned FastAPI allocation service backed by Postgres. A transactional outbox emits analytics; a worker syncs consented leads and redemptions to merchant tools. CDN serves assets; signed campaign configuration prevents tampering. AI is intentionally absent from the allocation path. Later, a model can draft brand copy or suggest variants, but must never select winners, change odds, or infer consent.

## Economics

Start at $499 setup + $199/month per active brand, matching the source's monthly anchor while pricing implementation work. Target <15% support load, <5% infrastructure/reward-operations cost, and >70% gross margin before pass-through prizes. Kill or reprice accounts whose custom design requests turn the business into an agency.

## Validation, GTM, and moat

Sell founder-led to lifecycle agencies and DTC operators already buying paid social. Offer a two-week controlled campaign with a holdout, priced on setup and retained only if cost per redeemed first purchase improves. Moat comes from verified lift benchmarks by traffic source/category, reliable fraud/inventory controls, and agency distribution—not templates. Publish transparent experiment reports instead of promising the 29.99% benchmark.

## Risks

- Sweepstakes, disclosure, consent, accessibility, and regional privacy requirements
- Discount hunters and disposable-email fraud degrading lead quality
- Reward liability, race conditions, and duplicate code issuance
- Popup blockers, brand damage, and mobile interruption fatigue
- Attribution bias and selecting raw lead rate instead of incremental margin

## 30 / 60 / 90 days

- **30:** three concierge campaigns, one mechanic, atomic inventory, holdout instrumentation, redemption import.
- **60:** merchant self-serve configuration, agency workspace, fraud rules, Shopify/Klaviyo pilot integrations.
- **90:** category benchmarks, experiment recommendations, additional reveal surface only if wheel demand is proven, and evidence-based pricing review.
