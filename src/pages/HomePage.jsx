import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { SearchBar } from '../components/SearchBar';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { FAQ } from '../components/FAQ';
import { CustomToolIcon } from '../components/CustomToolIcons';
import { Search, X, Smartphone, WifiOff, Zap, ShieldCheck, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export const HomePage = ({ onOpenCommandPalette }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      alert('To install ToolNest on mobile/desktop, tap the Install button in your browser address bar or use "Add to Home Screen" in your browser menu.');
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const filteredTools = TOOLS_DATA.filter(tool => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const homepageFaqs = [
    { question: 'Can I use ToolNest offline?', answer: 'Yes! ToolNest is a Progressive Web App (PWA). You can install it on your computer, tablet, or smartphone to run all PDF, developer, image, and text utilities completely offline without an internet connection.' },
    { question: 'How do I install the ToolNest app?', answer: 'Click the "Install App" button in the header or homepage banner. On Android and PC/Mac, it will install instantly. On iOS Safari, tap the Share button and select "Add to Home Screen".' },
    { question: 'Are all tools 100% free?', answer: 'Yes! Every tool is completely free with no subscription tiers, daily usage limits, or hidden fees.' },
    { question: 'Is my data and file content private?', answer: 'Yes, 100%. All processing runs locally inside your browser memory using WebAssembly and client-side JavaScript. Your files and data are never uploaded to any remote server.' },
    { question: 'Do I need to sign up or create an account?', answer: 'No registration is required. Open any tool and start working immediately.' }
  ];

  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolNest",
    "url": "https://toolnest.shaikhayaan.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolnest.shaikhayaan.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      <SEO
        title="ToolNest - 25+ Free Online Tools & Offline PWA Utilities"
        description="Fast, private and free web utilities for developers, creators, students and everyday productivity. PDF tools, image compressors, QR codes, and converters with 100% offline PWA support."
        canonicalUrl="/"
        structuredData={homepageStructuredData}
      />

      {/* ── Compact Hero with PWA Badges ── */}
      <section className="hero-compact">
        <div className="container">
          <div className="hero-compact-inner">
            <div className="hero-compact-text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                <Sparkles size={14} /> 25+ Tools &bull; 100% Offline PWA Ready
              </div>
              <h1>Free Online Tools.<br /><span style={{ color: 'var(--primary-color)' }}>Open. Use. Done.</span></h1>
              <p>Fast, privacy-first developer & document utilities. Zero server uploads, zero logins, and full offline execution.</p>
            </div>
            <div className="hero-compact-search">
              <SearchBar value={searchQuery} onChange={setSearchQuery} onOpenCommandPalette={onOpenCommandPalette} placeholder="Search tools (PDF, JSON, Image, Password...)" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout: Sidebar + Tool Grid ── */}
      <div className="container">
        <div className="tools-layout">

          {/* Sidebar: Category Filter */}
          <aside className="tools-sidebar">
            <div className="sidebar-section-label">Categories</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`sidebar-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
              >
                {cat.name}
                <span className="sidebar-count">
                  {cat.id === 'all' ? TOOLS_DATA.length : TOOLS_DATA.filter(t => t.category === cat.id).length}
                </span>
              </button>
            ))}

            <div className="sidebar-ad-slot">
              <AdPlaceholder position="sidebar" />
            </div>
          </aside>

          {/* Main: Tool Grid */}
          <main className="tools-main">
            {/* Search result label */}
            {(searchQuery || activeCategory !== 'all') && (
              <div className="results-bar">
                <span>
                  {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                  {searchQuery ? ` for "${searchQuery}"` : ''}
                  {activeCategory !== 'all' ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.name}` : ''}
                </span>
                <button
                  className="results-clear"
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                >
                  <X size={14} /> Clear
                </button>
              </div>
            )}

            {filteredTools.length > 0 ? (
              <div className="compact-tool-grid">
                {filteredTools.map(tool => (
                  <Link key={tool.slug} to={`/tools/${tool.slug}`} className="compact-tool-card">
                    <span className="compact-tool-badge">{tool.category}</span>
                    <div className="compact-tool-icon">
                      <CustomToolIcon slug={tool.slug} size={30} />
                    </div>
                    <div className="compact-tool-body">
                      <div className="compact-tool-name">{tool.name}</div>
                      <div className="compact-tool-desc">{tool.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={40} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
                <h3>No tools found for "{searchQuery}"</h3>
                <p>Try: PDF, JSON, Image, Password, Word, UUID</p>
                <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                  Show All Tools
                </button>
              </div>
            )}

            <AdPlaceholder position="middle" />
          </main>
        </div>

        {/* ── PWA & Offline Showcase Section ── */}
        <section style={{
          marginTop: '3.5rem',
          padding: '2.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderRadius: 'var(--radius-lg, 16px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              background: 'var(--primary-color)',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              <Smartphone size={15} /> Progressive Web App (PWA)
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Install ToolNest &bull; Use All 25+ Tools 100% Offline
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Add ToolNest to your PC desktop, Mac dock, or mobile home screen. Enjoy zero-latency instant launches and complete offline tool functionality without relying on an active internet connection.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                  <WifiOff size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                  100% Offline Support
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                  Compress PDFs, generate QR codes, and format JSON payloads even on airplane mode.
                </p>
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                  Zero Server Uploads
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                  Your confidential tax forms, passwords, and source code stay strictly on your local hardware.
                </p>
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ color: '#8B5CF6', marginBottom: '0.5rem' }}>
                  <Zap size={24} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                  1-Click Desktop & Mobile
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                  Instant app shortcuts with zero installation lag and automatic background cache updates.
                </p>
              </div>
            </div>

            <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={handleInstallClick}
                className="btn btn-primary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}
              >
                <Download size={18} /> {isInstalled ? 'App Installed on Device' : 'Install ToolNest App'}
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '3.5rem 0 2rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>Frequently Asked Questions</h2>
          <FAQ faqs={homepageFaqs} />
        </section>

        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
};
