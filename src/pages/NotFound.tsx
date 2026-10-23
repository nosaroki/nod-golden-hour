import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import lumiere from '@/assets/brand/light-fold-warm.webp';

/* 404. Même forme que l'écran de confirmation du contact : un en-tête doré
   plein écran, un seul message, deux chemins pour repartir. */

export default function NotFound() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);

  return (
    <>
      <NodNav overImage />

      <main>
        <section className="page-head page-head--plein" style={vars({ '--nod-head-image': url(lumiere) })}>
          <div className="page-head__image" aria-hidden="true" />
          <div className="page-head__veil" aria-hidden="true" />
          <div className="page-head__foot" aria-hidden="true" />
          <div className="page-head__body page-head__body--plein">
            <h1 className="page-head__title page-head__title--plein">
              {t("Cette page n'existe pas.", 'This page does not exist.')}
            </h1>
            <p className="page-head__lede">
              {t(
                "Elle a peut-être changé de place, ou n'a jamais vu le jour. Faire exister ce qui manque, c'est justement le métier de NOD.",
                'It may have moved, or never seen the light of day. Bringing what is missing to life is exactly what NOD does.',
              )}
            </p>
            <div className="page-hero__actions">
              <Link to="/" className="nod-btn nod-btn--inverse nod-btn--lg">
                {t("Retour à l'accueil", 'Back to home')} <Icon name="arrow-right" size={20} />
              </Link>
              <Link to="/travail" className="nod-btn nod-btn--on-image nod-btn--lg">
                {t('Voir le travail', 'See the work')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <NodFooter />
    </>
  );
}
