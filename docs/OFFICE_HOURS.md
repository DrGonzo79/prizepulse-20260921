# Office Hours — PrizePulse

**Mode:** Startup diagnostic, autonomous scheduled run  
**Decision:** build the minimal viable proof, not a five-template platform.

## Diagnostic

- **Specific customer:** a lifecycle/e-commerce manager at a small DTC brand spending on paid traffic but lacking engineering capacity for custom promotions.
- **Painful status quo:** generic email popups are ignored; custom interactive campaigns require an agency or developer; spreadsheet-managed prize codes create overspend and duplicate-redemption risk.
- **Desperate use case:** a product drop is in seven days and the manager needs a branded, consent-compliant capture mechanic with bounded reward exposure.
- **Narrowest paid wedge:** one audited instant-win mechanic with transparent odds, inventory caps, exportable consented leads, and reward-code delivery. Charge setup plus a monthly campaign fee only after measured lift.
- **Observation plan:** watch five marketers configure a campaign without help and ten shoppers encounter it. Measure time-to-publish, form abandonment, play completion, lead validity, code redemption, and prize-cost per incremental lead. The key surprise to seek is whether brands value conversion lift or budget certainty more.
- **Future-fit:** as paid acquisition gets noisier and privacy restrictions reduce targeting, owned first-party consent and measurable on-site experiences become more valuable. The product weakens if browsers suppress all interruption patterns or merchants shift fully to marketplace checkout.

## Premises challenged

1. Gamification is not the product; reliable, compliant reward allocation is the product customers can trust.
2. A reported 29.99% conversion rate is not transferable evidence. The test must compare incremental qualified leads and margin, not raw form fills.
3. Five mechanics multiply design and QA before demand is known. Start with one engine and prove one merchant outcome.

## Approaches considered

1. **Minimal viable — audited wheel (recommended):** one frontend workflow plus deterministic allocation API. Effort S, risk Low. Fastest validation and clear failure surface.
2. **Template studio:** wheel, scratcher, trivia, slots, and memory match sharing an engine. Effort L, risk Medium. Broader appeal but diluted learning and higher QA burden.
3. **Ideal architecture — embedded campaign network:** merchant SDK, event stream, inventory ledger, experimentation, fraud controls, and billing. Effort XL, risk High. Defensible data loop, but premature.

## Success criteria and assignment

For three beta brands: publish in under 30 minutes, zero rewards beyond inventory, >95% valid leads, and at least 20% lower cost per redeemed first purchase versus the existing popup. **Assignment:** recruit one brand running paid traffic and conduct an instrumented A/B holdout before adding a second game mechanic.
