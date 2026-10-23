import { useState } from 'react';
import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjetsCartes from './ProjetsCartes';
import silhouette from '@/assets/brand/golden-hour-silhouette.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';
import atelier from '@/assets/hero.webp';

/* Accueil. La forme vient du design system, le texte vient du site NOD. */

const INTENTIONS = [
  {
    n: '01', fr: 'Lancer', en: 'Launch',
    frTexte: "Tu as une idée. Tu veux la voir exister sans savoir par où commencer. NOD la prend du début à la fin.",
    enTexte: 'You have an idea. You want to see it exist without knowing where to start. NOD carries it from beginning to end.',
  },
  {
    n: '02', fr: 'Repositionner', en: 'Reposition',
    frTexte: "Ta marque existe déjà mais elle ne dit plus ce que tu es devenu. NOD revoit sa stratégie, son image, sa position, pour qu'elle te ressemble à nouveau.",
    enTexte: 'Your brand exists but no longer says what you have become. NOD revisits its strategy, image and position.',
  },
  {
    n: '03', fr: 'Incarner', en: 'Embody',
    frTexte: "Tu veux exister publiquement et que ton image te ressemble. NOD lui donne une forme, que ton nom soit déjà une marque ou qu'il commence tout juste à compter.",
    enTexte: 'You want to exist publicly, with an image that looks like you. NOD gives it a form.',
  },
];

const HEURE = [
  { fr: 'La lumière', en: 'The light', frV: 'Ce moment où tout devient plus juste.', enV: 'The moment when everything becomes truer.' },
  { fr: 'Le moment', en: 'The moment', frV: 'Celui que NOD cherche pour ton projet.', enV: 'The one NOD looks for in your project.' },
  { fr: 'Le résultat', en: 'The result', frV: "Celui où il existe enfin.", enV: 'The one where it finally exists.' },
];

