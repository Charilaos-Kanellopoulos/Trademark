import React, { useRef, useEffect, useState } from 'react';
import './Numbers.css';

type Stat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { id: 's1', value: 2000, suffix: '+', label: 'Σήματα υπό την προστασία μας' },
  { id: 's2', value: 3500, suffix: '+', label: 'Ειδοποιήσεις απειλής' },
  { id: 's3', value: Infinity, label: 'Δυνατότητες παρακολούθησης' },

];

const animateValue = (start: number, end: number, duration: number, onUpdate: (n: number) => void) => {
  const startTime = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = -0.5 * (Math.cos(Math.PI * t) - 1); // easeInOut
    const value = Math.floor(start + (end - start) * eased);
    onUpdate(value);
    if (t < 1) requestAnimationFrame(step);
    else onUpdate(end);
  };
  requestAnimationFrame(step);
};

const Numbers: React.FC<{ title?: string; description?: string }> = ({ title, description }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    stats.forEach((s, i) => {
      animateValue(0, s.value, 1000 + i * 200, (n) => {
        setValues(prev => {
          const copy = [...prev];
          copy[i] = n;
          return copy;
        });
      });
    });
  }, [visible]);

  return (
    <section className="numbers container" ref={ref as any}>
      {title && <h2 className="numbers-title">{title}</h2>}
      {description && <p className="numbers-description">{description}</p>}
      <div className="numbers-grid">
        {stats.map((s, i) => (
          <div key={s.id} className="number-card">
            <div className="number-value">{values[i].toLocaleString()}{s.suffix || ''}</div>
            <div className="number-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Numbers;
