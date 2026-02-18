import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const fields = [
  'fashion', 'culture', 'services', 'tech', 
  'education', 'wellness', 'food', 'beyond'
];

export const FieldsSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fields" className="section-padding" ref={ref}>
      <div className="content-container">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-editorial-lg mb-6">{t('fields.title')}</h2>
          <div className="flex justify-center mb-8">
            <div className="accent-line" />
          </div>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            {t('fields.subtitle')}
          </p>
        </motion.div>

        {/* Fields - Horizontal flow layout */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {fields.map((field, index) => (
            <motion.div
              key={field}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <div className="relative px-6 py-3 border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-500 cursor-default group-hover:border-primary/40 group-hover:bg-card/70 overflow-hidden">
                <span 
                  className="text-sm md:text-base text-foreground/80 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "'Migra', Georgia, serif", fontStyle: 'italic' }}
                >
                  {t(`fields.${field}`)}
                </span>
                
                {/* Subtle underline on hover */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};