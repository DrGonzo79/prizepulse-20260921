# CEO Review

**Mode:** Scope reduction. The source proposes five templates; this review accepts one allocation engine and one polished proof because the business risk is qualified incremental demand, not animation breadth.

## Strongest challenges

1. **Premise / ICP:** “Small brands” is too broad. The plan now targets paid-traffic DTC lifecycle managers with a near-term launch and no developer bandwidth.
2. **Economics / GTM:** a higher form-fill rate can destroy margin or fill the CRM with discount hunters. The primary metric is cost per incremental redeemed first purchase against a holdout.
3. **Moat / trust:** game templates are commodities. Durable value requires auditable inventory, compliance, agency distribution, and cross-campaign lift benchmarks.

## Alternatives and decision

Minimal audited wheel (S/Low) beats a five-template studio (L/Medium) and a full embedded experimentation network (XL/High) for the first validation. It reuses standard Next.js/FastAPI patterns, makes failure modes visible, and preserves a migration path to a ledger-backed platform.

## Review by section

1. **Architecture:** keep allocation server-authoritative; browser demo is explicitly non-production. Add transactional ledger before beta.
2. **Errors:** name invalid consent, invalid email, duplicate IDs, depleted inventory, idempotency conflict, and upstream sync failure. Never issue a reward on ambiguous failure.
3. **Security:** rate-limit by campaign/device, sign config, hash or minimize PII, verify CRM scopes, and exclude secrets from the client.
4. **Data/interaction:** cover nil/empty/wrong/long input, double-click, reload after draw, stale inventory, slow connection, and navigation during allocation.
5. **Code quality:** centralize prize schema and allocation rules; keep presentation separate from policy.
6. **Tests:** unit-test boundaries and depletion; integration-test atomic contention/idempotency; browser-test validation, loading, reward, reset, and mobile overflow.
7. **Observability:** alert on negative inventory, duplicate codes, unexplained funnel drops, ledger/outbox lag, and reward-cost spikes.
8. **State:** use Postgres constraints and atomic decrement; analytics is derived, never the inventory source of truth.
9. **API:** authenticate merchant configuration; server chooses randomness; version the draw response and return stable error codes.
10. **Scale:** cache read-only campaign config, never allocation; partition events later, not before evidence.
11. **UX:** show odds/legal copy, explicit consent, keyboard focus, loading/error/empty states, and a stable mobile embed.

## Accepted / deferred / excluded

**Accepted:** one transparent campaign workflow, deterministic demo, real Python allocation operation, docs, tests, CI, Pages. **Deferred:** persistence, merchant auth, CRM/commerce integrations, fraud, payments, experimentation. **Excluded now:** AI winner selection, five bespoke games, live backend hosting, and conversion guarantees.
