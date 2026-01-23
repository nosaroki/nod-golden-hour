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
  
  // Viewbox designed to match the reference smile exactly
  // The smile has rounded perpendicular ends and a sweeping curve
  return (
    <svg 
      width={size} 
      height={size * 0.75} 
      viewBox="0 0 200 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left end - small perpendicular rounded cap */}
      <path
        d="M25 95 L25 115"
        stroke={strokeColor}
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Main smile curve - matches the reference sweep */}
      <path
        d="M25 105 Q50 140 100 140 Q150 140 175 70"
        stroke={strokeColor}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right end - small perpendicular rounded cap pointing up-right */}
      <path
        d="M172 73 L185 58"
        stroke={strokeColor}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
};
