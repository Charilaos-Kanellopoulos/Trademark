import React, { useEffect, useRef } from "react";
import "./Service.css";

export type PackageItem = {
  tier: "BRONZE" | "SILVER" | "GOLD" | string;
  yearsLabel: string;
  priceLabel: string;
  image: string;
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

  // parallax κίνηση εικόνας στο hover
  const onMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = card.querySelector<HTMLElement>(".pkg__image");
    if (img) img.style.transform = `scale(1.06) translate(${x * 10}px, ${y * 10}px)`;
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const img = card.querySelector<HTMLElement>(".pkg__image");
    if (img) img.style.transform = "";
  };

  return (
    <section className="pkg">
      <div className="pkg__container" ref={containerRef}>
        <h2 className="pkg__title">{title}</h2>
        <hr className="pkg__rule" />
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
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              >
                {/* gradient border & shine */}
                <span className="pkg__shine" aria-hidden />

                {/* accent bar ανά tier */}
                <span className="pkg__accent" aria-hidden />

                {/* μικρό badge με gradient */}
                <span className="pkg__badge" aria-hidden />

                <div
                  className="pkg__image"
                  style={{ backgroundImage: `url(${p.image})` }}
                  aria-hidden="true"
                />
                <div className="pkg__body">
                  <h3 className="pkg__tier">{p.tier}</h3>
                </div>

                <div className="pkg__overlay">
                  <div className="pkg__overlay-inner">
                    <div className="pkg__years">{p.yearsLabel}</div>
                    <div className="pkg__price">{p.priceLabel}</div>
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
