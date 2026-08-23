import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../components/Button';
import { FileUp, Download, CheckCircle2, Scissors, FileText } from 'lucide-react';

export const PdfSplitter = () => {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF document.');
      return;
    }

    try {
      setError('');
      setSplitPdfUrl(null);
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setFile(selectedFile);
      setTotalPages(count);
      setPageRange(`1-${count}`);
    } catch (err) {
      setError('Could not load PDF. It might be corrupted or password-protected.');
    }
  };

  const parsePageRange = (input, maxPages) => {
    const pages = new Set();
    const parts = input.split(',').map(p => p.trim());

    for (const part of parts) {
      if (!part) continue;
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          throw new Error(`Invalid range "${part}". Please enter numbers between 1 and ${maxPages}.`);
        }
        for (let i = start; i <= end; i++) pages.add(i - 1);
      } else {
        const page = parseInt(part, 10);
        if (isNaN(page) || page < 1 || page > maxPages) {
          throw new Error(`Invalid page "${part}". Please enter numbers between 1 and ${maxPages}.`);
        }
        pages.add(page - 1);
      }
    }

    if (pages.size === 0) throw new Error('No pages selected.');
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }

    try {
      setIsSplitting(true);
      setError('');

      const pageIndices = parsePageRange(pageRange, totalPages);
      const fileBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(fileBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
      copiedPages.forEach(p => newPdf.addPage(p));

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitPdfUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to extract pages.');
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div>
      {/* Upload Dropzone */}
      {!file ? (
        <div style={{
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          background: 'var(--bg-color)',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          transition: 'var(--transition)'
        }}
        onClick={() => document.getElementById('split-pdf-input').click()}
        >
          <input
            id="split-pdf-input"
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Scissors size={40} style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
            Click to upload PDF to split / extract
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Extract specific pages or page ranges into a new PDF document.
          </p>
        </div>
      ) : (
        <div style={{
          padding: '1.25rem',
          background: 'var(--bg-color)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} style={{ color: 'var(--primary-color)' }} />
            <div>
              <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{file.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {totalPages} total page{totalPages === 1 ? '' : 's'} · {(file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
          </div>
          <button
            onClick={() => { setFile(null); setSplitPdfUrl(null); }}
            className="btn btn-outline btn-sm"
          >
            Change File
          </button>
        </div>
      )}

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--error-bg)',
          color: 'var(--error-color)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {file && (
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
            Enter Page Range to Extract:
          </label>
          <input
            type="text"
            className="input"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            placeholder="e.g. 1, 3, 5-8"
          />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
            Examples: <code>1-3</code> (first three pages), <code>1, 4, 7</code> (specific pages), or <code>1-2, 5</code>.
          </div>
        </div>
      )}

      {file && (
        <div className="tool-actions">
          <Button
            variant="primary"
            onClick={handleExtract}
            disabled={isSplitting || !pageRange.trim()}
          >
            {isSplitting ? 'Extracting Pages...' : 'Extract & Download'}
          </Button>

          {splitPdfUrl && (
            <a
              href={splitPdfUrl}
              download={`extracted_${file.name}`}
              className="btn btn-primary"
              style={{ textDecoration: 'none', background: 'var(--success-color)' }}
            >
              <Download size={16} /> Download Extracted PDF
            </a>
          )}
        </div>
      )}

      {splitPdfUrl && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'var(--success-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--success-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--success-color)'
        }}>
          <CheckCircle2 size={24} />
          <div>
            <strong>Pages Extracted Successfully!</strong>
            <div style={{ fontSize: '0.85rem' }}>Your customized PDF is ready for download.</div>
          </div>
        </div>
      )}
    </div>
  );
};
