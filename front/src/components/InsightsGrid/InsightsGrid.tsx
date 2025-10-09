import React from "react";
import "./InsightsGrid.css";

type Card = {
  tag?: string;
  title: string;
  author: string;
  date: string;      // π.χ. "30 Sep 2025"
  comment: string;   // σχόλιο πελάτη / περιγραφή
};

const cards: Card[] = [
  {
    tag: "SHIPPING & INTERNATIONAL TRADE",
    title: "BIFA terms 2025: new rules for the new year",
    author: "Multiple Authors",
    date: "30 Sep 2025",
    comment:
      "Σύντομο σχόλιο πελάτη: Πολύ κατατοπιστικό άρθρο με σαφή παραδείγματα για τις αλλαγές στους όρους BIFA."
  },
  {
    tag: "FINANCIAL SERVICES",
    title: "FCA September 2025 newsletter: IFPR newsletter",
    author: "Cheryl Tham",
    date: "30 Sep 2025",
    comment:
      "Μου άρεσε η ανάλυση των κυριότερων σημείων – βοήθησε να οργανώσουμε τις επόμενες ενέργειες συμμόρφωσης."
  },
  {
    title:
      "Potanina v Potanin: a landmark case in international divorce proceedings",
    author: "Multiple Authors",
    date: "30 Sep 2025",
    comment:
      "Εξαιρετική σύνοψη των νομικών ζητημάτων και των πιθανών επιπτώσεων για διεθνείς υποθέσεις."
  },
  {
    title: "September employment roundup",
    author: "Liz Stevens",
    date: "30 Sep 2025",
    comment:
      "Το μηνιαίο roundup μας κρατά σε εγρήγορση για τις τελευταίες εξελίξεις στο employment law."
  },
  {
    tag: "FAMILY",
    title: "What is family mediation, and how can it help?",
    author: "Claire Tollefson",
    date: "1 Oct 2025",
    comment:
      "Καθαρή παρουσίαση των σταδίων της διαμεσολάβησης – χρήσιμο υλικό για τους πελάτες μας."
  },
  {
    title: "Immigration update – September 2025",
    author: "Sacha Wooldridge",
    date: "29 Sep 2025",
    comment:
      "Πολύ πρακτικές συμβουλές για τις πρόσφατες αλλαγές και πώς επηρεάζουν αιτήσεις."
  },
];
const InsightsGrid: React.FC = () => {
  return (
    <section className="insights">
      <div className="insights__top">
        <h2 className="insights__title">Τι είπαν για την ομάδα Trademark Radar ;</h2>
      </div>
      <div className="insights__grid">
        {cards.map((c, i) => (
          <article key={i} className="insights__card">  

            <div className="insights__meta">
              <div className="insights__by">
                <span className="insights__author">{c.author}</span>
                <span className="insights__date">{c.date}</span>
              </div>
            </div>

            <p className="insights__comment">{c.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InsightsGrid;
