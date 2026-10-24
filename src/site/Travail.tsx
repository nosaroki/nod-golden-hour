import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, MediaFrame, Tag, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import { enLangue, familles, projets as projetsFr, type Projet } from './projets';
import inkOrange from '@/assets/brand/texture-ink-orange.webp';

/* Le travail. Index éditorial : la liste numérotée porte la page. Le clic
   ouvre le projet : image et fiche à droite, ou sous le nom sur mobile.
   Aucune carte, aucune ombre : de l'alignement et de la typographie. */

export default function Travail() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);
  const { hash } = useLocation();
  const projets = projetsFr.map((p) => enLangue(p, language));

  const [famille, setFamille] = useState('tout');
  const [actif, setActif] = useState('');
  const [ouvert, setOuvert] = useState<string | null>(null);

  useEffect(() => {
    const id = hash.replace('#', '');
    if (id && projets.some((p) => p.id === id)) {
      setActif(id);
      setOuvert(id);
    }
  }, [hash]);

  const liste = famille === 'tout' ? projets : projets.filter((p) => p.famille === famille);
  const fiche = ouvert ? projets.find((p) => p.id === ouvert) : undefined;


  return (
    <>
      <NodNav overImage />

      <section className="page-head" style={vars({ '--nod-head-image': url(inkOrange) })}>
        <div className="page-head__image" />
        <div className="page-head__veil" />
        <div className="page-head__foot" />
        <div className="page-head__body">
          <Eyebrow tone="light">{t('Le travail', 'The work')}</Eyebrow>
          <h1 className="page-head__title">
            {t('Des projets menés', 'Projects carried')}
            <br />
            {t('du brief au lancement.', 'from brief to launch.')}
          </h1>
          <p className="page-head__lede">
            {t(
              'Des projets dans des univers très différents. Ouvre chacun pour lire ce qui a été fait.',
              'Projects across very different worlds. Open each one to read what was done.',
            )}
          </p>
        </div>
      </section>

      <div className="index-travail">
        <div>
          <div className="index-travail__filtres">
            {familles.map((item) => (
              <Tag
                key={item.id}
                selected={famille === item.id}
                onClick={() => {
                  setFamille(item.id);
                  setOuvert(null);
                  const premier = item.id === 'tout' ? projets[0] : projets.find((p) => p.famille === item.id);
                  if (premier) setActif('');
                }}
              >
                {t(item.fr, item.en)}
              </Tag>
            ))}
          </div>

          <ul className="index-travail__liste">
            {liste.map((projet, index) => {
              const estOuvert = ouvert === projet.id;
              return (
                <li
                  className={'index-travail__item' + (actif === projet.id ? ' is-actif' : '') + (estOuvert ? ' is-ouvert' : '')}
                  key={projet.id}
                  onMouseEnter={() => { if (!ouvert) setActif(projet.id); }}
                >
                  <button
                    type="button"
                    className="index-travail__bouton"
                    aria-expanded={estOuvert}
                    aria-controls={`fiche-${projet.id}`}
                    onFocus={() => { if (!ouvert) setActif(projet.id); }}
                    onClick={() => {
                      setActif(projet.id);
                      setOuvert(estOuvert ? null : projet.id);
                    }}
                  >
                    <span className="index-travail__n">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="index-travail__nom">{projet.titre}</span>
                      <span className="index-travail__sous">{projet.sousTitre}</span>
                    </span>
                    <Icon name={estOuvert ? 'minus' : 'plus'} size={20} className="index-travail__signe" />
                  </button>

                  {estOuvert ? (
                    <div className="index-travail__fiche index-travail__fiche--mobile" id={`fiche-${projet.id}`}>
                      <Visuel projet={projet} />
                      <FicheProjet projet={projet} t={t} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="index-travail__panneau" aria-live="polite">
          {fiche ? (
            <>
              <div className="index-travail__media" key={fiche.id}>
                <Visuel projet={fiche} />
                {fiche.aVenir ? (
                  <span className="index-travail__placeholder">{t('Visuel à venir', 'Visual to come')}</span>
                ) : null}
              </div>
              <div className="index-travail__fiche">
                <h2 className="index-travail__titre">{fiche.titre}</h2>
                <FicheProjet projet={fiche} t={t} />
              </div>
            </>
          ) : (
            <p className="index-travail__invite">
              {t('Ouvre un projet pour découvrir le travail.', 'Open a project to discover the work.')}
            </p>
          )}
        </aside>
      </div>

      {/* ---------- Le contact vit au bas de la page projets ---------- */}
      <section className="travail__cta nod-grain">
        <div className="travail__cta-body">
          <Eyebrow tone="ink">{t('Travaillons ensemble', "Let's work together")}</Eyebrow>
          <h2 className="travail__cta-title">{t('Présente ton projet.', 'Tell me about your project.')}</h2>
          <p className="travail__cta-text">
            {t(
              "Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.",
              'No need for a finished project. An idea is enough to start the conversation.',
            )}
          </p>
          <Link to="/contact" className="nod-btn nod-btn--night nod-btn--lg">
            {t('Remplir le formulaire', 'Fill in the form')} <Icon name="arrow-right" size={20} />
          </Link>
        </div>
      </section>

      <NodFooter />
    </>
  );
}

/* Le contenu d'une fiche, partagé entre le panneau de droite et la version mobile. */
function FicheProjet({ projet, t }: { projet: Projet; t: (fr: string, en: string) => string }) {
  return (
    <>
      <dl className="index-travail__details">
        <div>
          <dt>{t('Le besoin', 'The need')}</dt>
          <dd className="index-travail__texte">{projet.besoin}</dd>
        </div>
        <div>
          <dt>{t('Ce que NOD a fait', 'What NOD did')}</dt>
          <dd className="index-travail__texte">{projet.texte}</dd>
        </div>
        <div>
          <dt>{t('Rôle NOD', 'NOD role')}</dt>
          <dd>{projet.role}</dd>
        </div>
      </dl>
      <ul className="index-travail__tags">
        {projet.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      {projet.lien ? (
        <a href={projet.lien} target="_blank" rel="noopener noreferrer" className="index-travail__lien">
          {projet.lienLabel ? t(projet.lienLabel.fr, projet.lienLabel.en) : t('Voir', 'See')}
          <Icon name="arrow-up-right" size={18} />
          <span className="nod-sr">{t('(nouvel onglet)', '(new tab)')}</span>
        </a>
      ) : null}
    </>
  );
}

/* Le visuel d'une fiche : l'extrait vidéo quand il existe, l'image sinon. */
function Visuel({ projet }: { projet: Projet }) {
  if (projet.video) {
    return (
      <video
        className="index-travail__video"
        src={projet.video}
        poster={projet.image}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }
  return <MediaFrame src={projet.image} ratio="4 / 3" scrim={projet.placeholder ? 'bottom' : 'none'} />;
}
