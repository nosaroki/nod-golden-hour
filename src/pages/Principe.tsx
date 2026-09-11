import Nav from '@/components/Navbar';
import NodFooter from '@/components/NodFooter';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import nnenaImg from '@/assets/nnena.png';

export default function Principe() {
  return (
    <div className="page page--navy is-dark">
      <Nav />

      {/* ---------- Le principe : manifeste ---------- */}
      <section className="principe">
        <Reveal as="h1" className="principe__title" delay={120}>Le principe</Reveal>

        <div className="manifesto">
          <Reveal as="p" className="manifesto__intro" delay={0}>
            Un projet ne meurt presque jamais par manque d’idée. Il meurt avant même
            d’exister, pour deux raisons.
          </Reveal>

          <Reveal className="manifesto__block" delay={0}>
            <h2 className="manifesto__h">Le doute.</h2>
            <p className="manifesto__p">Trop d’incertitudes, trop de questions sans réponse. L’idée reste dans ta tête au lieu de prendre forme.</p>
          </Reveal>
          <Reveal className="manifesto__block manifesto__block--gap" delay={0}>
            <h2 className="manifesto__h">Le manque d’accompagnement.</h2>
            <p className="manifesto__p">Tu sais ce que tu veux créer. Tu ne sais pas par où commencer, ni qui pour te tenir du début à la fin.</p>
          </Reveal>

          <Reveal as="p" className="manifesto__pull" delay={0}>
            <span className="grad-text">NOD répond aux deux.</span>
          </Reveal>

          <Reveal as="p" className="manifesto__body" delay={0}>
            Une seule personne prend ton idée là où elle n’est encore qu’une pensée, la mène
            jusqu’au jour où elle existe pour de vrai. Stratégie, identité, contenu,
            développement : même main du début à la fin. Rien ne se perd en route, parce que
            personne ne se passe le relais.
          </Reveal>
          <Reveal as="p" className="manifesto__body" delay={0}>
            Ce n’est pas une agence. C’est une maison. Un interlocuteur. Un cercle choisi
            derrière lui. Ton projet avance sans que tu aies à coordonner cinq prestataires.
          </Reveal>
          <Reveal as="p" className="manifesto__body manifesto__body--last" delay={0}>
            On appelle <span className="i">golden hour</span> ce moment où la lumière rend tout
            plus juste, plus beau, plus vivant. C’est l’instant que NOD cherche pour ton projet.
            Celui où il existe enfin.
          </Reveal>
        </div>
      </section>

      {/* ---------- Le principe : qui ---------- */}
      <section id="qui" className="who2">
        <SectionHeader label="Qui" />
        <div className="who__grid">
          <div>
            <Reveal as="p" className="who2__lead" delay={0}>Nnéna a fondé NOD en 2025.</Reveal>
            <Reveal as="p" className="who2__text" delay={140}>
              Elle vient de l’événementiel et de la communication, code en autodidacte depuis
              2022. NOD est né à la croisée des trois : le sens de l’orchestration, le goût de
              l’image, la main qui construit.
            </Reveal>
          </div>
          <Reveal className="who2__portrait" delay={80}>
            <img src={nnenaImg} alt="Nnéna, fondatrice de NOD" />
          </Reveal>
        </div>

        <Reveal className="principe__cta" delay={0}>
          <span className="principe__cta-line" />
          <Link to="/contact" className="link-plain">Entrer en contact <span aria-hidden="true">→</span></Link>
        </Reveal>
      </section>

      <NodFooter dark />
    </div>
  );
}
