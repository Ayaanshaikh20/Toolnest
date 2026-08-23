import React from 'react';
import { SEO } from '../components/SEO';

export const TermsPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="Terms of Service | ToolNest"
        description="Terms of service and conditions of use for ToolNest free online utilities."
        canonicalUrl="/terms"
      />

      <h1 style={{ marginBottom: '1rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Last updated: August 23, 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
        <h2>1. Terms</h2>
        <p>
          By accessing the website at https://toolnest.shaikhayaan.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use ToolNest's web applications for personal, educational, or commercial tasks. All tools are provided free of charge "as is". You may not:
        </p>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Attempt to reverse engineer software tools for malicious intent.</li>
          <li>Use automated bot traffic that impairs website availability for other users.</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>
          The tools and materials on ToolNest are provided on an 'as is' basis. ToolNest makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall ToolNest or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on ToolNest.
        </p>

        <h2>5. Modifications</h2>
        <p>
          ToolNest may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the current version of these terms of service.
        </p>
      </div>
    </div>
  );
};
