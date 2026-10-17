import idalaImg from "@/assets/idala.webp";
import jasminkaImg from "@/assets/jasminka.webp";
import unmatchedImg from "@/assets/unmatched.webp";
import charlyGaulImg from "@/assets/charly-gaul.webp";

// Données de l'éventail de cartes projets (accueil).
// Position, rotation, z-index, dégradé, image restent en data (propres à chaque
// carte). Toute la mise en forme structurelle vit dans index.css (.fan, .card).
// L'image n'apparaît qu'au survol (card__img passe en opacité 1).

export type FanCard = {
  id: string;
  tx: string;
  ty: string;
  rot: string;
  z: number;
  bg: string;
  img?: string;
  label: string;
  labelColor: string;
  ov: string;
  ovH: string;
  title: string;
  sub: string;
  ghost?: string;
  ghostColor?: string;
  ghostSize?: string;
};

export const fanCards: FanCard[] = [
  {
    id: 'idala', tx: '-273px', ty: '24px', rot: '-10.5deg', z: 10,
    bg: 'linear-gradient(150deg,#F55F31,#FF914D)',
    img: `url(${idalaImg}) center 42%/64% no-repeat,linear-gradient(150deg,#FFB25A,#FF8A45)`,
    label: 'Visuel · Plateforme', labelColor: 'rgba(17,37,66,0.62)',
    ov: 'rgba(12,28,51,0.8)', ovH: '56%',
    title: 'Idala', sub: 'Plateforme de praticiens bien-être',
  },
  {
    id: 'jasminka', tx: '-195px', ty: '10px', rot: '-7.5deg', z: 20,
    bg: 'linear-gradient(150deg,#13284a,#2a4f7a)',
    img: `url(${jasminkaImg}) center/cover no-repeat`,
    label: 'Visuel · Réseaux', labelColor: 'rgba(255,240,229,0.82)',
    ov: 'rgba(30,14,54,0.85)', ovH: '60%',
    title: 'Jasminka', sub: 'Médium · identité & réseaux',
  },
  {
    id: 'unmatched', tx: '-117px', ty: '0px', rot: '-4.5deg', z: 30,
    bg: 'linear-gradient(150deg,#FF914D,#FFD35F)',
    img: `url(${unmatchedImg}) center 44%/66% no-repeat,linear-gradient(150deg,#13284a,#294c76)`,
    label: 'Visuel · Cosmétique', labelColor: 'rgba(17,37,66,0.6)',
    ov: 'rgba(12,28,51,0.86)', ovH: '56%',
    title: 'Unmatched', sub: 'Marque cosmétique',
  },
  {
    id: 'charly-gaul', tx: '-39px', ty: '-6px', rot: '-1.5deg', z: 38,
    bg: 'linear-gradient(150deg,#F55F31,#FF914D)',
    img: `url(${charlyGaulImg}) center/cover no-repeat`,
    label: 'Visuel · Événementiel', labelColor: 'rgba(255,240,229,0.82)',
    ov: 'rgba(12,28,51,0.82)', ovH: '56%',
    title: 'La Charly Gaul', sub: 'Affiche & site événementiel',
  },
  {
    id: 'eva', tx: '39px', ty: '-6px', rot: '1.5deg', z: 40,
    bg: 'linear-gradient(150deg,#13284a,#2a4f7a)',
    label: 'Visuel · Vidéo', labelColor: 'rgba(255,240,229,0.72)',
    ghost: 'Eva', ghostColor: 'rgba(255,255,255,0.16)', ghostSize: '44px',
    ov: 'rgba(12,28,51,0.82)', ovH: '62%',
    title: 'Eva Defives', sub: 'Captation, montage & contenu',
  },
  {
    id: 'saloua', tx: '117px', ty: '0px', rot: '4.5deg', z: 30,
    bg: 'linear-gradient(150deg,#FF914D,#FFD35F)',
    label: 'Visuel · Réseaux', labelColor: 'rgba(17,37,66,0.6)',
    ghost: 'Saloua', ghostColor: 'rgba(255,255,255,0.2)', ghostSize: '44px',
    ov: 'rgba(12,28,51,0.86)', ovH: '62%',
    title: 'Saloua', sub: 'Réels & posts Instagram',
  },
  {
    id: 'mangrove', tx: '195px', ty: '10px', rot: '7.5deg', z: 20,
    bg: 'linear-gradient(150deg,#F55F31,#FF914D)',
    label: 'Visuel · Site · En cours', labelColor: 'rgba(255,240,229,0.72)',
    ghost: 'Mangrove', ghostColor: 'rgba(255,255,255,0.18)', ghostSize: '40px',
    ov: 'rgba(12,28,51,0.82)', ovH: '62%',
    title: 'Mangrove', sub: 'Site photo de surf · en cours',
  },
  {
    id: 'oda', tx: '273px', ty: '24px', rot: '10.5deg', z: 10,
    bg: 'linear-gradient(150deg,#13284a,#2a4f7a)',
    label: 'Visuel · Site', labelColor: 'rgba(255,240,229,0.6)',
    ghost: 'ODA', ghostColor: 'rgba(255,255,255,0.14)', ghostSize: '46px',
    ov: 'rgba(12,28,51,0.86)', ovH: '62%',
    title: 'ODA', sub: 'Tarot & astrologie en ligne',
  },
];
