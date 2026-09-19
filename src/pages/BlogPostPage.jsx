import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { NotFoundPage } from './NotFoundPage';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ToolNest Blog`;
      
      // Update meta description for SEO
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
    }
  }, [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          &larr; Back to Blog
        </Link>
      </div>
      
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.3 }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <span>By {post.author}</span>
          <span>&bull;</span>
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <article 
        className="blog-content"
        style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          color: 'var(--text-main)'
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <style>{`
        .blog-content h2 {
          font-size: 1.8rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }
        .blog-content h3 {
          font-size: 1.4rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--text-main);
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content a {
          color: var(--primary-color);
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
