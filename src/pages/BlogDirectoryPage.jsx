import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';

export const BlogDirectoryPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          ToolNest Blog
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Articles, guides, and insights on web development, privacy-first software, and modern productivity.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {BLOG_POSTS.map(post => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'var(--primary-color)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '0.75rem' }}>
              {post.date} &bull; {post.readTime}
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.4 }}>
              {post.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
              {post.excerpt}
            </p>
            <div style={{ marginTop: '1.5rem', fontWeight: 600, color: 'var(--primary-color)', fontSize: '0.9rem' }}>
              Read Article &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
