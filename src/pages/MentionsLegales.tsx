import Nav from "@/components/Navbar";
import NodFooter from "@/components/NodFooter";

// Mentions legales. Adresse a completer (domiciliation), hebergeur Gandi rempli.
const MentionsLegales = () => {
  return (
    <div className="page legal">
      <Nav />
      <section className="legal__inner">
        <div className="eyebrow">
          <span className="eyebrow__tick" />
          <span className="eyebrow__label">Informations légales</span>
        </div>
        <h1 className="legal__title">Mentions légales</h1>

        <div className="legal__prose">
          <h2>Éditeur du site</h2>
          <p>
            NOD Consulting, micro-entreprise.<br />
            Directrice de la publication : Nnéna.<br />
            Contact : <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a><br />
            {/* Adresse : à compléter (adresse de domiciliation). */}
          </p>

          <h2>Hébergeur</h2>
          <p>
            Gandi SAS, société par actions simplifiée au capital de 630 000 €.<br />
            Siège social : 63-65 boulevard Masséna, 75013 Paris, France.<br />
            RCS Paris 423 093 459.<br />
            Téléphone : +33 (0)1 70 37 76 61.<br />
            <a href="https://www.gandi.net" target="_blank" rel="noopener noreferrer">gandi.net</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu de ce site, textes, visuels, logo et code est la propriété
            de NOD Consulting, sauf mention contraire. Toute reproduction sans autorisation
            écrite préalable est interdite.
          </p>
        </div>
      </section>
      <NodFooter />
    </div>
  );
};

export default MentionsLegales;
