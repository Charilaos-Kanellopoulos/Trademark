import React, { useState } from 'react';
import './TabBlock.css';

export type TabItem = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  tabs?: TabItem[];
  sectionTitle?: string;
  sectionDescription?: string;
};

const defaultTabs: TabItem[] = [
  {
    id: 'one',
    title: 'Επιλογή 1',
    description: 'Περιγραφή για την πρώτη επιλογή. Σύντομο κείμενο που εξηγεί τι περιλαμβάνει.',
  },
  {
    id: 'two',
    title: 'Επιλογή 2',
    description: 'Περιγραφή για τη δεύτερη επιλογή. Πατήστε τις καρτέλες για να αλλάξει το περιεχόμενο.',
  },
  {
    id: 'three',
    title: 'Επιλογή 3',
    description: 'Περιγραφή για την τρίτη επιλογή. Ιδανικό για την περίπτωσή σας.',
  },
];

const TabBlock: React.FC<Props> = ({ tabs = defaultTabs, sectionTitle, sectionDescription }) => {
  const [active, setActive] = useState(tabs[0]?.id ?? 'one');
  const current = tabs.find(t => t.id === active) ?? tabs[0];

  return (
    <section className="tabblock">
      {(sectionTitle || sectionDescription) && (
        <header className="tabblock__header">
          {sectionTitle && <h2 className="tabblock__section-title">{sectionTitle}</h2>}
          {sectionDescription && <p className="tabblock__section-desc">{sectionDescription}</p>}
        </header>
      )}

      {current && (
        <div
          className="tabblock__panel"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <h3 className="tabblock__title">{current.title}</h3>
          <p className="tabblock__desc">{current.description}</p>
        </div>
      )}

      <div className="tabblock__tabs mt-2" role="tablist" aria-label="Επιλογές">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tabblock__tab ${active === t.id ? 'is-active' : ''}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            onClick={() => setActive(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TabBlock;