export default function Accueil() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);
  const [ouvert, setOuvert] = useState('01');

  return (
    <>
      <NodNav overImage />

      {/* ---------- Hero : photographie plein cadre ---------- */}
      <section className="page-hero" style={vars({ '--nod-hero-image': url(silhouette) })}>
        <div className="page-hero__image" />
        <div className="page-hero__veil" />
        <div className="page-hero__foot" />
        <div className="page-hero__body">
          <Eyebrow tone="light">{t('Une maison créative. Une seule main.', 'A creative house. One single hand.')}</Eyebrow>
          <h1 className="page-hero__title">
            {t('NOD fait ', 'NOD brings ')}
            <span className="grad-word">{t('exister', 'to life')}</span>
            <br />
            {t('les projets et ceux qui les portent.', 'projects and the people behind them.')}
          </h1>
          <div className="page-hero__actions">
            <Link to="/travail" className="nod-btn nod-btn--inverse nod-btn--lg">
              {t('Voir le travail', 'See the work')} <Icon name="arrow-right" size={20} />
            </Link>
            <Link to="/contact" className="nod-btn nod-btn--on-image nod-btn--lg">
              {t('Présente ton projet', 'Tell me about your project')}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Le principe ---------- */}
      <section className="home-manifesto" style={vars({ '--nod-manifesto-image': url(orangePressee) })}>
        <div className="home-manifesto__image" />
        <div className="home-manifesto__veil" />
        <div className="home-manifesto__body nod-grain">
          <Eyebrow tone="light">{t('La maison', 'The house')}</Eyebrow>
          <p className="home-manifesto__lead">
            {t(
              "Une seule main, du brief au lancement. Rien ne se perd en route, parce que personne ne se passe le relais.",
              'One single hand, from brief to launch. Nothing is lost on the way, because nobody hands over.',
            )}
          </p>
          <p className="home-manifesto__text">
            {t(
              "Ce n'est pas une agence. C'est une maison. Un interlocuteur, un cercle choisi derrière lui. Ton projet avance sans que tu aies à coordonner cinq prestataires.",
              "It is not an agency. It is a house. One contact, a chosen circle behind them. Your project moves without you coordinating five suppliers.",
            )}
          </p>
          <p className="home-manifesto__text">
            <Link to="/la-maison" className="nod-link-light">{t('Entrer dans la maison', 'Enter the house')} &rarr;</Link>
          </p>
        </div>
      </section>

      {/* ---------- Ce que fait NOD ---------- */}
      <section className="home-summary">
        <div className="home-summary__body">
          <div className="home-summary__head">
            <Eyebrow>{t('Ce que fait NOD', 'What NOD does')}</Eyebrow>
            <Link to="/contact">{t('Parler de ton projet', 'Talk about your project')} &rarr;</Link>
          </div>

          <p className="home-summary__intro">
            {t(
              'Trois points de départ, une seule méthode. Stratégie, identité, contenu, développement, tenus ensemble du brief au lancement.',
              'Three starting points, one method. Strategy, identity, content, development, held together from brief to launch.',
            )}
          </p>

          <ul className="home-summary__list">
            {INTENTIONS.map((item) => (
              <li
                key={item.n}
                className={'home-summary__item' + (ouvert === item.n ? ' is-open' : '')}
                onMouseEnter={() => setOuvert(item.n)}
              >
                <span className="home-summary__row">
                  <span className="home-summary__title">{t(item.fr, item.en)}</span>
                  <span className="home-summary__text">{t(item.frTexte, item.enTexte)}</span>
                </span>
                <span className="home-summary__rule" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Le travail ---------- */}
      <section className="home-work">
        <div className="home-work__head">
          <h2 className="home-work__title">{t('Le travail', 'The work')}</h2>
          <span className="home-work__note">
            {t('Des projets menés du brief au lancement.', 'Projects carried from brief to launch.')}
          </span>
        </div>

        <ProjetsCartes />

        <p className="cartes__note">
          <Link to="/travail">{t('Voir tout le travail', 'See all the work')} &rarr;</Link>
        </p>
      </section>

      {/* ---------- Qui ---------- */}
      <section className="home-founder" style={vars({ '--nod-founder-image': url(atelier) })}>
        <div className="home-founder__image" />
        <div className="home-founder__body">
          <Eyebrow>{t('Qui', 'Who')}</Eyebrow>
          <h2 className="home-founder__title">{t('Nnéna a fondé NOD en 2025.', 'Nnéna founded NOD in 2025.')}</h2>
          <p className="home-founder__text">
            {t(
              "Elle vient de l'événementiel et de la communication, code en autodidacte depuis 2022. NOD est né à la croisée des trois : le sens de l'orchestration, le goût de l'image, la main qui construit.",
              'She comes from events and communication, and has been coding self-taught since 2022. NOD was born at the crossroads of the three.',
            )}
          </p>
          <p>
            <Link to="/la-maison#qui" className="nod-btn nod-btn--secondary">
              {t('Lire le principe', 'Read the principle')} <Icon name="arrow-right" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- L'heure dorée, puis l'appel ---------- */}
      <div className="home-golden-block nod-grain">
        <section className="home-golden" style={vars({ '--nod-golden-image': url(orangePressee) })}>
          <div className="home-golden__texture" />
          <div className="home-golden__body">
            <div className="home-golden__head">
              <Eyebrow tone="light">{t("L'heure dorée", 'Golden hour')}</Eyebrow>
              <Eyebrow tone="light">2026</Eyebrow>
            </div>
            <h2 className="home-golden__title">
              {t('La lumière rend tout', 'Light makes everything')}
              <br />{t('plus juste, plus beau,', 'truer, more beautiful,')}
              <br />{t('plus vivant.', 'more alive.')}
            </h2>
            <div className="home-golden__rows">
              {HEURE.map((ligne) => (
                <div className="home-golden__row" key={ligne.fr}>
                  <span className="home-golden__key">{t(ligne.fr, ligne.en)}</span>
                  <span className="home-golden__value">{t(ligne.frV, ligne.enV)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-cta__body">
            <h2 className="home-cta__title">{t('Présente ton projet.', 'Tell me about your project.')}</h2>
            <p className="home-cta__text">
              {t(
                "Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.",
                'No need for a finished project. An idea is enough to start the conversation.',
              )}
            </p>
            <Link to="/contact" className="nod-btn nod-btn--night nod-btn--lg">
              {t('Entrer en contact', 'Get in touch')} <Icon name="arrow-right" size={20} />
            </Link>
          </div>
        </section>
      </div>

      <NodFooter />
    </>
  );
}
