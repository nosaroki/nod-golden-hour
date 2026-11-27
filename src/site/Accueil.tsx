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

/* Trois offres concrètes : ce qu'on vient chercher chez NOD. */
const INTENTIONS = [
  {
    n: '01', fr: 'Lancer ta marque', en: 'Launch your brand',
    frTexte: "Une idée ou une activité qui démarre.\nCadrage, identité, site, premiers contenus : je construis tout ce qu'il faut pour lancer.",
    enTexte: 'An idea or a business getting started.\nFraming, identity, website, first content: I build everything you need to launch.',
  },
  {
    n: '02', fr: 'Créer ton site', en: 'Build your website',
    frTexte: "Un site vitrine ou une plateforme, conçu et développé sur mesure.\nDesign, textes, réservation ou paiement si besoin, référencement, mise en ligne.",
    enTexte: 'A showcase website or a platform, designed and built from scratch.\nDesign, copy, booking or payment if needed, SEO, going live.',
  },
  {
    n: '03', fr: 'Faire vivre tes réseaux', en: 'Bring your social media to life',
    frTexte: "Une ligne éditoriale claire, des contenus qui te ressemblent.\nTes réseaux tenus mois après mois, de la création à la publication.",
    enTexte: 'A clear editorial line, content that looks like you.\nYour social media handled month after month, from creation to publishing.',
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
          <p className="page-head__lede page-hero__lede">
            {t(
              'Stratégie, identité, site et contenu pour les marques et les indépendants qui se lancent.',
              'Strategy, identity, website and content for brands and independents getting started.',
            )}
            <br />
            {t("Une seule personne, de l'idée à la mise en ligne.", 'One person, from idea to launch.')}
          </p>
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
          </div>

          <p className="home-summary__intro">
            {t('Trois façons de travailler ensemble.', 'Three ways to work together.')}
            <br />
            {t('Chacune se prend seule ou se combine.', 'Each one works on its own or combined.')}
          </p>

          <ul className="home-summary__list">
            {INTENTIONS.map((item) => (
              <li
                key={item.n}
                className={'home-summary__item' + (ouvert === item.n ? ' is-open' : '')}
                onMouseEnter={() => setOuvert(item.n)}
                onFocus={() => setOuvert(item.n)}
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
            {t('Ce que la maison a réalisé.', 'What the house has made.')}
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
            <h2 className="home-cta__title">{t("Qu'est-ce qu'on crée aujourd'hui ?", 'What are we creating today?')}</h2>
            <Link to="/contact" className="nod-btn nod-btn--night nod-btn--lg">
              {t('Décrire mon projet', 'Describe my project')} <Icon name="arrow-right" size={20} />
            </Link>
          </div>
        </section>
      </div>

      <NodFooter />
    </>
  );
}
