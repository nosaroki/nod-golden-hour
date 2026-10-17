import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@/components/Navbar';
import NodFooter from '@/components/NodFooter';
import idalaImg from '@/assets/idala.webp';
import jasminkaImg from '@/assets/jasminka.webp';
import unmatchedImg from '@/assets/unmatched.webp';
import charlyGaulImg from '@/assets/charly-gaul.webp';

type Project = {
  id: string;
  title: string;
  sub: string;
  kicker: string;
  bg: string;
  img?: string;
  ghost?: string;
  text: string;
  role: string;
  tags: string[];
};

const CATS: { id: string; label: string; items: Project[] }[] = [
  {
    id: 'sites', label: 'Sites & marques', items: [
      { id: 'idala', title: 'Idala', sub: 'Plateforme bien-être', kicker: 'Site et marque',
        bg: 'linear-gradient(150deg,#FFB25A,#FF8A45)', img: `#FFFCF8 url(${idalaImg}) center/62% no-repeat`,
        text: "Plateforme qui met en relation praticiens du bien-être et clients. De la stratégie de marque à l'identité, jusqu'au site développé et mis en ligne.",
        role: 'Direction créative complète, du brief au lancement', tags: ['Stratégie', 'Identité', 'Développement', 'Contenu'] },
      { id: 'jasminka', title: 'Jasminka', sub: 'Médium · identité & réseaux', kicker: 'Identité et réseaux',
        bg: 'linear-gradient(150deg,#13284a,#2a4f7a)', img: `url(${jasminkaImg}) center/cover no-repeat`,
        text: "Médium et praticienne en soin énergétique. Construction d'une identité de marque et de sa présence Instagram, d'une même voix.",
        role: 'Identité et direction éditoriale des réseaux', tags: ['Identité', 'Contenu'] },
      { id: 'unmatched', title: 'Unmatched', sub: 'Marque cosmétique', kicker: 'Lancement de marque',
        bg: 'linear-gradient(150deg,#FF914D,#FFD35F)', img: `#13284a url(${unmatchedImg}) center/62% no-repeat`,
        text: 'Marque cosmétique lancée de zéro. Opérations, stratégie digitale et coordination du lancement, du nom au premier jour public.',
        role: 'Chief Operations & Digital Strategist Officer', tags: ['Stratégie', 'Opérations', 'Digital'] },
      { id: 'charly', title: 'La Charly Gaul', sub: 'Site événementiel', kicker: 'Site événementiel',
        bg: 'linear-gradient(150deg,#F55F31,#FF914D)', img: `url(${charlyGaulImg}) center 22%/cover no-repeat`,
        text: 'Randonnée cycliste et pédestre mise en récit. Site événementiel, de la structure à la mise en ligne.',
        role: 'Direction artistique et développement', tags: ['Direction artistique', 'Développement', 'Contenu'] },
      { id: 'mangrove', title: 'Mangrove', sub: 'Site photo de surf', kicker: 'Site · En cours',
        bg: 'linear-gradient(150deg,#FF914D,#FFD35F)', ghost: 'Mangrove',
        text: 'Site de photographie de surf, en cours de création. Structure, identité visuelle et mise en ligne.',
        role: 'Conception et développement du site', tags: ['Développement', 'Direction artistique'] },
    ],
  },
  {
    id: 'contenu', label: 'Contenu & vidéo', items: [
      { id: 'eva', title: 'Eva Defives', sub: 'Captation & montage', kicker: 'Captation · Montage · Contenu',
        bg: 'linear-gradient(150deg,#F55F31,#FF914D)', ghost: 'Eva Defives',
        text: 'Drainage lymphatique mis en images. Captation, montage vidéo et création de contenu, voix off comprise.',
        role: 'Réalisation et contenu vidéo', tags: ['Vidéo', 'Contenu'] },
      { id: 'saloua', title: 'Saloua', sub: 'Réels & posts', kicker: 'Réels et posts Instagram',
        bg: 'linear-gradient(150deg,#13284a,#2a4f7a)', ghost: 'Saloua',
        text: 'Création de réels et de posts Instagram, pensés pour une voix qui tient dans la durée.',
        role: 'Direction éditoriale des réseaux', tags: ['Contenu'] },
    ],
  },
  {
    id: 'editorial', label: 'Éditorial', items: [
      { id: 'charly-affiche', title: 'La Charly Gaul', sub: 'Affiche événementielle', kicker: 'Édition · Affiche',
        bg: 'linear-gradient(150deg,#F55F31,#FF914D)', ghost: 'Affiche',
        text: "L'affiche de la randonnée mise en récit : direction artistique, composition et déclinaisons pour l'événement.",
        role: 'Direction artistique · affiche', tags: ['Affiche', 'Direction artistique', 'Édition'] },
      { id: 'charly-presse', title: 'Dossier de presse', sub: 'La Charly Gaul', kicker: 'Édition · Presse',
        bg: 'linear-gradient(150deg,#FF914D,#FFD35F)', ghost: 'Presse',
        text: "Dossier de presse complet de l'événement : mise en page, hiérarchie éditoriale et cohérence avec l'affiche.",
        role: 'Conception et mise en page éditoriale', tags: ['Édition', 'Mise en page', 'Contenu'] },
      { id: 'pierres', title: 'Pierres vertes', sub: 'Livre', kicker: 'Édition · Livre',
        bg: 'linear-gradient(150deg,#2f5e3a,#6a9c5a)', ghost: 'Livre',
        text: "Conception d'un livre sur les pierres vertes : direction éditoriale, mise en page et fabrication de l'objet imprimé.",
        role: 'Direction éditoriale et mise en page', tags: ['Édition', 'Livre', 'Direction artistique'] },
    ],
  },
  {
    id: 'encours', label: 'En cours', items: [
      { id: 'oda', title: 'ODA', sub: 'Tarot & astrologie', kicker: 'Site · Astrologie',
        bg: 'linear-gradient(150deg,#0c1c33,#2b4d74)', ghost: 'ODA',
        text: 'Plateforme de tarot et astrologie : tirages, compatibilité des signes, thème natal et astrocartographie. Projet maison, de A à Z.',
        role: 'Projet NOD, de A à Z', tags: ['Stratégie', 'Identité', 'Développement', 'Contenu'] },
    ],
  },
];

