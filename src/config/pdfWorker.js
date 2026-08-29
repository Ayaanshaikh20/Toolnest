import * as pdfjsLib from 'pdfjs-dist';

// Use .js worker extension to prevent server MIME type text/html fallback on production hosts
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export { pdfjsLib };
export default pdfjsLib;
