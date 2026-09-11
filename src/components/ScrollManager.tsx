import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Remonte en haut au changement de page ; défile vers l'ancre (#id) si présente,
// en tenant compte de la hauteur de l'en-tête fixe.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
