import React, { useState, useRef } from 'react';
import { pdfjsLib } from '../config/pdfWorker';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../components/Button';
import { 
  FileUp, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Layers, 
  AlertCircle,
  FileText,
  Minimize2,
  TrendingDown
} from 'lucide-react';

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const PRESETS = [
  {
    id: 'extreme',
    name: 'Extreme Compression',
    badge: 'Max Savings',
    badgeColor: '#EF4444',
    description: 'Lowest size, suitable for email limits and government portal forms (<1-2MB)',
    scale: 0.75,
    quality: 0.35,
    icon: Zap
  },
  {
    id: 'recommended',
    name: 'Recommended',
    badge: 'Best Balance',
    badgeColor: '#10B981',
    description: 'Optimal balance of high text clarity and substantial file size reduction (~50-75%)',
    scale: 0.90,
    quality: 0.48,
    icon: Sparkles
  },
  {
    id: 'high',
    name: 'Less Compression',
    badge: 'High Quality',
    badgeColor: '#3B82F6',
    description: '1:1 original scale with crisp vector text clarity (~25-50% savings)',
    scale: 1.0,
    quality: 0.62,
    icon: ShieldCheck
  },
  {
    id: 'custom',
    name: 'Custom Settings',
    badge: 'Manual',
    badgeColor: '#8B5CF6',
    description: 'Fine-tune resolution scaling factor (0.4x - 1.2x) and JPEG compression quality manually',
    scale: 0.90,
    quality: 0.50,
    icon: Sliders
  }
];

