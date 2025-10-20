import React, { useState, useEffect, useRef } from "react";
import "./ESGSection.css";

type Slide = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
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
    image: "/imgs/why.png",
    imageAlt: "Γιατί δημιουργήθηκε το Trademark Radar;",
  },
  {
    title: "Πως λειτουργεί το Trademark Radar;",
    description: `Το Trademark Radar λειτουργεί σαν το ραντάρ του σήματός σας. Κάθε μέρα σαρώνει αυτόματα τα νέα σήματα που κατατίθενται προς κατοχύρωση, για τα Εθνικά σήματα στον Οργανισμό Βιομηχανικής Ιδιοκτησίας (ΟΒΙ) και για τα Κοινοτικά στο Ευρωπαικό γραφείο εμπορικών σημάτων (EUIPO), εντοπίζοντας όσα μοιάζουν με το δικό σας. Με τη βοήθεια έξυπνων αλγορίθμων και ανθρώπινης επιβεβαίωσης, εξασφαλίζουμε ότι θα ενημερωθείτε μόνο για πραγματικές απειλές. Μόλις εντοπιστεί κίνδυνος, λαμβάνετε άμεσα email με σαφείς προτάσεις και προθεσμίες για δράση. Εσείς αποφασίζετε το επόμενο βήμα, έχοντας όλα τα δεδομένα στα χέρια σας. Με το Trademark Radar, καμία απειλή για το σήμα σας δεν περνά απαρατήρητη.`,
    image: "/imgs/how.png",
    imageAlt: "Πως λειτουργεί το Trademark Radar;",
  },
  {
    title: "Σε ποιους απευθύνεται το Trademark Radar;",
    description: `Το Trademark Radar απευθύνεται σε : 

            κάθε δικαιούχο Εμπορικού Σήματος και σε επιχειρήσεις κάθε μεγέθους.

            εταιρείες και επαγγελματίες που διαχειρίζονται σήματα για λογαριασμό πελατών.

            δικηγόρους

            δικηγορικά γραφεία που εξειδικεύονται στο δίκαιο σημάτων.`,
    image: "/imgs/who.png",
    imageAlt: "Σε ποιους απευθύνεται το Trademark Radar;",
  },
];

export default function ESGSection({ slides = defaultSlides }: Props) {
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-slide-idx'));
            if (!isNaN(idx)) {
              setVisibleSlides((prev) => new Set(prev).add(idx));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    slideRefs.current.forEach((el) => {
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      slideRefs.current.forEach((el) => {
        if (el && observerRef.current) {
          observerRef.current.unobserve(el);
        }
      });
    };
  }, [slides]);

  return (
    <section className="esg-section">
      <div className="esg-container">
        {slides.map((slide, idx) => {
          // ids για anchor links
          const ids = ['why', 'how', 'who'];
          const anchorId = ids[idx] || undefined;
          const isVisible = visibleSlides.has(idx);
          return (
            <div
              ref={(el) => { slideRefs.current[idx] = el; }}
              data-slide-idx={idx}
              className={`esg-media-layout${idx % 2 === 1 ? ' reverse' : ''}`}
              key={slide.title}
              id={anchorId}
            >
              <div className="esg-content">
                <h2 className={`esg-title${isVisible ? ' esg-animate-title' : ''}`}>{slide.title}</h2>
                <p className={`esg-description${isVisible ? ' esg-animate-desc' : ''}`}>{slide.description}</p>
              </div>
              <div className="esg-media">
                <img
                  src={slide.image || "/imgs/why.png"}
                  alt={slide.imageAlt || slide.title}
                  className={`esg-media-img${isVisible ? ' esg-animate-img' : ''}`}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}