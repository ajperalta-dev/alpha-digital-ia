import React, { useState } from 'react';
import { useLanguage } from '../../context/language';
import { useTheme } from '../../context/theme';
import { NeuralBackground } from './NeuralBackground';
import { BrainReveal } from './BrainReveal';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck,
  Sparkles,
  Database,
  LineChart,
  Cloud,
  Network
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();
  const [showNeural, setShowNeural] = useState(false);

  // Tech stack and sectors for the marquee
  const tickerItems = [
    { icon: <Database className="w-4 h-4 text-cyan-500" />, text: "Data Engineering" },
    { icon: <Cpu className="w-4 h-4 text-blue-500" />, text: "Machine Learning" },
    { icon: <Network className="w-4 h-4 text-indigo-500" />, text: "MLOps" },
    { icon: <Cloud className="w-4 h-4 text-sky-500" />, text: "Cloud Architecture" },
    { icon: <LineChart className="w-4 h-4 text-emerald-500" />, text: "Business Intelligence" },
    { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: "Generative AI" },
    { icon: <CheckCircle2 className="w-4 h-4 text-teal-500" />, text: "Industria 4.0" },
    { icon: <ShieldCheck className="w-4 h-4 text-rose-500" />, text: "Data Governance" }
  ];

  // Double the array for seamless infinite scrolling
  const duplicatedTickerItems = [...tickerItems, ...tickerItems];

  return (
    <section id="hero" className="hero-cover relative flex flex-col overflow-hidden bg-grid-pattern transition-colors duration-500">
      {/* Background canvas elements */}
      <NeuralBackground />
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
      <div className={`absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none -z-10 transition-colors duration-700 ${isDark ? 'bg-blue-600/15' : 'bg-blue-500/5'}`} />

      <div className="hero-main flex-1 flex items-center w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="hero-layout grid grid-cols-1 lg:grid-cols-12 items-center w-full">
          
          {/* Left Column: Headline and CTAs */}
          <div className="hero-copy lg:col-span-7 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-semibold tracking-wider shadow-lg mb-8 backdrop-blur-md transition-all ${
              isDark
                ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-cyan-950/40'
                : 'bg-white/90 border-cyan-500/30 text-cyan-700 shadow-cyan-100/50'
            }`}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              {t('hero.title.pre')}{' '}
              {t('hero.title.highlight')}
            </h1>
            <p className="hero-tagline">{t('hero.title.post')}</p>

            {/* Slogan & Subtitle */}
            <p className="hero-description">
              {t('hero.subtitle')}
            </p>

            {/* Call to Actions */}
            <div className="hero-actions flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenBooking}
                className="hero-primary w-full sm:w-auto flex items-center justify-center gap-2.5 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-colors"
              >
                <Calendar className="w-[18px] h-[18px]" />
                <span>{t('hero.cta.secondary')}</span>
              </button>

              <a
                href="#services"
                className="hero-secondary w-full sm:w-auto flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t('hero.cta.primary')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Guarantee tags */}
            <div className="hero-credentials flex flex-wrap items-center justify-center lg:justify-start">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? 'Ingeniería con rigor industrial' : 'Industrial Engineering Rigor'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? 'Senior Data Scientists (MSc)' : 'Senior Data Scientists (MSc)'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? '100% Orientado a ROI' : '100% ROI Focused'}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="hero-visual lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto group">
              <button type="button" onClick={() => setShowNeural(previous => !previous)}
                aria-pressed={showNeural}
                aria-label={lang === 'es' ? (showNeural ? 'Volver al logo ALPHA' : 'Transformar el logo en un cerebro luminoso animado') : (showNeural ? 'Return to the ALPHA logo' : 'Transform the logo into an animated luminous brain')}
                className="hero-logo-button block w-full cursor-pointer relative bg-transparent">
                <div className="relative aspect-square">
                  <div className={`hero-mark alpha-logo-energy absolute transition-all duration-500 ${showNeural ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
                    aria-hidden="true">
                    <span className="alpha-logo-aura" aria-hidden="true" />
                    <img
                      src="/brand/alpha-isologo.svg"
                      alt=""
                      className="alpha-logo-art w-full h-full object-contain"
                      loading="eager"
                    />
                    <span className="alpha-logo-shine" aria-hidden="true" />
                    <span className="alpha-logo-sparks" aria-hidden="true">
                      <i /><i /><i /><i /><i />
                    </span>
                  </div>
                  {showNeural && <BrainReveal lang={lang} />}
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Infinite Marquee Ticker (Replaces old static metrics) */}
      <div className={`hero-ticker w-full border-t overflow-hidden ${
        isDark ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="flex whitespace-nowrap animate-marquee w-[200%] items-center gap-8 px-4">
          {duplicatedTickerItems.map((item, index) => (
            <div key={index} aria-hidden={index >= tickerItems.length || undefined} className="hero-ticker-item flex items-center gap-2.5 px-6 py-2">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};
