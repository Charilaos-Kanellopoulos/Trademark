import React from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <section className="sme-hero">
        <div className="container">
          <h2>Θέλετε το σήμα σας με επιδότηση 75%;</h2>
          <p className="lead">
            Το Ευρωπαϊκό πρόγραμμα SME Fund το κάνει δυνατό. Η SMEismART αναλαμβάνει
            όλη τη διαδικασία για εσάς, χωρίς επιπλέον χρεώσεις.
          </p>
        </div>
      </section>

      <section className="sme-stats">
        <div className="container stats-grid">
          <div className="stat">
            <strong>24,08%</strong>
            <span>ΤΩΝ ΑΙΤΗΣΕΩΝ ΑΠΟ ΕΛΛΑΔΑ</span>
          </div>
          <div className="stat">
            <strong>100%</strong>
            <span>ΕΠΙΤΥΧΙΑ ΕΓΚΡΙΣΗΣ</span>
          </div>
          <div className="stat chart">
            <img src="/Trademark-Radar.png" alt="chart" />
          </div>
        </div>
      </section>

      <header className="hero" role="banner">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Expert advice, built around you</h1>
            <p>
              Trusted commercial and legal advice tailored to your needs. We
              combine practical experience with strategic thinking to help
              businesses grow.
            </p>
            <div className="cta">
              <button className="btn primary">Contact us</button>
              <button className="btn ghost">Our services</button>
            </div>
          </div>
        </div>
      </header>

      <section className="services">
        <div className="container">
          <h2>Our Expertise</h2>
          <div className="grid">
            <article className="card">
              <h3>Corporate</h3>
              <p>Commercial support for businesses of all sizes.</p>
            </article>
            <article className="card">
              <h3>Employment</h3>
              <p>Advice on employment, HR and people matters.</p>
            </article>
            <article className="card">
              <h3>Property</h3>
              <p>Practical property and real estate services.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sme-steps container">
        <h2>Η διαδικασία με το SME Fund</h2>
        <ol>
          <li>ΔΩΡΕΑΝ ΕΛΕΓΧΟΣ — Ελέγχουμε αν η επιχείρησή σας είναι επιλέξιμη χωρίς κόστος.</li>
          <li>ΑΝΑΛΥΣΗ ΚΑΙ ΠΡΟΤΑΣΗ — Σας ενημερώνουμε για την πιθανότητα επιδότησης.</li>
          <li>ΚΑΤΑΘΕΣΗ ΣΗΜΑΤΟΣ — Αναλαμβάνουμε όλες τις διαδικασίες υποβολής.</li>
          <li>ΔΙΑΧΕΙΡΙΣΗ ΚΑΙ ΑΠΟΛΟΓΙΣΜΟΣ — Πλήρης παρακολούθηση έως την έγκριση.</li>
        </ol>
      </section>

      <section className="sme-eligibility container">
        <h3>Ποιος είναι επιλέξιμος;</h3>
        <p>
          Επιχειρήσεις με έδρα στην ΕΕ, μικρές και μεσαίες επιχειρήσεις που πληρούν
          τα κριτήρια του SME Fund. Η προτεραιότητα δίνεται σε επιχειρήσεις με
          υψηλό δυναμικό ανάπτυξης.
        </p>
      </section>

      <section className="sme-costs container">
        <h3>Κόστος καταχώρισης</h3>
        <p>
          Το κόστος καταχώρισης του σήματος σας είναι ένα εμπόδιο; Όχι πια. Η
          επιχορήγηση καλύπτει έως και 75% του κόστους — η SMEismART αναλαμβάνει
          την υπόλοιπη διαδικασία χωρίς επιπλέον χρεώσεις.
        </p>
      </section>

      <section className="sme-benefits container">
        <h3>Οφέλη & Προσφορές</h3>
        <ul>
          <li>Επιχορήγηση έως 75% για την καταχώριση σήματος.</li>
          <li>Δωρεάν αρχική αξιολόγηση επιλεξιμότητας.</li>
          <li>Πλήρης διαχείριση της αίτησης χωρίς επιπλέον κόστη.</li>
        </ul>
      </section>

      <section className="sme-contact container cta-block">
        <h3>Είστε έτοιμοι να θωρακίσετε το σήμα σας;</h3>
        <p>Κάντε το πρώτο βήμα σήμερα — επικοινωνήστε μαζί μας για δωρεάν έλεγχο.</p>
        <div className="cta">
          <button className="btn primary">Κάντε το πρώτο βήμα</button>
          <a href="mailto:info@smelistartmakers.com" className="btn ghost">Email</a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
