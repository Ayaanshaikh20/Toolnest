import * as pdfjsLib from 'pdfjs-dist';

// Use static public worker URL for zero-friction cross-origin production deployment
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export { pdfjsLib };
export default pdfjsLib;
