import React, { useState, useEffect, useRef } from 'react';
import './Faq.css';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  title?: string;
};

const Faq: React.FC<Props> = ({ items, title = 'Συχνές Ερωτήσεις' }) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('faq-item-visible');
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{title}</h2>
        
        <div className="faq-items">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`faq-item faq-item-animate ${activeId === item.id ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="faq-header"
                onClick={() => toggleItem(item.id)}
                aria-expanded={activeId === item.id}
              >
                <span className="faq-question">{item.question}</span>
                <span className="faq-icon">
                  {activeId === item.id ? '−' : '+'}
                </span>
              </button>
              
              {activeId === item.id && (
                <div className="faq-content">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
