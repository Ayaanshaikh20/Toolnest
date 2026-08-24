import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, X, Sparkles, ImageOff, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { showToast } from '../components/Toast';

export const BackgroundRemover = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [dragging, setDragging] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'original' | 'result'
  const [sliderPos, setSliderPos] = useState(50);
  const fileInputRef = useRef(null);
  const sliderRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast('Image must be under 15 MB.', 'error');
      return;
    }
    setOriginalFile(file);
    setResultUrl(null);
    setOriginalUrl(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleRemoveBackground = async () => {
    if (!originalFile) return;
    setLoading(true);
    setResultUrl(null);
    try {
      setProgress('Loading AI model (first run may take ~10s)...');
      // Dynamic import to code-split the heavy WASM library
      const { removeBackground } = await import('@imgly/background-removal');

      setProgress('Analysing image...');
      const blob = await removeBackground(originalFile, {
        progress: (key, current, total) => {
          if (key.startsWith('fetch')) {
            const pct = total > 0 ? Math.round((current / total) * 100) : 0;
            setProgress(`Downloading AI model... ${pct}%`);
          } else {
            setProgress('Removing background...');
          }
        },
        output: {
          format: 'image/png',
          quality: 1,
        },
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setProgress('');
      setViewMode('split');
      showToast('Background removed successfully!', 'success');
    } catch (err) {
      console.error(err);
      setProgress('');
      showToast('Failed to remove background. Please try another image.', 'error');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    const name = originalFile?.name?.replace(/\.[^.]+$/, '') || 'image';
    a.download = `${name}-no-bg.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Image downloaded!', 'success');
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setProgress('');
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Slider drag for split view
  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    const container = sliderRef.current;
    if (!container) return;

    const move = (ev) => {
      const rect = container.getBoundingClientRect();
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      setSliderPos(pos);
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
  };

  return (
    <div>
      {/* Upload Zone */}
      {!originalUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? 'var(--primary-color)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging ? 'var(--primary-light)' : 'var(--bg-color)',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: '64px', height: '64px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}>
            <Upload size={28} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>
            Drop your image here
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Supports JPG, PNG, WebP · Max 15 MB · 100% processed in your browser
          </p>
          <Button variant="primary">
            <Upload size={16} /> Choose Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div>
          {/* View Mode Toggle */}
          {resultUrl && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['split', 'original', 'result'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`btn btn-sm ${viewMode === mode ? 'btn-primary' : 'btn-outline'}`}
                >
                  {mode === 'split' ? '↔ Compare' : mode === 'original' ? 'Original' : '✨ Result'}
                </button>
              ))}
            </div>
          )}

          {/* Image Preview Area — anchor height with original image; overlay result on top */}
          <div
            ref={sliderRef}
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1.5px solid var(--border-color)',
              background: 'repeating-conic-gradient(#808080 0% 25%, #b0b0b0 0% 50%) 0 0 / 16px 16px',
              cursor: resultUrl && viewMode === 'split' ? 'col-resize' : 'default',
              userSelect: 'none',
              lineHeight: 0, // prevent inline gap
            }}
          >
            {/* ── Original image always rendered — it anchors the container height ── */}
            <img
              src={originalUrl}
              alt="Original"
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '480px',
                objectFit: 'contain',
                // In Result mode: hide it completely; in Compare: clip it to left side; in Original: show fully
                opacity: viewMode === 'result' ? 0 : 1,
                clipPath: resultUrl && viewMode === 'split'
                  ? `inset(0 ${100 - sliderPos}% 0 0)`
                  : 'none',
                position: 'relative',
                zIndex: 2,
              }}
              draggable={false}
            />

            {/* ── Result image overlays on top, absolutely positioned ── */}
            {resultUrl && viewMode !== 'original' && (
              <img
                src={resultUrl}
                alt="Background removed"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  zIndex: viewMode === 'result' ? 3 : 1, // Result mode: on top; Split mode: behind original clip
                  display: 'block',
                }}
                draggable={false}
              />
            )}


            {resultUrl && viewMode === 'split' && (
              <>
                {/* Divider Line */}
                <div
                  onMouseDown={handleSliderMouseDown}
                  onTouchStart={handleSliderMouseDown}
                  style={{
                    position: 'absolute',
                    top: 0, bottom: 0,
                    left: `${sliderPos}%`,
                    width: '3px',
                    background: 'var(--primary-color)',
                    cursor: 'col-resize',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    fontSize: '1rem',
                  }}>⇔</div>
                </div>

                {/* Labels */}
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', zIndex: 5 }}>Original</span>
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--primary-color)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', zIndex: 5 }}>✨ No BG</span>
              </>
            )}


            {/* Loading Overlay */}
            {loading && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '1rem', borderRadius: 'var(--radius-lg)',
              }}>
                <Loader2 size={40} style={{ color: '#fff', animation: 'spin 1s linear infinite' }} />
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', padding: '0 1rem' }}>
                  {progress || 'Processing...'}
                </div>
              </div>
            )}

            {/* Placeholder if no result yet */}
            {!resultUrl && !loading && (
              <img
                src={originalUrl}
                alt="Original"
                style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block' }}
                draggable={false}
              />
            )}
          </div>

          {/* File Info */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', marginTop: '0.75rem',
            background: 'var(--bg-color)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)', fontSize: '0.85rem',
          }}>
            <span style={{ flex: 1, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {originalFile?.name} ({(originalFile?.size / 1024 / 1024).toFixed(2)} MB)
            </span>
            <button
              onClick={handleReset}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', padding: '2px' }}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="tool-actions" style={{ marginTop: '1rem' }}>
            {!resultUrl ? (
              <Button
                variant="primary"
                onClick={handleRemoveBackground}
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                ) : (
                  <><Sparkles size={17} /> Remove Background</>
                )}
              </Button>
            ) : (
              <>
                <Button variant="primary" onClick={handleDownload}>
                  <Download size={16} /> Download PNG
                </Button>
                <Button variant="outline" onClick={handleRemoveBackground} disabled={loading}>
                  <Sparkles size={16} /> Remove Again
                </Button>
                <Button variant="danger" onClick={handleReset}>
                  <X size={16} /> New Image
                </Button>
              </>
            )}
          </div>

          {/* Privacy note */}
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.75rem', textAlign: 'center' }}>
            🔒 Your image is processed entirely on your device using AI. Nothing is uploaded to any server.
          </p>
        </div>
      )}

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
