import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const pillars = [
  {
    key: 'explore',
    number: '01',
  },
  {
    key: 'architect',
    number: '02',
  },
  {
    key: 'orchestrate',
    number: '03',
  },
];

export const PillarsSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" className="section-padding" ref={ref}>
      <div className="content-container">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-editorial-lg text-center mb-6">{t('pillars.title')}</h2>
          <div className="flex justify-center">
            <div className="accent-line" />
          </div>
        </motion.div>

        {/* Pillars grid - Editorial layout */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.key}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
            >
              {/* Card with warm hover effect */}
              <div className="relative p-8 md:p-10 bg-card/60 backdrop-blur-sm border border-border/40 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-card/80 overflow-hidden">
                {/* Number */}
                <span 
                  className="block text-xs tracking-[0.3em] uppercase text-primary/60 mb-6"
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {pillar.number}
                </span>
                
                {/* Title - Migra Bold Italic */}
                <h3 
                  className="text-2xl md:text-3xl mb-6 transition-colors duration-300 group-hover:text-primary"
                  style={{ fontFamily: "'Migra', Georgia, serif", fontWeight: 700, fontStyle: 'italic' }}
                >
                  {t(`pillars.${pillar.key}`)}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t(`pillars.${pillar.key}.desc`)}
                </p>
                
                {/* Hover accent line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};