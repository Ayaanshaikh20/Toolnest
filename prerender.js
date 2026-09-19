import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from './src/data/blogData.js';

const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/blog',
  ...BLOG_POSTS.map(post => `/blog/${post.slug}`)
];

(async () => {
  console.log('Starting preview server for prerendering...');
  const server = await preview({ preview: { port: 4173 } });
  
  console.log('Launching puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get the HTML content
    const html = await page.content();
    
    // Determine output path (e.g., dist/about/index.html)
    const dir = route === '/' ? 'dist' : path.join('dist', route.slice(1));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  
  await browser.close();
  server.httpServer.close();
  console.log('Prerendering complete!');
  process.exit(0);
})();
