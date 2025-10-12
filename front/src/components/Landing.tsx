import React from 'react';
import './Landing.css';
import Hero from './Hero/Hero';
import Numbers from './Numbers/Numbers';
import ContactBanner from './ContactBanner/ContactBanner';
import InsightsGrid from './InsightsGrid/InsightsGrid';
import HeroIntro from './HeroIntro/HeroIntro';
// Removed Operation component
import TabBlock from './TabBlock/TabBlock';
import Service from './Service/Service';

const Landing: React.FC = () => {
    return (
        <div className="landing">
            {/* Hero image section (use /hero-1.jpg) */}
            {/* Replace title/subtitle with the ones you want for each hero */}
            <Hero video={'./section-1.mp4'}
                title={'Έχεις σήμα ; Προστάτευσέ το.'}
                subtitle={'Μια υπηρεσία, μία ολοκληρωμένη προστασία.'}
                titleSpeedMs={55}
                subtitleSpeedMs={60}
                startDelayMs={400}
            />
            {/* Tabbed content section similar to image 3 */}
            <HeroIntro />

            <TabBlock 
                sectionTitle="Αναλύοντας το Trademark Radar" 
                sectionDescription="Η νέα εποχή στην προστασία των σηματών. Δείτε περισσότερα για την υπηρεσία." 
            />

            <Numbers title={'Το Trademark Radar σε νούμερα'} description={'Ανακαλύψτε τα νούμερα πίσω από το Trademark Radar:'} />
            
            <Service items={[
                { tier: 'BRONZE', yearsLabel: '3 χρόνια', priceLabel: '124€', logoImage: '/logo/BRONZE.png' },
                { tier: 'SILVER', yearsLabel: '5 χρόνια', priceLabel: '176.8€', logoImage: '/logo/SILVER.png' },
                { tier: 'GOLD', yearsLabel: 'Έως το πέρας της επιχείρησης', priceLabel: '248€', logoImage: '/logo/GOLD.png' },
            ]} />
            <div className="container">
                <InsightsGrid />

            </div>
            
            <ContactBanner />
        </div>
    );
};

export default Landing;
