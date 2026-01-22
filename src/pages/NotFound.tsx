import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodSmile } from '@/components/NodSmile';
import { AnimatedBackground } from '@/components/AnimatedBackground';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="relative z-10 content-container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <NodSmile size={120} color="orange" className="mx-auto transform rotate-180" />
        </motion.div>

        <motion.h1
          className="text-editorial-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-editorial-md text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t('404.title')}
        </motion.p>

        <motion.p
          className="text-body-lg text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('404.message')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/" className="btn-premium">
            <span>{t('404.button')}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
