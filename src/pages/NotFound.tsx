import { Link } from "react-router-dom";
import Nav from "@/components/Navbar";
import NodFooter from "@/components/NodFooter";

// Page 404 dans le style NOD : fond navy, grand 404 anime, retour a l'accueil.
const NotFound = () => {
  return (
    <div className="page nf nf--navy is-dark">
      <Nav />

      <section className="nf__inner">
        <span className="nf__code">404</span>
        <div className="eyebrow">
          <span className="eyebrow__tick" />
          <span className="eyebrow__label">Page introuvable</span>
        </div>
        <h1 className="nf__title">
          Cette page n’existe <span className="grad-text">pas encore</span>.
        </h1>
        <p className="nf__text">
          Elle a peut-être changé de place, ou elle n’a jamais vu le jour. NOD, justement,
          fait exister ce qui manque.
        </p>
        <Link to="/" className="link-plain">
          Retour à l’accueil <span aria-hidden="true">→</span>
        </Link>
      </section>

      <NodFooter dark />
    </div>
  );
};

export default NotFound;
