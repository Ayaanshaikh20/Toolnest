import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
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
  FileCheck
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

  // Placed signatures state: array of { id, page, x, y, width, height, dataUrl, type: 'sig' | 'date', text }
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, itemX: 0, itemY: 0 });

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

      // Calculate responsive viewport scale (fit container nicely)
      const unscaledViewport = page.getViewport({ scale: 1 });
      const targetWidth = Math.min(window.innerWidth > 768 ? 680 : window.innerWidth - 48, unscaledViewport.width);
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
      tempCanvas.width = 400;
      tempCanvas.height = 120;
      const ctx = tempCanvas.getContext('2d');
      ctx.clearRect(0, 0, 400, 120);

      let fontStyle = 'italic 38px "Brush Script MT", cursive';
      if (typedFont === 'dancing') fontStyle = 'italic 40px "Dancing Script", cursive';
      if (typedFont === 'serif') fontStyle = 'italic 36px "Georgia", serif';

      ctx.font = fontStyle;
      ctx.fillStyle = sigColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName.trim(), 200, 60);

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

  // 6. Place Signature onto Current PDF Page
  const placeSignatureOnPdf = () => {
    if (!signatureDataUrl) {
      setError('Please draw, type, or upload a signature first.');
      return;
    }
    setError('');

    const defaultWidth = 140;
    const defaultHeight = 60;
    const centerX = Math.max(10, (canvasDimensions.width - defaultWidth) / 2);
    const centerY = Math.max(10, (canvasDimensions.height - defaultHeight) / 2);

    const newItem = {
      id: Date.now().toString(),
      page: currentPage,
      x: centerX,
      y: centerY,
      width: defaultWidth,
      height: defaultHeight,
      dataUrl: signatureDataUrl,
      type: 'sig'
    };

    setPlacedItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // 7. Place Date Stamp onto Current PDF Page
  const placeDateStamp = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 160;
    tempCanvas.height = 40;
    const ctx = tempCanvas.getContext('2d');
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(today, 80, 20);

    const newItem = {
      id: Date.now().toString(),
      page: currentPage,
      x: Math.max(10, (canvasDimensions.width - 120) / 2),
      y: Math.max(10, (canvasDimensions.height - 35) / 2 + 50),
      width: 120,
      height: 30,
      dataUrl: tempCanvas.toDataURL('image/png'),
      type: 'date'
    };

    setPlacedItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // 8. Drag & Move Signature Logic
  const handleItemMouseDown = (e, item) => {
    e.stopPropagation();
    setSelectedItemId(item.id);
    setIsDragging(true);

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      itemX: item.x,
      itemY: item.y
    };
  };

  const handleContainerMouseMove = (e) => {
    if (!isDragging || !selectedItemId) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    const deltaX = clientX - dragStartRef.current.mouseX;
    const deltaY = clientY - dragStartRef.current.mouseY;

    setPlacedItems(prev => prev.map(item => {
      if (item.id === selectedItemId) {
        const newX = Math.max(0, Math.min(canvasDimensions.width - item.width, dragStartRef.current.itemX + deltaX));
        const newY = Math.max(0, Math.min(canvasDimensions.height - item.height, dragStartRef.current.itemY + deltaY));
        return { ...item, x: newX, y: newY };
      }
      return item;
    }));
  };

  const handleContainerMouseUp = () => {
    setIsDragging(false);
  };

  const removeItem = (id) => {
    setPlacedItems(prev => prev.filter(i => i.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const updateItemScale = (id, delta) => {
    setPlacedItems(prev => prev.map(item => {
      if (item.id === id) {
        const newW = Math.max(50, Math.min(300, item.width * delta));
        const newH = Math.max(20, Math.min(150, item.height * delta));
        return { ...item, width: newW, height: newH };
      }
      return item;
    }));
  };

  // 9. Burn Signatures & Export Signed PDF via pdf-lib
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

      // Group items by page
      for (const item of placedItems) {
        const pageIndex = item.page - 1;
        if (pageIndex < 0 || pageIndex >= pages.length) continue;

        const targetPage = pages[pageIndex];
        const { width: pdfWidth, height: pdfHeight } = targetPage.getSize();

        // Convert base64 dataUrl to PNG bytes
        const base64Data = item.dataUrl.split(',')[1];
        const pngBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        const embeddedImage = await pdfDoc.embedPng(pngBytes);

        // Map screen canvas coordinates to PDF point coordinates
        // Canvas origin is Top-Left; PDF origin is Bottom-Left
        const scaleX = pdfWidth / canvasDimensions.width;
        const scaleY = pdfHeight / canvasDimensions.height;

        const finalPdfX = item.x * scaleX;
        const finalPdfY = pdfHeight - ((item.y + item.height) * scaleY);
        const finalPdfW = item.width * scaleX;
        const finalPdfH = item.height * scaleY;

        targetPage.drawImage(embeddedImage, {
          x: finalPdfX,
          y: finalPdfY,
          width: finalPdfW,
          height: finalPdfH
        });
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
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 900 ? '340px 1fr' : '1fr', gap: '1.5rem' }}>
          
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
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedItemId === item.id ? 'var(--primary-light)' : 'var(--bg-color)',
                        border: selectedItemId === item.id ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{item.type === 'sig' ? `Signature #${idx + 1}` : 'Date Stamp'} (p. {item.page})</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateItemScale(item.id, 1.15); }}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '2px', fontSize: '0.75rem', fontWeight: 'bold' }}
                          title="Enlarge"
                        >
                          +
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateItemScale(item.id, 0.85); }}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '2px', fontSize: '0.75rem', fontWeight: 'bold' }}
                          title="Shrink"
                        >
                          -
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                          style={{ border: 'none', background: 'none', color: 'var(--danger-color, #ef4444)', cursor: 'pointer', padding: '2px' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
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
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Viewport Header with Pagination */}
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
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

            {/* Document Interactive Container */}
            <div
              ref={containerRef}
              onMouseMove={handleContainerMouseMove}
              onMouseUp={handleContainerMouseUp}
              onTouchMove={handleContainerMouseMove}
              onTouchEnd={handleContainerMouseUp}
              style={{
                position: 'relative',
                display: 'inline-block',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                borderRadius: '4px',
                overflow: 'hidden',
                background: '#525659',
                userSelect: 'none'
              }}
            >
              <canvas ref={pdfCanvasRef} style={{ display: 'block', maxWidth: '100%' }} />

              {/* Placed Elements on Current Page */}
              {placedItems
                .filter(item => item.page === currentPage)
                .map(item => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseDown={(e) => handleItemMouseDown(e, item)}
                      onTouchStart={(e) => handleItemMouseDown(e, item)}
                      style={{
                        position: 'absolute',
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                        cursor: 'move',
                        border: isSelected ? '1.5px dashed #2563EB' : '1px dashed rgba(0,0,0,0.25)',
                        backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                        padding: '2px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src={item.dataUrl}
                        alt="Signature item"
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
                          top: '-18px',
                          left: '0',
                          background: '#2563EB',
                          color: '#FFF',
                          fontSize: '10px',
                          padding: '1px 4px',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          <Move size={10} /> Drag to position
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Instruction footnote */}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.75rem', textAlign: 'center' }}>
              💡 Click and drag the signature box to place it exactly on your document’s signature line.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
