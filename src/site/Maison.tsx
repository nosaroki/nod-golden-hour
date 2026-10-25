import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import lightFold from '@/assets/brand/light-fold-warm.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';
import atelier from '@/assets/hero.webp';
import nnenaImg from '@/assets/nnena-portrait.webp';

/* La maison. Le manifeste du site NOD (le doute, le manque d'accompagnement)
   posé dans la forme du design system, suivi de la méthode et du portrait.
   Ce texte ne vit que sur cette page : l'accueil ne le redit pas. */

export default function Maison() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);

  /* Le déroulé d'un projet, dans l'ordre : ici la numérotation a un sens. */
  const deroule = [
    {
      fr: 'Le premier échange', en: 'The first conversation',
      frV: "Une conversation pour comprendre l'idée, ses enjeux, ce qu'elle doit devenir.",
      enV: 'A conversation to understand the idea, what is at stake, what it should become.',
    },
    {
      fr: 'Le devis', en: 'The quote',
      frV: 'Une proposition claire : ce qui sera fait, en combien de temps, pour quel budget.',
      enV: 'A clear proposal: what will be done, how long it takes, for what budget.',
    },
    {
      fr: 'La direction', en: 'The direction',
      frV: 'Stratégie, positionnement, univers visuel.\nLe cap est posé avant la moindre production.',
      enV: 'Strategy, positioning, visual world.\nThe course is set before anything is produced.',
    },
    {
      fr: 'La production', en: 'The making',
      frV: "Identité, contenus, site : tout est fabriqué d'une même main.",
      enV: 'Identity, content, website: everything made by one hand.',
    },
    {
      fr: 'Le lancement', en: 'The launch',
      frV: 'La mise en ligne, la prise en main, puis le suivi.',
      enV: 'Going live, the handover, then the follow-up.',
    },
  ];

  return (
    <>
      <NodNav overImage />

      <section className="page-head" style={vars({ '--nod-head-image': url(lightFold) })}>
        <div className="page-head__image" />
        <div className="page-head__veil" />
        <div className="page-head__foot" />
        <div className="page-head__body">
          <Eyebrow tone="light">{t('La maison', 'The house')}</Eyebrow>
          <h1 className="page-head__title">
            {t("Ce n'est pas une agence.", 'Not an agency.')}
            <br />
            {t("C'est une maison.", "It's a house.")}
          </h1>
          <p className="page-head__lede">
            {t('Une seule personne pour porter ton projet de bout en bout.', 'One person to carry your project from end to end.')}
          </p>
        </div>
      </section>

      {/* ---------- Le manifeste ---------- */}
      <section className="home-manifesto home-manifesto--creme nod-grain" style={vars({ '--nod-manifesto-image': url(orangePressee) })}>
        <div className="home-manifesto__image" />
        <div className="home-manifesto__veil" />
        <div className="home-manifesto__body">
          <p className="home-manifesto__lead">
            {t(
              "Un projet ne meurt presque jamais par manque d'idée. Il meurt avant même d'exister, pour deux raisons.",
              'A project almost never dies from a lack of ideas. It dies before it even exists, for two reasons.',
            )}
          </p>

          <div className="principe-raisons">
            <div className="principe-raison">
              <h2 className="principe-raison__h">{t('Le doute.', 'Doubt.')}</h2>
              <p className="principe-raison__p">
                {t(
                  "Trop d'incertitudes, trop de questions sans réponse. L'idée reste dans ta tête au lieu de prendre forme.",
                  'Too much uncertainty, too many unanswered questions. The idea stays in your head instead of taking shape.',
                )}
              </p>
            </div>
            <div className="principe-raison">
              <h2 className="principe-raison__h">{t("Le manque d'accompagnement.", 'The lack of support.')}</h2>
              <p className="principe-raison__p">
                {t(
                  "Tu sais ce que tu veux créer. Tu ne sais pas par où commencer, ni qui pour te tenir du début à la fin.",
                  'You know what you want to create. You do not know where to start, nor who will hold it from beginning to end.',
                )}
              </p>
            </div>
          </div>

          <p className="principe-pull">{t('NOD répond aux deux.', 'NOD answers both.')}</p>

          <p className="home-manifesto__text">
            {t(
              "Une seule personne prend ton idée là où elle n'est encore qu'une pensée. Elle la mène jusqu'au jour où elle existe pour de vrai.",
              'One person takes your idea while it is still only a thought, and carries it to the day it exists for real.',
            )}
          </p>
        </div>
      </section>

      {/* ---------- Le déroulé ---------- */}
      <section className="house-method house-method--creme">
        <div className="house-method__inner">
          <Eyebrow>{t('Le déroulé', 'How it goes')}</Eyebrow>
          <ol className="house-method__rows">
            {deroule.map((ligne, index) => (
              <li className="house-method__row" key={ligne.fr}>
                <span className="house-method__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="house-method__key">{t(ligne.fr, ligne.en)}</span>
                <span className="house-method__value">{t(ligne.frV, ligne.enV)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Qui ---------- */}
      <section id="qui" className="house-founder" style={vars({ '--nod-house-image': url(nnenaImg) })}>
        <div className="house-founder__body">
          <Eyebrow>{t('Qui', 'Who')}</Eyebrow>
          <h2 className="house-founder__title">{t('Nnéna a fondé NOD en 2025.', 'Nnéna founded NOD in 2025.')}</h2>
          <p className="house-founder__text">
            {t(
              "Nnéna a fondé NOD en 2025. Avant ça, l'événementiel et la communication, en agence : comités de pilotage, équipes à encadrer, délais à tenir. En parallèle, elle apprend à coder seule. NOD réunit les trois : le sens de l'orchestration, le goût de l'image, la main qui construit.",
              'Nnéna founded NOD in 2025. Before that, events and communication, in agencies: steering committees, teams to lead, deadlines to hold. Alongside, she taught herself to code. NOD brings the three together: a sense of orchestration, an eye for image, the hand that builds.',
            )}
          </p>
          <p>
            <Link to="/contact" className="nod-btn nod-btn--secondary">
              {t('Entrer en contact', 'Get in touch')} <Icon name="arrow-right" size={18} />
            </Link>
          </p>
        </div>
        <div className="house-founder__image" />
      </section>

      {/* ---------- L'heure dorée, puis l'invitation ---------- */}
      <section
        className="nod-quote-panel nod-quote-panel--start principe-quote"
        style={vars({ '--nod-quote-image': url(atelier) })}
      >
        <div className="nod-quote-panel__box nod-grain house-golden">
          <p className="house-golden__phrase">
            {t(
              "On appelle golden hour ce moment où la lumière rend tout plus juste, plus beau, plus vivant. C'est l'instant que NOD cherche pour ton projet. Celui où il existe enfin.",
              'Golden hour is the moment when light makes everything truer, more beautiful, more alive. That is the moment NOD looks for in your project.',
            )}
          </p>
          <p className="house-golden__suite">
            {t('Une idée, même floue, suffit pour commencer.', 'An idea, even a blurry one, is enough to start.')}
          </p>
          <Link to="/contact" className="nod-btn nod-btn--night">
            {t('Parler de ton projet', 'Talk about your project')} <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </section>

      <NodFooter />
    </>
  );
}
