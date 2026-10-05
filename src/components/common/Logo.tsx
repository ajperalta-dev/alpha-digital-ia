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
      <span className={`${logoDimensions.mark} relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#0c3b68] via-[#0b8eaa] to-[#d7b95b] shadow-[0_5px_22px_rgba(13,54,93,0.3)] ring-1 ring-[#d7b95b]/70`} aria-hidden="true">
        <img src="/logoalpha.jpg" alt="" className="absolute h-[245%] w-[245%] max-w-none object-cover object-center -left-[72%] -top-[9%]" />
        <span className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-300/10 to-[#071c39]/35" />
      </span>
      {showText && <span className="leading-none">
        <span className={`${logoDimensions.title} block font-black tracking-[0.18em] text-[#0b3b68] dark:text-white`}>ALPHA</span>
        <span className={`${logoDimensions.strap} block mt-1 font-bold tracking-[0.16em] text-[#1593a2] dark:text-cyan-300`}>DIGITAL TRANSFORMATION</span>
      </span>}
    </div>
  );
};
