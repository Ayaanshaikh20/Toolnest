import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Upload, Download, RefreshCw, FileImage } from 'lucide-react';

export const PngToJpg = () => {
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

      // Fill white background for transparent PNG pixels
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);
      const jpgData = canvas.toDataURL('image/jpeg', 0.92);
      setConvertedUrl(jpgData);
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
          <h3 style={{ marginBottom: '0.5rem' }}>Upload PNG to Convert to JPG</h3>
          <p>Convert transparent or large PNG files into lightweight JPGs</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <img
            src={convertedUrl}
            alt="Converted JPG"
            style={{ maxWidth: '100%', maxHeight: '360px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}
          />

          <div className="tool-actions" style={{ justifyContent: 'center' }}>
            <a
              href={convertedUrl}
              download={`${imageFile.name.replace(/\.[^/.]+$/, "")}.jpg`}
              className="btn btn-primary"
            >
              <Download size={16} /> Download JPG Image
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
