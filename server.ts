import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { processEmail } from './server/emailHandler';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

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
        // Return 500 but with informative message so frontend can handle gracefully
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

  // Serve Vite in dev or static in prod
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🎬 AUS PROP CASH Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
