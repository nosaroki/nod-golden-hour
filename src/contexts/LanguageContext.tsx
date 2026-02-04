import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.pillars': 'Nos piliers',
    'nav.approach': 'Approche',
    'nav.fields': 'Domaines',
    'nav.signature': 'Signature',
    'nav.contact': 'Nous contacter',
    
    // Hero / About
    'hero.title': 'Nous aidons les organisations à dire oui à leurs projets les plus ambitieux',
    'about.description1': 'NOD Consulting est un studio-conseil en stratégie de marque et narration.',
    'about.description2': 'Nous accompagnons des entrepreneurs et des marques qui souhaitent clarifier leur positionnement, structurer leur message et déployer des contenus à forte valeur stratégique.',
    'about.description3': 'Fondé par Nnéna, stratège de marque et directrice éditoriale, NOD Consulting s\'entoure, selon les enjeux, des expertises les plus pertinentes pour accompagner chaque projet, du socle stratégique à sa mise en mouvement.',
    
    // Pillars
    'pillars.title': 'Nos piliers',
    'pillars.explore': 'Explorer',
    'pillars.explore.desc': 'Comprendre en profondeur les enjeux, les tensions, les opportunités et le territoire d\'expression d\'une marque.',
    'pillars.architect': 'Architecturer',
    'pillars.architect.desc': 'Construire une structure claire, cohérente et différenciante, capable de porter une vision dans le temps.',
    'pillars.orchestrate': 'Orchestrer',
    'pillars.orchestrate.desc': 'Mettre la stratégie en mouvement, coordonner les prises de parole et assurer une exécution alignée.',
    
    // Approach
    'approach.title': 'Notre approche',
    'approach.subtitle': 'Une méthode sur-mesure, une vision éditoriale.',
    'approach.desc': 'Chaque projet est unique. Nous développons des stratégies ancrées dans la réalité de votre marque, guidées par une exigence narrative forte et une vision claire de votre positionnement.',
    
    // Fields
    'fields.title': 'Domaines d\'expertise',
    'fields.subtitle': 'Ouverts et curieux par nature, nous aimons surtout les projets portés par une vision.',
    'fields.fashion': 'Mode & beauté',
    'fields.culture': 'Culture',
    'fields.services': 'Services',
    'fields.tech': 'Tech',
    'fields.education': 'Éducation',
    'fields.wellness': 'Bien-être',
    'fields.food': 'Food',
    'fields.beyond': 'Et au-delà',
    
    // Signature
    'signature.title': 'La Signature NOD',
    'signature.tagline': 'dire oui à de nouveaux projets',
    'signature.intro': 'Excellence, intégrité et résultats qui comptent.',
    'signature.description': 'En vous associant à NOD, vous gagnez plus qu\'un consultant—vous gagnez un allié dévoué à votre succès. Notre signature est notre promesse : une réflexion audacieuse, une exécution méticuleuse et des résultats transformateurs.',
    'signature.item1': 'Approche centrée sur le client',
    'signature.item2': 'Décisions basées sur les données',
    'signature.item3': 'Communication transparente',
    'signature.item4': 'Résultats mesurables',
    'signature.item5': 'Partenariat à long terme',
    
    // CTA
    'cta.title': 'Prêt à dire oui ?',
    'cta.subtitle': 'Discutons de votre projet.',
    'cta.button': 'Nous contacter',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Envie de collaborer ?',
    'contact.name': 'Nom complet',
    'contact.email': 'Adresse email',
    'contact.subject': 'Sujet',
    'contact.message': 'Votre message',
    'contact.send': 'Envoyer',
    'contact.success': 'Message envoyé avec succès !',
    'contact.error': 'Une erreur est survenue. Veuillez réessayer.',
    
    // 404
    '404.title': 'Page introuvable',
    '404.message': 'Cette page semble avoir dit non.',
    '404.button': 'Retour à l\'accueil',
    
    // Coming Soon
    'coming.title': 'Bientôt disponible',
    'coming.message': 'Nous préparons quelque chose d\'exceptionnel.\n',
    'coming.contact': 'En attendant, contactez-nous à\n',
    'coming.button': 'Retour à l\'accueil',
    
    // Footer
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.pillars': 'Pillars',
    'nav.approach': 'Approach',
    'nav.fields': 'Fields',
    'nav.signature': 'Signature',
    'nav.contact': 'Get in touch',
    
    // Hero / About
    'hero.title': 'We help organizations say yes to their most ambitious projects',
    'about.description1': 'NOD Consulting is a brand strategy and storytelling studio.',
    'about.description2': 'We partner with entrepreneurs and brands seeking to clarify their positioning, structure their narrative, and deploy high-value strategic content.',
    'about.description3': 'Founded by Nnéna, brand strategist and editorial director, NOD Consulting brings together the most relevant expertise for each project—from strategic foundation to activation.',
    
    // Pillars
    'pillars.title': 'Our Pillars',
    'pillars.explore': 'Explore',
    'pillars.explore.desc': 'Deeply understand the stakes, tensions, opportunities, and expressive territory of a brand.',
    'pillars.architect': 'Architect',
    'pillars.architect.desc': 'Build a clear, coherent, and distinctive structure capable of carrying a vision over time.',
    'pillars.orchestrate': 'Orchestrate',
    'pillars.orchestrate.desc': 'Set strategy in motion, coordinate communication, and ensure aligned execution.',
    
    // Approach
    'approach.title': 'Our Approach',
    'approach.subtitle': 'Bespoke methodology, editorial vision.',
    'approach.desc': 'Every project is unique. We develop strategies rooted in your brand\'s reality, guided by strong narrative standards and a clear vision of your positioning.',
    
    // Fields
    'fields.title': 'Fields of Expertise',
    'fields.subtitle': 'Open and curious by nature, we particularly love vision-driven projects.',
    'fields.fashion': 'Fashion & Beauty',
    'fields.culture': 'Culture',
    'fields.services': 'Services',
    'fields.tech': 'Tech',
    'fields.education': 'Education',
    'fields.wellness': 'Wellness',
    'fields.food': 'Food',
    'fields.beyond': 'And Beyond',
    
    // Signature
    'signature.title': 'The NOD Signature',
    'signature.tagline': 'say yes to new projects',
    'signature.intro': 'Excellence, integrity, and results that matter.',
    'signature.description': 'When you partner with NOD, you gain more than a consultant—you gain a dedicated ally committed to your success. Our signature is our promise: bold thinking, meticulous execution, and transformative outcomes.',
    'signature.item1': 'Client-centric approach',
    'signature.item2': 'Data-driven decisions',
    'signature.item3': 'Transparent communication',
    'signature.item4': 'Measurable results',
    'signature.item5': 'Long-term partnership',
    
    // CTA
    'cta.title': 'Ready to say yes?',
    'cta.subtitle': 'Let\'s discuss your project.',
    'cta.button': 'Get in touch',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready to collaborate?',
    'contact.name': 'Full name',
    'contact.email': 'Email address',
    'contact.subject': 'Subject',
    'contact.message': 'Your message',
    'contact.send': 'Send',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'An error occurred. Please try again.',
    
    // 404
    '404.title': 'Page not found',
    '404.message': 'This page seems to have said no.',
    '404.button': 'Back to home',
    
    // Coming Soon
    'coming.title': 'Coming Soon',
    'coming.message': 'We\'re preparing something exceptional. \nStay tuned.',
    'coming.contact': 'In the meantime, reach us at\n',
    'coming.button': 'Back to home',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
