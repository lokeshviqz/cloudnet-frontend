import "./visuals.css";

export function PrivateConnectivityVisual() {
  return (
    <div className="viz" aria-label="Public versus private connectivity visual">
      <svg viewBox="0 0 860 360" role="img">
        <rect width="860" height="360" fill="#fff" />

        {/* Public lane */}
        <rect x={20} y={20} width={400} height={320} fill="#f6ebe7" stroke="#e0c4b8" />
        <text x={36} y={48} className="viz-title" fill="#8a4b3a">
          PUBLIC INTERNET
        </text>

        <rect x={50} y={70} width={70} height={34} fill="#fff" stroke="#8a4b3a" strokeWidth="2" />
        <text x={85} y={92} textAnchor="middle" className="viz-title">
          Grafana
        </text>
        <rect x={185} y={70} width={70} height={34} fill="#fff" stroke="#8a4b3a" strokeWidth="2" />
        <text x={220} y={92} textAnchor="middle" className="viz-title">
          API
        </text>
        <rect x={320} y={70} width={70} height={34} fill="#fff" stroke="#8a4b3a" strokeWidth="2" />
        <text x={355} y={92} textAnchor="middle" className="viz-title">
          Postgres
        </text>

        <path d="M120 87 C145 55 160 120 185 87" fill="none" stroke="#8a4b3a" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M255 87 C285 50 300 125 320 87" fill="none" stroke="#8a4b3a" strokeWidth="2" strokeDasharray="4 4" />

        <ellipse cx={220} cy={180} rx={130} ry={40} fill="#fff" stroke="#8a4b3a" strokeDasharray="3 3" />
        <text x={220} y={176} textAnchor="middle" className="viz-label" fill="#8a4b3a">
          PUBLIC INTERNET
        </text>
        <text x={220} y={192} textAnchor="middle" className="viz-label" fill="#8a4b3a">
          jitter · exposure · variable cost
        </text>

        <text x={85} y={260} textAnchor="middle" className="viz-label" fill="#8a4b3a">
          open surface
        </text>
        <text x={220} y={260} textAnchor="middle" className="viz-label" fill="#8a4b3a">
          unstable RTT
        </text>
        <text x={355} y={260} textAnchor="middle" className="viz-label" fill="#8a4b3a">
          public IP risk
        </text>
        <text x={40} y={310} className="viz-label" fill="#8a4b3a">
          Traffic hops unknown internet routes. DB may need a public endpoint.
        </text>

        {/* Private lane */}
        <rect x={440} y={20} width={400} height={320} fill="#e4f0ea" stroke="#b7d0c3" />
        <text x={456} y={48} className="viz-title" fill="#2f5d4a">
          PRIVATE CONNECTIVITY
        </text>

        <rect x={470} y={70} width={70} height={34} fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <text x={505} y={92} textAnchor="middle" className="viz-title">
          Grafana
        </text>
        <rect x={605} y={70} width={70} height={34} fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <text x={640} y={92} textAnchor="middle" className="viz-title">
          API
        </text>
        <rect x={740} y={70} width={70} height={34} fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <text x={775} y={92} textAnchor="middle" className="viz-title">
          Postgres
        </text>

        <path d="M540 87 H605" fill="none" stroke="#2f5d4a" strokeWidth="2.5" />
        <path d="M675 87 H740" fill="none" stroke="#2f5d4a" strokeWidth="2.5" />

        <rect x={500} y={150} width={280} height={56} fill="#fff" stroke="#2f5d4a" strokeWidth="2" />
        <text x={640} y={174} textAnchor="middle" className="viz-label" fill="#2f5d4a">
          PRIVATE UNDERLAY
        </text>
        <text x={640} y={192} textAnchor="middle" className="viz-label" fill="#2f5d4a">
          PrivateLink · peering · VPN · interconnect
        </text>

        <line x1={505} y1={104} x2={505} y2={150} stroke="#2f5d4a" strokeWidth="1.5" />
        <line x1={640} y1={104} x2={640} y2={150} stroke="#2f5d4a" strokeWidth="1.5" />
        <line x1={775} y1={104} x2={775} y2={150} stroke="#2f5d4a" strokeWidth="1.5" />

        <text x={505} y={260} textAnchor="middle" className="viz-label" fill="#2f5d4a">
          locked down
        </text>
        <text x={640} y={260} textAnchor="middle" className="viz-label" fill="#2f5d4a">
          stable latency
        </text>
        <text x={775} y={260} textAnchor="middle" className="viz-label" fill="#2f5d4a">
          no public IP
        </text>
        <text x={460} y={310} className="viz-label" fill="#2f5d4a">
          Known private path. Only approved CIDRs / endpoints can reach the DB.
        </text>
      </svg>
    </div>
  );
}
