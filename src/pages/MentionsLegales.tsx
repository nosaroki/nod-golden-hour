import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow } from '@/components/nod';

/* Mentions légales. Hébergeur : Cloudflare depuis la mise en ligne de la refonte. */

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
              Cloudflare, Inc.<br />
              101 Townsend Street, San Francisco, CA 94107, États-Unis.<br />
              +1 650 319 8930<br />
              <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">cloudflare.com</a>
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
