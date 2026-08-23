import React from 'react';
import { SEO } from '../components/SEO';

export const CookiePolicyPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="Cookie Policy | ToolNest"
        description="Cookie policy explaining how ToolNest uses cookies and browser storage."
        canonicalUrl="/cookie-policy"
      />

      <h1 style={{ marginBottom: '1rem' }}>Cookie Policy</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Last updated: August 23, 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
        <h2>1. What Are Cookies</h2>
        <p>
          As is common practice with almost all professional websites, ToolNest uses cookies and local browser storage to improve your experience and store user settings.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for essential functionality, such as remembering your category filter preferences, dark/light theme options, and anonymous analytics measurement.
        </p>

        <h2>3. Third-Party Advertising Cookies</h2>
        <p>
          In order to keep ToolNest 100% free, we partner with advertising partners such as Google AdSense. These networks may set cookies on your browser to show relevant advertisements based on your interests.
        </p>

        <h2>4. Disabling Cookies</h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies may affect the functionality of this and many other websites that you visit.
        </p>
      </div>
    </div>
  );
};
