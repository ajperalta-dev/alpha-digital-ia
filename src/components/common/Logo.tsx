import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true
}) => {
  const logoDimensions = {
    sm: { mark: 'h-8 w-8', title: 'text-sm', strap: 'text-[7px]' },
    md: { mark: 'h-10 w-10', title: 'text-base', strap: 'text-[8px]' },
    lg: { mark: 'h-14 w-14', title: 'text-2xl', strap: 'text-[10px]' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <span className={`${logoDimensions.mark} relative shrink-0 rounded-xl bg-[#082f58] p-1 shadow-[0_5px_22px_rgba(13,54,93,0.3)] ring-1 ring-[#d7b95b]/70`} aria-hidden="true">
        <img src="/alpha-mark.svg" alt="" className="h-full w-full" />
      </span>
      {showText && <span className="leading-none">
        <span className={`${logoDimensions.title} block font-black tracking-[0.18em] text-[#0b3b68] dark:text-white`}>ALPHA</span>
        <span className={`${logoDimensions.strap} block mt-1 font-bold tracking-[0.16em] text-[#1593a2] dark:text-[#64d4cf]`}>DIGITAL TRANSFORMATION</span>
      </span>}
    </div>
  );
};