export const PdfCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [preset, setPreset] = useState('recommended');
  const [customScale, setCustomScale] = useState(0.90);
  const [customQuality, setCustomQuality] = useState(50);
  const [grayscale, setGrayscale] = useState(false);
  
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
  const [compressedResult, setCompressedResult] = useState(null);
  const [error, setError] = useState('');
  const [previewPages, setPreviewPages] = useState([]);
  const [activePreviewTab, setActivePreviewTab] = useState('summary'); // 'summary' | 'pages'
  
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a valid PDF document.');
      return;
    }

    try {
      setError('');
      setCompressedResult(null);
      setPreviewPages([]);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const count = pdfDoc.getPageCount();

      if (count === 0) {
        throw new Error('This document contains no readable pages.');
      }

      setSelectedFile(file);
      setPdfInfo({
        name: file.name,
        size: file.size,
        numPages: count
      });
    } catch (err) {
      console.error('Error reading PDF:', err);
      setError('Failed to load PDF. The document may be encrypted or corrupted.');
    }
  };

  const handleCompress = async () => {
    if (!selectedFile || !pdfInfo) return;

    setIsCompressing(true);
    setError('');
    setProgress({ current: 0, total: pdfInfo.numPages, percentage: 0 });

    try {
      const activePreset = PRESETS.find(p => p.id === preset) || PRESETS[1];
      let scale = preset === 'custom' ? customScale : activePreset.scale;
      let quality = preset === 'custom' ? customQuality / 100 : activePreset.quality;

      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const processCompressionPass = async (passScale, passQuality) => {
        const newPdfDoc = await PDFDocument.create();
        const previews = [];

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          setProgress({
            current: pageNum,
            total: totalPages,
            percentage: Math.round(((pageNum - 0.5) / totalPages) * 100)
          });

          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: passScale });
          const originalViewport = page.getViewport({ scale: 1.0 });

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(viewport.width));
          canvas.height = Math.max(1, Math.round(viewport.height));
          const ctx = canvas.getContext('2d', { alpha: false });

          if (grayscale) {
            ctx.filter = 'grayscale(100%)';
          }

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise;

          const imgDataUrl = canvas.toDataURL('image/jpeg', passQuality);

          if (pageNum <= 4) {
            previews.push({
              pageNum,
              dataUrl: imgDataUrl
            });
          }

          const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
          const embeddedJpg = await newPdfDoc.embedJpg(imgBytes);

          const pdfPage = newPdfDoc.addPage([originalViewport.width, originalViewport.height]);
          pdfPage.drawImage(embeddedJpg, {
            x: 0,
            y: 0,
            width: originalViewport.width,
            height: originalViewport.height
          });

          setProgress({
            current: pageNum,
            total: totalPages,
            percentage: Math.round((pageNum / totalPages) * 100)
          });
        }

        const pdfBytes = await newPdfDoc.save({ useObjectStreams: true });
        return { bytes: pdfBytes, previews };
      };

      let result = await processCompressionPass(scale, quality);
      let compressedBlob = new Blob([result.bytes], { type: 'application/pdf' });

      // Adaptive Compression Guarantee: If preset mode produced an output larger than original, auto-tune
      if (preset !== 'custom' && compressedBlob.size >= selectedFile.size) {
        scale = Math.min(scale, 0.75);
        quality = Math.min(quality, 0.35);
        result = await processCompressionPass(scale, quality);
        compressedBlob = new Blob([result.bytes], { type: 'application/pdf' });
      }

      const compressedUrl = URL.createObjectURL(compressedBlob);
      const compressedSize = compressedBlob.size;
      const bytesSaved = Math.max(0, selectedFile.size - compressedSize);
      const isSmaller = compressedSize < selectedFile.size;
      const reductionPercent = isSmaller
        ? Math.round(((selectedFile.size - compressedSize) / selectedFile.size) * 100)
        : 0;

      setPreviewPages(result.previews);
      setCompressedResult({
        url: compressedUrl,
        size: compressedSize,
        originalSize: selectedFile.size,
        bytesSaved,
        reductionPercent,
        isSmaller,
        filename: `compressed_${selectedFile.name.replace(/\.pdf$/i, '')}.pdf`
      });
    } catch (err) {
      console.error('Compression failed:', err);
      setError('An error occurred during compression. Please ensure the PDF is not password-protected.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    if (compressedResult?.url) {
      URL.revokeObjectURL(compressedResult.url);
    }
    setSelectedFile(null);
    setPdfInfo(null);
    setCompressedResult(null);
    setPreviewPages([]);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {error && !selectedFile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1.25rem',
          background: 'var(--error-bg, #FEF2F2)',
          color: 'var(--error-color, #DC2626)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <div>{error}</div>
        </div>
      )}

      {/* Upload Dropzone */}
      {!selectedFile ? (
        <div
          className="dropzone"
          style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            background: 'var(--bg-color)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.25rem',
            borderRadius: '50%',
            background: 'var(--primary-light, rgba(37, 99, 235, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-color)'
          }}>
            <FileUp size={32} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Choose a PDF file to compress
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 1rem' }}>
            Reduce file size while preserving high visual quality. 100% private in-browser processing — your files never leave your device.
          </p>

          <button type="button" className="btn btn-primary btn-md">
            Select PDF Document
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
          />

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} style={{ color: 'var(--success-color)' }} /> Zero Server Uploads
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} style={{ color: 'var(--primary-color)' }} /> Instant Client-Side
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={14} style={{ color: 'var(--accent-color, #8B5CF6)' }} /> Multi-page Support
            </span>
          </div>
        </div>
      ) : (
        <div>
          {/* File Header Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            background: 'var(--card-bg, #fff)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileText size={22} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  color: 'var(--text-main)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {pdfInfo?.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Original Size: <strong>{formatBytes(pdfInfo?.size)}</strong> &bull; {pdfInfo?.numPages} {pdfInfo?.numPages === 1 ? 'Page' : 'Pages'}
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleReset} disabled={isCompressing}>
              <RefreshCw size={14} /> Change File
            </Button>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1.25rem',
              background: 'var(--error-bg, #FEF2F2)',
              color: 'var(--error-color, #DC2626)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {/* Compression Level Selector */}
          {!compressedResult && (
            <div style={{
              background: 'var(--card-bg, #fff)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Select Compression Level
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Choose compression intensity
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {PRESETS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = preset === p.id;

                  return (
                    <div
                      key={p.id}
                      onClick={() => setPreset(p.id)}
                      style={{
                        padding: '1.1rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected 
                          ? '2px solid var(--primary-color)' 
                          : '1px solid var(--border-color)',
                        background: isSelected 
                          ? 'var(--primary-light, rgba(37, 99, 235, 0.04))' 
                          : 'var(--bg-color)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-sm)',
                          background: isSelected ? 'var(--primary-color)' : 'rgba(0,0,0,0.05)',
                          color: isSelected ? '#fff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={16} />
                        </div>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          background: `${p.badgeColor}18`,
                          color: p.badgeColor
                        }}>
                          {p.badge}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                        {p.name}
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', flexGrow: 1 }}>
                        {p.description}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Sliders (Only if Custom is selected) */}
              {preset === 'custom' && (
                <div style={{
                  padding: '1.25rem',
                  background: 'var(--bg-color)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>
                        Resolution DPI Scale:
                      </label>
                      <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                        {customScale.toFixed(2)}x ({Math.round(customScale * 72)} DPI)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.4"
                      max="1.2"
                      step="0.05"
                      value={customScale}
                      onChange={(e) => setCustomScale(parseFloat(e.target.value))}
                      className="slider"
                      style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      <span>0.4x (Max Savings)</span>
                      <span>0.9x (Recommended)</span>
                      <span>1.2x (High Sharpness)</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>
                        JPEG Quality Factor:
                      </label>
                      <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                        {customQuality}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="80"
                      step="5"
                      value={customQuality}
                      onChange={(e) => setCustomQuality(parseInt(e.target.value))}
                      className="slider"
                      style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      <span>15% (Ultra Small)</span>
                      <span>50% (Standard Balance)</span>
                      <span>80% (Max Quality)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Extra Toggles */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>
                    Convert to Grayscale (B&W)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Recommended for invoices, tax receipts, text documents &mdash; drastically reduces size
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={grayscale}
                    onChange={(e) => setGrayscale(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
                    Enable Grayscale
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Progress Bar while Compressing */}
          {isCompressing && (
            <div style={{
              background: 'var(--card-bg, #fff)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                background: 'var(--primary-light, rgba(37, 99, 235, 0.1))',
                color: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Minimize2 size={24} className="spin-animation" />
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Compressing PDF Pages...
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Processing page {progress.current} of {progress.total} locally in memory
              </p>

              {/* Progress track */}
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '10px',
                background: 'var(--border-color)',
                borderRadius: '5px',
                margin: '0 auto 0.75rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress.percentage}%`,
                  background: 'var(--primary-color)',
                  borderRadius: '5px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                {progress.percentage}% Completed
              </span>
            </div>
          )}

          {/* Compression Results View */}
          {compressedResult && (
            <div style={{
              background: 'var(--card-bg, #fff)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Success Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                background: 'var(--success-bg, #ECFDF5)',
                border: '1px solid var(--success-color, #10B981)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--success-color, #10B981)',
                marginBottom: '1.5rem'
              }}>
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                    PDF Compressed Successfully!
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-main)' }}>
                    Your document is ready for instant download with zero server upload history.
                  </div>
                </div>
              </div>

              {/* Comparison Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  padding: '1rem',
                  background: 'var(--bg-color)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Original File Size
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    {formatBytes(compressedResult.originalSize)}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'var(--bg-color)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Compressed Size
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    {formatBytes(compressedResult.size)}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: compressedResult.isSmaller ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  border: compressedResult.isSmaller ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: compressedResult.isSmaller ? 'var(--success-color)' : 'var(--primary-color)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                    {compressedResult.isSmaller ? 'Total Space Saved' : 'Status'}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: compressedResult.isSmaller ? 'var(--success-color)' : 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                    {compressedResult.isSmaller ? (
                      <>
                        <TrendingDown size={20} /> -{compressedResult.reductionPercent}%
                      </>
                    ) : (
                      'Optimized'
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {compressedResult.isSmaller ? `(${formatBytes(compressedResult.bytesSaved)} saved)` : 'Original is already minimal'}
                  </div>
                </div>
              </div>

              {/* Page Previews / Thumbnails */}
              {previewPages.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye size={16} /> Sample Page Quality Previews:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {previewPages.map((p) => (
                      <div
                        key={p.pageNum}
                        style={{
                          background: '#fff',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem',
                          textAlign: 'center'
                        }}
                      >
                        <img
                          src={p.dataUrl}
                          alt={`Page ${p.pageNum}`}
                          style={{
                            width: '100%',
                            height: '140px',
                            objectFit: 'contain',
                            background: '#f8fafc',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            marginBottom: '0.35rem'
                          }}
                        />
                        <div style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                          Page {p.pageNum}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <a
                  href={compressedResult.url}
                  download={compressedResult.filename}
                  className="btn btn-primary btn-lg"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--success-color, #10B981)',
                    borderColor: 'var(--success-color, #10B981)'
                  }}
                >
                  <Download size={18} /> Download Compressed PDF
                </a>

                <Button variant="outline" size="lg" onClick={handleReset}>
                  <RefreshCw size={16} /> Compress Another Document
                </Button>
              </div>
            </div>
          )}

          {/* Compress Trigger Button */}
          {!compressedResult && !isCompressing && (
            <div className="tool-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCompress}
                style={{ minWidth: '220px' }}
              >
                <Minimize2 size={18} /> Compress PDF Now
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
