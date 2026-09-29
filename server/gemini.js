/**
 * Gemini client.
 *
 * Model selection is deliberately NOT a hard-coded constant. On first use the
 * client asks the Gemini API's own ListModels endpoint which models currently
 * support `generateContent`, and picks the best available one by preference
 * order. That keeps the deployment correct as Google's line-up moves, and it
 * degrades to a sane default if the discovery call is unavailable.
 *
 * Set GEMINI_MODEL to pin a specific model and skip discovery entirely.
 */

const API_ROOT = 'https://generativelanguage.googleapis.com/v1beta';

/** Fallback if model discovery fails and GEMINI_MODEL is unset. */
const DEFAULT_MODEL = 'gemini-2.5-flash';

/**
 * Model families we are willing to use, best first. A discovered model is
 * scored by the first pattern it matches; ties break toward the higher version
 * number the API reports.
 */
const PREFERENCE = [
  /^gemini-(\d+(?:\.\d+)?)-flash$/, // current-generation flash, GA
  /^gemini-(\d+(?:\.\d+)?)-flash-lite$/,
  /^gemini-(\d+(?:\.\d+)?)-pro$/,
  /^gemini-(\d+(?:\.\d+)?)-flash-\d{3}$/, // dated GA revisions
];

/** Never select these, whatever the API reports. */
const EXCLUDE = /(-tts|-image|-audio|-native-audio|-live|-embedding|-vision|-thinking|-exp|-preview|-latest|-\d{4}-\d{2}-\d{2})/;

export class GeminiError extends Error {
  constructor(message, { status = 502, code = 'gemini_error', retryable = false } = {}) {
    super(message);
    this.name = 'GeminiError';
    this.status = status;
    this.code = code;
    this.retryable = retryable;
  }
}

const getKey = () => {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key || key === 'your_api_key_here') {
    throw new GeminiError('GEMINI_API_KEY is not configured on the server.', {
      status: 503,
      code: 'missing_api_key',
    });
  }
  return key;
};

export const isConfigured = () => {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key) && key !== 'your_api_key_here';
};

const withTimeout = async (url, options, ms) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new GeminiError('The request to the model timed out.', {
        status: 504,
        code: 'upstream_timeout',
        retryable: true,
      });
    }
    throw new GeminiError(`Could not reach the Gemini API: ${err.message}`, {
      status: 502,
      code: 'upstream_unreachable',
      retryable: true,
    });
  } finally {
    clearTimeout(timer);
  }
};

const score = (name) => {
  for (let i = 0; i < PREFERENCE.length; i += 1) {
    const match = PREFERENCE[i].exec(name);
    if (match) return { tier: i, version: Number.parseFloat(match[1]) || 0 };
  }
  return null;
};

let resolvedModel = null;
let resolving = null;

/** Resolve a model id that the API currently serves for generateContent. */
export async function resolveModel() {
  const pinned = process.env.GEMINI_MODEL?.trim();
  if (pinned) return pinned;
  if (resolvedModel) return resolvedModel;
  if (resolving) return resolving;

  resolving = (async () => {
    try {
      const res = await withTimeout(
        `${API_ROOT}/models?pageSize=200&key=${encodeURIComponent(getKey())}`,
        { headers: { accept: 'application/json' } },
        10_000,
      );
      if (!res.ok) throw new Error(`ListModels responded ${res.status}`);
      const body = await res.json();

      const candidates = (body.models ?? [])
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => ({ id: String(m.name).replace(/^models\//, ''), raw: m }))
        .filter((m) => !EXCLUDE.test(m.id))
        .map((m) => ({ ...m, score: score(m.id) }))
        .filter((m) => m.score)
        .sort((a, b) => a.score.tier - b.score.tier || b.score.version - a.score.version);

      resolvedModel = candidates[0]?.id ?? DEFAULT_MODEL;
    } catch (err) {
      // Discovery is a convenience, never a hard dependency.
      console.warn(`[gemini] model discovery failed (${err.message}); using ${DEFAULT_MODEL}`);
      resolvedModel = DEFAULT_MODEL;
    } finally {
      resolving = null;
    }
    console.log(`[gemini] using model: ${resolvedModel}`);
    return resolvedModel;
  })();

  return resolving;
}

const SAFE_ERRORS = {
  400: ['bad_request', 'The model rejected the request.'],
  401: ['unauthorized', 'The configured GEMINI_API_KEY was rejected.'],
  403: ['forbidden', 'The configured GEMINI_API_KEY is not permitted to use this model.'],
  404: ['model_not_found', 'The configured Gemini model was not found.'],
  429: ['rate_limited', 'The assistant is receiving too many requests right now.'],
};

/**
 * Send a turn to Gemini.
 * @param {{systemInstruction: string, history: Array<{role:'user'|'model', text:string}>}} args
 * @returns {Promise<{text: string, model: string, finishReason?: string}>}
 */
export async function generate({ systemInstruction, history }) {
  const key = getKey();
  const model = await resolveModel();

  const payload = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    generationConfig: {
      temperature: 0.2, // low: this assistant reports facts, it does not invent
      topP: 0.9,
      maxOutputTokens: 800,
      candidateCount: 1,
    },
    safetySettings: [
      'HARM_CATEGORY_HARASSMENT',
      'HARM_CATEGORY_HATE_SPEECH',
      'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'HARM_CATEGORY_DANGEROUS_CONTENT',
    ].map((category) => ({ category, threshold: 'BLOCK_MEDIUM_AND_ABOVE' })),
  };

  const res = await withTimeout(
    `${API_ROOT}/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(payload),
    },
    30_000,
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[gemini] ${model} responded ${res.status}: ${detail.slice(0, 500)}`);

    // Google answers a bad key with 400 API_KEY_INVALID rather than 401, which
    // would otherwise surface to the operator as a vague "bad request".
    const badKey = res.status === 400 && detail.includes('API_KEY_INVALID');
    const [code, message] = badKey
      ? SAFE_ERRORS[401]
      : (SAFE_ERRORS[res.status] ?? ['upstream_error', 'The model is unavailable right now.']);

    throw new GeminiError(message, {
      status: res.status === 429 ? 429 : 502,
      code,
      retryable: res.status === 429 || res.status >= 500,
    });
  }

  let body;
  try {
    body = await res.json();
  } catch {
    throw new GeminiError('The model returned a response that could not be parsed.', {
      status: 502,
      code: 'invalid_upstream_response',
      retryable: true,
    });
  }

  if (body.promptFeedback?.blockReason) {
    throw new GeminiError('That request was blocked by the model’s safety filters.', {
      status: 422,
      code: 'blocked',
    });
  }

  const candidate = body.candidates?.[0];
  const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('').trim();

  if (!text) {
    // A finishReason of MAX_TOKENS with no parts, a SAFETY stop, or an empty
    // candidate list all land here — none of them should surface as a crash.
    throw new GeminiError('The model returned an empty response.', {
      status: 502,
      code: candidate?.finishReason === 'SAFETY' ? 'blocked' : 'empty_response',
      retryable: candidate?.finishReason !== 'SAFETY',
    });
  }

  return { text, model, finishReason: candidate?.finishReason };
}
