/* Titre et description de chaque page : lus par ScrollManager dans le navigateur
   et par la pré-génération des pages au moment du déploiement. */
export const SITE = 'https://nod-consulting.com';
export const PAGES: Record<string, { titre: string; description: string }> = {
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
