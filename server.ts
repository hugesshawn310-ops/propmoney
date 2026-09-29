import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { processEmail } from './server/emailHandler';
import { generateSitemapXml, generateRobotsTxt } from './server/sitemapHandler';
import { resolveRouteSeo } from './server/seoRenderer';
import { injectSeoIntoHtml } from './server/htmlInjector';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

  // Security Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Middleware for body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Route: Send Email via Zoho SMTP
  app.post('/api/send-email', async (req, res) => {
    try {
      const result = await processEmail(req.body);
      if (result.success) {
        return res.json({ success: true, message: result.message });
      } else {
        return res.status(500).json({ success: false, error: result.message, details: result.details });
      }
    } catch (err: any) {
      console.error('Unhandled API send-email error:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Internal server error' });
    }
  });

  // API Route: Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'AUS PROP CASH Email & Order Server',
      smtpUser: process.env.SMTP_USER || 'sales@propmoneyaustralia.com.au',
      smtpHost: process.env.SMTP_HOST || 'smtp.zoho.com',
      smtpPort: process.env.SMTP_PORT || '465',
    });
  });

  // Technical SEO Route: robots.txt
  app.get('/robots.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(generateRobotsTxt());
  });

  // Technical SEO Route: sitemap.xml
  app.get('/sitemap.xml', (_req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(generateSitemapXml());
  });

  // Serve Vite in dev or static in prod with SSR & Dynamic Metadata Injection
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const seo = resolveRouteSeo(url);
        const html = injectSeoIntoHtml(template, seo);
        res.status(seo.statusCode).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res) => {
      try {
        const url = req.originalUrl;
        const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
        const seo = resolveRouteSeo(url);
        const html = injectSeoIntoHtml(template, seo);
        res.status(seo.statusCode).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        res.status(500).send('Error rendering page');
      }
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🎬 AUS PROP CASH Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();

