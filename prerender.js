import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from './src/data/blogData.js';
import { TOOLS_DATA } from './src/data/toolsData.js';

const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/blog',
  ...BLOG_POSTS.map(post => `/blog/${post.slug}`),
  ...TOOLS_DATA.map(tool => `/tools/${tool.slug}`)
];

(async () => {
  console.log('Starting preview server for prerendering...');
  const server = await preview({ preview: { port: 4173 } });
  
  console.log(`Launching puppeteer to prerender ${routes.length} routes...`);
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Small delay to ensure React useEffect (SEO updates) have settled
      await new Promise(r => setTimeout(r, 400));
      
      // Get the HTML content
      const html = await page.content();
      
      // Determine output path (e.g., dist/about/index.html or dist/tools/svg-to-png/index.html)
      const dir = route === '/' ? 'dist' : path.join('dist', route.slice(1));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(dir, 'index.html'), html);
    } catch (err) {
      console.error(`Error prerendering ${route}:`, err.message);
    }
  }
  
  await browser.close();
  server.httpServer.close();
  console.log(`Prerendering complete for all ${routes.length} routes!`);
  process.exit(0);
})();
