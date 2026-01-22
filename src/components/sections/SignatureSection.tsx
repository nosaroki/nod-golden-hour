import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodLogo } from '../NodLogo';
import { NodSmile } from '../NodSmile';

export const SignatureSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="signature" className="section-padding" ref={ref}>
      <div className="content-container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-editorial-lg mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('signature.title')}
          </motion.h2>

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <NodLogo size="lg" />
              <motion.div 
                className="absolute -right-6 -bottom-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <NodSmile size={50} color="blue" />
              </motion.div>
            </div>
            
            <motion.p
              className="text-nod-blue text-lg md:text-xl italic font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('signature.tagline')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
