import React, { useEffect, useRef, useState } from 'react';

export const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const animationDuration = useRef(40); // Base animation duration in seconds

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Calculate speed factor based on scroll velocity
      const speedFactor = Math.min(scrollDelta / 10, 3);
      setScrollSpeed(speedFactor);
      
      lastScrollY = currentScrollY;
      
      // Reset speed after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Calculate animation duration based on scroll speed
  const currentDuration = Math.max(8, animationDuration.current - scrollSpeed * 10);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-0"
    >
      {/* Base background layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/background-texture.jpeg)',
          filter: 'brightness(0.85)',
        }}
      />
      
      {/* Animated moving layer 1 */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{
          backgroundImage: 'url(/images/background-texture.jpeg)',
          backgroundSize: '50% 50%',
          opacity: 0.4,
          animation: `backgroundPan ${currentDuration}s ease-in-out infinite`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Animated moving layer 2 - opposite direction */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{
          backgroundImage: 'url(/images/background-texture.jpeg)',
          backgroundSize: '60% 60%',
          opacity: 0.3,
          animation: `backgroundPanReverse ${currentDuration * 1.3}s ease-in-out infinite`,
          mixBlendMode: 'soft-light',
        }}
      />
      
      {/* Subtle shimmer overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 211, 94, 0.05) 25%, transparent 50%, rgba(255, 180, 60, 0.03) 75%, transparent 100%)',
          backgroundSize: '400% 400%',
          animation: `shimmerOverlay ${currentDuration * 0.8}s ease-in-out infinite`,
        }}
      />
      
      {/* Vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(16, 37, 66, 0.15) 70%, rgba(16, 37, 66, 0.3) 100%)',
        }}
      />
    </div>
  );
};
