import React from 'react';
import { useLanguage } from '../../context/language';
import { CaseVisual } from './CaseVisual';
import { 
  Award, 
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenBooking: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenBooking }) => {
  const { t, lang, caseStudies } = useLanguage();

  return (
    <section id="cases" className="py-24 relative bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-16 items-end mb-12">
          <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('cases.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('cases.header.title')}
          </h2>
          </div>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed lg:pb-2 max-w-xl">
            {t('cases.header.desc')}
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className="case-story rounded-3xl bg-[#091124]/90 border border-slate-800 hover:border-cyan-500/40 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/20 group"
            >
              <CaseVisual kind={index} lang={lang} />
              <div className="p-6 sm:p-7 flex-1">
                {/* Industry Header */}
                <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>{study.clientIndustry[lang]}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight leading-tight text-white mb-6">
                  {lang === 'es' ? ['Anticiparse a una avería cambia todo.', 'El producto correcto, en el momento correcto.', 'Menos hojas de cálculo. Más claridad.'][index] : ['Anticipating a failure changes everything.', 'The right product, at the right time.', 'Fewer spreadsheets. More clarity.'][index]}
                </h3>

                {/* Challenge */}
                <div className="mb-5 border-l-2 border-amber-400/40 pl-4">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    {lang === 'es' ? 'El Desafío:' : 'The Challenge:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.challenge[lang]}
                  </p>
                </div>

                {/* Solution */}
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-2 mb-2">
                    <CheckCircle2 size={13} />
                    {lang === 'es' ? 'Solución propuesta:' : 'Proposed solution:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.solution[lang]}
                  </p>
                </div>

                </div>

              {/* Technologies used */}
              <div className="p-6 sm:p-7 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {study.techUsed.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-1 rounded-md border border-slate-700/60 bg-slate-800/80 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Global call to action bar */}
        <div className="mt-10 rounded-2xl border border-cyan-500/25 bg-cyan-500/5 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2"><Sparkles size={15} />{lang === 'es' ? 'Tu próximo caso de uso' : 'Your next use case'}</p>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{lang === 'es' ? '¿Dónde pueden tus datos marcar la diferencia?' : 'Where can your data make a difference?'}</h3>
            <p className="text-sm text-slate-400">{lang === 'es' ? 'Exploremos el reto y definamos un primer paso viable.' : 'Let’s explore the challenge and define a practical first step.'}</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-sm shadow-lg shadow-cyan-500/20 active:scale-95 w-full sm:w-auto"
          >
            <span>{lang === 'es' ? 'Explorar mi caso de uso' : 'Explore my use case'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
