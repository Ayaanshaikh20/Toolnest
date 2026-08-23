import React from 'react';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const AboutPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="About ToolNest | Free Online Utilities"
        description="Learn more about ToolNest, our mission to build free, fast, and privacy-focused web tools for developers, creators, and students worldwide."
        canonicalUrl="/about"
      />

      <h1 style={{ marginBottom: '1.25rem' }}>About ToolNest</h1>

      <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
        ToolNest was founded with a straightforward mission: <strong>"Free Online Tools That Just Work."</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
        <p>
          In a web filled with ad-cluttered pages, paywalls, mandatory account registrations, and intrusive popups, ToolNest stands out as a clean, fast, and privacy-respecting utility hub.
        </p>

        <h2>Our Core Principles</h2>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li><strong>100% Free Access:</strong> All features on ToolNest are completely free to use without artificial limits or mandatory subscriptions.</li>
          <li><strong>Zero Mandatory Registration:</strong> You never need to create an account, log in, or provide personal details to use our utilities.</li>
          <li><strong>Privacy First:</strong> Our tools run client-side inside your browser. Your images, JSON data, text files, and passwords stay on your machine and are never uploaded to remote servers.</li>
          <li><strong>High Performance:</strong> Built with modern web technologies to ensure lightweight, lightning-fast rendering and instantaneous processing.</li>
        </ul>

        <h2>Who ToolNest Is For</h2>
        <p>
          ToolNest serves software engineers formatting API payloads, web designers converting image formats or colors, content creators measuring word counts, students calculating percentages, and everyday internet users looking for dependable tools.
        </p>

        <AdPlaceholder position="middle" />

        <h2>Monetization & Transparency</h2>
        <p>
          ToolNest is funded through non-intrusive display advertising. We explicitly reject pop-unders, forced video ads, misleading download buttons, and paywalls so that our tools remain accessible to everyone globally.
        </p>
      </div>
    </div>
  );
};
