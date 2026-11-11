import React from 'react';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ShieldCheck, Zap, Lock, Sparkles, CheckCircle2, User, Globe, Code2, Heart, Award, ArrowUpRight } from 'lucide-react';

export const AboutPage = () => {
  const principles = [
    {
      title: '100% Free & Unlimited Access',
      desc: 'All 32+ utilities on ToolNest are completely free to use without hidden fees, artificial usage quotas, or paywalls.',
      icon: Zap
    },
    {
      title: 'Zero Mandatory Registration',
      desc: 'You never need to create an account, log in, or hand over personal data just to format a file or compress an image.',
      icon: Lock
    },
    {
      title: 'Privacy First & In-Browser Execution',
      desc: 'Our tools execute directly in your browser memory. Your PDFs, JSON data, images, passwords, and text remain on your device and are never uploaded to remote servers.',
      icon: ShieldCheck
    },
    {
      title: 'High Performance & Offline PWA',
      desc: 'Engineered with modern WebAssembly, Canvas API, and Service Workers to ensure instant loading and full offline capability without internet connectivity.',
      icon: Sparkles
    }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="About ToolNest & Founder Muhammad Ayaan Shaikh | Free Online Utilities"
        description="Learn about ToolNest and its creator, Muhammad Ayaan Shaikh. Discover our privacy-first mission to deliver fast, client-side, zero-upload web tools for developers and creators worldwide."
        canonicalUrl="/about"
      />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1rem' }}>
        <Award size={14} /> Independent Creator & Engineering Lab
      </div>

      <h1 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.02em' }}>About ToolNest</h1>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        ToolNest was engineered with a clear, uncompromising mission: <strong style={{ color: 'var(--text-main)' }}>"Free Online Tools That Just Work — Fast, Private, and 100% In-Browser."</strong>
      </p>

      {/* ── Meet the Founder Section (E-E-A-T Credibility) ── */}
      <section style={{
        background: 'var(--card-bg)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '2rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: '800',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
          }}>
            AS
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Muhammad Ayaan Shaikh</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                Founder & Lead Architect
              </span>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 1rem' }}>
              Hi, I’m Ayaan! I am a software engineer and web developer passionate about building lightweight, high-performance web applications that respect user privacy. I created ToolNest to solve a problem I constantly encountered in my daily coding workflow.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://portfolio.shaikhayaan.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--primary-color)',
                  textDecoration: 'none'
                }}
              >
                <Globe size={15} /> Personal Portfolio <ArrowUpRight size={14} />
              </a>
              <a
                href="mailto:support@shaikhayaan.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  textDecoration: 'none'
                }}
              >
                <Code2 size={15} /> support@shaikhayaan.com
              </a>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.75rem 0 1.25rem' }} />

        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            The Story Behind ToolNest: Why Client-Side Computing Matters
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
            Every developer and everyday user has faced this dilemma: you have a confidential PDF, sensitive JSON API tokens, or a private image, and you need a simple tool to convert or format it. Most existing online utility sites force you to upload those files to mysterious backend cloud servers where they may be stored, analyzed, or leaked.
            <br /><br />
            I designed ToolNest from scratch with a strict client-side guarantee: <strong>your device does all the work</strong>. By leveraging modern client-side capabilities like WebAssembly (WASM), the HTML5 Canvas API, and browser-native cryptographic libraries, ToolNest compresses files, formats code, and transforms documents directly inside your computer’s RAM. We do not operate server-side storage because we believe the best way to safeguard user privacy is never collecting data in the first place.
          </p>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7' }}>
        <div>
          <h2 style={{ marginBottom: '1.25rem', color: 'var(--text-main)', fontSize: '1.4rem' }}>Our Core Architectural Principles</h2>
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
                      width: '34px',
                      height: '34px',
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
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{p.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-main)', fontSize: '1.4rem' }}>Who ToolNest Is Built For</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            ToolNest serves software engineers formatting API payloads, web designers converting vector formats, job seekers optimizing resumes against ATS filters, students calculating statistics, and digital creators worldwide who demand reliable, lightning-fast utilities without deceptive ads or registration walls.
          </p>
        </div>

        <AdPlaceholder position="middle" />

        <div style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem'
        }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.2rem' }}>Monetization & Transparency Statement</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            ToolNest is committed to open accessibility. We do not sell user data, charge subscriptions, or gate utilities behind premium tiers. To offset domain hosting, CDN, and continuous development costs, ToolNest utilizes non-intrusive, privacy-compliant display advertising. We strictly avoid intrusive pop-unders, auto-playing video audio, deceptive "fake download" banners, or spammy redirect loops.
          </p>
        </div>
      </div>
    </div>
  );
};
