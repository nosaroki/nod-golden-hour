import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logoNod from "@/assets/logo.svg";
import { useLanguage } from "@/contexts/LanguageContext";

// Pied de page partagé. Une seule signature (le slogan animé) — plus de logo
// redondant ni de navigation. `dark` : variante navy (page Le principe).
const NEWSLETTER_URL = "https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/newsletter-signup";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Etat = "repos" | "envoi" | "ok" | "deja" | "erreur" | "invalide";

// Inscription aux nouvelles de NOD, prête pour le lancement de la newsletter.
function Nouvelles({ t, langue }: { t: (fr: string, en: string) => string; langue: string }) {
  const [email, setEmail] = useState("");
  const [piege, setPiege] = useState("");
  const [etat, setEtat] = useState<Etat>("repos");

  const envoyer = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) { setEtat("invalide"); return; }
    setEtat("envoi");
    try {
      const res = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), langue, website: piege }),
      });
      const data = await res.json();
      setEtat(data.status === "ok" ? "ok" : data.status === "exists" ? "deja" : "erreur");
    } catch {
      setEtat("erreur");
    }
  };

  if (etat === "ok") {
    return (
      <div className="site-footer__nl">
        <p className="site-footer__nl-titre">{t("Les nouvelles de NOD", "News from NOD")}</p>
        <p className="site-footer__nl-merci" role="status">{t("Merci, c'est noté.", "Thank you, you're in.")}</p>
      </div>
    );
  }

  const message =
    etat === "invalide" ? t("Cette adresse ne semble pas valide.", "This address doesn't look valid.")
    : etat === "deja" ? t("Cette adresse est déjà inscrite.", "This address is already signed up.")
    : etat === "erreur" ? t("Un souci est survenu, réessaie dans un instant.", "Something went wrong, please try again shortly.")
    : "";

  return (
    <form className="site-footer__nl" onSubmit={envoyer} noValidate>
      <label className="site-footer__nl-titre" htmlFor="nl-email">
        {t("Les nouvelles de NOD", "News from NOD")}
      </label>
      <div className="site-footer__nl-ligne">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          placeholder={t("ton@email.com", "your@email.com")}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (etat !== "envoi") setEtat("repos"); }}
         
        />
        <input
          className="site-footer__nl-piege"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={piege}
          onChange={(e) => setPiege(e.target.value)}
        />
        <button type="submit" disabled={etat === "envoi"}>
          {etat === "envoi" ? t("Envoi…", "Sending…") : t("Je m'inscris", "Sign me up")}
        </button>
      </div>
      {message && <p id="nl-info" className="site-footer__nl-info" role="alert">{message}</p>}
    </form>
  );
}

export default function NodFooter({ dark = false }: { dark?: boolean }) {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === "fr" ? fr : en);
  return (
    <footer className={"site-footer" + (dark ? " site-footer--dark" : "")}>
      <div className="site-footer__haut">
        <div className="site-footer__gauche">
          <p className="site-footer__slogan">
            <img className="site-footer__slogan-logo" src={logoNod} alt="NOD" />
            <span className="slogan-grad">say <b>yes</b> to new projects</span>
          </p>
        </div>

        <div className="site-footer__droite">
          <Nouvelles t={t} langue={language} />
          <div className="site-footer__socials">
            <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__base">
        <span className="site-footer__copy">© 2026 NOD · Golden hour</span>
        <div className="site-footer__legal">
          <Link to="/mentions-legales">{t("Mentions légales", "Legal notice")}</Link>
          <Link to="/confidentialite">{t("Confidentialité", "Privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
