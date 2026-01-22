import React from 'react';

interface NodSmileProps {
  className?: string;
  color?: 'orange' | 'blue';
  size?: number;
}

export const NodSmile: React.FC<NodSmileProps> = ({ 
  className = '', 
  color = 'orange',
  size = 100 
}) => {
  const strokeColor = color === 'orange' ? '#F55E30' : '#102542';
  
  return (
    <svg 
      width={size} 
      height={size * 0.6} 
      viewBox="0 0 200 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left end dot */}
      <circle cx="20" cy="100" r="8" fill={strokeColor} />
      
      {/* Smile curve */}
      <path
        d="M20 100 Q100 10 180 20"
        stroke={strokeColor}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right end dot */}
      <circle cx="180" cy="20" r="8" fill={strokeColor} />
    </svg>
  );
};
