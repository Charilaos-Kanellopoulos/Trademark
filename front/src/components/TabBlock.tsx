import React, { useState } from 'react';
import './TabBlock.css';
import { useEffect } from 'react';

type Tab = {
    id: string;
    title: string;
    heading: string;
    text: string;
    link?: string;
    icon?: string;
};

const tabs: Tab[] = [
    {
        id: 'tab-1',
        title: 'Seven offices across the UK',
        heading: 'Seven offices across the UK',
        text: 'Seven offices across the UK',
        icon: '🏢',
        link: '#'
    },
    {
        id: 'tab-2',
        title: 'Commitment to continued ESG',
        heading: 'A commitment to our clients,\nour staff, and the planet',
        text: 'We have developed an in depth four pillar ESG and CSR strategy that highlights our key commitments, complemented by KPIs and targets that allow us to track progress and over time.',
        link: 'https://www.birketts.co.uk/environmental-social-governance/'
        , icon: '🌍'
    },
    {
        id: 'tab-3',
        title: 'Experts in over 15 law sectors',
        heading: 'Experts in over 15 law sectors',
        text: 'We have deep sector expertise spanning over 15 markets. The Birketts approach means being a proactive partner, horizon scanning and thinking ahead to the challenges, changes and opportunities you may face.',
        link: '#',
        icon: '💡'
    }
];

const TabBlock: React.FC = () => {
    const [active, setActive] = useState(tabs[0].id);
    const current = tabs.find(t => t.id === active) || tabs[0];
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        // trigger animation on active change
        setAnim(true);
        const id = window.setTimeout(() => setAnim(false), 600);
        return () => window.clearTimeout(id);
    }, [active]);

    return (
        <div className="tab-block container">

            {/* Render content using the provided structure/classes */}
            <div
                className="block-tab-pootle wp-block-paws-tab-pootle"
                data-tab-index={current.id}
                data-tab-visible={(current.id === active).toString()}
            >
                <h3 className="h3 block-tab-pootle__print-heading" aria-hidden="true">
                    {current.title}
                </h3>
                <div className="block-tab-pootle__content">
                                <h2 className={`block-tab-pootle__heading ${anim ? 'slide-right' : ''}`} dangerouslySetInnerHTML={{ __html: current.heading.replace(/\n/g, '<br/>') }} />
                    <div className="block-tab-pootle__border" />
                    <div className="block-tab-pootle__text">
                                    <p className={`block-tab-pootle__text ${anim ? 'slide-left' : ''}`}>{current.text}</p>
                        {current.link && (
                            <a href={current.link} className="block-tab-pootle__link">Find out more</a>
                        )}
                    </div>
                </div>
            </div>
            <div className="tab-list tabs-row">
                {tabs.map((t, i) => (
                    <button
                        key={t.id}
                        className={`tab-btn ${t.id === active ? 'active' : ''}`}
                        onClick={() => setActive(t.id)}
                        aria-pressed={t.id === active}
                        aria-label={t.title}
                    >
                        <div className="tab-icon" aria-hidden>{t.icon}</div>
                        <div className="tab-title">{t.title}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabBlock;
