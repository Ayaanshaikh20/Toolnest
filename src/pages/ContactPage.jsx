import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { Mail, CheckCircle2, Send } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '720px' }}>
      <SEO
        title="Contact Us | ToolNest"
        description="Have feedback, feature requests, or bug reports? Contact the ToolNest team today."
        canonicalUrl="/contact"
      />

      <h1 style={{ marginBottom: '1rem' }}>Contact ToolNest</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        We value user feedback, bug reports, and suggestions for new online utilities. Get in touch with us using the form below.
      </p>

      {submitted ? (
        <div style={{
          backgroundColor: 'var(--success-bg)',
          border: '1px solid #6EE7B7',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <CheckCircle2 size={48} style={{ color: 'var(--success-color)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Thank You!</h2>
          <p>Your message has been sent successfully. We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#fff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.375rem' }}>Your Name</label>
            <input
              type="text"
              className="input"
              required
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.375rem' }}>Email Address</label>
            <input
              type="email"
              className="input"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.375rem' }}>Message / Feedback</label>
            <Textarea
              rows={5}
              required
              placeholder="How can we help you or improve ToolNest?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button type="submit" variant="primary" size="lg">
            <Send size={18} /> Send Message
          </Button>
        </form>
      )}
    </div>
  );
};
