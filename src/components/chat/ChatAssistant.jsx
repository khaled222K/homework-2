import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import Icon from '../ui/Icon.jsx';
import { EASE } from '../ui/motion.js';
import useChat from './useChat.js';

function TypingIndicator() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2.5" role="status" aria-live="polite">
      <span className="sr-only">{t(ui.chat.thinking)}</span>
      <span aria-hidden="true" className="flex items-center gap-1 rounded-2xl bg-mist-100 px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-royal-500 animate-typing-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </span>
    </div>
  );
}

function Bubble({ message, index }) {
  const isUser = message.role === 'user';
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index, 3) * 0.03 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[88%] whitespace-pre-wrap text-pretty rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed ${
          isUser
            ? 'bg-royal-700 text-white rounded-ee-md'
            : 'bg-mist-100 text-navy-900 rounded-es-md'
        }`}
      >
        {message.text}
      </div>
    </motion.li>
  );
}

function EmptyState({ onPick, unconfigured }) {
  const { t, lang } = useLanguage();
  const suggestions = ui.chat.suggestions[lang] ?? ui.chat.suggestions.ar;

  return (
    <div className="flex flex-col gap-6 px-1 py-4">
      <div>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-royal-700">
          <Icon name="chat" className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-navy-900">{t(ui.chat.emptyTitle)}</h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{t(ui.chat.emptyBody)}</p>
      </div>

      {unconfigured ? (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t(ui.chat.errors.not_configured)}</span>
        </div>
      ) : (
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">{t(ui.chat.suggestionsLabel)}</p>
          <ul className="mt-3 grid gap-2">
            {suggestions.map((question, i) => (
              <motion.li
                key={question}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => onPick(question)}
                  className="group flex w-full items-center justify-between gap-3 rounded-xl border border-mist-200 bg-white px-4 py-3 text-start text-sm text-navy-800 transition-[border-color,background-color,transform] duration-300 ease-premium hover:-translate-y-0.5 hover:border-royal-200 hover:bg-mist-50"
                >
                  <span className="min-w-0">{question}</span>
                  <Icon
                    name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'}
                    className="h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-royal-700"
                  />
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Panel({ onClose }) {
  const { t, lang } = useLanguage();
  const { messages, pending, error, availability, send, retry, reset } = useChat();
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the newest turn in view without yanking the page behind the panel.
  useLayoutEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: messages.length > 1 ? 'smooth' : 'auto' });
  }, [messages, pending]);

  const submit = (e) => {
    e?.preventDefault();
    const text = draft;
    setDraft('');
    send(text);
  };

  const errorText = error && (t(ui.chat.errors[error.code] ?? ui.chat.errors.generic) || error.message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      role="dialog"
      aria-label={t(ui.chat.title)}
      className="pointer-events-auto flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-panel border border-mist-200 bg-white shadow-chat sm:h-[min(38rem,calc(100dvh-8rem))]"
    >
      <header className="flex items-start gap-3 border-b border-mist-200 bg-navy-950 p-4 text-white">
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
          <Icon name="chat" className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[0.9375rem] font-semibold">{t(ui.chat.title)}</h2>
          <p className="mt-0.5 text-[0.6875rem] leading-snug text-navy-300">{t(ui.chat.subtitle)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              aria-label={t(ui.chat.clear)}
              title={t(ui.chat.clear)}
              className="grid h-8 w-8 place-items-center rounded-lg text-navy-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <Icon name="refresh" className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.chat.close)}
            className="grid h-8 w-8 place-items-center rounded-lg text-navy-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto p-4 scrollbar-slim">
        {messages.length === 0 && !pending ? (
          <EmptyState onPick={send} unconfigured={availability === 'unconfigured'} />
        ) : (
          <ul className="grid gap-3">
            {messages.map((message, i) => (
              <Bubble key={message.id} message={message} index={i} />
            ))}
            {pending && (
              <li>
                <TypingIndicator />
              </li>
            )}
          </ul>
        )}

        {errorText && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="alert"
            className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm leading-relaxed text-red-900"
          >
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="flex-1">{errorText}</span>
            {error.code !== 'not_configured' && (
              <button
                type="button"
                onClick={retry}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium underline underline-offset-2 transition-colors duration-200 hover:bg-red-100"
              >
                {t(ui.chat.retry)}
              </button>
            )}
          </motion.div>
        )}

        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="border-t border-mist-200 bg-white p-3">
        <div className="flex items-end gap-2">
          <label className="sr-only" htmlFor="chat-input">
            {t(ui.chat.placeholder)}
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            value={draft}
            maxLength={1000}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends; Shift+Enter inserts a newline.
              if (e.key === 'Enter' && !e.shiftKey) submit(e);
            }}
            placeholder={t(ui.chat.placeholder)}
            className="max-h-28 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-[0.9375rem] leading-snug text-navy-900 placeholder:text-ink-faint transition-colors duration-300 focus:border-royal-300 focus:bg-white scrollbar-slim"
          />
          <button
            type="submit"
            disabled={!draft.trim() || pending}
            aria-label={t(ui.chat.send)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-700 text-white transition-[background-color,opacity,transform] duration-300 ease-premium hover:bg-royal-800 active:translate-y-px disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon name="send" className={`h-5 w-5 ${lang === 'ar' ? 'scale-x-[-1]' : ''}`} strokeWidth={1.6} />
          </button>
        </div>
        <p className="mt-2 px-1 text-[0.6875rem] leading-relaxed text-ink-faint">{t(ui.chat.disclaimer)}</p>
      </form>
    </motion.div>
  );
}

/** Floating launcher + panel. Rendered once, at the app root. */
export function ChatAssistant() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 end-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:end-6">
      <AnimatePresence>{open && <Panel onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t(ui.chat.close) : t(ui.chat.open)}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 1 }}
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-navy-950 text-white shadow-chat transition-[background-color,transform] duration-300 ease-premium hover:bg-royal-700 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -35 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 35 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <Icon name={open ? 'close' : 'chat'} className="h-6 w-6" strokeWidth={1.6} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default ChatAssistant;
