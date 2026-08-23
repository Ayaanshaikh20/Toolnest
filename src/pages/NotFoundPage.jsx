import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <SEO title="404 Page Not Found | ToolNest" description="The page or tool you requested could not be found." />

      <FileQuestion size={64} style={{ color: 'var(--primary-color)', marginBottom: '1.25rem' }} />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
        Oops! The tool or page you are looking for does not exist or has been moved.
      </p>

      <Link to="/tools" className="btn btn-primary">
        <ArrowLeft size={18} /> Browse All Tools
      </Link>
    </div>
  );
};
