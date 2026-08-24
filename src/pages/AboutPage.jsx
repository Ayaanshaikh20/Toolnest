import React from 'react';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
  const principles = [
    {
      title: '100% Free Access',
      desc: 'All features and utilities on ToolNest are completely free to use without hidden fees, artificial usage quotas, or paywalls.',
      icon: Zap
    },
    {
      title: 'Zero Mandatory Registration',
      desc: 'You never need to create an account, log in, or hand over personal data just to format a file or compress an image.',
      icon: Lock
    },
    {
      title: 'Privacy First & Client-Side Processing',
      desc: 'Our tools execute directly in your browser memory. Your PDFs, JSON data, images, passwords, and text remain on your device and are never uploaded to remote servers.',
      icon: ShieldCheck
    },
    {
      title: 'High Performance & Speed',
      desc: 'Engineered with modern, lightweight web technology to ensure instant loading, minimal memory footprint, and zero server round-trips.',
      icon: Sparkles
    }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="About ToolNest | Free Online Utilities"
        description="Learn more about ToolNest, our mission to build free, fast, and privacy-focused web tools for developers, creators, and students worldwide."
        canonicalUrl="/about"
      />

      <h1 style={{ marginBottom: '1.25rem', color: 'var(--text-main)' }}>About ToolNest</h1>

      <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
        ToolNest was built with a single guiding mission: <strong style={{ color: 'var(--text-main)' }}>"Free Online Tools That Just Work."</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          In an internet cluttered with aggressive ads, forced accounts, cookie walls, and subscription paywalls, ToolNest stands out as a clean, reliable, and privacy-respecting utility station.
        </p>

        <div>
          <h2 style={{ marginBottom: '1.25rem', color: 'var(--text-main)' }}>Our Core Principles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} />
                    </div>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{p.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Who ToolNest Is For</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            ToolNest serves software engineers formatting API payloads, web designers converting image formats, writers counting words, students calculating percentages, and everyday internet users looking for dependable tools without the hassle.
          </p>
        </div>

        <AdPlaceholder position="middle" />

        <div>
          <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Monetization & Transparency</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            ToolNest is funded through clean, non-intrusive display advertising. We explicitly reject pop-unders, forced video ads, misleading download buttons, and paywalls so that our tools remain free and accessible to everyone globally.
          </p>
        </div>
      </div>
    </div>
  );
};
