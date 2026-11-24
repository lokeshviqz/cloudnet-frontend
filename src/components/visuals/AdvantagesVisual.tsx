import "./visuals.css";

const cards = [
  {
    num: "01 / SECURITY",
    title: "Stronger security",
    body: "No public IPs on databases or internal APIs. Smaller attack surface and clearer compliance boundaries.",
    tag: "PrivateLink · CIDR allowlists",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <rect x="70" y="6" width="60" height="44" fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <path d="M85 24 h30 v16 h-30 z" fill="#e4f0ea" stroke="#2f5d4a" />
        <path d="M92 24 v-5 a8 8 0 0 1 16 0 v5" fill="none" stroke="#2f5d4a" strokeWidth="2" />
        <text x="160" y="32" className="viz-label" fill="#2f5d4a">
          private only
        </text>
      </svg>
    ),
  },
  {
    num: "02 / PERFORMANCE",
    title: "Predictable latency",
    body: "Less jitter than public routes — better for DB replication, Grafana queries, and sync API calls.",
    tag: "Stable RTT · less packet loss",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <polyline points="16,44 50,34 80,40 110,18 140,24 184,12" fill="none" stroke="#8a4b3a" strokeWidth="1.5" strokeDasharray="3 3" />
        <polyline points="16,46 50,42 80,38 110,34 140,30 184,26" fill="none" stroke="#2f5d4a" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    num: "03 / COST",
    title: "Controllable cost",
    body: "At higher transfer volumes, private interconnects often beat internet egress with more predictable bills.",
    tag: "Break-even ~ mid TB / month",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <rect x="30" y="32" width="26" height="16" fill="#f6ebe7" stroke="#8a4b3a" />
        <rect x="68" y="24" width="26" height="24" fill="#f6ebe7" stroke="#8a4b3a" />
        <rect x="106" y="16" width="26" height="32" fill="#e4f0ea" stroke="#2f5d4a" strokeWidth="2" />
        <rect x="144" y="10" width="26" height="38" fill="#e4f0ea" stroke="#2f5d4a" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "04 / RELIABILITY",
    title: "Higher reliability",
    body: "Fewer random internet failures. DX / ExpressRoute / Interconnect paths come with clearer SLAs.",
    tag: "Dedicated capacity",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <path d="M20 34 C40 16 60 48 80 28 C100 10 120 44 140 26 C160 14 175 24 184 18" fill="none" stroke="#8a4b3a" strokeDasharray="2 3" opacity="0.6" />
        <line x1="20" y1="40" x2="184" y2="40" stroke="#2f5d4a" strokeWidth="3" />
      </svg>
    ),
  },
  {
    num: "05 / ACCESS CONTROL",
    title: "Tight access control",
    body: "Only peered networks or PrivateLink consumers can reach the service — not the whole internet.",
    tag: "Allow by design",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <rect x="20" y="14" width="40" height="26" fill="#e4f0ea" stroke="#2f5d4a" />
        <text x="40" y="31" textAnchor="middle" className="viz-label" fill="#2f5d4a">
          app
        </text>
        <rect x="120" y="12" width="50" height="30" fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <text x="145" y="31" textAnchor="middle" className="viz-label" fill="#2f5d4a">
          DB
        </text>
        <line x1="60" y1="27" x2="120" y2="27" stroke="#2f5d4a" strokeWidth="2" />
        <text x="100" y="50" className="viz-label" fill="#8a4b3a">
          deny public
        </text>
      </svg>
    ),
  },
  {
    num: "06 / VISIBILITY",
    title: "Operational clarity",
    body: "You can inventory and monitor the exact private path — ideal for CloudNet discovery and audits.",
    tag: "Map every edge",
    svg: (
      <svg viewBox="0 0 200 56" aria-hidden="true">
        <rect x="20" y="12" width="60" height="30" fill="#fff" stroke="#2a4f7a" />
        <text x="50" y="31" textAnchor="middle" className="viz-label" fill="#2a4f7a">
          AWS
        </text>
        <rect x="120" y="12" width="60" height="30" fill="#fff" stroke="#2f5d4a" />
        <text x="150" y="31" textAnchor="middle" className="viz-label" fill="#2f5d4a">
          GCP
        </text>
        <line x1="80" y1="27" x2="120" y2="27" stroke="#2f5d4a" strokeWidth="2" />
      </svg>
    ),
  },
];

export function AdvantagesVisual() {
  return (
    <div className="viz" aria-label="Advantages of private connectivity">
      <div className="adv-grid">
        {cards.map((card) => (
          <article key={card.num} className="adv-card">
            <div className="num">{card.num}</div>
            <div>{card.svg}</div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <span className="tag">{card.tag}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
