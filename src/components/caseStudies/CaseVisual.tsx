import { useState } from 'react';
import { Activity, Boxes, ChartNoAxesCombined, Play, Pause } from 'lucide-react';

export function CaseVisual({ kind, lang }: { kind: number; lang: 'es' | 'en' }) {
  const [playing, setPlaying] = useState(true);
  const Icon = [Activity, Boxes, ChartNoAxesCombined][kind] ?? Activity;
  return (
    <div className={`case-visual ${playing ? '' : 'is-paused'} relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 pt-5 pb-3`}>
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
          <Icon size={14} className="text-cyan-600 dark:text-cyan-300" />
          {kind === 0 ? (lang === 'es' ? 'Inteligencia de planta' : 'Plant intelligence') : kind === 1 ? (lang === 'es' ? 'Demanda conectada' : 'Connected demand') : (lang === 'es' ? 'Visión ejecutiva' : 'Executive visibility')}
        </span>
        <button type="button" onClick={() => setPlaying(value => !value)} aria-pressed={!playing}
          aria-label={lang === 'es' ? (playing ? 'Pausar animación del caso' : 'Reanudar animación del caso') : (playing ? 'Pause case animation' : 'Resume case animation')}
          className="rounded-lg border border-slate-300 dark:border-slate-700 p-2 text-slate-600 dark:text-slate-300 hover:border-cyan-500 transition-colors">
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>
      <svg viewBox="0 0 340 180" className="relative mt-3 w-full h-[180px] text-cyan-600 dark:text-cyan-300" fill="none" aria-hidden="true">
        <path d="M20 40H320M20 80H320M20 120H320M60 20V160M120 20V160M180 20V160M240 20V160M300 20V160" stroke="currentColor" opacity=".08" />
        {kind === 0 ? <>
          <rect x="20" y="35" width="300" height="108" rx="12" className="case-scene-line" opacity=".35" />
          <path d="M34 96H55L68 75 80 115 94 65 108 108 120 91H147L160 54 174 124 188 76 202 97H223L236 79 247 104 260 92H305" pathLength="100" className="case-scene-trace" />
          <circle cx="160" cy="54" r="7" className="case-scene-beacon" />
          <path d="m149 163 9 7 16-18" stroke="#d5b45b" strokeWidth="2" />
          <circle cx="160" cy="54" r="18" className="case-scene-ripple" />
        </> : kind === 1 ? <>
          {[0, 1, 2, 3].map(i => <g key={i} className="case-scene-stock" style={{ animationDelay: `${i * .2}s` }}>
            <rect x={28 + i * 43} y={112 - i * 15} width="28" height={40 + i * 15} rx="5" fill="currentColor" opacity=".22" />
            <path d={`M${35 + i * 43} ${120 - i * 15}h14`} className="case-scene-line" />
          </g>)}
          <path d="M25 91Q71 100 106 66T193 56T267 23" pathLength="100" className="case-scene-trace" />
          <path d="M194 56Q237 66 301 21" stroke="#d5b45b" strokeWidth="2" strokeDasharray="4 5" />
          <rect x="233" y="98" width="71" height="52" rx="9" className="case-scene-line" />
          <path d="M249 115h38M249 129h23" className="case-scene-line" opacity=".5" />
          <circle cx="267" cy="23" r="5" className="case-scene-beacon" />
        </> : <>
          <rect x="28" y="25" width="285" height="127" rx="12" className="case-scene-line" opacity=".5" />
          <path d="M28 52H313M135 52V152" className="case-scene-line" opacity=".25" />
          {[46, 59, 72].map(x => <circle key={x} cx={x} cy="38" r="2" fill="currentColor" />)}
          {[0, 1, 2].map(i => <rect key={i} x="46" y={68 + i * 25} width={67 - i * 12} height="9" rx="4" fill="currentColor" opacity={.25 + i * .15} className="case-scene-stock" style={{ animationDelay: `${i * .3}s` }} />)}
          <path d="M154 128 182 103 205 114 229 85 253 91 291 68" pathLength="100" className="case-scene-trace" />
          <circle cx="291" cy="68" r="5" className="case-scene-beacon" />
          <path d="M124 165H216" className="case-scene-line" opacity=".35" />
        </>}
      </svg>
      <div className="relative flex items-center justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400">
        <span>{lang === 'es' ? 'ESCENARIO ILUSTRATIVO' : 'ILLUSTRATIVE SCENARIO'}</span>
        <span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${playing ? 'bg-teal-500' : 'bg-slate-400'}`} />{lang === 'es' ? (playing ? 'Animación' : 'En pausa') : (playing ? 'Animation' : 'Paused')}</span>
      </div>
    </div>
  );
}
