/* Tarifs de départ de la brochure 2026, utilisés par la page Estimation.
   prix : null = sur devis. mensuel : prix par mois. */

export interface Ligne {
  id: string;
  fr: string;
  en: string;
  dFr: string;
  dEn: string;
  prix: number | null;
  mensuel?: boolean;
  annuel?: boolean;
}

export interface SousGroupe {
  fr?: string;
  en?: string;
  /* Une seule ligne possible dans ce sous-groupe (paliers, formules). */
  unique?: boolean;
  lignes: Ligne[];
}

export interface Groupe {
  id: string;
  repereFr: string;
  repereEn: string;
  fr: string;
  en: string;
  introFr: string;
  introEn: string;
  sous: SousGroupe[];
}

/* Tout confier : le lancement complet, en deux formats. Remplace la sélection détaillée. */
export const LANCEMENTS: Ligne[] = [
  {
    id: 'lancement-court',
    fr: 'Format court', en: 'Short format',
    dFr: "8 à 10 semaines. Cadrage, identité, site vitrine jusqu'à 5 pages, contenus de lancement, mise en ligne. Tu repars avec tout, prêt à lancer.",
    dEn: '8 to 10 weeks. Framing, identity, showcase website up to 5 pages, launch content, going live. You leave with everything, ready to launch.',
    prix: 8000,
  },
  {
    id: 'lancement-complet',
    fr: 'Accompagnement complet', en: 'Full support',
    dFr: "Au-delà du format court : un site plus complet ou une plateforme, le suivi des réseaux, le pilotage et la coordination des prestataires. Sur devis, selon le projet.",
    dEn: 'Beyond the short format: a larger website or a platform, social media follow-up, steering and coordination of providers. On quote, depending on the project.',
    prix: null,
  },
];

