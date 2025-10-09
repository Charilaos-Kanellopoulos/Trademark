import React, { useState } from "react";
import "./ContactBanner.css";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callDate: string; // YYYY-MM-DD
  callTime: string; // HH:mm
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  callDate: "",
  callTime: "",
};

const ContactBanner: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Απλό validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.callDate || !form.callTime) {
      return;
    }

    // Παράδειγμα αποστολής σε Spring Boot endpoint
    // fetch("/api/contact-requests", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    console.log("Form payload:", form);
    setForm(initialState);
    setSubmitted(false);
    alert("Ευχαριστούμε! Θα επικοινωνήσουμε στη ζητούμενη ημέρα και ώρα.");
  };

  return (
    <div className="contact-banner">
      <div className="contact-banner__container">
        <h2 className="contact-banner__title">Φορμά Επικοινωνίας</h2>

        <p className="contact-banner__desc">
          Συμπληρώστε τη φόρμα και η ομάδα μας θα επικοινωνήσει μαζί σας την ημέρα και ώρα που εσείς επιθυμείτε.
        </p>

        <form className="contact-banner__form" onSubmit={handleSubmit} noValidate>
          {/* Όνομα */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Όνομα*</span>
            <input
              className={`contact-banner__input ${submitted && !form.firstName ? "is-invalid" : ""}`}
              type="text"
              name="firstName"
              aria-label="Όνομα"
              value={form.firstName}
              onChange={onChange("firstName")}
              required
            />
          </label>

          {/* Επώνυμο */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Επώνυμο*</span>
            <input
              className={`contact-banner__input ${submitted && !form.lastName ? "is-invalid" : ""}`}
              type="text"
              name="lastName"
              aria-label="Επώνυμο"
              value={form.lastName}
              onChange={onChange("lastName")}
              required
            />
          </label>

          {/* Email */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Email*</span>
            <input
              className={`contact-banner__input ${submitted && !form.email ? "is-invalid" : ""}`}
              type="email"
              name="email"
              aria-label="Email"
              value={form.email}
              onChange={onChange("email")}
              required
            />
          </label>

          {/* Τηλέφωνο */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Τηλέφωνο*</span>
            <input
              className={`contact-banner__input ${submitted && !form.phone ? "is-invalid" : ""}`}
              type="tel"
              name="phone"
              aria-label="Τηλέφωνο"
              inputMode="tel"
              pattern="^[0-9+\s()-]{6,}$"
              title="Επιτρέπονται αριθμοί, κενά και τα σύμβολα + ( ) -"
              value={form.phone}
              onChange={onChange("phone")}
              required
            />
          </label>

          {/* Ημερομηνία */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Ημερομηνία κλήσης*</span>
            <input
              className={`contact-banner__input ${submitted && !form.callDate ? "is-invalid" : ""}`}
              type="date"
              name="callDate"
              aria-label="Ημερομηνία κλήσης"
              value={form.callDate}
              onChange={onChange("callDate")}
              required
            />
          </label>

          {/* Ώρα */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Ώρα κλήσης*</span>
            <input
              className={`contact-banner__input ${submitted && !form.callTime ? "is-invalid" : ""}`}
              type="time"
              name="callTime"
              aria-label="Ώρα κλήσης"
              value={form.callTime}
              onChange={onChange("callTime")}
              required
            />
          </label>

          <button className="contact-banner__submit" type="submit">
            Αποστολή
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactBanner;
