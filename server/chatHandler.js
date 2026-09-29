/**
 * Transport-agnostic handler for POST /api/chat.
 *
 * Both the Express dev/production server and the serverless entry point in
 * api/chat.js call this, so the two deployments cannot drift apart.
 */
import { generate, GeminiError, isConfigured, resolveModel } from './gemini.js';
import { getSystemInstruction } from './knowledge.js';

const MAX_MESSAGE_CHARS = 1_000;
const MAX_HISTORY_TURNS = 12;

/** Very small fixed-window limiter — enough to stop a single tab hammering the key. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map();

function rateLimited(clientId) {
  const now = Date.now();
  const entry = hits.get(clientId);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(clientId, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
  }
  return entry.count > MAX_PER_WINDOW;
}

export class BadRequest extends Error {
  constructor(message, code = 'bad_request') {
    super(message);
    this.status = 400;
    this.code = code;
  }
}

/** Validate and normalise the incoming body into a Gemini-shaped history. */
export function parseBody(body) {
  if (!body || typeof body !== 'object') throw new BadRequest('A JSON body is required.');

  const { message, history } = body;

  if (typeof message !== 'string' || !message.trim()) {
    throw new BadRequest('`message` must be a non-empty string.', 'empty_message');
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    throw new BadRequest(`\`message\` must be ${MAX_MESSAGE_CHARS} characters or fewer.`, 'message_too_long');
  }

  const priorTurns = Array.isArray(history) ? history : [];
  const normalised = priorTurns
    .filter((t) => t && typeof t.text === 'string' && t.text.trim() && (t.role === 'user' || t.role === 'model'))
    .slice(-MAX_HISTORY_TURNS)
    .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_MESSAGE_CHARS) }));

  // Gemini requires the conversation to open with a user turn.
  while (normalised.length && normalised[0].role !== 'user') normalised.shift();

  return [...normalised, { role: 'user', text: message.trim() }];
}

/**
 * @param {{body: unknown, clientId: string}} req
 * @returns {Promise<{status:number, body:object}>}
 */
export async function handleChat({ body, clientId = 'anonymous' }) {
  if (!isConfigured()) {
    return {
      status: 503,
      body: {
        error: 'not_configured',
        message:
          'المساعد الذكي غير مُفعَّل على هذا الخادم بعد. / The AI assistant is not configured on this server yet.',
        hint: 'Set GEMINI_API_KEY in the server environment — see .env.example.',
      },
    };
  }

  if (rateLimited(clientId)) {
    return {
      status: 429,
      body: {
        error: 'rate_limited',
        message: 'عدد كبير من الطلبات. يرجى المحاولة بعد قليل. / Too many requests — please try again shortly.',
      },
    };
  }

  let history;
  try {
    history = parseBody(body);
  } catch (err) {
    if (err instanceof BadRequest) return { status: err.status, body: { error: err.code, message: err.message } };
    throw err;
  }

  try {
    const { text, model } = await generate({ systemInstruction: getSystemInstruction(), history });
    return { status: 200, body: { reply: text, model } };
  } catch (err) {
    if (err instanceof GeminiError) {
      return {
        status: err.status,
        body: { error: err.code, message: err.message, retryable: err.retryable },
      };
    }
    console.error('[chat] unexpected failure', err);
    return {
      status: 500,
      body: { error: 'internal_error', message: 'Something went wrong handling that message.' },
    };
  }
}

/** GET /api/chat — cheap readiness probe for the UI's empty state. */
export async function handleStatus() {
  if (!isConfigured()) {
    return { status: 200, body: { configured: false } };
  }
  return { status: 200, body: { configured: true, model: await resolveModel() } };
}
