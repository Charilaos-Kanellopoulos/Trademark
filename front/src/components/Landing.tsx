import React from 'react';
import './Landing.css';
import Hero from './Hero';
import TabBlock from './TabBlock';
import Spotlight from './Spotlight';

const Landing: React.FC = () => {
    return (
        <div className="landing">
            {/* Hero image section (use /hero-1.jpg) */}
            {/* Replace title/subtitle with the ones you want for each hero */}
            <Hero image={'/hero-1.jpg'} title={'Next Level Law'} subtitle={'Whatever the challenge, we are here for you.'} />
            {/* Tabbed content section similar to image 3 */}
            <section className="tabbed-section">
                <div className="container">
                    <TabBlock />
                </div>
            </section>
            <Spotlight
                image={'/spotlight-1.jpg'}
                label={'SPOTLIGHT ON:'}
                title={'Manufacturing sector faces mounting tribunal pressures<br/>amid economic uncertainty'}
                summary={'Our latest research reveals that manufacturing businesses across England and Wales are grappling with a rising tide of employment tribunal claims.'}
                authorName={'Catherine Johnson'}
                authorRole={'Partner'}
                cta={'Read more'}
            />

        </div>
    );
};

export default Landing;
