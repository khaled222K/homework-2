import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Chat state for the assistant.
 *
 * Talks only to the same-origin /api/chat route — the Gemini key lives on the
 * server and is never exposed to this code. History is kept in memory so a
 * reload starts clean; nothing about a visitor is persisted.
 */
const MAX_HISTORY = 12;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState('unknown'); // unknown | ready | unconfigured
  const abortRef = useRef(null);
  const lastUserMessage = useRef(null);

  // Probe once so the empty state can warn up front if the key is missing,
  // rather than failing only after the visitor has typed a question.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/chat', { method: 'GET' })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        setAvailability(body.configured ? 'ready' : 'unconfigured');
      })
      .catch(() => {
        // A failed probe is not itself an error worth showing; the first send
        // will surface anything real.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (raw) => {
      const text = raw.trim();
      if (!text || pending) return;

      lastUserMessage.current = text;
      setError(null);
      setPending(true);

      const history = messages
        .filter((m) => m.role === 'user' || m.role === 'model')
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, text: m.text }));

      setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
          signal: controller.signal,
        });

        const body = await res.json().catch(() => null);

        if (!res.ok || !body?.reply) {
          setError({ code: body?.error ?? 'generic', message: body?.message });
          if (body?.error === 'not_configured') setAvailability('unconfigured');
          return;
        }

        setAvailability('ready');
        setMessages((prev) => [...prev, { id: `m-${Date.now()}`, role: 'model', text: body.reply }]);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError({ code: 'network' });
      } finally {
        setPending(false);
      }
    },
    [messages, pending],
  );

  const retry = useCallback(() => {
    const last = lastUserMessage.current;
    if (!last) return;
    // Drop the user turn that failed so it is not duplicated on resend.
    setMessages((prev) => {
      const next = [...prev];
      if (next.at(-1)?.role === 'user') next.pop();
      return next;
    });
    setError(null);
    // Defer so the state above is applied before the resend reads `messages`.
    queueMicrotask(() => send(last));
  }, [send]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setPending(false);
    lastUserMessage.current = null;
  }, []);

  return { messages, pending, error, availability, send, retry, reset };
}

export default useChat;
