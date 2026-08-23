import React from 'react';
import { ToolCard } from './ToolCard';

export const RelatedTools = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="section-title">
        <h2>Related Tools</h2>
      </div>
      <div className="tool-grid">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
};
