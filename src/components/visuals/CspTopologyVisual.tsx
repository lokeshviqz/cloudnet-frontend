import "./visuals.css";

type Node = { x: number; y: number; w: number; h: number; title: string; sub: string; accent?: string };

const columns = [
  { title: "AWS", x: 30, color: "#c15f27" },
  { title: "Azure", x: 290, color: "#2a6fbb" },
  { title: "GCP", x: 550, color: "#2f8a5f" },
  { title: "OCI", x: 810, color: "#b33a3a" },
];

const nodes: Node[] = [
  { x: 50, y: 70, w: 150, h: 48, title: "vpc-use1", sub: "10.1.0.0/16" },
  { x: 50, y: 140, w: 150, h: 48, title: "vpc-euc1", sub: "10.0.0.0/16" },
  { x: 50, y: 230, w: 150, h: 56, title: "global-crm", sub: "ECS · 3 tasks", accent: "#c15f27" },
  { x: 50, y: 310, w: 150, h: 56, title: "ai-training-prod", sub: "GPU · residency risk", accent: "#b33a3a" },
  { x: 50, y: 400, w: 150, h: 48, title: "edge-hybrid", sub: "TGW attach" },
  { x: 50, y: 470, w: 150, h: 48, title: "Ground DC", sub: "on-prem" },

  { x: 310, y: 70, w: 150, h: 48, title: "vnet-weu", sub: "10.20.0.0/16" },
  { x: 310, y: 140, w: 150, h: 48, title: "vnet-uae", sub: "10.44.0.0/16" },
  { x: 310, y: 230, w: 150, h: 56, title: "customer-agents", sub: "AKS · 12 pods" },
  { x: 310, y: 310, w: 150, h: 56, title: "emea-trading", sub: "App Service" },
  { x: 310, y: 400, w: 150, h: 48, title: "External LLM", sub: "3rd party", accent: "#9aa3ad" },

  { x: 570, y: 70, w: 150, h: 48, title: "vpc-eu", sub: "10.40.0.0/16" },
  { x: 570, y: 140, w: 150, h: 48, title: "vpc-us", sub: "10.41.0.0/16" },
  { x: 570, y: 250, w: 150, h: 56, title: "retail-payments", sub: "GKE · 8 pods" },

  { x: 830, y: 70, w: 150, h: 48, title: "vcn-fra", sub: "10.88.0.0/16" },
  { x: 830, y: 180, w: 150, h: 56, title: "oracle-fusion-erp", sub: "DRG attached" },
];

const edges: Array<{ x1: number; y1: number; x2: number; y2: number; color: string; dash?: string }> = [
  { x1: 125, y1: 118, x2: 125, y2: 140, color: "#2f8a5f" },
  { x1: 200, y1: 258, x2: 310, y2: 258, color: "#4a6b8a" },
  { x1: 385, y1: 188, x2: 570, y2: 164, color: "#4a6b8a" },
  { x1: 720, y1: 164, x2: 830, y2: 94, color: "#4a6b8a" },
  { x1: 385, y1: 286, x2: 385, y2: 400, color: "#c45c2a", dash: "5 4" },
  { x1: 125, y1: 286, x2: 125, y2: 310, color: "#b33a3a", dash: "5 4" },
  { x1: 200, y1: 424, x2: 310, y2: 338, color: "#9aa3ad", dash: "4 4" },
  { x1: 125, y1: 448, x2: 125, y2: 470, color: "#c15f27", dash: "4 4" },
];

export function CspTopologyVisual() {
  return (
    <div className="viz" aria-label="CSP topology visual">
      <svg viewBox="0 0 1040 560" role="img">
        <rect width="1040" height="560" fill="#f7f9fb" />
        {columns.map((col) => (
          <g key={col.title}>
            <rect x={col.x} y={20} width={220} height={500} fill="#fff" stroke={col.color} strokeWidth="2" />
            <rect x={col.x} y={20} width={220} height={32} fill={col.color} opacity="0.12" />
            <text x={col.x + 14} y={41} className="viz-title" fill={col.color}>
              {col.title}
            </text>
          </g>
        ))}

        {edges.map((e, i) => (
          <path
            key={i}
            d={`M ${e.x1} ${e.y1} Q ${(e.x1 + e.x2) / 2} ${(e.y1 + e.y2) / 2 - 18} ${e.x2} ${e.y2}`}
            fill="none"
            stroke={e.color}
            strokeWidth="2"
            strokeDasharray={e.dash ?? "0"}
          />
        ))}

        {nodes.map((n) => (
          <g key={n.title}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              fill="#fff"
              stroke={n.accent ?? "#1c2430"}
              strokeWidth={n.accent ? 2 : 1.4}
              strokeDasharray={n.title === "External LLM" ? "4 3" : "0"}
            />
            <text x={n.x + 12} y={n.y + 20} className="viz-title">
              {n.title}
            </text>
            <text x={n.x + 12} y={n.y + 38} className="viz-label">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <div className="viz-legend-row">
        <span><i className="viz-sw" style={{ background: "#2f8a5f" }} /> Peering</span>
        <span><i className="viz-sw" style={{ background: "#4a6b8a" }} /> Cross-cloud transit</span>
        <span><i className="viz-sw" style={{ background: "#c45c2a" }} /> Observed flow</span>
        <span><i className="viz-sw" style={{ background: "#b33a3a" }} /> Residency / policy risk</span>
      </div>
    </div>
  );
}
