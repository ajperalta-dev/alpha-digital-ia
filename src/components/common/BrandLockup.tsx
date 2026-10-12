import { useTheme } from '../../context/theme';

export function BrandLockup({ size = 'nav' }: { size?: 'nav' | 'footer' }) {
  const { isDark } = useTheme();
  const footer = size === 'footer';

  return (
    <span className="flex shrink-0 items-center gap-3 sm:gap-4">
      <img src="/brand/alpha-isologo.svg" alt="" aria-hidden="true"
        className={`${footer ? 'h-20 w-20' : 'h-12 w-11 sm:h-16 sm:w-14'} object-contain`} />
      <span className="flex flex-col items-start gap-2 whitespace-nowrap">
        <span className={`${footer ? 'text-[36px]' : 'text-[26px] sm:text-[32px]'} font-semibold leading-none tracking-[0.07em] ${isDark ? 'text-slate-100' : 'text-[#082f58]'}`}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          ALPHA
        </span>
        <span className={`flex items-center gap-1.5 ${footer ? 'text-[9px] tracking-[0.08em]' : 'text-[7px] sm:text-[8px] tracking-[0.04em] sm:tracking-[0.08em]'} font-mono font-medium uppercase leading-none ${isDark ? 'text-cyan-200' : 'text-teal-700'}`}>
          <span aria-hidden="true" className="h-px w-2 sm:w-3 bg-[#d5b45b]" />
          Digital Transformation
        </span>
      </span>
    </span>
  );
}
