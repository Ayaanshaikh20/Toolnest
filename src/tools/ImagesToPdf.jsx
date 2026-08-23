import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../components/Button';
import { FileImage, Download, Trash2, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';

export const ImagesToPdf = () => {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('fit'); // 'fit' | 'a4'
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (selectedFiles.length === 0) {
      setError('Please select valid JPG or PNG image files.');
      return;
    }
    setError('');
    setPdfUrl(null);

    const newImages = selectedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].previewUrl);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPdfUrl(null);
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const target = index + direction;
    if (target < 0 || target >= newImages.length) return;
    const temp = newImages[index];
    newImages[index] = newImages[target];
    newImages[target] = temp;
    setImages(newImages);
    setPdfUrl(null);
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');

      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const imageBytes = await item.file.arrayBuffer();
        let embeddedImage;

        if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        } else {
          // PNG or convert canvas for webp
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        }

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        if (pageSize === 'fit') {
          // Page matches exact image dimensions
          const page = pdfDoc.addPage([imgWidth, imgHeight]);
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight
          });
        } else {
          // Standard A4: 595.28 x 841.89 points
          const a4Width = 595.28;
          const a4Height = 841.89;
          const page = pdfDoc.addPage([a4Width, a4Height]);

          const scale = Math.min((a4Width - 40) / imgWidth, (a4Height - 40) / imgHeight);
          const drawWidth = imgWidth * scale;
          const drawHeight = imgHeight * scale;
          const x = (a4Width - drawWidth) / 2;
          const y = (a4Height - drawHeight) / 2;

          page.drawImage(embeddedImage, {
            x,
            y,
            width: drawWidth,
            height: drawHeight
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError('Failed to convert images to PDF. If using WebP, please convert to JPG or PNG first.');
      console.error(err);
    } finally {
      setIsGenerating(false);
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
      onClick={() => document.getElementById('img-to-pdf-input').click()}
      >
        <input
          id="img-to-pdf-input"
          type="file"
          accept="image/jpeg, image/png"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <FileImage size={40} style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
          Click to upload JPG / PNG photos
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Combine multiple photos into a single PDF document. 100% private in-browser.
        </p>
      </div>

      {/* Page Size Option */}
      {images.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'var(--bg-color)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          flexWrap: 'wrap'
        }}>
          <label style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            Page Format:
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="radio"
                name="pageSize"
                value="fit"
                checked={pageSize === 'fit'}
                onChange={() => setPageSize('fit')}
              />
              Fit Image Size
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="radio"
                name="pageSize"
                value="a4"
                checked={pageSize === 'a4'}
                onChange={() => setPageSize('a4')}
              />
              Standard A4 Page
            </label>
          </div>
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

      {/* Image Grid / List */}
      {images.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Selected Images ({images.length})
            </span>
            <button
              onClick={() => { setImages([]); setPdfUrl(null); }}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.78rem' }}
            >
              Clear All
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {images.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                style={{
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={item.previewUrl}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '110px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '0.5rem'
                  }}
                />
                <div style={{ fontSize: '0.75rem', fontWeight: '600', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', marginBottom: '0.375rem', color: 'var(--text-main)' }}>
                  {idx + 1}. {item.name}
                </div>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => moveImage(idx, -1)}
                    disabled={idx === 0}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                    title="Move Left"
                  >
                    <ArrowUp size={12} style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                  <button
                    onClick={() => moveImage(idx, 1)}
                    disabled={idx === images.length - 1}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                    title="Move Right"
                  >
                    <ArrowDown size={12} style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                  <button
                    onClick={() => removeImage(idx)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                    title="Delete"
                  >
                    <Trash2 size={12} />
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
          onClick={generatePdf}
          disabled={images.length === 0 || isGenerating}
        >
          {isGenerating ? 'Converting Images...' : 'Convert to PDF'}
        </Button>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download="images_document.pdf"
            className="btn btn-primary"
            style={{ textDecoration: 'none', background: 'var(--success-color)' }}
          >
            <Download size={16} /> Download PDF
          </a>
        )}
      </div>

      {pdfUrl && (
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
            <strong>PDF Created Successfully!</strong>
            <div style={{ fontSize: '0.85rem' }}>Your PDF file is ready to download.</div>
          </div>
        </div>
      )}
    </div>
  );
};
