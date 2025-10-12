import React, { useState } from 'react';
import './TabBlock.css';
import ESGSection from './ESGSection/ESGSection';

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
const TabBlock: React.FC<Props> = ({ tabs = [], sectionTitle, sectionDescription }) => {
  const [active, setActive] = useState(tabs[0]?.id ?? 'one');
  const current = tabs.find(t => t.id === active) ?? tabs[0];

  return (
    <section id="why" className="tabblock">
      {/* Background video */}
      <video className="tabblock-video" autoPlay loop muted playsInline>
        <source src="/section-1.mp4" type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>
      
      {/* Overlay */}
      <div className="tabblock-overlay"></div>
      
      <ESGSection />

    </section>
  );
};

export default TabBlock;
