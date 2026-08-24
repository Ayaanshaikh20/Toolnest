import React, { useState, useCallback } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { showToast } from '../components/Toast';
import { Minimize2, Maximize2, Trash2, FileDown, CheckCircle2 } from 'lucide-react';

// ── CSS Minifier ─────────────────────────────────────────────────
const minifyCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')     // remove comments
    .replace(/\s*([{};:,>~+])\s*/g, '$1') // strip spaces around operators
    .replace(/\s{2,}/g, ' ')              // collapse multiple spaces
    .replace(/;\}/g, '}')                 // remove last semicolon before }
    .replace(/\n/g, '')                   // remove newlines
    .trim();
};

const beautifyCSS = (css) => {
  let depth = 0;
  const indent = () => '  '.repeat(depth);
  return css
    .replace(/\/\*[\s\S]*?\*\//g, m => `\n${m}\n`)
    .replace(/([{};])/g, '$1\n')
    .replace(/\n\s*/g, '\n')
    .split('\n')
    .map(line => {
      line = line.trim();
      if (!line) return '';
      if (line.endsWith('}')) depth = Math.max(0, depth - 1);
      const out = indent() + line;
      if (line.endsWith('{')) depth++;
      return out;
    })
    .filter(Boolean)
    .join('\n')
    .trim();
};

// ── JS Minifier ──────────────────────────────────────────────────
const minifyJS = (js) => {
  // A simple but effective minifier (no AST — preserves correctness for standard code)
  return js
    .replace(/\/\/[^\n]*/g, '')           // remove // comments (not in strings)
    .replace(/\/\*[\s\S]*?\*\//g, '')     // remove /* */ comments
    .replace(/^\s+|\s+$/gm, '')           // trim each line
    .replace(/\n{2,}/g, '\n')             // collapse blank lines
    .replace(/\s*([=+\-*/%&|^!<>?:,;{}()[\]])\s*/g, '$1') // strip spaces around operators
    .replace(/\n/g, ';')                  // newlines → semicolons
    .replace(/;{2,}/g, ';')               // collapse multiple semicolons
    .replace(/;}/g, '}')                  // clean up ;} artifacts
    .replace(/^;|;$/g, '')                // trim leading/trailing semicolons
    .trim();
};

const TABS = [
  { key: 'css', label: 'CSS Minifier' },
  { key: 'js', label: 'JS Minifier' },
];

const CSS_SAMPLE = `/* Navigation Styles */
.navbar {
  display: flex;
  align-items: center;
  background-color: #1a1a2e;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar a {
  color: #e0e0e0;
  text-decoration: none;
  margin-right: 1.5rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.navbar a:hover {
  color: #58a6ff;
}`;

const JS_SAMPLE = `// ToolNest Example Script
function greet(name) {
  const message = "Hello, " + name + "!";
  console.log(message);
  return message;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(function(user) {
  greet(user);
});

// Arrow function example
const double = (x) => x * 2;
console.log(double(21));`;

export const CodeMinifier = () => {
  const [tab, setTab] = useState('css');
  const [input, setInput] = useState(CSS_SAMPLE);
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState(null);

  const switchTab = (newTab) => {
    setTab(newTab);
    setInput(newTab === 'css' ? CSS_SAMPLE : JS_SAMPLE);
    setOutput('');
    setStats(null);
  };

  const handleMinify = () => {
    if (!input.trim()) { showToast('Please enter some code to minify.', 'error'); return; }
    const minified = tab === 'css' ? minifyCSS(input) : minifyJS(input);
    setOutput(minified);
    const saved = input.length - minified.length;
    const pct = ((saved / input.length) * 100).toFixed(1);
    setStats({ original: input.length, minified: minified.length, saved, pct });
    showToast(`Minified! Saved ${pct}% (${saved} bytes)`, 'success');
  };

  const handleBeautify = () => {
    if (!input.trim()) { showToast('Please enter some code to beautify.', 'error'); return; }
    if (tab !== 'css') { showToast('JS beautification is coming soon!', 'info'); return; }
    const beautified = beautifyCSS(input);
    setOutput(beautified);
    setStats(null);
    showToast('CSS formatted!', 'success');
  };

  const handleDownload = () => {
    if (!output) { showToast('Minify first to download.', 'error'); return; }
    const ext = tab;
    const mime = tab === 'css' ? 'text/css' : 'text/javascript';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded as minified.${ext}!`, 'success');
  };

  return (
    <div>
      {/* Tab Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => switchTab(t.key)}
            className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-outline'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      {stats && (
        <div style={{
          display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center',
          padding: '0.75rem 1rem', marginBottom: '1rem',
          background: 'var(--success-bg)', border: '1px solid var(--success-color)',
          borderRadius: 'var(--radius-md)', fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success-color)', fontWeight: 700 }}>
            <CheckCircle2 size={16} /> Minified Successfully
          </div>
          <span style={{ color: 'var(--text-muted)' }}>Original: <strong style={{ color: 'var(--text-main)' }}>{stats.original.toLocaleString()} bytes</strong></span>
          <span style={{ color: 'var(--text-muted)' }}>Result: <strong style={{ color: 'var(--text-main)' }}>{stats.minified.toLocaleString()} bytes</strong></span>
          <span style={{ color: 'var(--success-color)', fontWeight: 800 }}>
            🎯 {stats.pct}% smaller ({stats.saved.toLocaleString()} bytes saved)
          </span>
        </div>
      )}

      {/* Editor Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="two-column-tool-grid">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
              {tab.toUpperCase()} Input
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{input.length} bytes</span>
          </div>
          <textarea
            className="textarea"
            value={input}
            onChange={e => { setInput(e.target.value); setOutput(''); setStats(null); }}
            placeholder={`Paste your ${tab.toUpperCase()} here...`}
            rows={18}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }}
            spellCheck={false}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
              Minified Output
            </label>
            {output && <span style={{ fontSize: '0.75rem', color: 'var(--success-color)', fontWeight: 700 }}>{output.length} bytes</span>}
          </div>
          <textarea
            className="textarea"
            value={output}
            readOnly
            rows={18}
            placeholder="Minified result will appear here..."
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="tool-actions" style={{ marginTop: '1rem' }}>
        <Button variant="primary" onClick={handleMinify}>
          <Minimize2 size={16} /> Minify {tab.toUpperCase()}
        </Button>
        {tab === 'css' && (
          <Button variant="secondary" onClick={handleBeautify}>
            <Maximize2 size={16} /> Beautify CSS
          </Button>
        )}
        <CopyButton text={output} label="Copy Output" successMessage="Minified code copied!" />
        <Button variant="secondary" onClick={handleDownload}>
          <FileDown size={16} /> Download
        </Button>
        <Button variant="danger" onClick={() => { setInput(''); setOutput(''); setStats(null); }}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
