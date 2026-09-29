/**
 * Express server.
 *
 * In development it serves only /api/* (Vite proxies to it, see vite.config.js).
 * In production (`npm start`) it additionally serves the built SPA from dist/.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import compression from 'compression';
import 'dotenv/config';

import { handleChat, handleStatus } from './chatHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 3001;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.json({ limit: '64kb' }));

const clientId = (req) =>
  req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'anonymous';

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/chat', async (_req, res) => {
  const { status, body } = await handleStatus();
  res.status(status).json(body);
});

app.post('/api/chat', async (req, res) => {
  const { status, body } = await handleChat({ body: req.body, clientId: clientId(req) });
  res.status(status).json(body);
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found' }));

if (isProduction) {
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(dist)) {
    console.error('dist/ not found — run `npm run build` before `npm start`.');
    process.exit(1);
  }
  app.use(
    express.static(dist, {
      setHeaders(res, filePath) {
        // Hashed bundle assets are immutable; index.html must never be cached.
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('cache-control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('index.html')) {
          res.setHeader('cache-control', 'no-cache');
        }
      },
    }),
  );
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port} (${isProduction ? 'production' : 'development'})`);
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
    console.warn('[server] GEMINI_API_KEY is not set — /api/chat will respond 503. Copy .env.example to .env.');
  }
});
