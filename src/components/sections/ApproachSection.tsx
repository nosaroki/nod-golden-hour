import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const ApproachSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Warm gradient background accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(18 75% 48% / 0.03) 50%, transparent 100%)',
        }}
      />
      
      <div className="content-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary/70">
              {t('approach.title')}
            </span>
          </motion.div>

          {/* Main quote - Editorial large */}
          <motion.h2
            className="text-editorial-lg md:text-editorial-xl text-center mb-12"
            style={{ fontFamily: "'Migra', Georgia, serif", fontStyle: 'italic', fontWeight: 'normal'}}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('approach.subtitle')}
          </motion.h2>

          {/* Accent line */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="accent-line" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('approach.desc')}
          </motion.p>
        </div>
      </div>
    </section>
  );
};