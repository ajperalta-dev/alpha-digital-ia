import { useEffect, useRef, useState, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { ServiceAnimation } from './ServiceAnimation';

export function ServiceFlipCard({ children, title, icon, lang }: {
  children: ReactNode; title: string; icon: string; lang: 'es' | 'en';
}) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);
  const toggle = () => { interacted.current = true; setFlipped(value => !value); };
  useEffect(() => {
    if (interacted.current) (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  return <article className={`service-flip ${flipped ? 'is-flipped' : ''}`} aria-label={title}
    onClick={event => {
      if (!(event.target as HTMLElement).closest('button, a, input, select, textarea')) toggle();
    }}>
    <div className="service-flip-inner">
      <div className="service-flip-front" inert={flipped} aria-hidden={flipped} style={{ pointerEvents: flipped ? 'none' : 'auto' }}>
        {children}
        <button ref={frontButton} type="button" onClick={toggle} aria-label={`${lang === 'es' ? 'Ver animación de' : 'Show animation for'} ${title}`}
          className="service-flip-trigger flex items-center gap-2 text-xs font-medium text-cyan-700 dark:text-cyan-300">
          <RotateCcw size={13} />{lang === 'es' ? 'Pulsa la tarjeta para ver la animación' : 'Click the card to see the animation'}
        </button>
      </div>
      <div className="service-flip-back rounded-2xl border border-cyan-500/30 bg-white dark:bg-[#0b1429] p-6 sm:p-7" inert={!flipped} aria-hidden={!flipped} style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
        <button ref={backButton} type="button" onClick={toggle}
          aria-label={`${lang === 'es' ? 'Volver al contenido de' : 'Return to content for'} ${title}`}
          className="absolute inset-0 z-10 rounded-2xl" />
        <div className="pointer-events-none flex h-full flex-col justify-center">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-300">{lang === 'es' ? 'La solución en movimiento' : 'The solution in motion'}</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          {flipped && <ServiceAnimation icon={icon} lang={lang} />}
          <span className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"><RotateCcw size={14} />{lang === 'es' ? 'Pulsa para volver' : 'Click to return'}</span>
        </div>
      </div>
    </div>
  </article>;
}
