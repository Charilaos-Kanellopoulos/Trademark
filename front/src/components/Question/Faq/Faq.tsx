import React, { useState } from 'react';
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

  const toggleItem = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{title}</h2>
        
        <div className="faq-items">
          {items.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${activeId === item.id ? 'active' : ''}`}
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
