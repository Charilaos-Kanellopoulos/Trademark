import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
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
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_m0ah2gq';
  const TEMPLATE_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN || 'template_ay3jcad';
  const TEMPLATE_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER || 'template_c1f7ro8';
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '08heL3LGJTrXR79-N';
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || '';

  useEffect(() => {
    // initialize emailjs if a public key is provided
    try {
      if (PUBLIC_KEY && PUBLIC_KEY !== 'public_xxx') {
        (emailjs as any).init(PUBLIC_KEY);
      }
    } catch (err) {
      console.warn('EmailJS init failed', err);
    }
  }, [PUBLIC_KEY]);

  // auto-clear error messages after a short delay
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 6000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      // clear any existing error when the user edits the form
      if (errorMsg) setErrorMsg(null);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Απλό validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.callDate || !form.callTime) {
      return;
    }

    const templateParams = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      callDate: form.callDate,
      callTime: form.callTime,
      // ensure the admin template receives a recipient address
      // EmailJS templates commonly expect 'to_email' or 'recipient'
      to_email: 'kanel.xaris@gmail.com',
      reply_to: form.email,
    };

    setErrorMsg(null);
    setSending(true);

    (async () => {
      try {
        // send to admin
        const adminRes = await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, templateParams, PUBLIC_KEY);
        console.log('EmailJS admin response', adminRes);

        // send confirmation to user
        const userParams = {
          to_name: `${form.firstName} ${form.lastName}`,
          to_email: form.email,
          firstName: form.firstName,
          callDate: form.callDate,
          callTime: form.callTime,
        };
        const userRes = await emailjs.send(SERVICE_ID, TEMPLATE_USER, userParams, PUBLIC_KEY);
        console.log('EmailJS user response', userRes);

        setForm(initialState);
        setSubmitted(false);
        setSending(false);
        setErrorMsg(null);
        alert('Ευχαριστούμε! Το μήνυμα στάλθηκε — θα επικοινωνήσουμε στη ζητούμενη ημέρα και ώρα.');
      } catch (err: any) {
        console.error('EmailJS error', err);
        let message = 'Παρουσιάστηκε πρόβλημα κατά την αποστολή.';
        if (err) {
          if (err.text) message = err.text;
          else if (err.message) message = err.message;
          else if (err.status) message = `Status ${err.status}`;
        }
        setErrorMsg(message + ' Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε απευθείας στο email του διαχειριστή.');
        setSending(false);
        setSubmitted(false);
      }
    })();

  };

  return (
    <div id="contact" className="contact-banner">
      {/* Background video */}
      <video className="contact-banner-video" autoPlay loop muted playsInline>
        <source src="/section-1.mp4" type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>
      
      {/* Overlay */}
      <div className="contact-banner-overlay"></div>
      
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

          <button className="contact-banner__submit" type="submit" disabled={sending}>
            {sending ? 'Αποστολή...' : 'Αποστολή'}
          </button>
        </form>
        {/* {errorMsg && <div className="contact-banner__error" role="alert">{errorMsg}</div>} */}
      </div>
    </div>
  );
};

export default ContactBanner;
