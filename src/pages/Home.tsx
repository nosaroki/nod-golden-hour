import Nav from '../components/Navbar';
import NodFooter from '../components/NodFooter';
import SectionHeader from '../components/SectionHeader';
import ProjectFan from '../components/ProjectFan';
import Reveal from '../components/Reveal';
import { Link } from 'react-router-dom';
import heroImg from '@/assets/hero.png';
import nnenaImg from '@/assets/nnena.png';

export default function Home() {
  return (
    <div className="page">
      <Nav />

      {/* ---------- Accueil · Hero ---------- */}
      <section id="top" className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid">
          <div className="hero__col">
            <Reveal as="p" className="hero__tagline" delay={0}>
              Une maison créative. Une seule main.
            </Reveal>
            <Reveal as="h1" className="hero__title" delay={140}>
              NOD fait <span className="grad-word">exister</span> les projets et ceux qui les portent.
            </Reveal>
            <Reveal as="p" className="hero__lead" delay={300}>
              De l’idée qui ne vivait que dans ta tête jusqu’au jour où ton projet existe pour de vrai.
            </Reveal>
          </div>
          <Reveal
            className="hero__media"
            delay={220}
            style={{ backgroundImage: `url(${heroImg})` }}
          />
        </div>
        <div className="hero__horizon">
          <span className="hero__horizon-line" />
          <span className="hero__horizon-label serif i">l’heure dorée</span>
        </div>
      </section>

      {/* ---------- Accueil · Le principe (teaser) ---------- */}
      <section className="section">
        <SectionHeader label="Le principe" />
        <Reveal as="p" className="principe-teaser__lead" delay={0}>
          Un projet ne meurt pas d’un manque d’idée. Il meurt du doute, ou du manque
          d’accompagnement. NOD <span className="i">s’occupe des deux.</span>
        </Reveal>
        <Reveal delay={180}>
          <Link to="/principe" className="link-arrow">Lire le principe <span aria-hidden="true">→</span></Link>
        </Reveal>
      </section>

      {/* ---------- Accueil · Ce que fait NOD ---------- */}
      <section className="section">
        <SectionHeader label="Ce que fait NOD" />
        <Reveal as="p" className="whatwedo__intro" delay={0}>
          NOD prend ton idée là où elle n’est encore qu’une pensée, la mène jusqu’au
          lancement, sans jamais changer de main.
        </Reveal>

        <div className="intentions">
          <Reveal className="intention intention--start" delay={0}>
            <h3 className="intention__title grad-text">Lancer.</h3>
            <p className="intention__text">Tu as une idée. Tu veux la voir exister sans savoir par où commencer. NOD la prend du début à la fin.</p>
          </Reveal>
          <Reveal className="intention intention--center" delay={120}>
            <h3 className="intention__title grad-text">Repositionner.</h3>
            <p className="intention__text">Ta marque existe déjà mais elle ne dit plus ce que tu es devenu. NOD revoit sa stratégie, son image, sa position, pour qu’elle te ressemble à nouveau.</p>
          </Reveal>
          <Reveal className="intention intention--end" delay={240}>
            <h3 className="intention__title grad-text">Incarner.</h3>
            <p className="intention__text">Tu veux exister publiquement et que ton image te ressemble. NOD lui donne une forme, que ton nom soit déjà une marque ou qu’il commence tout juste à compter.</p>
          </Reveal>
        </div>

        <Reveal as="p" className="method-note" delay={0}>
          Ton cas n’entre pas exactement dans une case ? NOD part de là où tu en es.
        </Reveal>

        <Reveal className="method" delay={0}>
          <p className="method__text">Trois points de départ, une seule méthode. Stratégie, identité, contenu, développement, tenus ensemble du brief au lancement.</p>
        </Reveal>
      </section>

      {/* ---------- Accueil · Le travail (éventail) ---------- */}
      <section className="section">
        <SectionHeader label="Le travail" />
        <Reveal as="p" className="work__intro" delay={0}>
          Une sélection de projets menés du brief au lancement, dans des univers très différents.
        </Reveal>
        <ProjectFan />
        <Reveal delay={0}>
          <Link to="/travail" className="link-arrow">Voir le travail <span aria-hidden="true">→</span></Link>
        </Reveal>
      </section>

      {/* ---------- Accueil · Qui ---------- */}
      <section className="section">
        <SectionHeader label="Qui" />
        <div className="who__grid">
          <div>
            <Reveal as="p" className="who__lead" delay={0}>
              Nnéna a fondé NOD en 2025. Elle vient de l’événementiel et de la communication,
              code en autodidacte depuis 2022.
            </Reveal>
            <Reveal as="p" className="who__text" delay={140}>NOD est né à la croisée des trois.</Reveal>
            <Reveal delay={200}>
              <Link to="/principe#qui" className="link-arrow">Lire Le principe <span aria-hidden="true">→</span></Link>
            </Reveal>
          </div>
          <Reveal
            className="who__portrait"
            delay={80}
            style={{ backgroundImage: `url(${nnenaImg})` }}
          />
        </div>
      </section>

      {/* ---------- Accueil · Entrer en contact (teaser) ---------- */}
      <section className="section section--divided">
        <SectionHeader label="Entrer en contact" />
        <Reveal as="p" className="contact-teaser__lead" delay={0}>Présente ton projet.</Reveal>
        <Reveal as="p" className="contact-teaser__text" delay={120}>
          Pas besoin d’un projet déjà ficelé. Une idée suffit pour lancer la conversation.
        </Reveal>
        <Reveal delay={180}>
          <Link to="/contact" className="link-arrow serif contact-teaser__cta">
            Entrer en contact <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <NodFooter />
    </div>
  );
}
