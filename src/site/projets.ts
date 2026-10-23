import idala from '@/assets/idala.webp';
import jasminka from '@/assets/jasminka.webp';
import unmatched from '@/assets/unmatched.webp';
import charlyGaul from '@/assets/charly-gaul.webp';
import lightFold from '@/assets/brand/light-fold-warm.webp';
import inkOrange from '@/assets/brand/texture-ink-orange.webp';
import marbleOrange from '@/assets/brand/texture-marble-orange.webp';
import gradientFold from '@/assets/brand/gradient-fold-yellow.webp';
import silhouette from '@/assets/brand/golden-hour-silhouette.webp';

/* Les projets NOD. Le texte vient du site actuel, mot pour mot.
   `image` : le visuel de la vignette. Les projets sans visuel propre reçoivent
   une texture de marque en attendant leurs images réelles. */

export interface Projet {
  id: string;
  famille: 'sites' | 'contenu' | 'editorial' | 'encours';
  titre: string;
  sousTitre: string;
  kicker: string;
  image: string;
  /** true quand l'image est une texture de marque, pas le projet lui-même. */
  placeholder?: boolean;
  texte: string;
  role: string;
  tags: string[];
}

export const familles: { id: Projet['famille'] | 'tout'; fr: string; en: string }[] = [
  { id: 'tout', fr: 'Tout', en: 'All' },
  { id: 'sites', fr: 'Sites & marques', en: 'Sites & brands' },
  { id: 'contenu', fr: 'Contenu & vidéo', en: 'Content & video' },
  { id: 'editorial', fr: 'Éditorial', en: 'Editorial' },
  { id: 'encours', fr: 'En cours', en: 'In progress' },
];

export const projets: Projet[] = [
  {
    id: 'idala', famille: 'sites', titre: 'Idala', sousTitre: 'Plateforme bien-être',
    kicker: 'Site et marque', image: idala,
    texte: "Plateforme qui met en relation praticiens du bien-être et clients. De la stratégie de marque à l'identité, jusqu'au site développé et mis en ligne.",
    role: 'Direction créative complète, du brief au lancement',
    tags: ['Stratégie', 'Identité', 'Développement', 'Contenu'],
  },
  {
    id: 'jasminka', famille: 'sites', titre: 'Jasminka', sousTitre: 'Médium · identité & réseaux',
    kicker: 'Identité et réseaux', image: jasminka,
    texte: "Médium et praticienne en soin énergétique. Construction d'une identité de marque et de sa présence Instagram, d'une même voix.",
    role: 'Identité et direction éditoriale des réseaux',
    tags: ['Identité', 'Contenu'],
  },
  {
    id: 'unmatched', famille: 'sites', titre: 'Unmatched', sousTitre: 'Marque cosmétique',
    kicker: 'Lancement de marque', image: unmatched,
    texte: 'Marque cosmétique lancée de zéro. Opérations, stratégie digitale et coordination du lancement, du nom au premier jour public.',
    role: 'Chief Operations & Digital Strategist Officer',
    tags: ['Stratégie', 'Opérations', 'Digital'],
  },
  {
    id: 'mangrove', famille: 'encours', titre: 'Mangrove', sousTitre: 'Site photo de surf',
    kicker: 'Site · En cours', image: gradientFold, placeholder: true,
    texte: 'Site de photographie de surf, en cours de création. Structure, identité visuelle et mise en ligne.',
    role: 'Conception et développement du site',
    tags: ['Développement', 'Direction artistique'],
  },
  {
    id: 'eva', famille: 'contenu', titre: 'Eva Defives', sousTitre: 'Captation & montage',
    kicker: 'Captation · Montage · Contenu', image: lightFold, placeholder: true,
    texte: 'Drainage lymphatique mis en images. Captation, montage vidéo et création de contenu, voix off comprise.',
    role: 'Réalisation et contenu vidéo',
    tags: ['Vidéo', 'Contenu'],
  },
  {
    id: 'saloua', famille: 'contenu', titre: 'Saloua', sousTitre: 'Réels & posts',
    kicker: 'Réels et posts Instagram', image: silhouette, placeholder: true,
    texte: 'Création de réels et de posts Instagram, pensés pour une voix qui tient dans la durée.',
    role: 'Direction éditoriale des réseaux',
    tags: ['Contenu'],
  },
  {
    id: 'charly', famille: 'editorial', titre: 'La Charly Gaul', sousTitre: 'Affiche & dossier de presse',
    kicker: 'Édition · Événementiel', image: charlyGaul,
    texte: "Randonnée cycliste et pédestre. L'affiche de l'événement et son dossier de presse, pensés ensemble : direction artistique, composition, mise en page éditoriale.",
    role: 'Direction artistique et mise en page',
    tags: ['Affiche', 'Dossier de presse', 'Direction artistique'],
  },
  {
    id: 'pierres', famille: 'editorial', titre: 'Pierres vertes', sousTitre: 'Livre',
    kicker: 'Édition · Livre', image: marbleOrange, placeholder: true,
    texte: "Conception d'un livre sur les pierres vertes : direction éditoriale, mise en page et fabrication de l'objet imprimé.",
    role: 'Direction éditoriale et mise en page',
    tags: ['Édition', 'Livre', 'Direction artistique'],
  },
  {
    id: 'oda', famille: 'encours', titre: 'ODA', sousTitre: 'Tarot & astrologie',
    kicker: 'Site · Astrologie', image: inkOrange, placeholder: true,
    texte: 'Plateforme de tarot et astrologie : tirages, compatibilité des signes, thème natal et astrocartographie. Projet maison, de A à Z.',
    role: 'Projet NOD, de A à Z',
    tags: ['Stratégie', 'Identité', 'Développement', 'Contenu'],
  },
];
