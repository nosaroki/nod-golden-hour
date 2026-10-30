import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow } from '@/components/nod';

/* Politique de confidentialité, adaptée à la collecte via le formulaire de contact. */

export default function Confidentialite() {
  return (
    <>
      <NodNav />
      <main className="legal-nod">
        <header className="legal-nod__head">
          <Eyebrow>Tes données</Eyebrow>
          <h1 className="legal-nod__title">Politique de confidentialité</h1>
        </header>

        <div className="legal-nod__prose">
          <section>
            <h2>Responsable du traitement</h2>
            <p>
              NOD Consulting, représentée par Nnéna. SIRET : 913 549 499 00014.<br />
              Contact : <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a>
            </p>
          </section>

          <section>
            <h2>Données collectées</h2>
            <p>
              NOD collecte uniquement les données transmises via le formulaire de contact :
              nom, email, téléphone facultatif, message. Si tu demandes la brochure, ton email
              sert aussi à te l'envoyer. Si tu t'inscris aux nouvelles de NOD, en bas de page ou en cochant la case d'un formulaire,
              seul ton email est conservé. Si tu demandes ton estimation sur la page À la carte, ton
              prénom, ton email et ta sélection servent à te l'envoyer et à te recontacter.
            </p>
          </section>

          <section>
            <h2>Finalité et base légale</h2>
            <p>
              Ces données servent à répondre à ta demande, sur la base de ton intérêt à être
              recontacté. L'envoi de la brochure et des nouvelles de NOD repose sur ton
              consentement, que tu peux retirer à tout moment.
            </p>
          </section>

          <section>
            <h2>Sous-traitants</h2>
            <p>
              Les données sont stockées par Supabase. Les emails sont envoyés via Resend. Le site
              est hébergé par Cloudflare. Aucune donnée n'est vendue ni cédée à des tiers.
            </p>
          </section>

          <section>
            <h2>Durée de conservation</h2>
            <p>
              Les messages sont conservés trois ans à compter du dernier échange, puis supprimés.
              Tu peux demander leur suppression avant ce délai. L'email d'inscription aux
              nouvelles est conservé jusqu'à ta désinscription.
            </p>
          </section>

          <section>
            <h2>Tes droits</h2>
            <p>
              Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation et
              d'opposition sur tes données. Pour les exercer, écris à{' '}
              <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a>. Tu peux
              aussi adresser une réclamation à la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              Ce site ne dépose que les cookies nécessaires à son fonctionnement. Aucune mesure
              d'audience ni traçage publicitaire n'est utilisé à ce jour.
            </p>
          </section>
        </div>
      </main>
      <NodFooter />
    </>
  );
}
