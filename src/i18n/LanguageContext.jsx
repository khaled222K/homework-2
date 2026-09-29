import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'tgs-lang';
const SUPPORTED = ['ar', 'en'];

/** Arabic is the primary language; English is the secondary toggle. */
const readInitial = () => {
  if (typeof window === 'undefined') return 'ar';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
  } catch {
    // Private-mode or blocked storage: fall through to the default.
  }
  return 'ar';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitial);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Persisting the choice is a nicety, not a requirement.
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), []);

  const value = useMemo(() => {
    const isRtl = lang === 'ar';
    /**
     * Pick the active language out of a bilingual value.
     * Accepts `{ ar, en }`, or a pair of positional strings.
     */
    const t = (arOrObject, maybeEn) => {
      if (arOrObject && typeof arOrObject === 'object') {
        return arOrObject[lang] ?? arOrObject.ar ?? arOrObject.en ?? '';
      }
      return isRtl ? arOrObject : (maybeEn ?? arOrObject);
    };
    return { lang, isRtl, dir: isRtl ? 'rtl' : 'ltr', setLang, toggle, t };
  }, [lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
