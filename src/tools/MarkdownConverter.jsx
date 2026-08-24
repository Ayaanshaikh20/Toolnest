import React, { useState, useCallback } from 'react';
import { marked } from 'marked';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { showToast } from '../components/Toast';
import { ArrowLeftRight, Eye, Code, Trash2, FileDown } from 'lucide-react';

// Configure marked for safe, clean output
marked.setOptions({ breaks: true, gfm: true });

const htmlToMarkdown = (html) => {
  // Basic HTML → Markdown conversion without external lib
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*/gi, '![$2]($1)')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>|<\/ol>/gi, '\n')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n')
    .replace(/<hr[^>]*\/?>/gi, '\n---\n')
    .replace(/<br[^>]*\/?>/gi, '\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
    .replace(/<[^>]+>/g, '') // strip remaining tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const MARKDOWN_SAMPLE = `# Welcome to ToolNest Markdown Converter

This is a **free, instant** Markdown to HTML converter that works 100% in your browser.

## Features

- Live preview as you type
- Copy HTML output with one click
- Supports **bold**, *italic*, \`inline code\`, and [links](https://toolnest.shaikhayaan.com)

## Code Block

\`\`\`javascript
const greeting = "Hello, ToolNest!";
console.log(greeting);
\`\`\`

> Blockquotes look great too.

---
Enjoy converting! 🚀
`;

export const MarkdownConverter = () => {
  const [mode, setMode] = useState('md-to-html'); // 'md-to-html' | 'html-to-md'
  const [input, setInput] = useState(MARKDOWN_SAMPLE);
  const [previewMode, setPreviewMode] = useState('split'); // 'split' | 'preview' | 'code'

  const htmlOutput = useCallback(() => {
    if (mode === 'md-to-html') {
      try { return marked(input || ''); } catch { return ''; }
    }
    return '';
  }, [input, mode]);

  const mdOutput = useCallback(() => {
    if (mode === 'html-to-md') {
      return htmlToMarkdown(input || '');
    }
    return '';
  }, [input, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setInput('');
    setPreviewMode('split');
  };

  const copyOutput = () => {
    const out = mode === 'md-to-html' ? htmlOutput() : mdOutput();
    if (!out) { showToast('Nothing to copy yet.', 'error'); return; }
    navigator.clipboard.writeText(out).then(() => showToast('Output copied!', 'success'));
  };

  const downloadOutput = () => {
    const out = mode === 'md-to-html' ? htmlOutput() : mdOutput();
    if (!out) { showToast('Nothing to download yet.', 'error'); return; }
    const ext = mode === 'md-to-html' ? 'html' : 'md';
    const mime = mode === 'md-to-html' ? 'text/html' : 'text/markdown';
    const blob = new Blob([out], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded as converted.${ext}!`, 'success');
  };

  const currentOutput = mode === 'md-to-html' ? htmlOutput() : mdOutput();
  const inputLabel = mode === 'md-to-html' ? 'Markdown Input' : 'HTML Input';
  const outputLabel = mode === 'md-to-html' ? 'HTML Output' : 'Markdown Output';
  const inputPlaceholder = mode === 'md-to-html'
    ? '# Hello World\n\nType your **Markdown** here...'
    : '<h1>Hello World</h1>\n<p>Paste your <strong>HTML</strong> here...</p>';

  return (
    <div>
      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant={mode === 'md-to-html' ? 'primary' : 'outline'} onClick={() => switchMode('md-to-html')}>
          Markdown → HTML
        </Button>
        <Button variant={mode === 'html-to-md' ? 'primary' : 'outline'} onClick={() => switchMode('html-to-md')}>
          HTML → Markdown
        </Button>

        {mode === 'md-to-html' && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
            {[
              { key: 'split', icon: <ArrowLeftRight size={14} />, label: 'Split' },
              { key: 'preview', icon: <Eye size={14} />, label: 'Preview' },
              { key: 'code', icon: <Code size={14} />, label: 'HTML' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setPreviewMode(key)}
                className={`btn btn-sm ${previewMode === key ? 'btn-primary' : 'btn-outline'}`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editor Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mode === 'html-to-md' ? '1fr 1fr' : (previewMode === 'split' ? '1fr 1fr' : '1fr'),
        gap: '1rem',
      }}
        className="two-column-tool-grid"
      >
        {/* Input Panel */}
        {(mode === 'html-to-md' || previewMode !== 'preview') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
                {inputLabel}
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                {input.length} chars
              </span>
            </div>
            <textarea
              className="textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              rows={18}
              style={{ fontFamily: 'monospace', fontSize: '0.875rem', resize: 'vertical' }}
              spellCheck={false}
            />
          </div>
        )}

        {/* Output Panel */}
        {(mode === 'html-to-md' || previewMode !== 'code') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
                {outputLabel} {mode === 'md-to-html' && previewMode !== 'code' ? '— Preview' : ''}
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                {currentOutput.length} chars
              </span>
            </div>

            {mode === 'md-to-html' && previewMode !== 'code' ? (
              /* Live HTML Preview */
              <div
                dangerouslySetInnerHTML={{ __html: currentOutput }}
                style={{
                  minHeight: '400px',
                  padding: '1.25rem',
                  background: 'var(--card-bg)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'auto',
                  fontSize: '0.95rem',
                  lineHeight: '1.75',
                  color: 'var(--text-main)',
                }}
                className="md-preview"
              />
            ) : (
              /* Raw Code Output */
              <textarea
                className="textarea"
                value={currentOutput}
                readOnly
                rows={18}
                style={{ fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical', color: 'var(--text-main)' }}
              />
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="tool-actions" style={{ marginTop: '1rem' }}>
        <Button variant="primary" onClick={copyOutput}>
          <Code size={16} /> Copy Output
        </Button>
        <Button variant="secondary" onClick={downloadOutput}>
          <FileDown size={16} /> Download File
        </Button>
        <Button variant="danger" onClick={() => setInput('')}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>

      {/* Markdown preview styles */}
      <style>{`
        .md-preview h1,.md-preview h2,.md-preview h3,.md-preview h4{color:var(--text-main);margin:1rem 0 0.5rem;}
        .md-preview h1{font-size:1.75rem;} .md-preview h2{font-size:1.4rem;} .md-preview h3{font-size:1.15rem;}
        .md-preview p{color:var(--text-muted);margin-bottom:0.75rem;}
        .md-preview a{color:var(--primary-color);}
        .md-preview code{background:var(--bg-color);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.875em;color:var(--primary-color);}
        .md-preview pre{background:var(--bg-color);padding:1rem;border-radius:var(--radius-md);overflow:auto;border:1px solid var(--border-color);margin-bottom:1rem;}
        .md-preview pre code{background:none;padding:0;color:var(--text-main);}
        .md-preview blockquote{border-left:4px solid var(--primary-color);margin:0 0 1rem;padding:0.5rem 1rem;color:var(--text-muted);background:var(--primary-light);border-radius:0 var(--radius-sm) var(--radius-sm) 0;}
        .md-preview ul,.md-preview ol{padding-left:1.5rem;margin-bottom:0.75rem;color:var(--text-muted);}
        .md-preview li{margin-bottom:0.25rem;}
        .md-preview hr{border:none;border-top:1px solid var(--border-color);margin:1rem 0;}
        .md-preview strong,.md-preview b{color:var(--text-main);font-weight:700;}
        .md-preview table{width:100%;border-collapse:collapse;margin-bottom:1rem;}
        .md-preview th,.md-preview td{border:1px solid var(--border-color);padding:0.5rem 0.75rem;text-align:left;}
        .md-preview th{background:var(--bg-color);font-weight:700;color:var(--text-main);}
      `}</style>
    </div>
  );
};
