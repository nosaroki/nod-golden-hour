import { useState } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Checkbox, Eyebrow, Icon, Input, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import gradientFold from '@/assets/brand/gradient-fold-yellow.webp';

/* Contact. Forme du design system, branchement inchangé : la fonction Supabase
   contact-form stocke la demande puis envoie le mail via Resend. */

const CONTACT_URL = 'https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/contact-form';

interface Formulaire {
  name: string;
  email: string;
  phone: string;
  message: string;
  brochure: boolean;
  website: string;
}

const FAQ_FR = [
  {
    q: 'Tu travailles seule ?',
    a: "Oui. C'est le principe : une seule interlocutrice du début à la fin. Quand un projet demande une compétence que je n'ai pas, je fais appel à un cercle de créatifs choisis, mais tu n'as jamais qu'un seul contact.",
  },
  {
    q: 'Combien ça coûte ?',
    a: "Ça dépend de ce que le projet demande. Une direction de marque démarre autour de 2 400 €, une identité complète autour de 4 800 €, un site sur mesure autour de 7 200 €. Écris-moi avec deux lignes sur ton projet et je te réponds avec une fourchette.",
  },
  {
    q: 'Combien de temps ça prend ?',
    a: "Trois semaines pour une direction de marque, six pour une identité complète, huit pour un site. Un accompagnement de lancement complet se compte en mois.",
  },
  {
    q: 'Je peux prendre juste une partie ?',
    a: "Oui. Beaucoup de projets commencent par la stratégie seule, ou par l'identité seule. L'ensemble tient mieux quand tout est mené d'une même main, mais rien ne t'oblige à tout prendre d'un coup.",
  },
  {
    q: "Je n'ai ni nom, ni logo, ni site. C'est trop tôt ?",
    a: "Non, c'est même le meilleur moment. Poser la direction avant tout le reste évite de construire sur une base qu'il faudra défaire.",
  },
  {
    q: 'Comment ça commence ?',
    a: "Tu remplis le formulaire. Je reviens vers toi sous 24 h avec mes questions, on échange, je t'envoie un devis. À la signature et au premier acompte, le projet démarre.",
  },
];

const FAQ_EN = [
  { q: 'Do you work alone?', a: 'Yes. One single contact from beginning to end. When a project needs a skill I do not have, I call on a chosen circle of creatives, but you always have one contact.' },
  { q: 'What does it cost?', a: 'It depends on the project. Brand direction starts around €2,400, a full identity around €4,800, a custom site around €7,200. Write two lines about your project and I will answer with a range.' },
  { q: 'How long does it take?', a: 'Three weeks for brand direction, six for a full identity, eight for a site. A full launch runs over months.' },
  { q: 'Can I take only part of it?', a: 'Yes. Many projects start with strategy alone, or identity alone.' },
  { q: 'I have no name, no logo, no site. Is it too early?', a: 'No, it is the best moment. Setting the direction first avoids building on a base you will have to undo.' },
  { q: 'How does it start?', a: 'Fill in the form. I come back within 24 h with questions, we talk, I send a quote. Once signed, the project starts.' },
];

