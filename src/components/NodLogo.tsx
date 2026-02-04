import React from 'react';

interface NodLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
  hero: 'text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-[0.85]',
};

export const NodLogo: React.FC<NodLogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false 
}) => {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div 
        className={`tracking-tight italic ${sizeClasses[size]}`} 
        style={{ fontFamily: "'Migra', Georgia, serif" }}
      >
        <span className="nod-logo-n">N</span>
        <span className="nod-logo-o">O</span>
        <span className="nod-logo-d">D</span>
      </div>
      {showTagline && (
        <span className="text-nod-blue text-xs md:text-sm tracking-wide font-body italic mt-1">
          say yes to new projects
        </span>
      )}
    </div>
  );
};
