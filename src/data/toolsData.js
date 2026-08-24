export const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'developer', name: 'Developer' },
  { id: 'image', name: 'Image' },
  { id: 'text', name: 'Text' },
  { id: 'converter', name: 'Converters' },
  { id: 'calculator', name: 'Calculators' },
  { id: 'utility', name: 'Utility' },
  { id: 'seo', name: 'SEO' },
];

export const TOOLS_DATA = [
  {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine and merge multiple PDF files into one single organized PDF document in seconds.',
    category: 'pdf',
    icon: 'Layers',
    isPopular: true,
    metaTitle: 'Free Online PDF Merger - Combine Multiple PDFs | ToolNest',
    metaDescription: 'Merge PDF files online for free. Combine multiple PDF documents into one single file with drag & drop reordering. 100% private in-browser processing.',
    about: 'PDF Merger is a high-speed, privacy-first web utility that allows you to combine multiple PDF documents into a single cohesive file directly in your browser. Unlike traditional online PDF tools that upload your sensitive documents to remote servers, ToolNest processes every page locally using WebAssembly and client-side JavaScript. This ensures your financial records, legal contracts, invoices, and academic notes remain 100% confidential and safe on your device.',
    whatIs: {
      heading: 'What is PDF Merging & How Does It Work?',
      content: [
        'A Portable Document Format (PDF) file contains complex cross-reference tables (XREFs), embedded font tables, and content streams that define layout geometry. Merging PDFs involves extracting the page trees from each source document, re-indexing their internal object references, and appending them into a unified catalog structure.',
        'Client-side PDF merging reads each file as an ArrayBuffer in browser memory, reconstructs the object graph using pdf-lib, and writes out a clean combined binary stream. Because all computation occurs on your local hardware CPU, merging large multi-page files is nearly instantaneous without any network bandwidth delay.'
      ]
    },
    howToUse: [
      'Click the upload dropzone or drag and drop two or more PDF files from your computer or phone.',
      'Use the Up and Down arrow buttons next to each file to arrange your desired page sequence.',
      'Click the "Merge PDFs" button to initiate the local client-side compilation.',
      'Click "Download Merged PDF" to save the combined document directly to your device.'
    ],
    features: [
      { title: '100% Client-Side Privacy', description: 'Your PDF files are never uploaded to any cloud server or third-party storage.' },
      { title: 'Custom File Ordering', description: 'Easily rearrange the sequence of uploaded documents before merging.' },
      { title: 'Zero File Size Limits', description: 'Merge as many documents as your local device RAM can comfortably handle.' },
      { title: 'Preserved Formatting & Quality', description: 'Maintains original vector text sharpness, images, bookmarks, and font embeddings.' }
    ],
    examples: [
      {
        title: 'Monthly Expense Reports',
        description: 'Combine separate scanned receipt PDFs and an Excel summary export into one unified document for accounting review.'
      },
      {
        title: 'Academic & Research Papers',
        description: 'Merge cover pages, main thesis chapters, and appendix documents into a single publication-ready PDF.'
      }
    ],
    faqs: [
      { question: 'Are my PDF files uploaded to your server?', answer: 'No! All merging is executed strictly client-side inside your browser memory using WebAssembly & JavaScript. Your sensitive PDFs never leave your machine.' },
      { question: 'Is there a limit to how many PDFs I can merge?', answer: 'There are no artificial limits. You can combine as many PDF files as your computer or phone memory can handle.' },
      { question: 'Can I merge password-protected PDF files?', answer: 'You must remove the password from protected PDFs before merging, as client-side parsers require decrypted document streams.' },
      { question: 'Will merging PDFs reduce the quality of text or images?', answer: 'No. PDF Merger performs a lossless binary merge, preserving all original vector paths, high-resolution raster images, and embedded fonts.' },
      { question: 'Can I reorder the files before merging?', answer: 'Yes. Use the up and down arrow buttons next to each uploaded file to position them in your exact preferred sequence.' }
    ],
    relatedSlugs: ['pdf-splitter', 'images-to-pdf', 'pdf-to-images']
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific pages or page ranges (e.g. 1-3, 5, 8-10) from any PDF into a new document.',
    category: 'pdf',
    icon: 'Scissors',
    isPopular: true,
    metaTitle: 'Free Online PDF Splitter & Page Extractor | ToolNest',
    metaDescription: 'Extract specific pages or ranges from PDF files online for free. Fast, secure, and 100% client-side with no file uploads.',
    about: 'PDF Splitter enables you to extract specific pages or custom page ranges from any PDF document without relying on expensive software or uploading private files to third-party servers. Whether you need to pull a single signature page from a 50-page contract or extract a specific chapter from an eBook, ToolNest builds your new customized PDF in seconds directly inside your browser.',
    whatIs: {
      heading: 'How Does PDF Page Extraction Work?',
      content: [
        'PDF page extraction selectively reads the internal page dictionary of a source document and copies only the requested page object references into a fresh, standalone PDFDocument instance. This process decouples unreferenced resources (such as unused images and font subsets on omitted pages), resulting in a lightweight, focused output document.',
        'Because ToolNest processes the document entirely in your local browser memory, you can split sensitive corporate filings, medical forms, and personal tax returns with complete confidence that your data remains confidential.'
      ]
    },
    howToUse: [
      'Upload the PDF document you want to extract pages from.',
      'Review the total page count and file information displayed on screen.',
      'Enter your desired page numbers or ranges (e.g., "1-3, 5, 8-10") into the input field.',
      'Click "Extract & Download" to generate and save your new tailored PDF.'
    ],
    features: [
      { title: 'Flexible Range Syntax', description: 'Supports individual pages (e.g., 1, 4), continuous ranges (e.g., 5-10), and mixed combinations.' },
      { title: 'Instant In-Browser Execution', description: 'Zero upload or download delay—extraction occurs directly in your browser memory.' },
      { title: 'Lossless Quality', description: 'Extracted pages retain 100% of original vector typography, links, and high-res imagery.' },
      { title: 'Zero Registration', description: 'Free forever with no account creation, paywalls, or daily extraction limits.' }
    ],
    examples: [
      {
        title: 'Extracting Contract Signatures',
        description: 'Enter "1, 24" to extract just the title page and the final execution signature page from a long legal agreement.'
      },
      {
        title: 'Isolating Specific Book Chapters',
        description: 'Enter "45-72" to extract a single assigned reading chapter from a comprehensive academic textbook.'
      }
    ],
    faqs: [
      { question: 'How do I specify page ranges?', answer: 'You can use commas and hyphens. For example: "1-3" extracts pages 1, 2, and 3. "1, 5, 9-12" extracts pages 1, 5, 9, 10, 11, and 12.' },
      { question: 'Is my data secure when splitting confidential documents?', answer: 'Yes! Processing happens entirely in your local browser. No files or text data are transmitted over the internet.' },
      { question: 'What happens if I enter an invalid page number?', answer: 'The tool validates your input range against the total page count and alerts you immediately if a page number is out of bounds.' },
      { question: 'Will the extracted PDF keep high resolution?', answer: 'Yes. The tool copies original vector paths, embedded fonts, and raster images without re-compressing or degrading resolution.' },
      { question: 'Can I split encrypted or password-protected PDFs?', answer: 'You must unlock or decrypt the PDF before extracting pages, as browser cryptography requires access to the document stream.' }
    ],
    relatedSlugs: ['pdf-merger', 'images-to-pdf', 'pdf-to-images']
  },
  {
    slug: 'images-to-pdf',
    name: 'Images to PDF Converter',
    description: 'Convert and combine multiple JPG and PNG images into a clean, multi-page PDF document.',
    category: 'pdf',
    icon: 'FileImage',
    isPopular: true,
    metaTitle: 'Free Images to PDF Converter (JPG, PNG to PDF) | ToolNest',
    metaDescription: 'Convert JPG, JPEG, and PNG images into a PDF document online for free. Reorder photos, choose page formats, and download your PDF instantly.',
    about: 'Images to PDF Converter makes it effortless to compile digital photos, scanned paper documents, receipts, graphics, and artwork into a single, beautifully organized multi-page PDF. Choose between exact image-fitting dimensions or standard A4 page layouts with centered margins, rearrange your photos in any sequence, and download a polished PDF in seconds.',
    whatIs: {
      heading: 'Understanding Image-to-PDF Conversion',
      content: [
        'A PDF document wraps binary image data (JPEG streams or FlateDecode-compressed PNG streams) inside an XObject image dictionary, placing it onto vector page canvases defined by point coordinates (where 72 points equals 1 inch).',
        'When converting images, you can either create canvas dimensions matching the exact pixel dimensions of each photo ("Fit Image Size") or scale photos proportionally onto a standardized ISO A4 page (595.28 × 841.89 points). ToolNest handles this scaling and coordinate placement locally in memory.'
      ]
    },
    howToUse: [
      'Click the upload zone or drag & drop multiple JPG or PNG image files.',
      'Use the arrow buttons to rearrange photos into your desired page sequence.',
      'Select your preferred page format: "Fit Image Size" or "Standard A4 Page".',
      'Click "Convert to PDF" and download your newly compiled document.'
    ],
    features: [
      { title: 'Multi-Image Batch Compilation', description: 'Upload and convert dozens of photos into a single PDF document in one click.' },
      { title: 'Visual Reordering Controls', description: 'Easily shift photo positions left or right before finalizing your PDF.' },
      { title: 'Dual Page Layout Modes', description: 'Choose between native photo dimensions or standardized printable A4 sheets.' },
      { title: 'Client-Side Privacy', description: 'Your photos stay in your local browser memory and are never uploaded to any server.' }
    ],
    examples: [
      {
        title: 'Expense Receipt Compilations',
        description: 'Take photos of physical receipts with your smartphone, upload them, and compile an orderly multi-page A4 expense document.'
      },
      {
        title: 'Creative Portfolios',
        description: 'Combine high-resolution PNG graphic designs into a polished portfolio PDF for client presentations.'
      }
    ],
    faqs: [
      { question: 'What image formats are supported?', answer: 'ToolNest currently supports JPG, JPEG, and PNG image formats.' },
      { question: 'What is the difference between "Fit Image Size" and "Standard A4 Page"?', answer: '"Fit Image Size" creates page boundaries matching the exact dimensions of each photo. "Standard A4 Page" places images centered on a standard 8.27 × 11.69 inch printable page.' },
      { question: 'Can I reorder the images before creating the PDF?', answer: 'Yes. Use the arrow buttons on each image card to move photos into your exact preferred page order.' },
      { question: 'Does converting images to PDF reduce their visual quality?', answer: 'No. Images are embedded directly using high-fidelity binary streams, preserving their original resolution and sharpness.' },
      { question: 'Is there a limit on how many images I can merge into one PDF?', answer: 'There is no artificial limit. You can compile as many images as your computer or smartphone RAM can handle.' }
    ],
    relatedSlugs: ['pdf-to-images', 'pdf-merger', 'image-compressor']
  },
  {
    slug: 'pdf-to-images',
    name: 'PDF to Images Converter',
    description: 'Convert every page of a PDF document into high-resolution PNG photos with 1-click download.',
    category: 'pdf',
    icon: 'Image',
    isPopular: true,
    metaTitle: 'Free PDF to Images Converter (PDF to PNG) | ToolNest',
    metaDescription: 'Convert PDF pages into high-resolution PNG images online for free. Render pages with high quality and download individual pages or all at once.',
    about: 'PDF to Images Converter renders each page of your PDF document into a crisp, high-resolution PNG graphic directly in your browser using Mozilla\'s PDF.js rendering engine. Extract presentation slides, vector charts, certificates, or digital documents for effortless sharing on social media, inserting into slide decks, or embedding into web applications.',
    whatIs: {
      heading: 'How Does Browser-Based PDF Rasterization Work?',
      content: [
        'Rasterizing a PDF involves executing the vector display list commands contained within the document—interpreting Bézier curves, text glyphs, font tables, and color spaces—and drawing them onto an HTML5 <canvas> element.',
        'ToolNest renders pages at a sharp 2x viewport scale, doubling the pixel density to ensure fine text and subtle graphics remain crisp. Once drawn to canvas, the image data is exported as an uncompressed PNG data URI ready for instant download.'
      ]
    },
    howToUse: [
      'Upload any PDF document by clicking the upload area or dragging the file in.',
      'Wait a few moments while your browser renders each page into a high-res image.',
      'Preview the generated page images in the visual thumbnail gallery.',
      'Download individual page PNGs or click "Download All" to save every page.'
    ],
    features: [
      { title: 'High-Resolution 2x Rendering', description: 'Renders pages with double pixel density so small typography and line art stay sharp.' },
      { title: 'Individual & Batch Downloads', description: 'Download specific pages individually or download all pages with a single click.' },
      { title: 'Interactive Thumbnail Gallery', description: 'Inspect full-page previews directly in your browser before downloading.' },
      { title: 'Zero Cloud Uploads', description: 'All rendering is computed locally by your browser GPU/CPU for maximum confidentiality.' }
    ],
    examples: [
      {
        title: 'Sharing Slide Decks on LinkedIn',
        description: 'Convert PDF presentation slides into high-quality PNG images for carousel posts on social media platforms.'
      },
      {
        title: 'Extracting Digital Certificates',
        description: 'Turn a single-page PDF award or diploma into a PNG image to display on your portfolio website.'
      }
    ],
    faqs: [
      { question: 'What image format and resolution are produced?', answer: 'Pages are exported as high-resolution PNG images rendered at a 2x viewport scale for crisp typography and graphics.' },
      { question: 'Can I download all converted pages in one click?', answer: 'Yes! Click the "Download All" button to automatically trigger downloads for every rendered page.' },
      { question: 'Are my confidential PDF documents uploaded to any server?', answer: 'No. The conversion runs strictly client-side inside your browser canvas. Your documents remain completely private.' },
      { question: 'Why convert a PDF to PNG images instead of JPEG?', answer: 'PNG uses lossless compression, ensuring text, diagrams, and sharp edges are preserved without JPEG block compression artifacts.' },
      { question: 'Can this tool process multi-page documents?', answer: 'Yes. The converter iterates through all pages in the PDF document sequentially and displays them in an organized gallery.' }
    ],
    relatedSlugs: ['images-to-pdf', 'pdf-merger', 'pdf-splitter']
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate custom QR codes for URLs, text, email, or phone. Choose colors, sizes, and error correction levels.',
    category: 'utility',
    icon: 'QrCode',
    isPopular: true,
    metaTitle: 'Free QR Code Generator Online - Custom Colors & High Res | ToolNest',
    metaDescription: 'Generate free QR codes for URLs, text, email, Wi-Fi, and more. Customize colors, size, and error correction. Download as high-res PNG instantly.',
    about: 'QR Code Generator enables you to create customized, high-resolution Quick Response (QR) codes for web links, contact details, email addresses, phone numbers, and plain text in real time. Customize foreground and background colors to match your brand palette, select from multiple export dimensions (128px to 1024px), and fine-tune error correction levels for flawless scanning reliability across all mobile camera apps.',
    whatIs: {
      heading: 'What is a QR Code & How Does It Work?',
      content: [
        'A Quick Response (QR) code is a two-dimensional matrix barcode invented in 1994 by Denso Wave. It encodes alphanumeric data into an array of black and white square modules, governed by position detection patterns at three corners that allow mobile cameras to identify the orientation and grid geometry instantly.',
        'QR codes utilize Reed-Solomon error correction algorithms. This mathematical redundancy allows codes to remain completely readable even if up to 30% of the symbol is obscured, damaged, or covered by a logo.'
      ]
    },
    howToUse: [
      'Type or paste your destination URL, text message, email, or phone number into the input area.',
      'The QR code generates automatically in real time in the preview pane.',
      'Adjust the export size (128px to 1024px) and select your desired error correction level (L, M, Q, H).',
      'Customize the QR module color and background color using the interactive color pickers.',
      'Click "Download PNG" to save the high-resolution QR code image to your device.'
    ],
    features: [
      { title: 'Custom Brand Colors', description: 'Select custom foreground and background colors with live visual preview.' },
      { title: 'Adjustable Error Correction', description: 'Choose from 4 Reed-Solomon levels (Low 7%, Medium 15%, Quartile 25%, High 30%).' },
      { title: 'High-Resolution Exports', description: 'Export crisp PNGs up to 1024 × 1024 pixels suitable for physical print media.' },
      { title: 'Static & Permanent', description: 'Generated QR codes are direct and static—they never expire and have no middleman redirects.' }
    ],
    examples: [
      {
        title: 'Restaurant Digital Menus',
        description: 'Encode your online menu URL and print high-res QR stickers for dining tables with customized brand colors.'
      },
      {
        title: 'Event & Conference Signage',
        description: 'Generate high-error-correction (H: 30%) QR codes for promotional banners and attendee check-in badges.'
      }
    ],
    faqs: [
      { question: 'What do the different error correction levels (L, M, Q, H) mean?', answer: 'Error correction determines how much damaged data can be recovered: L (7%), M (15%), Q (25%), and H (30%). Use "H" if you plan to print the QR code or place it in outdoor environments.' },
      { question: 'Do generated QR codes ever expire?', answer: 'No! These are static QR codes containing your direct raw URL or text. They will work indefinitely as long as your destination link exists.' },
      { question: 'Can I customize the colors and will it still scan?', answer: 'Yes! However, ensure there is high contrast between the foreground (darker) and background (lighter) colors for reliable camera scanning.' },
      { question: 'What is the maximum amount of data a QR code can hold?', answer: 'A standard QR code can store up to 7,089 numeric characters or 4,296 alphanumeric characters, though concise URLs scan fastest.' },
      { question: 'Are the QR codes created here tracked or redirected?', answer: 'No. ToolNest generates direct static QR codes. We do not insert redirect URLs, tracking cookies, or intermediate landing pages.' }
    ],
    relatedSlugs: ['url-encoder', 'base64', 'uuid-generator']
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes from any text instantly.',
    category: 'developer',
    icon: 'Hash',
    isPopular: true,
    metaTitle: 'Free SHA Hash Generator (SHA-256, SHA-512) | ToolNest',
    metaDescription: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes online for free. Instant, browser-based processing. Your data never leaves your device.',
    about: 'Hash Generator computes cryptographic hash digests from raw text, hexadecimal strings, or Base64 data using your browser\'s native Web Crypto API (SubtleCrypto). Essential for software engineers, security analysts, and system administrators, this tool provides instant SHA-1, SHA-256, SHA-384, and SHA-512 outputs without transmitting sensitive strings over the network.',
    whatIs: {
      heading: 'What is a Cryptographic Hash Function?',
      content: [
        'A cryptographic hash function is a mathematical algorithm that transforms an arbitrary block of data into a fixed-size string of hexadecimal characters (the hash digest). High-grade hash functions are deterministic (the same input always produces the exact same hash) and exhibit the "avalanche effect"—changing even a single bit of input flips approximately 50% of the output bits.',
        'Secure hash algorithms such as SHA-256 (part of the NSA-designed SHA-2 family) are computationally infeasible to invert (one-way property) and resistant to collisions (finding two different inputs that produce the same digest).'
      ]
    },
    howToUse: [
      'Choose your input encoding mode: Text (UTF-8), HEX, or Base64.',
      'Type or paste your input payload into the textarea.',
      'SHA-1, SHA-256, SHA-384, and SHA-512 digests are computed simultaneously in real time.',
      'Click the "Copy" button next to any hash value to copy it to your clipboard.'
    ],
    features: [
      { title: 'Simultaneous Multi-Algorithm Output', description: 'Generates SHA-1, SHA-256, SHA-384, and SHA-512 digests in parallel.' },
      { title: 'Flexible Input Formats', description: 'Supports standard UTF-8 text strings, raw hexadecimal bytes, and Base64 encoded streams.' },
      { title: 'Hardware-Accelerated Web Crypto', description: 'Leverages browser-native crypto.subtle for microsecond calculation speed.' },
      { title: 'Zero Network Exposure', description: 'Your sensitive tokens, passwords, and payloads never leave your browser window.' }
    ],
    examples: [
      {
        title: 'Verifying Downloaded File Integrity',
        description: 'Compute the SHA-256 hash of a string or payload and compare it against a publisher\'s published checksum.'
      },
      {
        title: 'API Authentication Signature Verification',
        description: 'Generate SHA-256 digests of webhook payloads to verify HMAC signatures during backend API development.'
      }
    ],
    faqs: [
      { question: 'What is the difference between hashing and encryption?', answer: 'Encryption is a two-way function where data is scrambled and can be decrypted with a key. Hashing is a one-way mathematical function that produces a fixed-length fingerprint and cannot be reversed.' },
      { question: 'Can a SHA-256 hash be decrypted or reversed?', answer: 'No. SHA-256 is mathematically irreversible. The original input cannot be extracted from the digest itself.' },
      { question: 'Why is SHA-1 no longer recommended for high-security applications?', answer: 'Cryptographers have demonstrated collision vulnerabilities in SHA-1. Modern security standards mandate SHA-256 or SHA-512 for digital signatures and TLS certificates.' },
      { question: 'What is a hash collision and can SHA-256 collide in practice?', answer: 'A collision occurs when two distinct inputs yield the identical digest. For SHA-256, the mathematical probability of finding a collision is 1 in 2^256, which is virtually impossible.' },
      { question: 'Are my input strings sent to any server?', answer: 'Never. All hashing calculations are executed strictly within your browser\'s JavaScript engine using window.crypto.subtle.' }
    ],
    relatedSlugs: ['password-generator', 'uuid-generator', 'base64']
  },
  {
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two blocks of text side-by-side and highlight line-by-line additions and deletions.',
    category: 'text',
    icon: 'GitDiff',
    isPopular: true,
    metaTitle: 'Free Online Text Diff Checker & Comparison Tool | ToolNest',
    metaDescription: 'Compare two text blocks online for free. Highlight added and removed lines instantly. Ideal for code review, document comparison, and finding changes.',
    about: 'Text Diff Checker compares two blocks of text or code line by line and visually highlights all additions, deletions, and modifications in real time. Perfect for software engineers reviewing code revisions, editors proofreading articles, and legal professionals checking contract amendments, this tool provides instant clarity on exactly what changed between two versions.',
    whatIs: {
      heading: 'How Diff Algorithms Compare Documents',
      content: [
        'Text comparison relies on the Longest Common Subsequence (LCS) problem, typically implemented using the Myers diff algorithm (the same foundational algorithm powering Git diff).',
        'The algorithm computes the shortest sequence of edit operations (insertions and deletions) required to transform the original text into the modified text. Added lines are demarcated with green highlights (`+`), while removed lines are highlighted in red (`-`), allowing you to inspect changes effortlessly.'
      ]
    },
    howToUse: [
      'Paste your original (older) text or code into the left input panel.',
      'Paste your revised (newer) text or code into the right input panel.',
      'The unified diff output updates instantly below with color-coded line markers.',
      'Use the "Swap Texts" button to reverse comparison, or click "Copy Diff" to export the change log.'
    ],
    features: [
      { title: 'Side-by-Side Dual Editor', description: 'Clean dual-pane input layout designed for fast comparison of long documents.' },
      { title: 'Live Metric Summary', description: 'Displays exact counts of added lines (+), removed lines (-), and unchanged lines.' },
      { title: 'Color-Coded Line Highlights', description: 'Green background for insertions and red background for deletions for high visual clarity.' },
      { title: '1-Click Diff Export', description: 'Copy the entire unified diff output with standard +/- patch formatting.' }
    ],
    examples: [
      {
        title: 'Comparing Code & Config Files',
        description: 'Paste original and refactored JSON or YAML configuration files to verify that no critical keys were unintentionally deleted.'
      },
      {
        title: 'Legal Contract Revision Checks',
        description: 'Compare two versions of an agreement or privacy policy to immediately detect added clauses or modified terms.'
      }
    ],
    faqs: [
      { question: 'How does the text diff tool detect additions and deletions?', answer: 'It calculates the Longest Common Subsequence between the two texts, highlighting lines unique to the new text as additions (+) and lines missing from the new text as deletions (-).' },
      { question: 'Can I compare programming code like JavaScript, Python, or HTML?', answer: 'Yes! The diff checker handles all plain text formats including programming languages, markdown, JSON, SQL, and prose.' },
      { question: 'Is there a limit on how many lines of text I can compare?', answer: 'Because diff computation runs in your browser memory, you can compare documents with thousands of lines smoothly.' },
      { question: 'Can I swap the original and modified panels?', answer: 'Yes! Click the "Swap Texts" button to instantly reverse the comparison direction.' },
      { question: 'Does this tool transmit my compared text over the internet?', answer: 'No. All diff computation occurs entirely inside your local browser. Your data remains 100% private.' }
    ],
    relatedSlugs: ['json-formatter', 'case-converter', 'word-counter']
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time match highlighting, flag controls, and common presets.',
    category: 'developer',
    icon: 'Regex',
    isPopular: true,
    metaTitle: 'Free Online Regex Tester & Debugger | ToolNest',
    metaDescription: 'Test regular expressions online for free. Real-time match highlighting, flag toggles (g, i, m, s), match details, and common regex presets for email, URL, IP, and more.',
    about: 'Regex Tester is an interactive regular expression sandbox and debugging tool for web developers. Craft your patterns, toggle engine flags, and test them against sample text with real-time visual highlight overlays. Built-in presets for common patterns—including email addresses, URLs, IPv4 addresses, phone numbers, and dates—help you accelerate development and eliminate syntax errors.',
    whatIs: {
      heading: 'Understanding Regular Expressions (RegEx)',
      content: [
        'A regular expression (regex) is a sequence of characters that specifies a search pattern in text. Used for string validation, lexical parsing, search-and-replace, and data extraction, regex engines evaluate metacharacters (such as `\\d` for digits, `\\w` for word characters, `+` for one or more occurrences, and `^`/`$` for line anchors).',
        'Engine flags modify search behavior: `g` (global search for all occurrences), `i` (case-insensitive matching), `m` (multiline anchor matching), and `s` (dotAll, allowing `.` to match newline characters).'
      ]
    },
    howToUse: [
      'Enter your regular expression pattern inside the pattern input box.',
      'Toggle search flags (Global, Ignore Case, Multiline, Dotall) to customize evaluation behavior.',
      'Paste your sample test string into the text area below.',
      'Inspect real-time highlighted match spans and review individual match indices in the results list.'
    ],
    features: [
      { title: 'Interactive Match Highlighting', description: 'Visual yellow highlight overlays on every matching substring in your test text.' },
      { title: '6 Quick Starter Presets', description: '1-click starter patterns for Email, URL, IP Address, Phone, Hex Color, and Date.' },
      { title: 'Detailed Match Index List', description: 'Inspect exact start indices and extracted match contents for up to 50 results.' },
      { title: 'Instant Syntax Validation', description: 'Provides real-time inline alerts for unbalanced parentheses or invalid escape sequences.' }
    ],
    examples: [
      {
        title: 'Extracting Email Addresses',
        description: 'Use pattern `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}` with flag `g` to parse all email addresses out of raw document text.'
      },
      {
        title: 'Validating Web URLs',
        description: 'Test URL inputs against `https?:\\/\\/[\\w\\.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]*` to ensure valid protocol and domain format.'
      }
    ],
    faqs: [
      { question: 'What does the /g global flag do in regular expressions?', answer: 'Without the "g" flag, the regex engine stops after finding the first match. With the "g" flag enabled, it searches the entire string and returns all matches.' },
      { question: 'How do I make a regular expression case-insensitive?', answer: 'Toggle the "Ignore Case (i)" flag checkbox, which causes lowercase and uppercase letters to match interchangeably.' },
      { question: 'What regex flavor does this browser tool use?', answer: 'This tool uses JavaScript\'s native RegExp engine (ECMAScript specification), which supports modern regex features including lookaheads and unicode character properties.' },
      { question: 'What is the difference between greedy and lazy quantifiers?', answer: 'Greedy quantifiers (e.g., `.*`) match as much text as possible, whereas lazy quantifiers (e.g., `.*?`) match the smallest possible substring satisfying the pattern.' },
      { question: 'Is my test string sent to any backend server?', answer: 'No. All regex evaluation is executed directly in your browser using the client-side JavaScript RegExp engine.' }
    ],
    relatedSlugs: ['text-diff-checker', 'json-formatter', 'url-encoder']
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder Lorem Ipsum text by paragraphs, sentences, or words with one click.',
    category: 'text',
    icon: 'AlignLeft',
    isPopular: true,
    metaTitle: 'Free Lorem Ipsum Generator Online | ToolNest',
    metaDescription: 'Generate Lorem Ipsum placeholder text online for free. Choose paragraphs, sentences, or words. Customize count and start with the classic "Lorem ipsum" opening.',
    about: 'Lorem Ipsum Generator creates standard dummy text used by designers, web developers, and typographers to fill wireframes, UI mockups, and layout prototypes. Generate customized counts of paragraphs, sentences, or individual words with live word and character counters, formatted for seamless copy-pasting into your design files.',
    whatIs: {
      heading: 'The Origin & Purpose of Lorem Ipsum',
      content: [
        'Lorem Ipsum is dummy placeholder text derived from sections 1.10.32 and 1.10.33 of Cicero\'s philosophical treatise "de Finibus Bonorum et Malorum" (On the Extremes of Good and Evil), written in 45 BC.',
        'During the 1500s, an unknown typesetter scrambled a galley of Cicero\'s Latin text to create a type specimen book. The purpose of using pseudo-Latin is that it provides a natural distribution of letters and word lengths without conveying meaningful meaning, preventing reviewers from being distracted by readable content when evaluating visual typography and layout balance.'
      ]
    },
    howToUse: [
      'Enter the quantity of placeholder text you need in the count field (1 to 100).',
      'Select your desired generation mode: Paragraphs, Sentences, or Words.',
      'Toggle the checkbox if you wish to start the first block with the classic "Lorem ipsum..." opening.',
      'Click "Generate" and click "Copy Text" to save the dummy text to your clipboard.'
    ],
    features: [
      { title: '3 Generation Modes', description: 'Generate custom quantities of full paragraphs, individual sentences, or precise word counts.' },
      { title: 'Live Word & Character Metrics', description: 'Displays real-time counts of total words, characters, and paragraph blocks.' },
      { title: 'Natural Sentence Structure', description: 'Generates properly capitalized sentences with realistic punctuation and varying lengths.' },
      { title: '1-Click Clipboard Copy', description: 'Copy thousands of words of clean dummy text in a fraction of a second.' }
    ],
    examples: [
      {
        title: 'Figma & UI Wireframing',
        description: 'Generate 3 paragraphs of placeholder copy to test responsive text card wrapping and typography hierarchies in web designs.'
      },
      {
        title: 'Database Mock Fixtures',
        description: 'Generate 20 sentences of placeholder content to populate mock blog articles and user comment seed scripts.'
      }
    ],
    faqs: [
      { question: 'What does the phrase "Lorem ipsum" mean?', answer: 'The words are a truncated corruption of "dolorem ipsum", which translates from Latin to "pain itself" (from Cicero\'s discourse on ethics).' },
      { question: 'Why do designers use dummy text instead of English words?', answer: 'Readable English text distracts clients and reviewers into reading the copy rather than evaluating visual layout, font hierarchy, and spacing balance.' },
      { question: 'Can I generate exact word counts for UI cards?', answer: 'Yes! Switch to "Words" mode and enter the exact number of words you need to test tight component containers.' },
      { question: 'Are there any copyright restrictions on using Lorem Ipsum?', answer: 'No. Lorem Ipsum is public domain and free to use in personal, academic, and commercial design projects without attribution.' },
      { question: 'Is the generated text customizable?', answer: 'Yes. You can customize paragraph counts, sentence quantities, word limits, and toggle the traditional introductory sentence.' }
    ],
    relatedSlugs: ['word-counter', 'case-converter', 'text-diff-checker']
  },
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate complete HTML meta tags, Open Graph (OG), and Twitter Card tags for SEO and social sharing.',
    category: 'seo',
    icon: 'Tags',
    isPopular: true,
    metaTitle: 'Free Meta Tag Generator for SEO - Open Graph & Twitter Cards | ToolNest',
    metaDescription: 'Generate complete HTML meta tags, Open Graph tags, and Twitter Card tags for your webpage. Includes character count guidance and instant copy. Free SEO tool.',
    about: 'Meta Tag Generator creates comprehensive, production-ready HTML `<head>` metadata for websites and web applications. Generate primary SEO tags, Facebook/LinkedIn Open Graph protocol tags, and Twitter Card tags with real-time character count indicators to ensure your links rank high on search engines and display rich visual preview cards when shared on social media.',
    whatIs: {
      heading: 'Why Meta Tags are Crucial for SEO & Social Discovery',
      content: [
        'HTML meta tags provide structured metadata about a web page to search engine web crawlers (such as Googlebot) and social media link scrapers. The `<title>` tag and `<meta name="description">` dictate the clickable headline and summary snippet displayed on Google Search Engine Results Pages (SERPs).',
        'Open Graph (OG) tags (originally created by Facebook) and Twitter Card tags standardize how social networks generate rich preview cards—including high-resolution thumbnail images (`og:image`), canonical URLs (`og:url`), and descriptive headlines—drastically improving click-through rates.'
      ]
    },
    howToUse: [
      'Enter your page title (aim for 30–60 characters) and inspect the live length indicator.',
      'Write a concise meta description (aim for 120–160 characters) summarizing your page.',
      'Provide your page URL, author name, and an absolute URL to a high-resolution OG image (1200 × 630 px).',
      'Add your Twitter @handle and select your desired robots indexing directive.',
      'Click "Copy All Tags" and paste the generated snippet directly inside the `<head>` of your HTML document.'
    ],
    features: [
      { title: 'Live Character Length Guidance', description: 'Color-coded counters warn you if your title or description exceeds optimal Google display limits.' },
      { title: 'Open Graph & Twitter Card Ready', description: 'Generates og:title, og:image, twitter:card, and twitter:site tags automatically.' },
      { title: 'Robots Directive Selector', description: 'Configure index/follow, noindex, and nofollow crawler directives with one click.' },
      { title: 'Formatted Code Output', description: 'Cleanly commented HTML block ready for direct pasting into React, Next.js, or HTML files.' }
    ],
    examples: [
      {
        title: 'Launching a New SaaS Product Page',
        description: 'Generate complete meta tags with 1200x630px social banner images for seamless sharing on LinkedIn, X, and Facebook.'
      },
      {
        title: 'Optimizing Blog Article SEO',
        description: 'Fine-tune title and description character counts to prevent text truncation on Google mobile search results.'
      }
    ],
    faqs: [
      { question: 'What is the optimal character length for SEO titles and descriptions?', answer: 'Google typically displays 30–60 characters for page titles and 120–160 characters for meta descriptions before truncating text with an ellipsis (...).' },
      { question: 'What is an Open Graph (OG) image and what size should it be?', answer: 'An OG image is the preview thumbnail displayed when your link is shared on platforms like Facebook, LinkedIn, Discord, and Slack. The recommended dimensions are 1200 × 630 pixels (1.91:1 aspect ratio).' },
      { question: 'What is the difference between standard meta tags and Open Graph tags?', answer: 'Standard meta tags are primarily consumed by search engine crawlers for search rankings, while Open Graph tags format social media preview cards.' },
      { question: 'What does the robots "index, follow" directive mean?', answer: '"index" tells search engines to add the page to their search database, while "follow" instructs crawlers to follow all outbound links on that page.' },
      { question: 'Where should I paste these generated meta tags?', answer: 'Paste the entire generated block between the `<head>` and `</head>` tags of your HTML template or inside your frontend framework\'s head manager.' }
    ],
    relatedSlugs: ['url-encoder', 'word-counter', 'qr-code-generator']
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, beautify, and edit raw JSON strings into clean, human-readable structure instantly.',
    category: 'developer',
    icon: 'FileJson',
    isPopular: true,
    metaTitle: 'Free Online JSON Formatter & Beautifier | ToolNest',
    metaDescription: 'Format and beautify your JSON data online for free. Validate, minify, format with custom indentation, and fix syntax errors instantly in your browser.',
    about: 'JSON Formatter is a privacy-first web utility designed for software engineers, API developers, and data analysts. Raw JSON API responses are often minified into single unreadable strings. This tool parses your JSON string directly inside your browser, formats it with clean syntax indentation, and provides instant visual diagnostics on syntax errors without transmitting your payloads to any external server.',
    whatIs: {
      heading: 'What is JSON & Why Do We Format It?',
      content: [
        'JavaScript Object Notation (JSON) is a lightweight, language-agnostic text format governed by RFC 8259 used for serializing structured data. Unlike JavaScript object literals, strict JSON mandates double quotes (`"`) around all object keys and string values, and strictly prohibits trailing commas, functions, and comments.',
        'Minified JSON compresses payloads by stripping all whitespace and newlines for fast network transfer. JSON formatting (or "pretty-printing") reconstructs hierarchical indentation, making complex nested arrays and objects readable for debugging and inspection.'
      ]
    },
    howToUse: [
      'Paste your raw, unformatted, or minified JSON string into the input area.',
      'The tool automatically validates and highlights syntax status as you type.',
      'Click "Format JSON" to beautify the code with clean 2-space indentation.',
      'Click "Minify JSON" if you want to condense the payload into a compact single line.',
      'Click "Copy JSON" to copy the beautified result to your clipboard.'
    ],
    features: [
      { title: 'Real-Time Auto-Validation', description: 'Instantly highlights valid syntax or reports precise parsing error lines as you type.' },
      { title: 'Beautify & Minify Modes', description: 'Toggle between clean 2-space human-readable formatting and compact single-line minification.' },
      { title: 'Client-Side Privacy', description: 'Payloads stay in your local browser memory—ideal for sensitive API keys and customer records.' },
      { title: '1-Click Clipboard Actions', description: 'Fast copy and clear buttons to streamline your developer debugging workflow.' }
    ],
    examples: [
      {
        title: 'Debugging REST API Responses',
        description: 'Paste a compressed 1-line API payload from cURL or Postman to inspect nested object structures with clean 2-space indentation.'
      },
      {
        title: 'Minifying Configuration Files',
        description: 'Condense large multi-line JSON configuration files into single-line strings for environment variables or production deployments.'
      }
    ],
    faqs: [
      { question: 'Why does my JSON fail validation with single quotes?', answer: 'The official JSON specification (RFC 8259) strictly requires double quotes (`"`) for all keys and string values. Single quotes (`\'`) are invalid JSON syntax.' },
      { question: 'Is my JSON data uploaded to any server?', answer: 'No. All parsing, formatting, and minification runs 100% client-side inside your web browser. Your private data never touches a network server.' },
      { question: 'Can I format large multi-megabyte JSON files?', answer: 'Yes! Because processing utilizes your local device JavaScript V8 engine, it can format large JSON files up to tens of megabytes smoothly.' },
      { question: 'Why are trailing commas disallowed in JSON?', answer: 'Unlike modern JavaScript arrays/objects, the strict JSON grammar does not allow a comma after the final item in an array or object.' },
      { question: 'What is the difference between JSON formatting and JSON minifying?', answer: 'Formatting adds indentation and line breaks for human readability. Minification removes all unnecessary whitespace to minimize payload size for network transmission.' }
    ],
    relatedSlugs: ['json-validator', 'base64', 'url-encoder', 'uuid-generator']
  },
  {
    slug: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate JSON syntax compliance, detect missing quotes or brackets, and inspect errors accurately.',
    category: 'developer',
    icon: 'CheckCircle2',
    isPopular: false,
    metaTitle: 'Free Online JSON Validator & Syntax Checker | ToolNest',
    metaDescription: 'Validate your JSON strings online. Check RFC 8259 syntax compliance, find line-by-line syntax errors, and clean your data with ease.',
    about: 'JSON Validator helps software engineers verify that a given string adheres to strict JSON specification standards (RFC 8259). It inspects bracket balancing, data types, key quotes, comma separators, and escape characters, reporting precise error offsets when invalid data is detected.',
    whatIs: {
      heading: 'How JSON Syntax Validation Works',
      content: [
        'JSON validation parses an input string through a strict state-machine grammar checker. It verifies that every opening brace `{` or bracket `[` has a matching closing counterpart, that strings contain valid unicode escape sequences, that numbers conform to standard decimal notation (no leading zeros or NaN), and that boolean/null literals are lowercase.',
        'When syntax violations occur, the validator catches the exact character offset and line number, allowing you to quickly rectify broken API payloads or corrupted configuration files.'
      ]
    },
    howToUse: [
      'Enter or paste the JSON text you wish to check into the input field.',
      'Click the "Validate JSON" button to trigger a strict syntax inspection.',
      'Review the green confirmation message or inspect the red error diagnostics pinpointing the syntax failure.',
      'Copy the validated output or clear the input to validate another payload.'
    ],
    features: [
      { title: 'Strict RFC 8259 Compliance', description: 'Enforces official JSON standards to ensure payloads parse cleanly in any backend language.' },
      { title: 'Detailed Error Reporting', description: 'Pinpoints exact error messages and offset locations to quickly locate typos.' },
      { title: 'Auto-Formatting on Validation', description: 'Automatically pretty-prints valid payloads for convenient visual inspection.' },
      { title: 'Complete Data Privacy', description: 'All validation is computed locally in your browser with zero remote data transmission.' }
    ],
    examples: [
      {
        title: 'Verifying Webhook Payloads',
        description: 'Paste webhook payloads from Stripe, GitHub, or custom services to verify that incoming data conforms to valid JSON syntax.'
      },
      {
        title: 'Fixing Broken Config Files',
        description: 'Locate misplaced commas or missing quotation marks in package.json, tsconfig.json, or settings files.'
      }
    ],
    faqs: [
      { question: 'Why does my JSON fail validation?', answer: 'Common causes include trailing commas after the last item, single quotes instead of double quotes around keys, missing closing braces, or unescaped control characters.' },
      { question: 'Can JSON contain comments like // or /* */?', answer: 'No. Standard RFC 8259 JSON does not support comments. Any comment tokens will cause validation failure.' },
      { question: 'Is this JSON validator safe for commercial project data?', answer: 'Yes! All parsing happens entirely inside your browser window. No data is stored, logged, or sent across the internet.' },
      { question: 'What is the difference between JSON validation and JSON schema validation?', answer: 'Syntax validation checks that the string conforms to valid JSON grammar. Schema validation checks that the data contains specific required fields and types.' },
      { question: 'How can I fix unescaped characters in JSON?', answer: 'Special characters such as double quotes inside strings must be escaped with a backslash (`\\"`), and newlines must be written as `\\n`.' }
    ],
    relatedSlugs: ['json-formatter', 'base64', 'url-encoder']
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate cryptographically secure random UUID v4 strings individually or in bulk.',
    category: 'developer',
    icon: 'Fingerprint',
    isPopular: true,
    metaTitle: 'Free Online UUID v4 Generator (Bulk Support) | ToolNest',
    metaDescription: 'Generate random UUID v4 identifiers online for free. Supports single and bulk UUID generation using secure browser cryptography API.',
    about: 'UUID Generator creates cryptographically secure Universally Unique Identifiers (UUID Version 4) adhering to the RFC 4122 standard. Powered by your browser\'s native CSPRNG (`window.crypto.getRandomValues()`), this tool generates high-entropy 128-bit identifiers individually or in bulk batches up to 50 at a time for databases, distributed systems, and API tracking.',
    whatIs: {
      heading: 'What is a Version 4 UUID & How Unique Is It?',
      content: [
        'A UUID (Universally Unique Identifier) is a 128-bit label formatted as 32 hexadecimal digits separated by hyphens into five groups: `8-4-4-4-12` (e.g., `550e8400-e29b-41d4-a716-446655440000`).',
        'In Version 4 UUIDs, 122 of the 128 bits are generated purely at random, with 6 bits reserved for the version (`4`) and variant (`RFC 4122`). The total number of possible UUID v4 values is 2^122 (approximately 5.3 × 10^36). To have a 50% probability of generating just one collision, you would need to generate 1 billion UUIDs every second for 85 years.'
      ]
    },
    howToUse: [
      'Set your desired quantity of UUIDs using the count selector (1 to 50).',
      'Toggle uppercase/lowercase letters or hyphen formatting preferences if needed.',
      'Click "Generate UUIDs" to produce fresh, cryptographically random identifiers.',
      'Click "Copy All" to copy the generated UUID list directly to your clipboard.'
    ],
    features: [
      { title: 'CSPRNG Cryptographic Entropy', description: 'Uses browser Web Crypto API for true non-deterministic randomness.' },
      { title: 'Bulk Batch Generation', description: 'Generate up to 50 unique identifiers simultaneously in a single click.' },
      { title: 'Strict RFC 4122 Compliance', description: 'Properly sets the 4-bit version (4) and 2-bit variant bits (10xx) on every UUID.' },
      { title: '1-Click Clipboard Export', description: 'Quickly copy individual UUIDs or the entire batch to clipboard.' }
    ],
    examples: [
      {
        title: 'Database Primary Keys',
        description: 'Generate primary key IDs for PostgreSQL, MongoDB, or MySQL tables without relying on sequential auto-incrementing integers.'
      },
      {
        title: 'Distributed Request Tracing',
        description: 'Attach unique correlation IDs to HTTP request headers (`X-Request-ID`) to trace microservice transactions across servers.'
      }
    ],
    faqs: [
      { question: 'How random are Version 4 UUIDs generated here?', answer: 'We use the browser\'s hardware-backed Web Crypto API (`window.crypto.getRandomValues`), providing high-entropy cryptographic randomness.' },
      { question: 'Can two UUID v4 values ever collide in practice?', answer: 'The mathematical probability of generating a duplicate UUID v4 is 1 in 5.3 × 10^36, making accidental collisions virtually impossible.' },
      { question: 'What is the difference between a UUID and a GUID?', answer: 'UUID (Universally Unique Identifier) is the open standard (RFC 4122). GUID (Globally Unique Identifier) is Microsoft\'s implementation of the exact same 128-bit standard.' },
      { question: 'Why use UUIDs instead of auto-incrementing database IDs?', answer: 'UUIDs can be generated on client devices or distributed servers without coordinating with a central database, preventing ID enumeration security risks.' },
      { question: 'Are generated UUIDs recorded or saved anywhere?', answer: 'No. Identifiers are generated in volatile memory in your browser and are never transmitted to or stored on any server.' }
    ],
    relatedSlugs: ['password-generator', 'json-formatter', 'base64']
  },
  {
    slug: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode plain text strings into Base64 format or decode Base64 data back to utf-8 text.',
    category: 'developer',
    icon: 'Binary',
    isPopular: false,
    metaTitle: 'Free Base64 Encoder & Decoder Online | ToolNest',
    metaDescription: 'Quickly encode text to Base64 format or decode Base64 strings to readable text online for free. Fast, safe, browser-based processing.',
    about: 'Base64 Encoder / Decoder allows you to seamlessly convert plain UTF-8 text strings into standard Base64 representation or decode Base64 strings back into readable text. With full support for international Unicode characters, accented letters, and emojis, this utility operates completely client-side in your browser for maximum security.',
    whatIs: {
      heading: 'What is Base64 Encoding & How Does It Work?',
      content: [
        'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using a 64-character alphabet (`A-Z`, `a-z`, `0-9`, `+`, and `/`). It operates by dividing groups of 3 8-bit bytes (24 bits total) into 4 6-bit chunks, where each 6-bit integer (0–63) maps to a corresponding character in the Base64 index table.',
        'If the input byte count is not divisible by 3, `=` padding characters are appended to the end. Base64 is an encoding scheme for data transmission over text-only channels (like email or JSON), NOT an encryption algorithm—anyone can easily decode Base64 strings.'
      ]
    },
    howToUse: [
      'Select whether you want to "Encode" text to Base64 or "Decode" Base64 back to text.',
      'Type or paste your input payload into the main text box.',
      'The converted Base64 or plain text output updates immediately in real time.',
      'Click "Copy Result" to copy the converted string to your clipboard.'
    ],
    features: [
      { title: 'Bi-Directional Conversion', description: 'Switch between encoding plain text and decoding Base64 strings with one click.' },
      { title: 'Full UTF-8 & Emoji Support', description: 'Properly encodes complex international scripts, accented characters, and emojis.' },
      { title: 'Live Instant Output', description: 'Converts your input in real time as you type with zero network lag.' },
      { title: '100% In-Memory Privacy', description: 'Data is encoded locally in your browser without ever being sent over the internet.' }
    ],
    examples: [
      {
        title: 'HTTP Basic Authentication',
        description: 'Encode `username:password` pairs into Base64 strings for HTTP `Authorization: Basic <credentials>` headers.'
      },
      {
        title: 'Embedding Small Assets in JSON',
        description: 'Encode binary tokens or small icons into Base64 strings to embed them directly inside JSON payloads.'
      }
    ],
    faqs: [
      { question: 'Is Base64 an encryption algorithm?', answer: 'No. Base64 is an encoding format designed for safe data transmission, not data security. It can be decoded by anyone without a key.' },
      { question: 'What does the "=" character at the end of a Base64 string mean?', answer: 'The "=" sign is padding used when the input byte length is not a multiple of 3, ensuring the final output block aligns to 4 characters.' },
      { question: 'Why does Base64 increase data size by ~33%?', answer: 'Because Base64 converts every 3 bytes (24 bits) into 4 characters (32 bits), resulting in an approximate 33% size expansion.' },
      { question: 'Does this tool support non-ASCII characters and emojis?', answer: 'Yes! ToolNest uses a UTF-8 encoder layer to ensure multi-byte international characters and emojis encode and decode flawlessly.' },
      { question: 'Are my encoded strings logged or saved on your server?', answer: 'No. All encoding and decoding occurs exclusively in your browser\'s local JavaScript memory.' }
    ],
    relatedSlugs: ['url-encoder', 'json-formatter', 'uuid-generator']
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode special characters into percent-encoded URL components or decode encoded URLs.',
    category: 'developer',
    icon: 'Link2',
    isPopular: false,
    metaTitle: 'Free URL Encoder & Decoder Online | ToolNest',
    metaDescription: 'Encode and decode URLs or URL component parameters online for free. Convert reserved characters into percent-encoded strings.',
    about: 'URL Encoder / Decoder converts special and reserved characters into RFC 3986 percent-encoded format or translates percent-encoded URI strings back into clean, readable text. An indispensable tool for web developers building query parameters, API integrations, and redirect URLs without parsing ambiguity.',
    whatIs: {
      heading: 'Understanding URL Percent-Encoding (RFC 3986)',
      content: [
        'Uniform Resource Identifiers (URIs) only permit a restricted subset of printable ASCII characters. Characters outside this set—including spaces, non-ASCII Unicode symbols, and reserved delimiter characters (such as `?`, `&`, `=`, `/`, `#`, and `:`)—must be percent-encoded when used inside parameter values.',
        'Percent-encoding replaces unsafe octets with a `%` symbol followed by two hexadecimal digits representing the byte\'s numeric value (for example, a space becomes `%20`, and `&` becomes `%26`).'
      ]
    },
    howToUse: [
      'Choose between "Encode" mode or "Decode" mode.',
      'Paste your URL, query parameter string, or special text into the input field.',
      'The converted URL component string updates automatically in real time.',
      'Click "Copy Result" to save the safe URL string to your clipboard.'
    ],
    features: [
      { title: 'RFC 3986 Standard Compliance', description: 'Accurately handles all reserved delimiters and non-ASCII character sequences.' },
      { title: 'Bi-Directional Processing', description: 'Easily encode human-readable text or decode complex query strings.' },
      { title: 'Instant Real-Time Output', description: 'Zero delay—converts and displays results immediately on keystroke.' },
      { title: 'Client-Side Security', description: 'Your URLs and query parameters remain private and are never logged on any server.' }
    ],
    examples: [
      {
        title: 'Encoding Query String Values',
        description: 'Encode `Search Term & Co.` into `Search%20Term%20%26%20Co.` so the ampersand isn\'t mistaken for a parameter separator.'
      },
      {
        title: 'Decoding Complex OAuth Redirect URIs',
        description: 'Paste heavily encoded authentication redirect strings from OAuth providers to inspect the destination endpoint and state parameters.'
      }
    ],
    faqs: [
      { question: 'Why do URLs need to be encoded?', answer: 'URLs can only transmit a specific set of ASCII characters. Reserved characters like ? and & have syntactic meaning, so literal values containing them must be percent-encoded.' },
      { question: 'Why do spaces sometimes become %20 and sometimes +?', answer: 'Standard URI percent-encoding uses `%20` for spaces. Form submissions (`application/x-www-form-urlencoded`) historically encode spaces as `+`.' },
      { question: 'What is the difference between encodeURI and encodeURIComponent?', answer: '`encodeURI` preserves protocol delimiters (like `http://` and `/`). `encodeURIComponent` encodes all delimiters, making it suitable for query parameter values.' },
      { question: 'Can URL encoding prevent security vulnerabilities?', answer: 'URL encoding ensures query parameters parse accurately, preventing parameter injection issues when constructing dynamic URLs.' },
      { question: 'Are my URLs sent to any backend server?', answer: 'No. All URL encoding and decoding runs entirely within your browser\'s local JavaScript engine.' }
    ],
    relatedSlugs: ['base64', 'json-formatter', 'meta-tag-generator']
  },
  {
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert Unix epoch timestamps to human-readable date & time strings and vice versa.',
    category: 'converter',
    icon: 'Clock',
    isPopular: false,
    metaTitle: 'Free Unix Timestamp Converter (Epoch Time) | ToolNest',
    metaDescription: 'Convert Unix timestamps in seconds or milliseconds to human-readable dates (UTC & Local Time) and convert dates to Unix epoch timestamps online.',
    about: 'Unix Timestamp Converter translates POSIX epoch timestamps into human-readable GMT/UTC, Local Time, and ISO 8601 dates, and calculates exact Unix epoch seconds from any chosen calendar date and time. Featuring a live ticking Unix epoch clock and automatic 10-digit vs 13-digit detection, this tool streamlines time debugging for developers and database administrators.',
    whatIs: {
      heading: 'What is the Unix Epoch & Timestamp System?',
      content: [
        'A Unix timestamp represents the total number of non-leap seconds that have elapsed since the Unix Epoch: 00:00:00 UTC on January 1, 1970. Because it is a single integer independent of geographical time zones, it is universally used in databases, operating systems, and network protocols.',
        'Standard Unix timestamps are 10 digits (measured in seconds), while JavaScript and Java timestamps are 13 digits (measured in milliseconds). In the year 2038 (the "Y2038" problem), 32-bit signed integer timestamp representations will overflow, requiring modern 64-bit systems.'
      ]
    },
    howToUse: [
      'View the live ticking current Unix epoch timestamp in the banner at the top.',
      'Enter any 10-digit (seconds) or 13-digit (milliseconds) timestamp in Section 1 to view instant UTC, Local, and ISO 8601 dates.',
      'Select any date and time in Section 2 using the datetime picker to calculate its exact Unix timestamp.',
      'Click the copy button next to any converted value to copy it directly.'
    ],
    features: [
      { title: 'Live Unix Epoch Clock', description: 'Displays the current ticking Unix epoch second with 1-click clipboard copy.' },
      { title: 'Automatic Seconds & Milliseconds Detection', description: 'Smart detection seamlessly handles both 10-digit and 13-digit timestamps.' },
      { title: 'Multi-Format Output', description: 'Simultaneously displays GMT/UTC, Local Browser Timezone, and standardized ISO 8601 strings.' },
      { title: 'Bi-Directional Calculation', description: 'Easily convert from timestamp to date or calculate timestamps from calendar dates.' }
    ],
    examples: [
      {
        title: 'Debugging JWT Token Expiration',
        description: 'Paste the numeric `exp` or `iat` claim from a JSON Web Token to check the exact expiration date and time in UTC.'
      },
      {
        title: 'Database Query Time Ranges',
        description: 'Pick a calendar start date to generate the exact Unix integer needed for database WHERE clauses (`created_at >= 1700000000`).'
      }
    ],
    faqs: [
      { question: 'What is the Unix Epoch?', answer: 'The Unix Epoch is 00:00:00 Universal Coordinated Time (UTC) on Thursday, January 1, 1970, which serves as the standard zero-point reference for computer timekeeping.' },
      { question: 'How do I know if my timestamp is in seconds or milliseconds?', answer: '10-digit timestamps (e.g. 1700000000) represent seconds. 13-digit timestamps (e.g. 1700000000000) represent milliseconds. ToolNest detects both automatically.' },
      { question: 'What is the Year 2038 Problem (Y2038)?', answer: 'On January 19, 2038, 32-bit signed integers will exceed their maximum value (2,147,483,647) and overflow. Modern systems use 64-bit integers to prevent this.' },
      { question: 'Why are Unix timestamps identical across all timezones?', answer: 'Unix timestamps count seconds elapsed relative to UTC, making them timezone-neutral. Local timezone formatting is applied purely at display time.' },
      { question: 'How do I get the current Unix timestamp in JavaScript?', answer: 'In JavaScript, use `Math.floor(Date.now() / 1000)` to get the timestamp in seconds, or `Date.now()` for milliseconds.' }
    ],
    relatedSlugs: ['password-generator', 'word-counter', 'hash-generator']
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, customizable, cryptographically random passwords to safeguard your accounts.',
    category: 'developer',
    icon: 'ShieldCheck',
    isPopular: true,
    metaTitle: 'Free Strong Password Generator Online | ToolNest',
    metaDescription: 'Generate secure, random passwords online for free. Customize password length, character sets (uppercase, lowercase, numbers, symbols) and evaluate password strength.',
    about: 'Password Generator crafts high-entropy, cryptographically random credentials tailored to your exact security preferences. Running 100% client-side in volatile memory using browser-native CSPRNG (`window.crypto.getRandomValues()`), this tool ensures your passwords, passphrases, and API secrets are never transmitted across the network or stored on any server.',
    whatIs: {
      heading: 'What Makes a Password Cryptographically Secure?',
      content: [
        'Password security is quantified by entropy—a measure of unpredictability expressed in bits. A password\'s search space is calculated as `S = N^L`, where `N` is the character pool size (e.g., 94 printable ASCII characters) and `L` is the password length.',
        'A 16-character password drawn from mixed uppercase, lowercase, numbers, and symbols possesses over 95 bits of entropy, requiring billions of years for modern GPU clusters to brute-force. Using a cryptographically secure pseudo-random number generator (CSPRNG) ensures that successive characters cannot be predicted.'
      ]
    },
    howToUse: [
      'Adjust the password length slider to your desired length (8 to 64 characters; 16+ recommended).',
      'Toggle your preferred character pools: Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), and Symbols (!@#$...).',
      'Click "Generate Password" to produce a fresh, high-entropy credential.',
      'Review the real-time strength meter and click "Copy Password" to save it to your clipboard.'
    ],
    features: [
      { title: 'CSPRNG Cryptographic Randomness', description: 'Uses browser-native Web Crypto API rather than predictable Math.random() algorithms.' },
      { title: 'Real-Time Entropy Strength Meter', description: 'Evaluates length and character diversity with color-coded strength feedback.' },
      { title: 'Customizable Character Sets', description: 'Granular toggles for uppercase, lowercase, numerical digits, and special symbols.' },
      { title: 'Zero Cloud Storage', description: 'Credentials are created purely in client-side RAM and are never stored or transmitted.' }
    ],
    examples: [
      {
        title: 'Securing Online Accounts',
        description: 'Generate unique 20-character credentials for password managers (1Password, Bitwarden, Apple Keychain) for every website.'
      },
      {
        title: 'Database & API Secret Keys',
        description: 'Create 32-character high-entropy secret keys for server environment variables and production database credentials.'
      }
    ],
    faqs: [
      { question: 'Are generated passwords saved anywhere on your servers?', answer: 'Never. Passwords are generated strictly inside your local browser memory using Web Crypto APIs. They are never sent to or recorded on any server.' },
      { question: 'How long should a strong password be?', answer: 'We recommend passwords of at least 14 to 16 characters containing a combination of uppercase, lowercase, numbers, and special symbols.' },
      { question: 'Why is Math.random() unsafe for generating passwords?', answer: '`Math.random()` uses pseudo-random algorithms that are mathematically predictable. ToolNest uses `window.crypto.getRandomValues()` for true cryptographic entropy.' },
      { question: 'What makes a password vulnerable to dictionary attacks?', answer: 'Using common dictionary words, predictable letter substitutions (like @ for a), or personal information makes passwords easily crackable by automated tools.' },
      { question: 'Should I reuse strong passwords across multiple services?', answer: 'No. If one service suffers a security breach, attackers will attempt to reuse that password on other accounts. Always use unique passwords.' }
    ],
    relatedSlugs: ['uuid-generator', 'hash-generator', 'word-counter']
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading time for any text.',
    category: 'text',
    icon: 'FileText',
    isPopular: true,
    metaTitle: 'Free Online Word Counter & Character Counter | ToolNest',
    metaDescription: 'Count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time online for free. Ideal for writers, essays, and social media.',
    about: 'Word Counter is a real-time text analysis tool for copywriters, students, novelists, and social media managers. It calculates live word counts, character counts (with and without whitespace), sentence counts, paragraph tallies, and estimated reading time as you type, helping you stay within strict limits for essays, tweets, blog articles, and SEO meta tags.',
    whatIs: {
      heading: 'How Word & Reading Metrics are Computed',
      content: [
        'Word counting uses whitespace and boundary regex tokenization (`/\\s+/`) to split text into distinct word tokens while filtering empty strings. Character counts are calculated directly and with whitespace stripped (`/\\s/g`).',
        'Sentence counts evaluate punctuation boundaries (`.`, `!`, `?`), paragraph counts split on newline breaks (`\\n+`), and reading time is estimated using the cognitive average adult reading speed of 200 words per minute (WPM).'
      ]
    },
    howToUse: [
      'Type or paste your text directly into the large text area.',
      'Metrics update automatically in real time across the 6 top stat cards.',
      'Check your estimated reading time and character counts.',
      'Use the "Copy Text" button to save your content or "Clear Text" to reset the editor.'
    ],
    features: [
      { title: 'Live Keystroke Updates', description: 'Calculates all metrics instantly as you type with zero delay.' },
      { title: '6 Comprehensive Stat Metrics', description: 'Tracks Words, Characters, No Spaces, Sentences, Paragraphs, and Estimated Reading Time.' },
      { title: 'Estimated Reading Time', description: 'Calculates reader duration based on standard 200 WPM reading speeds.' },
      { title: 'Private & Secure', description: 'Your essays, articles, and private drafts stay strictly within your browser.' }
    ],
    examples: [
      {
        title: 'Social Media Character Limits',
        description: 'Verify that your post fits within Twitter/X (280 characters), LinkedIn (3,000 characters), or Instagram captions (2,200 characters).'
      },
      {
        title: 'SEO Title & Description Optimization',
        description: 'Ensure page titles stay under 60 characters and meta descriptions stay within 120–160 characters for Google SERPs.'
      }
    ],
    faqs: [
      { question: 'How is estimated reading time calculated?', answer: 'Estimated reading time is calculated based on an average adult reading speed of 200 words per minute.' },
      { question: 'Does this tool count spaces as characters?', answer: 'We provide both metrics: total character count (including spaces) and character count excluding spaces.' },
      { question: 'Does the counter handle hyphenated words?', answer: 'Hyphenated words (e.g., "state-of-the-art") separated without whitespace are counted as a single word token by standard convention.' },
      { question: 'Why do character counts without spaces matter?', answer: 'Many academic translation services and publishing houses bill translation and editing work based on character counts excluding whitespace.' },
      { question: 'Is my pasted text stored or sent to any server?', answer: 'No. All text parsing runs locally in your browser. Your drafts, essays, and notes remain completely private.' }
    ],
    relatedSlugs: ['case-converter', 'text-diff-checker', 'lorem-ipsum-generator']
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    category: 'text',
    icon: 'Type',
    isPopular: false,
    metaTitle: 'Free Text Case Converter Online | ToolNest',
    metaDescription: 'Convert text case instantly online. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    about: 'Case Converter transforms blocks of text into any capitalization standard with a single click. Ideal for software engineers standardizing variable names, editors styling blog headlines, and data analysts normalizing database fields, this tool provides instant transformations with zero formatting bugs.',
    whatIs: {
      heading: 'Understanding Text Casing & Developer Conventions',
      content: [
        'Text casing conventions govern how words are capitalized and joined. In programming, conventions distinguish variable scopes and component types: camelCase (`myVariableName`) is standard in JavaScript, PascalCase (`MyClassName`) for classes and React components, snake_case (`my_variable_name`) for Python and SQL databases, and kebab-case (`my-class-name`) for URLs and CSS stylesheets.',
        'In prose, Title Case capitalizes major words for book and article headlines, Sentence case capitalizes only the first letter of each sentence, and UPPERCASE is used for constants and acronyms.'
      ]
    },
    howToUse: [
      'Enter or paste your text into the main input textarea.',
      'Click the button corresponding to your desired case format (UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case).',
      'The converted text updates immediately in the text area.',
      'Click "Copy Text" to save the transformed result to your clipboard.'
    ],
    features: [
      { title: '8 Transformation Styles', description: 'Supports UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.' },
      { title: 'Code & Prose Friendly', description: 'Handles multi-word programming identifiers and multi-line article text effortlessly.' },
      { title: 'Instant Execution', description: 'Converts thousands of words in milliseconds with zero network delay.' },
      { title: '1-Click Clipboard Copy', description: 'Quickly copy your converted strings with a single click.' }
    ],
    examples: [
      {
        title: 'Normalizing Database Identifiers',
        description: 'Convert messy spreadsheet headers like "Customer First Name" into clean SQL column names: `customer_first_name`.'
      },
      {
        title: 'Formatting Blog Headlines',
        description: 'Transform raw sentence text like "how to build web applications with react" into polished Title Case: "How to Build Web Applications with React".'
      }
    ],
    faqs: [
      { question: 'What is the difference between camelCase and PascalCase?', answer: 'camelCase starts with a lowercase letter and capitalizes subsequent words (`myVariable`). PascalCase capitalizes every word including the first (`MyClass`).' },
      { question: 'When should I use kebab-case instead of snake_case?', answer: 'kebab-case (`url-slug-example`) is standard for web URLs and CSS class names. snake_case (`database_column_name`) is standard in Python, Ruby, and SQL databases.' },
      { question: 'How does Title Case handle small words like "in", "and", "the"?', answer: 'Standard Title Case rules keep minor prepositions and conjunctions lowercase unless they are the first word of the title.' },
      { question: 'Can this tool convert multi-line text blocks?', answer: 'Yes! You can paste entire paragraphs or multi-line lists, and the converter will apply the casing rule across the entire text block.' },
      { question: 'Is my converted text stored anywhere?', answer: 'No. All string manipulation takes place strictly within your browser\'s local JavaScript engine.' }
    ],
    relatedSlugs: ['word-counter', 'json-formatter', 'text-diff-checker']
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    description: 'Convert color codes between HEX, RGB, HSL values with live preview and color picker.',
    category: 'converter',
    icon: 'Palette',
    isPopular: false,
    metaTitle: 'Free HEX, RGB, HSL Color Converter & Picker | ToolNest',
    metaDescription: 'Convert colors between HEX, RGB, and HSL formats online for free. Features interactive color picker, instant code generation, and visual color preview.',
    about: 'Color Converter translates color representations seamlessly between HEX, RGB, and HSL CSS formats. Featuring an interactive native color picker, live visual color preview swatches, and 1-click clipboard copy buttons, this tool helps frontend developers and UI designers translate color values effortlessly.',
    whatIs: {
      heading: 'Understanding Color Spaces: HEX, RGB & HSL',
      content: [
        'Colors in digital displays are generated by combining Red, Green, and Blue light channels (sRGB color space). HEX codes represent these three channels using 6 hexadecimal digits (`#RRGGBB`, where each pair ranges from 00 to FF / 0 to 255). RGB format writes this explicitly as `rgb(r, g, b)`.',
        'HSL (Hue, Saturation, Lightness) describes color cylindrically: Hue is the color angle on a 360° color wheel (0° red, 120° green, 240° blue), Saturation is the color intensity (0% gray to 100% pure color), and Lightness represents the illumination (0% black, 50% normal, 100% white). HSL is ideal for programmatic UI theme shading.'
      ]
    },
    howToUse: [
      'Click "Choose Color" to use the native color picker, or paste any HEX, RGB, or HSL value into the input fields.',
      'The live color preview swatch and all corresponding color format values update in real time.',
      'Click the "Copy" button next to any HEX, RGB, or HSL code to copy the CSS string.'
    ],
    features: [
      { title: 'Tri-Directional Conversion', description: 'Seamlessly convert between HEX (`#2563EB`), RGB (`rgb(37, 99, 235)`), and HSL (`hsl(221, 83%, 53%)`).' },
      { title: 'Interactive Color Picker', description: 'Visually select shades, tints, and hues with immediate feedback.' },
      { title: 'Live Swatch Preview', description: 'Large color display box to inspect exact visual color fidelity.' },
      { title: '1-Click CSS Syntax Copy', description: 'Copy ready-to-use CSS syntax directly into your stylesheet.' }
    ],
    examples: [
      {
        title: 'CSS Theme Shading with HSL',
        description: 'Convert a brand HEX color into HSL, then easily decrease lightness by 10% to create an exact matching hover state (`hsl(221, 83%, 43%)`).'
      },
      {
        title: 'Translating Figma Design Specs',
        description: 'Paste HEX values from Figma design files to obtain clean RGB integers for Canvas API programming.'
      }
    ],
    faqs: [
      { question: 'What is the difference between RGB and HSL?', answer: 'RGB defines colors by mixing red, green, and blue light channels (0–255). HSL describes colors intuitively by Hue (color wheel angle), Saturation (intensity), and Lightness (brightness).' },
      { question: 'What do the 6 digits in a HEX color code mean?', answer: 'The first two digits represent the Red channel (00-FF), the middle two represent Green, and the last two represent Blue.' },
      { question: 'Why is HSL preferred for creating dark and light UI themes?', answer: 'Because adjusting brightness or darkness in HSL only requires modifying the Lightness parameter (e.g. from 50% to 20%), keeping the exact same hue and saturation.' },
      { question: 'What is RGBA and HSLA?', answer: 'The "A" stands for Alpha channel (transparency), ranging from 0.0 (completely transparent) to 1.0 (fully opaque).' },
      { question: 'Are color calculations performed locally?', answer: 'Yes. All mathematical color conversions run client-side in your browser with zero network latency.' }
    ],
    relatedSlugs: ['image-compressor', 'image-resizer', 'meta-tag-generator']
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, and WebP images directly in your browser without losing quality.',
    category: 'image',
    icon: 'Image',
    isPopular: true,
    metaTitle: 'Free Online Image Compressor (JPG, PNG, WebP) | ToolNest',
    metaDescription: 'Compress images online for free without uploading files to a server. Reduce JPG, PNG, and WebP image sizes in your browser with quality controls.',
    about: 'Image Compressor optimizes photo and graphic file sizes directly inside your web browser using HTML5 Canvas rendering. Reduce JPG, PNG, and WebP file sizes by up to 80% with real-time quality controls while preserving sharp visual fidelity. Because processing is executed 100% client-side, your private photos are never uploaded to any remote server.',
    whatIs: {
      heading: 'How Client-Side Image Compression Works',
      content: [
        'Image compression reduces the byte weight of digital graphics. Lossy compression (such as JPEG/WebP quantization) discards imperceptible high-frequency color detail, while lossless compression reorganizes pixel data using efficient encoding tables.',
        'ToolNest utilizes the browser\'s native Canvas 2D rasterizer. By loading your image into local device memory and re-encoding it at a specified quality factor, it optimizes image byte size instantly without sending any data over the internet.'
      ]
    },
    howToUse: [
      'Click or drag-and-drop your image file (JPG, JPEG, PNG, or WebP) into the upload dropzone.',
      'Adjust the compression quality slider to balance file size savings with visual clarity.',
      'Review the side-by-side original size, compressed size, and percentage reduction metrics.',
      'Click "Download Compressed Image" to save the optimized file directly to your device.'
    ],
    features: [
      { title: '100% Client-Side In-Browser Compression', description: 'Zero server uploads—your private photos never leave your device memory.' },
      { title: 'Adjustable Quality Slider', description: 'Fine-tune image quality between 1% and 100% with real-time file size calculation.' },
      { title: 'Side-by-Side Size Comparison', description: 'Inspect exact original byte size, compressed byte size, and savings percentage.' },
      { title: 'Multi-Format Compatibility', description: 'Supports standard web image formats including JPG, JPEG, PNG, and WebP.' }
    ],
    examples: [
      {
        title: 'Speeding Up Website Page Load Times',
        description: 'Compress 4MB banner photos down to 400KB to dramatically improve Google Core Web Vitals (LCP) and mobile load speeds.'
      },
      {
        title: 'Email Attachment Size Limits',
        description: 'Reduce high-resolution smartphone camera photos to fit within strict 25MB email attachment limits.'
      }
    ],
    faqs: [
      { question: 'Are my images uploaded to any server?', answer: 'No! Your images are processed entirely inside your local browser memory using HTML5 Canvas technology. No data is transmitted over the internet.' },
      { question: 'What image formats are supported?', answer: 'ToolNest supports JPG, JPEG, PNG, and WebP image formats.' },
      { question: 'What is the recommended quality setting for web images?', answer: 'A quality setting between 75% and 85% typically reduces file size by 60–80% with virtually zero perceptible loss in visual clarity.' },
      { question: 'Does compressing an image change its pixel dimensions?', answer: 'No. Image compression reduces file size by optimizing color data and compression tables, keeping the original width and height unchanged.' },
      { question: 'Is there a file size limit for uploaded images?', answer: 'Because processing happens on your device hardware, you can compress images up to tens of megabytes seamlessly.' }
    ],
    relatedSlugs: ['image-resizer', 'jpg-to-png', 'png-to-jpg', 'images-to-pdf']
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize image dimensions (width & height in pixels) maintaining aspect ratio client-side.',
    category: 'image',
    icon: 'Scaling',
    isPopular: false,
    metaTitle: 'Free Online Image Resizer (Pixels & Aspect Ratio) | ToolNest',
    metaDescription: 'Resize image dimensions online for free. Adjust image width and height in pixels while locking aspect ratio. Fast, private client-side processing.',
    about: 'Image Resizer scales digital photos and graphics to exact pixel dimensions directly in your browser. Lock aspect ratios to prevent image stretching or distortion, customize width and height values, and download resized images in seconds with zero server uploads.',
    whatIs: {
      heading: 'Understanding Image Dimensions & Aspect Ratio',
      content: [
        'Image dimensions define the horizontal width and vertical height of a graphic in pixels. Aspect ratio is the proportional relationship between width and height (calculated as `width / height`). For example, standard widescreen displays use a 16:9 aspect ratio, while square avatars use 1:1.',
        'When scaling images, locking the aspect ratio ensures that changing one dimension automatically recalculates the other, preventing horizontal squishing or vertical stretching.'
      ]
    },
    howToUse: [
      'Upload your image from your computer or smartphone.',
      'Type your desired width or height in pixels into the dimension fields.',
      'Keep "Maintain Aspect Ratio" checked to preserve natural image proportions.',
      'Click "Resize Image" and download your resized graphic immediately.'
    ],
    features: [
      { title: 'Aspect Ratio Lock', description: 'Automatically calculates proportional height when width is modified (and vice versa).' },
      { title: 'Exact Pixel Precision', description: 'Specify custom pixel dimensions for profile pictures, banners, and thumbnails.' },
      { title: 'Bilinear Canvas Scaling', description: 'Smooth pixel interpolation ensures clean scaling without jagged edges.' },
      { title: 'Complete Local Privacy', description: 'All image rendering occurs on your device GPU/CPU without remote file uploads.' }
    ],
    examples: [
      {
        title: 'Social Media Profile Avatars',
        description: 'Resize any photo into a standard 400 × 400 pixel square for Discord, Twitter, or LinkedIn profile pictures.'
      },
      {
        title: 'YouTube Thumbnail Preparation',
        description: 'Scale custom graphics to the exact recommended 1280 × 720 pixel (16:9) dimensions for YouTube video thumbnails.'
      }
    ],
    faqs: [
      { question: 'What does "Maintain Aspect Ratio" mean?', answer: 'Maintaining aspect ratio ensures that when you change the width, the height scales proportionally so the image does not look stretched or squished.' },
      { question: 'Does resizing an image reduce its file size?', answer: 'Yes! Downscaling an image (e.g. from 4000px to 1000px) significantly decreases the total pixel count, resulting in much smaller file sizes.' },
      { question: 'Why does enlarging an image beyond its original size cause blurriness?', answer: 'Upscaling requires the browser to interpolate (guess) missing pixels, which can cause slight softness. For best results, resize downwards from high-resolution originals.' },
      { question: 'What are standard dimensions for social media banners?', answer: 'Common dimensions include: Twitter Headers (1500 × 500 px), YouTube Banners (2560 × 1440 px), and Facebook Covers (820 × 312 px).' },
      { question: 'Are my private photos uploaded to any external server?', answer: 'No. All resizing computation is executed locally inside your browser memory.' }
    ],
    relatedSlugs: ['image-compressor', 'jpg-to-png', 'png-to-jpg', 'images-to-pdf']
  },
  {
    slug: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    description: 'Convert JPG / JPEG photo files into high-quality PNG format with full transparency support.',
    category: 'image',
    icon: 'FileImage',
    isPopular: false,
    metaTitle: 'Free JPG to PNG Converter Online | ToolNest',
    metaDescription: 'Convert JPG images to PNG format online for free. High quality, instant, browser-based image conversion with zero server uploads.',
    about: 'JPG to PNG Converter transforms JPEG photos and graphics into lossless PNG format directly in your browser. PNG format is ideal for screenshots, digital art, typography, and logos where sharp pixel boundaries and support for alpha transparency are essential.',
    whatIs: {
      heading: 'Why Convert JPG to PNG?',
      content: [
        'JPEG uses lossy discrete cosine transform compression optimized for photographic gradients, which can introduce subtle compression artifacts around high-contrast edges and text.',
        'Portable Network Graphics (PNG) utilizes lossless DEFLATE compression and supports full 8-bit alpha transparency channels. Converting to PNG ensures that subsequent edits or graphics overlays do not suffer from progressive JPEG generation loss.'
      ]
    },
    howToUse: [
      'Select or drag & drop a JPG or JPEG image into the dropzone.',
      'Click the "Convert to PNG" button to process the image in browser memory.',
      'Preview the converted image and click "Download PNG" to save the file.'
    ],
    features: [
      { title: 'Lossless Format Conversion', description: 'Converts JPEG images into uncompressed, artifact-free PNG graphics.' },
      { title: 'Transparency Ready', description: 'Produces standard PNG files ready for alpha channel layers in design tools.' },
      { title: 'Instant Browser Processing', description: 'Zero upload waiting time—conversion executes locally via HTML5 Canvas.' },
      { title: '100% Data Confidentiality', description: 'Your photos and documents never leave your local device.' }
    ],
    examples: [
      {
        title: 'Graphic Design & Editing',
        description: 'Convert JPEG sketches or screenshot assets to PNG before importing into Photoshop or Figma to prevent re-compression artifacts.'
      },
      {
        title: 'Documentation Screenshots',
        description: 'Save software screenshots as PNG to ensure code text and UI button borders remain crisp and legible.'
      }
    ],
    faqs: [
      { question: 'Why does converting JPG to PNG not automatically make the background transparent?', answer: 'JPEG files do not contain transparency data. Converting to PNG creates an opaque PNG; you can subsequently erase the background in an image editor.' },
      { question: 'When should I use PNG instead of JPG?', answer: 'Use PNG for logos, text screenshots, icons, diagrams, and graphics requiring crisp edges. Use JPG for complex, continuous-tone photographs.' },
      { question: 'Why is a PNG file often larger than a JPG file?', answer: 'Because PNG uses lossless compression that preserves every pixel exactly, whereas JPG discards color information to minimize file size.' },
      { question: 'Does converting JPG to PNG restore lost image quality?', answer: 'No. Conversion preserves the existing visual data in lossless format, but cannot reconstruct detail discarded during the original JPEG compression.' },
      { question: 'Is this converter safe for sensitive documents?', answer: 'Yes! All conversion runs client-side in your browser. No files are uploaded to any server.' }
    ],
    relatedSlugs: ['png-to-jpg', 'image-compressor', 'image-resizer', 'images-to-pdf']
  },
  {
    slug: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    description: 'Convert PNG images into lightweight JPG format for smaller file sizes and web optimization.',
    category: 'image',
    icon: 'FileImage',
    isPopular: false,
    metaTitle: 'Free PNG to JPG Converter Online | ToolNest',
    metaDescription: 'Convert PNG images to JPG format online for free. Reduce file size significantly for fast web loading. 100% private in-browser conversion.',
    about: 'PNG to JPG Converter transforms heavy, lossless PNG graphics into lightweight, web-optimized JPEG format. Reduce file sizes by up to 80% for faster website loading, easy email sharing, and compliance with platforms that require standard JPEG photos.',
    whatIs: {
      heading: 'Understanding PNG to JPEG Compression',
      content: [
        'PNG files often consume substantial storage because lossless compression stores complete pixel matrices. For photographic content or detailed illustrations, JPEG lossy compression reduces file weight by discarding color details undetectable by the human eye.',
        'Because the JPEG specification does not support alpha transparency channels, ToolNest automatically applies a clean solid white background behind transparent PNG regions before rasterizing to JPEG.'
      ]
    },
    howToUse: [
      'Select or drag & drop a PNG image file into the converter area.',
      'Click the "Convert to JPG" button to initiate local rasterization.',
      'Inspect the converted preview and click "Download JPG" to save the optimized file.'
    ],
    features: [
      { title: 'Dramatic File Size Reduction', description: 'Reduce image file size significantly for fast web pages and email attachments.' },
      { title: 'Automatic Transparency Handling', description: 'Fills transparent background pixels with a clean solid white canvas.' },
      { title: 'High-Speed Client-Side Execution', description: 'Converts images in milliseconds with zero server upload delay.' },
      { title: 'Privacy Guaranteed', description: 'Files are processed locally in your browser memory and never stored.' }
    ],
    examples: [
      {
        title: 'Optimizing Heavy Screenshots',
        description: 'Convert a 5MB PNG desktop screenshot into a lightweight 300KB JPEG for fast sharing on Slack or email.'
      },
      {
        title: 'Meeting Upload Requirements',
        description: 'Convert PNG identification photos or document scans for government portals that only accept `.jpg` or `.jpeg` formats.'
      }
    ],
    faqs: [
      { question: 'What happens to transparent backgrounds when converting PNG to JPG?', answer: 'Because JPEG does not support alpha transparency, transparent areas are automatically filled with a clean solid white background.' },
      { question: 'Why is JPG much smaller in file size than PNG for photos?', answer: 'JPG uses lossy Discrete Cosine Transform compression optimized for photographic color blends, whereas PNG preserves every single pixel value.' },
      { question: 'Can I convert multiple PNG files?', answer: 'Yes! You can convert PNG files one after another with instant in-browser downloads.' },
      { question: 'Does converting to JPG cause noticeable quality loss?', answer: 'ToolNest encodes JPEGs at high quality (92%), preserving sharp visual fidelity while achieving substantial file size reduction.' },
      { question: 'Are my converted photos stored on any server?', answer: 'No. All conversion takes place in your browser memory using HTML5 Canvas.' }
    ],
    relatedSlugs: ['jpg-to-png', 'image-compressor', 'image-resizer', 'images-to-pdf']
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change (increase/decrease), and X is what % of Y easily.',
    category: 'calculator',
    icon: 'Percent',
    isPopular: true,
    metaTitle: 'Free Online Percentage Calculator | ToolNest',
    metaDescription: 'Calculate percentages easily online. Solve "What is X% of Y?", "X is what percent of Y?", and percentage increase or decrease instantly.',
    about: 'Percentage Calculator provides instant, accurate mathematical tools for everyday financial calculations, retail discounts, test grades, sales tax, profit margins, and percentage change. Featuring three dedicated interactive formula modules with step-by-step mathematical breakdowns, this tool solves percentage problems effortlessly.',
    whatIs: {
      heading: 'How Percentage Calculations Work',
      content: [
        'A percentage is a dimensionless ratio expressed as a fraction of 100 (from the Latin "per centum", meaning "by the hundred"). Percentage calculations solve three fundamental relationships: finding a percentage of a total (`Result = (X * Y) / 100`), finding what percentage one number is of another (`Percent = (X / Y) * 100`), and measuring percentage change (`Change = ((New - Old) / Old) * 100`).',
        'Percentage increase indicates growth relative to the original baseline, while negative percentage change indicates a percentage discount or decrease.'
      ]
    },
    howToUse: [
      'Choose the formula module matching your question (Basic Percentage, Fraction Percentage, or Percentage Change).',
      'Enter your numeric values into the designated X and Y input fields.',
      'The calculated result updates instantly in real time with precision decimals.',
      'Click the "Copy" button next to any result to copy it to your clipboard.'
    ],
    features: [
      { title: '3-in-1 Dedicated Formula Modules', description: 'Solves "What is X% of Y?", "X is what % of Y?", and "Percentage Increase/Decrease".' },
      { title: 'Real-Time Calculation', description: 'Results recalculate dynamically on every keystroke with zero button clicking required.' },
      { title: 'Color-Coded Trend Indicators', description: 'Visual green highlights for positive increases and red highlights for percentage decreases.' },
      { title: '1-Click Result Copy', description: 'Copy calculated integers or formatted percentages directly to your clipboard.' }
    ],
    examples: [
      {
        title: 'Calculating Store Discounts & Sales Tax',
        description: 'Use Formula 1 to find 20% off a $85 jacket ($17 discount, final price $68), or calculate 8.5% sales tax on a purchase.'
      },
      {
        title: 'Measuring Business Revenue Growth',
        description: 'Use Formula 3 to measure growth from $50,000 to $75,000 (+50.00% increase).'
      }
    ],
    faqs: [
      { question: 'How do you calculate percentage increase or decrease?', answer: 'Percentage change is calculated as: `((New Value - Original Value) / Original Value) * 100`. A positive result indicates an increase; a negative result indicates a decrease.' },
      { question: 'What is the difference between a percentage point and a percentage?', answer: 'A percentage point is the simple arithmetic difference between two percentages (e.g., from 10% to 15% is a 5 percentage point increase, but a 50% relative increase).' },
      { question: 'How do I calculate what percentage of a goal I have reached?', answer: 'Use Formula 2: `(Current Amount / Goal Amount) * 100`. For example, $400 raised towards a $500 goal is `(400 / 500) * 100 = 80%`.' },
      { question: 'Can percentage change exceed 100%?', answer: 'Yes! If a metric triples from 10 to 30, the percentage increase is `((30 - 10) / 10) * 100 = 200%`.' },
      { question: 'Are calculations performed locally on my device?', answer: 'Yes. All mathematical calculations run in real time within your browser.' }
    ],
    relatedSlugs: ['word-counter', 'timestamp-converter']
  }
];

export const getToolBySlug = (slug) => {
  return TOOLS_DATA.find(tool => tool.slug === slug);
};

export const getRelatedTools = (tool) => {
  if (!tool || !tool.relatedSlugs) return [];
  return TOOLS_DATA.filter(t => tool.relatedSlugs.includes(t.slug));
};
