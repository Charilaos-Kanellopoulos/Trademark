import React, { useState } from 'react';
import './ContactForm.css';

type FormState = {
  email: string;
  name: string;
  surname: string;
  title: string;
  message: string;
};

const initial: FormState = { email: '', name: '', surname: '', title: '', message: '' };

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
  };

  const validate = () => {
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email';
    if (!form.name) return 'Please enter your name';
    if (!form.message) return 'Please enter your message';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSending(true);
    try {
      // Try to POST to a server endpoint first (user can implement /api/contact)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess('Message sent — thank you!');
        setForm(initial);
      } else {
        // fallback to mailto if no backend
        throw new Error('Server returned ' + res.status);
      }
    } catch (err) {
      // fallback: open mail client with prefilled subject/body
      const subject = encodeURIComponent(`${form.title || 'Contact'} — ${form.name} ${form.surname}`);
      const body = encodeURIComponent(`Message:\n${form.message}\n\nName: ${form.name} ${form.surname}\nTitle: ${form.title}\nEmail: ${form.email}`);
      window.location.href = `mailto:hello@yourcompany.com?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h3>Contact us</h3>
      <p className="muted">Tell us about your issue and we'll get back to you.</p>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}

      <div className="row two">
        <label>
          Email
          <input type="email" value={form.email} onChange={update('email')} required />
        </label>
        <label>
          Title
          <input type="text" value={form.title} onChange={update('title')} />
        </label>
      </div>

      <div className="row three">
        <label>
          Name
          <input type="text" value={form.name} onChange={update('name')} />
        </label>
        <label>
          Surname
          <input type="text" value={form.surname} onChange={update('surname')} />
        </label>
      </div>

      <label>
        Message
        <textarea value={form.message} onChange={update('message')} rows={6} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
      </div>
    </form>
  );
};

export default ContactForm;
