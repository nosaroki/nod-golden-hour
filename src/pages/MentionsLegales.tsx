import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow } from '@/components/nod';

/* Mentions légales. L'hébergeur est à mettre à jour au changement d'hébergement. */

export default function MentionsLegales() {
  return (
    <>
      <NodNav />
      <main className="legal-nod">
        <header className="legal-nod__head">
          <Eyebrow>Informations légales</Eyebrow>
          <h1 className="legal-nod__title">Mentions légales</h1>
        </header>

        <div className="legal-nod__prose">
          <section>
            <h2>Éditeur du site</h2>
            <p>
              NOD Consulting, entreprise individuelle sous le régime de la micro-entreprise,
              représentée par Nnéna.<br />
              SIRET : 913 549 499 00014<br />
              Neuilly-sur-Seine, France<br />
              Directrice de la publication : Nnéna<br />
              Contact : <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a>
            </p>
          </section>

          <section>
            <h2>Hébergeur</h2>
            <p>
              Gandi SAS, société par actions simplifiée au capital de 630 000 €.<br />
              63-65 boulevard Masséna, 75013 Paris, France.<br />
              RCS Paris 423 093 459.<br />
              <a href="https://www.gandi.net" target="_blank" rel="noopener noreferrer">gandi.net</a>
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site, textes, visuels, logo et code, est la propriété
              de NOD Consulting, sauf mention contraire. Les visuels des projets présentés
              restent la propriété de leurs clients respectifs. Toute reproduction sans
              autorisation écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2>Données personnelles</h2>
            <p>
              Le traitement des données transmises via le site est décrit dans la{' '}
              <a href="/confidentialite">politique de confidentialité</a>.
            </p>
          </section>
        </div>
      </main>
      <NodFooter />
    </>
  );
}
