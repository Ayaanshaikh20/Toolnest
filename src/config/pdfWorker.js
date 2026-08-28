import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker to use locally bundled Vite worker asset (100% offline & no 404s)
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  } catch (err) {
    console.warn('[PDF.js] Failed to assign local worker url, falling back to unpkg CDN:', err);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }
}

export { pdfjsLib };
