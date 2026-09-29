/**
 * Inline icon set.
 *
 * Hand-drawn on a 24px grid with a 1.5px stroke so weight matches the type.
 * Inlining avoids an icon-font request and keeps every glyph tree-shakeable.
 */
const paths = {
  code: <path d="M8.5 8.5 5 12l3.5 3.5M15.5 8.5 19 12l-3.5 3.5M13.5 5.5l-3 13" />,
  ai: (
    <>
      <rect x="7.5" y="7.5" width="9" height="9" rx="2" />
      <path d="M10.5 3.5v3M13.5 3.5v3M10.5 17.5v3M13.5 17.5v3M3.5 10.5h3M3.5 13.5h3M17.5 10.5h3M17.5 13.5h3" />
    </>
  ),
  robot: (
    <>
      <rect x="4.5" y="8.5" width="15" height="11" rx="3" />
      <path d="M12 4.5v4M9.5 13h.01M14.5 13h.01M9.5 16.5h5" />
      <circle cx="12" cy="3.5" r="1.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.1c0 4.3 2.9 7.6 7 9.2 4.1-1.6 7-4.9 7-9.2V6.2Z" />
      <path d="m9.3 12 1.9 1.9 3.6-3.7" />
    </>
  ),
  flag: <path d="M5.5 21V4.5m0 0h11l-2 3.5 2 3.5h-11" />,
  handshake: (
    <>
      <path d="m8 12.5 2.4 2.4a1.6 1.6 0 0 0 2.3 0l4.1-4.1" />
      <path d="M3.5 9.5 7 6h4l2 1.8L15 6h2l3.5 3.5-3 3-2-1.8-2 2a1.6 1.6 0 0 1-2.3 0L9 11" />
    </>
  ),
  certificate: (
    <>
      <circle cx="12" cy="9.5" r="4.5" />
      <path d="m9.3 13.4-1.3 6 4-2 4 2-1.3-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  trophy: (
    <>
      <path d="M7.5 4.5h9v4.2a4.5 4.5 0 0 1-9 0Z" />
      <path d="M7.5 6H5a2.5 2.5 0 0 0 2.5 2.5M16.5 6H19a2.5 2.5 0 0 1-2.5 2.5M12 13.2V17M9 20h6M10 17h4" />
    </>
  ),
  map: <path d="M9 4.5 3.5 6.8v12.7L9 17.2m0-12.7 6 2.3m-6-2.3v12.7m6-10.4 5.5-2.3v12.7L15 17.2m0-10.4v10.4m-6 0 6-2.6" />,
  spark: <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.3l-1.8-5.7L4.5 10.8 10.2 9Z" />,
  arrowLeft: <path d="M19 12H5m0 0 6-6m-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  arrowUp: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  external: <path d="M14 5h5v5M19 5l-8 8M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  send: <path d="M5 12 20 4.5 15.5 20l-3.7-5.3L5 12Zm6.8 2.7L20 4.5" />,
  chat: <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.4-4.8A7.5 7.5 0 1 1 20 11.5Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5s-1.2 6.1-3.4 8.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M9 3.5v4M15 3.5v4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="8.8" cy="10" r="1.6" />
      <path d="m4.5 17 4.8-4.4 3.4 3 2.6-2.3 4.2 3.7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.2 9.4 4.9 2.6-4.9 2.6V9.4Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M14.2 3.5v10.9a3.4 3.4 0 1 1-3.4-3.4c.3 0 .6 0 .9.1M14.2 3.5c.3 2.3 2 4 4.3 4.2" />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.6h.01M11.8 16v-3.1a2 2 0 0 1 4 0V16" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m10.3 9.2 5 2.8-5 2.8V9.2Z" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5h3l1.4-2.2h8.2L17.5 8.5h3v10a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-10Z" />
      <circle cx="12" cy="13.3" r="3.4" />
    </>
  ),
  newspaper: (
    <>
      <path d="M4 5.5h11.5v13H5.5A1.5 1.5 0 0 1 4 17V5.5Z" />
      <path d="M15.5 9h3a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 1-3 0V5.5M7 9h5.5M7 12.3h5.5M7 15.5h3.5" />
    </>
  ),
  x: <path d="M4 4h4.2l4.1 5.5L17.2 4H20l-6.3 7.4L20.4 20h-4.2l-4.4-5.9L6.6 20H4l6.6-7.7L4 4Z" />,
  refresh: <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5V10H14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8h.01" />
    </>
  ),
  academic: <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Zm7 6.6v4.6c0 1.6-3.1 3.3-7 3.3s-7-1.7-7-3.3v-4.6" />,
};

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.5, filled = false, ...rest }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {content}
    </svg>
  );
}

export default Icon;
