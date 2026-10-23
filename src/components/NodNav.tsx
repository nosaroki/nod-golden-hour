import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* Navigation du site. Forme reprise du design system : barre fine, crème,
   filet bas, aucune ombre. Au-dessus d'une photographie plein cadre elle passe
   en verre sombre tant que la page n'a pas défilé. Le logotype reste le NOD
   Migra au dégradé animé. */

interface NodNavProps {
  /** true sur les pages qui ouvrent sur une image plein cadre. */
  overImage?: boolean;
}

const LIENS = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/travail', fr: 'Le travail', en: 'The work' },
  { to: '/la-maison', fr: 'La maison', en: 'The house' },
  { to: '/contact', fr: 'Contact', en: 'Contact' },
];

export default function NodNav({ overImage = false }: NodNavProps) {
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const over = overImage && !scrolled;

  return (
    <header className={'nodnav' + (over ? ' nodnav--over' : '')}>
      <Link to="/" className="nodnav__logo shimmer-text migra-font" aria-label="NOD, accueil">
        NOD
      </Link>

      <nav className={'nodnav__links' + (open ? ' is-open' : '')} aria-label="Navigation principale">
        <button type="button" className="nodnav__close" aria-label="Fermer le menu" onClick={() => setOpen(false)}>
          <X size={20} strokeWidth={1.5} />
        </button>
        {LIENS.map((lien) => (
          <Link
            key={lien.to}
            to={lien.to}
            className={'nodnav__link' + (pathname === lien.to ? ' is-active' : '')}
            aria-current={pathname === lien.to ? 'page' : undefined}
          >
            {language === 'fr' ? lien.fr : lien.en}
          </Link>
        ))}
      </nav>

      <div className="nodnav__right">
        <div className="nodnav__lang">
          <button type="button" className={language === 'fr' ? 'is-on' : ''} onClick={() => setLanguage('fr')}>FR</button>
          <span className="nodnav__sep" aria-hidden="true">|</span>
          <button type="button" className={language === 'en' ? 'is-on' : ''} onClick={() => setLanguage('en')}>EN</button>
        </div>
        <button type="button" className="nodnav__burger" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}>
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
