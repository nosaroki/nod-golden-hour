import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodLogo } from '@/components/NodLogo';
import { NodSmile } from '@/components/NodSmile';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center section-padding pt-32 md:pt-40">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative">
              <NodLogo size="xl" />
              <motion.div 
                className="absolute -right-8 -bottom-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <NodSmile size={50} color="blue" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-editorial-lg md:text-editorial-xl text-foreground mb-12 text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.div
            className="space-y-6 text-body-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            <p>{t('about.description3')}</p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-px h-16 bg-foreground/20 mx-auto"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
