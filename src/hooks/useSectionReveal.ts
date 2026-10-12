import { useEffect, useRef } from 'react';

/** One-shot entrance; content remains readable without observer support or motion. */
export function useSectionReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || preference.matches || !('IntersectionObserver' in window)) return;
    const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-method-reveal]'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.methodReveal = 'visible';
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(target => {
      // Do not hide content already on screen, e.g. a direct #methodology visit.
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        target.dataset.methodReveal = 'pending';
        observer.observe(target);
      }
    });
    const showAll = () => {
      if (!preference.matches) return;
      observer.disconnect();
      targets.forEach(target => { target.dataset.methodReveal = 'visible'; });
    };
    preference.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', showAll);
      targets.forEach(target => { target.dataset.methodReveal = ''; });
    };
  }, []);
  return sectionRef;
}
