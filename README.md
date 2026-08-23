# ToolNest - Free Online Tools That Just Work

ToolNest is a production-ready, privacy-focused online utilities web app built with **React + Vite + JavaScript**. It offers 15+ browser-based tools designed to attract organic search engine traffic and monetize through display advertising (Google AdSense).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
This outputs an optimized, static production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 How to Deploy to Vercel

1. Install Vercel CLI (or connect your GitHub repository to [Vercel Dashboard](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. Set Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. For Single Page App (SPA) routing, create a `vercel.json` in the root folder if needed:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

---

## ⚡ How to Deploy to Netlify

1. Connect your repository to [Netlify](https://netlify.com) or deploy via Netlify CLI:
   ```bash
   npx netlify deploy --build --prod
   ```
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
3. SPA Redirects rule (create `public/_redirects`):
   ```
   /*    /index.html   200
   ```

---

## 💰 Where to Add Google AdSense Code

Open [`src/components/AdPlaceholder.jsx`](file:///c:/Users/ayaan/Desktop/Projects/Toolnest/src/components/AdPlaceholder.jsx).

Replace the placeholder content with your actual Google AdSense `<ins>` tag:

```jsx
export const AdPlaceholder = ({ position = 'middle' }) => {
  return (
    <div className={`ad-container ad-position-${position}`} style={{ margin: '2rem 0', textAlign: 'center' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};
```
Also, paste your main AdSense script tag into [`index.html`](file:///c:/Users/ayaan/Desktop/Projects/Toolnest/index.html) inside `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

---

## 📊 Where to Add Google Analytics (GA4 / GTM)

Open [`src/config/analytics.js`](file:///c:/Users/ayaan/Desktop/Projects/Toolnest/src/config/analytics.js).

Update `gaMeasurementId` and set `enabled: true`:

```javascript
export const ANALYTICS_CONFIG = {
  gaMeasurementId: 'G-XXXXXXXXXX', // Insert your GA4 Measurement ID
  enabled: true,
};
```

---

## 🛠️ How to Add a New Tool in 3 Steps

1. **Create Tool UI Component**: Create a component in `src/tools/MyNewTool.jsx`.
2. **Register Tool Metadata**: Open [`src/data/toolsData.js`](file:///c:/Users/ayaan/Desktop/Projects/Toolnest/src/data/toolsData.js) and append your tool metadata object:
   ```javascript
   {
     slug: 'my-new-tool',
     name: 'My New Tool',
     description: 'Short tool summary...',
     category: 'developer',
     icon: 'Wrench',
     isPopular: false,
     metaTitle: 'Free My New Tool | ToolNest',
     metaDescription: 'SEO description...',
     about: 'Detailed breakdown...',
     howToUse: ['Step 1...', 'Step 2...'],
     faqs: [{ question: '...', answer: '...' }],
     relatedSlugs: ['json-formatter']
   }
   ```
3. **Register Component Mapping**: Open [`src/tools/index.js`](file:///c:/Users/ayaan/Desktop/Projects/Toolnest/src/tools/index.js) and map the slug:
   ```javascript
   import { MyNewTool } from './MyNewTool';
   
   export const TOOL_COMPONENTS = {
     // ...
     'my-new-tool': MyNewTool,
   };
   ```

---

## 🏷️ How to Change Site Name / Tagline / Logo

- **Brand Name & Tagline**: Update `index.html`, `src/components/Header.jsx`, `src/components/Footer.jsx`, and `src/data/toolsData.js`.
- **Logo Icon**: Replace `public/favicon.svg` or update the SVG inside `Header.jsx`.

---

## 📦 Built-In Tools List & URLs

- `/tools/json-formatter` — JSON Formatter & Beautifier
- `/tools/json-validator` — JSON Validator & Syntax Checker
- `/tools/uuid-generator` — UUID v4 Generator
- `/tools/base64` — Base64 Encoder / Decoder
- `/tools/url-encoder` — URL Encoder / Decoder
- `/tools/timestamp-converter` — Unix Timestamp Converter
- `/tools/password-generator` — Password Generator
- `/tools/word-counter` — Word Counter & Character Counter
- `/tools/case-converter` — Text Case Converter
- `/tools/color-converter` — HEX / RGB / HSL Color Converter
- `/tools/image-compressor` — Image Compressor (JPG/PNG/WebP)
- `/tools/image-resizer` — Image Resizer (Pixels & Aspect Ratio)
- `/tools/jpg-to-png` — JPG to PNG Converter
- `/tools/png-to-jpg` — PNG to JPG Converter
- `/tools/percentage-calculator` — Percentage Calculator
