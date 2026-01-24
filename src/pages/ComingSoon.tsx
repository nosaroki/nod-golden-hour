import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { NodLogo } from "@/components/NodLogo";
import { FaInstagram, FaLinkedin } from "react-icons/fa";


const ComingSoon = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Language switcher centered */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <button
          onClick={() => setLanguage("fr")}
          className={`text-sm font-medium transition-colors ${
            language === "fr"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          FR
        </button>

        <span className="text-muted-foreground">|</span>

        <button
          onClick={() => setLanguage("en")}
          className={`text-sm font-medium transition-colors ${
            language === "en"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 content-container text-center px-4">

        {/* Logo with animated gradient */}
        <motion.div
          className="flex justify-center mb-6 shimmer-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NodLogo size="hero" className="migra-font text-[clamp(4rem,10vw,8rem)]" />
          
        </motion.div>

        {/* Text Title */}
        <motion.p
          className="text-body-lg mb-6 text-muted-foreground font-bold max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("coming.title")}
        </motion.p>

        {/* Text content */}
        <motion.p
          className="text-body-lg text-muted-foreground mb-6 max-w-md mx-auto whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("coming.message")}
        </motion.p>

        <motion.p
          className="text-body-md text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("coming.contact")}{" "}
          <a
            href="mailto:contact@nod-consulting.com"
            className="text-primary hover:underline"
          >
            contact@nod-consulting.com
          </a>
        </motion.p>

        {/* Socials */}
{/* Socials */}
<div className="flex flex-col items-center gap-2 mt-8">
  <p className="text-sm font-medium text-muted-foreground">
    {language === "fr" ? "Suivez-nous" : "Follow us"}
  </p>
  <div className="flex gap-4 mt-1">
    <a
      href="https://www.instagram.com/nodconsulting/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors text-xl"
    >
      <FaInstagram />
    </a>
    <a
      href="https://www.linkedin.com/company/nodconsulting/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors text-xl"
    >
      <FaLinkedin />
    </a>
  </div>
</div>


      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/migra');

        .migra-font {
          font-family: 'Migra', 'Didot', 'Bodoni MT', serif;
          font-weight: 800;
          font-style: italic;
          letter-spacing: -0.04em;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #F55E30,
            #FF914D,
            #FFD35E,
            #FF914D,
            #F55E30
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        
      `}</style>
    </div>
  );
};

export default ComingSoon;
