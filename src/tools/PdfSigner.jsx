import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { pdfjsLib } from '../config/pdfWorker';
import { Button } from '../components/Button';
import { 
  FileUp, 
  Download, 
  PenTool, 
  Type, 
  Upload, 
  Eraser, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Trash2, 
  Move, 
  Calendar,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Plus,
  Minus
} from 'lucide-react';

export const PdfSigner = () => {
  const [file, setFile] = useState(null);
  const [pdfDocProxy, setPdfDocProxy] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRendering, setPageRendering] = useState(false);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('');

  // Signature creation mode: 'draw' | 'type' | 'upload'
  const [sigMode, setSigMode] = useState('draw');
  const [sigColor, setSigColor] = useState('#0f172a'); // default black/navy
  const [typedName, setTypedName] = useState('');
  const [typedFont, setTypedFont] = useState('cursive');
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  // Placed items state: uses NORMALIZED coordinates (0.0 to 1.0) so it's 100% resolution & screen-independent!
  // { id, page, relX, relY, relW, relH, dataUrl, type: 'sig' | 'date' }
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialRelX: 0, initialRelY: 0, containerWidth: 0, containerHeight: 0 });

  // Canvas refs
  const pdfCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // 1. File Upload Handler
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF document.');
      return;
    }

    try {
      setError('');
      setDownloadUrl(null);
      setPlacedItems([]);
      setFile(selectedFile);
      setDownloadFilename(selectedFile.name.replace(/\.pdf$/i, '') + '-signed.pdf');

      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const doc = await loadingTask.promise;
      setPdfDocProxy(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Could not read this PDF. Please ensure it is not password protected.');
    }
  };

  // 2. Render Current PDF Page
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfDocProxy || !pdfCanvasRef.current) return;
    setPageRendering(true);

    try {
      const page = await pdfDocProxy.getPage(pageNum);
      const canvas = pdfCanvasRef.current;
      const context = canvas.getContext('2d');

      // Calculate responsive viewport scale based on parent column width
      const unscaledViewport = page.getViewport({ scale: 1 });
      const parentWidth = containerRef.current?.parentElement ? containerRef.current.parentElement.clientWidth - 40 : 660;
      const targetWidth = Math.min(Math.max(parentWidth, 320), unscaledViewport.width * 1.5, 740);
      const scale = targetWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      setCanvasDimensions({ width: viewport.width, height: viewport.height });

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Page render error:', err);
    } finally {
      setPageRendering(false);
    }
  }, [pdfDocProxy]);

  useEffect(() => {
    if (pdfDocProxy) {
      renderPage(currentPage);
    }
  }, [pdfDocProxy, currentPage, renderPage]);

  // Handle window resize to re-render page at crisp scale
  useEffect(() => {
    const handleResize = () => {
      if (pdfDocProxy) {
        renderPage(currentPage);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDocProxy, currentPage, renderPage]);

  // 3. Drawing Canvas Setup
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = sigColor;
  }, [sigColor, sigMode]);

  const startDrawing = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = drawCanvasRef.current;
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL('image/png'));
    }
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(null);
    setHasDrawn(false);
  };

  // 4. Generate Typed Signature Image
  useEffect(() => {
    if (sigMode === 'type' && typedName.trim()) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 500;
      tempCanvas.height = 140;
      const ctx = tempCanvas.getContext('2d');
      ctx.clearRect(0, 0, 500, 140);

      let fontStyle = 'italic 46px "Brush Script MT", cursive';
      if (typedFont === 'dancing') fontStyle = 'italic 48px "Dancing Script", cursive';
      if (typedFont === 'serif') fontStyle = 'italic 42px "Georgia", serif';

      ctx.font = fontStyle;
      ctx.fillStyle = sigColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName.trim(), 250, 70);

      setSignatureDataUrl(tempCanvas.toDataURL('image/png'));
    }
  }, [typedName, typedFont, sigColor, sigMode]);

  // 5. Upload Signature Image Handler
  const handleSignatureUpload = (e) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSignatureDataUrl(event.target.result);
    };
    reader.readAsDataURL(uploaded);
  };

  // 6. Place Signature onto Current PDF Page (Normalized 0.0 to 1.0)
  const placeSignatureOnPdf = () => {
    if (!signatureDataUrl) {
      setError('Please draw, type, or upload a signature first.');
      return;
    }
    setError('');

    // Default: ~25% of page width, ~8.5% of page height, placed near bottom (75% down)
    const relW = 0.25;
    const relH = 0.085;
    const relX = (1 - relW) / 2;
    const relY = 0.72;

    const newItem = {
      id: Date.now().toString(),
      page: currentPage,
      relX,
      relY,
      relW,
      relH,
      dataUrl: signatureDataUrl,
      type: 'sig'
    };

    setPlacedItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // 7. Place Date Stamp onto Current PDF Page (Normalized 0.0 to 1.0)
  const placeDateStamp = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 280;
    tempCanvas.height = 70;
    const ctx = tempCanvas.getContext('2d');
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = sigColor || '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(today, 140, 35);

    const relW = 0.20;
    const relH = 0.05;
    const relX = 0.62;
    const relY = 0.74;

    const newItem = {
      id: Date.now().toString(),
      page: currentPage,
      relX,
      relY,
      relW,
      relH,
      dataUrl: tempCanvas.toDataURL('image/png'),
      type: 'date',
      text: today
    };

    setPlacedItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // 8. Robust Pointer Drag Logic with Global Event Listeners
  const handleItemPointerDown = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedItemId(item.id);
    setIsDragging(true);

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialRelX: item.relX,
      initialRelY: item.relY,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      itemRelW: item.relW,
      itemRelH: item.relH
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      if (!selectedItemId || !dragStartRef.current.containerWidth) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const clientY = e.clientY || e.touches?.[0]?.clientY;

      const deltaPixelX = clientX - dragStartRef.current.startX;
      const deltaPixelY = clientY - dragStartRef.current.startY;

      const deltaRelX = deltaPixelX / dragStartRef.current.containerWidth;
      const deltaRelY = deltaPixelY / dragStartRef.current.containerHeight;

      setPlacedItems(prev => prev.map(item => {
        if (item.id === selectedItemId) {
          const newRelX = Math.max(0, Math.min(1 - item.relW, dragStartRef.current.initialRelX + deltaRelX));
          const newRelY = Math.max(0, Math.min(1 - item.relH, dragStartRef.current.initialRelY + deltaRelY));
          return { ...item, relX: newRelX, relY: newRelY };
        }
        return item;
      }));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, selectedItemId]);

  const removeItem = (id) => {
    setPlacedItems(prev => prev.filter(i => i.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const updateItemScale = (id, factor) => {
    setPlacedItems(prev => prev.map(item => {
      if (item.id === id) {
        const newRelW = Math.max(0.06, Math.min(0.85, item.relW * factor));
        const newRelH = Math.max(0.02, Math.min(0.50, item.relH * factor));
        return { 
          ...item, 
          relW: newRelW, 
          relH: newRelH,
          relX: Math.min(item.relX, 1 - newRelW),
          relY: Math.min(item.relY, 1 - newRelH)
        };
      }
      return item;
    }));
  };

  // 9. Mathematically Perfect Coordinate Mapping & Burning via pdf-lib
  const handleBurnAndDownload = async () => {
    if (!file || placedItems.length === 0) {
      setError('Please place at least one signature or stamp before downloading.');
      return;
    }

    try {
      setIsExporting(true);
      setError('');

      const originalBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(originalBuffer);
      const pages = pdfDoc.getPages();

      // Burn items onto their designated pages
      for (const item of placedItems) {
        const pageIndex = item.page - 1;
        if (pageIndex < 0 || pageIndex >= pages.length) continue;

        const targetPage = pages[pageIndex];
        const { width: rawWidth, height: rawHeight } = targetPage.getSize();
        const angle = targetPage.getRotation().angle; // 0, 90, 180, 270

        // Convert base64 dataUrl to PNG bytes
        const base64Data = item.dataUrl.split(',')[1];
        const pngBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        const embeddedImage = await pdfDoc.embedPng(pngBytes);

        // Compute exact coordinates based on PDF page rotation matrix
        let pdfX, pdfY, pdfW, pdfH;

        if (angle === 90) {
          // Clockwise 90 deg: Visual width = rawHeight, Visual height = rawWidth
          pdfW = item.relW * rawHeight;
          pdfH = item.relH * rawWidth;
          pdfX = item.relY * rawWidth;
          pdfY = item.relX * rawHeight;

          targetPage.drawImage(embeddedImage, {
            x: pdfX,
            y: pdfY,
            width: pdfH,
            height: pdfW,
            rotate: degrees(270)
          });
        } else if (angle === 180) {
          // Upside down 180 deg
          pdfW = item.relW * rawWidth;
          pdfH = item.relH * rawHeight;
          pdfX = rawWidth - (item.relX * rawWidth);
          pdfY = (item.relY + item.relH) * rawHeight;

          targetPage.drawImage(embeddedImage, {
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH,
            rotate: degrees(180)
          });
        } else if (angle === 270) {
          // Counter-clockwise 270 deg
          pdfW = item.relW * rawHeight;
          pdfH = item.relH * rawWidth;
          pdfX = rawWidth - ((item.relY + item.relH) * rawWidth);
          pdfY = rawHeight - (item.relX * rawHeight);

          targetPage.drawImage(embeddedImage, {
            x: pdfX,
            y: pdfY,
            width: pdfH,
            height: pdfW,
            rotate: degrees(90)
          });
        } else {
          // Normal 0 deg (Standard for 95%+ of PDFs)
          // Origin is Bottom-Left in PDF points
          pdfW = item.relW * rawWidth;
          pdfH = item.relH * rawHeight;
          pdfX = item.relX * rawWidth;
          pdfY = rawHeight - ((item.relY + item.relH) * rawHeight);

          targetPage.drawImage(embeddedImage, {
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH
          });
        }
      }

      const signedBytes = await pdfDoc.save();
      const blob = new Blob([signedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Auto trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (err) {
      console.error('Signing export error:', err);
      setError('Failed to sign and export PDF. Please ensure the document is not encrypted.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* ── Top Guarantee Banner ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.85rem 1.25rem',
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: 'var(--radius-md, 10px)',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: 'var(--text-main)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} style={{ color: 'var(--success-color, #10b981)' }} />
          <span><strong>100% In-Browser PDF Signing:</strong> Your confidential document is never uploaded to any cloud server.</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-light)', fontSize: '0.8rem' }}>
          <Sparkles size={14} /> Zero Subscriptions
        </div>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--danger-color, #ef4444)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--danger-color, #ef4444)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}

      {/* ── Screen 1: Upload PDF ── */}
      {!file ? (
        <div
          style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--card-bg)',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={() => document.getElementById('pdf-sign-upload').click()}
        >
          <input
            id="pdf-sign-upload"
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary-color)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <FileUp size={32} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Choose a PDF document to sign
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 1.25rem' }}>
            Click to browse or drag and drop contracts, leases, tax forms, or NDAs. Fast, private, and free.
          </p>
          <Button variant="primary" size="md">
            Select PDF File
          </Button>
        </div>
      ) : (
        /* ── Screen 2: Interactive Signing Studio ── */
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 920 ? '340px 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Signature Maker Controls */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 14px)',
            padding: '1.25rem',
            height: 'fit-content',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>Create Signature</h3>
              <button
                onClick={() => { setFile(null); setPlacedItems([]); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.78rem' }}
              >
                Change PDF
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              padding: '4px',
              background: 'var(--bg-color)',
              borderRadius: 'var(--radius-md, 8px)',
              marginBottom: '1rem'
            }}>
              <button
                className={`btn btn-sm ${sigMode === 'draw' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                onClick={() => setSigMode('draw')}
              >
                <PenTool size={14} /> Draw
              </button>
              <button
                className={`btn btn-sm ${sigMode === 'type' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                onClick={() => setSigMode('type')}
              >
                <Type size={14} /> Type
              </button>
              <button
                className={`btn btn-sm ${sigMode === 'upload' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                onClick={() => setSigMode('upload')}
              >
                <Upload size={14} /> Upload
              </button>
            </div>

            {/* Ink Color Picker */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ink Color:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['#0f172a', '#1e3a8a', '#b91c1c'].map(col => (
                  <button
                    key={col}
                    onClick={() => setSigColor(col)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: col,
                      border: sigColor === col ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                      transform: sigColor === col ? 'scale(1.15)' : 'none',
                      cursor: 'pointer'
                    }}
                    title={col === '#0f172a' ? 'Black' : col === '#1e3a8a' ? 'Blue' : 'Red'}
                  />
                ))}
              </div>
            </div>

            {/* Mode 1: Draw Pad */}
            {sigMode === 'draw' && (
              <div>
                <div style={{
                  border: '1.5px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  position: 'relative',
                  touchAction: 'none'
                }}>
                  <canvas
                    ref={drawCanvasRef}
                    width={290}
                    height={130}
                    style={{ display: 'block', width: '100%', height: '130px', cursor: 'crosshair' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasDrawn && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      color: '#94a3b8',
                      fontSize: '0.85rem'
                    }}>
                      Draw your signature here
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button
                    onClick={clearDrawing}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.25rem 0.5rem' }}
                  >
                    <Eraser size={13} /> Clear
                  </button>
                </div>
              </div>
            )}

            {/* Mode 2: Type Name */}
            {sigMode === 'type' && (
              <div>
                <input
                  type="text"
                  className="input"
                  placeholder="Type your legal name"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}
                />
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
                  <button
                    className={`btn btn-sm ${typedFont === 'cursive' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, fontSize: '0.75rem', fontFamily: 'cursive' }}
                    onClick={() => setTypedFont('cursive')}
                  >
                    Script 1
                  </button>
                  <button
                    className={`btn btn-sm ${typedFont === 'dancing' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, fontSize: '0.75rem', fontFamily: 'cursive' }}
                    onClick={() => setTypedFont('dancing')}
                  >
                    Script 2
                  </button>
                  <button
                    className={`btn btn-sm ${typedFont === 'serif' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, fontSize: '0.75rem', fontFamily: 'serif', fontStyle: 'italic' }}
                    onClick={() => setTypedFont('serif')}
                  >
                    Formal
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Upload Image */}
            {sigMode === 'upload' && (
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleSignatureUpload}
                  style={{ fontSize: '0.825rem' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                  Upload a photo of your signature (transparent PNG works best).
                </p>
              </div>
            )}

            {/* Placement Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <Button
                variant="primary"
                size="md"
                onClick={placeSignatureOnPdf}
                disabled={!signatureDataUrl}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <PenTool size={16} /> Place Signature on Page
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={placeDateStamp}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <Calendar size={16} /> Place Date Stamp
              </Button>
            </div>

            {/* Placed Items Manager */}
            {placedItems.length > 0 && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                  Placed Elements ({placedItems.length})
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '0.5rem' }}>
                  {placedItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => { setSelectedItemId(item.id); setCurrentPage(item.page); }}
                      style={{
                        padding: '0.45rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedItemId === item.id ? 'var(--primary-light)' : 'var(--bg-color)',
                        border: selectedItemId === item.id ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontWeight: '600' }}>
                        {item.type === 'sig' ? `Signature #${idx + 1}` : 'Date Stamp'} (p. {item.page})
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateItemScale(item.id, 1.15); }}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '2px 6px', fontSize: '0.75rem', height: '22px' }}
                          title="Enlarge"
                        >
                          <Plus size={11} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateItemScale(item.id, 0.85); }}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '2px 6px', fontSize: '0.75rem', height: '22px' }}
                          title="Shrink"
                        >
                          <Minus size={11} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                          style={{ border: 'none', background: 'none', color: 'var(--danger-color, #ef4444)', cursor: 'pointer', padding: '2px' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: PDF Interactive Viewport */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 14px)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'var(--shadow-sm)',
            width: '100%',
            overflowX: 'auto'
          }}>
            {/* Viewport Header with Pagination */}
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Page {currentPage} of {numPages}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage <= 1 || pageRendering}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                    disabled={currentPage >= numPages || pageRendering}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Download / Export Signed PDF Button */}
              <Button
                variant="primary"
                size="md"
                onClick={handleBurnAndDownload}
                disabled={isExporting || placedItems.length === 0}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}
              >
                {isExporting ? <RotateCcw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={16} />}
                {isExporting ? 'Embedding Signature...' : 'Save & Download Signed PDF'}
              </Button>
            </div>

            {/* Document Interactive Container: Dimensions locked to Canvas Viewport */}
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                display: 'inline-block',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                borderRadius: '4px',
                overflow: 'hidden',
                background: '#525659',
                userSelect: 'none',
                width: canvasDimensions.width ? `${canvasDimensions.width}px` : 'auto',
                height: canvasDimensions.height ? `${canvasDimensions.height}px` : 'auto',
                maxWidth: '100%'
              }}
            >
              <canvas ref={pdfCanvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

              {/* Placed Elements on Current Page using Exact Percentage Positioning */}
              {placedItems
                .filter(item => item.page === currentPage)
                .map(item => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onPointerDown={(e) => handleItemPointerDown(e, item)}
                      style={{
                        position: 'absolute',
                        left: `${item.relX * 100}%`,
                        top: `${item.relY * 100}%`,
                        width: `${item.relW * 100}%`,
                        height: `${item.relH * 100}%`,
                        cursor: isDragging && selectedItemId === item.id ? 'grabbing' : 'grab',
                        border: isSelected ? '2px dashed #2563EB' : '1px dashed rgba(0,0,0,0.3)',
                        backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                        padding: '2px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        touchAction: 'none'
                      }}
                    >
                      <img
                        src={item.dataUrl}
                        alt="Placed item"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          pointerEvents: 'none'
                        }}
                      />
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '0',
                          background: '#2563EB',
                          color: '#FFF',
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          pointerEvents: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                          <Move size={10} /> Drag to place
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Instruction footnote */}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.85rem', textAlign: 'center' }}>
              💡 Click and drag the signature box to place it exactly where you need to sign. Use the <strong>+</strong> and <strong>-</strong> buttons to resize.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