export default function Contact() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);

  const [form, setForm] = useState<Formulaire>({ name: '', email: '', phone: '', message: '', brochure: false, website: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [envoye, setEnvoye] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState('');
  const [faqOuverte, setFaqOuverte] = useState<number | null>(null);

  const emailValide = (valeur: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur);

  const valider = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t('Le nom est requis.', 'Name is required.');
    if (!form.email.trim()) errs.email = t("L'email est requis.", 'Email is required.');
    else if (!emailValide(form.email)) errs.email = t("Le format de l'email n'est pas valide.", 'Invalid email format.');
    if (!form.message.trim()) errs.message = t('Le message est requis.', 'Message is required.');
    return errs;
  };

  const envoyer = async (event: React.FormEvent) => {
    event.preventDefault();
    const errs = valider();
    setErrors(errs);
    setErreurEnvoi('');
    if (Object.keys(errs).length > 0) return;

    setEnvoi(true);
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'ok') setEnvoye(true);
      else throw new Error(data.message);
    } catch {
      setErreurEnvoi(
        t(
          "L'envoi a échoué. Réessaie, ou écris directement à contact@nod-consulting.com.",
          'Sending failed. Try again, or write directly to contact@nod-consulting.com.',
        ),
      );
    } finally {
      setEnvoi(false);
    }
  };

  const maj = (champ: keyof Formulaire, valeur: string | boolean) => {
    setForm({ ...form, [champ]: valeur });
    if (typeof valeur === 'string' && errors[champ]) setErrors({ ...errors, [champ]: '' });
  };

  const faq = language === 'fr' ? FAQ_FR : FAQ_EN;

  return (
    <>
      <NodNav overImage />

      <section className="page-head" style={vars({ '--nod-head-image': url(gradientFold) })}>
        <div className="page-head__image" />
        <div className="page-head__veil" />
        <div className="page-head__foot" />
        <div className="page-head__body">
          <Eyebrow tone="light">{t('Entrer en contact', 'Get in touch')}</Eyebrow>
          <h1 className="page-head__title">
            {t('Un projet en tête ?', 'A project in mind?')}
            <br />
            {t('Écris-moi.', 'Write to me.')}
          </h1>
          <p className="page-head__lede">
            {t(
              "Pas besoin d'un projet déjà ficelé. Une idée suffit pour lancer la conversation.",
              'No need for a finished project. An idea is enough to start the conversation.',
            )}
          </p>
        </div>
      </section>

      <section className="contact">
        {!envoye ? (
          <form className="contact__form" onSubmit={envoyer} noValidate>
            <Input
              label={t('Nom *', 'Name *')}
              placeholder={t('Ton petit nom (ou ton grand)', 'Your name')}
              value={form.name}
              error={errors.name}
              onChange={(e) => maj('name', e.target.value)}
            />
            <Input
              label={t('Email *', 'Email *')}
              type="email"
              placeholder="ton@email.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => maj('email', e.target.value)}
            />
            <Input
              label={t('Téléphone', 'Phone')}
              type="tel"
              placeholder={t('+33 6 12 34 56 78 (optionnel)', '+33 6 12 34 56 78 (optional)')}
              value={form.phone}
              onChange={(e) => maj('phone', e.target.value)}
            />

            <label className="nod-field">
              <span className="nod-field__label">{t('Message *', 'Message *')}</span>
              <span className={'nod-input' + (errors.message ? ' is-error' : '')}>
                <textarea
                  className="nod-input__control contact__textarea"
                  rows={6}
                  placeholder={t('Parle-moi de ton projet', 'Tell me about your project')}
                  value={form.message}
                  onChange={(e) => maj('message', e.target.value)}
                />
              </span>
              {errors.message ? <span className="nod-field__error">{errors.message}</span> : null}
            </label>

            {/* Champ piège : invisible pour un humain, rempli par les robots. */}
            <div className="contact__piege" aria-hidden="true">
              <label htmlFor="contact-website">Site web</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => maj('website', e.target.value)}
              />
            </div>

            <Checkbox
              label={t('Je veux aussi recevoir la brochure NOD par mail.', 'Also send me the NOD brochure by email.')}
              checked={form.brochure}
              onChange={(e) => maj('brochure', e.target.checked)}
            />

            {erreurEnvoi ? <span className="contact__error">{erreurEnvoi}</span> : null}

            <div className="contact__actions">
              <button type="submit" className="nod-btn nod-btn--primary nod-btn--lg" disabled={envoi}>
                {envoi ? t('Envoi en cours…', 'Sending…') : t('Envoyer', 'Send')}
                {!envoi ? <Icon name="arrow-right" size={20} /> : null}
              </button>
              <span className="contact__rgpd">
                {t('Tes données servent uniquement à te répondre.', 'Your data is only used to reply to you.')}
              </span>
            </div>
          </form>
        ) : (
          <p className="contact__success">
            {t('Message bien reçu.\nJe reviens vers toi rapidement.', "Message received.\nI'll get back to you shortly.")}
          </p>
        )}

        <aside className="contact__aside">
          <Eyebrow tone="inverse">{t('Contact direct', 'Direct contact')}</Eyebrow>
          <a href="mailto:contact@nod-consulting.com" className="contact__aside-mail">contact@nod-consulting.com</a>
          <div className="contact__socials">
            <a href="https://www.instagram.com/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/nodconsulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
          <p className="contact__slogan">NOD, say yes to new projects</p>
        </aside>
      </section>

      {/* ---------- FAQ : les objections qui empêchent d'écrire ---------- */}
      <section className="faq">
        <div className="faq__head">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="faq__title">{t('Les questions qu’on me pose avant d’écrire.', 'The questions people ask before writing.')}</h2>
        </div>
        <div className="faq__list">
          {faq.map((item, index) => {
            const ouverte = faqOuverte === index;
            return (
              <div className={'faq__item' + (ouverte ? ' is-open' : '')} key={item.q}>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={ouverte}
                  onClick={() => setFaqOuverte(ouverte ? null : index)}
                >
                  {item.q}
                  <Icon name={ouverte ? 'minus' : 'plus'} size={20} />
                </button>
                {ouverte ? <p className="faq__a">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <NodFooter />
    </>
  );
}
