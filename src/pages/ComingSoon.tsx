import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { NodLogo } from "@/components/NodLogo";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "@/components/Navbar";

// ⬇️ Remplace par l'URL de ta Edge Function newsletter-signup
const NEWSLETTER_URL = "https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/newsletter-signup";

const ComingSoon = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleEmailSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(language === "fr" ? "Merci de renseigner votre email." : "Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      setError(language === "fr" ? "Le format de l'adresse email n'est pas valide." : "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === "exists") {
        setError(language === "fr" ? "Cette adresse est déjà inscrite." : "This email is already subscribed.");
      } else if (data.status === "ok") {
        setSubmitted(true);
      } else {
        setError(language === "fr" ? "Une erreur est survenue. Réessayez." : "Something went wrong. Please try again.");
      }
    } catch {
      setError(language === "fr" ? "Une erreur est survenue. Réessayez." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const txt = language === "fr" ? {
    tagline: "On se réinvente.",
    subtitle: "Un nouveau modèle créatif arrive.",
    emailLabel: "Être informé·e en premier",
    emailPlaceholder: "votre@email.com",
    emailSuccess: "C'est noté. On se retrouve bientôt.",
    meanwhile: "En attendant, contactez-nous à",
    follow: "Suivez-nous",
    rgpd: "Vos données servent uniquement à vous informer du lancement.",
  } : {
    tagline: "We're reinventing ourselves.",
    subtitle: "A new creative model is coming.",
    emailLabel: "Be the first to know",
    emailPlaceholder: "your@email.com",
    emailSuccess: "Noted. See you soon.",
    meanwhile: "In the meantime, reach us at",
    follow: "Follow us",
    rgpd: "Your data is only used to notify you of the launch.",
  };

  return (
    <div className="cs-page">
      <Navbar />

      <section className="cs-hero">
        <div className="cs-hero-content">

          <motion.div
            className="cs-logo-wrapper shimmer-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NodLogo size="hero" className="migra-font" />
          </motion.div>

          <motion.div
            className="cs-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            aria-hidden="true"
          />

          <motion.p
            className="cs-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {txt.tagline}
            <br />
            <strong>{txt.subtitle}</strong>
          </motion.p>

          <motion.div
            className="cs-email-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {!submitted ? (
              <>
                <span className="cs-email-label">{txt.emailLabel}</span>
                <div className="cs-email-row">
                  <input
                    type="email"
                    placeholder={txt.emailPlaceholder}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit(e)}
                    className="cs-email-input"
                    aria-label="Email"
                    disabled={loading}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    className="cs-email-btn"
                    aria-label={language === "fr" ? "S'inscrire" : "Subscribe"}
                    disabled={loading}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={loading ? "cs-spinner" : ""}
                    >
                      {loading ? (
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      ) : (
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      )}
                    </svg>
                  </button>
                </div>
                {error && <span className="cs-email-error">{error}</span>}
                <span className="cs-rgpd">{txt.rgpd}</span>
              </>
            ) : (
              <span className="cs-email-success">{txt.emailSuccess}</span>
            )}
          </motion.div>

          <motion.p
            className="cs-mailto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {txt.meanwhile}{" "}
            <a href="mailto:contact@nod-consulting.com">contact@nod-consulting.com</a>
          </motion.p>

          <motion.div
            className="cs-social-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="cs-social-label">{txt.follow}</p>
            <div className="cs-social-icons">
              <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      <footer className="cs-footer">© 2026 NOD CONSULTING</footer>
    </div>
  );
};

export default ComingSoon;