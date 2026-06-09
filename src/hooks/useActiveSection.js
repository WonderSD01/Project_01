import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds, offset = 80) {
  const [active, setActive] = useState(sectionIds[0]?.replace('#', '') || '');

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0]?.replace('#', '') || '';
      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (el && window.scrollY >= el.offsetTop - offset) {
          current = id.replace('#', '');
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return active;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
