import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2, Hash } from 'lucide-react';

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const arrayBufferToHex = (buf) =>
  Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

export const HashGenerator = () => {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState({});
  const [loading, setLoading] = useState(false);
  const [encoding, setEncoding] = useState('text'); // text | hex | base64

  const generateHashes = async (input) => {
    if (!input.trim()) { setHashes({}); return; }
    setLoading(true);

    let encoded;
    try {
      if (encoding === 'hex') {
        const bytes = input.replace(/\s/g, '').match(/.{1,2}/g) || [];
        encoded = new Uint8Array(bytes.map(b => parseInt(b, 16)));
      } else if (encoding === 'base64') {
        const binaryStr = atob(input.trim());
        encoded = new Uint8Array([...binaryStr].map(c => c.charCodeAt(0)));
      } else {
        encoded = new TextEncoder().encode(input);
      }

      const results = {};
      for (const algo of ALGORITHMS) {
        const buf = await crypto.subtle.digest(algo, encoded);
        results[algo] = arrayBufferToHex(buf);
      }
      setHashes(results);
    } catch (e) {
      setHashes({ error: 'Invalid input for selected encoding.' });
    }
    setLoading(false);
  };

  const handleChange = (val) => {
    setText(val);
    generateHashes(val);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>Input</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['text', 'hex', 'base64'].map(enc => (
              <label key={enc} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', color: encoding === enc ? 'var(--primary-color)' : 'var(--text-muted)' }}>
                <input type="radio" name="encoding" value={enc} checked={encoding === enc}
                  onChange={() => { setEncoding(enc); handleChange(text); }} /> {enc.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
        <textarea
          className="textarea"
          rows={4}
          autoFocus
          value={text}
          onChange={e => handleChange(e.target.value)}
          placeholder="Type or paste your text here to generate hashes..."
        />
      </div>

      {/* Hash Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {hashes.error ? (
          <div style={{ color: 'var(--error-color)', fontSize: '0.875rem', padding: '0.75rem', background: 'var(--error-bg)', borderRadius: 'var(--radius-md)' }}>
            {hashes.error}
          </div>
        ) : ALGORITHMS.map(algo => (
          <div key={algo} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', background: 'var(--bg-color)',
            border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ minWidth: '80px', fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {algo}
            </div>
            <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.82rem', color: hashes[algo] ? 'var(--text-main)' : 'var(--text-light)', wordBreak: 'break-all' }}>
              {loading ? '...' : (hashes[algo] || <em style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>Enter text to generate</em>)}
            </div>
            {hashes[algo] && <CopyButton text={hashes[algo]} label="Copy" />}
          </div>
        ))}
      </div>

      <div className="tool-actions">
        <Button variant="danger" onClick={() => { setText(''); setHashes({}); }}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
