import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import TexteRevele from '@/components/TexteRevele';
import { Eyebrow, Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
/* Image d'en-tête servie depuis public/img : index.html la précharge avant le reste. */
const lightFold = '/img/light-fold-warm.webp';
import orangePressee from '@/assets/brand/orange-pressee.webp';
// import atelier from '@/assets/hero.webp'; (utilisé par l'encart golden hour, en commentaire plus bas)
import nnenaImg from '@/assets/nnena-portrait.webp';

/* La maison. Le manifeste du site NOD (le doute, le manque d'accompagnement)
   posé dans la forme du design system, suivi de la méthode et du portrait.
   Ce texte ne vit que sur cette page : l'accueil ne le redit pas. */

export default function Maison() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);


  /* Comment NOD intervient : trois domaines, chacun avec ce qui est réellement fait. */
  const domaines = [
    {
      fr: 'Marque et concept', en: 'Brand and concept',
      frL: ['Positionnement et plateforme de marque', 'Direction artistique et identité visuelle', 'Concepts de campagnes et de contenus', 'Messages, récit et ton de marque', 'Traduction de la stratégie en idées concrètes'],
      enL: ['Positioning and brand platform', 'Art direction and visual identity', 'Campaign and content concepts', 'Messaging, narrative and tone of voice', 'Turning strategy into concrete ideas'],
    },
    {
      fr: 'Contenu et création', en: 'Content and creation',
      frL: ['Formats et lignes éditoriales', 'Rédaction web, réseaux et campagnes', 'Direction visuelle et direction de contenu', 'Sites, de la maquette au développement'],
      enL: ['Formats and editorial lines', 'Copywriting for web, social and campaigns', 'Visual and content direction', 'Websites, from mockup to development'],
    },
    {
      fr: 'Production et coordination', en: 'Production and coordination',
      frL: ['Captation et montage de contenus', 'Planification et publication sur les réseaux', 'Pilotage de projet : planning, livrables, parties prenantes', 'Lien entre équipes, agences et partenaires créatifs'],
      enL: ['Filming and editing content', 'Social media planning and publishing', 'Project management: timelines, deliverables, stakeholders', 'Bridging teams, agencies and creative partners'],
    },
  ];

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
          <Eyebrow tone="light">{t('Une seule main', 'One single hand')}</Eyebrow>
          <h1 className="page-head__title page-head__title--une-ligne">
            {t('Une maison qui fait exister les projets.', 'A house that brings projects to life.')}
          </h1>
          <p className="page-head__lede">
            {t("De l'idée floue au projet qui existe vraiment.", 'From a blurry idea to a project that truly exists.')}
          </p>
        </div>
      </section>

      {/* ---------- Le manifeste ---------- */}
      <section className="home-manifesto home-manifesto--creme nod-grain" style={vars({ '--nod-manifesto-image': url(orangePressee) })}>
        <div className="home-manifesto__image" />
        <div className="home-manifesto__veil" />
        <div className="home-manifesto__body">
          <TexteRevele
            className="home-manifesto__lead"
            texte={t(
              "Un projet ne meurt presque jamais par manque d'idée. Il meurt avant même d'exister, pour deux raisons.",
              'A project almost never dies from a lack of ideas. It dies before it even exists, for two reasons.',
            )}
          />

          <div className="principe-raisons">
            <div className="principe-raison">
              <h2 className="principe-raison__h">{t('Le doute.', 'Doubt.')}</h2>
              <TexteRevele
                className="principe-raison__p"
                texte={t(
                  "Trop d'incertitudes, trop de questions sans réponse. L'idée reste dans ta tête au lieu de prendre forme.",
                  'Too much uncertainty, too many unanswered questions. The idea stays in your head instead of taking shape.',
                )}
              />
            </div>
            <div className="principe-raison">
              <h2 className="principe-raison__h">{t("Le manque d'accompagnement.", 'The lack of support.')}</h2>
              <TexteRevele
                className="principe-raison__p"
                texte={t(
                  "Tu sais ce que tu veux créer. Tu ne sais pas par où commencer, ni qui pour te tenir du début à la fin.",
                  'You know what you want to create. You do not know where to start, nor who will hold it from beginning to end.',
                )}
              />
            </div>
          </div>

          <p className="principe-pull">{t('NOD répond aux deux.', 'NOD answers both.')}</p>

          <TexteRevele
            className="home-manifesto__text"
            texte={t(
              "Une seule personne prend ton idée là où elle n'est encore qu'une pensée. Elle la mène jusqu'au jour où elle existe pour de vrai.",
              'One person takes your idea while it is still only a thought and carries it to the day it exists for real.',
            )}
          />
        </div>
      </section>

      {/* ---------- Comment NOD intervient ---------- */}
      <section className="mz mz--nuit mz--domaines">
        <div className="mz__inner">
          <h2 className="mz__titre">{t('Comment NOD intervient', 'How NOD works')}</h2>
          <div className="mz-domaines">
            {domaines.map((domaine, index) => (
              <div className="mz-domaines__col" key={domaine.fr}>
                <span className="mz__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mz-domaines__titre">{t(domaine.fr, domaine.en)}</h3>
                <ul className="mz-domaines__liste">
                  {(language === 'fr' ? domaine.frL : domaine.enL).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Le déroulé : une frise, comme dans la brochure ---------- */}
      <section className="mz mz--creme mz--frise">
        <div className="mz__inner">
          <h2 className="mz__titre">{t('Le déroulé', 'How it goes')}</h2>
          <ol className="mz-frise">
            {deroule.map((etape) => (
              <li className="mz-frise__etape" key={etape.fr}>
                <span className="mz-frise__point" aria-hidden="true" />
                <h3 className="mz-frise__titre">{t(etape.fr, etape.en)}</h3>
                <p className="mz-frise__texte">{t(etape.frV, etape.enV)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Qui ---------- */}
      <section id="qui" className="mz-qui mz-qui--orange">
        <div className="mz-qui__texte">
          <h2 className="mz__titre">{t('Qui', 'Who')}</h2>
          <p className="mz-qui__accroche">{t('Enchantée, moi c\'est Nnéna\u00a0!', 'Nice to meet you, I\'m Nnéna!')}</p>
          <TexteRevele
            className="mz-qui__p"
            texte={t(
              "C'est moi derrière NOD. J'ai commencé par la communication digitale : community management, social media management, relations presse, création de contenus. Je me suis ensuite lancée en freelance, puis j'ai travaillé en agence, où j'ai piloté des projets, des équipes et des comités.",
              "I'm the one behind NOD. I started in digital communication: community management, social media management, press relations, content creation. I then went freelance before working in agencies, where I led projects, teams and steering committees.",
            )}
          />
          <TexteRevele
            className="mz-qui__p"
            texte={t(
              "En parallèle, j'ai appris à coder, seule d'abord, puis en formation. À force de voir des projets passer de main en main et se perdre en route, j'ai eu envie de les porter du début à la fin.",
              'Alongside, I learned to code, on my own first, then through training. After seeing projects pass from hand to hand and get lost along the way, I wanted to carry them from start to finish.',
            )}
          />
          <TexteRevele
            className="mz-qui__p"
            texte={t(
              "C'est comme ça que NOD a vu le jour\u00a0! Aujourd'hui, j'accompagne des projets dans le bien-être, la beauté, la food, le sport, la photographie ou l'édition, de la stratégie jusqu'au lancement.",
              'That is how NOD came to life! Today, I support projects in wellness, beauty, food, sport, photography and publishing, from strategy all the way to launch.',
            )}
          />
          <p>
            <Link to="/contact" className="nod-btn nod-btn--night">
              {t('Entrer en contact', 'Get in touch')} <Icon name="arrow-right" size={18} />
            </Link>
          </p>
        </div>
        {/* Le portrait se charge seulement à l'approche, pour ne pas ralentir le haut de page. */}
        <div className="mz-qui__photo">
          <img src={nnenaImg} alt={t('Portrait de Nnéna', 'Portrait of Nnéna')} loading="lazy" decoding="async" />
        </div>
      </section>

      {/* Encart golden hour retiré pour l'instant. Gardé ici au cas où on veut le réutiliser.
      
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
      */}

      <NodFooter />
    </>
  );
}
