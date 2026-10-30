import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Remonte en haut au changement de page ; défile vers l'ancre (#id) si présente,
// en tenant compte de la hauteur de l'en-tête fixe.
// Met aussi à jour le titre, la description et l'adresse canonique de chaque page,
// pour que Google ne prenne pas toutes les pages pour l'accueil.
const SITE = 'https://nod-consulting.com';
const PAGES: Record<string, { titre: string; description: string }> = {
  '/': {
    titre: 'NOD Consulting : une maison créative, une seule main',
    description: "NOD fait exister les projets et ceux qui les portent. Stratégie, identité, contenu, site : un seul interlocuteur, du brief au lancement.",
  },
  '/travail': {
    titre: 'Le travail · NOD Consulting',
    description: "Identités, sites, plateformes, contenus et même un livre : les projets que NOD a fait naître.",
  },
  '/la-maison': {
    titre: 'La maison · NOD Consulting',
    description: "Une maison qui fait exister les projets : comment NOD intervient, le déroulé d'un projet et qui le porte.",
  },
  '/a-la-carte': {
    titre: 'À la carte · NOD Consulting',
    description: "Choisis ce dont ton projet a besoin et reçois ton estimation par mail : stratégie, identité, site, contenu, réseaux.",
  },
  '/contact': {
    titre: 'Contact · NOD Consulting',
    description: "Un projet en tête ? Écris-moi. Une idée suffit pour lancer la conversation.",
  },
  '/mentions-legales': { titre: 'Mentions légales · NOD Consulting', description: 'Mentions légales du site nod-consulting.com.' },
  '/confidentialite': { titre: 'Confidentialité · NOD Consulting', description: 'Politique de confidentialité du site nod-consulting.com.' },
};

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
