import React from 'react';
import './Landing.css';
import Hero from './Hero/Hero';
import Numbers from './Numbers/Numbers';
import ContactBanner from './ContactBanner/ContactBanner';
import InsightsGrid from './InsightsGrid/InsightsGrid';
import HeroIntro from './HeroIntro/HeroIntro';
import Operation from './Operation/Operation';
import Service from './Service/Service';

const Landing: React.FC = () => {
    return (
        <div className="landing">
            {/* Hero image section (use /hero-1.jpg) */}
            {/* Replace title/subtitle with the ones you want for each hero */}
            <Hero video={'./section-1.mp4'}
                title={'Έχεις σήμα ; Προστάτευσέ το.'}
                subtitle={'Μια υπηρεσία, μία ολοκληρωμένη προστασία.'} />
            {/* Tabbed content section similar to image 3 */}
            <HeroIntro />


            <Numbers title={'Το Trademark Radar σε νούμερα'} description={'Ανακαλύψτε τα νούμερα πίσω από το Trademark Radar:'} />
            <Operation
                title='Αναλύοντας το Trademark Radar'
                subtitle='Η νέα εποχή στην προστασία σημάτων. Δείτε περισσότερα για την υπηρεσία.'
                items={[
                    {
                        image: "/imgs/why.png",
                        ribbonTitle: "Γιατί δημιουργήθηκε ;",
                        caption: "Γιατί δημιουργήθηκε ;",
                    },
                    {
                        image: "/imgs/who.png",
                        ribbonTitle: "Σε ποιους \nαπευθύνεται ;",
                        caption: "Σε ποιους απευθύνεται ;"
                    },
                    {
                        image: "/imgs/how.png",
                        ribbonTitle: "Πώς λειτουργεί ;",
                        caption: "Πώς λειτουργεί ;"
                    },
                ]}
            />
            <Service items={[
                { tier: 'BRONZE', yearsLabel: '3 έτος', priceLabel: '124€', image: '/logo/BRONZE.png' },
                { tier: 'SILVER', yearsLabel: '5 έτη', priceLabel: '176.8€', image: '/logo/SILVER.png' },
                { tier: 'GOLD', yearsLabel: '∞ έτη', priceLabel: '248€', image: '/logo/GOLD.png' },
            ]} />
            <div className="container">
                <InsightsGrid />

            </div>
            
            <ContactBanner />
        </div>
    );
};

export default Landing;
