import idala from '@/assets/idala.webp';
import jasminka from '@/assets/jasminka.webp';
import unmatched from '@/assets/unmatched.webp';
import lightFold from '@/assets/brand/light-fold-warm.webp';
import inkOrange from '@/assets/brand/texture-ink-orange.webp';
import marbleOrange from '@/assets/brand/texture-marble-orange.webp';
import gradientFold from '@/assets/brand/gradient-fold-yellow.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';

/* Les projets NOD. Chaque fiche suit la même logique : le besoin du client,
   puis ce que NOD a livré. Les outils vivent dans les tags, pas dans le texte.
   `image` : le visuel du projet, ou une texture de marque en attendant. */

export interface Projet {
  id: string;
  famille: 'sites' | 'identite' | 'strategie' | 'contenu' | 'edition';
  titre: string;
  sousTitre: string;
  kicker: string;
  image: string;
  /** true quand l'image est une texture de marque, pas le projet lui-même. */
  placeholder?: boolean;
  /** true quand un vrai visuel est attendu ; affiche « Visuel à venir ». */
  aVenir?: boolean;
  texte: string;
  role: string;
  tags: string[];
  /** Lien vers le site ou le contenu publié, ouvert dans un nouvel onglet. */
  lien?: string;
  lienLabel?: { fr: string; en: string };
}

export const familles: { id: Projet['famille'] | 'tout'; fr: string; en: string }[] = [
  { id: 'tout', fr: 'Tout', en: 'All' },
  { id: 'sites', fr: 'Sites & plateformes', en: 'Sites & platforms' },
  { id: 'identite', fr: 'Identité', en: 'Identity' },
  { id: 'strategie', fr: 'Stratégie & lancement', en: 'Strategy & launch' },
  { id: 'contenu', fr: 'Contenus', en: 'Content' },
  { id: 'edition', fr: 'Édition', en: 'Publishing' },
];

const VOIR_SITE = { fr: 'Voir le site', en: 'See the site' };

export const projets: Projet[] = [
  {
    id: 'idala', famille: 'sites', titre: 'Idala', sousTitre: 'Plateforme bien-être',
    kicker: 'Plateforme web', image: idala,
    texte: "Réunir des praticiens du bien-être et leurs clients sur un seul site, en cabinet, à domicile ou en visio. NOD a conçu puis développé la plateforme entière : annuaire des praticiens, réservation et paiement en ligne, séances en visio, espace d'administration. Le tout fonctionne en français comme en anglais.",
    role: 'Conception et développement, du cahier des charges à la mise en ligne',
    tags: ['Développement web', 'Paiement en ligne', 'Bilingue'],
    lien: 'https://theidalafamily.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'unmatched', famille: 'strategie', titre: 'Unmatched', sousTitre: 'Maison de beauté au matcha',
    kicker: 'Lancement de marque', image: unmatched,
    texte: "Une maison de beauté au matcha, partie d'une page blanche. NOD a pris la direction des opérations : stratégie digitale, organisation du lancement, première vitrine en ligne pour créer l'attente avant l'ouverture.",
    role: 'Direction des opérations et stratégie digitale',
    tags: ['Stratégie', 'Opérations', 'Figma', 'Shopify'],
    lien: 'https://unmatchedbeautyglobal.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'jasminka', famille: 'identite', titre: 'Jasminka', sousTitre: 'Identité & Instagram',
    kicker: 'Identité et réseaux', image: jasminka,
    texte: "Une médium et praticienne en soin énergétique qui voulait une présence à son image. NOD a créé son identité visuelle complète, puis lancé son compte Instagram dans la même voix : premiers posts, stories à la une, ligne éditoriale.",
    role: 'Identité visuelle et direction éditoriale',
    tags: ['Identité', 'Instagram'],
  },
  {
    id: 'drugs', famille: 'identite', titre: 'Drugs and Sports', sousTitre: 'Identité de podcast',
    kicker: 'Identité et contenu', image: orangePressee, placeholder: true, aVenir: true,
    texte: "Un podcast qui changeait de nom et avait besoin d'une image à la hauteur. NOD a construit tout son univers : logo, brandbook, miniatures d'épisodes, bannière YouTube, pistes de contenus pour TikTok, Instagram et YouTube, plaquette pour les sponsors, guide de communication.",
    role: 'Direction artistique et stratégie de contenu',
    tags: ['Identité', 'Brandbook', 'Contenu', 'Partenariats'],
  },
  {
    id: 'mangrove', famille: 'sites', titre: 'Mangrove', sousTitre: 'Site de photographe de surf',
    kicker: 'Site', image: gradientFold, placeholder: true, aVenir: true,
    texte: "Un photographe de surf installé au Costa Rica voulait un seul lieu pour montrer son travail et le vendre. NOD a construit son site : galeries par séance, boutique de tirages, paiement en ligne. Ses clients retrouvent leurs photos puis les achètent au même endroit.",
    role: 'Conception et mise en ligne',
    tags: ['Site', 'E-commerce', 'Pixieset'],
    lien: 'https://mangrovesurfphotography.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'oda', famille: 'sites', titre: 'ODA', sousTitre: 'Tarot & astrologie',
    kicker: 'Projet maison', image: inkOrange, placeholder: true, aVenir: true,
    texte: "Une plateforme de tarot et d'astrologie imaginée, dessinée puis développée par NOD de bout en bout : tirages, thème natal, astrocartographie, plusieurs langues. Une idée devenue un produit complet, de l'identité au code.",
    role: 'Concept, identité, développement',
    tags: ['Produit', 'Identité', 'Développement'],
    lien: 'https://oracledesarcanes.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'contenus', famille: 'contenu', titre: 'Contenus pour les réseaux', sousTitre: 'Vidéo, carrousels, audit',
    kicker: 'Contenus', image: lightFold, placeholder: true, aVenir: true,
    texte: "Des contenus pensés pour chaque voix. Pour une praticienne en drainage lymphatique, captation, montage et voix off. Pour une cheffe à domicile, des réels tirés de longues captations, puis des carrousels. Pour une sophrologue, un audit de son compte, puis un carrousel en portugais pour annoncer sa retraite.",
    role: 'Réalisation, montage, stratégie de contenu',
    tags: ['Vidéo', 'Montage', 'Carrousels', 'Audit'],
    lien: 'https://www.instagram.com/evadfvs/', lienLabel: { fr: 'Voir des vidéos', en: 'See some videos' },
  },
  {
    id: 'pierres', famille: 'edition', titre: 'Pierres vertes', sousTitre: 'Livre',
    kicker: 'Édition', image: marbleOrange, placeholder: true, aVenir: true,
    texte: "Un cadeau à offrir, un titre, un thème : les pierres vertes. Tout le reste était à inventer. NOD a mené les recherches, écrit le texte, composé chaque page, puis préparé le livre pour l'impression. Un objet pensé de la première ligne à la reliure.",
    role: 'Recherche, écriture, mise en page',
    tags: ['Édition', 'Rédaction', 'Mise en page'],
  },
  {
    id: 'stan', famille: 'strategie', titre: 'Stan', sousTitre: 'Marque de spiritueux',
    kicker: 'Stratégie', image: orangePressee, placeholder: true,
    texte: "Un barman qui lance sa propre marque de spiritueux. NOD a construit sa stratégie de lancement.",
    role: 'Stratégie de lancement',
    tags: ['Stratégie', 'Lancement'],
  },
];
