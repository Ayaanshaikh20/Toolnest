import React from 'react';
import { Link } from 'react-router-dom';
import { CustomToolIcon } from './CustomToolIcons';

export const ToolCard = ({ tool }) => {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-icon">
          <CustomToolIcon slug={tool.slug} size={30} />
        </div>
        {tool.isPopular && <span className="tool-card-badge">Popular</span>}
      </div>

      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      <div className="tool-card-footer">
        <span className="tool-card-category">{tool.category}</span>
        <Link to={`/tools/${tool.slug}`} className="btn btn-outline btn-sm">
          Use Tool &rarr;
        </Link>
      </div>
    </div>
  );
};
