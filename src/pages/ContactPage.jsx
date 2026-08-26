import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { Mail, CheckCircle2, Send, MessageSquare, Loader2, AlertCircle } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setLoading(true);
    setError('');

    try {
      // Using FormSubmit.co - 100% Free, zero-backend, pure frontend fetch API
      const response = await fetch('https://formsubmit.co/ajax/support@shaikhayaan.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `ToolNest Feedback from ${formData.name || 'User'}`
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Email sending error:', err);
      setError('Something went wrong. Please try again or email us directly at support@shaikhayaan.com.');
    } finally {
      setLoading(false);
    }
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
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Message Sent Successfully!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
            Thank you for reaching out! Your message has been sent directly to <strong>support@shaikhayaan.com</strong>. We will reply promptly.
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

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--danger-color, #ef4444)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

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

          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
            {loading ? 'Sending Message...' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  );
};
