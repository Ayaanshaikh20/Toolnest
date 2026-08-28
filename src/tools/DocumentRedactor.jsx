import React, { useState, useRef, useEffect } from 'react';
import { pdfjsLib } from '../config/pdfWorker';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../components/Button';
import {
  FileUp,
  Download,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  Trash2,
  Undo2,
  Sparkles,
  Search,
  CheckSquare,
  Square,
  KeyRound,
  Mail,
  Phone,
  CreditCard,
  Globe,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  Crop
} from 'lucide-react';

const SENSITIVE_PATTERNS = {
  apiKeys: {
    name: 'API Keys & Secrets',
    icon: KeyRound,
    color: '#EF4444',
    regex: /\b(?:sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35}|AKIA[0-9A-Z]{16}|[a-zA-Z0-9_\-]{32,})\b/g
  },
  emails: {
    name: 'Email Addresses',
    icon: Mail,
    color: '#3B82F6',
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
  },
  phones: {
    name: 'Phone Numbers',
    icon: Phone,
    color: '#10B981',
    regex: /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g
  },
  creditCards: {
    name: 'Credit Cards',
    icon: CreditCard,
    color: '#F59E0B',
    regex: /\b(?:\d[ -]*?){13,16}\b/g
  },
  ipAddresses: {
    name: 'IP Addresses',
    icon: Globe,
    color: '#8B5CF6',
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b/g
  }
};

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const DocumentRedactor = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null); // 'pdf' | 'image'
  const [pdfDocProxy, setPdfDocProxy] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Page-specific data: { [pageNum]: { dataUrl, width, height, textItems: [], redactions: [] } }
  const [pageData, setPageData] = useState({});
  const [detectedFindings, setDetectedFindings] = useState([]);
  
  // Redaction tools: 'blackout' | 'whiteout' | 'pixelate' | 'blur'
  const [activeTool, setActiveTool] = useState('blackout');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  
  // Canvas interaction
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const [selectedRedactionId, setSelectedRedactionId] = useState(null);
  
  // Processing & Export
  const [isScanning, setIsScanning] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedResult, setExportedResult] = useState(null);
  const [error, setError] = useState('');
  
  const overlayCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up previous blob URLs
  useEffect(() => {
    return () => {
      if (exportedResult?.url) URL.revokeObjectURL(exportedResult.url);
    };
  }, [exportedResult]);

  // Handle file upload & page rendering
  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setExportedResult(null);
    setDetectedFindings([]);
    setPageData({});
    setPdfDocProxy(null);

    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
    const isImg = selectedFile.type.startsWith('image/') || /\.(png|jpe?g|webp|bmp)$/i.test(selectedFile.name);

    if (!isPdf && !isImg) {
      setError('Please upload a valid PDF document or Image file (PNG, JPG, WebP).');
      return;
    }

    setFile(selectedFile);
    setFileType(isPdf ? 'pdf' : 'image');
    setIsScanning(true);

    try {
      if (isPdf) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        setPdfDocProxy(pdf);
        const numPages = pdf.numPages || 1;
        setTotalPages(numPages);
        setCurrentPage(1);

        const findings = [];
        const initialPages = {};

        for (let pNum = 1; pNum <= numPages; pNum++) {
          const page = await pdf.getPage(pNum);
          const viewport = page.getViewport({ scale: 1.5 });

          // Render page to canvas to create high-res image
          const offCanvas = document.createElement('canvas');
          offCanvas.width = Math.max(1, Math.floor(viewport.width));
          offCanvas.height = Math.max(1, Math.floor(viewport.height));
          const offCtx = offCanvas.getContext('2d', { alpha: false });

          offCtx.fillStyle = '#FFFFFF';
          offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);

          await page.render({
            canvasContext: offCtx,
            viewport: viewport
          }).promise;

          const dataUrl = offCanvas.toDataURL('image/jpeg', 0.92);

          // Extract text and scan patterns safely without throwing
          const textItems = [];
          const pageRedactions = [];

          try {
            const textContent = await page.getTextContent();
            if (textContent && Array.isArray(textContent.items)) {
              textContent.items.forEach((item, idx) => {
                if (!item || typeof item.str !== 'string' || !item.str.trim()) return;
                const str = item.str;

                let vx = 0;
                let vy = 0;
                if (Array.isArray(item.transform) && item.transform.length >= 6) {
                  const tx = item.transform[4] || 0;
                  const ty = item.transform[5] || 0;
                  vx = tx * 1.5;
                  vy = viewport.height - (ty * 1.5);
                  if (typeof viewport.convertToViewportPoint === 'function') {
                    try {
                      const pt = viewport.convertToViewportPoint(tx, ty);
                      if (Array.isArray(pt)) {
                        vx = pt[0];
                        vy = pt[1];
                      }
                    } catch (e) {}
                  }
                }

                const itemWidth = Math.max(10, (item.width || 20) * 1.5);
                const itemHeight = Math.max(12, (item.height || 12) * 1.5);

                const bounds = {
                  x: Math.max(0, Math.round(vx)),
                  y: Math.max(0, Math.round(vy - itemHeight)),
                  width: Math.round(itemWidth),
                  height: Math.round(itemHeight)
                };

                textItems.push({ text: str, bounds, id: `p${pNum}_t${idx}` });

                // Check sensitive patterns
                Object.entries(SENSITIVE_PATTERNS).forEach(([categoryKey, category]) => {
                  try {
                    const matches = str.match(category.regex);
                    if (matches) {
                      matches.forEach((matchStr) => {
                        const redactionId = `auto_${categoryKey}_p${pNum}_${idx}_${Math.random().toString(36).substr(2, 4)}`;
                        findings.push({
                          id: redactionId,
                          category: categoryKey,
                          categoryName: category.name,
                          color: category.color,
                          matchedText: matchStr,
                          pageNum: pNum,
                          bounds: { ...bounds },
                          applied: true
                        });
                        pageRedactions.push({
                          id: redactionId,
                          ...bounds,
                          type: 'blackout',
                          category: categoryKey,
                          label: category.name
                        });
                      });
                    }
                  } catch (regErr) {}
                });
              });
            }
          } catch (textErr) {
            console.warn('Text scan skipped for page', pNum, textErr);
          }

          initialPages[pNum] = {
            dataUrl,
            width: offCanvas.width,
            height: offCanvas.height,
            textItems,
            redactions: pageRedactions
          };

          // Progressively update page data so Page 1 appears immediately!
          setPageData(prev => ({
            ...prev,
            [pNum]: initialPages[pNum]
          }));
        }

        setDetectedFindings(findings);
        setPageData(initialPages);
      } else {
        setTotalPages(1);
        setCurrentPage(1);

        const img = new Image();
        const objectUrl = URL.createObjectURL(selectedFile);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });

        const offCanvas = document.createElement('canvas');
        offCanvas.width = img.width;
        offCanvas.height = img.height;
        const offCtx = offCanvas.getContext('2d');
        offCtx.fillStyle = '#FFFFFF';
        offCtx.fillRect(0, 0, img.width, img.height);
        offCtx.drawImage(img, 0, 0);
        const dataUrl = offCanvas.toDataURL('image/jpeg', 0.95);

        setPageData({
          1: {
            dataUrl,
            width: img.width,
            height: img.height,
            textItems: [],
            redactions: []
          }
        });
      }
    } catch (err) {
      console.error('Error loading file for redaction:', err);
      setError('Failed to parse document: ' + (err?.message || 'File could not be opened.'));
    } finally {
      setIsScanning(false);
    }
  };

  // Render Redaction Overlays onto overlayCanvas
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const curPage = pageData[currentPage];
    if (!overlayCanvas || !curPage) return;

    overlayCanvas.width = curPage.width;
    overlayCanvas.height = curPage.height;

    const ctx = overlayCanvas.getContext('2d');
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    const redactions = curPage.redactions || [];
    drawRedactions(ctx, redactions);

    // Active drag-to-redact box preview
    if (isDrawing && currentBox && currentBox.width > 2 && currentBox.height > 2) {
      ctx.save();
      ctx.fillStyle = activeTool === 'blackout' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(59, 130, 246, 0.45)';
      ctx.fillRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
      ctx.restore();
    }
  }, [pageData, currentPage, activeTool, isDrawing, currentBox, selectedRedactionId]);

  // Draw Redactions Helper
  const drawRedactions = (ctx, redactions) => {
    redactions.forEach((box) => {
      ctx.save();

      if (box.type === 'blackout') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(box.x, box.y, box.width, box.height);
      } else if (box.type === 'whiteout') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      } else if (box.type === 'pixelate') {
        // High visibility mosaic block
        const w = Math.max(1, Math.floor(box.width));
        const h = Math.max(1, Math.floor(box.height));
        const size = Math.max(6, Math.floor(Math.min(w, h) / 6));

        ctx.fillStyle = '#334155';
        ctx.fillRect(box.x, box.y, box.width, box.height);

        for (let y = 0; y < h; y += size) {
          for (let x = 0; x < w; x += size) {
            const shade = ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 0) ? '#475569' : '#1E293B';
            ctx.fillStyle = shade;
            ctx.fillRect(box.x + x, box.y + y, Math.min(size, w - x), Math.min(size, h - y));
          }
        }
      } else if (box.type === 'blur') {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fillRect(box.x, box.y, box.width, box.height);
      }

      if (box.id === selectedRedactionId) {
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(box.x - 2, box.y - 2, box.width + 4, box.height + 4);
      }

      ctx.restore();
    });
  };

  // Canvas Mouse Coordinates
  const getCanvasCoordinates = (e) => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return { x: 0, y: 0 };
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setStartPos(coords);
    setCurrentBox({
      x: coords.x,
      y: coords.y,
      width: 0,
      height: 0,
      type: activeTool
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentBox) return;
    const coords = getCanvasCoordinates(e);

    const x = Math.min(startPos.x, coords.x);
    const y = Math.min(startPos.y, coords.y);
    const width = Math.abs(coords.x - startPos.x);
    const height = Math.abs(coords.y - startPos.y);

    setCurrentBox({
      x,
      y,
      width,
      height,
      type: activeTool
    });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentBox && currentBox.width > 4 && currentBox.height > 4) {
      const newRedaction = {
        id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.width,
        height: currentBox.height,
        type: activeTool,
        label: 'Manual Area'
      };

      setPageData(prev => {
        const curPage = prev[currentPage] || { redactions: [] };
        return {
          ...prev,
          [currentPage]: {
            ...curPage,
            redactions: [...(curPage.redactions || []), newRedaction]
          }
        };
      });
    }

    setIsDrawing(false);
    setCurrentBox(null);
  };

  // Toggle Auto-Detected Finding
  const toggleFinding = (findingId) => {
    setDetectedFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        const nextApplied = !f.applied;
        
        setPageData(pData => {
          const pInfo = pData[f.pageNum] || { redactions: [] };
          let updatedRedactions = [...(pInfo.redactions || [])];
          
          if (nextApplied) {
            updatedRedactions.push({
              id: f.id,
              ...f.bounds,
              type: 'blackout',
              category: f.category,
              label: f.categoryName
            });
          } else {
            updatedRedactions = updatedRedactions.filter(r => r.id !== f.id);
          }

          return {
            ...pData,
            [f.pageNum]: {
              ...pInfo,
              redactions: updatedRedactions
            }
          };
        });

        return { ...f, applied: nextApplied };
      }
      return f;
    }));
  };

  // Toggle All Findings in a Category
  const toggleCategory = (categoryKey, targetState) => {
    setDetectedFindings(prev => prev.map(f => {
      if (f.category === categoryKey) {
        if (f.applied !== targetState) {
          toggleFinding(f.id);
        }
        return { ...f, applied: targetState };
      }
      return f;
    }));
  };

  // Custom Text Keyword Search & Redact
  const handleCustomKeywordRedact = () => {
    if (!customSearchQuery.trim() || fileType !== 'pdf') return;

    const query = customSearchQuery.trim().toLowerCase();

    setPageData(prev => {
      const nextPages = { ...prev };

      Object.entries(nextPages).forEach(([pNum, pInfo]) => {
        const newRedactions = [...(pInfo.redactions || [])];

        (pInfo.textItems || []).forEach(item => {
          if (item.text.toLowerCase().includes(query)) {
            newRedactions.push({
              id: `custom_search_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              ...item.bounds,
              type: activeTool,
              label: `"${customSearchQuery}"`
            });
          }
        });

        nextPages[pNum] = {
          ...pInfo,
          redactions: newRedactions
        };
      });

      return nextPages;
    });

    setCustomSearchQuery('');
  };

  // Undo Last Redaction on current page
  const handleUndo = () => {
    setPageData(prev => {
      const curPage = prev[currentPage];
      if (!curPage || !curPage.redactions?.length) return prev;
      return {
        ...prev,
        [currentPage]: {
          ...curPage,
          redactions: curPage.redactions.slice(0, -1)
        }
      };
    });
  };

  // Clear all redactions on current page
  const handleClearPage = () => {
    setPageData(prev => {
      const curPage = prev[currentPage];
      if (!curPage) return prev;
      return {
        ...prev,
        [currentPage]: {
          ...curPage,
          redactions: []
        }
      };
    });
  };

  // Export Flattened & Permanently Redacted PDF / Image
  const handleExportSanitized = async () => {
    if (!file) return;

    setIsExporting(true);
    setError('');
    setExportProgress(10);

    try {
      if (fileType === 'pdf' && pdfDocProxy) {
        const newPdfDoc = await PDFDocument.create();
        const total = totalPages;

        for (let pNum = 1; pNum <= total; pNum++) {
          setExportProgress(Math.round(((pNum - 0.5) / total) * 100));

          const page = await pdfDocProxy.getPage(pNum);
          const viewport = page.getViewport({ scale: 2.0 });
          const originalViewport = page.getViewport({ scale: 1.0 });

          const expCanvas = document.createElement('canvas');
          expCanvas.width = viewport.width;
          expCanvas.height = viewport.height;
          const expCtx = expCanvas.getContext('2d', { alpha: false });

          expCtx.fillStyle = '#FFFFFF';
          expCtx.fillRect(0, 0, expCanvas.width, expCanvas.height);

          await page.render({
            canvasContext: expCtx,
            viewport: viewport
          }).promise;

          const pRedactions = pageData[pNum]?.redactions || [];
          const scaleFactor = 2.0 / 1.5;

          const scaledRedactions = pRedactions.map(r => ({
            ...r,
            x: r.x * scaleFactor,
            y: r.y * scaleFactor,
            width: r.width * scaleFactor,
            height: r.height * scaleFactor
          }));

          drawRedactions(expCtx, scaledRedactions);

          const imgDataUrl = expCanvas.toDataURL('image/jpeg', 0.92);
          const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
          const embeddedJpg = await newPdfDoc.embedJpg(imgBytes);

          const newPage = newPdfDoc.addPage([originalViewport.width, originalViewport.height]);
          newPage.drawImage(embeddedJpg, {
            x: 0,
            y: 0,
            width: originalViewport.width,
            height: originalViewport.height
          });
        }

        setExportProgress(95);

        const pdfBytes = await newPdfDoc.save({ useObjectStreams: true });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setExportedResult({
          url,
          filename: `redacted_sanitized_${file.name.replace(/\.pdf$/i, '')}.pdf`,
          size: blob.size,
          type: 'pdf'
        });
      } else if (fileType === 'image') {
        const curPage = pageData[1];
        const expCanvas = document.createElement('canvas');
        expCanvas.width = curPage.width;
        expCanvas.height = curPage.height;
        const expCtx = expCanvas.getContext('2d');

        const baseImg = new Image();
        await new Promise((resolve) => {
          baseImg.onload = resolve;
          baseImg.src = curPage.dataUrl;
        });

        expCtx.drawImage(baseImg, 0, 0);
        drawRedactions(expCtx, curPage.redactions || []);

        const dataUrl = expCanvas.toDataURL('image/png');
        const blob = await fetch(dataUrl).then(r => r.blob());
        const url = URL.createObjectURL(blob);

        setExportedResult({
          url,
          filename: `redacted_${file.name.replace(/\.[^/.]+$/, '')}.png`,
          size: blob.size,
          type: 'image'
        });
      }
    } catch (err) {
      console.error('Export failed:', err);
      setError('An error occurred while sanitizing and exporting your document.');
    } finally {
      setIsExporting(false);
      setExportProgress(100);
    }
  };

  const handleReset = () => {
    if (exportedResult?.url) URL.revokeObjectURL(exportedResult.url);
    setFile(null);
    setFileType(null);
    setPdfDocProxy(null);
    setPageData({});
    setDetectedFindings([]);
    setExportedResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalActiveRedactions = Object.values(pageData).reduce((sum, p) => sum + (p.redactions?.length || 0), 0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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

      {/* ── File Dropzone ── */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
          onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'var(--border-color)';
            if (e.dataTransfer.files?.[0]) {
              handleFileSelect({ target: { files: e.dataTransfer.files } });
            }
          }}
          style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--card-bg, #fff)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '2rem'
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,image/png,image/jpeg,image/webp"
            style={{ display: 'none' }}
          />
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <ShieldAlert size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Upload PDF or Screenshot to Redact
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
            Auto-detect & blackout API keys, emails, phone numbers, credit cards, and sensitive identifiers with 100% in-browser security.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10B981', fontWeight: '600', background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '999px' }}>
            <ShieldCheck size={14} /> Zero Server Uploads &bull; Irreversible Pixel Burn-In
          </div>
        </div>
      ) : (
        <div>
          {/* Top Document Header & Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: 'var(--card-bg, #fff)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                background: fileType === 'pdf' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                color: fileType === 'pdf' ? '#EF4444' : '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {fileType === 'pdf' ? <FileText size={22} /> : <ImageIcon size={22} />}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {file.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {formatBytes(file.size)} &bull; {fileType === 'pdf' ? `${totalPages} Pages` : 'Single Image'} &bull; <strong style={{ color: '#EF4444' }}>{totalActiveRedactions} Redactions Active</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={handleReset} size="sm">
                Change File
              </Button>
              <Button
                variant="primary"
                onClick={handleExportSanitized}
                disabled={isExporting || isScanning}
                size="sm"
                style={{ background: '#EF4444', borderColor: '#EF4444' }}
              >
                {isExporting ? <RefreshCw size={14} className="spin-animation" /> : <Download size={14} />}
                {isExporting ? `Sanitizing (${exportProgress}%)...` : 'Export Sanitized File'}
              </Button>
            </div>
          </div>

          {/* Export Success Banner */}
          {exportedResult && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: 'var(--success-bg, #ECFDF5)',
              border: '1px solid var(--success-color, #10B981)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--success-color, #10B981)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                    Document Sanitized & Exported Successfully!
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                    Underlying text layers and EXIF metadata were stripped permanently.
                  </div>
                </div>
              </div>
              <a
                href={exportedResult.url}
                download={exportedResult.filename}
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#10B981', borderColor: '#10B981' }}
              >
                <Download size={14} /> Download ({formatBytes(exportedResult.size)})
              </a>
            </div>
          )}

          {/* ── Main Redactor Workspace Grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '1.25rem',
            alignItems: 'start'
          }}>
            {/* Left: Document Viewer & Redaction Toolbar */}
            <div style={{
              background: 'var(--card-bg, #fff)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}>
              {/* Toolbar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                background: 'var(--bg-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.25rem' }}>
                    Redact Style:
                  </span>
                  {[
                    { id: 'blackout', name: 'Blackout', color: '#000000' },
                    { id: 'whiteout', name: 'Whiteout', color: '#CBD5E1' },
                    { id: 'pixelate', name: 'Pixelate', color: '#3B82F6' },
                    { id: 'blur', name: 'Blur', color: '#8B5CF6' }
                  ].map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: activeTool === tool.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        background: activeTool === tool.id ? 'var(--card-bg, #fff)' : 'transparent',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: tool.color }} />
                      {tool.name}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    onClick={handleUndo}
                    title="Undo last redaction"
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--card-bg, #fff)',
                      color: 'var(--text-main)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Undo2 size={13} /> Undo
                  </button>
                  <button
                    onClick={handleClearPage}
                    title="Clear all redactions on this page"
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--card-bg, #fff)',
                      color: '#EF4444',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Trash2 size={13} /> Clear Page
                  </button>
                </div>
              </div>

              {/* Document Viewport with Direct Image & Overlay Canvas */}
              <div
                ref={containerRef}
                style={{
                  position: 'relative',
                  maxHeight: '680px',
                  overflow: 'auto',
                  background: '#1E293B',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  userSelect: 'none'
                }}
              >
                {pageData[currentPage]?.dataUrl ? (
                  <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    background: '#FFFFFF',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    {/* Layer 1: Native High-Res Image Display */}
                    <img
                      src={pageData[currentPage].dataUrl}
                      alt={`Page ${currentPage}`}
                      style={{
                        display: 'block',
                        maxWidth: '100%',
                        height: 'auto',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                      draggable={false}
                    />

                    {/* Layer 2: Interactive Redactions Canvas Overlay */}
                    <canvas
                      ref={overlayCanvasRef}
                      width={pageData[currentPage].width}
                      height={pageData[currentPage].height}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'crosshair'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 2rem',
                    color: '#94A3B8',
                    gap: '0.75rem'
                  }}>
                    <RefreshCw size={28} className="spin-animation" />
                    <span style={{ fontSize: '0.875rem' }}>Rendering document page...</span>
                  </div>
                )}
              </div>

              {/* Multi-page Navigation Bar */}
              {fileType === 'pdf' && totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--bg-color)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      <ChevronLeft size={14} /> Prev
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      Next <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Auto-Detect Sidebar & Custom Keyword Redactor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Custom Keyword Redaction Card */}
              <div style={{
                background: 'var(--card-bg, #fff)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Search size={16} style={{ color: 'var(--primary-color)' }} />
                  Custom Search & Redact
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Blackout any confidential name, project code, or invoice ID across all pages.
                </p>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="e.g. John Doe, $5,000..."
                    value={customSearchQuery}
                    onChange={(e) => setCustomSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomKeywordRedact()}
                    style={{
                      flexGrow: 1,
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.8rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-color)',
                      color: 'var(--text-main)'
                    }}
                  />
                  <button
                    onClick={handleCustomKeywordRedact}
                    disabled={!customSearchQuery.trim()}
                    style={{
                      padding: '0.45rem 0.75rem',
                      background: 'var(--primary-color)',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Redact All
                  </button>
                </div>
              </div>

              {/* Auto-Detection Findings Inspector */}
              <div style={{
                background: 'var(--card-bg, #fff)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={16} style={{ color: '#F59E0B' }} />
                    Auto-Detected Secrets
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: detectedFindings.length > 0 ? '#EF4444' : 'var(--text-muted)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '999px' }}>
                    {detectedFindings.length} found
                  </span>
                </div>

                {detectedFindings.length === 0 ? (
                  <div style={{ padding: '1.5rem 0.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <ShieldCheck size={28} style={{ color: '#10B981', margin: '0 auto 0.5rem', display: 'block' }} />
                    No standard API keys or credentials detected in vector text. You can still drag & drop manual blackout boxes on any area!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '380px', overflowY: 'auto' }}>
                    {Object.entries(SENSITIVE_PATTERNS).map(([catKey, cat]) => {
                      const catFindings = detectedFindings.filter(f => f.category === catKey);
                      if (catFindings.length === 0) return null;

                      const allApplied = catFindings.every(f => f.applied);
                      const Icon = cat.icon;

                      return (
                        <div
                          key={catKey}
                          style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.65rem 0.75rem',
                            background: 'var(--bg-color)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: cat.color }}>
                              <Icon size={14} /> {cat.name} ({catFindings.length})
                            </div>
                            <button
                              onClick={() => toggleCategory(catKey, !allApplied)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--primary-color)',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              {allApplied ? 'Uncheck All' : 'Redact All'}
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {catFindings.map(item => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  toggleFinding(item.id);
                                  if (fileType === 'pdf' && item.pageNum !== currentPage) {
                                    setCurrentPage(item.pageNum);
                                  }
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.3rem 0.5rem',
                                  borderRadius: 'var(--radius-sm)',
                                  background: item.applied ? 'rgba(239, 68, 68, 0.08)' : 'var(--card-bg, #fff)',
                                  border: item.applied ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid var(--border-color)',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem'
                                }}
                              >
                                <span style={{ fontFamily: 'monospace', color: item.applied ? '#EF4444' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px' }}>
                                  {item.matchedText}
                                </span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                  p.{item.pageNum}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
