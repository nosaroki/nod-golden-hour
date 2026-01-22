import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const fields = [
  { key: 'fields.fashion' },
  { key: 'fields.culture' },
  { key: 'fields.services' },
  { key: 'fields.tech' },
  { key: 'fields.education' },
  { key: 'fields.wellness' },
  { key: 'fields.food' },
  { key: 'fields.beyond' },
];

export const FieldsSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fields" className="section-padding" ref={ref}>
      <div className="content-container">
        <motion.h2
          className="text-editorial-lg text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('fields.title')}
        </motion.h2>

        <motion.p
          className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('fields.subtitle')}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {fields.map((field, index) => (
            <motion.div
              key={field.key}
              className="group relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <motion.span
                className="inline-block px-6 py-3 md:px-8 md:py-4 text-sm md:text-base border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
                whileHover={{ y: -2 }}
              >
                {t(field.key)}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
