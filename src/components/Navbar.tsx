import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NodLogo } from './NodLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.pillars', href: '#pillars' },
    { key: 'nav.approach', href: '#approach' },
    { key: 'nav.fields', href: '#fields' },
    { key: 'nav.signature', href: '#signature' },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="content-container">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - hidden on load, appears on scroll */}
            <Link to="/" className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isScrolled ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <NodLogo size="sm" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors link-underline"
                >
                  {t(item.key)}
                </button>
              ))}
              
              <Link
                to="/contact"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors link-underline"
              >
                {t('nav.contact')}
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center gap-2 ml-4 text-sm">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`transition-colors ${
                    language === 'fr' 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  FR
                </button>
                <span className="text-foreground/30">|</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors ${
                    language === 'en' 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile: Language Switcher + Burger Menu */}
            <div className="flex lg:hidden items-center gap-4">
              {/* Language Switcher - Always visible on mobile */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`transition-colors ${
                    language === 'fr' 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  FR
                </button>
                <span className="text-foreground/30">|</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors ${
                    language === 'en' 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl text-foreground text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {t(item.key)}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-foreground"
                >
                  {t('nav.contact')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
