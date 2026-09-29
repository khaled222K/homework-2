/** Small status pill. `variant` maps to the site's two accent weights. */
export function Badge({ children, variant = 'royal', className = '' }) {
  const variants = {
    royal: 'bg-royal-50 text-royal-800 ring-1 ring-inset ring-royal-100',
    navy: 'bg-navy-900/60 text-navy-100 ring-1 ring-inset ring-white/10',
    neutral: 'bg-mist-100 text-ink-muted ring-1 ring-inset ring-mist-200',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
