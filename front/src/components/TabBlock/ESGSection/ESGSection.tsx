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
    description: `Ο τελευταίος νόμος περί εμπορικών σημάτων(4679/2020) έφερε μία σημαντική αλλαγή. Σας δίνει την δυνατότητα - προνόμιο να εκφράσετε την δική σας άποψη για το εάν ένα νέο σήμα προς κατοχύρωση ομοιάζει με το προυπάρχον δικό σας εμπορικό σήμα και μπορεί να δημιουργήσει πρόβλημα στην αγορά. Έχετε δηλαδή την επιλογή να εναντιωθείτε σε όποιο σήμα κρίνετε ότι θα σας προκαλέσει κάποια ζημιά, ή να μην αντιδράσετε καθόλου και αυτό να κατοχυρωθεί. 

Εκεί ακριβώς γεννήθηκε η ανάγκη για το Trademark Radar. Μια έξυπνη υπηρεσία που σαρώνει συνεχώς την αγορά και σας ειδοποιεί άμεσα όταν εντοπίσει ύποπτες καταθέσεις. Έτσι, δεν κινδυνεύετε να χάσετε το brand σας χωρίς να το μάθετε ποτέ — είστε πάντα ένα βήμα μπροστά.`,
  },
  {
    title: "Πως λειτουργεί το Trademark Radar;",
    description: `Το Trademark Radar λειτουργεί σαν το ραντάρ του σήματός σας. Κάθε μέρα σαρώνει αυτόματα τα νέα σήματα που κατατίθενται προς κατοχύρωση, για τα Εθνικά σήματα στον Οργανισμό Βιομηχανικής Ιδιοκτησίας (ΟΒΙ) και για τα Κοινοτικά στο Ευρωπαικό γραφείο εμπορικών σημάτων (EUIPO), εντοπίζοντας όσα μοιάζουν με το δικό σας. Με τη βοήθεια έξυπνων αλγορίθμων και ανθρώπινης επιβεβαίωσης, εξασφαλίζουμε ότι θα ενημερωθείτε μόνο για πραγματικές απειλές. Μόλις εντοπιστεί κίνδυνος, λαμβάνετε άμεσα email με σαφείς προτάσεις και προθεσμίες για δράση. Εσείς αποφασίζετε το επόμενο βήμα, έχοντας όλα τα δεδομένα στα χέρια σας. Με το Trademark Radar, καμία απειλή για το σήμα σας δεν περνά απαρατήρητη.`,
  },
  {
    title: "Σε ποιους απευθύνεται το Trademark Radar;",
    description: `Το Trademark Radar απευθύνεται σε : 

            κάθε δικαιούχο Εμπορικού Σήματος και σε επιχειρήσεις κάθε μεγέθους.

            εταιρείες και επαγγελματίες που διαχειρίζονται σήματα για λογαριασμό πελατών.

            δικηγόρους

            δικηγορικά γραφεία που εξειδικεύονται στο δίκαιο σημάτων.`,
  },
];

export default function ESGSection({ slides = defaultSlides, ctaLabel = "Μάθε περισσότερα", onCtaClick }: Props) {
  const [index, setIndex] = useState(0);
  const { title, description } = slides[index];

  const handleSlideChange = (i: number) => setIndex(i);

  // Handle URL hash changes to switch tabs automatically
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      switch (hash) {
        case '#why':
          setIndex(0);
          break;
        case '#how':
          setIndex(1);
          break;
        case '#who':
          setIndex(2);
          break;
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section className="esg-section">
      <div className="esg-container">
        {/* Hidden anchor points for navigation */}
        <div id="why" style={{ position: 'absolute', top: '-100px' }}></div>
        <div id="how" style={{ position: 'absolute', top: '-100px' }}></div>
        <div id="who" style={{ position: 'absolute', top: '-100px' }}></div>


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
        <div className="esg-buttons">
          <button
            onClick={() => handleSlideChange(0)}
            className={`esg-button ${index === 0 ? 'active' : ''}`}
          >
            <div className="esg-icon">
              <img src="/imgs/why.png" className="esg-icon-img" alt="Γιατί δημιουργήθηκε;" />
            </div>
            <span className="esg-button-text">
              Γιατί δημιουργήθηκε το Trademark Radar;
            </span>
          </button>

          <button
            onClick={() => handleSlideChange(1)}
            className={`esg-button ${index === 1 ? 'active' : ''}`}
          >
            <div className="esg-icon">
              <img src="/imgs/how.png" className="esg-icon-img" alt="Πώς λειτουργεί;" />
            </div>
            <span className="esg-button-text">
              Πως λειτουργεί το Trademark Radar;
            </span>
          </button>

          <button
            onClick={() => handleSlideChange(2)}
            className={`esg-button ${index === 2 ? 'active' : ''}`}
          >
            <div className="esg-icon">
              <img src="/imgs/who.png" className="esg-icon-img" alt="Σε ποιους απευθύνεται;" />
            </div>
            <span className="esg-button-text">
              Σε ποιους απευθύνεται το Trademark Radar;
            </span>
          </button>
        </div>



      </div>
    </section>
  );
}