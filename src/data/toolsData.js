export const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'developer', name: 'Developer Tools' },
  { id: 'image', name: 'Image Tools' },
  { id: 'text', name: 'Text Tools' },
  { id: 'converter', name: 'Converters' },
  { id: 'calculator', name: 'Calculators' }
];

export const TOOLS_DATA = [
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
