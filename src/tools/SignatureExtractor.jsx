import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { 
  PenTool,
  UploadCloud,
  Download,
  Sliders,
  Droplet,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const SignatureExtractor = () => {
  const [image, setImage] = useState(null);
  const [threshold, setThreshold] = useState(200);
  const [inkColor, setInkColor] = useState('original'); // 'original', 'black', 'blue'
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const canvasRef = useRef(null);
  const hiddenImageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setResultUrl(null);
  };

  const processSignature = () => {
    if (!image || !hiddenImageRef.current || !canvasRef.current) return;
    setIsProcessing(true);

    const img = hiddenImageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Ensure image is loaded before processing
    if (img.width === 0 || img.height === 0) {
      img.onload = executeProcessing;
    } else {
      executeProcessing();
    }

    function executeProcessing() {
      // Set canvas size to original image dimensions for high-res export
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate perceived luminance (standard formula)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        if (luminance > threshold) {
          // It's paper (background) -> Make it transparent
          data[i + 3] = 0; 
        } else {
          // It's ink (signature) -> keep it, but adjust color if requested
          // We apply anti-aliasing by mapping luminance to opacity for edge pixels
          // The closer to the threshold, the more transparent it becomes.
          const opacity = Math.min(255, Math.max(0, 255 - ((luminance / threshold) * 255)));
          data[i + 3] = opacity; 

          if (inkColor === 'black') {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
          } else if (inkColor === 'blue') {
            data[i] = 37;
            data[i + 1] = 99;
            data[i + 2] = 235; // A nice signature blue
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setResultUrl(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    }
  };

  // Re-process when settings change
  useEffect(() => {
    if (image) {
      // Debounce slightly to prevent lag while sliding
      const timer = setTimeout(() => {
        processSignature();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [threshold, inkColor, image]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.download = `extracted-signature-${Date.now()}.png`;
    link.href = resultUrl;
    link.click();
  };

  return (
    <div className="se-container container">
      <style dangerouslySetInnerHTML={{ __html: `
        .se-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
          margin-top: 2rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 900px) {
          .se-layout { grid-template-columns: 1fr; }
        }
        .se-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .se-panel {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .se-panel h3 {
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .se-upload-area {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .se-upload-area:hover {
          border-color: var(--primary-color);
          background-color: var(--primary-light);
        }
        .se-upload-area input { display: none; }
        
        .se-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
        
        .se-btn-color {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .se-btn-color:hover {
          background: var(--bg-color);
          border-color: var(--border-hover);
        }
        .se-btn-color.active {
          background: var(--primary-light);
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        .se-color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1);
        }
        
        .se-slider-group {
          margin-bottom: 1.25rem;
        }
        .se-slider-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .se-slider {
          width: 100%;
          cursor: pointer;
        }
        
        .se-preview-container {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
          min-height: 500px;
        }
        .se-preview-header {
          padding: 0.75rem 1rem;
          background-color: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .se-canvas-area {
          flex: 1;
          /* Checkerboard background to show transparency clearly */
          background-image: 
            linear-gradient(45deg, #e5e5e5 25%, transparent 25%), 
            linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #e5e5e5 75%), 
            linear-gradient(-45deg, transparent 75%, #e5e5e5 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: auto;
        }
        body.dark-mode .se-canvas-area {
          background-image: 
            linear-gradient(45deg, #1e1e1e 25%, transparent 25%), 
            linear-gradient(-45deg, #1e1e1e 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #1e1e1e 75%), 
            linear-gradient(-45deg, transparent 75%, #1e1e1e 75%);
        }
        
        .se-img-preview {
          max-width: 100%;
          max-height: 600px;
          object-fit: contain;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .se-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}} />

      <div className="panel" style={{ marginTop: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '2rem' }}>
          <PenTool color="var(--primary-color)" size={32} />
          Signature Extractor
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Upload a photo of your signature written on paper. This tool instantly strips away the background, leaving a clean, transparent PNG perfect for signing digital PDFs.
        </p>
      </div>

      <div className="se-layout">
        {/* Sidebar Controls */}
        <div className="se-sidebar">
          
          {/* Image Source Panel */}
          <div className="se-panel">
            <h3><ImageIcon size={18} color="var(--primary-color)" /> Photo Source</h3>
            {!image ? (
              <label className="se-upload-area">
                <UploadCloud size={32} color="var(--text-light)" />
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Upload Signature Photo</span>
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
              </label>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Photo loaded</span>
                <button 
                  onClick={() => setImage(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                  title="Remove Photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Adjustments Panel */}
          <div className="se-panel" style={{ opacity: image ? 1 : 0.5, pointerEvents: image ? 'auto' : 'none' }}>
            <h3><Sliders size={18} color="var(--primary-color)" /> Threshold Adjustment</h3>
            <div className="se-slider-group">
              <div className="se-slider-label">
                <span>Paper Luminance</span>
                <span>{threshold}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="255" 
                value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))} 
                className="se-slider" 
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                Adjust this slider to properly separate the ink from the paper background based on lighting.
              </p>
            </div>

            <h3 style={{ marginTop: '2rem' }}><Droplet size={18} color="var(--primary-color)" /> Ink Color</h3>
            <div className="se-grid-3">
              <button
                onClick={() => setInkColor('original')}
                className={`se-btn-color ${inkColor === 'original' ? 'active' : ''}`}
              >
                <div className="se-color-swatch" style={{ background: 'linear-gradient(45deg, #111, #888)' }}></div>
                Original
              </button>
              <button
                onClick={() => setInkColor('black')}
                className={`se-btn-color ${inkColor === 'black' ? 'active' : ''}`}
              >
                <div className="se-color-swatch" style={{ background: '#000000' }}></div>
                Black
              </button>
              <button
                onClick={() => setInkColor('blue')}
                className={`se-btn-color ${inkColor === 'blue' ? 'active' : ''}`}
              >
                <div className="se-color-swatch" style={{ background: '#2563EB' }}></div>
                Blue
              </button>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!resultUrl || isProcessing}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
            icon={isProcessing ? RefreshCw : Download}
          >
            {isProcessing ? 'Processing...' : 'Download Transparent PNG'}
          </Button>

        </div>

        {/* Preview Area */}
        <div className="se-preview-container">
          <div className="se-preview-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Eye size={16} /> Extraction Preview</span>
            {image && <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> Background Removed</span>}
          </div>
          <div className="se-canvas-area">
            
            {image ? (
              <>
                {/* Hidden image used for canvas pixel reading */}
                <img 
                  ref={hiddenImageRef} 
                  src={image} 
                  alt="original" 
                  style={{ display: 'none' }} 
                  crossOrigin="anonymous"
                />
                
                {/* Hidden canvas used for processing */}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                {/* Visible Result */}
                {resultUrl ? (
                  <img src={resultUrl} alt="Extracted Signature" className="se-img-preview" />
                ) : (
                  <div style={{ color: 'var(--text-muted)' }}><RefreshCw className="spin-animation" size={24} /> Processing...</div>
                )}
              </>
            ) : (
              <div className="se-placeholder">
                Upload a signature photo to see extraction
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
