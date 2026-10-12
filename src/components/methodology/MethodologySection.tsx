import React from 'react';
import { useLanguage } from '../../context/language';
import { 
  GitBranch, 
  Search, 
  Wrench, 
  Rocket, 
  Repeat, 
  CheckCircle
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const { t, lang } = useLanguage();

  const phases = [
    {
      num: t('method.phase1.num'),
      title: t('method.phase1.title'),
      desc: t('method.phase1.desc'),
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      time: lang === 'es' ? 'Semana 1 - 2' : 'Weeks 1 - 2',
      deliverable: lang === 'es' ? 'Informe de Viabilidad & Matriz de ROI' : 'Feasibility Report & ROI Matrix',
    },
    {
      num: t('method.phase2.num'),
      title: t('method.phase2.title'),
      desc: t('method.phase2.desc'),
      icon: <Wrench className="w-5 h-5 text-blue-400" />,
      time: lang === 'es' ? 'Semana 3 - 5' : 'Weeks 3 - 5',
      deliverable: lang === 'es' ? 'PoC Funcional con Datos Reales' : 'Functional PoC with Live Telemetry',
    },
    {
      num: t('method.phase3.num'),
      title: t('method.phase3.title'),
      desc: t('method.phase3.desc'),
      icon: <Rocket className="w-5 h-5 text-indigo-400" />,
      time: lang === 'es' ? 'Semana 6 - 10' : 'Weeks 6 - 10',
      deliverable: lang === 'es' ? 'Despliegue Productivo & APIs' : 'Production Deployment & Cloud APIs',
    },
    {
      num: t('method.phase4.num'),
      title: t('method.phase4.title'),
      desc: t('method.phase4.desc'),
      icon: <Repeat className="w-5 h-5 text-emerald-400" />,
      time: lang === 'es' ? 'Continuo' : 'Continuous',
      deliverable: lang === 'es' ? 'Telemetría MLOps & Retraining' : 'MLOps Telemetry & Retraining',
    },
  ];

  return (
    <section id="methodology" className="py-24 relative bg-[#070d1e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('method.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            {t('method.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('method.header.desc')}
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="relative">
        <div aria-hidden="true" className="hidden lg:block absolute top-5 left-[12%] right-[12%] h-px bg-gradient-to-r from-cyan-500/30 via-slate-500/20 to-emerald-500/30" />
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {phases.map((phase, idx) => (
            <li
              key={idx}
              className="method-phase relative flex flex-col group"
            >
              <div className="relative flex items-center lg:justify-center gap-3 mb-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-medium text-cyan-700 dark:text-cyan-300 group-hover:border-cyan-500/60 transition-colors">{phase.num}</span>
                <span className="lg:hidden text-[10px] font-mono uppercase tracking-wider text-slate-500">{phase.time}</span>
              </div>
              <div className="method-phase-body relative flex-1 rounded-2xl bg-[#0b1429]/90 border border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-cyan-500/30">

              <div>
                {/* Phase Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-[.15em] text-slate-400">
                    {lang === 'es' ? ['Comprender', 'Validar', 'Construir', 'Evolucionar'][idx] : ['Understand', 'Validate', 'Build', 'Evolve'][idx]}
                  </span>
                  <div className="method-phase-icon p-2.5 rounded-xl bg-slate-900 border border-slate-700 transition-transform duration-300">
                    {phase.icon}
                  </div>
                </div>

                <div className="hidden lg:block text-[10px] font-mono font-medium text-cyan-400 uppercase tracking-wider mb-3">
                  {phase.time}
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {phase.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {phase.desc}
                </p>
              </div>

              {/* Bottom deliverable tag */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex gap-1 mb-4" aria-hidden="true">
                  {[0, 1, 2, 3].map(step => <span key={step} className={`method-phase-segment h-0.5 flex-1 rounded-full ${step <= idx ? 'bg-teal-500/60' : 'bg-slate-500/15'}`} />)}
                </div>
                <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === 'es' ? 'Entregable de la fase' : 'Phase deliverable'}
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {phase.deliverable}
                </div>
              </div>

              </div>
            </li>
          ))}
        </ol>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <CheckCircle className="w-3.5 h-3.5 shrink-0 text-teal-500" />
          {lang === 'es' ? 'De la primera decisión a la mejora continua, con entregables en cada etapa.' : 'From the first decision to continuous improvement, with deliverables at every stage.'}
        </p>

      </div>
    </section>
  );
};
