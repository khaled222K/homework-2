import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the viewport, for nav highlighting.
 * A single IntersectionObserver across all sections is cheaper than a scroll
 * listener and does not fight with smooth scrolling.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        if (!visible.size) return;
        // The section occupying the most of the viewport wins.
        const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(topId);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5, 0.75] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default useActiveSection;
