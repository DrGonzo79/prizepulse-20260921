"use client";

import { useMemo, useState } from "react";
import demo from "../data/demo.json";

type Prize = (typeof demo.prizes)[number];

function weightedPick(prizes: Prize[], seed: number) {
  const total = prizes.reduce((sum, prize) => sum + prize.weight, 0);
  let cursor = seed % total;
  for (const prize of prizes) {
    cursor -= prize.weight;
    if (cursor < 0) return prize;
  }
  return prizes[prizes.length - 1];
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [leads, setLeads] = useState(128);
  const [copied, setCopied] = useState(false);
  const [campaign, setCampaign] = useState(demo.campaigns[0]);

  const odds = useMemo(() => {
    const total = demo.prizes.reduce((sum, prize) => sum + prize.weight, 0);
    return demo.prizes.map((prize) => ({ ...prize, probability: Math.round((prize.weight / total) * 100) }));
  }, []);

  const spin = async () => {
    setCopied(false);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email to reveal your reward.");
      return;
    }
    if (!consent) {
      setError("Consent is required before this demo can capture a lead.");
      return;
    }
    setError("");
    setResult(null);
    setIsSpinning(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    const seed = [...email.toLowerCase()].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    setResult(weightedPick(demo.prizes, seed));
    setLeads((value) => value + 1);
    setIsSpinning(false);
  };

  const copyCode = async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.code); } catch { /* preview clipboard may be unavailable */ }
    setCopied(true);
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#builder" aria-label="PrizePulse home"><span>✦</span> PrizePulse</a>
        <span className="demo-pill">Interactive demo · fictional data</span>
      </header>
      <section className="hero" id="builder">
        <div className="hero-copy">
          <p className="eyebrow">Campaign studio / Summer launch</p>
          <h1>Turn a costly click into a moment worth playing.</h1>
          <p className="lede">Configure a transparent instant-win campaign, capture a consented lead, and deliver a real reward code—inside one testable workflow.</p>
          <div className="proof-row"><strong>29.99%</strong><span>reported spin-to-win conversion benchmark*</span></div>
          <p className="fine">*Third-party benchmark cited by the source. Not a guarantee.</p>
        </div>
        <div className="stat-grid" aria-label="Demo campaign metrics">
          <article><span>Demo leads</span><strong>{leads}</strong><small>+1 after a valid play</small></article>
          <article><span>Prize budget</span><strong>$384</strong><small>simulated exposure</small></article>
          <article><span>Lead rate</span><strong>18.6%</strong><small>fictional baseline</small></article>
        </div>
      </section>
      <section className="workspace">
        <aside className="control-panel" aria-label="Campaign controls">
          <p className="section-label">1 · Pick a campaign</p>
          <div className="campaign-list">
            {demo.campaigns.map((item) => (
              <button key={item.id} className={campaign.id === item.id ? "campaign active" : "campaign"} onClick={() => { setCampaign(item); setResult(null); }} aria-pressed={campaign.id === item.id}>
                <span>{item.icon}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>
              </button>
            ))}
          </div>
          <p className="section-label">2 · Review published odds</p>
          <div className="odds">{odds.map((prize) => <div key={prize.id}><span><i style={{ background: prize.color }} />{prize.label}</span><strong>{prize.probability}%</strong></div>)}</div>
          <div className="guardrail"><strong>Budget guardrail</strong><p>Every play is deterministic in this demo. Production would reserve inventory server-side before a code is issued.</p></div>
        </aside>
        <section className="preview-panel" aria-label="Playable campaign preview">
          <div className="preview-head"><div><p className="section-label">Live preview</p><h2>{campaign.name}</h2></div><span>{campaign.icon}</span></div>
          <div className={isSpinning ? "wheel spinning" : "wheel"} aria-label="Prize wheel"><div className="wheel-core"><span>{isSpinning ? "Drawing…" : result ? result.label : "PLAY"}</span></div></div>
          {!result ? (
            <form onSubmit={(event) => { event.preventDefault(); void spin(); }} noValidate>
              <label htmlFor="email">Work email</label>
              <div className="input-row"><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@brand.com" aria-describedby="email-help" /><button disabled={isSpinning} type="submit">{isSpinning ? "Drawing reward…" : "Unlock my play"}</button></div>
              <label className="check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />I agree to receive this demo brand&apos;s offer. No data leaves this browser.</label>
              <p id="email-help" className="fine">Demo-only lead capture. Email is held in component state and never persisted.</p>
              {error && <p className="error" role="alert">{error}</p>}
            </form>
          ) : (
            <div className="result" role="status">
              <p>You unlocked</p><h3>{result.label}</h3><code>{result.code}</code>
              <button onClick={() => void copyCode()}>{copied ? "Code copied" : "Copy reward code"}</button>
              <button className="text-button" onClick={() => { setResult(null); setEmail(""); setConsent(false); }}>Try another demo lead</button>
            </div>
          )}
        </section>
      </section>
      <section className="how-it-works">
        <p className="section-label">What the backend proves</p><h2>A prize engine, not a painted-on button.</h2>
        <div className="steps"><article><b>01</b><h3>Validate</h3><p>Reject invalid email, missing consent, duplicate prize IDs, and weights outside policy.</p></article><article><b>02</b><h3>Allocate</h3><p>Choose against explicit weights and return the reward with a deterministic audit roll.</p></article><article><b>03</b><h3>Guard spend</h3><p>Check remaining inventory and fall back to the no-cost reward before overspending.</p></article></div>
      </section>
      <footer>PrizePulse is a fictional prototype. Python/FastAPI source is tested but not deployed on GitHub Pages.</footer>
    </main>
  );
}
