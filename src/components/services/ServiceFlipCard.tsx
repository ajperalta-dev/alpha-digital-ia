import { useEffect, useRef, useState, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { ServiceAnimation } from './ServiceAnimation';

export function ServiceFlipCard({ children, title, summary, category, headingIcon, icon = 'Layers', lang, animation, subtle = false, animationFirst = false }: {
  children: ReactNode; title: string; summary?: string; category?: string; headingIcon?: ReactNode; icon?: string; lang: 'es' | 'en'; animation?: ReactNode; subtle?: boolean; animationFirst?: boolean;
}) {
  const [flipped, setFlipped] = useState(animationFirst);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);
  const toggle = () => { interacted.current = true; setFlipped(value => !value); };
  useEffect(() => {
    if (interacted.current) (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  return <article className={`service-flip ${summary ? 'solution-card' : ''} ${subtle ? 'phase-flip flex-1' : ''} ${flipped ? 'is-flipped' : ''}`} aria-label={title}
    onClick={event => {
      if (!(event.target as HTMLElement).closest('button, a, input, select, textarea')) toggle();
    }}>
    <div className="service-flip-inner">
      <div className="service-flip-front" inert={flipped} aria-hidden={flipped} style={{ pointerEvents: flipped ? 'none' : 'auto' }}>
        {children}
        <button ref={frontButton} type="button" onClick={toggle} aria-label={`${lang === 'es' ? 'Ver animación de' : 'Show animation for'} ${title}`}
          className="service-flip-trigger flex items-center gap-2 text-xs font-medium text-cyan-700 dark:text-cyan-300">
          <RotateCcw size={13} />{summary ? (lang === 'es' ? 'Volver a la animación' : 'Back to the animation') : subtle ? (lang === 'es' ? 'Ver la fase en movimiento' : 'See the phase in motion') : (lang === 'es' ? 'Pulsa la tarjeta para ver la animación' : 'Click the card to see the animation')}
        </button>
      </div>
      <div className="service-flip-back rounded-2xl border border-cyan-500/30 bg-white dark:bg-[#0b1429] p-6 sm:p-7" inert={!flipped} aria-hidden={!flipped} style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
        <button ref={backButton} type="button" onClick={toggle}
          aria-label={`${animationFirst ? (lang === 'es' ? 'Ver el contenido de' : 'Show content for') : (lang === 'es' ? 'Volver al contenido de' : 'Return to content for')} ${title}`}
          className="absolute inset-0 z-10 rounded-2xl" />
        <div className="solution-motion-content pointer-events-none flex h-full flex-col justify-center">
          {summary ? <div className="solution-heading-meta">
            <span className="solution-heading-icon" aria-hidden="true">{headingIcon}</span>
            <p className="solution-category">{category}</p>
          </div> : <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-300">{subtle ? (lang === 'es' ? 'La fase en movimiento' : 'The phase in motion') : (lang === 'es' ? 'La solución en movimiento' : 'The solution in motion')}</p>}
          <h3 className={`${subtle ? 'text-lg font-semibold' : 'text-xl font-bold'} text-slate-900 dark:text-white`}>{title}</h3>
          {summary && <p className="solution-benefit">{summary}</p>}
          {flipped && (animation ?? <ServiceAnimation icon={icon} lang={lang} />)}
          <span className="solution-motion-prompt mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"><RotateCcw size={14} />{summary ? (lang === 'es' ? 'Descubrir la solución' : 'Discover the solution') : animationFirst ? (lang === 'es' ? 'Pulsa para ver la información' : 'Click to see the information') : (lang === 'es' ? 'Pulsa para volver' : 'Click to return')}</span>
        </div>
      </div>
    </div>
  </article>;
}
