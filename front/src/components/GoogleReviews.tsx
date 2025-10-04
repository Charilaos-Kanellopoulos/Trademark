import React, { useEffect, useRef, useState } from 'react';
import './GoogleReviews.css';

export type Review = {
  id: string;
  name: string;
  rating: number; // 1-5
  text: string;
  date?: string;
};

type Props = {
  reviews?: Review[];
  apiFetchUrl?: string; // optional server-side proxy returning Review[]
  max?: number;
};

const sample: Review[] = [
  { id: 'r1', name: 'A. Carter', rating: 5, text: 'Excellent, responsive legal help — highly recommended!', date: '2025-03-02' },
  { id: 'r2', name: 'B. Singh', rating: 4, text: 'Very professional team. Cleared up our issues quickly.', date: '2025-02-15' },
  { id: 'r3', name: 'C. Lopez', rating: 5, text: 'Great experience from start to finish.', date: '2024-11-08' },
];

const GoogleReviews: React.FC<Props> = ({ reviews: initialReviews, apiFetchUrl, max = 5 }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || sample);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    if (apiFetchUrl) {
      setLoading(true);
      fetch(apiFetchUrl)
        .then(r => r.json())
        .then((data: Review[]) => setReviews(data))
        .catch(() => setReviews(initialReviews || sample))
        .finally(() => setLoading(false));
    }
  }, [apiFetchUrl]);

  // aggregate
  const total = reviews.length;
  const avg = total ? +(reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : 0;

  const visible = reviews.slice(0, max);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(visible.length - 1, i + 1));

  // autoplay
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % Math.max(1, visible.length));
    }, 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [visible.length]);

  const stars = (n: number) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  return (
    <section className="google-reviews container">
      <div className="reviews-top">
        <h3 className="reviews-title">What clients say</h3>
        <div className="reviews-summary">
          <div className="avg">{avg} <span className="muted">/ 5</span></div>
          <div className="stars" aria-hidden>{stars(avg)}</div>
          <div className="count muted">{total} reviews</div>
        </div>
      </div>
      {loading && <div className="muted">Loading reviews…</div>}

      <div className="reviews-carousel">
        <button className="carousel-control prev" onClick={prev} aria-label="Previous review">‹</button>
        <div className="reviews-viewport">
          <div className="reviews-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {visible.map(r => (
              <article key={r.id} className="review-card">
                <div className="review-header">
                  <strong className="review-name">{r.name}</strong>
                  <div className="review-rating" aria-hidden>{stars(r.rating)}</div>
                </div>
                <p className="review-text">{r.text}</p>
                {r.date && <div className="review-date muted">{r.date}</div>}
              </article>
            ))}
          </div>
        </div>
        <button className="carousel-control next" onClick={next} aria-label="Next review">›</button>
      </div>

      <div className="carousel-indicators">
        {visible.map((_, i) => (
          <button key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`Show review ${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default GoogleReviews;
