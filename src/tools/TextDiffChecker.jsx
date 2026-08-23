import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2, ArrowLeftRight } from 'lucide-react';

// Simple line-by-line diff
const computeDiff = (original, modified) => {
  const oldLines = original.split('\n');
  const newLines = modified.split('\n');
  const maxLen = Math.max(oldLines.length, newLines.length);
  const result = [];

  for (let i = 0; i < maxLen; i++) {
    const o = oldLines[i];
    const n = newLines[i];
    if (o === undefined) {
      result.push({ type: 'added', line: n, lineNum: i + 1 });
    } else if (n === undefined) {
      result.push({ type: 'removed', line: o, lineNum: i + 1 });
    } else if (o !== n) {
      result.push({ type: 'removed', line: o, lineNum: i + 1 });
      result.push({ type: 'added', line: n, lineNum: i + 1 });
    } else {
      result.push({ type: 'unchanged', line: o, lineNum: i + 1 });
    }
  }
  return result;
};

const TYPE_STYLE = {
  added: { background: 'rgba(63, 185, 80, 0.15)', borderLeft: '3px solid var(--success-color)', color: 'var(--success-color)', prefix: '+' },
  removed: { background: 'rgba(248, 81, 73, 0.15)', borderLeft: '3px solid var(--error-color)', color: 'var(--error-color)', prefix: '-' },
  unchanged: { background: 'transparent', borderLeft: '3px solid transparent', color: 'var(--text-muted)', prefix: ' ' },
};

export const TextDiffChecker = () => {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');

  const diff = original || modified ? computeDiff(original, modified) : [];
  const added = diff.filter(d => d.type === 'added').length;
  const removed = diff.filter(d => d.type === 'removed').length;
  const unchanged = diff.filter(d => d.type === 'unchanged').length;

  const swap = () => { setOriginal(modified); setModified(original); };

  return (
    <div>
      {/* Two-panel input */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
            Original Text
          </label>
          <textarea className="textarea" rows={8} value={original} onChange={e => setOriginal(e.target.value)}
            placeholder="Paste original / old text here..." autoFocus />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
            Modified Text
          </label>
          <textarea className="textarea" rows={8} value={modified} onChange={e => setModified(e.target.value)}
            placeholder="Paste modified / new text here..." />
        </div>
      </div>

      {/* Stats bar */}
      {(original || modified) && (
        <div style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 1rem', background: 'var(--bg-color)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--success-color)' }}>+ {added} added</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--error-color)' }}>− {removed} removed</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-muted)' }}>  {unchanged} unchanged</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-light)', marginLeft: 'auto' }}>
            {diff.length} total lines
          </span>
        </div>
      )}

      {/* Diff Output */}
      {diff.length > 0 && (
        <div style={{ border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ padding: '0.625rem 1rem', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Diff Output</span>
            <CopyButton text={diff.map(d => TYPE_STYLE[d.type].prefix + ' ' + d.line).join('\n')} label="Copy Diff" />
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', maxHeight: '400px', overflowY: 'auto' }}>
            {diff.map((entry, i) => {
              const s = TYPE_STYLE[entry.type];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', borderLeft: s.borderLeft, background: s.background, padding: '0.2rem 0.75rem', minHeight: '1.8em', lineHeight: '1.6' }}>
                  <span style={{ minWidth: '16px', color: s.color, fontWeight: '700', marginRight: '1rem', userSelect: 'none' }}>{s.prefix}</span>
                  <span style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1 }}>{entry.line}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="tool-actions">
        <Button variant="secondary" onClick={swap} disabled={!original && !modified}>
          <ArrowLeftRight size={16} /> Swap Texts
        </Button>
        <Button variant="danger" onClick={() => { setOriginal(''); setModified(''); }}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
