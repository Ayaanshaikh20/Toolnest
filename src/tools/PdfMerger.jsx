import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../components/Button';
import { FileUp, Download, Trash2, ArrowUp, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';

export const PdfMerger = () => {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    if (selectedFiles.length === 0) {
      setError('Please select valid PDF files.');
      return;
    }
    setError('');
    setMergedPdfUrl(null);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please upload at least 2 PDF files to merge.');
      return;
    }

    try {
      setIsMerging(true);
      setError('');
      
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      setError('Failed to merge PDFs. Please make sure files are not password-protected.');
      console.error(err);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div>
      {/* Upload Dropzone */}
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
      onClick={() => document.getElementById('pdf-upload-input').click()}
      >
        <input
          id="pdf-upload-input"
          type="file"
          accept=".pdf"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <FileUp size={40} style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
          Click to upload or drag & drop PDFs
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Select 2 or more PDF documents. 100% private — processed locally in your browser.
        </p>
      </div>

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

      {/* File List with Reordering */}
      {files.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Selected Files ({files.length})
            </span>
            <button
              onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.78rem' }}
            >
              Clear All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <FileText size={20} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {idx + 1}. {file.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => moveFile(idx, -1)}
                    disabled={idx === 0}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.25rem 0.5rem' }}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 1)}
                    disabled={idx === files.length - 1}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.25rem 0.5rem' }}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.25rem 0.5rem' }}
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="tool-actions">
        <Button
          variant="primary"
          onClick={mergePdfs}
          disabled={files.length < 2 || isMerging}
        >
          {isMerging ? 'Merging PDFs...' : 'Merge PDFs'}
        </Button>

        {mergedPdfUrl && (
          <a
            href={mergedPdfUrl}
            download="merged_document.pdf"
            className="btn btn-primary"
            style={{ textDecoration: 'none', background: 'var(--success-color)' }}
          >
            <Download size={16} /> Download Merged PDF
          </a>
        )}
      </div>

      {mergedPdfUrl && (
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
            <strong>PDFs Merged Successfully!</strong>
            <div style={{ fontSize: '0.85rem' }}>Your combined PDF is ready to download.</div>
          </div>
        </div>
      )}
    </div>
  );
};
