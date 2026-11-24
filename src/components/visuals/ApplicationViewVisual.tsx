import "./visuals.css";

function AppBox({
  x,
  y,
  label,
  kind,
  fill,
}: {
  x: number;
  y: number;
  label: string;
  kind: string;
  fill: string;
}) {
  return (
    <g>
      <rect x={x - 55} y={y - 24} width={110} height={48} fill={fill} stroke="#1c2430" strokeWidth="1.4" />
      <text x={x} y={y - 2} textAnchor="middle" className="viz-title">
        {label}
      </text>
      <text x={x} y={y + 14} textAnchor="middle" className="viz-label">
        {kind}
      </text>
    </g>
  );
}

export function ApplicationViewVisual() {
  return (
    <div className="viz" aria-label="Application private topology visual">
      <svg viewBox="0 0 1100 520" role="img">
        <rect width="1100" height="520" fill="#f7f9fb" />

        <rect x={40} y={40} width={260} height={360} fill="#fff" stroke="#2a6fbb" strokeWidth="2" />
        <rect x={40} y={40} width={260} height={32} fill="#2a6fbb" opacity="0.12" />
        <text x={54} y={61} className="viz-title" fill="#2a6fbb">
          AWS us-east-1
        </text>

        <rect x={420} y={40} width={260} height={400} fill="#fff" stroke="#2f8a5f" strokeWidth="2" />
        <rect x={420} y={40} width={260} height={32} fill="#2f8a5f" opacity="0.12" />
        <text x={434} y={61} className="viz-title" fill="#2f8a5f">
          Azure eu-west-1
        </text>

        <rect x={800} y={40} width={260} height={360} fill="#fff" stroke="#c15f27" strokeWidth="2" />
        <rect x={800} y={40} width={260} height={32} fill="#c15f27" opacity="0.12" />
        <text x={814} y={61} className="viz-title" fill="#c15f27">
          GCP ap-south-1
        </text>

        <path d="M175 220 H420" fill="none" stroke="#2a6fbb" strokeWidth="2.2" />
        <text x={290} y={212} textAnchor="middle" className="viz-label">
          peering
        </text>
        <path d="M545 240 Q 680 210 860 180" fill="none" stroke="#c15f27" strokeWidth="2" strokeDasharray="7 5" />
        <text x={700} y={198} textAnchor="middle" className="viz-label">
          vpn
        </text>
        <path d="M545 370 Q 680 390 860 320" fill="none" stroke="#2f8a5f" strokeWidth="2.2" />
        <text x={700} y={372} textAnchor="middle" className="viz-label">
          replication
        </text>
        <path d="M120 134 V196" fill="none" stroke="#6b3d7a" strokeWidth="2" />
        <path d="M545 134 V216" fill="none" stroke="#6b3d7a" strokeWidth="2" />
        <path d="M545 264 V346" fill="none" stroke="#6b3d7a" strokeWidth="2" />
        <path d="M930 204 V296" fill="none" stroke="#6b3d7a" strokeWidth="2" />

        <AppBox x={120} y={110} label="Grafana" kind="UI" fill="#eef4fb" />
        <AppBox x={120} y={220} label="Prometheus" kind="METRICS" fill="#f3eef6" />
        <AppBox x={120} y={330} label="API app" kind="APP" fill="#e6f4ec" />

        <AppBox x={545} y={110} label="Grafana" kind="UI" fill="#eef4fb" />
        <AppBox x={545} y={240} label="API app" kind="APP" fill="#e6f4ec" />
        <AppBox x={545} y={370} label="Postgres" kind="DB" fill="#faf0ea" />

        <AppBox x={930} y={180} label="API app" kind="APP" fill="#e6f4ec" />
        <AppBox x={930} y={320} label="Postgres RO" kind="DB" fill="#faf0ea" />

        <path
          d="M175 450 Q 550 500 930 430"
          fill="none"
          stroke="#9aa3ad"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          opacity="0.7"
        />
        <text x={550} y={495} textAnchor="middle" className="viz-label">
          public internet path — not used
        </text>
      </svg>
      <div className="viz-legend-row">
        <span><i className="viz-sw" style={{ background: "#6b3d7a" }} /> PrivateLink</span>
        <span><i className="viz-sw" style={{ background: "#2a6fbb" }} /> Peering</span>
        <span><i className="viz-sw" style={{ background: "#c15f27" }} /> VPN</span>
        <span><i className="viz-sw" style={{ background: "#9aa3ad" }} /> Avoided public path</span>
      </div>
    </div>
  );
}
