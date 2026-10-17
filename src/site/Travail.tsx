import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, MediaFrame, Tag, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import { familles, projets } from './projets';
import inkOrange from '@/assets/brand/texture-ink-orange.webp';

/* Le travail. Index éditorial : la liste numérotée porte la page, le visuel du
   projet survolé s'affiche à droite, le clic ouvre la fiche sous le visuel.
   Aucune carte, aucune ombre : de l'alignement et de la typographie. */

export default function Travail() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);
  const { hash } = useLocation();

  const [famille, setFamille] = useState('tout');
  const [actif, setActif] = useState(projets[0].id);
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
  /* Quand une fiche est ouverte, le visuel reste le sien : il ne suit plus la
     souris, sinon l'image et le texte parlent de deux projets différents. */
  const vu = fiche ?? projets.find((p) => p.id === actif) ?? projets[0];

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
              'Onze projets, dans des univers très différents. Survole pour voir, clique pour lire.',
              'Eleven projects across very different worlds. Hover to see, click to read.',
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
                  if (premier) setActif(premier.id);
                }}
              >
                {t(item.fr, item.en)}
              </Tag>
            ))}
          </div>

          <div className="index-travail__liste">
            {liste.map((projet, index) => (
              <div
                className={'index-travail__item' + (actif === projet.id ? ' is-actif' : '')}
                key={projet.id}
                onMouseEnter={() => setActif(projet.id)}
              >
                <button
                  type="button"
                  className="index-travail__bouton"
                  aria-expanded={ouvert === projet.id}
                  onFocus={() => setActif(projet.id)}
                  onClick={() => setOuvert(ouvert === projet.id ? null : projet.id)}
                >
                  <span className="index-travail__n">{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="index-travail__nom">{projet.titre}</span>
                    <span className="index-travail__sous">{projet.sousTitre}</span>
                  </span>
                  <Icon name="arrow-up-right" size={20} className="index-travail__fleche" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="index-travail__panneau">
          <div className="index-travail__media">
            <MediaFrame src={vu.image} ratio="4 / 3" scrim={vu.placeholder ? 'bottom' : 'none'} />
            {vu.placeholder ? (
              <span className="index-travail__placeholder">
                {t('Visuel à venir', 'Visual to come')}
              </span>
            ) : null}
          </div>

          {fiche ? (
            <div className="index-travail__fiche">
              <Eyebrow>{fiche.kicker}</Eyebrow>
              <h2 className="index-travail__titre">{fiche.titre}</h2>
              <p className="index-travail__texte">{fiche.texte}</p>
              <dl className="index-travail__role">
                <dt>{t('Rôle NOD', 'NOD role')}</dt>
                <dd>{fiche.role}</dd>
              </dl>
              <ul className="index-travail__tags">
                {fiche.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          ) : (
            <p className="index-travail__texte">
              {t('Clique un projet pour lire la fiche.', 'Click a project to read the case.')}
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
