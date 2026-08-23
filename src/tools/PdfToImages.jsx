import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Button } from '../components/Button';
import { FileUp, Download, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

// Configure pdfjs worker to unpkg/cdnjs CDN for reliable client-side rendering
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

export const PdfToImages = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [scale, setScale] = useState(2); // 2x for high-res

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    try {
      setError('');
      setPages([]);
      setFile(selectedFile);
      setIsProcessing(true);

      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const renderedPages = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        const dataUrl = canvas.toDataURL('image/png');

        renderedPages.push({
          pageNumber: i,
          dataUrl,
          width: viewport.width,
          height: viewport.height
        });
      }

      setPages(renderedPages);
    } catch (err) {
      console.error(err);
      setError('Failed to extract images from PDF. The document may be protected or unsupported.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    pages.forEach(p => {
      const a = document.createElement('a');
      a.href = p.dataUrl;
      a.download = `page_${p.pageNumber}.png`;
      a.click();
    });
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
      onClick={() => document.getElementById('pdf-to-img-input').click()}
      >
        <input
          id="pdf-to-img-input"
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <ImageIcon size={40} style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
          Click to upload PDF document
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Converts all PDF pages into high-resolution PNG images. 100% private in-browser.
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

      {isProcessing && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '1rem', fontWeight: '600' }}>Converting PDF pages to images...</div>
          <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Rendering high-resolution canvas</div>
        </div>
      )}

      {/* Rendered Pages Grid */}
      {pages.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Converted Pages ({pages.length})
            </span>
            <Button variant="primary" onClick={downloadAll}>
              <Download size={16} /> Download All ({pages.length} PNGs)
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {pages.map((p) => (
              <div
                key={p.pageNumber}
                style={{
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img
                  src={p.dataUrl}
                  alt={`Page ${p.pageNumber}`}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'contain',
                    background: '#fff',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '0.75rem'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Page {p.pageNumber}
                  </span>
                  <a
                    href={p.dataUrl}
                    download={`page_${p.pageNumber}.png`}
                    className="btn btn-outline btn-sm"
                    style={{ textDecoration: 'none', padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Download size={13} /> PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
