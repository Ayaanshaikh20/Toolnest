import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { SearchBar } from '../components/SearchBar';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { FAQ } from '../components/FAQ';
import {
  FileJson, CheckCircle2, Fingerprint, Binary, Link2, Clock,
  ShieldCheck, FileText, Type, Palette, Image, Scaling, FileImage,
  Percent, Search, X, ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  FileJson, CheckCircle2, Fingerprint, Binary, Link2, Clock,
  ShieldCheck, FileText, Type, Palette, Image, Scaling, FileImage, Percent
};

const ToolIcon = ({ name, size = 18 }) => {
  const Icon = ICON_MAP[name] || FileJson;
  return <Icon size={size} />;
};

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
    { question: 'Are all tools free?', answer: 'Yes! Every tool is 100% free with no hidden fees, premium tiers, or limits.' },
    { question: 'Do I need to sign up?', answer: 'No account required. Visit any tool URL and start working immediately.' },
    { question: 'Is my data private?', answer: 'Yes. All tools run inside your browser. Your files and text never leave your device.' },
    { question: 'Does it work on mobile?', answer: 'Yes, fully responsive on smartphones, tablets, and desktops.' }
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
        title="ToolNest - Free Online Tools That Just Work"
        description="Fast, simple and free tools for developers, creators, students and everyday tasks. No registration, client-side processing, and 100% private."
        canonicalUrl="/"
        structuredData={homepageStructuredData}
      />

      {/* ── Compact Hero ── */}
      <section className="hero-compact">
        <div className="container">
          <div className="hero-compact-inner">
            <div className="hero-compact-text">
              <h1>Free Online Tools.<br /><span style={{ color: 'var(--primary-color)' }}>Open. Use. Done.</span></h1>
              <p>15+ fast, privacy-first utilities. No login, no uploads, no nonsense.</p>
            </div>
            <div className="hero-compact-search">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search tools (JSON, Image, Password...)" />
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
                    <div className="compact-tool-icon">
                      <ToolIcon name={tool.icon} size={20} />
                    </div>
                    <div className="compact-tool-body">
                      <div className="compact-tool-name">{tool.name}</div>
                      <div className="compact-tool-desc">{tool.description}</div>
                    </div>
                    <ChevronRight size={16} className="compact-tool-arrow" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={40} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
                <h3>No tools found for "{searchQuery}"</h3>
                <p>Try: JSON, Image, Password, Word, UUID</p>
                <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                  Show All Tools
                </button>
              </div>
            )}

            <AdPlaceholder position="middle" />
          </main>
        </div>

        {/* FAQ */}
        <section style={{ padding: '2.5rem 0' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>Frequently Asked Questions</h2>
          <FAQ faqs={homepageFaqs} />
        </section>

        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
};
