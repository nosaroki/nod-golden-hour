import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodSmile } from '@/components/NodSmile';
import { GlitterBackground } from '@/components/GlitterBackground';
import { NodLogo } from '@/components/NodLogo';

const ComingSoon = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <GlitterBackground />
      
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setLanguage('fr')}
          className={`text-sm font-medium transition-colors ${
            language === 'fr' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          FR
        </button>
        <span className="text-muted-foreground">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`text-sm font-medium transition-colors ${
            language === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </button>
      </div>
      
      <div className="relative z-10 content-container text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <NodLogo size="lg" />
        </motion.div>

        {/* Smile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <NodSmile size={80} color="blue" className="mx-auto" />
        </motion.div>

        <motion.h1
          className="text-editorial-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t('coming.title')}
        </motion.h1>

        <motion.p
          className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('coming.message')}
        </motion.p>

        <motion.p
          className="text-body-md text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('coming.contact')}{' '}
          <a 
            href="mailto:contact@nod-consulting.com" 
            className="text-primary hover:underline"
          >
            contact@nod-consulting.com
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/" className="btn-premium">
            <span>{t('coming.button')}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
