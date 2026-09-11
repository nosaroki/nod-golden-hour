import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import NodFooter from "@/components/NodFooter";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

// ⬇️ Remplace par l'URL de ta Edge Function contact-form
const CONTACT_URL = "https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/contact-form";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  brochure: boolean;
}

const Contact = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "", brochure: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = language === "fr" ? "Le nom est requis." : "Name is required.";
    if (!form.email.trim()) errs.email = language === "fr" ? "L'email est requis." : "Email is required.";
    else if (!isValidEmail(form.email)) errs.email = language === "fr" ? "Le format de l'email n'est pas valide." : "Invalid email format.";
    if (!form.message.trim()) errs.message = language === "fr" ? "Le message est requis." : "Message is required.";
    return errs;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSendError("");
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          brochure: form.brochure,
        }),
      });
      const data = await res.json();
      if (data.status === "ok") setSent(true);
      else throw new Error(data.message);
    } catch {
      setSendError(
        language === "fr"
          ? "L'envoi a échoué. Réessayez ou écrivez-nous directement à contact@nod-consulting.com."
          : "Sending failed. Please try again or email us at contact@nod-consulting.com."
      );
    } finally {
      setSending(false);
    }
  };

  const update = (field: keyof ContactForm, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    if (typeof value === "string" && errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const txt = language === "fr" ? {
    title1: "Un projet en tête ?", title2: "Écris-nous.",
    intro: "Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.",
    name: "Nom *", namePh: "Ton petit nom (ou ton grand)",
    email: "Email *", emailPh: "ton@email.com",
    phone: "Téléphone", phonePh: "+33 6 12 34 56 78 (optionnel)",
    message: "Message *", messagePh: "Parle-nous de ton projet",
    brochure: "Je veux aussi recevoir la brochure NOD par mail.",
    send: "Envoyer", sending: "Envoi en cours…",
    rgpd: "Tes données servent uniquement à te répondre.",
    success: "Message bien reçu.\nOn revient vers toi rapidement.",
    directLabel: "Contact direct",
  } : {
    title1: "Got a project?", title2: "Write to us.",
    intro: "No need for a polished project. An idea is enough to start the conversation.",
    name: "Name *", namePh: "Your name",
    email: "Email *", emailPh: "you@email.com",
    phone: "Phone", phonePh: "+33 6 12 34 56 78 (optional)",
    message: "Message *", messagePh: "Tell us about your project…",
    brochure: "Also send me the NOD brochure by email.",
    send: "Send", sending: "Sending…",
    rgpd: "Your data is only used to reply to you.",
    success: "Message received.\nWe'll get back to you shortly.",
    directLabel: "Direct contact",
  };

  return (
    <div className="page">
      <Navbar />

      <section className="ct">
        <motion.header
          className="ct__head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="ct__title">{txt.title1} <i>{txt.title2}</i></h1>
          <p className="ct__intro">{txt.intro}</p>
        </motion.header>

        <div className="ct__grid">
          {!sent ? (
            <motion.div
              className="ct__form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="ct__field">
                <label htmlFor="ct-name">{txt.name}</label>
                <input id="ct-name" type="text" placeholder={txt.namePh} value={form.name} onChange={(e) => update("name", e.target.value)} />
                {errors.name && <span className="ct__err">{errors.name}</span>}
              </div>
              <div className="ct__field">
                <label htmlFor="ct-email">{txt.email}</label>
                <input id="ct-email" type="email" placeholder={txt.emailPh} value={form.email} onChange={(e) => update("email", e.target.value)} />
                {errors.email && <span className="ct__err">{errors.email}</span>}
              </div>
              <div className="ct__field">
                <label htmlFor="ct-phone">{txt.phone}</label>
                <input id="ct-phone" type="tel" placeholder={txt.phonePh} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div className="ct__field">
                <label htmlFor="ct-message">{txt.message}</label>
                <textarea id="ct-message" placeholder={txt.messagePh} value={form.message} onChange={(e) => update("message", e.target.value)} />
                {errors.message && <span className="ct__err">{errors.message}</span>}
              </div>

              <label className="ct__check">
                <input type="checkbox" checked={form.brochure} onChange={(e) => update("brochure", e.target.checked)} />
                <span>{txt.brochure}</span>
              </label>

              {sendError && <span className="ct__err">{sendError}</span>}

              <div className="ct__actions">
                <button className="ct__send" onClick={handleSubmit} disabled={sending}>
                  {sending ? txt.sending : txt.send}
                </button>
                <span className="ct__rgpd">{txt.rgpd}</span>
              </div>
            </motion.div>
          ) : (
            <motion.p className="ct__success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {txt.success}
            </motion.p>
          )}

          <aside className="ct__card">
            <p className="ct__card-label">{txt.directLabel}</p>
            <a href="mailto:contact@nod-consulting.com" className="ct__mail-card">contact@nod-consulting.com</a>
            <div className="ct__card-socials">
              <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
            <p className="ct__card-slogan">
              <span className="serif i">NOD,</span>{" "}
              <span className="slogan-grad">say <b>yes</b> to new projects</span>
            </p>
          </aside>
        </div>
      </section>

      <NodFooter />
    </div>
  );
};

export default Contact;
