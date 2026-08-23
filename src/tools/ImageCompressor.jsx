import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ImageCompressor = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [quality, setQuality] = useState(80);
  const [compressedResult, setCompressedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    compressImage(file, quality);
  };

  const compressImage = (file, qualityVal) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const mimeType = file.type === 'image/png' ? 'image/webp' : file.type; // Compress PNG to WebP or JPEG for real savings
        const dataUrl = canvas.toDataURL(mimeType, qualityVal / 100);

        // Calculate byte size from data URL
        const head = `data:${mimeType};base64,`;
        const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);

        setCompressedResult({
          dataUrl,
          size: sizeInBytes,
          reduction: Math.max(0, Math.round(((file.size - sizeInBytes) / file.size) * 100)),
          filename: `compressed_${file.name.replace(/\.[^/.]+$/, "")}.${mimeType.split('/')[1] || 'jpg'}`
        });
        setIsProcessing(false);
      };
    };
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (imageFile) {
      compressImage(imageFile, newQuality);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setCompressedResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {!imageFile ? (
        <div
          className="dropzone"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="dropzone-icon" />
          <h3 style={{ marginBottom: '0.5rem' }}>Drop your image here or click to browse</h3>
          <p>Supports JPG, JPEG, PNG, WebP up to 50MB</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/webp"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div>
          {/* Quality Slider */}
          <div className="slider-group" style={{ marginBottom: '1.75rem' }}>
            <div className="slider-header">
              <label>Compression Quality Level:</label>
              <span style={{ color: 'var(--primary-color)' }}>{quality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => handleQualityChange(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          {/* Comparison Cards */}
          <div className="image-preview-container">
            <div className="image-preview-card">
              <h4 style={{ marginBottom: '0.5rem' }}>Original Image</h4>
              <img src={previewUrl} alt="Original" />
              <div className="image-meta">
                <strong>Size:</strong> {formatSize(imageFile.size)}
              </div>
            </div>

            <div className="image-preview-card">
              <h4 style={{ marginBottom: '0.5rem' }}>Compressed Output</h4>
              {compressedResult ? (
                <>
                  <img src={compressedResult.dataUrl} alt="Compressed" />
                  <div className="image-meta">
                    <div><strong>Size:</strong> {formatSize(compressedResult.size)}</div>
                    <div style={{ color: 'var(--success-color)', fontWeight: '700', marginTop: '0.25rem' }}>
                      Saved {compressedResult.reduction}% space!
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem' }}>Compressing...</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="tool-actions" style={{ marginTop: '1.75rem' }}>
            {compressedResult && (
              <a
                href={compressedResult.dataUrl}
                download={compressedResult.filename}
                className="btn btn-primary"
              >
                <Download size={16} /> Download Compressed Image
              </a>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw size={16} /> Compress Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
