const circuits = [
  'M458 409Q482 365 500 342Q527 343 546 389Q570 415 633 426',
  'M546 389Q558 345 586 322Q634 317 682 357Q712 374 721 411',
  'M458 409Q483 460 566 477Q605 480 633 426Q676 431 721 411Q755 416 762 463',
  'M566 477Q625 497 657 540Q646 582 664 619',
];
const lights = [[458, 409], [500, 342], [546, 389], [586, 322], [633, 426], [682, 357], [721, 411], [762, 463], [566, 477], [657, 540]];

export function BrainReveal({ lang }: { lang: 'es' | 'en' }) {
  return (
    <div className="alpha-neural-reveal absolute top-5 bottom-28 left-6 right-6 flex flex-col justify-center" aria-hidden="true">
      <svg viewBox="345 265 500 390" className="min-h-0 w-full flex-1 overflow-hidden rounded-xl" fill="none">
        {/* Original profile reference, zoomed without modifying its source. */}
        <image href="/hero-ai.jpg" width="1200" height="896" className="alpha-brain-profile" />
        {circuits.map((d, index) => (
          <path key={d} d={d} pathLength="100" stroke="#67e8f9" strokeWidth="1.8"
            strokeLinecap="round" className="alpha-brain-trace"
            style={{ animationDelay: `${.6 + index * .4}s` }} />
        ))}
        {lights.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 4 : 2.8}
            fill={index % 3 === 0 ? '#c4b5fd' : '#a5f3fc'} className="alpha-brain-light"
            style={{ animationDelay: `${.5 + index * .22}s` }} />
        ))}
      </svg>
      <p className="pt-2 text-center text-[9px] font-mono uppercase tracking-[.2em] text-cyan-700 dark:text-cyan-200">
        {lang === 'es' ? 'Inteligencia en acción' : 'Intelligence in motion'}
      </p>
    </div>
  );
}
