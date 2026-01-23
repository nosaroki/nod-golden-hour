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
    <section id="signature" className="section-padding" ref={ref}>
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-editorial-lg text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('signature.title')}
          </motion.h2>

          <motion.p
            className="text-editorial-md text-primary text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('signature.intro')}
          </motion.p>

          <motion.p
            className="text-body-lg text-muted-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('signature.description')}
          </motion.p>

          {/* Signature Items - Animated Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {signatureItems.map((itemKey, index) => (
              <motion.div
                key={itemKey}
                className="group relative p-6 bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden cursor-default"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Animated border glow on hover */}
                <motion.div
                  className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500"
                />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <span className="text-sm md:text-base text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {t(itemKey)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logo and Tagline */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative">
              <NodLogo size="lg" />
              <motion.div 
                className="absolute -right-6 -bottom-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <NodSmile size={50} color="blue" />
              </motion.div>
            </div>
            
            <motion.p
              className="text-nod-blue text-lg md:text-xl italic font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {t('signature.tagline')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
