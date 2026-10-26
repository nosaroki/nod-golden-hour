import { useState } from 'react';
import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjetsCartes from './ProjetsCartes';
/* Image d'en-tête servie depuis public/img : index.html la précharge avant le reste. */
const silhouette = '/img/golden-hour-silhouette.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';

/* Accueil. La forme vient du design system, le texte vient du site NOD. */

const INTENTIONS = [
  {
    n: '01', fr: 'Lancer', en: 'Launch',
    frTexte: "Tu as une idée. Tu veux la voir exister sans savoir par où commencer. NOD la prend du début à la fin.",
    enTexte: 'You have an idea. You want to see it exist without knowing where to start. NOD carries it from beginning to end.',
  },
  {
    n: '02', fr: 'Repositionner', en: 'Reposition',
    frTexte: "Ta marque existe déjà mais elle ne dit plus ce que tu es devenu.\nNOD revoit sa stratégie, son image, sa position, pour qu'elle te ressemble à nouveau.",
    enTexte: 'Your brand exists but no longer says what you have become.\nNOD revisits its strategy, image and position.',
  },
  {
    n: '03', fr: 'Incarner', en: 'Embody',
    frTexte: "Tu veux exister publiquement et que ton image te ressemble.\nNOD lui donne une forme, que ton nom soit déjà une marque ou qu'il commence tout juste à compter.",
    enTexte: 'You want to exist publicly, with an image that looks like you.\nNOD gives it a form.',
  },
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
      <section className="home-manifesto home-manifesto--creme nod-grain" style={vars({ '--nod-manifesto-image': url(orangePressee) })}>
        <div className="home-manifesto__image" />
        <div className="home-manifesto__veil" />
        <div className="home-manifesto__body">
          <Eyebrow tone="light">{t('La maison', 'The house')}</Eyebrow>
          <p className="home-manifesto__lead">
            {t('Une seule main, du brief au lancement.', 'One single hand, from brief to launch.')}
            <br />
            {t(
              'Rien ne se perd en route, parce que personne ne se passe le relais.',
              'Nothing gets lost along the way: there are no handoffs.',
            )}
          </p>
          <p className="home-manifesto__text">
            {t('Un seul interlocuteur, du début à la fin.', 'One point of contact, from start to finish.')}
            <br />
            {t(
              'Ton projet avance sans que tu aies à coordonner cinq prestataires.',
              'Your project moves forward without you juggling five different providers.',
            )}
          </p>
          <p className="home-manifesto__text">
            <Link to="/la-maison" className="nod-link-light">{t('Entrer dans la maison', 'Discover the house')} &rarr;</Link>
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
            {t('Trois points de départ, une seule méthode.', 'Three starting points, one method.')}
            <br />
            {t('Stratégie, identité, contenu, développement,', 'Strategy, identity, content, development,')}
            <br />
            {t('tenus ensemble du brief au lancement.', 'held together from brief to launch.')}
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
                  <span className="home-summary__text home-summary__text--lignes">{t(item.frTexte, item.enTexte)}</span>
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
            {t('Quelques projets que NOD a fait exister.', 'A few of the projects NOD has brought to life.')}
          </span>
        </div>

        <ProjetsCartes />

        <p className="cartes__note">
          <Link to="/travail">{t('Voir tout le travail', 'See all the work')} &rarr;</Link>
        </p>
      </section>

      {/* ---------- L'appel ---------- */}
      <div className="home-golden-block nod-grain">
        <section className="home-cta">
          <div className="home-cta__body">
            <h2 className="home-cta__title">{t('Présente ton projet.', 'Tell me about your project.')}</h2>
            <p className="home-cta__text">
              {t(
                "Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.",
                "Your project doesn't have to be fully formed. An idea is all it takes to start talking.",
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
