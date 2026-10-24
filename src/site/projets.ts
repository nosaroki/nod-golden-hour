import idala from '@/assets/idala.webp';
import jasminka from '@/assets/jasminka.webp';
import unmatched from '@/assets/unmatched-fiche.webp';
import unmatchedCarte from '@/assets/unmatched-carte.webp';
import drugsImg from '@/assets/drugs.webp';
import mangroveImg from '@/assets/mangrove.webp';
import odaImg from '@/assets/oda.webp';
import odaCarte from '@/assets/oda-carte.webp';
import drugsCarte from '@/assets/drugs-carte.webp';
import contenusImg from '@/assets/contenus.webp';
import contenusVideo from '@/assets/contenus.mp4';
import pierresImg from '@/assets/pierres.webp';
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
  /** Extrait vidéo muet en boucle, affiché à la place de l'image dans la fiche. */
  video?: string;
  /** Visuel vertical pour les cartes de l'accueil, quand l'image est un logo horizontal. */
  carte?: string;
  /** true quand l'image est une texture de marque, pas le projet lui-même. */
  placeholder?: boolean;
  /** true quand un vrai visuel est attendu ; affiche « Visuel à venir ». */
  aVenir?: boolean;
  /** Le besoin du client, en une phrase. */
  besoin: string;
  /** Ce que NOD a fait. */
  texte: string;
  role: string;
  tags: string[];
  /** Lien vers le site ou le contenu publié, ouvert dans un nouvel onglet. */
  lien?: string;
  /** Version anglaise des textes. */
  en: {
    titre?: string;
    sousTitre: string;
    kicker: string;
    besoin: string;
    texte: string;
    role: string;
    tags: string[];
  };
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
    besoin: "Réunir des praticiens du bien-être et leurs clients sur un seul site, en cabinet, à domicile ou en visio.",
    texte: "NOD a conçu puis développé la plateforme entière, 100 % bilingue français et anglais : annuaire des praticiens, réservation et paiement en ligne, séances en visio, espace d'administration.",
    role: 'Conception et développement, du cahier des charges à la mise en ligne',
    tags: ['Développement web', 'Paiement en ligne', 'Bilingue'],
    en: {"sousTitre": "Wellness platform", "kicker": "Web platform", "besoin": "Bringing wellness practitioners and their clients together on one site, in person, at home or by video.", "texte": "NOD designed and built the entire platform, fully bilingual in French and English: practitioner directory, online booking and payment, video sessions, admin area.", "role": "Design and development, from specification to launch", "tags": ["Web development", "Online payment", "Bilingual"]},
    lien: 'https://theidalafamily.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'unmatched', famille: 'strategie', titre: 'Unmatched', sousTitre: 'Maison de beauté au matcha',
    kicker: 'Lancement de marque', image: unmatched, carte: unmatchedCarte,
    besoin: "Lancer une maison de beauté dont l'ingrédient principal est le matcha.",
    texte: "NOD a pris la direction des opérations : stratégie digitale, organisation du lancement, création des maquettes web puis développement du site. Jusqu'aux coulisses : briefs créatifs, nom de domaine, adresses mail.",
    role: 'Direction des opérations et stratégie digitale',
    tags: ['Stratégie', 'Opérations', 'Figma', 'Shopify'],
    en: {"sousTitre": "Matcha beauty house", "kicker": "Brand launch", "besoin": "Launching a beauty house built around matcha as its key ingredient.", "texte": "NOD led operations: digital strategy, launch planning, web mock-ups then site development. Down to the groundwork: creative briefs, domain name, email addresses.", "role": "Operations lead and digital strategy", "tags": ["Strategy", "Operations", "Figma", "Shopify"]},
    lien: 'https://unmatchedbeautyglobal.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'jasminka', famille: 'identite', titre: 'Jasminka', sousTitre: 'Identité & Instagram',
    kicker: 'Identité et réseaux', image: jasminka,
    besoin: "Une médium et praticienne en soin énergétique voulait une présence à son image.",
    texte: "NOD a créé son identité visuelle complète, puis lancé son compte Instagram dans la même voix : premiers posts, stories à la une, ligne éditoriale.",
    role: 'Identité visuelle et direction éditoriale',
    tags: ['Identité', 'Instagram'],
    en: {"sousTitre": "Identity & Instagram", "kicker": "Identity and social media", "besoin": "A medium and energy healer wanted a presence that truly reflected her.", "texte": "NOD created her complete visual identity, then launched her Instagram account in the same voice: first posts, story highlights, editorial line.", "role": "Visual identity and editorial direction", "tags": ["Identity", "Instagram"]},
  },
  {
    id: 'drugs', famille: 'identite', titre: 'Drugs and Sports', sousTitre: 'Identité de podcast',
    kicker: 'Identité et contenu', image: drugsImg, carte: drugsCarte,
    besoin: "Un podcast changeait de nom et avait besoin d'une image à la hauteur.",
    texte: "NOD a construit tout son univers : logo, brandbook, miniatures d'épisodes, bannière YouTube, pistes de contenus pour TikTok, Instagram et YouTube, plaquette pour les sponsors, guide de communication.",
    role: 'Direction artistique et stratégie de contenu',
    tags: ['Identité', 'Brandbook', 'Contenu', 'Partenariats'],
    en: {"sousTitre": "Podcast identity", "kicker": "Identity and content", "besoin": "A podcast was changing its name and needed an image to match.", "texte": "NOD built its whole world: logo, brand book, episode thumbnails, YouTube banner, content ideas for TikTok, Instagram and YouTube, sponsorship deck, communication guide.", "role": "Art direction and content strategy", "tags": ["Identity", "Brand book", "Content", "Partnerships"]},
    lien: 'https://www.instagram.com/thedrugsandsportspodcast/', lienLabel: { fr: 'Voir le compte', en: 'See the account' },
  },
  {
    id: 'mangrove', famille: 'sites', titre: 'Mangrove', sousTitre: 'Site de photographe de surf',
    kicker: 'Site', image: mangroveImg,
    besoin: "Un photographe de surf installé au Costa Rica voulait un seul lieu pour montrer son travail et le vendre.",
    texte: "NOD a construit son site : galeries par séance, boutique de tirages, paiement en ligne. Ses clients retrouvent leurs photos puis les achètent au même endroit.",
    role: 'Conception et mise en ligne',
    tags: ['Site', 'E-commerce', 'Pixieset'],
    en: {"sousTitre": "Surf photographer website", "kicker": "Website", "besoin": "A surf photographer based in Costa Rica wanted one place to show his work and sell it.", "texte": "NOD built his site: galleries by session, print shop, online payment. His clients find their photos and buy them in the same place.", "role": "Design and launch", "tags": ["Website", "E-commerce", "Pixieset"]},
    lien: 'https://mangrovesurfphotography.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'oda', famille: 'sites', titre: 'ODA', sousTitre: 'Tarot & astrologie',
    kicker: 'Projet maison', image: odaImg, carte: odaCarte,
    besoin: "Donner corps à une idée maison : une plateforme de tarot et d'astrologie.",
    texte: "NOD l'a imaginée, dessinée puis développée de bout en bout : tirages, thème astral, astrocartographie, plusieurs langues. Une idée devenue un produit complet, de l'identité au code.",
    role: 'Concept, identité, développement',
    tags: ['Produit', 'Identité', 'Développement'],
    en: {"sousTitre": "Tarot & astrology", "kicker": "In-house project", "besoin": "Giving shape to an in-house idea: a tarot and astrology platform.", "texte": "NOD imagined, designed and developed it end to end: readings, birth chart, astrocartography, several languages. An idea turned into a complete product, from identity to code.", "role": "Concept, identity, development", "tags": ["Product", "Identity", "Development"]},
    lien: 'https://oracledesarcanes.com', lienLabel: VOIR_SITE,
  },
  {
    id: 'contenus', famille: 'contenu', titre: 'Contenus pour les réseaux', sousTitre: 'Vidéo, carrousels, audit',
    kicker: 'Contenus', image: contenusImg, video: contenusVideo,
    besoin: "Des indépendants qui voulaient exister sur les réseaux avec des contenus à leur image.",
    texte: "Du simple carrousel Instagram à la captation complète suivie du montage, NOD accompagne des indépendants dans des univers très différents : food, bien-être, tourisme. Tournage, montage, voix off, audit de compte, carrousels, jusqu'en portugais.",
    role: 'Réalisation, montage, stratégie de contenu',
    tags: ['Vidéo', 'Montage', 'Carrousels', 'Stories', 'Audit'],
    en: {"titre": "Social media content", "sousTitre": "Video, carousels, audit", "kicker": "Content", "besoin": "Independent professionals who wanted to show up on social media with content that looks like them.", "texte": "From a simple Instagram carousel to a full shoot followed by editing, NOD supports independent professionals across very different fields: food, wellness, travel. Filming, editing, voice-over, account audits, carousels, even in Portuguese.", "role": "Filming, editing, content strategy", "tags": ["Video", "Editing", "Carousels", "Stories", "Audit"]},
  },
  {
    id: 'pierres', famille: 'edition', titre: 'Pierres vertes', sousTitre: 'Livre',
    kicker: 'Édition', image: pierresImg,
    besoin: "Offrir un livre unique, avec un titre et un thème : les pierres vertes. Tout le reste était à inventer.",
    texte: "NOD a mené les recherches, écrit le texte, composé chaque page, puis préparé le livre pour l'impression. Un objet pensé de la première ligne à la reliure.",
    role: 'Recherche, écriture, mise en page',
    tags: ['Édition', 'Rédaction', 'Mise en page'],
    en: {"sousTitre": "Book", "kicker": "Publishing", "besoin": "Offering a one-of-a-kind book, with a title and a theme: green stones. Everything else had to be invented.", "texte": "NOD did the research, wrote the text, laid out every page, then prepared the book for print. An object considered from the first line to the binding.", "role": "Research, writing, layout", "tags": ["Publishing", "Writing", "Layout"]},
  },
  {
    id: 'stan', famille: 'strategie', titre: 'Stan', sousTitre: 'Marque de spiritueux',
    kicker: 'Stratégie', image: orangePressee, placeholder: true,
    besoin: "Un barman lance sa propre marque de spiritueux.",
    texte: "NOD a construit sa stratégie de lancement.",
    role: 'Stratégie de lancement',
    tags: ['Stratégie', 'Lancement'],
    en: {"sousTitre": "Spirits brand", "kicker": "Strategy", "besoin": "A bartender is launching his own spirits brand.", "texte": "NOD built his launch strategy.", "role": "Launch strategy", "tags": ["Strategy", "Launch"]},
  },
];

/* Le projet dans la langue du site. */
export function enLangue(projet: Projet, langue: string): Projet {
  if (langue !== 'en') return projet;
  return { ...projet, ...projet.en, titre: projet.en.titre ?? projet.titre };
}
