import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { Mail, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    // Trigger mailto link so user's client can send directly to support@shaikhayaan.com
    const subject = encodeURIComponent(`ToolNest Feedback from ${formData.name || 'User'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:support@shaikhayaan.com?subject=${subject}&body=${body}`, '_blank');

    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '720px' }}>
      <SEO
        title="Contact Us | ToolNest"
        description="Have feedback, feature requests, or bug reports? Contact the ToolNest team today."
        canonicalUrl="/contact"
      />

      <h1 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Contact ToolNest</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
        We value user feedback, bug reports, and suggestions for new online utilities. Reach out to our team directly.
      </p>

      {/* Direct Email Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Mail size={22} />
        </div>
        <div>
          <div style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>
            Direct Email Support
          </div>
          <a
            href="mailto:support@shaikhayaan.com"
            style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary-color)', textDecoration: 'none' }}
          >
            support@shaikhayaan.com
          </a>
        </div>
      </div>

      {submitted ? (
        <div style={{
          backgroundColor: 'var(--success-bg)',
          border: '1px solid var(--success-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center'
        }}>
          <CheckCircle2 size={48} style={{ color: 'var(--success-color)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Thank You!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
            Your email draft has been prepared for <strong>support@shaikhayaan.com</strong>. We will get back to you promptly!
          </p>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <MessageSquare size={18} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--text-main)' }}>Send Feedback</h2>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
              Your Name
            </label>
            <input
              type="text"
              className="input"
              required
              placeholder="e.g. Alex Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
              Email Address
            </label>
            <input
              type="email"
              className="input"
              required
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
              Message / Feedback
            </label>
            <Textarea
              rows={5}
              required
              placeholder="Describe your question, feature request, or bug report..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button type="submit" variant="primary" size="lg">
            <Send size={18} /> Send Message to Support
          </Button>
        </form>
      )}
    </div>
  );
};
