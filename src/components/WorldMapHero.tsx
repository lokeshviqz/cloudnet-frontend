import { useMemo, useState } from "react";
import "./WorldMapHero.css";

type Csp = "aws" | "azure" | "gcp" | "oci";

type Marker = {
  id: string;
  label: string;
  sub: string;
  csp: Csp;
  x: number;
  y: number;
};

type Link = {
  from: string;
  to: string;
  style: "idle" | "active" | "mesh";
};

const markers: Marker[] = [
  { id: "ash", label: "us-ashburn-1", sub: "OCI", csp: "oci", x: 320, y: 210 },
  { id: "use1", label: "us-east-1", sub: "AWS", csp: "aws", x: 300, y: 250 },
  { id: "eus", label: "eastus", sub: "Azure", csp: "azure", x: 340, y: 235 },
  { id: "fra", label: "eu-frankfurt", sub: "AWS", csp: "aws", x: 700, y: 185 },
  { id: "weu", label: "westeurope", sub: "Azure", csp: "azure", x: 680, y: 210 },
  { id: "oci-fra", label: "eu-frankfurt-1", sub: "OCI DRG", csp: "oci", x: 720, y: 225 },
  { id: "pnq", label: "centralindia", sub: "Azure", csp: "azure", x: 920, y: 300 },
  { id: "bom", label: "ap-mumbai-1", sub: "OCI", csp: "oci", x: 940, y: 325 },
  { id: "sin", label: "ap-southeast-1", sub: "AWS", csp: "aws", x: 1050, y: 360 },
  { id: "nrt", label: "ap-northeast-1", sub: "AWS", csp: "aws", x: 1140, y: 230 },
  { id: "gcp-asia", label: "asia-south1", sub: "GCP NCC", csp: "gcp", x: 900, y: 280 },
];

const links: Link[] = [
  { from: "ash", to: "fra", style: "idle" },
  { from: "use1", to: "weu", style: "idle" },
  { from: "eus", to: "pnq", style: "idle" },
  { from: "fra", to: "gcp-asia", style: "idle" },
  { from: "weu", to: "bom", style: "mesh" },
  { from: "pnq", to: "sin", style: "active" },
  { from: "bom", to: "nrt", style: "idle" },
  { from: "gcp-asia", to: "sin", style: "active" },
  { from: "sin", to: "nrt", style: "mesh" },
];

const cspColor: Record<Csp, string> = {
  aws: "#c15f27",
  azure: "#2a6fbb",
  gcp: "#2f8a5f",
  oci: "#b33a3a",
};

function projectCurve(a: Marker, b: Marker) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const bulge = Math.min(90, dist * 0.18);
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = my > 320 ? 1 : -1;
  const cx = mx + nx * bulge * sign;
  const cy = my + ny * bulge * sign;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function WorldMapHero() {
  const [selected, setSelected] = useState<string | null>("pnq");
  const [legendOpen, setLegendOpen] = useState(false);
  const byId = useMemo(() => Object.fromEntries(markers.map((m) => [m.id, m])), []);

  return (
    <div className="map-hero" aria-label="World map of multi-CSP connections">
      <div className="map-controls" aria-hidden="true">
        <button type="button">+</button>
        <button type="button">−</button>
      </div>

      <button
        type="button"
        className="legend-btn"
        onClick={() => setLegendOpen((v) => !v)}
      >
        LEGEND
      </button>

      {legendOpen && (
        <div className="legend-pop">
          <div><i className="sw aws" /> AWS</div>
          <div><i className="sw azure" /> Azure</div>
          <div><i className="sw gcp" /> GCP</div>
          <div><i className="sw oci" /> OCI</div>
          <div><i className="sw idle" /> Discovered tunnel</div>
          <div><i className="sw active" /> Active private path</div>
        </div>
      )}

      <svg viewBox="0 0 1400 720" className="map-svg" role="img">
        <rect width="1400" height="720" fill="#eef1f4" />
        <g opacity="0.95">
          <path className="land" d="M180 140 C220 110 280 100 340 120 C390 145 420 180 400 230 C370 280 320 300 270 290 C220 275 190 240 170 200 C155 170 160 150 180 140 Z" />
          <path className="land" d="M310 310 C340 320 360 360 355 410 C345 470 330 520 310 560 C295 540 285 490 290 450 C295 400 290 350 310 310 Z" />
          <path className="land" d="M430 70 C460 55 500 70 495 110 C480 140 450 135 430 115 C415 95 415 80 430 70 Z" />
          <path className="land" d="M640 130 C680 115 720 125 740 155 C745 185 720 200 690 195 C660 190 635 170 640 130 Z" />
          <path className="land" d="M660 230 C710 220 750 250 760 300 C765 360 745 420 710 450 C680 430 665 380 655 330 C650 280 640 245 660 230 Z" />
          <path className="land" d="M760 110 C860 90 980 100 1080 140 C1140 170 1160 220 1120 260 C1060 240 1000 230 940 220 C880 210 820 190 780 160 C750 140 740 120 760 110 Z" />
          <path className="land" d="M920 280 C945 275 965 295 960 330 C945 360 925 355 915 325 C908 300 908 285 920 280 Z" />
          <path className="land" d="M1040 250 C1080 245 1110 270 1100 310 C1080 340 1050 335 1035 300 C1025 275 1025 255 1040 250 Z" />
          <path className="land" d="M1165 220 C1185 215 1200 235 1190 255 C1175 265 1160 250 1165 220 Z" />
          <path className="land" d="M1080 430 C1140 415 1200 435 1210 480 C1195 520 1135 530 1090 510 C1060 490 1055 450 1080 430 Z" />
        </g>

        <ellipse
          className="apac-ring"
          cx="1000"
          cy="310"
          rx="220"
          ry="150"
        />
        <text className="apac-label" x="1000" y="180" textAnchor="middle">
          APAC
        </text>

        {links.map((link) => {
          const a = byId[link.from];
          const b = byId[link.to];
          const hot =
            selected === a.id || selected === b.id || selected === null;
          return (
            <path
              key={`${link.from}-${link.to}`}
              d={projectCurve(a, b)}
              className={`edge edge-${link.style}${hot ? "" : " dim"}`}
            />
          );
        })}

        {markers.map((m) => (
          <g
            key={m.id}
            className={`marker${selected === m.id ? " selected" : ""}`}
            transform={`translate(${m.x}, ${m.y})`}
            onClick={() => setSelected(m.id)}
            style={{ cursor: "pointer" }}
          >
            <rect className="marker-card" x={-54} y={-22} width={108} height={44} />
            <circle cx={-40} cy={0} r={5} fill={cspColor[m.csp]} />
            <text className="marker-title" x={-28} y={-2}>
              {m.label}
            </text>
            <text className="marker-sub" x={-28} y={14}>
              {m.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
