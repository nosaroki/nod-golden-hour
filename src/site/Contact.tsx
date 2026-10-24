import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    a: "Chaque projet a son devis, construit sur ce qu'il demande vraiment. Écris-moi deux lignes sur ton projet : je te réponds avec une fourchette.",
  },
  {
    q: 'Combien de temps ça prend ?',
    a: "Trois semaines pour une direction de marque, six pour une identité complète, huit pour un site. Un accompagnement de lancement complet se compte en mois.",
  },
  {
    q: "Je n'ai ni nom, ni logo, ni site. C'est trop tôt ?",
    a: "Non, c'est même le meilleur moment. Poser la direction avant tout le reste évite de construire sur une base qu'il faudra défaire.",
  },
  {
    q: "Tu utilises l'IA ?",
    a: "Oui, comme un outil parmi d'autres : pour prototyper, produire des visuels ou automatiser ce qui peut l'être. Jamais à la place de la direction créative, qui reste humaine du début à la fin.",
  },
  {
    q: 'Comment ça commence ?',
    a: "Tu remplis le formulaire. Je reviens vers toi dans les meilleurs délais avec mes questions. On échange, je t'envoie un devis. À la signature et au premier acompte, le projet démarre.",
  },
];

const FAQ_EN = [
  { q: 'Do you work alone?', a: 'Yes. One single contact from beginning to end. When a project needs a skill I do not have, I call on a chosen circle of creatives, but you always have one contact.' },
  { q: 'What does it cost?', a: 'Every project gets its own quote, built on what it really needs. Write two lines about your project: I will answer with a range.' },
  { q: 'How long does it take?', a: 'Three weeks for brand direction, six for a full identity, eight for a site. A full launch runs over months.' },
  { q: 'I have no name, no logo, no site. Is it too early?', a: 'No, it is the best moment. Setting the direction first avoids building on a base you will have to undo.' },
  { q: 'Do you use AI?', a: 'Yes, as one tool among others: to prototype, produce visuals or automate what can be. Never in place of creative direction, which stays human from start to finish.' },
  { q: 'How does it start?', a: 'Fill in the form. I come back to you as soon as possible with questions. We talk, I send a quote. Once signed, the project starts.' },
];

export default function Contact() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);

  const [form, setForm] = useState<Formulaire>({ name: '', email: '', phone: '', message: '', brochure: false, website: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /* form : le formulaire. sortie : il s'efface (0,5 s). recu : l'écran de confirmation. */
  const [etape, setEtape] = useState<'form' | 'sortie' | 'recu'>('form');
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
        body: JSON.stringify({ ...form, langue: language }),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setEtape(calme ? 'recu' : 'sortie');
        if (!calme) window.setTimeout(() => setEtape('recu'), 520);
      }
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
  const prenom = (form.name.trim().split(/\s+/)[0] || '').replace(/^./, (c) => c.toUpperCase());

  /* Pendant que le formulaire s'efface, la page remonte : l'en-tête va
     s'agrandir jusqu'à occuper tout l'écran. */
  useEffect(() => {
    if (etape === 'form') return;
    const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: calme ? 'auto' : 'smooth' });
  }, [etape]);

  return (
    <>
      <NodNav overImage />

      <section
        className={'page-head contact-head' + (etape !== 'form' ? ' is-sortie' : '') + (etape === 'recu' ? ' is-recu' : '')}
        style={vars({ '--nod-head-image': url(gradientFold) })}
      >
        <div className="page-head__image" />
        <div className="page-head__veil" />
        <div className="page-head__foot" />

        {etape !== 'recu' ? (
          <div className="page-head__body contact-head__depart">
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
        ) : (
          <div className="page-head__body contact-head__arrivee" role="status">
            <h1 className="page-head__title contact-head__titre">
              {prenom
                ? t(`Merci ${prenom}, ton message est bien arrivé.`, `Thank you ${prenom}, your message has arrived.`)
                : t('Merci, ton message est bien arrivé.', 'Thank you, your message has arrived.')}
            </h1>
            <p className="page-head__lede">
              {t(
                "Je reviens vers toi dans les meilleurs délais. Le récapitulatif t'attend dans ta boîte mail.",
                "I'll get back to you as soon as possible. A summary is waiting in your inbox.",
              )}
            </p>
            <div className="page-hero__actions">
              <Link to="/travail" className="nod-btn nod-btn--inverse nod-btn--lg">
                {t('Voir le travail', 'See the work')} <Icon name="arrow-right" size={20} />
              </Link>
              <Link to="/" className="nod-btn nod-btn--on-image nod-btn--lg">
                {t("Retour à l'accueil", 'Back to home')}
              </Link>
            </div>
          </div>
        )}
      </section>

      {etape !== 'recu' ? (
      <>
      <section className={'contact' + (etape === 'sortie' ? ' is-sortie' : '')}>
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

            {/* À RETIRER AU LANCEMENT si la brochure n'est pas prête : la case
                n'envoie encore rien. */}
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

      </section>

      {/* ---------- FAQ : les objections qui empêchent d'écrire ---------- */}
      <section className={'faq' + (etape === 'sortie' ? ' is-sortie' : '')}>
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
      </>
      ) : null}

      <NodFooter />
    </>
  );
}
