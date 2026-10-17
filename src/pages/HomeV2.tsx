import { Link } from 'react-router-dom';
import Nav from '../components/Navbar';
import NodFooter from '../components/NodFooter';
import ProjectFan from '../components/ProjectFan';
import Reveal from '../components/Reveal';
import silhouette from '@/assets/brand/golden-hour-silhouette.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';
import nnenaImg from '@/assets/nnena.webp';

/* Accueil, version 2.
   Le vocabulaire visuel vient du design system : photographie plein cadre,
   voile chaud, index numéroté, bande dégradée, aplat navy. Le wording et les
   projets sont ceux du site actuel. La typographie reste Spectral en display,
   Bricolage Grotesque en navigation et en labels. */

const INTENTIONS = [
  {
    n: '01',
    titre: 'Lancer',
    texte: "Tu as une idée. Tu veux la voir exister sans savoir par où commencer. NOD la prend du début à la fin.",
  },
  {
    n: '02',
    titre: 'Repositionner',
    texte: "Ta marque existe déjà mais elle ne dit plus ce que tu es devenu. NOD revoit sa stratégie, son image, sa position, pour qu'elle te ressemble à nouveau.",
  },
  {
    n: '03',
    titre: 'Incarner',
    texte: "Tu veux exister publiquement et que ton image te ressemble. NOD lui donne une forme, que ton nom soit déjà une marque ou qu'il commence tout juste à compter.",
  },
];

const HEURE = [
  { cle: 'La lumière', valeur: 'Ce moment où tout devient plus juste.' },
  { cle: 'Le moment', valeur: 'Celui que NOD cherche pour ton projet.' },
  { cle: 'Le résultat', valeur: "Celui où il existe enfin." },
];

export default function HomeV2() {
  return (
    <div className="page page--v2">
      <Nav />

      {/* ---------- Hero : photographie plein cadre, typographie crème ---------- */}
      <section className="v2-hero">
        <div className="v2-hero__image" style={{ backgroundImage: `url(${silhouette})` }} aria-hidden="true" />
        <div className="v2-hero__veil" aria-hidden="true" />
        <div className="v2-hero__scrim" aria-hidden="true" />
        <div className="v2-hero__body">
          <Reveal as="p" className="v2-eyebrow v2-eyebrow--light" delay={0}>
            Une maison créative. Une seule main.
          </Reveal>
          <Reveal as="h1" className="v2-hero__title" delay={140}>
            NOD fait <span className="grad-word">exister</span> les projets
            <br />et ceux qui les portent.
          </Reveal>
          <Reveal as="p" className="v2-hero__lead" delay={280}>
            De l'idée qui ne vivait que dans ta tête jusqu'au jour où ton projet existe pour de vrai.
          </Reveal>
          <Reveal className="v2-hero__actions" delay={380}>
            <Link to="/travail" className="v2-btn v2-btn--cream">Voir le travail <span aria-hidden="true">→</span></Link>
            <Link to="/contact" className="v2-btn v2-btn--ghost">Présente ton projet</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Le principe : orange pressée en fond, texte crème ---------- */}
      <section className="v2-principe">
        <div className="v2-principe__image" style={{ backgroundImage: `url(${orangePressee})` }} aria-hidden="true" />
        <div className="v2-principe__veil" aria-hidden="true" />
        <div className="v2-principe__body">
          <p className="v2-eyebrow v2-eyebrow--light">Le principe</p>
          <Reveal as="p" className="v2-principe__lead" delay={0}>
            Un projet ne meurt pas d'un manque d'idée. Il meurt du doute, ou du manque
            d'accompagnement. NOD <span className="i">s'occupe des deux.</span>
          </Reveal>
          <Reveal as="p" className="v2-principe__text" delay={160}>
            Stratégie, identité, contenu, développement : même main du début à la fin.
            Rien ne se perd en route, parce que personne ne se passe le relais.
          </Reveal>
          <Reveal delay={240}>
            <Link to="/principe" className="v2-link-light">Lire le principe <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Ce que fait NOD : index numéroté ---------- */}
      <section className="v2-index">
        <div className="v2-index__head">
          <p className="v2-eyebrow">Ce que fait NOD</p>
          <Link to="/contact" className="v2-link">Parler de ton projet <span aria-hidden="true">→</span></Link>
        </div>
        <Reveal as="p" className="v2-index__intro" delay={0}>
          NOD prend ton idée là où elle n'est encore qu'une pensée, la mène jusqu'au
          lancement, sans jamais changer de main.
        </Reveal>
        <div className="v2-index__list">
          {INTENTIONS.map((item) => (
            <article className="v2-index__item" key={item.n}>
              <div className="v2-index__row">
                <span className="v2-index__n">{item.n}</span>
                <h2 className="v2-index__title">{item.titre}</h2>
                <p className="v2-index__text">{item.texte}</p>
              </div>
              <span className="v2-index__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="v2-index__note">
          Ton cas n'entre pas exactement dans une case ? NOD part de là où tu en es.
        </p>
      </section>

      {/* ---------- Le travail : l'éventail, resserré ---------- */}
      <section className="v2-work">
        <div className="v2-work__head">
          <p className="v2-eyebrow">Le travail</p>
          <h2 className="v2-work__title">Des projets menés du brief au lancement.</h2>
        </div>
        <ProjectFan />
        <div className="v2-work__foot">
          <Link to="/travail" className="v2-link">Voir tout le travail <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* ---------- Qui : portrait à fond perdu à gauche ---------- */}
      <section className="v2-qui">
        <div className="v2-qui__image" style={{ backgroundImage: `url(${nnenaImg})` }} aria-hidden="true" />
        <div className="v2-qui__body">
          <p className="v2-eyebrow">Qui</p>
          <Reveal as="h2" className="v2-qui__title" delay={0}>
            Nnéna a fondé NOD en 2025.
          </Reveal>
          <Reveal as="p" className="v2-qui__text" delay={140}>
            Elle vient de l'événementiel et de la communication, code en autodidacte
            depuis 2022. NOD est né à la croisée des trois.
          </Reveal>
          <Reveal delay={200}>
            <Link to="/principe#qui" className="v2-link">Lire le principe <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- L'heure dorée : le seul moment plein dégradé ---------- */}
      <div className="v2-golden">
        <section className="v2-golden__inner">
          <div className="v2-golden__head">
            <span className="v2-eyebrow v2-eyebrow--ink">L'heure dorée</span>
            <span className="v2-eyebrow v2-eyebrow--ink">2026</span>
          </div>
          <h2 className="v2-golden__title">
            La lumière rend tout<br />plus juste, plus beau,<br />plus vivant.
          </h2>
          <dl className="v2-golden__rows">
            {HEURE.map((ligne) => (
              <div className="v2-golden__row" key={ligne.cle}>
                <dt>{ligne.cle}</dt>
                <dd>{ligne.valeur}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="v2-cta">
          <h2 className="v2-cta__title">Présente ton projet.</h2>
          <p className="v2-cta__text">
            Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.
          </p>
          <Link to="/contact" className="v2-btn v2-btn--navy">Entrer en contact <span aria-hidden="true">→</span></Link>
        </section>
      </div>

      <NodFooter />
    </div>
  );
}
