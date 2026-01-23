import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodSmile } from '../NodSmile';

export const CTASection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="content-container">
        <motion.div 
          className="max-w-2xl mx-auto text-center p-12 md:p-16 rounded-sm"
          style={{
            background: 'linear-gradient(135deg, hsl(23 100% 65% / 0.15) 0%, hsl(44 100% 68% / 0.2) 100%)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <NodSmile size={80} color="orange" />
          </motion.div>

          <motion.h2
            className="text-editorial-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('cta.title')}
          </motion.h2>

          <motion.p
            className="text-body-lg text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('cta.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/contact" className="btn-premium">
              <span>{t('cta.button')}</span>
            </Link>
          </motion.div>

          {/* Email */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="mailto:contact@nod-consulting.com" 
              className="text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              contact@nod-consulting.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
