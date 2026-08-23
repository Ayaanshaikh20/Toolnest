import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Download, RefreshCw, FileImage } from 'lucide-react';

export const JpgToPng = () => {
  const [imageFile, setImageFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const pngData = canvas.toDataURL('image/png');
      setConvertedUrl(pngData);
    };
  };

  const handleReset = () => {
    setImageFile(null);
    setConvertedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {!imageFile ? (
        <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
          <FileImage className="dropzone-icon" />
          <h3 style={{ marginBottom: '0.5rem' }}>Upload JPG / JPEG to Convert to PNG</h3>
          <p>Instant lossless PNG conversion directly in your browser</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/jpeg, image/jpg"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <img
            src={convertedUrl}
            alt="Converted PNG"
            style={{ maxWidth: '100%', maxHeight: '360px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}
          />

          <div className="tool-actions" style={{ justifyContent: 'center' }}>
            <a
              href={convertedUrl}
              download={`${imageFile.name.replace(/\.[^/.]+$/, "")}.png`}
              className="btn btn-primary"
            >
              <Download size={16} /> Download PNG Image
            </a>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw size={16} /> Convert Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
