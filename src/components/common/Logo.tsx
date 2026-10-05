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
    sm: { image: 'h-8', mark: 'h-8 w-8' },
    md: { image: 'h-11', mark: 'h-10 w-10' },
    lg: { image: 'h-16', mark: 'h-14 w-14' },
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={showText ? '/alpha-logo-transparent.png' : '/alpha-isologo.png'}
        alt={showText ? 'ALPHA Digital Transformation' : 'ALPHA'}
        className={`${showText ? logoDimensions.image : logoDimensions.mark} w-auto object-contain drop-shadow-[0_5px_14px_rgba(8,47,88,0.22)]`}
      />
    </div>
  );
};
