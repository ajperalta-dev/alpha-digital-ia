import React, { useRef, useState } from 'react';
import { useLanguage } from '../../context/language';
import { ServiceFlipCard } from '../services/ServiceFlipCard';
import { PhaseAnimation } from './PhaseAnimation';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { GitBranch, Search, Wrench, Rocket, Repeat, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';

const phaseIcons = [Search, Wrench, Rocket, Repeat];

export const MethodologySection: React.FC = () => {
  const { t, lang } = useLanguage();
  const sectionRef = useSectionReveal();
  const [activePhase, setActivePhase] = useState(0);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const es = lang === 'es';
  const names = es ? ['Comprender', 'Validar', 'Construir', 'Evolucionar'] : ['Understand', 'Validate', 'Build', 'Evolve'];
  const questions = es
    ? ['¿Qué merece la pena resolver?', '¿Funciona con tus datos?', '¿Cómo lo llevamos a producción?', '¿Cómo sigue aportando valor?']
    : ['What is worth solving?', 'Does it work with your data?', 'How do we move it into production?', 'How does it keep delivering value?'];
  const times = es ? ['Semanas 1–2', 'Semanas 3–5', 'Semanas 6–10', 'Mejora continua'] : ['Weeks 1–2', 'Weeks 3–5', 'Weeks 6–10', 'Continuous improvement'];
  const deliverables = es
    ? ['Informe de Viabilidad & Matriz de ROI', 'PoC Funcional con Datos Reales', 'Despliegue Productivo & APIs', 'Telemetría MLOps & Retraining']
    : ['Feasibility Report & ROI Matrix', 'Functional PoC with Live Telemetry', 'Production Deployment & Cloud APIs', 'MLOps Telemetry & Retraining'];
  const phases = names.map((name, index) => ({
    name, index, num: t(`method.phase${index + 1}.num`),
    title: t(`method.phase${index + 1}.title`), desc: t(`method.phase${index + 1}.desc`),
  }));
  const current = phases[activePhase];
  const CurrentIcon = phaseIcons[activePhase];
  const choose = (index: number, focus = false) => {
    const next = Math.max(0, Math.min(phases.length - 1, index));
    setActivePhase(next);
    if (focus) stepRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section ref={sectionRef} id="methodology" className="framework-studio relative py-20 sm:py-24 bg-[#070d1e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header data-method-reveal className="method-reveal grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-20 items-end mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>{t('method.header.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] text-slate-900 dark:text-white max-w-xl">
              {es ? 'Un proceso claro. Un avance tangible.' : 'A clear process. Tangible progress.'}
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{t('method.header.desc')}</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              {es ? 'Explora cada fase y lo que te llevas de ella.' : 'Explore each phase and what you take away from it.'}
            </p>
          </div>
        </header>

        <div data-method-reveal className="method-reveal method-reveal-follow framework-workspace">
          <div className="framework-route" role="group" aria-label={es ? 'Elegir una fase del framework' : 'Choose a framework phase'}
            onKeyDown={event => {
              const index = stepRefs.current.findIndex(button => button === event.target);
              if (index < 0) return;
              const next = ['ArrowRight', 'ArrowDown'].includes(event.key) ? index + 1
                : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? index - 1
                : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
              if (next !== null) { event.preventDefault(); choose(next, true); }
            }}>
            <span className="framework-route-rail" aria-hidden="true">
              <span style={{ transform: `scaleY(${activePhase / 3})` }} />
            </span>
            {phases.map((phase, index) => {
              const Icon = phaseIcons[index];
              return <button key={phase.num} ref={node => { stepRefs.current[index] = node; }} id={`framework-step-${index}`}
                type="button" aria-pressed={activePhase === index} aria-controls="framework-detail"
                aria-label={`${phase.num} · ${phase.name}`} onClick={() => choose(index)}
                className={`framework-route-step ${activePhase === index ? 'is-current' : ''}`}>
              <span className="framework-route-number">{phase.num}</span>
                <span className="framework-route-copy">
                  <span className="font-semibold text-sm sm:text-base">{phase.name}</span>
                  <span className="framework-route-time">{times[index]}</span>
                </span>
                <Icon size={18} className="framework-route-icon" aria-hidden="true" />
              </button>;
            })}
            <p className="framework-route-note text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {es ? 'Cada etapa convierte una decisión en un entregable concreto.' : 'Each stage turns a decision into a concrete deliverable.'}
            </p>
          </div>

          <div id="framework-detail" className="framework-detail" role="region" aria-labelledby={`framework-step-${activePhase}`}>
            <div key={activePhase} className="framework-detail-enter">
              <ServiceFlipCard title={current.title} lang={lang} subtle animation={<PhaseAnimation phase={activePhase} lang={lang} />}>
                <div className="framework-detail-front">
                  <div className="flex items-center justify-between gap-4 mb-7 sm:mb-9">
                    <span className="flex items-center gap-2 text-sm text-teal-700 dark:text-cyan-300"><CurrentIcon size={17} />{current.name}</span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{times[activePhase]}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.15] text-slate-900 dark:text-white max-w-xl mb-4">
                    {questions[activePhase]}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{current.title}</p>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">{current.desc}</p>
                  <div className="framework-deliverable">
                    <CheckCircle2 size={20} className="shrink-0 text-teal-600 dark:text-cyan-300 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{es ? 'Al finalizar esta fase' : 'At the end of this phase'}</p>
                      <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">{deliverables[activePhase]}</p>
                    </div>
                  </div>
                </div>
              </ServiceFlipCard>
            </div>
            <div className="framework-detail-footer">
              <span role="status" className="text-xs text-slate-500 dark:text-slate-400">{es ? `Fase ${activePhase + 1} de 4` : `Phase ${activePhase + 1} of 4`}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => choose(activePhase - 1)} disabled={activePhase === 0}
                  aria-label={es ? 'Fase anterior' : 'Previous phase'} className="method-arrow method-arrow-prev"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => choose(activePhase + 1)} disabled={activePhase === 3}
                  aria-label={es ? 'Fase siguiente' : 'Next phase'} className="framework-next">
                  <span>{es ? 'Siguiente fase' : 'Next phase'}</span><ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          {es ? 'De la primera decisión a la mejora continua, con entregables en cada etapa.' : 'From the first decision to continuous improvement, with deliverables at every stage.'}
        </p>
      </div>
    </section>
  );
};
