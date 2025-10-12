import React, { useState } from "react";
import "./ESGSection.css";

type Slide = {
  title: string;
  description: string;
};

type Props = {
  slides?: Slide[];
  ctaLabel?: string;
  onCtaClick?: () => void;
};

const defaultSlides: Slide[] = [
  {
    title: "Γιατί δημιουργήθηκε το Trademark Radar;",
    description:
      "Το Trademark Radar αναπτύχθηκε για να προσφέρει ολοκληρωμένη προστασία των εμπορικών σημάτων. Η υπηρεσία μας παρακολουθεί διαρκώς για παραβιάσεις και παρέχει άμεση ειδοποίηση.",
  },
  {
    title: "Πώς λειτουργεί η υπηρεσία μας;",
    description:
      "Χρησιμοποιούμε προηγμένη τεχνολογία για την παρακολούθηση εμπορικών σημάτων σε πραγματικό χρόνο. Η ομάδα μας αναλύει κάθε περίπτωση και παρέχει εξειδικευμένες συμβουλές.",
  },
  {
    title: "Σε ποιους απευθύνεται;",
    description:
      "Το Trademark Radar είναι ιδανικό για επιχειρήσεις κάθε μεγέθους που θέλουν να προστατεύσουν τα εμπορικά τους σήματα. Από startups έως μεγάλες εταιρείες, όλοι μπορούν να επωφεληθούν.",
  },
];

export default function ESGSection({ slides = defaultSlides, ctaLabel = "Μάθε περισσότερα", onCtaClick }: Props) {
  const [index, setIndex] = useState(0);
  const { title, description } = slides[index];

  const handleSlideChange = (i: number) => setIndex(i);

  return (
    <section className="esg-section">
      <div className="esg-container">
        <div className="esg-content">
          <h2 
            className={`esg-title fade-in-${index}`}
            key={`title-${index}`}
          >
            {title}
          </h2>
          <p 
            className={`esg-description fade-in-${index}`}
            key={`desc-${index}`}
          >
            {description}
          </p>
        </div>

        {/* Κουμπιά επιλογής */}
        <div className="esg-buttons">
          <button 
            onClick={() => handleSlideChange(0)} 
            className={`esg-button ${index === 0 ? 'active' : ''}`}
          >
            <div className="esg-icon">🏢</div>
            <span className="esg-button-text">
              Γιατί δημιουργήθηκε;
            </span>
          </button>

          <button 
            onClick={() => handleSlideChange(1)} 
            className={`esg-button ${index === 1 ? 'active' : ''}`}
          >
            <div className="esg-icon">💡</div>
            <span className="esg-button-text">
              Πώς λειτουργεί;
            </span>
          </button>

          <button 
            onClick={() => handleSlideChange(2)} 
            className={`esg-button ${index === 2 ? 'active' : ''}`}
          >
            <div className="esg-icon">🌍</div>
            <span className="esg-button-text">
              Σε ποιους απευθύνεται;
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}