/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy — the institutional anchor.
        navy: {
          50: '#f2f5fa',
          100: '#e3eaf4',
          200: '#c3d2e7',
          300: '#92aed2',
          400: '#5a84b7',
          500: '#3a659d',
          600: '#2b4e7e',
          700: '#243f66',
          800: '#1b3050',
          900: '#122036',
          950: '#0b1524',
        },
        // Royal blue — the active, interactive colour.
        royal: {
          50: '#eef5ff',
          100: '#d9e9ff',
          200: '#bcd8ff',
          300: '#8ebfff',
          400: '#599cff',
          500: '#3479f8',
          600: '#1d5ae8',
          700: '#1747cf',
          800: '#193ca6',
          900: '#1a3783',
          950: '#142350',
        },
        // Very light blue — surfaces and accents.
        mist: {
          50: '#f7fafd',
          100: '#eef4fb',
          200: '#dfeaf6',
          300: '#c9dcf0',
        },
        ink: {
          DEFAULT: '#0f1b2d',
          muted: '#4a5b73',
          faint: '#7d8da3',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6.2vw, 5.25rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.4vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.18', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        card: '1rem',
        panel: '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 27, 45, 0.04), 0 8px 24px -12px rgba(15, 27, 45, 0.12)',
        'card-hover': '0 2px 4px rgba(15, 27, 45, 0.05), 0 24px 48px -20px rgba(20, 60, 140, 0.28)',
        panel: '0 32px 80px -32px rgba(15, 27, 45, 0.28)',
        chat: '0 24px 64px -20px rgba(15, 27, 45, 0.35)',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        // One easing curve for the whole site keeps motion feeling deliberate.
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        'sheen': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'typing-dot': 'typing-dot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
