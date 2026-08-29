import React from 'react';

// Color theme palette for vector icons
const C = {
  pdf: '#EF4444',
  pdfDark: '#B91C1C',
  pdfLight: '#FEE2E2',
  dev: '#3B82F6',
  devDark: '#1D4ED8',
  devLight: '#DBEAFE',
  img: '#8B5CF6',
  imgDark: '#6D28D9',
  imgLight: '#EDE9FE',
  txt: '#10B981',
  txtDark: '#047857',
  txtLight: '#D1FAE5',
  conv: '#F59E0B',
  convDark: '#B45309',
  convLight: '#FEF3C7',
  calc: '#06B6D4',
  calcDark: '#0E7490',
  calcLight: '#CFFAFE',
  util: '#6366F1',
  utilDark: '#4338CA',
  utilLight: '#E0E7FF',
  seo: '#EC4899',
  seoDark: '#BE185D',
  seoLight: '#FCE7F3',
};

export const CustomToolIcon = ({ slug, size = 28, className = '' }) => {
  const s = size;

  switch (slug) {
    // ── PDF MERGER: Two PDF files merging into one ──
    case 'pdf-merger':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* File 1 (Left PDF) */}
          <rect x="2" y="4" width="11" height="15" rx="2" fill={C.pdf} opacity="0.85" />
          <path d="M5 8H10M5 11H9M5 14H8" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="7" y="5" width="4" height="2" fill="#FFF" opacity="0.6" rx="0.5" />
          
          {/* File 2 (Right PDF) */}
          <rect x="19" y="4" width="11" height="15" rx="2" fill={C.pdf} opacity="0.85" />
          <path d="M22 8H27M22 11H26M22 14H25" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="24" y="5" width="4" height="2" fill="#FFF" opacity="0.6" rx="0.5" />

          {/* Merge Arrow Down */}
          <path d="M8 20L16 25L24 20" stroke={C.pdfDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Combined Output PDF (Bottom center) */}
          <rect x="10" y="15" width="12" height="15" rx="2" fill={C.pdf} />
          <path d="M13 19H19M13 22H18M13 25H17" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16" cy="22" r="6" fill="#10B981" />
          <path d="M14 22L15.5 23.5L18.5 20.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ── PDF SPLITTER: PDF page being cut in half by scissors ──
    case 'pdf-splitter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* PDF Page 1 (Left Half) */}
          <rect x="3" y="4" width="12" height="24" rx="2" fill={C.pdf} />
          <path d="M6 9H12M6 13H11M6 17H10M6 21H12" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />

          {/* PDF Page 2 (Right Half - Offset) */}
          <rect x="17" y="4" width="12" height="24" rx="2" fill={C.pdf} opacity="0.75" />
          <path d="M20 9H26M20 13H25M20 17H24M20 21H26" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />

          {/* Dashed Cut Line */}
          <line x1="16" y1="3" x2="16" y2="29" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 3" />

          {/* Scissors Icon in Center */}
          <circle cx="12" cy="25" r="2.5" stroke="#FFF" strokeWidth="1.5" fill="#374151" />
          <circle cx="20" cy="25" r="2.5" stroke="#FFF" strokeWidth="1.5" fill="#374151" />
          <path d="M13.5 23.5L18.5 17.5M18.5 23.5L13.5 17.5" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    // ── IMAGES TO PDF: Image photos converting into a PDF doc ──
    case 'images-to-pdf':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Image Card 1 */}
          <rect x="3" y="5" width="13" height="13" rx="2" fill={C.img} />
          <circle cx="7" cy="9" r="1.5" fill="#FFF" />
          <path d="M4 16L7 13L10 16L13 12L15 15" stroke="#FFF" strokeWidth="1.2" strokeLinejoin="round" />

          {/* Arrow */}
          <path d="M15 11L19 11M17 9L19 11L17 13" stroke={C.convDark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Target PDF */}
          <rect x="16" y="10" width="13" height="17" rx="2" fill={C.pdf} />
          <path d="M19 15H26M19 18H25M19 21H24" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />
          <rect x="22" y="11" width="5" height="3" fill="#FFF" opacity="0.8" rx="0.5" />
        </svg>
      );

    // ── PDF TO IMAGES: PDF file expanding into image cards ──
    case 'pdf-to-images':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Source PDF */}
          <rect x="3" y="7" width="13" height="17" rx="2" fill={C.pdf} />
          <path d="M6 12H13M6 15H12M6 18H11" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />

          {/* Arrow */}
          <path d="M15 15L19 15M17 13L19 15L17 17" stroke={C.imgDark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Extracted Image 1 */}
          <rect x="18" y="4" width="11" height="11" rx="2" fill={C.img} />
          <circle cx="21" cy="7" r="1.2" fill="#FFF" />
          <path d="M19 13L21 11L24 13.5L26 11.5L28 13.5" stroke="#FFF" strokeWidth="1.1" strokeLinejoin="round" />

          {/* Extracted Image 2 */}
          <rect x="18" y="17" width="11" height="11" rx="2" fill="#3B82F6" />
          <circle cx="21" cy="20" r="1.2" fill="#FFF" />
          <path d="M19 26L22 23L25 25.5L28 22.5" stroke="#FFF" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );

    // ── PDF COMPRESSOR: PDF document with downward compression arrows & size reduction ──
    case 'pdf-compressor':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Main PDF Document */}
          <rect x="5" y="4" width="22" height="24" rx="3" fill={C.pdf} />
          {/* Document Fold */}
          <path d="M21 4L27 10H23C21.8954 10 21 9.10457 21 8V4Z" fill="#B91C1C" />
          {/* Content Lines */}
          <path d="M9 11H18M9 15H17M9 19H15" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
          
          {/* Compression Arrows Top & Bottom pointing inwards */}
          <circle cx="21" cy="21" r="7.5" fill="#10B981" />
          {/* Inward compression arrows in badge */}
          <path d="M21 16V20M21 20L19 18M21 20L23 18" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 26V22M21 22L19 24M21 22L23 24" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="17.5" y1="21" x2="24.5" y2="21" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 1" />
        </svg>
      );


    // ── AI BACKGROUND REMOVER: Magic wand removing background on checkerboard ──
    case 'background-remover':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Checkerboard Pattern background */}
          <rect x="4" y="4" width="24" height="24" rx="3" fill="#E5E7EB" />
          <path d="M4 4H16V16H4V4ZM16 16H28V28H16V16Z" fill="#9CA3AF" opacity="0.4" />
          
          {/* Foreground Isolated Person/Subject */}
          <path d="M16 8C13.8 8 12 9.8 12 12C12 14.2 13.8 16 16 16C18.2 16 20 14.2 20 12C20 9.8 18.2 8 16 8ZM10 24C10 20.7 12.7 18 16 18C19.3 18 22 20.7 22 24H10Z" fill={C.img} />

          {/* Magic Sparkle Wand */}
          <path d="M22 6L28 12M26 4L28 6M22 10L24 12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="6" r="1.5" fill="#F59E0B" />
        </svg>
      );

    // ── MARKDOWN CONVERTER: M↓ badge pointing to </> ──
    case 'markdown-converter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Markdown Box */}
          <rect x="3" y="6" width="12" height="20" rx="2" fill="#000" />
          <path d="M5 18V12L7.5 15L10 12V18M12 15L13.5 16.5L15 15M13.5 13V16.5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Exchange Arrow */}
          <path d="M15 14L18 14M15 18L18 18" stroke={C.dev} strokeWidth="1.6" strokeLinecap="round" />

          {/* HTML Box */}
          <rect x="17" y="6" width="12" height="20" rx="2" fill={C.dev} />
          <path d="M20 13L18.5 16L20 19M26 13L27.5 16L26 19M23.5 12.5L22 19.5" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ── CODE MINIFIER: Spaced out code contracting into tight braces ──
    case 'code-minifier':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#1E293B" />
          {/* Open Brace */}
          <path d="M9 10C7.5 10 7 11 7 13V15C7 15.5 6.5 16 6 16C6.5 16 7 16.5 7 17V19C7 21 7.5 22 9 22" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Compression Arrows */}
          <path d="M13 16H19M15 14L13 16L15 18M17 14L19 16L17 18" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Close Brace */}
          <path d="M23 10C24.5 10 25 11 25 13V15C25 15.5 25.5 16 26 16C25.5 16 25 16.5 25 17V19C25 21 24.5 22 23 22" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // ── JSON FORMATTER: Code tree structure with color brackets ──
    case 'json-formatter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="4" width="26" height="24" rx="3" fill="#0F172A" />
          <path d="M7 9C6 9 5.5 9.5 5.5 11V12.5C5.5 13 5 13.5 4.5 13.5C5 13.5 5.5 14 5.5 14.5V16C5.5 17.5 6 18 7 18" stroke="#F59E0B" strokeWidth="1.6" />
          <path d="M10 10H14M10 14H18M10 18H16M10 22H20" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M25 9C26 9 26.5 9.5 26.5 11V12.5C26.5 13 27 13.5 27.5 13.5C27 13.5 26.5 14 26.5 14.5V16C26.5 17.5 26 18 25 18" stroke="#F59E0B" strokeWidth="1.6" />
          <circle cx="22" cy="22" r="3.5" fill="#10B981" />
          <path d="M20.5 22L21.5 23L23.5 21" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // ── JSON VALIDATOR: Brackets with glowing Checkmark Shield ──
    case 'json-validator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="4" width="26" height="24" rx="3" fill="#0F172A" />
          <path d="M7 8H12M7 12H10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 9L23 12V17C23 21 16 24 16 24C16 24 9 21 9 17V12L16 9Z" fill="#10B981" />
          <path d="M13 16.5L15 18.5L19.5 14" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ── UUID GENERATOR: ID Card with 128-bit key string ──
    case 'uuid-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="6" width="26" height="20" rx="3" fill={C.dev} />
          <rect x="6" y="9" width="20" height="4" rx="1" fill="#1E3A8A" />
          <text x="7" y="12" fill="#60A5FA" fontSize="3" fontFamily="monospace" fontWeight="bold">UUID v4</text>
          <text x="6" y="18" fill="#FFF" fontSize="3.5" fontFamily="monospace">8444-4128</text>
          <path d="M6 21H22" stroke="#93C5FD" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <circle cx="24" cy="21" r="2.5" fill="#F59E0B" />
          <path d="M24 19.5V22.5M22.5 21H25.5" stroke="#FFF" strokeWidth="1" />
        </svg>
      );

    // ── BASE64 ENCODER/DECODER: "ABC" <-> "64" conversion ──
    case 'base64':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="6" width="12" height="20" rx="2" fill="#3B82F6" />
          <text x="5" y="19" fill="#FFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">TXT</text>

          <path d="M15 13L18 13M17 11L19 13L17 15M17 21L14 21M16 19L14 21L16 23" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="18" y="6" width="12" height="20" rx="2" fill="#8B5CF6" />
          <text x="19.5" y="19" fill="#FFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">64</text>
        </svg>
      );

    // ── URL ENCODER/DECODER: Link chain with %20 encoded URL ──
    case 'url-encoder':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#1E293B" />
          <path d="M9 13C9 11.3 10.3 10 12 10H15M17 10H20C21.7 10 23 11.3 23 13C23 14.7 21.7 16 20 16H17M12 16H15" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <rect x="6" y="19" width="20" height="5" rx="1" fill="#3B82F6" />
          <text x="7" y="23" fill="#FFF" fontSize="3.5" fontFamily="monospace" fontWeight="bold">https://%20</text>
        </svg>
      );

    // ── TIMESTAMP CONVERTER: Clock face with UNIX epoch timestamp numbers ──
    case 'timestamp-converter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="12" fill={C.util} />
          <circle cx="16" cy="16" r="9" fill="#1E1B4B" />
          <path d="M16 11V16L19.5 19.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.5" fill="#F59E0B" />
          <rect x="4" y="23" width="24" height="6" rx="1.5" fill="#10B981" />
          <text x="5.5" y="27.5" fill="#FFF" fontSize="3.8" fontFamily="monospace" fontWeight="bold">1718920400</text>
        </svg>
      );

    // ── PASSWORD GENERATOR: Lock shield with key and secure bullets ──
    case 'password-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 3L26 7V14C26 20.5 21.7 26.5 16 29C10.3 26.5 6 20.5 6 14V7L16 3Z" fill={C.txt} />
          {/* Lock Body */}
          <rect x="11" y="15" width="10" height="8" rx="1.5" fill="#047857" />
          <path d="M13 15V12C13 10.3 14.3 9 16 9C17.7 9 19 10.3 19 12V15" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16" cy="18" r="1" fill="#FFF" />
          <path d="M16 19V21" stroke="#FFF" strokeWidth="1.2" />
        </svg>
      );

    // ── WORD COUNTER: Document page with 123 word count badge ──
    case 'word-counter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="5" y="4" width="18" height="24" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M9 9H19M9 13H17M9 17H19M9 21H15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          {/* Count Badge */}
          <rect x="14" y="16" width="14" height="12" rx="2" fill={C.txt} />
          <text x="16" y="24" fill="#FFF" fontSize="6.5" fontWeight="bold" fontFamily="monospace">123</text>
        </svg>
      );

    // ── CASE CONVERTER: Aa (Capital A & lowercase a) transform symbol ──
    case 'case-converter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#475569" />
          <text x="6" y="21" fill="#FFF" fontSize="13" fontWeight="bold" fontFamily="serif">A</text>
          <text x="17" y="21" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">a</text>
          <path d="M14 9C17 9 19 11 19 13M19 13L17.5 11.5M19 13L20.5 11.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ── COLOR CONVERTER: Color palette wheel with #HEX dropper ──
    case 'color-converter':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="12" fill="#F59E0B" />
          <path d="M16 4C9.4 4 4 9.4 4 16C4 19.3 5.3 22.3 7.5 24.5C8 25 8.7 25 9.3 24.5C9.8 24 10.3 23 10.3 22C10.3 20.3 11.6 19 13.3 19H16C20.4 19 24 15.4 24 11V10C24 6.7 20.4 4 16 4Z" fill="#8B5CF6" />
          <circle cx="9" cy="11" r="2" fill="#EF4444" />
          <circle cx="15" cy="9" r="2" fill="#3B82F6" />
          <circle cx="21" cy="13" r="2" fill="#10B981" />
          <circle cx="11" cy="16" r="1.8" fill="#F59E0B" />
        </svg>
      );

    // ── IMAGE COMPRESSOR: Photo frame with compression inward arrows ──
    case 'image-compressor':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="4" width="24" height="24" rx="3" fill={C.img} />
          <circle cx="10" cy="10" r="2" fill="#FFF" />
          <path d="M6 22L12 15L17 21L21 17L26 23" stroke="#FFF" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Compression arrows */}
          <circle cx="16" cy="16" r="6" fill="#1E1B4B" opacity="0.9" />
          <path d="M12 12L15 15M20 20L17 17M20 12L17 15M12 20L15 17" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // ── IMAGE RESIZER: Photo frame with corner dimension handles ──
    case 'image-resizer':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="4" width="24" height="24" rx="3" fill={C.img} />
          <circle cx="10" cy="10" r="2" fill="#FFF" />
          <path d="M6 22L12 15L17 21L21 17L26 23" stroke="#FFF" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Resize handles */}
          <rect x="2" y="2" width="6" height="6" fill="#F59E0B" rx="1" />
          <rect x="24" y="2" width="6" height="6" fill="#F59E0B" rx="1" />
          <rect x="2" y="24" width="6" height="6" fill="#F59E0B" rx="1" />
          <rect x="24" y="24" width="6" height="6" fill="#F59E0B" rx="1" />
          <path d="M21 11L25 7M25 7H21M25 7V11" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ── JPG TO PNG: JPG badge converting to PNG ──
    case 'jpg-to-png':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="2" y="7" width="13" height="18" rx="2" fill="#EA580C" />
          <text x="3.5" y="18" fill="#FFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">JPG</text>

          <path d="M15 16L18 16M17 14L19 16L17 18" stroke={C.convDark} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="18" y="7" width="12" height="18" rx="2" fill="#059669" />
          <text x="19.5" y="18" fill="#FFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">PNG</text>
        </svg>
      );

    // ── PNG TO JPG: PNG badge converting to JPG ──
    case 'png-to-jpg':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="2" y="7" width="13" height="18" rx="2" fill="#059669" />
          <text x="3" y="18" fill="#FFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">PNG</text>

          <path d="M15 16L18 16M17 14L19 16L17 18" stroke={C.convDark} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="18" y="7" width="12" height="18" rx="2" fill="#EA580C" />
          <text x="19.5" y="18" fill="#FFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">JPG</text>
        </svg>
      );

    // ── PERCENTAGE CALCULATOR: % symbol with calculator ──
    case 'percentage-calculator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="4" width="24" height="24" rx="4" fill={C.calc} />
          <rect x="7" y="7" width="18" height="6" rx="1.5" fill="#0E7490" />
          <text x="17" y="11.5" fill="#FFF" fontSize="4.5" fontFamily="monospace" fontWeight="bold">%</text>
          <circle cx="10" cy="17" r="1.8" fill="#FFF" />
          <circle cx="16" cy="17" r="1.8" fill="#FFF" />
          <circle cx="22" cy="17" r="1.8" fill="#F59E0B" />
          <circle cx="10" cy="22" r="1.8" fill="#FFF" />
          <circle cx="16" cy="22" r="1.8" fill="#FFF" />
          <circle cx="22" cy="22" r="1.8" fill="#10B981" />
        </svg>
      );

    // ── QR CODE GENERATOR: Detailed QR Code with scanner beam ──
    case 'qr-code-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="3" width="26" height="26" rx="3" fill="#0F172A" />
          {/* Top-Left Finder */}
          <rect x="6" y="6" width="7" height="7" fill="#38BDF8" rx="1" />
          <rect x="8" y="8" width="3" height="3" fill="#0F172A" />
          {/* Top-Right Finder */}
          <rect x="19" y="6" width="7" height="7" fill="#38BDF8" rx="1" />
          <rect x="21" y="8" width="3" height="3" fill="#0F172A" />
          {/* Bottom-Left Finder */}
          <rect x="6" y="19" width="7" height="7" fill="#38BDF8" rx="1" />
          <rect x="8" y="21" width="3" height="3" fill="#0F172A" />
          {/* Matrix pixels */}
          <rect x="15" y="6" width="2" height="4" fill="#38BDF8" />
          <rect x="15" y="12" width="4" height="2" fill="#38BDF8" />
          <rect x="19" y="16" width="4" height="4" fill="#F59E0B" />
          <rect x="25" y="21" width="2" height="4" fill="#38BDF8" />
          {/* Laser Scan Red Beam */}
          <line x1="3" y1="16" x2="29" y2="16" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="1 1" />
        </svg>
      );

    // ── HASH GENERATOR: Lock + SHA cryptographic hash string ──
    case 'hash-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#1E1B4B" />
          <text x="6" y="14" fill="#818CF8" fontSize="6" fontWeight="bold" fontFamily="monospace">SHA-256</text>
          <text x="6" y="21" fill="#34D399" fontSize="4.5" fontFamily="monospace">e3b0c442</text>
          <circle cx="23" cy="18" r="3.5" fill="#F59E0B" />
          <path d="M23 16V17.5M23 18.5V19.5" stroke="#FFF" strokeWidth="1" />
        </svg>
      );

    // ── LOREM IPSUM GENERATOR: Text document with "Lorem" stamp ──
    case 'lorem-ipsum-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="5" y="4" width="22" height="24" rx="2" fill="#FFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M9 9H23M9 13H21M9 17H23M9 21H18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="12" y="14" width="14" height="11" rx="2" fill="#8B5CF6" transform="rotate(-6 12 14)" />
          <text x="13.5" y="22" fill="#FFF" fontSize="4.5" fontWeight="bold" fontFamily="serif" transform="rotate(-6 12 14)">Lorem</text>
        </svg>
      );

    // ── REGEX TESTER: Code search glass over /regex/g ──
    case 'regex-tester':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#0F172A" />
          <text x="6" y="16" fill="#F43F5E" fontSize="6.5" fontWeight="bold" fontFamily="monospace">/.*[a-z]/g</text>
          <circle cx="21" cy="19" r="4.5" fill="#3B82F6" stroke="#FFF" strokeWidth="1.5" />
          <line x1="24.5" y1="22.5" x2="27.5" y2="25.5" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ── TEXT DIFF CHECKER: Two text files side-by-side with + and - line highlights ──
    case 'text-diff-checker':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* File 1 (Old) */}
          <rect x="3" y="5" width="12" height="22" rx="2" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.2" />
          <path d="M6 10H12M6 14H11" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="5" y="17" width="8" height="3" fill="#F85149" opacity="0.3" rx="0.5" />
          <path d="M6 18.5H11" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />

          {/* File 2 (New) */}
          <rect x="17" y="5" width="12" height="22" rx="2" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.2" />
          <path d="M20 10H26M20 14H25" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="19" y="17" width="8" height="3" fill="#3FB950" opacity="0.3" rx="0.5" />
          <path d="M20 18.5H25" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // ── META TAG GENERATOR: <meta> tag badge with Google search preview ──
    case 'meta-tag-generator':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="22" rx="3" fill="#1E293B" />
          <text x="5" y="13" fill="#EC4899" fontSize="5" fontWeight="bold" fontFamily="monospace">&lt;meta&gt;</text>
          <rect x="5" y="16" width="22" height="8" rx="1.5" fill="#0F172A" />
          <text x="7" y="20" fill="#60A5FA" fontSize="3.2" fontFamily="sans-serif" fontWeight="bold">ToolNest - Free Tools</text>
          <text x="7" y="23" fill="#94A3B8" fontSize="2.5" fontFamily="sans-serif">toolnest.shaikhayaan.com</text>
        </svg>
      );

    // ── TOOLNEST STUDIO: 3D Mockup Generator ──
    case 'mockup-studio':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Gradient Background */}
          <rect x="2" y="4" width="28" height="24" rx="4" fill="url(#paint0_linear)" />
          
          {/* 3D Browser Mockup Window */}
          <g filter="url(#filter0_d)">
            <rect x="6" y="8" width="20" height="14" rx="1.5" fill="#1E293B" stroke="#334155" strokeWidth="0.5" />
            <rect x="6.5" y="8.5" width="19" height="3" fill="#0F172A" />
            <circle cx="8.5" cy="10" r="0.75" fill="#EF4444" />
            <circle cx="11" cy="10" r="0.75" fill="#F59E0B" />
            <circle cx="13.5" cy="10" r="0.75" fill="#10B981" />
            
            {/* Inner Content (Screenshot) */}
            <rect x="8" y="13" width="16" height="7" rx="0.5" fill="#3B82F6" opacity="0.8" />
            <path d="M10 16L14 14L16 17L20 15" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          <defs>
            <linearGradient id="paint0_linear" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F472B6" />
              <stop offset="0.5" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="filter0_d" x="4" y="6" width="24" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.4" />
            </filter>
          </defs>
        </svg>
      );

    // Default Fallback
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#3B82F6" />
          <path d="M12 12L20 20M20 12L12 20" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
