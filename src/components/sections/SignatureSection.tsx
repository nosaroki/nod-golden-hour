import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodLogo } from '../NodLogo';
import { NodSmile } from '../NodSmile';

const signatureItems = [
  'signature.item1',
  'signature.item2',
  'signature.item3',
  'signature.item4',
  'signature.item5',
];

export const SignatureSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="signature" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Warm gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(35 100% 65% / 0.04) 50%, transparent 100%)',
        }}
      />
      
      <div className="content-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-editorial-lg text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t('signature.title')}
          </motion.h2>
          
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="accent-line" />
          </motion.div>

          <motion.p
            className="text-editorial-md text-primary text-center mb-6"
            style={{ fontFamily: "'Migra', Georgia, serif", fontStyle: 'italic' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t('signature.intro')}
          </motion.p>

          <motion.p
            className="text-body-lg text-muted-foreground text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {t('signature.description')}
          </motion.p>

          {/* Signature Items - 5 Premium Compartments */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
            {signatureItems.map((itemKey, index) => (
              <motion.div
                key={itemKey}
                className="group relative p-5 md:p-6 bg-card/50 backdrop-blur-sm border border-border/30 text-center transition-all duration-500 cursor-default hover:bg-card/80 hover:border-primary/30"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Top accent line on hover */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary via-secondary to-accent origin-center"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-300"
                  />
                  <span className="text-xs md:text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                    {t(itemKey)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logo and Tagline */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
};