import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { AdvantagesVisual } from "../components/visuals/AdvantagesVisual";
import { ApplicationViewVisual } from "../components/visuals/ApplicationViewVisual";
import { CspTopologyVisual } from "../components/visuals/CspTopologyVisual";
import { PrivateConnectivityVisual } from "../components/visuals/PrivateConnectivityVisual";
import { WorldMapVisual } from "../components/visuals/WorldMapVisual";
import "./LandingPage.css";

function useRevealOnScroll() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Section({
  id,
  className,
  children,
}: PropsWithChildren<{ id: string; className: string }>) {
  const ref = useRevealOnScroll();
  return (
    <section id={id} ref={ref} className={`landing-section ${className}`}>
      {children}
    </section>
  );
}

export function LandingPage() {
  return (
    <main className="landing-scroll">
      <Section id="world-map" className="section-world">
        <div className="section-inner split">
          <div className="copy copy-left">
            <h1>Know your connections</h1>
            <p className="summary">
              View your cross-cloud connections and more in a single dashboard.
              Monitor metrics, traffic, and connection status under one roof.
            </p>
            <h2>World map view</h2>
            <p className="desc">
              See your network connections across multiple locations and multiple
              CSPs on a single world map.
            </p>
          </div>
          <div className="media">
            <WorldMapVisual />
          </div>
        </div>
      </Section>

      <Section id="csp-topology" className="section-csp">
        <div className="section-inner split reverse">
          <div className="media">
            <CspTopologyVisual />
          </div>
          <div className="copy copy-right">
            <h2>CSP topology view</h2>
            <p className="desc">
              View all of your network connectivity across different CSPs, along
              with detailed configurations.
            </p>
          </div>
        </div>
      </Section>

      <Section id="application-view" className="section-apps">
        <div className="section-inner stack">
          <div className="media media-wide">
            <ApplicationViewVisual />
          </div>
          <div className="copy copy-bottom">
            <h2>Application view</h2>
            <p className="desc">
              Connect applications, databases, and more via PrivateLink and
              cloud-native resources. Avoid public connectivity costs and reduce
              exposure to the public internet.
            </p>
          </div>
        </div>
      </Section>

      <Section id="private-connectivity" className="section-private">
        <div className="section-inner split">
          <div className="copy copy-left">
            <h2>Why private connectivity wins</h2>
            <p className="desc">
              See what changes when Grafana, APIs, and databases communicate over
              PrivateLink, peering, or VPN instead of the public internet — the
              same apps, on a known private path.
            </p>
          </div>
          <div className="media">
            <PrivateConnectivityVisual />
          </div>
        </div>
      </Section>

      <Section id="advantages" className="section-advantages">
        <div className="section-inner stack">
          <div className="media media-wide">
            <AdvantagesVisual />
          </div>
          <div className="copy copy-bottom">
            <h2>Advantages of private connectivity</h2>
            <p className="desc">
              Stronger security, predictable latency, controllable cost, higher
              reliability, tight access control, and clear operational visibility —
              so every private path can be inventoried and audited.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
