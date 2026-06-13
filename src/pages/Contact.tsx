import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "@/components/Navbar";

// ⬇️ Remplace par l'URL de ta Edge Function contact-form
const CONTACT_URL = "https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/contact-form";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) {
      errs.name = language === "fr" ? "Le nom est requis." : "Name is required.";
    }
    if (!form.email.trim()) {
      errs.email = language === "fr" ? "L'email est requis." : "Email is required.";
    } else if (!isValidEmail(form.email)) {
      errs.email = language === "fr" ? "Le format de l'email n'est pas valide." : "Invalid email format.";
    }
    if (!form.message.trim()) {
      errs.message = language === "fr" ? "Le message est requis." : "Message is required.";
    }
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
        }),
      });

      const data = await res.json();

      if (data.status === "ok") {
        setSent(true);
      } else {
        throw new Error(data.message);
      }
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

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const txt = language === "fr" ? {
    title: "Contact",
    sub: "Un projet en tête ? Une question ? Écrivez-nous.",
    name: "Nom",
    namePh: "Votre nom",
    email: "Email",
    emailPh: "votre@email.com",
    phone: "Téléphone",
    phonePh: "Votre numéro (optionnel)",
    message: "Message",
    messagePh: "Parlez-nous de votre projet…",
    send: "Envoyer",
    sending: "Envoi en cours…",
    success: "Message bien reçu.\nOn revient vers vous rapidement.",
    rgpd: "Vos données sont utilisées uniquement pour vous répondre.",
  } : {
    title: "Contact",
    sub: "Got a project? A question? Write to us.",
    name: "Name",
    namePh: "Your name",
    email: "Email",
    emailPh: "your@email.com",
    phone: "Phone",
    phonePh: "Your number (optional)",
    message: "Message",
    messagePh: "Tell us about your project…",
    send: "Send",
    sending: "Sending…",
    success: "Message received.\nWe'll get back to you shortly.",
    rgpd: "Your data is only used to respond to your message.",
  };

  return (
    <div className="cs-page">
      <Navbar />

      <section className="cs-contact-page">
        <div className="cs-contact-inner">

          <motion.h1
            className="cs-contact-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {txt.title}
          </motion.h1>

          <motion.p
            className="cs-contact-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {txt.sub}
          </motion.p>

          {!sent ? (
            <motion.div
              className="cs-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="cs-field">
                <label htmlFor="ct-name">{txt.name} *</label>
                <input
                  id="ct-name"
                  type="text"
                  placeholder={txt.namePh}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
                {errors.name && <span className="cs-field-error">{errors.name}</span>}
              </div>

              <div className="cs-field">
                <label htmlFor="ct-email">{txt.email} *</label>
                <input
                  id="ct-email"
                  type="email"
                  placeholder={txt.emailPh}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {errors.email && <span className="cs-field-error">{errors.email}</span>}
              </div>

              <div className="cs-field">
                <label htmlFor="ct-phone">{txt.phone}</label>
                <input
                  id="ct-phone"
                  type="tel"
                  placeholder={txt.phonePh}
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div className="cs-field">
                <label htmlFor="ct-message">{txt.message} *</label>
                <textarea
                  id="ct-message"
                  placeholder={txt.messagePh}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                />
                {errors.message && <span className="cs-field-error">{errors.message}</span>}
              </div>

              {sendError && <span className="cs-field-error">{sendError}</span>}

              <button
                className="cs-send-btn"
                onClick={handleSubmit}
                disabled={sending}
              >
                {sending ? txt.sending : txt.send}
              </button>

              <span className="cs-rgpd">{txt.rgpd}</span>
            </motion.div>
          ) : (
            <motion.p
              className="cs-contact-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {txt.success}
            </motion.p>
          )}

          <div className="cs-contact-socials">
            <a href="mailto:contact@nod-consulting.com" className="cs-contact-mailto">
              contact@nod-consulting.com
            </a>
            <div className="cs-social-icons">
              <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>
      </section>

      <footer className="cs-footer">© 2026 NOD CONSULTING</footer>
    </div>
  );
};

export default Contact;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { Navbar } from '@/components/Navbar';
// import { Footer } from '@/components/Footer';
// import { NodSmile } from '@/components/NodSmile';
// import { z } from 'zod';

// const contactSchema = z.object({
//   name: z.string().trim().min(1, 'Required').max(100),
//   email: z.string().trim().email('Invalid email').max(255),
//   subject: z.string().trim().min(1, 'Required').max(200),
//   message: z.string().trim().min(1, 'Required').max(2000),
// });

// type FormData = z.infer<typeof contactSchema>;

// const Contact: React.FC = () => {
//   const { t } = useLanguage();
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name as keyof FormData]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');

//     const result = contactSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors: Partial<Record<keyof FormData, string>> = {};
//       result.error.errors.forEach((err) => {
//         const path = err.path[0] as keyof FormData;
//         fieldErrors[path] = err.message;
//       });
//       setErrors(fieldErrors);
//       setStatus('idle');
//       return;
//     }

//     // Simulate form submission (in production, connect to an API)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setStatus('success');
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     } catch {
//       setStatus('error');
//     }
//   };

//   return (
//     <div className="relative min-h-screen">
//       <Navbar />
      
//       <main className="relative z-10 pt-32 md:pt-40 section-padding">
//         <div className="content-container">
//           <div className="max-w-2xl mx-auto">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <NodSmile size={60} color="orange" className="mx-auto mb-8" />
//               <h1 className="text-editorial-lg mb-4">{t('contact.title')}</h1>
//               <p className="text-body-lg text-muted-foreground">{t('contact.subtitle')}</p>
//             </motion.div>

//             <motion.form
//               onSubmit={handleSubmit}
//               className="space-y-8"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder={t('contact.name')}
//                   className="input-premium"
//                 />
//                 {errors.name && <p className="text-destructive text-sm mt-2">{errors.name}</p>}
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder={t('contact.email')}
//                   className="input-premium"
//                 />
//                 {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder={t('contact.subject')}
//                   className="input-premium"
//                 />
//                 {errors.subject && <p className="text-destructive text-sm mt-2">{errors.subject}</p>}
//               </div>

//               <div>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder={t('contact.message')}
//                   rows={6}
//                   className="input-premium resize-none"
//                 />
//                 {errors.message && <p className="text-destructive text-sm mt-2">{errors.message}</p>}
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={status === 'loading'}
//                   className="btn-premium w-full md:w-auto"
//                 >
//                   <span>
//                     {status === 'loading' ? '...' : t('contact.send')}
//                   </span>
//                 </button>
//               </div>

//               {status === 'success' && (
//                 <motion.p
//                   className="text-primary text-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   {t('contact.success')}
//                 </motion.p>
//               )}

//               {status === 'error' && (
//                 <motion.p
//                   className="text-destructive text-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   {t('contact.error')}
//                 </motion.p>
//               )}
//             </motion.form>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;