export const GROUPES: Groupe[] = [
  {
    id: 'direction',
    repereFr: 'Partir de zéro', repereEn: 'Starting from scratch',
    fr: 'Poser la direction', en: 'Setting the direction',
    introFr: 'Avant de construire quoi que ce soit.', introEn: 'Before building anything.',
    sous: [{
      lignes: [
        { id: 'cadrage', fr: 'Cadrage stratégique', en: 'Strategic framing', dFr: "Positionnement, cible, promesse de marque, feuille de route de lancement", dEn: 'Positioning, audience, brand promise, launch roadmap', prix: 1800 },
        { id: 'identite', fr: 'Identité de marque', en: 'Brand identity', dFr: 'Logo, déclinaisons, palette, typographies, univers graphique, premiers supports', dEn: 'Logo, variations, palette, typography, visual world, first materials', prix: 3500 },
      ],
    }],
  },
  {
    id: 'strategie',
    repereFr: "Repenser l'existant", repereEn: 'Rethinking what exists',
    fr: 'Stratégie éditoriale', en: 'Editorial strategy',
    introFr: 'Ton projet existe déjà et tu veux le retravailler : on fait le point, puis on trace la suite.', introEn: 'Your project already exists and you want to rework it: we take stock, then map out what comes next.',
    sous: [{
      lignes: [
        { id: 'audit-positionnement', fr: 'Audit et positionnement', en: 'Audit and positioning', dFr: 'Analyse, questionnaire, atelier, synthèse', dEn: 'Analysis, questionnaire, workshop, summary', prix: 900 },
        { id: 'strategie-contenu', fr: 'Stratégie de contenu', en: 'Content strategy', dFr: 'Axes éditoriaux, calendrier, formats', dEn: 'Editorial pillars, calendar, formats', prix: 900 },
        { id: 'audit-reseaux', fr: 'Audit des réseaux', en: 'Social media audit', dFr: 'Performances, recommandations stratégiques et éditoriales', dEn: 'Performance, strategic and editorial recommendations', prix: 400 },
      ],
    }],
  },
  {
    id: 'site',
    repereFr: 'Construire', repereEn: 'Building',
    fr: 'Le site', en: 'The website',
    introFr: 'Livré en entier : architecture, textes, design sur mesure, développement, mise en ligne, référencement technique.',
    introEn: 'Delivered in full: structure, copy, custom design, development, going live, technical SEO.',
    sous: [{
      unique: true,
      lignes: [
        { id: 'site-simple', fr: 'Vitrine simple', en: 'One-page website', dFr: '1 page', dEn: '1 page', prix: 1200 },
        { id: 'site-etoffe', fr: 'Vitrine étoffée', en: 'Standard website', dFr: '2 à 5 pages', dEn: '2 to 5 pages', prix: 2000 },
        { id: 'site-complet', fr: 'Vitrine complète', en: 'Full website', dFr: '6 à 10 pages', dEn: '6 to 10 pages', prix: 3500 },
        { id: 'plateforme', fr: 'Plateforme sur mesure', en: 'Custom platform', dFr: 'Réservation, comptes, back-office', dEn: 'Booking, accounts, back office', prix: null },
      ],
    }],
  },
  {
    id: 'options',
    repereFr: 'Construire', repereEn: 'Building',
    fr: 'Les options du site', en: 'Website options',
    introFr: "Un formulaire de contact, les statistiques, une newsletter ou un agenda type Calendly font partie de tout site. Ici, les fonctionnalités qui demandent un vrai développement en plus.", introEn: 'A contact form, analytics, a newsletter or a Calendly-style scheduler come with every website. Here are the features that need real extra development.',
    sous: [{
      lignes: [
        { id: 'multilingue', fr: 'Site multilingue', en: 'Multilingual website', dFr: 'Bilingue et sélecteur de langue, traduction non comprise', dEn: 'Bilingual setup and language switcher, translation not included', prix: 300 },
        { id: 'reservation', fr: 'Réservation sur mesure', en: 'Custom booking', dFr: 'Système construit pour le projet : créneaux, confirmations, rappels', dEn: 'A system built for the project: slots, confirmations, reminders', prix: 350 },
        { id: 'paiement', fr: 'Paiement en ligne', en: 'Online payment', dFr: 'Stripe, tunnel de paiement, confirmations, tests', dEn: 'Stripe, checkout flow, confirmations, testing', prix: 600 },
        { id: 'donnees', fr: 'Données et espaces utilisateurs', en: 'Data and user accounts', dFr: 'Base de données, back-office, règles de sécurité', dEn: 'Database, back office, security rules', prix: 1500 },
        { id: 'ia', fr: 'Intégration IA', en: 'AI integration', dFr: 'Assistant, génération de contenu, recommandation, automatisation', dEn: 'Assistant, content generation, recommendations, automation', prix: 800 },
        { id: 'sur-mesure', fr: 'Fonctionnalité sur mesure', en: 'Custom feature', dFr: 'Calcul, configurateur, module propre au projet', dEn: 'Calculator, configurator, a module specific to the project', prix: null },
      ],
    }],
  },
  {
    id: 'autour',
    repereFr: 'Construire', repereEn: 'Building',
    fr: 'Autour du site', en: 'Around the website',
    introFr: 'Pour un nouveau site comme pour un site existant.', introEn: 'For a new website as well as an existing one.',
    sous: [
      { fr: 'Tout centraliser', en: 'Keep it all in one place', lignes: [
        { id: 'gestion-annuelle', fr: 'Domaine, hébergement et mails', en: 'Domain, hosting and email', dFr: "Je choisis le nom de domaine, crée tes adresses mail et héberge le site. Frais des fournisseurs refacturés au réel : le montant dépend du nom de domaine et du nombre d'adresses.", dEn: "I choose the domain name, create your email addresses and host the website. Provider fees passed on at cost: the amount depends on the domain name and the number of addresses.", prix: 150, annuel: true },
      ] },
      { fr: 'Être trouvé', en: 'Getting found', lignes: [
        { id: 'audit-seo', fr: 'Audit SEO', en: 'SEO audit', dFr: 'Technique, mots-clés, concurrence, plan d\'action priorisé. Site jusqu\'à 10 pages', dEn: 'Technical check, keywords, competitors, prioritised action plan. Website up to 10 pages', prix: 350 },
        { id: 'optimisation-seo', fr: 'Optimisation SEO', en: 'SEO optimisation', dFr: 'Mise en œuvre : structure, balises, textes, maillage, vitesse, Search Console. Site jusqu\'à 10 pages', dEn: 'Implementation: structure, tags, copy, internal links, speed, Search Console. Website up to 10 pages', prix: 600 },
      ] },
    ],
  },
  {
    id: 'contenu',
    repereFr: 'Faire vivre', repereEn: 'Bringing it to life',
    fr: 'Le contenu', en: 'Content',
    introFr: 'Chaque mission se prend seule ou se combine.', introEn: 'Each service can be taken on its own or combined.',
    sous: [
      { fr: 'Posts et visuels', en: 'Posts and visuals', lignes: [
        { id: 'pack-posts', fr: 'Pack 10 posts', en: '10-post pack', dFr: 'Visuels sur mesure, textes, intentions éditoriales', dEn: 'Custom visuals, captions, editorial intent', prix: 800 },
        { id: 'canva', fr: 'Templates Canva', en: 'Canva templates', dFr: 'Cinq modèles réutilisables, à la charte', dEn: 'Five reusable, on-brand templates', prix: 350 },
      ] },
      { fr: 'Vidéo', en: 'Video', lignes: [
        { id: 'video', fr: 'Vidéo à la carte', en: 'Single video', dFr: 'Captation sur place, ou montage à partir de rushs fournis', dEn: 'Filmed on site, or edited from supplied footage', prix: 350 },
        { id: 'pack-mensuel', fr: 'Pack mensuel', en: 'Monthly pack', dFr: 'Quatre vidéos par mois, programmation', dEn: 'Four videos a month, scheduling', prix: 900, mensuel: true },
      ] },
    ],
  },
  {
    id: 'reseaux',
    repereFr: 'Faire vivre', repereEn: 'Bringing it to life',
    fr: 'Réseaux et publicité', en: 'Social media and ads',
    introFr: 'Une présence suivie, mois après mois.', introEn: 'A steady presence, month after month.',
    sous: [
      { fr: 'Gestion des réseaux', en: 'Social media management', unique: true, lignes: [
        { id: 'reseaux-essentiel', fr: 'Gestion essentielle', en: 'Essential management', dFr: 'Dix posts par mois : création, planning, programmation, suivi', dEn: 'Ten posts a month: creation, planning, scheduling, follow-up', prix: 1200, mensuel: true },
        { id: 'reseaux-premium', fr: 'Gestion premium', en: 'Premium management', dFr: 'Vingt posts par mois, avec une analyse mensuelle des résultats', dEn: 'Twenty posts a month, with a monthly performance review', prix: 1800, mensuel: true },
      ] },
      { fr: 'Publicité en ligne', en: 'Online advertising', lignes: [
        { id: 'pub-gestion', fr: 'Gestion des publicités', en: 'Ad management', dFr: 'Mise en place, ciblage, budget, suivi, optimisation, bilan de fin de campagne. Le budget publicitaire se paie directement à la plateforme', dEn: 'Setup, targeting, budget, monitoring, optimisation, end-of-campaign review. The ad budget is paid directly to the platform', prix: 450, mensuel: true },
        { id: 'pub-audit', fr: 'Audit de campagnes', en: 'Campaign audit', dFr: 'Pour des campagnes déjà lancées, par toi ou par un autre prestataire : analyse des performances, recommandations', dEn: 'For campaigns already running, by you or another provider: performance analysis, recommendations', prix: 400 },
      ] },
    ],
  },
];

/* Audit et positionnement + stratégie de contenu : 1 600 € ensemble. */
export const DUO_STRATEGIE = { ids: ['audit-positionnement', 'strategie-contenu'], prix: 1600, fr: 'Audit, positionnement et stratégie de contenu', en: 'Audit, positioning and content strategy' };

/* Au-delà, le lancement complet (à partir de 8 000 €) devient souvent plus juste. */
export const SEUIL_LANCEMENT = 7000;
