import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { FAQ } from '../components/FAQ';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Zap, ShieldCheck, Cpu, Lock, Globe, ArrowRight, Search } from 'lucide-react';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const resultsRef = useRef(null);

  const popularTools = TOOLS_DATA.filter(tool => tool.isPopular);

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const homepageFaqs = [
    {
      question: 'Are all tools on ToolNest completely free?',
      answer: 'Yes! Every single tool on ToolNest is 100% free to use with no hidden fees, premium tiers, or limits.'
    },
    {
      question: 'Do I need to create an account or sign up?',
      answer: 'No account registration is required. You can visit any tool URL directly, use it immediately, and leave.'
    },
    {
      question: 'Is my data private and secure when using ToolNest?',
      answer: 'Yes. Most tools process your data locally inside your web browser using JavaScript and Web APIs. Your images, text payloads, passwords, and data never leave your device or get stored on any server.'
    },
    {
      question: 'Can I use ToolNest on mobile devices?',
      answer: 'Absolutely. ToolNest is fully responsive and optimized for smartphones, tablets, laptops, and desktop screens.'
    }
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

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Free Online Tools That Just Work</h1>
          <p>Fast, simple and free tools for developers, creators, students and everyday tasks.</p>

          <SearchBar value={searchQuery} onChange={handleSearchChange} placeholder="Search for any tool (e.g. JSON, Image, Password, Word)..." />

          {/* Quick Access Pills for Ultra-Fast UX */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '1.25rem'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginRight: '0.25rem' }}>Quick Launch:</span>
            <Link to="/tools/json-formatter" className="btn btn-outline btn-sm" style={{ background: '#fff', borderRadius: '999px', fontSize: '0.8rem' }}>⚡ JSON Formatter</Link>
            <Link to="/tools/image-compressor" className="btn btn-outline btn-sm" style={{ background: '#fff', borderRadius: '999px', fontSize: '0.8rem' }}>⚡ Image Compressor</Link>
            <Link to="/tools/password-generator" className="btn btn-outline btn-sm" style={{ background: '#fff', borderRadius: '999px', fontSize: '0.8rem' }}>⚡ Password Generator</Link>
            <Link to="/tools/word-counter" className="btn btn-outline btn-sm" style={{ background: '#fff', borderRadius: '999px', fontSize: '0.8rem' }}>⚡ Word Counter</Link>
            <Link to="/tools/uuid-generator" className="btn btn-outline btn-sm" style={{ background: '#fff', borderRadius: '999px', fontSize: '0.8rem' }}>⚡ UUID Generator</Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" ref={resultsRef}>
        {/* Instant Search Overlay / Header when typing */}
        {searchQuery.trim() !== '' && (
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid #BFDBFE',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            marginTop: '2rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Search size={20} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>
                Showing {filteredTools.length} tool{filteredTools.length === 1 ? '' : 's'} matching "{searchQuery}"
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="btn btn-outline btn-sm"
              style={{ background: '#fff' }}
            >
              Clear Search
            </button>
          </div>
        )}

        <AdPlaceholder position="top" />

        {/* Popular Tools Section (shown when no search query active) */}
        {searchQuery === '' && activeCategory === 'all' && (
          <section className="section">
            <div className="section-title">
              <h2>Popular Tools</h2>
              <Link to="/tools" className="btn btn-outline btn-sm">
                View All Tools <ArrowRight size={16} />
              </Link>
            </div>
            <div className="tool-grid">
              {popularTools.map(tool => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Directory Search / Category Filter Section */}
        <section className="section" style={{ paddingTop: searchQuery !== '' || activeCategory !== 'all' ? '1rem' : '0' }}>
          <div className="section-title">
            <h2>{searchQuery || activeCategory !== 'all' ? 'Search Results' : 'Explore All Tools'}</h2>
          </div>

          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {filteredTools.length > 0 ? (
            <div className="tool-grid">
              {filteredTools.map(tool => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <h3>No tools match your search "{searchQuery}"</h3>
              <p style={{ marginTop: '0.5rem' }}>Try searching for keywords like "JSON", "Image", "Password", "Word", or "UUID".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '1rem' }}
              >
                Show All Tools
              </button>
            </div>
          )}
        </section>

        <AdPlaceholder position="middle" />

        {/* Why ToolNest? Section */}
        <section className="section">
          <div className="section-title" style={{ textAlign: 'center', display: 'block' }}>
            <h2>Why ToolNest?</h2>
            <p style={{ marginTop: '0.5rem' }}>Engineered for speed, privacy, and frictionless everyday productivity.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Zap size={24} /></div>
              <h3>100% Free Forever</h3>
              <p>No paywalls, subscriptions, or feature locks. Use all tools without restrictions.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Lock size={24} /></div>
              <h3>No Registration</h3>
              <p>No sign-up or email required. Get straight to work without creating accounts.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Cpu size={24} /></div>
              <h3>Fast Processing</h3>
              <p>Instant client-side execution means zero server latency for your workflows.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={24} /></div>
              <h3>Privacy-Friendly</h3>
              <p>Your sensitive images, JSON, and text payloads stay on your device local browser.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Globe size={24} /></div>
              <h3>Works In Your Browser</h3>
              <p>Cross-platform compatibility. Works on Windows, Mac, Linux, iOS, and Android.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="section-title" style={{ textAlign: 'center', display: 'block' }}>
            <h2>Frequently Asked Questions</h2>
            <p style={{ marginTop: '0.5rem' }}>Got questions? We've got answers.</p>
          </div>
          <FAQ faqs={homepageFaqs} />
        </section>

        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
};
