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
        scale: 3, // High-res export
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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-[#1E293B] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              ToolNest Studio
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Turn boring screenshots into gorgeous, viral-ready 3D mockups for social media. Everything renders securely in your browser.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" /> Image Source
              </h3>
              {!image ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:bg-slate-800/50 hover:border-emerald-500/50 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2 group-hover:text-emerald-400 transition-colors" />
                    <p className="text-sm text-slate-400 font-medium">Click to upload screenshot</p>
                  </div>
                  <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-slate-800 rounded-lg p-3 border border-slate-700">
                  <span className="text-slate-300 text-sm font-medium truncate">Screenshot loaded</span>
                  <button 
                    onClick={() => setImage(null)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 space-y-6">
              {/* Frame Selection */}
              <div>
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-emerald-400" /> Frame Style
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFrame(f)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        frame.id === f.id 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <f.icon className="w-4 h-4" />
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Selection */}
              <div>
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-emerald-400" /> Background
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {BACKGROUNDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBg(b)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        bg.id === b.id ? 'border-emerald-400 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ background: b.css }}
                      title={b.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" /> Adjustments
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Padding</span>
                      <span>{padding}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="120" value={padding} 
                      onChange={(e) => setPadding(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Rounding</span>
                      <span>{borderRadius}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="40" value={borderRadius} 
                      onChange={(e) => setBorderRadius(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Shadow</span>
                      <span>{shadow}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={shadow} 
                      onChange={(e) => setShadow(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleExport}
              disabled={!image || isExporting}
              className="w-full h-12 text-lg font-medium shadow-xl shadow-emerald-900/20"
              icon={isExporting ? RefreshCw : Download}
            >
              {isExporting ? 'Rendering Image...' : 'Export High-Res PNG'}
            </Button>
          </div>

          {/* Canvas Preview Area */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden flex flex-col h-full min-h-[600px]">
              <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Canvas Preview</span>
                <span>1200 x 630 (Scale: 3x)</span>
              </div>
              
              <div className="flex-1 overflow-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMWUxZTFlIj48L3JlY3Q+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxZTFlMWUiPjwvcmVjdD4KPHJlY3QgeD0iNCIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzIyMjIyMiI+PC9yZWN0Pgo8cmVjdCB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMjIyMjIyIj48L3JlY3Q+Cjwvc3ZnPg==')] flex items-center justify-center p-8">
                
                {/* 
                  RENDER NODE 
                  This is the exact DOM node that html2canvas will snapshot.
                */}
                <div 
                  id="mockup-render-node"
                  ref={renderRef}
                  className="transition-all duration-300 relative flex items-center justify-center w-full max-w-4xl overflow-hidden"
                  style={{
                    background: bg.css,
                    padding: `${padding}px`,
                  }}
                >
                  {image ? (
                    <div 
                      className="relative w-full h-auto"
                      style={{
                        borderRadius: `${borderRadius}px`,
                        boxShadow: `0px ${shadow}px ${shadow * 2.5}px -${shadow / 2}px rgba(0,0,0,${Math.min(0.8, shadow/100 + 0.2)})`,
                        overflow: 'hidden'
                      }}
                    >
                      {/* Frame Decorators */}
                      {frame.id === 'mac-dark' && (
                        <div className="bg-[#1E1E1E] h-10 w-full flex items-center px-4 gap-2 border-b border-white/10">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                      )}
                      {frame.id === 'mac-light' && (
                        <div className="bg-[#EFEFEF] h-10 w-full flex items-center px-4 gap-2 border-b border-black/10">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                      )}
                      {frame.id === 'windows-11' && (
                        <div className="bg-[#202020] h-10 w-full flex items-center justify-between px-4 border-b border-white/10">
                          <div className="text-[10px] text-white/50 font-sans">App View</div>
                          <div className="flex items-center gap-4">
                            <div className="w-2.5 h-[1px] bg-white/70"></div>
                            <div className="w-2.5 h-2.5 border border-white/70"></div>
                            <div className="w-2.5 h-2.5 relative">
                               <div className="absolute w-[12px] h-[1px] bg-white/70 rotate-45 top-1 -left-[1px]"></div>
                               <div className="absolute w-[12px] h-[1px] bg-white/70 -rotate-45 top-1 -left-[1px]"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* The Image */}
                      <img 
                        src={image} 
                        alt="Screenshot" 
                        className="w-full h-auto block object-cover" 
                        crossOrigin="anonymous"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-slate-900/40 rounded-xl flex items-center justify-center border border-white/10">
                      <p className="text-white/40 font-medium">Your Screenshot Here</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
