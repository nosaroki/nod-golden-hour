import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logoLight from "@/assets/logo-light.svg";

// Pied de page partagé. Une seule signature (le slogan animé) — plus de logo
// redondant ni de navigation. `dark` : variante navy (page Le principe).
export default function NodFooter({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={"site-footer" + (dark ? " site-footer--dark" : "")}>
      <p className="site-footer__slogan">
        <img className="site-footer__slogan-logo" src={logoLight} alt="NOD" />
        <span className="slogan-grad">say <b>yes</b> to new projects</span>
      </p>
      <div className="site-footer__accent" />

      <div className="site-footer__center">
        <a href="mailto:contact@nod-consulting.com" className="site-footer__mail">
          contact@nod-consulting.com
        </a>
        <div className="site-footer__socials">
          <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="site-footer__base">
        <span className="site-footer__copy">© 2026 NOD · Golden hour</span>
        <div className="site-footer__legal">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
