'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Contact Us</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Message:</label>
          <textarea
            className={styles.textarea}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <span>{isLoading ? 'Sending...' : 'Submit'}</span>
        </button>
      </form>
      {status === 'success' && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Message sent! We&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
