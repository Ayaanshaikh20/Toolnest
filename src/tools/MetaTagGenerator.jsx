import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2, Tag } from 'lucide-react';

export const MetaTagGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [type, setType] = useState('website');
  const [robots, setRobots] = useState('index, follow');

  const titleLen = title.length;
  const descLen = description.length;

  const getTitleColor = () => {
    if (titleLen === 0) return 'var(--text-light)';
    if (titleLen < 30 || titleLen > 60) return 'var(--warning-color)';
    return 'var(--success-color)';
  };
  const getDescColor = () => {
    if (descLen === 0) return 'var(--text-light)';
    if (descLen < 120 || descLen > 160) return 'var(--warning-color)';
    return 'var(--success-color)';
  };

  const generateTags = () => {
    const lines = [
      '<!-- Primary Meta Tags -->',
      title && `<title>${title}</title>`,
      `<meta name="title" content="${title}" />`,
      description && `<meta name="description" content="${description}" />`,
      keywords && `<meta name="keywords" content="${keywords}" />`,
      author && `<meta name="author" content="${author}" />`,
      `<meta name="robots" content="${robots}" />`,
      '',
      '<!-- Open Graph / Facebook -->',
      `<meta property="og:type" content="${type}" />`,
      url && `<meta property="og:url" content="${url}" />`,
      title && `<meta property="og:title" content="${title}" />`,
      description && `<meta property="og:description" content="${description}" />`,
      image && `<meta property="og:image" content="${image}" />`,
      '',
      '<!-- Twitter Card -->',
      `<meta name="twitter:card" content="summary_large_image" />`,
      twitterHandle && `<meta name="twitter:site" content="@${twitterHandle.replace('@', '')}" />`,
      url && `<meta name="twitter:url" content="${url}" />`,
      title && `<meta name="twitter:title" content="${title}" />`,
      description && `<meta name="twitter:description" content="${description}" />`,
      image && `<meta name="twitter:image" content="${image}" />`,
    ].filter(Boolean).join('\n');
    return lines;
  };

  const tags = generateTags();

  return (
    <div>
      <div className="two-column-tool-grid">
        {/* Left: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>Page Title</label>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: getTitleColor() }}>{titleLen}/60</span>
            </div>
            <input type="text" className="input" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Best Free Online Tools | ToolNest" autoFocus />
            {titleLen > 0 && (titleLen < 30 || titleLen > 60) && (
              <div style={{ fontSize: '0.75rem', color: 'var(--warning-color)', marginTop: '0.25rem' }}>
                ⚠ Ideal title length: 30–60 characters
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>Meta Description</label>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: getDescColor() }}>{descLen}/160</span>
            </div>
            <textarea className="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Concise description (120–160 chars) for search engines..." />
            {descLen > 0 && (descLen < 120 || descLen > 160) && (
              <div style={{ fontSize: '0.75rem', color: 'var(--warning-color)', marginTop: '0.25rem' }}>
                ⚠ Ideal description length: 120–160 characters
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Keywords</label>
            <input type="text" className="input" value={keywords} onChange={e => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Author</label>
              <input type="text" className="input" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author name" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>OG Type</label>
              <select className="input" value={type} onChange={e => setType(e.target.value)}>
                {['website', 'article', 'product', 'profile', 'book', 'video.movie'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Page URL</label>
            <input type="url" className="input" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yoursite.com/page" />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>OG Image URL</label>
            <input type="url" className="input" value={image} onChange={e => setImage(e.target.value)} placeholder="https://yoursite.com/og-image.jpg" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Twitter Handle</label>
              <input type="text" className="input" value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)} placeholder="@yourhandle" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Robots</label>
              <select className="input" value={robots} onChange={e => setRobots(e.target.value)}>
                {['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Generated Meta Tags</label>
          <textarea className="textarea" rows={26} value={tags} readOnly
            style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: '1.6' }} />
          <div className="tool-actions" style={{ marginTop: '0.75rem' }}>
            <CopyButton text={tags} label="Copy All Tags" />
            <Button variant="danger" onClick={() => { setTitle(''); setDescription(''); setKeywords(''); setAuthor(''); setUrl(''); setImage(''); setTwitterHandle(''); }}>
              <Trash2 size={16} /> Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
