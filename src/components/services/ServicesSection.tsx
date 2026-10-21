import { useDialog } from '../../hooks/useDialog';
import React, { useState } from 'react';
import { useLanguage } from '../../context/language';
import type { ServiceItem } from '../../types';
import { ServiceFlipCard } from './ServiceFlipCard';
import { servicePresentation } from './servicePresentation';
import { 
  Compass, GraduationCap, Search,
  BarChart3, 
  Database, 
  Cpu, 
  Sparkles, 
  Server, 
  Factory, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  ChevronRight,
  Zap,
  X
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const { t, lang, services } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'foundational' | 'advanced' | 'industrial' | 'advisory'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [search, setSearch] = useState('');
  const dialogRef = useDialog(!!selectedService, () => setSelectedService(null));

  const getCardCopy = (service: ServiceItem) => servicePresentation[service.id]?.[lang] ?? {
    title: service.title[lang], category: service.levelBadge[lang],
    benefit: service.subtitle[lang], explanation: service.description[lang], includes: service.deliverables[lang].slice(0, 2),
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-6 h-6 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-emerald-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-cyan-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredServices = services.filter((s) => {
    const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const copy = getCardCopy(s);
    if (!normalize([s.title[lang], copy.title, copy.category, copy.benefit, copy.explanation, ...copy.includes, s.description[lang], ...s.techStack].join(' ')).includes(normalize(search.trim()))) return false;
    if (activeFilter === 'advisory') return s.level === 0;
    if (activeFilter === 'foundational') return s.level > 0 && s.level <= 2;
    if (activeFilter === 'advanced') return s.level >= 3 && s.level <= 4;
    if (activeFilter === 'industrial') return s.level >= 5;
    return true;
  });

  return (
    <section id="services" className="py-24 relative bg-[#070d1e] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('services.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('services.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('services.header.desc')}
          </p>
        </div>

        <label className="flex items-center gap-3 max-w-xl mx-auto mb-6 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-400">
          <Search className="w-5 h-5 shrink-0" />
          <span className="sr-only">{lang === 'es' ? 'Buscar soluciones' : 'Search solutions'}</span>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder={lang === 'es' ? 'Busca por objetivo o tecnología…' : 'Search by goal or technology…'} className="w-full bg-transparent text-sm text-white outline-none" />
        </label>
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            aria-pressed={activeFilter === 'all'} onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.all')}
          </button>
          <button
            aria-pressed={activeFilter === 'foundational'} onClick={() => setActiveFilter('foundational')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'foundational'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.foundational')}
          </button>
          <button
            aria-pressed={activeFilter === 'advanced'} onClick={() => setActiveFilter('advanced')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'advanced'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.advanced')}
          </button>
          <button
            aria-pressed={activeFilter === 'industrial'} onClick={() => setActiveFilter('industrial')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'industrial'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.industrial')}
          </button>
          <button aria-pressed={activeFilter === 'advisory'} onClick={() => setActiveFilter('advisory')} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${activeFilter === 'advisory' ? 'bg-cyan-400 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>{lang === 'es' ? 'Consultoría y tutorías' : 'Consulting & tutoring'}</button>
        </div>

        <div className="text-center mb-6 text-sm text-slate-400" role="status">{filteredServices.length} {lang === 'es' ? 'soluciones disponibles' : 'solutions available'}</div>
        {filteredServices.length === 0 && <div className="text-center p-8 text-slate-300"><p>{lang === 'es' ? 'No hay coincidencias. Prueba otra búsqueda.' : 'No matches. Try another search.'}</p><button className="mt-3 text-cyan-400" onClick={() => { setSearch(''); setActiveFilter('all'); }}>{lang === 'es' ? 'Ver todas las soluciones' : 'Show all solutions'}</button></div>}
        {/* Services Progression Grid (ordered Level 1 to 6) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${filteredServices.length > 2 ? 'lg:grid-cols-3' : 'max-w-5xl mx-auto'} gap-6 sm:gap-8`}>
          {filteredServices.map((service) => {
            const copy = getCardCopy(service);
            return (
              <ServiceFlipCard key={service.id} title={copy.title} category={copy.category} summary={copy.benefit} headingIcon={getIcon(service.iconName)} icon={service.iconName} lang={lang} animationFirst>
                <div className="solution-details">
                  <h4 className="solution-explanation-heading">{lang === 'es' ? 'Así te ayudamos' : 'How we help'}</h4>
                  <p className="solution-explanation">{copy.explanation}</p>
                  <ul className="solution-includes">
                    {copy.includes.map((item) => (
                      <li key={item}><CheckCircle size={16} aria-hidden="true" /><span>{item}</span></li>
                    ))}
                  </ul>
                  <div className="solution-actions">
                    <button onClick={() => setSelectedService(service)} className="solution-details-link">
                      {lang === 'es' ? 'Ver detalles' : 'View details'}<ChevronRight size={16} aria-hidden="true" />
                    </button>
                    <button onClick={() => onSelectServiceForBooking(service.title[lang])} className="solution-contact">
                      {lang === 'es' ? 'Hablemos' : 'Let’s talk'}
                    </button>
                  </div>
                </div>
              </ServiceFlipCard>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={getCardCopy(selectedService).title} className="relative w-full max-w-2xl rounded-2xl bg-[#091124] border border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              aria-label={lang === 'es' ? 'Cerrar detalles' : 'Close details'} onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {getCardCopy(selectedService).category}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {getCardCopy(selectedService).title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-cyan-300/90 font-medium mb-4 italic">
              {getCardCopy(selectedService).benefit}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedService.description[lang]}
            </p>

            {/* Deliverables */}
            <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                {t('services.card.deliverables')}
              </h4>
              <ul className="space-y-2">
                {selectedService.deliverables[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="text-cyan-400 font-mono font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Impact Box */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                {t('services.card.impact')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 font-sans">
                {selectedService.businessImpact[lang]}
              </p>
            </div>

            {/* Full Tech Stack */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                {lang === 'es' ? 'Tecnologías y Frameworks Aplicados:' : 'Applied Technologies & Frameworks:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const serviceName = selectedService.title[lang];
                  setSelectedService(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-xs sm:text-sm shadow-lg shadow-cyan-500/20"
              >
                <span>{lang === 'es' ? 'Agendar consultoría para este servicio' : 'Book consultation for this service'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
