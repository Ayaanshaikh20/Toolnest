import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '../components/Button';
import { 
  Image as ImageIcon, 
  Download, 
  Monitor, 
  Maximize2,
  Sparkles,
  Droplet,
  Layers,
  Sliders,
  Trash2,
  RefreshCw
} from 'lucide-react';

const BACKGROUNDS = [
  { id: 'mesh-1', name: 'Aurora', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'mesh-2', name: 'Cyberpunk', css: 'linear-gradient(135deg, #FF007A 0%, #7928CA 100%)' },
  { id: 'mesh-3', name: 'Ocean', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'mesh-4', name: 'Sunset', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
  { id: 'mesh-5', name: 'Emerald', css: 'linear-gradient(135deg, #10B981 0%, #047857 100%)' },
  { id: 'mesh-6', name: 'Midnight', css: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
  { id: 'solid-1', name: 'Pure White', css: '#FFFFFF' },
  { id: 'solid-2', name: 'Soft Gray', css: '#F3F4F6' },
  { id: 'solid-3', name: 'Dark Mode', css: '#111827' }
];

const FRAMES = [
  { id: 'mac-dark', name: 'macOS Dark', icon: Monitor },
  { id: 'mac-light', name: 'macOS Light', icon: Monitor },
  { id: 'windows-11', name: 'Windows 11', icon: Monitor },
  { id: 'minimal', name: 'Minimal', icon: Maximize2 },
  { id: 'none', name: 'No Frame', icon: ImageIcon }
];

export const MockupStudio = () => {
  const [image, setImage] = useState(null);
  const [bg, setBg] = useState(BACKGROUNDS[0]);
  const [frame, setFrame] = useState(FRAMES[0]);
  const [padding, setPadding] = useState(64);
  const [borderRadius, setBorderRadius] = useState(12);
  const [shadow, setShadow] = useState(30);
  const [isExporting, setIsExporting] = useState(false);
  
  const renderRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleExport = async () => {
    if (!renderRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(renderRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: null,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `toolnest-studio-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="ms-container container">
      <style dangerouslySetInnerHTML={{ __html: `
        .ms-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
          margin-top: 2rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 900px) {
          .ms-layout { grid-template-columns: 1fr; }
        }
        .ms-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .ms-panel {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .ms-panel h3 {
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ms-upload-area {
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
        .ms-upload-area:hover {
          border-color: var(--primary-color);
          background-color: var(--primary-light);
        }
        .ms-upload-area input { display: none; }
        
        .ms-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .ms-grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
        
        .ms-btn-frame {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .ms-btn-frame:hover {
          background: var(--bg-color);
          border-color: var(--border-hover);
        }
        .ms-btn-frame.active {
          background: var(--primary-light);
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        
        .ms-btn-bg {
          width: 100%;
          aspect-ratio: 1;
          border-radius: var(--radius-sm);
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .ms-btn-bg:hover { transform: scale(1.1); }
        .ms-btn-bg.active {
          border-color: var(--text-main);
          transform: scale(1.15);
          box-shadow: var(--shadow-md);
        }
        
        .ms-slider-group {
          margin-bottom: 1.25rem;
        }
        .ms-slider-group:last-child { margin-bottom: 0; }
        .ms-slider-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .ms-slider {
          width: 100%;
          cursor: pointer;
        }
        
        .ms-preview-container {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
          min-height: 500px;
        }
        .ms-preview-header {
          padding: 0.75rem 1rem;
          background-color: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .ms-canvas-area {
          flex: 1;
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
        body.dark-mode .ms-canvas-area {
          background-image: 
            linear-gradient(45deg, #1e1e1e 25%, transparent 25%), 
            linear-gradient(-45deg, #1e1e1e 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #1e1e1e 75%), 
            linear-gradient(-45deg, transparent 75%, #1e1e1e 75%);
        }
        
        .ms-render-node {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 900px;
          overflow: hidden;
          transition: padding 0.3s ease, background 0.3s ease;
        }
        
        .ms-image-wrapper {
          position: relative;
          width: 100%;
          height: auto;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .ms-frame-header {
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
        }
        .ms-frame-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .ms-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        
        .ms-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }
      `}} />

      <div className="panel" style={{ marginTop: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '2rem' }}>
          <Sparkles color="var(--primary-color)" size={32} />
          ToolNest Studio
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Turn boring screenshots into gorgeous, viral-ready 3D mockups for social media. Everything renders securely in your browser.
        </p>
      </div>

      <div className="ms-layout">
        {/* Sidebar Controls */}
        <div className="ms-sidebar">
          
          {/* Image Source Panel */}
          <div className="ms-panel">
            <h3><ImageIcon size={18} color="var(--primary-color)" /> Image Source</h3>
            {!image ? (
              <label className="ms-upload-area">
                <ImageIcon size={32} color="var(--text-light)" />
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Click to upload screenshot</span>
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
              </label>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Screenshot loaded</span>
                <button 
                  onClick={() => setImage(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                  title="Remove Image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Adjustments Panel */}
          <div className="ms-panel">
            <h3><Monitor size={18} color="var(--primary-color)" /> Frame Style</h3>
            <div className="ms-grid-2" style={{ marginBottom: '1.5rem' }}>
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrame(f)}
                  className={`ms-btn-frame ${frame.id === f.id ? 'active' : ''}`}
                >
                  <f.icon size={16} />
                  {f.name}
                </button>
              ))}
            </div>

            <h3><Droplet size={18} color="var(--primary-color)" /> Background</h3>
            <div className="ms-grid-5" style={{ marginBottom: '1.5rem' }}>
              {BACKGROUNDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBg(b)}
                  className={`ms-btn-bg ${bg.id === b.id ? 'active' : ''}`}
                  style={{ background: b.css }}
                  title={b.name}
                />
              ))}
            </div>

            <h3><Sliders size={18} color="var(--primary-color)" /> Adjustments</h3>
            <div className="ms-slider-group">
              <div className="ms-slider-label"><span>Padding</span><span>{padding}px</span></div>
              <input type="range" min="0" max="120" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="ms-slider" />
            </div>
            <div className="ms-slider-group">
              <div className="ms-slider-label"><span>Rounding</span><span>{borderRadius}px</span></div>
              <input type="range" min="0" max="40" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="ms-slider" />
            </div>
            <div className="ms-slider-group">
              <div className="ms-slider-label"><span>Shadow</span><span>{shadow}%</span></div>
              <input type="range" min="0" max="100" value={shadow} onChange={(e) => setShadow(Number(e.target.value))} className="ms-slider" />
            </div>
          </div>

          <Button
            onClick={handleExport}
            disabled={!image || isExporting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
            icon={isExporting ? RefreshCw : Download}
          >
            {isExporting ? 'Rendering Image...' : 'Export High-Res PNG'}
          </Button>

        </div>

        {/* Preview Area */}
        <div className="ms-preview-container">
          <div className="ms-preview-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layers size={16} /> Canvas Preview</span>
            <span>Scale: 3x</span>
          </div>
          <div className="ms-canvas-area">
            
            <div 
              id="mockup-render-node"
              ref={renderRef}
              className="ms-render-node"
              style={{
                background: bg.css,
                padding: `${padding}px`,
              }}
            >
              {image ? (
                <div 
                  className="ms-image-wrapper"
                  style={{
                    borderRadius: `${borderRadius}px`,
                    boxShadow: `0px ${shadow}px ${shadow * 2.5}px -${shadow / 2}px rgba(0,0,0,${Math.min(0.6, shadow/100 + 0.1)})`,
                  }}
                >
                  {/* Frame Decorators */}
                  {frame.id === 'mac-dark' && (
                    <div className="ms-frame-header" style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="ms-frame-dot" style={{ background: '#FF5F56' }}></div>
                      <div className="ms-frame-dot" style={{ background: '#FFBD2E' }}></div>
                      <div className="ms-frame-dot" style={{ background: '#27C93F' }}></div>
                    </div>
                  )}
                  {frame.id === 'mac-light' && (
                    <div className="ms-frame-header" style={{ background: '#EFEFEF', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                      <div className="ms-frame-dot" style={{ background: '#FF5F56' }}></div>
                      <div className="ms-frame-dot" style={{ background: '#FFBD2E' }}></div>
                      <div className="ms-frame-dot" style={{ background: '#27C93F' }}></div>
                    </div>
                  )}
                  {frame.id === 'windows-11' && (
                    <div className="ms-frame-header" style={{ background: '#202020', borderBottom: '1px solid rgba(255,255,255,0.1)', justifyContent: 'flex-end', padding: '0', height: '32px' }}>
                      <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ width: '46px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '10px', height: '1px', background: 'rgba(255,255,255,0.7)' }}></div>
                        </div>
                        <div style={{ width: '46px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '10px', height: '10px', border: '1px solid rgba(255,255,255,0.7)' }}></div>
                        </div>
                        <div style={{ width: '46px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ position: 'relative', width: '10px', height: '10px' }}>
                            <div style={{ position: 'absolute', width: '12px', height: '1px', background: 'rgba(255,255,255,0.7)', transform: 'rotate(45deg)', top: '4px', left: '-1px' }}></div>
                            <div style={{ position: 'absolute', width: '12px', height: '1px', background: 'rgba(255,255,255,0.7)', transform: 'rotate(-45deg)', top: '4px', left: '-1px' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <img src={image} alt="Screenshot" className="ms-img" crossOrigin="anonymous" />
                </div>
              ) : (
                <div className="ms-placeholder" style={{ borderRadius: `${borderRadius}px` }}>
                  Your Screenshot Here
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
