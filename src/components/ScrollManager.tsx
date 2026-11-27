import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Remonte en haut au changement de page ; défile vers l'ancre (#id) si présente,
// en tenant compte de la hauteur de l'en-tête fixe.
// Met aussi à jour le titre, la description et l'adresse canonique de chaque page,
// pour que Google ne prenne pas toutes les pages pour l'accueil.
import { PAGES, SITE } from '@/seo';

function meta(selecteur: string, attribut: string, valeur: string) {
  const el = document.querySelector(selecteur);
  if (el) el.setAttribute(attribut, valeur);
}

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const chemin = pathname.replace(/\/+$/, '') || '/';
    const page = PAGES[chemin];
    if (page) {
      document.title = page.titre;
      meta('meta[name="description"]', 'content', page.description);
      meta('meta[property="og:title"]', 'content', page.titre);
      meta('meta[property="og:description"]', 'content', page.description);
      meta('meta[property="og:url"]', 'content', SITE + (chemin === '/' ? '/' : chemin));
      meta('link[rel="canonical"]', 'href', SITE + (chemin === '/' ? '/' : chemin));
    }
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!hash) return;
    /* Les pages se chargent à la demande : on attend que l'ancre existe. */
    let essais = 0;
    let minuteur = 0;
    const chercher = () => {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (essais++ < 30) {
        minuteur = window.setTimeout(chercher, 60);
      }
    };
    chercher();
    return () => window.clearTimeout(minuteur);
  }, [pathname, hash]);

  return null;
}
