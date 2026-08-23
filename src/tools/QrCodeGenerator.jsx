import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '../components/Button';
import { Download, RefreshCw, QrCode } from 'lucide-react';

const QR_SIZES = [128, 256, 512, 1024];
const ERROR_LEVELS = [
  { value: 'L', label: 'L – Low (7%)' },
  { value: 'M', label: 'M – Medium (15%)' },
  { value: 'Q', label: 'Q – Quartile (25%)' },
  { value: 'H', label: 'H – High (30%)' },
];

export const QrCodeGenerator = () => {
  const [text, setText] = useState('https://toolnest.shaikhayaan.com');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState('M');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState('');

  const generate = async () => {
    if (!text.trim()) { setError('Please enter text or URL.'); setDataUrl(''); return; }
    try {
      const url = await QRCode.toDataURL(text.trim(), {
        width: size,
        errorCorrectionLevel: errorLevel,
        color: { dark: fgColor, light: bgColor },
        margin: 2,
      });
      setDataUrl(url);
      setError('');
    } catch (e) {
      setError('Failed to generate QR code. Input too long?');
    }
  };

  useEffect(() => { generate(); }, [text, size, errorLevel, fgColor, bgColor]);

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
              Text or URL
            </label>
            <textarea
              className="textarea"
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter URL, text, email, phone number..."
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Size (px)</label>
              <select className="input" value={size} onChange={e => setSize(Number(e.target.value))}>
                {QR_SIZES.map(s => <option key={s} value={s}>{s} × {s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Error Correction</label>
              <select className="input" value={errorLevel} onChange={e => setErrorLevel(e.target.value)}>
                {ERROR_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>QR Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)}
                  style={{ width: '44px', height: '44px', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'none', padding: '2px' }} />
                <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{fgColor}</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.875rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>Background</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  style={{ width: '44px', height: '44px', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'none', padding: '2px' }} />
                <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem',
          background: 'var(--bg-color)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          {error ? (
            <div style={{ color: 'var(--error-color)', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>
          ) : dataUrl ? (
            <>
              <img src={dataUrl} alt="Generated QR Code" style={{ maxWidth: '100%', maxHeight: '260px', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{size} × {size} px · Error Level {errorLevel}</div>
            </>
          ) : (
            <div style={{ color: 'var(--text-light)', textAlign: 'center' }}>
              <QrCode size={64} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
              <div>QR code preview will appear here</div>
            </div>
          )}
        </div>
      </div>

      <div className="tool-actions" style={{ marginTop: '1.25rem' }}>
        <Button variant="primary" onClick={download} disabled={!dataUrl}>
          <Download size={16} /> Download PNG
        </Button>
        <Button variant="secondary" onClick={generate}>
          <RefreshCw size={16} /> Regenerate
        </Button>
      </div>
    </div>
  );
};
