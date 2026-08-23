import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export const ToolCard = ({ tool }) => {
  const IconComponent = Icons[tool.icon] || Icons.Wrench;

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-icon">
          <IconComponent size={24} />
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
