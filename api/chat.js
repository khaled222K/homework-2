/**
 * Serverless entry point for POST /api/chat (Vercel / Netlify Functions style).
 *
 * The logic lives in server/chatHandler.js so this and the Express server stay
 * in lockstep. GEMINI_API_KEY is read from the platform's environment — it is
 * never sent to, or readable by, the browser.
 */
import { handleChat, handleStatus } from '../server/chatHandler.js';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { status, body } = await handleStatus();
    return res.status(status).json(body);
  }

  if (req.method !== 'POST') {
    res.setHeader('allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const clientId =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'anonymous';

  // Some platforms hand the body through unparsed.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'invalid_json', message: 'Request body was not valid JSON.' });
    }
  }

  const result = await handleChat({ body, clientId });
  return res.status(result.status).json(result.body);
}
