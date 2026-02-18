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
        <div className="max-w-5xl mx-auto">
          {/* Logo with Smile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="mb-16 flex flex-col items-center font-weight-bold"
          >
            <div className="relative">
              <NodLogo size="xl" />
              <motion.div 
                className="absolute -right-10 -bottom-2"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <NodSmile size={60} color="blue" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title - Editorial style */}
          <motion.h1
            className="text-editorial-xl text-foreground text-center mb-16 text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Accent line */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="accent-line" />
          </motion.div>

          {/* Description - Clean editorial */}
          <motion.div
            className="space-y-8 text-body-lg text-muted-foreground max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            <p>{t('about.description3')}</p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-24 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};