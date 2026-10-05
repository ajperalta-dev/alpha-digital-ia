import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md'
}) => {
  const logoDimensions = {
    sm: 'h-9 w-[116px]',
    md: 'h-11 w-[142px]',
    lg: 'h-16 w-[205px]',
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logoalpha.jpg"
        alt="ALPHA Digital Transformation — Consultora de datos e IA"
        className={`${logoDimensions} rounded-lg object-contain bg-white shadow-[0_5px_22px_rgba(13,54,93,0.18)] ring-1 ring-[#d7b95b]/40`}
      />
    </div>
  );
};
