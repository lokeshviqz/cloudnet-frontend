import { useEffect, useRef } from "react";
import L from "leaflet";
import { maplibreGL } from "@maplibre/maplibre-gl-leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./visuals.css";
import "./WorldMapVisual.css";

type Csp = "aws" | "azure" | "gcp" | "oci";

type Site = {
  id: string;
  label: string;
  hub: string;
  csp: Csp;
  lat: number;
  lng: number;
};

const sites: Site[] = [
  { id: "ash-1", label: "us-ashburn-1", hub: "OCI DRG", csp: "oci", lat: 39.04, lng: -77.49 },
  { id: "ash-2", label: "us-ashburn-1", hub: "OCI DRG", csp: "oci", lat: 38.7, lng: -76.9 },
  { id: "fra", label: "eu-frankfurt-1", hub: "TGW Connect", csp: "aws", lat: 50.11, lng: 8.68 },
  { id: "weu", label: "westeurope", hub: "WAN Hub", csp: "azure", lat: 52.37, lng: 4.9 },
  { id: "paris", label: "eu-paris-1", hub: "OCI DRG", csp: "oci", lat: 48.86, lng: 2.35 },
  { id: "euw1", label: "eu-west-1", hub: "AWS", csp: "aws", lat: 53.35, lng: -6.26 },
  { id: "pnq", label: "centralindia", hub: "PNQ", csp: "azure", lat: 18.52, lng: 73.86 },
  { id: "bom", label: "ap-south-1", hub: "NCC Hub", csp: "gcp", lat: 19.08, lng: 72.88 },
  { id: "sin", label: "ap-singapore-1", hub: "OCI DRG", csp: "oci", lat: 1.29, lng: 103.85 },
  { id: "sin2", label: "ap-singapore-1", hub: "OCI DRG", csp: "oci", lat: 1.45, lng: 104.1 },
  { id: "nrt", label: "ap-northeast-1", hub: "Tokyo", csp: "aws", lat: 35.68, lng: 139.69 },
  { id: "nrt-az", label: "ap-northeast-1", hub: "Azure", csp: "azure", lat: 35.45, lng: 139.9 },
  { id: "icn", label: "ap-northeast-2", hub: "TGW Connect", csp: "aws", lat: 37.57, lng: 126.98 },
];

const tunnels: Array<[string, string, "idle" | "active" | "mesh"]> = [
  ["ash-1", "fra", "idle"],
  ["ash-1", "nrt", "idle"],
  ["ash-2", "paris", "idle"],
  ["weu", "pnq", "idle"],
  ["fra", "bom", "idle"],
  ["euw1", "nrt", "idle"],
  ["pnq", "sin", "active"],
  ["bom", "nrt-az", "mesh"],
  ["sin", "nrt", "idle"],
  ["nrt", "icn", "active"],
  ["paris", "sin2", "idle"],
];

const cspColor: Record<Csp, string> = {
  aws: "#FF9900",
  azure: "#0078D4",
  gcp: "#34A853",
  oci: "#C74634",
};

/** Same tile host used by mcn-business-layer-ui (OpenFreeMap). */
const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const OPENFREEMAP_ATTRIBUTION =
  '<a href="https://openfreemap.org/" target="_blank">OpenFreeMap</a> ' +
  '<a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> ' +
  'Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';

function markerIcon(site: Site) {
  return L.divIcon({
    className: "cn-map-marker",
    html: `
      <div class="cn-marker-card">
        <span class="cn-marker-dot" style="background:${cspColor[site.csp]}"></span>
        <div class="cn-marker-text">
          <strong>${site.label}</strong>
          <small>${site.hub}</small>
        </div>
      </div>
    `,
    iconSize: [140, 40],
    iconAnchor: [20, 20],
  });
}

function addBasemap(map: L.Map): L.Layer {
  // Free light-gray raster fallback (no API key) — similar look to the product screenshot.
  const esriLight = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 16,
      minZoom: 1,
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
      noWrap: true,
    },
  );

  try {
    const glLayer = maplibreGL({
      style: OPENFREEMAP_STYLE,
      minZoom: 1,
      maxZoom: 18,
    });

    let settled = false;
    const useFallback = () => {
      if (settled) return;
      settled = true;
      try {
        if (map.hasLayer(glLayer)) map.removeLayer(glLayer);
      } catch {
        /* ignore */
      }
      if (!map.hasLayer(esriLight)) esriLight.addTo(map);
    };

    glLayer.addTo(map);

    const glMap = glLayer.getMaplibreMap?.();
    if (glMap && typeof glMap.on === "function") {
      glMap.on("load", () => {
        settled = true;
      });
      // Only fall back on repeated tile/source failures, not first paint noise.
      let errors = 0;
      glMap.on("error", () => {
        errors += 1;
        if (errors >= 2) useFallback();
      });
    }

    // If OpenFreeMap never becomes ready, fall back.
    window.setTimeout(() => {
      if (!settled) useFallback();
    }, 4000);

    map.attributionControl?.addAttribution(OPENFREEMAP_ATTRIBUTION);
    return glLayer;
  } catch {
    esriLight.addTo(map);
    return esriLight;
  }
}

export function WorldMapVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const bounds = L.latLngBounds([-85, -180], [85, 180]);
    const map = L.map(containerRef.current, {
      center: [20, 40],
      zoom: 2,
      zoomControl: true,
      attributionControl: true,
      minZoom: 2,
      maxZoom: 8,
      worldCopyJump: false,
      maxBounds: bounds,
      maxBoundsViscosity: 0.85,
    });
    map.zoomControl.setPosition("topleft");
    map.attributionControl.setPrefix(false);
    mapRef.current = map;

    addBasemap(map);

    L.circle([15, 115], {
      radius: 2_800_000,
      color: "#c45c2a",
      weight: 1.5,
      dashArray: "5 4",
      fillColor: "#c45c2a",
      fillOpacity: 0.08,
      interactive: false,
    }).addTo(map);

    L.marker([28, 115], {
      interactive: false,
      icon: L.divIcon({
        className: "cn-apac-label",
        html: "<span>APAC</span>",
        iconSize: [60, 20],
        iconAnchor: [30, 10],
      }),
    }).addTo(map);

    const byId = Object.fromEntries(sites.map((s) => [s.id, s]));

    tunnels.forEach(([from, to, style]) => {
      const a = byId[from];
      const b = byId[to];
      if (!a || !b) return;
      const color =
        style === "active" ? "#c15f27" : style === "mesh" ? "#2f8a5f" : "#9aa3ad";
      L.polyline(
        [
          [a.lat, a.lng],
          [b.lat, b.lng],
        ],
        {
          color,
          weight: style === "idle" ? 1.5 : 2.5,
          opacity: style === "idle" ? 0.75 : 0.95,
          dashArray: style === "idle" ? "4 6" : style === "mesh" ? "7 5" : undefined,
          interactive: false,
        },
      ).addTo(map);
    });

    sites.forEach((site) => {
      L.marker([site.lat, site.lng], { icon: markerIcon(site) }).addTo(map);
    });

    const legend = new L.Control({ position: "topright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "cn-legend-btn");
      div.textContent = "LEGEND";
      return div;
    };
    legend.addTo(map);

    requestAnimationFrame(() => map.invalidateSize());
    const t1 = window.setTimeout(() => map.invalidateSize(), 100);
    const t2 = window.setTimeout(() => map.invalidateSize(), 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="viz world-map-visual" aria-label="World map topology visual">
      <div ref={containerRef} className="world-map-canvas" />
    </div>
  );
}
