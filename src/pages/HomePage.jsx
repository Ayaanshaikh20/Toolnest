import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { FAQ } from '../components/FAQ';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Zap, ShieldCheck, Cpu, Lock, Globe, ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const popularTools = TOOLS_DATA.filter(tool => tool.isPopular);

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      {/* Main Container */}
      <div className="container">
        <AdPlaceholder position="top" />

        {/* Popular Tools Section */}
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
        <section className="section" style={{ paddingTop: searchQuery !== '' || activeCategory !== 'all' ? '2rem' : '0' }}>
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
              <h3>No tools match your search criteria</h3>
              <p>Try searching for a different keyword like "JSON", "Image", or "Password".</p>
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
