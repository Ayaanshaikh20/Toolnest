import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

const COMMON_FLAGS = [
  { flag: 'g', label: 'Global (g)' },
  { flag: 'i', label: 'Ignore Case (i)' },
  { flag: 'm', label: 'Multiline (m)' },
  { flag: 's', label: 'Dotall (s)' },
];

const REGEX_PRESETS = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'gi' },
  { label: 'IP Address', pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', flags: 'g' },
  { label: 'Phone (US)', pattern: '\\+?1?[-. ]?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})', flags: 'g' },
  { label: 'Hex Color', pattern: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b', flags: 'g' },
  { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])', flags: 'g' },
];

export const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  const toggleFlag = (f) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  };

  const getResults = () => {
    if (!pattern || !testString) return null;
    try {
      const rx = new RegExp(pattern, flags);
      setError('');
      const matches = [...testString.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
      return { rx, matches };
    } catch (e) {
      setError(e.message);
      return null;
    }
  };

  const results = getResults();

  const highlightedHTML = () => {
    if (!results || !pattern) return testString;
    try {
      const rx = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return testString.replace(rx, (match) =>
        `<mark style="background: #FBBF24; color: #1F2937; border-radius: 3px; padding: 0 2px;">${match}</mark>`
      );
    } catch { return testString; }
  };

  const matchCount = results?.matches?.length || 0;
  const isValid = pattern && !error;

  return (
    <div>
      {/* Presets */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Quick Presets</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {REGEX_PRESETS.map(p => (
            <button key={p.label} className="btn btn-outline btn-sm" onClick={() => { setPattern(p.pattern); setFlags(p.flags); }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Regular Expression</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid ' + (error ? 'var(--error-color)' : isValid ? 'var(--success-color)' : 'var(--border-color)'), borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--card-bg)' }}>
          <span style={{ padding: '0.75rem 0.875rem', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--text-light)', background: 'var(--bg-color)', borderRight: '1px solid var(--border-color)' }}>/</span>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Enter regex pattern..."
            style={{ flex: 1, padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.95rem', border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-main)' }} autoFocus />
          <span style={{ padding: '0.75rem 0.875rem', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--text-light)', background: 'var(--bg-color)', borderLeft: '1px solid var(--border-color)' }}>/{flags}</span>
        </div>
        {error && <div style={{ color: 'var(--error-color)', fontSize: '0.8rem', marginTop: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={13} /> {error}</div>}
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {COMMON_FLAGS.map(({ flag, label }) => (
          <label key={flag} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', color: flags.includes(flag) ? 'var(--primary-color)' : 'var(--text-muted)' }}>
            <input type="checkbox" checked={flags.includes(flag)} onChange={() => toggleFlag(flag)} /> {label}
          </label>
        ))}
      </div>

      {/* Test String */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
          <label style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>Test String</label>
          {pattern && testString && (
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: matchCount > 0 ? 'var(--success-color)' : 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {matchCount > 0 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {matchCount} match{matchCount !== 1 ? 'es' : ''}
            </span>
          )}
        </div>
        <textarea className="textarea" rows={5} value={testString} onChange={e => setTestString(e.target.value)}
          placeholder="Paste text here to test your regex against it..." />
      </div>

      {/* Highlighted Result */}
      {results && matchCount > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Highlighted Matches</div>
          <div style={{ background: 'var(--bg-color)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', color: 'var(--text-main)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: highlightedHTML() }} />
        </div>
      )}

      {/* Match Details */}
      {results && results.matches.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Match Details</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto' }}>
            {results.matches.slice(0, 50).map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.375rem 0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-light)', minWidth: '24px', fontWeight: '700' }}>#{i + 1}</span>
                <code style={{ color: 'var(--primary-color)', fontWeight: '700' }}>{m[0]}</code>
                <span style={{ color: 'var(--text-light)', marginLeft: 'auto' }}>Index: {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tool-actions">
        <Button variant="danger" onClick={() => { setPattern(''); setTestString(''); setFlags('g'); }}>
          <Trash2 size={16} /> Clear All
        </Button>
      </div>
    </div>
  );
};
