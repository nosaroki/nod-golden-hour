import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const ApproachSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="section-padding" ref={ref}>
      <div className="content-container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-editorial-lg mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('approach.title')}
          </motion.h2>

          <motion.p
            className="text-editorial-md text-primary mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('approach.subtitle')}
          </motion.p>

          <motion.p
            className="text-body-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('approach.desc')}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
