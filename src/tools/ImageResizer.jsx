import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Download, RefreshCw, Scaling } from 'lucide-react';

export const ImageResizer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
      resizeCanvas(img, img.width, img.height, file.type);
    };
  };

  const handleWidthChange = (newWidth) => {
    const w = parseInt(newWidth) || 0;
    setWidth(w);
    if (maintainAspect && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(w * ratio));
    }
  };

  const handleHeightChange = (newHeight) => {
    const h = parseInt(newHeight) || 0;
    setHeight(h);
    if (maintainAspect && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(h * ratio));
    }
  };

  const resizeCanvas = (img, targetW, targetH, type) => {
    if (targetW <= 0 || targetH <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, targetW, targetH);
    const dataUrl = canvas.toDataURL(type || 'image/jpeg', 0.92);
    setResizedUrl(dataUrl);
  };

  const handleApplyResize = () => {
    if (!imageFile) return;
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      resizeCanvas(img, width, height, imageFile.type);
    };
  };

  const handleReset = () => {
    setImageFile(null);
    setResizedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {!imageFile ? (
        <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
          <Scaling className="dropzone-icon" />
          <h3 style={{ marginBottom: '0.5rem' }}>Upload photo to resize dimensions</h3>
          <p>Change pixel width and height with aspect ratio lock</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div>
          {/* Resize Dimension Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem' }}>Width (px)</label>
              <input
                type="number"
                className="input"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem' }}>Height (px)</label>
              <input
                type="number"
                className="input"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                /> Maintain Aspect Ratio
              </label>
            </div>
          </div>

          {/* Preview */}
          {resizedUrl && (
            <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
              <img
                src={resizedUrl}
                alt="Resized preview"
                style={{ maxWidth: '100%', maxHeight: '360px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
              />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                New Dimensions: <strong>{width}px &times; {height}px</strong> (Original: {originalDimensions.width}px &times; {originalDimensions.height}px)
              </div>
            </div>
          )}

          <div className="tool-actions">
            <Button variant="primary" onClick={handleApplyResize}>
              <Scaling size={16} /> Resize Image
            </Button>
            {resizedUrl && (
              <a
                href={resizedUrl}
                download={`resized_${width}x${height}_${imageFile.name}`}
                className="btn btn-secondary"
              >
                <Download size={16} /> Download Resized Image
              </a>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw size={16} /> Resize Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
