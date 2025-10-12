import React, { useEffect, useRef } from "react";
import "./Service.css";

export type PackageItem = {
  tier: "BRONZE" | "SILVER" | "GOLD" | string;
  yearsLabel: string;
  priceLabel: string;
  logoImage: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items: PackageItem[];
};

const tierToClass = (tier: string) =>
  tier.toLowerCase().includes("bronze")
    ? "bronze"
    : tier.toLowerCase().includes("silver")
    ? "silver"
    : tier.toLowerCase().includes("gold")
    ? "gold"
    : "default";

const iconForTier = (tier: string) => {
  const t = tier.toLowerCase();
  if (t.includes("bronze")) return <PencilIcon />;
  if (t.includes("silver")) return <AtomIcon />;
  if (t.includes("gold")) return <DiamondIcon />;
  return <PencilIcon />;
};

const Service: React.FC<Props> = ({
  title = "Πακέτα Trademark Radar",
  subtitle = "Η προστασία του σήματός σας, προσαρμοσμένη στις ανάγκες σας.",
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".pkg__card"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pricing" className="pkg">
      {/* Background video */}
      <video className="pkg-video" autoPlay loop muted playsInline>
        <source src="/section-6.mp4" type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>
      
      {/* Overlay */}
      <div className="pkg-overlay"></div>
      
      <div className="pkg__container" ref={containerRef}>
        <h2 className="pkg__title">{title}</h2>
        <p className="pkg__subtitle">{subtitle}</p>

        <div className="pkg__grid">
          {items.map((p, i) => {
            const tierClass = tierToClass(p.tier);
            return (
              <article
                key={p.tier + i}
                className={`pkg__card ${tierClass} ${
                  i === 0 ? "enter-left" : i === 1 ? "enter-up" : "enter-right"
                }`}
              >
                {/* shine sweep effect */}
                <span className="pkg__shine" aria-hidden />

                {/* colored accent bar at top */}
                <span className="pkg__accent" aria-hidden />
                {/* logo image in top right */}
                <div className="pkg__logo">
                  <img src={p.logoImage} alt={`${p.tier} logo`} />
                </div>

                {/* card content */}
                <div className="pkg__body">
                  <h3 className="pkg__tier">{p.tier}</h3>
                  <div className="pkg__features">
                    <div>24/7 Support</div>
                    <div>Ετή</div>
                  </div>
                </div>

                {/* pricing overlay */}
                <div className="pkg__overlay">
                  <div className="pkg__overlay-inner">
                    <div className="pkg__years">{p.yearsLabel}</div>
                    <div className="pkg__price-container">
                      <span className="pkg__amount">{p.priceLabel}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;

// ===== SVG icons to match screenshot style =====
function PencilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <path d="M4 7c3 3 13 3 16 0M4 17c3-3 13-3 16 0"/>
      <path d="M7 4c3 3 3 13 0 16M17 4c-3 3-3 13 0 16"/>
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 5-10 13L2 8l4-5z"/>
      <path d="M2 8h20M7 3l5 13L17 3"/>
    </svg>
  );
}
