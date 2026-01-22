import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, Building2, Wand2 } from 'lucide-react';

const pillars = [
  {
    titleKey: 'pillars.explore',
    descKey: 'pillars.explore.desc',
    icon: Compass,
  },
  {
    titleKey: 'pillars.architect',
    descKey: 'pillars.architect.desc',
    icon: Building2,
  },
  {
    titleKey: 'pillars.orchestrate',
    descKey: 'pillars.orchestrate.desc',
    icon: Wand2,
  },
];

export const PillarsSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" className="section-padding" ref={ref}>
      <div className="content-container">
        <motion.h2
          className="text-editorial-lg text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('pillars.title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.titleKey}
              className="group text-center p-8 lg:p-12 bg-card/50 backdrop-blur-sm card-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-8 text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <pillar.icon size={32} strokeWidth={1} />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-normal mb-6 group-hover:text-primary transition-colors duration-300">
                {t(pillar.titleKey)}
              </h3>
              
              <p className="text-muted-foreground text-base leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
