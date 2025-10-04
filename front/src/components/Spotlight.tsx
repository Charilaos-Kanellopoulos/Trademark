import React from 'react';
import './Spotlight.css';

type Props = {
  image: string;
  label?: string;
  title: string;
  summary: string;
  authorName?: string;
  authorRole?: string;
  cta?: string;
};

const Spotlight: React.FC<Props> = ({ image, label, title, summary, authorName, authorRole, cta }) => {
  return (
    <section className="spotlight" style={{ backgroundImage: `url(${image})` }}>
      <div className="spotlight-overlay"></div>
      <div className="spotlight-inner container">
        <div className="spotlight-left">
          {label && <div className="spotlight-label">{label}</div>}
          <h2 className="spotlight-title" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="spotlight-summary">{summary}</p>

          <div className="spotlight-author">
            <div className="author-photo" aria-hidden></div>
            <div className="author-meta">
              <div className="author-name">{authorName}</div>
              <div className="author-role">{authorRole}</div>
            </div>
          </div>

          <div className="spotlight-cta">
            <div className="spotlight-rule" />
            {cta && (
              <a className="spotlight-link" href="#">{cta} <span className="arrow">→</span></a>
            )}
          </div>
        </div>
        <div className="spotlight-right" aria-hidden />
      </div>
    </section>
  );
};

export default Spotlight;