export default function Work() {
  const [cat, setCat] = useState('sites');
  const [selected, setSelected] = useState<string | null>(null);

  const active = CATS.find((c) => c.id === cat)!;
  const items = active.items;
  const n = items.length;
  const spread = n >= 5 ? 176 : 158;
  const detail = items.find((p) => p.id === selected) || null;

  const pick = (id: string) => { setCat(id); setSelected(null); };

  return (
    <div className="page">
      <Nav />

      <section className="wf">
        <div className="wf__head">
          <h1 className="wf__title">Des projets menés du brief au lancement.</h1>
          <p className="wf__sub">Choisis un univers, clique une carte pour la dérouler.</p>
        </div>

        <div className="wf__tabs">
          {CATS.map((c) => (
            <button key={c.id} className={'wf__tab' + (c.id === cat ? ' is-on' : '')} onClick={() => pick(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="wf__fan">
          {items.map((p, i) => {
            const off = i - (n - 1) / 2;
            const style = {
              '--tx': `${off * spread}px`,
              '--ty': `${Math.abs(off) * 12}px`,
              '--rot': `${off * 4.5}deg`,
              zIndex: 40 - Math.round(Math.abs(off)),
              background: p.bg,
            } as CSSProperties;
            return (
              <div
                key={p.id}
                className={'wf__card' + (p.id === selected ? ' is-sel' : '')}
                style={style}
                onClick={() => setSelected(p.id)}
              >
                {p.img
                  ? <div className="wf__card-img" style={{ background: p.img }} />
                  : <div className="wf__card-ghost">{p.ghost}</div>}
                <div className="wf__card-grad" />
                <div className="wf__card-meta">
                  <div className="wf__card-title">{p.title}</div>
                  <div className="wf__card-sub">{p.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {detail ? (
          <div className="wf__detail">
            <div>
              <span className="wf__detail-kicker">{detail.kicker}</span>
              <h2 className="wf__detail-title">{detail.title}</h2>
              <p className="wf__detail-text">{detail.text}</p>
              <p className="wf__detail-role"><span>Rôle NOD</span>{detail.role}</p>
              <ul className="wf__detail-tags">
                {detail.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="wf__detail-media" style={{ background: detail.img || detail.bg } as CSSProperties} />
          </div>
        ) : (
          <p className="wf__hint">Clique une carte pour découvrir le projet.</p>
        )}

        <div className="wf__cta">
          <span className="wf__cta-line" />
          <Link to="/contact" className="link-plain">Présente ton projet <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <NodFooter />
    </div>
  );
}
