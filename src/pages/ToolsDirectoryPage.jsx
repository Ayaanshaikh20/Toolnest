import React, { useState } from 'react';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const ToolsDirectoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <SEO
        title="All Free Online Tools Directory | ToolNest"
        description="Browse our complete list of free online utilities. Developer tools, image converters, word counter, password generator, percentage calculators, and more."
        canonicalUrl="/tools"
      />

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>Free Online Tools Directory</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 1.75rem auto' }}>
          Explore our collection of free browser-based tools. Filter by category or search below.
        </p>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <AdPlaceholder position="top" />

      {filteredTools.length > 0 ? (
        <div className="tool-grid" style={{ marginTop: '2rem' }}>
          {filteredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <h3>No matching tools found</h3>
          <p>Please adjust your search term or select another category filter.</p>
        </div>
      )}

      <AdPlaceholder position="bottom" />
    </div>
  );
};
