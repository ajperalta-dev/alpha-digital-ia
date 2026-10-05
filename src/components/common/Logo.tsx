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
    sm: { image: 'h-8', mark: 'h-8 w-8', title: 'text-sm', strap: 'text-[7px]' },
    md: { image: 'h-11', mark: 'h-11 w-11', title: 'text-base', strap: 'text-[8px]' },
    lg: { image: 'h-16', mark: 'h-14 w-14', title: 'text-2xl', strap: 'text-[10px]' },
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img src="/alpha-isologo.png" alt="ALPHA" className={`${logoDimensions.mark} object-contain drop-shadow-[0_5px_14px_rgba(8,47,88,0.22)]`} />
      {showText && <span className="ml-2.5 leading-none">
        <span className={`${logoDimensions.title} block font-black tracking-[0.18em] text-[#0b3b68] dark:text-white`}>ALPHA</span>
        <span className={`${logoDimensions.strap} mt-1 block font-bold tracking-[0.16em] text-[#1593a2] dark:text-[#64d4cf]`}>DIGITAL TRANSFORMATION</span>
      </span>}
    </div>
  );
};
