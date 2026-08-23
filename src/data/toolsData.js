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
    about: 'PDF Merger allows you to easily combine multiple PDF files into a single, cohesive document directly inside your browser. Reorder files with one click, merge invoices, reports, scanned pages, or study notes without sending private files to any remote server.',
    howToUse: [
      'Click the upload area or drag and drop 2 or more PDF documents.',
      'Use the Up and Down arrow buttons to arrange the desired page sequence.',
      'Click the "Merge PDFs" button to combine files.',
      'Click "Download Merged PDF" to save the final document.'
    ],
    faqs: [
      { question: 'Are my PDF files uploaded to your server?', answer: 'No! All merging is executed 100% client-side inside your browser memory using WebAssembly & JavaScript. Your sensitive PDFs never leave your machine.' },
      { question: 'Is there a limit to how many PDFs I can merge?', answer: 'No arbitrary file limit. You can combine as many PDF files as your computer or phone memory can handle.' }
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
    about: 'PDF Splitter lets you extract specific pages or custom page ranges from any PDF document. Whether you need just page 1 of a contract or chapters 3 to 7 of an eBook, this tool creates a clean new PDF containing only your selected pages instantly.',
    howToUse: [
      'Upload the PDF document you want to split or extract.',
      'Enter your desired page numbers or ranges (e.g., 1-4, 7, 10-12).',
      'Click "Extract & Download" to generate your new document.',
      'Download your customized PDF file immediately.'
    ],
    faqs: [
      { question: 'How do I specify page ranges?', answer: 'You can use commas and hyphens. For example: "1-3" extracts pages 1, 2, and 3. "1, 5, 9-12" extracts pages 1, 5, 9, 10, 11, and 12.' },
      { question: 'Is my data secure?', answer: 'Yes! Processing happens entirely in your local browser. No files are transmitted over the internet.' }
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
    about: 'Images to PDF Converter makes it effortless to compile receipts, photos, scanned notes, or graphic designs into a polished PDF document. Arrange images in your desired sequence, select standard A4 or exact image-fit page sizing, and download in seconds.',
    howToUse: [
      'Select or drag & drop multiple JPG or PNG image files.',
      'Reorder images using the arrow buttons to set page order.',
      'Choose between "Fit Image Size" or "Standard A4 Page".',
      'Click "Convert to PDF" and download your document.'
    ],
    faqs: [
      { question: 'Can I convert multiple images at once?', answer: 'Yes! You can upload multiple JPG and PNG images and combine them into a single multi-page PDF.' },
      { question: 'What formats are supported?', answer: 'We currently support JPG, JPEG, and PNG image formats.' }
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
    about: 'PDF to Images Converter renders each page of your PDF file into a crisp, high-resolution PNG image directly in your browser. Perfect for sharing document slides, embedding pages in presentations, or extracting graphics from PDFs.',
    howToUse: [
      'Upload any PDF document from your device.',
      'Wait a moment while the browser renders each page into an image.',
      'Preview all converted pages on screen.',
      'Download individual page PNGs or click "Download All".'
    ],
    faqs: [
      { question: 'What image quality is produced?', answer: 'We render pages at high 2x scale to ensure text and graphics remain razor sharp when saved as PNG.' },
      { question: 'Are PDF files stored on any server?', answer: 'No. The conversion runs strictly client-side inside your browser canvas. Your documents remain completely private.' }
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
    metaTitle: 'Free QR Code Generator Online | ToolNest',
    metaDescription: 'Generate free QR codes for URLs, text, email, Wi-Fi, and more. Customize colors, size, and error correction. Download as high-res PNG instantly.',
    about: 'QR Code Generator lets you create high-quality, scannable QR codes for any URL, text, email address, phone number, or plain text instantly in your browser. Customize the foreground and background colors, choose from multiple sizes (128px to 1024px), and select error correction levels to balance data density and scan reliability. Everything runs client-side — no uploads, no tracking.',
    howToUse: [
      'Enter any URL, text, email, or phone number in the input box.',
      'The QR code generates automatically in real time.',
      'Customize colors, size, and error correction level.',
      'Click "Download PNG" to save the QR code to your device.'
    ],
    faqs: [
      { question: 'What can I encode in a QR code?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, vCards, and much more.' },
      { question: 'What error correction level should I use?', answer: 'Use "M" for most purposes. Use "H" (30%) if you plan to print the QR code or overlay a logo on it, as it allows the code to be partially damaged and still scan correctly.' },
      { question: 'Are QR codes generated here stored anywhere?', answer: 'No. QR code generation happens entirely in your browser using the qrcode.js library. Nothing is uploaded or stored.' }
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
    about: 'Hash Generator uses your browser\'s built-in Web Crypto API to compute cryptographic hash digests. Hashing is used for data integrity checks, password storage verification, digital signatures, file comparison, and more. All hashing is performed locally — your sensitive data is never transmitted over the network.',
    howToUse: [
      'Type or paste your text into the input field.',
      'SHA-1, SHA-256, SHA-384, and SHA-512 hashes are generated automatically.',
      'Click "Copy" next to any hash to copy it to your clipboard.',
      'Select HEX or Base64 input encoding if your input is not plain text.'
    ],
    faqs: [
      { question: 'What is a cryptographic hash?', answer: 'A hash function maps input data of any size to a fixed-size output (digest). The same input always produces the same hash, making hashes ideal for data integrity verification.' },
      { question: 'Is SHA-256 the same as MD5?', answer: 'No. MD5 and SHA-1 are considered cryptographically broken. SHA-256 and above are modern, secure standards used in TLS/SSL, blockchain, and file verification.' }
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
    about: 'Text Diff Checker compares two blocks of text line by line and shows you exactly what was added, removed, or unchanged between them. This is invaluable for reviewing code changes, comparing document revisions, checking configuration file differences, or proofreading edited content.',
    howToUse: [
      'Paste the original (old) text into the left panel.',
      'Paste the modified (new) text into the right panel.',
      'Differences are highlighted in real time — green for additions, red for deletions.',
      'Copy the diff output or swap the panels using the action buttons.'
    ],
    faqs: [
      { question: 'Can I compare code files?', answer: 'Yes! Text Diff Checker works on any plain text including source code, JSON, XML, HTML, CSS, configuration files, and prose.' },
      { question: 'Is there a text size limit?', answer: 'No hard limit. Since comparison runs in your browser, very large files (several MB) may take a moment to process.' }
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
    about: 'Regex Tester is a powerful regular expression playground for developers. Write your regex pattern, select flags, and paste a test string to see all matches highlighted in real time. Use built-in presets for common patterns like email validation, URL matching, IP addresses, phone numbers, hex colors, and dates.',
    howToUse: [
      'Enter your regular expression pattern in the pattern field.',
      'Toggle flags (Global, Case-insensitive, Multiline, Dotall) as needed.',
      'Paste or type your test string.',
      'View highlighted matches and detailed match information below.'
    ],
    faqs: [
      { question: 'What regex flavor does this support?', answer: 'This tester uses JavaScript\'s native RegExp engine, which supports most standard PCRE-like syntax including lookaheads, non-capturing groups, and named captures (in modern browsers).' },
      { question: 'Can I use it to validate email addresses?', answer: 'Yes! Use the "Email" preset button to load a standard email regex pattern instantly.' }
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
    about: 'Lorem Ipsum Generator creates standard placeholder text used by designers and developers to fill mockups, prototypes, and templates. Quickly generate any number of paragraphs, sentences, or words to test how your design looks with realistic-length content.',
    howToUse: [
      'Choose the output type: Paragraphs, Sentences, or Words.',
      'Set how many units you want (1–100).',
      'Toggle whether to start with the classic "Lorem ipsum" opening.',
      'Click "Generate" and copy the result.'
    ],
    faqs: [
      { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is dummy/placeholder text derived from Cicero\'s "de Finibus Bonorum et Malorum" from 45 BC. It has been the industry\'s standard placeholder text since the 1500s.' },
      { question: 'Can I generate just words or sentences?', answer: 'Yes! Switch between Paragraphs, Sentences, and Words modes using the toggle buttons.' }
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
    metaTitle: 'Free Meta Tag Generator for SEO | ToolNest',
    metaDescription: 'Generate complete HTML meta tags, Open Graph tags, and Twitter Card tags for your webpage. Includes character count guidance and instant copy. Free SEO tool.',
    about: 'Meta Tag Generator creates complete, copy-paste-ready HTML meta tags for your webpage including primary meta tags, Open Graph (Facebook), and Twitter Card tags. It includes real-time character count guidance for title (30–60 chars) and description (120–160 chars) to help you write SEO-optimized tags that rank better in search engines.',
    howToUse: [
      'Enter your page title, description, keywords, and author.',
      'Add your page URL and OG image URL for social sharing previews.',
      'Set your Twitter handle and choose the robots directive.',
      'Copy the generated meta tags and paste them inside the <head> of your HTML.'
    ],
    faqs: [
      { question: 'What is an OG image?', answer: 'Open Graph image is the thumbnail shown when your page is shared on Facebook, LinkedIn, Slack, and other platforms that support the OG protocol. Recommended size: 1200×630px.' },
      { question: 'What character length should the title and description be?', answer: 'Google typically displays 50–60 characters for titles and 120–160 characters for descriptions. Our tool shows a live character count with color-coded warnings.' }
    ],
    relatedSlugs: ['word-counter', 'case-converter', 'url-encoder']
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
    about: 'JSON Formatter is a privacy-first web utility designed for developers, data analysts, and API creators. Raw JSON payloads can often be unreadable when minified. This tool parses your JSON string directly inside your browser, formats it with beautiful syntax indentations, and provides immediate visual feedback on structural errors without sending your payload to any remote server.',
    howToUse: [
      'Paste your raw JSON code or text into the input text area.',
      'Click the "Format JSON" button to beautify the code with standard 2-space indentation.',
      'Use "Minify JSON" if you want to condense the payload into a single line.',
      'Click "Copy Result" to save the formatted JSON to your clipboard.'
    ],
    faqs: [
      {
        question: 'Is my JSON data uploaded to your server?',
        answer: 'No. All JSON formatting and validation happens strictly client-side inside your web browser. Your data never leaves your device.'
      },
      {
        question: 'What happens if my JSON has a syntax error?',
        answer: 'The tool detects parsing syntax errors and displays the line and offset message so you can quickly fix missing quotes, trailing commas, or bracket mismatches.'
      },
      {
        question: 'Can I format large JSON files?',
        answer: 'Yes! Since processing is handled by your browser JavaScript engine, it can process large multi-megabyte JSON payloads instantly.'
      }
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
    about: 'JSON Validator helps software engineers verify that a given string adheres to strict JSON specification standards (RFC 8259). It inspects brackets, data types, key quotes, comma separators, and escape characters, reporting precise error locations when invalid data is detected.',
    howToUse: [
      'Enter or paste the JSON text you wish to check into the input field.',
      'Click the "Validate JSON" button.',
      'Look at the status message to confirm validity or view exact line error details.',
      'Copy clean output or clear the input to validate another payload.'
    ],
    faqs: [
      {
        question: 'Why does my JSON fail validation?',
        answer: 'Common reasons include trailing commas after the last item, single quotes instead of double quotes around keys, or unescaped control characters.'
      },
      {
        question: 'Is this JSON validator free for commercial use?',
        answer: 'Yes, ToolNest tools are 100% free with unlimited usage for personal and commercial projects.'
      }
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
    about: 'Universally Unique Identifiers (UUID v4) are 128-bit numbers used to uniquely identify information in computer systems. ToolNest UUID Generator uses the web standard `crypto.getRandomValues()` API to generate true RFC 4122 compliant version 4 UUIDs instantly.',
    howToUse: [
      'Choose how many UUIDs you need to generate (from 1 to 50).',
      'Click "Generate UUIDs" to create fresh, secure identifiers.',
      'Click "Copy All" to copy the generated UUID list to your clipboard.'
    ],
    faqs: [
      {
        question: 'Are these UUIDs cryptographically random?',
        answer: 'Yes. We utilize your browser browser crypto API (window.crypto.getRandomValues) to guarantee high-entropy randomness for every UUID generated.'
      },
      {
        question: 'What is a Version 4 UUID?',
        answer: 'A Version 4 UUID is generated using random or pseudo-random numbers. The probability of generating a duplicate UUID v4 is practically zero.'
      }
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
    about: 'Base64 encoding schemes are commonly used when binary data needs to be stored and transferred over media designed to deal with textual data. This tool allows seamless conversion between UTF-8 text and Base64 format directly in your browser with full unicode support.',
    howToUse: [
      'Select whether you want to "Encode" or "Decode".',
      'Type or paste your content into the input box.',
      'The converted Base64 or plain text output updates immediately.',
      'Click "Copy Result" to copy to your clipboard.'
    ],
    faqs: [
      {
        question: 'Does Base64 provide security or encryption?',
        answer: 'No. Base64 is an encoding scheme, not an encryption algorithm. Anyone can easily decode Base64 data.'
      },
      {
        question: 'Does this tool support non-ASCII and Unicode characters?',
        answer: 'Yes, our encoder properly handles UTF-8 characters including emojis, accented letters, and foreign scripts.'
      }
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
    about: 'URL encoding converts characters into a format that can be safely transmitted over the Internet using HTTP requests. Unsafe ASCII characters are replaced with a "%" followed by two hexadecimal digits.',
    howToUse: [
      'Choose between "Encode URL" or "Decode URL".',
      'Enter your web address, query parameters, or URI text.',
      'Click the convert button to get your safe URL string.',
      'Copy the output with a single click.'
    ],
    faqs: [
      {
        question: 'Why do URLs need to be encoded?',
        answer: 'URLs can only be sent over the Internet using the ASCII character-set. Characters outside the ASCII set or reserved characters (like ?, &, =, +) must be percent-encoded to prevent parsing ambiguity.'
      }
    ],
    relatedSlugs: ['base64', 'json-formatter']
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
    about: 'A Unix timestamp represents the number of seconds that have elapsed since January 1, 1970 UTC (the Unix Epoch). This tool makes epoch conversion seamless, supporting both seconds (10 digits) and milliseconds (13 digits) along with ISO 8601 formatting.',
    howToUse: [
      'View the live current Unix timestamp.',
      'Enter a Unix timestamp to convert it into human-readable UTC and Local Date formats.',
      'Or pick a date & time using the date selector to calculate its exact Unix timestamp.',
      'Copy the converted values instantly.'
    ],
    faqs: [
      {
        question: 'Does this handle both 10-digit and 13-digit timestamps?',
        answer: 'Yes! The tool automatically detects whether your input timestamp is in seconds (10 digits) or milliseconds (13 digits).'
      },
      {
        question: 'What is epoch time?',
        answer: 'Epoch time is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970, not counting leap seconds.'
      }
    ],
    relatedSlugs: ['password-generator', 'word-counter']
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
    about: 'Creating unique, complex passwords for every account is essential for modern cybersecurity. ToolNest Password Generator runs client-side using browser-native CSPRNG to craft unguessable passwords tailored to your length and character set preferences.',
    howToUse: [
      'Set your desired password length using the slider (8 to 64 characters).',
      'Toggle options for Uppercase letters (A-Z), Lowercase (a-z), Numbers (0-9), and Special Symbols (!@#$%...).',
      'Click "Generate Password" to produce a fresh secure credential.',
      'Check the real-time Password Strength meter and click "Copy Password".'
    ],
    faqs: [
      {
        question: 'Are generated passwords saved anywhere?',
        answer: 'Never. Passwords are generated strictly inside your browser window memory using Web Crypto APIs. They are never sent to or saved on any server.'
      },
      {
        question: 'How long should a strong password be?',
        answer: 'We recommend passwords at least 14 to 16 characters long containing a mix of uppercase, lowercase, numbers, and symbols.'
      }
    ],
    relatedSlugs: ['uuid-generator', 'word-counter']
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
    about: 'Word Counter is an essential text analytics tool for writers, students, social media managers, and copywriters. It updates real-time metrics instantly as you type, helping you stay within strict word limits for essays, tweets, meta descriptions, and articles.',
    howToUse: [
      'Type or paste your text into the main text box.',
      'View real-time word count, character count, space-free characters, sentence count, and paragraph count.',
      'Check estimated reading time calculation.',
      'Use the "Clear" or "Copy Text" buttons to manage your content.'
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Estimated reading time is calculated based on an average adult reading speed of 200 words per minute.'
      },
      {
        question: 'Does this tool count spaces as characters?',
        answer: 'We provide both metrics: total character count (including spaces) and character count excluding spaces.'
      }
    ],
    relatedSlugs: ['case-converter', 'password-generator']
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
    about: 'Case Converter easily transforms blocks of text into any letter case standard. Perfect for programming identifiers, blog headlines, dataset normalization, or formatting text documents quickly.',
    howToUse: [
      'Enter or paste your text into the input area.',
      'Click the button corresponding to your target case format (UPPERCASE, lowercase, Title Case, camelCase, etc.).',
      'The converted text updates immediately in the output area.',
      'Click "Copy Result" to copy to clipboard.'
    ],
    faqs: [
      {
        question: 'What is the difference between camelCase and snake_case?',
        answer: 'camelCase capitalizes every word after the first without spaces (e.g. `myVariableName`), while snake_case uses lowercase words separated by underscores (e.g. `my_variable_name`).'
      }
    ],
    relatedSlugs: ['word-counter', 'json-formatter']
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
    about: 'Color Converter allows web designers and frontend developers to seamlessly translate color formats. Select a color using the visual picker or paste HEX, RGB, or HSL values to obtain instant accurate translations across all CSS color standards.',
    howToUse: [
      'Use the native color picker to select a color, or paste your HEX, RGB, or HSL code into the input field.',
      'View the real-time interactive color preview swatch.',
      'Copy individual HEX, RGB, or HSL CSS values with a single click.'
    ],
    faqs: [
      {
        question: 'What is HEX color format?',
        answer: 'HEX format represents colors using a 6-digit hexadecimal string prefixed with # (e.g. #2563EB for primary blue).'
      },
      {
        question: 'When should I use HSL instead of RGB?',
        answer: 'HSL (Hue, Saturation, Lightness) is often preferred when creating color themes because adjusting brightness or saturation is intuitive.'
      }
    ],
    relatedSlugs: ['image-compressor', 'image-resizer']
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
    about: 'Optimize your website images and save bandwidth with ToolNest Image Compressor. Processing is conducted completely in-browser using HTML5 Canvas APIs. Your private images are never uploaded to an external server, making this tool 100% safe, instant, and privacy-friendly.',
    howToUse: [
      'Click or drag-and-drop your image file (JPG, JPEG, PNG, or WebP).',
      'Adjust the quality slider to balance image file size and visual fidelity.',
      'Inspect the side-by-side original file size, compressed size, and percentage reduction.',
      'Click "Download Compressed Image" to save the optimized file.'
    ],
    faqs: [
      {
        question: 'Are my images uploaded to any server?',
        answer: 'No! Your images are processed entirely inside your local browser memory using HTML5 Canvas technology. No data is transmitted over the internet.'
      },
      {
        question: 'What image formats are supported?',
        answer: 'We support JPG, JPEG, PNG, and WebP image formats.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Because processing happens on your device hardware, you can compress images up to tens of megabytes seamlessly.'
      }
    ],
    relatedSlugs: ['image-resizer', 'jpg-to-png', 'png-to-jpg']
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
    about: 'Resize photos and graphics for social media, websites, or email attachments in seconds. ToolNest Image Resizer lets you set precise pixel dimensions with automatic aspect ratio lock.',
    howToUse: [
      'Upload your image from your computer or phone.',
      'Type your desired width or height in pixels.',
      'Keep "Maintain Aspect Ratio" checked to prevent image distortion.',
      'Click "Resize Image" and download the resized result immediately.'
    ],
    faqs: [
      {
        question: 'Does resizing reduce image quality?',
        answer: 'Downscaling reduces file size while maintaining clarity. Upscaling beyond original dimensions may result in slight pixelation.'
      },
      {
        question: 'Is this resizer safe for private photos?',
        answer: 'Yes, your images never leave your browser.'
      }
    ],
    relatedSlugs: ['image-compressor', 'jpg-to-png', 'png-to-jpg']
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
    about: 'Convert JPG photos into lossless PNG format easily. PNG format is ideal for graphics, text screenshots, and graphics requiring crisp edges.',
    howToUse: [
      'Select or drop a JPG / JPEG image file into the dropzone.',
      'Click "Convert to PNG".',
      'Preview the converted image and click "Download PNG".'
    ],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG uses lossless compression, preserving sharp image detail and text crispness which JPG lossy compression can degrade.'
      }
    ],
    relatedSlugs: ['png-to-jpg', 'image-compressor', 'image-resizer']
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
    about: 'PNG files can often be large due to uncompressed data. Converting PNGs to JPG significantly reduces file sizes, making them perfect for fast web pages and email attachments.',
    howToUse: [
      'Select or drop a PNG image file into the converter area.',
      'Click "Convert to JPG".',
      'Download your optimized JPG image file instantly.'
    ],
    faqs: [
      {
        question: 'What happens to PNG transparency when converting to JPG?',
        answer: 'Because JPG does not support alpha transparency channels, transparent backgrounds are automatically filled with a clean white background.'
      }
    ],
    relatedSlugs: ['jpg-to-png', 'image-compressor', 'image-resizer']
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
    about: 'ToolNest Percentage Calculator provides simple, accurate math tools for everyday calculations, financial discounts, grade calculations, tax rates, and statistical percentage changes.',
    howToUse: [
      'Select the percentage formula type you want to solve.',
      'Input numbers X and Y into the designated fields.',
      'View instant precise calculation results with step-by-step mathematical breakdown.'
    ],
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Percentage increase is calculated as: `((New Value - Original Value) / Original Value) * 100`.'
      },
      {
        question: 'Can I calculate negative percentages or discounts?',
        answer: 'Yes, entering lower target numbers will automatically calculate negative percentage decreases.'
      }
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
