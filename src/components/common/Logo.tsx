import React from 'react';
import { useTheme } from '../../context/theme';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  variant?: 'auto' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true,
  variant = 'auto'
}) => {
  const { isDark } = useTheme();
  const whiteLettering = variant === 'dark' || (variant === 'auto' && isDark);
  const dimensions = { sm: 'w-16', md: 'w-20', lg: 'w-36', hero: 'w-full max-w-[440px]' }[size];
  if (!showText) {
    return <img src="/brand/identity-v2/alpha-isologo-transparente.png" alt="ALPHA"
      className={`object-contain ${dimensions} ${className}`} />;
  }
  // The original emblem stays unchanged. Lettering is vector-native so its
  // weight, clear space and projected outer A diagonals stay deterministic.
  return (
    <span className={`relative block shrink-0 select-none ${dimensions} ${className}`}>
      <svg viewBox="0 0 500 450" role="img"
        aria-label="ALPHA · Digital Transformation · Consultora de datos e IA"
        className="block w-full h-auto" fill={whiteLettering ? '#f4f8fc' : '#0b2a4a'}>
        <svg x="90" y="0" width="320" height="268" viewBox="190 60 870 730">
          <image href="/brand/identity-v2/alpha-logo-web.png" width="1254" height="1254" />
        </svg>
        {/* 28 units of clear space; outer legs continue the emblem's slope. */}
        <g fillRule="evenodd">
          <path d="M73.3 296H87L136 378H118L104.5 355H56.1L42.4 378H24.3ZM80.2 314L64.5 341H96.2Z" />
          <path d="M149 296H165V363H210V378H149Z" />
          <path d="M224 296H259C279 296 290 306 290 322S279 349 259 349H240V378H224ZM240 311V334H258C269 334 274 330 274 322S269 311 258 311Z" />
          <path d="M300 296H316V329H342V296H358V378H342V344H316V378H300Z" />
          <path d="M413 296H426.7L475.7 378H457.6L443.9 355H395.5L382 378H364ZM419.8 314L403.8 341H435.5Z" />
        </g>
        <text x="250" y="413" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="17" fontWeight="600" letterSpacing="3">DIGITAL TRANSFORMATION</text>
        <text x="250" y="438" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="12" fontWeight="500" letterSpacing="2.5">CONSULTORA DE DATOS E IA</text>
      </svg>
    </span>
  );
};
