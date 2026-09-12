import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Download, RefreshCw, FileImage, Settings } from 'lucide-react';

export const SvgToPng = () => {
  const [svgFile, setSvgFile] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [scale, setScale] = useState(2);
  const [bgColor, setBgColor] = useState('transparent');
  const [error, setError] = useState('');
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const fileInputRef = useRef(null);

  const convertToPng = (svgText, scaleFactor, background) => {
    setError('');
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');

      if (!svgEl) {
        setError('Invalid SVG file. Could not find an <svg> element.');
        return;
      }

      // Get width/height from SVG attributes or viewBox
      let width = parseFloat(svgEl.getAttribute('width'));
      let height = parseFloat(svgEl.getAttribute('height'));

      if (!width || !height) {
        const vb = svgEl.getAttribute('viewBox');
        if (vb) {
          const parts = vb.split(/[\s,]+/);
          width = parseFloat(parts[2]);
          height = parseFloat(parts[3]);
        }
      }

      if (!width || !height) {
        width = 800;
        height = 600;
      }

      setOriginalSize({ w: Math.round(width), h: Math.round(height) });

      const canvas = document.createElement('canvas');
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext('2d');

      // Fill background if not transparent
      if (background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngData = canvas.toDataURL('image/png');
        setConvertedUrl(pngData);
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        setError('Failed to render SVG. The file may contain unsupported elements or external references.');
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      setError('Failed to process SVG: ' + err.message);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setError('Please upload a valid .svg file.');
      return;
    }

    setSvgFile(file);
    setConvertedUrl(null);
    setError('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setSvgContent(text);
      convertToPng(text, scale, bgColor);
    };
    reader.readAsText(file);
  };

  const handleSettingsChange = (newScale, newBg) => {
    if (svgContent) {
      convertToPng(svgContent, newScale, newBg);
    }
  };

  const handleReset = () => {
    setSvgFile(null);
    setSvgContent('');
    setConvertedUrl(null);
    setError('');
    setOriginalSize({ w: 0, h: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {!svgFile ? (
        <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
          <FileImage className="dropzone-icon" />
          <h3 style={{ marginBottom: '0.5rem' }}>Upload SVG File to Convert to PNG</h3>
          <p>100% private — your SVG is rendered locally in your browser</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".svg,image/svg+xml"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Settings Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            background: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)'
          }}>
            <Settings size={16} style={{ color: 'var(--text-muted)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                Scale
              </label>
              <select
                className="form-control"
                style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.875rem' }}
                value={scale}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setScale(v);
                  handleSettingsChange(v, bgColor);
                }}
              >
                <option value={1}>1x — Original ({originalSize.w}×{originalSize.h}px)</option>
                <option value={2}>2x — Retina ({originalSize.w * 2}×{originalSize.h * 2}px)</option>
                <option value={3}>3x — High-Res ({originalSize.w * 3}×{originalSize.h * 3}px)</option>
                <option value={4}>4x — Ultra ({originalSize.w * 4}×{originalSize.h * 4}px)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                Background
              </label>
              <select
                className="form-control"
                style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.875rem' }}
                value={bgColor}
                onChange={(e) => {
                  const v = e.target.value;
                  setBgColor(v);
                  handleSettingsChange(scale, v);
                }}
              >
                <option value="transparent">Transparent</option>
                <option value="#ffffff">White</option>
                <option value="#000000">Black</option>
              </select>
            </div>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              Output: {Math.round(originalSize.w * scale)}×{Math.round(originalSize.h * scale)}px PNG
            </span>
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--error-bg)', color: 'var(--error-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {/* Preview */}
          {convertedUrl && (
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: bgColor === 'transparent'
                ? 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 20px 20px'
                : bgColor === '#000000' ? '#1a1a1a' : '#f8f8f8',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src={convertedUrl}
                alt="Converted PNG preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '380px',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-sm)',
                }}
              />
            </div>
          )}

          {/* Actions */}
          <div className="tool-actions">
            {convertedUrl && (
              <a
                href={convertedUrl}
                download={`${svgFile.name.replace(/\.svg$/i, '')}_${scale}x.png`}
                className="btn btn-primary"
              >
                <Download size={16} /> Download PNG ({Math.round(originalSize.w * scale)}×{Math.round(originalSize.h * scale)}px)
              </a>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw size={16} /> Convert Another SVG
            </Button>
          </div>

        </div>
      )}
    </div>
  );
};
