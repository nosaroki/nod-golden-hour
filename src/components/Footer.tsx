import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NodLogo } from './NodLogo';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 ">
          <NodLogo size="sm"/>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} NOD Consulting. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
