import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NodSmile } from './NodSmile';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            backgroundImage: 'url(/images/background-texture.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
            }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <NodSmile size={150} color="orange" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
