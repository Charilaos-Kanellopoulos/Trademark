import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import "./ContactBanner.css";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callDate: string; // YYYY-MM-DD
  callTime: string; // HH:mm (από)
  callTimeEnd: string; // HH:mm (έως)
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  callDate: "",
  callTime: "",
  callTimeEnd: "",
};

const ContactBanner: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load configuration from environment only. Do NOT include secrets in the repo.
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN;
  const TEMPLATE_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  // keep backward-compatible fallback so sending still works if env var not provided
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || 'smilesfas@gmail.com';

  // helper moved here to reuse in UI
  const mask = (v?: string | null) => {
    if (!v) return '—';
    if (v.length <= 8) return '****' + v.slice(-2);
    return v.slice(0, 4) + '...' + v.slice(-4);
  };

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

    // Απλό validation - μόνο τα βασικά πεδία είναι υποχρεωτικά
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      return;
    }

    // Δημιουργία string για εύρος ωρών
    const timeRange = form.callTime && form.callTimeEnd 
      ? `${form.callTime} - ${form.callTimeEnd}`
      : form.callTime || '';

    const templateParams = {
      // data describing the enquiry (used for email body)
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      callDate: form.callDate,
      callTime: timeRange,
      reply_to: form.email,
    };

    // Build admin-specific params. Many templates use the variable name `email` for the "To Email" field
    // (see your screenshot: Contact Us -> To Email = {{email}}). To ensure the admin template receives the
    // admin address, set `email` to ADMIN_EMAIL and include other common recipient names.
    const adminParams = {
      ...templateParams,
      // override the template variable that the dashboard uses for recipient
      email: ADMIN_EMAIL,
      to_email: ADMIN_EMAIL,
      recipient: ADMIN_EMAIL,
      recipient_email: ADMIN_EMAIL,
      // include sender name in the admin template if it expects {{name}}
      name: `${form.firstName} ${form.lastName}`,
    };

    setErrorMsg(null);
    setSending(true);

    // Basic runtime validation of EmailJS configuration
    const missingConfig: string[] = [];
    if (!PUBLIC_KEY) missingConfig.push('REACT_APP_EMAILJS_PUBLIC_KEY');
    if (!SERVICE_ID) missingConfig.push('REACT_APP_EMAILJS_SERVICE_ID');
    if (!TEMPLATE_ADMIN) missingConfig.push('REACT_APP_EMAILJS_TEMPLATE_ADMIN');
    if (!TEMPLATE_USER) missingConfig.push('REACT_APP_EMAILJS_TEMPLATE_USER');

    if (missingConfig.length) {
      setErrorMsg(
        `Λείπουν ρυθμίσεις EmailJS: ${missingConfig.join(', ')}. Ελέγξτε το .env και το dashboard (https://dashboard.emailjs.com).`
      );
      setSending(false);
      setSubmitted(false);
      return;
    }

    // reuse top-level mask helper for safe debug output

    // If a private key env var is present, do NOT log it. Warn developer to rotate.
    if ((process.env as any).REACT_APP_EMAILJS_PRIVATE_KEY) {
      console.warn('Detected REACT_APP_EMAILJS_PRIVATE_KEY in environment. Remove private keys from client-side code and rotate the key immediately (do not expose private keys in frontend).');
      setErrorMsg('Ανιχνεύτηκε ιδιωτικό κλειδί EmailJS στο περιβάλλον. Αφαιρέστε το και ανανεώστε το (rotate) για λόγους ασφαλείας.');
      setSending(false);
      setSubmitted(false);
      return;
    }

    // Safe masked debug log of the config (no secrets revealed)
    console.info(`EmailJS config (masked): service=${SERVICE_ID}, template_admin=${TEMPLATE_ADMIN}, template_user=${TEMPLATE_USER}, publicKey=${mask(PUBLIC_KEY)}`);

    (async () => {
      try {
    // Ensure emailjs initialized (emailjs.init called in useEffect above)
    // Send to admin (do not pass PUBLIC_KEY here; init has been done)
    // Debug log: template id and payload (no keys)
    console.debug('EmailJS -> admin send', { service: SERVICE_ID, template: TEMPLATE_ADMIN, payload: { ...adminParams, email: adminParams.email } });
  const adminRes = await emailjs.send(SERVICE_ID as string, TEMPLATE_ADMIN as string, adminParams);
    console.log('EmailJS admin response', adminRes);

        // send confirmation to user
        const userParams = {
          to_name: `${form.firstName} ${form.lastName}`,
          to_email: form.email,
          email: form.email,  
          firstName: form.firstName,
          callDate: form.callDate,
          callTime: timeRange,
        };
  // Debug log for user template send
  console.debug('EmailJS -> user send', { service: SERVICE_ID, template: TEMPLATE_USER, payload: userParams });
  const userRes = await emailjs.send(SERVICE_ID as string, TEMPLATE_USER as string, userParams);
  console.log('EmailJS user response', userRes);

        setForm(initialState);
        setSubmitted(false);
        setSending(false);
        setErrorMsg(null);
        alert('Ευχαριστούμε! Το μήνυμα στάλθηκε — θα επικοινωνήσουμε στη ζητούμενη ημέρα και ώρα.');
      } catch (err: any) {
        console.error('EmailJS error', err);
        // Build user-friendly message depending on known error shapes
        let message = 'Παρουσιάστηκε πρόβλημα κατά την αποστολή.';

        // err from EmailJS sometimes has { status, text }
        if (err && typeof err === 'object') {
          if (err.status === 400 && typeof err.text === 'string' && err.text.includes('service ID not found')) {
            message = 'Το Service ID δεν βρέθηκε. Ελέγξτε το REACT_APP_EMAILJS_SERVICE_ID στο .env και ότι το service υπάρχει στο dashboard: https://dashboard.emailjs.com/admin';
          } else if (err.text) {
            message = err.text;
          } else if (err.message) {
            message = err.message;
          } else if (err.status) {
            message = `Status ${err.status}`;
          }
        }

        setErrorMsg(message + ' Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε απευθείας με τον διαχειριστή.');
        setSending(false);
        setSubmitted(false);
      }
    })();

  };

  // Dev-only: quick test function to check EmailJS service/template availability
  const isDev = (typeof window !== 'undefined' && window.location && (window.location.hostname === 'localhost' || process.env.NODE_ENV !== 'production'));

  const testEmailJsConfig = async () => {
    if (!SERVICE_ID || !TEMPLATE_ADMIN) {
      alert('Missing SERVICE_ID or TEMPLATE_ADMIN in environment. Check .env.');
      return;
    }
    try {
      // include ADMIN_EMAIL in the test payload so templates that require a recipient don't fail
      const testParams: Record<string, any> = { test_field: 'test', to_email: ADMIN_EMAIL };
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, testParams);
      alert('Test send succeeded: ' + JSON.stringify(res));
      console.log('EmailJS test response', res);
    } catch (err: any) {
      console.error('EmailJS test error', err);
      const text = err && err.text ? err.text : (err && err.message ? err.message : JSON.stringify(err));
      alert('EmailJS test failed: ' + text);
    }
  };

  return (
    <div id="contact" className="contact-banner">
      {/* Background video */}
      <video className="contact-banner-video" autoPlay loop muted playsInline>
        <source src="/section-2.mp4" type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>
      
      {/* Overlay */}
      <div className="contact-banner-overlay"></div>
      
      <div className="contact-banner__container">
        <h2 className="contact-banner__title">Φόρμα Επικοινωνίας</h2>

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
            <span className="contact-banner__label">Ημερομηνία κλήσης (προαιρετικό)</span>
            <input
              className="contact-banner__input"
              type="date"
              name="callDate"
              aria-label="Ημερομηνία κλήσης"
              value={form.callDate}
              onChange={onChange("callDate")}
            />
          </label>

          {/* Ώρα Από */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Ώρα κλήσης από (προαιρετικό)</span>
            <input
              className="contact-banner__input"
              type="time"
              name="callTime"
              aria-label="Ώρα κλήσης από"
              value={form.callTime}
              onChange={onChange("callTime")}
            />
          </label>

          {/* Ώρα Έως */}
          <label className="contact-banner__field">
            <span className="contact-banner__label">Ώρα κλήσης έως (προαιρετικό)</span>
            <input
              className="contact-banner__input"
              type="time"
              name="callTimeEnd"
              aria-label="Ώρα κλήσης έως"
              value={form.callTimeEnd}
              onChange={onChange("callTimeEnd")}
            />
          </label>

          <button className="contact-banner__submit" type="submit" disabled={sending}>
            {sending ? 'Αποστολή...' : 'Αποστολή'}
          </button>
        </form>
        {/* {isDev && (
          <div style={{marginTop:16, padding:12, borderRadius:6, backgroundColor:'rgba(255,255,255,0.04)'}}>
            <strong style={{display:'block', marginBottom:8}}>DEV: EmailJS debug</strong>
            <div style={{fontSize:12, marginBottom:6}}>service: {SERVICE_ID || '—'}</div>
            <div style={{fontSize:12, marginBottom:6}}>template_admin: {TEMPLATE_ADMIN || '—'}</div>
            <div style={{fontSize:12, marginBottom:6}}>publicKey: {mask(PUBLIC_KEY)}</div>
            <div style={{fontSize:12, marginBottom:8}}>admin recipient: {ADMIN_EMAIL}</div>
            <button onClick={testEmailJsConfig} style={{padding:'6px 10px'}}>Run EmailJS test send</button>
          </div>
        )}
          {/* Error message area (kept commented for layout) 
          {/* {errorMsg && <div className="contact-banner__error" role="alert">{errorMsg}</div>} 

          {/* Dev-only debug panel 
          {isDev && (
            <div style={{marginTop:16,padding:12,border:'1px solid rgba(0,0,0,0.08)',borderRadius:6,background:'#fff'}}>
              <div style={{fontSize:13,color:'#333',marginBottom:8}}>EmailJS debug (dev only)</div>
              <div style={{fontSize:12,color:'#444'}}>
                <div>Service: <strong>{SERVICE_ID || '—'}</strong></div>
                <div>Template (admin): <strong>{TEMPLATE_ADMIN || '—'}</strong></div>
                <div>Template (user): <strong>{TEMPLATE_USER || '—'}</strong></div>
                <div>PublicKey: <strong>{mask(PUBLIC_KEY)}</strong></div>
                <div>Admin email: <strong>{ADMIN_EMAIL || '—'}</strong></div>
              </div>
              <div style={{marginTop:8}}>
                <button onClick={testEmailJsConfig} style={{padding:'6px 10px'}}>Run EmailJS test</button>
              </div>
            </div>
          )} */}
      </div>
    </div>
  );
};

export default ContactBanner;
