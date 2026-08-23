import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ toolName }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" title="Home">
        <Home size={14} />
      </Link>
      <ChevronRight size={14} />
      <Link to="/tools">Tools</Link>
      <ChevronRight size={14} />
      <span>{toolName}</span>
    </nav>
  );
};
