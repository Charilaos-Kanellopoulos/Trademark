import React, { useState } from 'react';
import './TabBlock.css';
import ESGSection from '../Tabblock/ESGSection/ESGSection';

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
      <ESGSection />
    </section>
  );
};

export default TabBlock;
