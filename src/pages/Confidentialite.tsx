import Nav from "@/components/Navbar";
import NodFooter from "@/components/NodFooter";

// Politique de confidentialite. Modele a verifier, adapte a la collecte via formulaires.
const Confidentialite = () => {
  return (
    <div className="page legal">
      <Nav />
      <section className="legal__inner">
        <div className="eyebrow">
          <span className="eyebrow__tick" />
          <span className="eyebrow__label">Tes données</span>
        </div>
        <h1 className="legal__title">Politique de confidentialité</h1>

        <div className="legal__prose">
          <h2>Données collectées</h2>
          <p>
            NOD collecte uniquement les données que tu transmets via ses formulaires : nom,
            email, téléphone facultatif et message pour le formulaire de contact ; email pour
            la demande de brochure.
          </p>

          <h2>Finalité</h2>
          <p>
            Le formulaire de contact sert uniquement à te répondre. L’email laissé pour la
            brochure sert à te l’envoyer et à t’informer de l’actualité de NOD.
          </p>

          <h2>Base légale</h2>
          <p>
            Répondre à ta demande repose sur ton intérêt à être recontacté. L’envoi de la
            brochure et des informations repose sur ton consentement, que tu peux retirer à
            tout moment.
          </p>

          <h2>Traitement et stockage</h2>
          <p>
            Les données sont traitées et stockées via Supabase. Les envois d’emails passent
            par Resend. Aucune donnée n’est vendue ni cédée à des tiers.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les données sont conservées le temps nécessaire au traitement de ta demande, puis
            supprimées sur simple demande.
          </p>

          <h2>Tes droits</h2>
          <p>
            Tu disposes d’un droit d’accès, de rectification, d’effacement et d’opposition sur
            tes données. Pour les exercer, écris à{" "}
            <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site ne dépose que les cookies nécessaires à son bon fonctionnement. Aucune
            mesure d’audience ni traçage publicitaire n’est utilisé à ce jour.
          </p>
        </div>
      </section>
      <NodFooter />
    </div>
  );
};

export default Confidentialite;
