import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NodNav from '@/components/NodNav';
import NodFooter from '@/components/NodFooter';
import { Eyebrow, Icon, url, vars } from '@/components/nod';
import { useLanguage } from '@/contexts/LanguageContext';
import { DUO_STRATEGIE, GROUPES, LANCEMENTS, SEUIL_LANCEMENT, type Ligne } from './estimation-data';

/* Estimation. On coche ce dont le projet a besoin. Les prix ne s'affichent pas
   sur la page : le détail chiffré et le total partent par mail. */
const papier = '/img/crumpled-paper.webp';
const ESTIMATION_URL = 'https://wzqbtihxdjgqovtjebrj.supabase.co/functions/v1/estimation';

const SITES = ['site-simple', 'site-etoffe', 'site-complet', 'plateforme'];

const euros = (n: number) => n.toLocaleString('fr-FR').replace(/[  \s]/g, ' ') + ' €';

export default function Estimation() {
  const { language } = useLanguage();
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en);
  const [choisis, setChoisis] = useState<string[]>([]);

  const toutes = useMemo(() => {
    const m = new Map<string, Ligne>();
    GROUPES.forEach((g) => g.sous.forEach((s) => s.lignes.forEach((l) => m.set(l.id, l))));
    return m;
  }, []);

  const siteChoisi = choisis.some((id) => SITES.includes(id));
  const plateforme = choisis.includes('plateforme');
  const IDS_LANCEMENT = LANCEMENTS.map((l) => l.id);
  const toutConfier = choisis.some((id) => IDS_LANCEMENT.includes(id));
  const OPTIONS = GROUPES.find((g) => g.id === 'options')!.sous[0].lignes.map((l) => l.id);

  const choisirLancement = (id: string, defiler = false) => {
    setChoisis((avant) => (avant.includes(id) ? [] : [id]));
    if (defiler) document.getElementById('est-tout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const basculer = (ligne: Ligne, voisines: Ligne[], unique?: boolean) => {
    setChoisis((avant) => {
      if (avant.includes(ligne.id)) {
        let apres = avant.filter((id) => id !== ligne.id);
        /* Sans site, les options n'ont plus lieu d'être. */
        if (SITES.includes(ligne.id)) apres = apres.filter((id) => !OPTIONS.includes(id));
        return apres;
      }
      let apres = unique ? avant.filter((id) => !voisines.some((v) => v.id === id)) : avant;
      /* La plateforme sur mesure comprend déjà ses fonctionnalités : tout passe sur devis. */
      if (ligne.id === 'plateforme') apres = apres.filter((id) => !OPTIONS.includes(id));
      return [...apres.filter((id) => !IDS_LANCEMENT.includes(id)), ligne.id];
    });
  };

  /* Lignes du récapitulatif, dans l'ordre de la page. */
  const recap = useMemo(() => {
    const lignes: { nom: string; ids: string[]; prix: number | null; mensuel?: boolean; annuel?: boolean }[] = [];
    const lancement = LANCEMENTS.find((l) => choisis.includes(l.id));
    if (lancement) return [{ nom: t(`Lancement complet, ${lancement.fr.toLowerCase()}`, `Full launch, ${lancement.en.toLowerCase()}`), ids: [lancement.id], prix: lancement.prix }];
    const duo = DUO_STRATEGIE.ids.every((id) => choisis.includes(id));
    GROUPES.forEach((g) => g.sous.forEach((s) => s.lignes.forEach((l) => {
      if (!choisis.includes(l.id)) return;
      if (duo && DUO_STRATEGIE.ids.includes(l.id)) {
        if (l.id === DUO_STRATEGIE.ids[0]) lignes.push({ nom: t(DUO_STRATEGIE.fr, DUO_STRATEGIE.en), ids: DUO_STRATEGIE.ids, prix: DUO_STRATEGIE.prix });
        return;
      }
      lignes.push({ nom: t(l.fr, l.en), ids: [l.id], prix: l.prix, mensuel: l.mensuel, annuel: l.annuel });
    })));
    return lignes;
  }, [choisis, language]); // eslint-disable-line react-hooks/exhaustive-deps

  const unique = recap.filter((l) => !l.mensuel && !l.annuel && l.prix !== null).reduce((s, l) => s + (l.prix ?? 0), 0);
  const mensuel = recap.filter((l) => l.mensuel).reduce((s, l) => s + (l.prix ?? 0), 0);
  const annuel = recap.filter((l) => l.annuel).reduce((s, l) => s + (l.prix ?? 0), 0);
  const gere = choisis.includes('gestion-annuelle');
  const surDevis = recap.some((l) => l.prix === null);
  const vide = recap.length === 0;

  const prixLigne = (prix: number | null, mois?: boolean, an?: boolean) =>
    prix === null
      ? t('Sur devis', 'On quote')
      : euros(prix) + (mois ? t(' / mois', ' / month') : an ? t(' / an', ' / year') : '');

  /* Envoi : la fonction estimation recalcule les prix à partir des identifiants
     et envoie le récapitulatif par mail, à la personne et à NOD. */
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [piege, setPiege] = useState('');
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'ok' | 'erreur' | 'invalide'>('repos');
  const [ouvert, setOuvert] = useState(false);

  const idsOrdonnes = [
    ...LANCEMENTS.map((l) => l.id),
    ...GROUPES.flatMap((g) => g.sous.flatMap((s) => s.lignes.map((l) => l.id))),
  ].filter((id) => choisis.includes(id));

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setEtat('invalide'); return; }
    setEtat('envoi');
    try {
      const res = await fetch(ESTIMATION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), prenom: prenom.trim(), ids: idsOrdonnes, langue: language, website: piege }),
      });
      const data = await res.json();
      setEtat(data.status === 'ok' ? 'ok' : 'erreur');
    } catch {
      setEtat('erreur');
    }
  };

  return (
    <>
      <NodNav overImage />

      <section className="page-head page-head--estimation" style={vars({ '--nod-head-image': url(papier) })}>
        <div className="page-head__image" />
        <div className="page-head__veil" />
        <div className="page-head__foot" />
        <div className="page-head__body">
          <Eyebrow tone="light">{t('Estimation', 'Estimate')}</Eyebrow>
          <h1 className="page-head__title">{t('Une première idée du budget.', 'A first idea of the budget.')}</h1>
          <p className="page-head__lede">
            {t(
              'Choisis ce dont ton projet a besoin et reçois ton estimation par mail.',
              'Pick what your project needs and get your estimate by email.',
            )}
          </p>
        </div>
      </section>

      <section className="est">
        <div className="est__grille">
          <div className="est__choix">
            <section className="est-groupe est-tout" id="est-tout" aria-labelledby="est-tout-titre">
              <p className="est-groupe__repere">{t('Tout confier', 'Hand it all over')}</p>
              <h2 className="est-groupe__titre" id="est-tout-titre">{t('Tu veux tout confier ?', 'Want to hand it all over?')}</h2>
              <p className="est-groupe__intro">{t('Le lancement complet, en deux formats.', 'The full launch, in two formats.')}</p>
              <ul className="est-liste">
                {LANCEMENTS.map((l) => {
                  const on = choisis.includes(l.id);
                  return (
                    <li key={l.id}>
                      <button type="button" className={'est-ligne' + (on ? ' is-on' : '')} aria-pressed={on} onClick={() => choisirLancement(l.id)}>
                        <span className="est-ligne__point" aria-hidden="true" />
                        <span className="est-ligne__texte">
                          <span className="est-ligne__nom">{t(l.fr, l.en)}</span>
                          <span className="est-ligne__desc">{t(l.dFr, l.dEn)}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {toutConfier ? (
                <p className="est-tout__note">
                  {t(
                    'Le lancement complet comprend tout le reste : le détail se construit avec toi lors du premier échange.',
                    'The full launch covers everything else: the details are built with you in our first conversation.',
                  )}
                </p>
              ) : (
                <p className="est-tout__ou">{t('Ou choisis pièce par pièce :', 'Or pick piece by piece:')}</p>
              )}
            </section>

            {!toutConfier && GROUPES.map((g) => {
              if (g.id === 'options' && (!siteChoisi || plateforme)) return null;
              return (
                <section className="est-groupe" key={g.id} aria-labelledby={`est-${g.id}`}>
                  <p className="est-groupe__repere">{t(g.repereFr, g.repereEn)}</p>
                  <h2 className="est-groupe__titre" id={`est-${g.id}`}>{t(g.fr, g.en)}</h2>
                  <p className="est-groupe__intro">{t(g.introFr, g.introEn)}</p>
                  {g.sous.map((s, i) => (
                    <div className="est-sous" key={i}>
                      {s.fr ? (
                        <h3 className="est-sous__titre">
                          {t(s.fr, s.en ?? s.fr)}
                          {s.unique ? <span>{t('Une formule au choix', 'One plan')}</span> : null}
                        </h3>
                      ) : null}
                      <ul className="est-liste">
                        {s.lignes.map((l) => {
                          const on = choisis.includes(l.id);
                          return (
                            <li key={l.id}>
                              <button
                                type="button"
                                className={'est-ligne' + (on ? ' is-on' : '')}
                                aria-pressed={on}
                                onClick={() => basculer(l, s.lignes, s.unique)}
                              >
                                <span className="est-ligne__point" aria-hidden="true" />
                                <span className="est-ligne__texte">
                                  <span className="est-ligne__nom">{t(l.fr, l.en)}</span>
                                  <span className="est-ligne__desc">{t(l.dFr, l.dEn)}</span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            })}
          </div>

          <aside className={'est-resume' + (vide ? ' is-vide' : '') + (ouvert ? ' is-ouvert' : '')} aria-live="polite">
            <p className="est-resume__repere">{t('Ton estimation', 'Your estimate')}</p>

            {vide ? (
              <p className="est-resume__vide">
                {t('Sélectionne ce dont tu as besoin : le détail chiffré et le total t’arrivent par mail.', 'Select what you need: the itemised prices and the total come to you by email.')}
              </p>
            ) : (
              <ul className="est-resume__liste">
                {recap.map((l) => (
                  <li key={l.nom}>
                    <span className="est-resume__point" aria-hidden="true" />
                    <span className="est-resume__nom">{l.nom}</span>
                    <button
                      type="button"
                      className="est-resume__retirer"
                      aria-label={t(`Retirer ${l.nom}`, `Remove ${l.nom}`)}
                      onClick={() => setChoisis((avant) => avant.filter((id) => !l.ids.includes(id) && !(l.ids.some((x) => SITES.includes(x)) && OPTIONS.includes(id))))}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="est-resume__compte">
              {recap.length === 0
                ? t('Aucune prestation choisie', 'Nothing selected yet')
                : recap.length === 1
                  ? t('1 prestation choisie', '1 service selected')
                  : t(`${recap.length} prestations choisies`, `${recap.length} services selected`)}
            </p>

            {!toutConfier && unique >= SEUIL_LANCEMENT ? (
              <p className="est-resume__conseil">
                {t(
                  'À ce niveau, le lancement complet peut être plus juste : NOD prend la direction de tout le projet.',
                  'At this level, a full launch may fit better: NOD leads the whole project.',
                )}{' '}
                <button type="button" onClick={() => choisirLancement('lancement-court', true)}>{t('Voir le lancement complet', 'See the full launch')}</button>
              </p>
            ) : null}

            {(siteChoisi || toutConfier) && !gere ? (
              <p className="est-resume__frais">
                {t(
                  "À prévoir en plus : nom de domaine, hébergement, adresses mail. Tu les paies directement aux fournisseurs, ou je m'en occupe pour toi (Autour du site).",
                  'On top: domain name, hosting, email addresses. You pay the providers directly, or I take care of them for you (Around the website).',
                )}
              </p>
            ) : null}

            {etat === 'ok' ? (
              <p className="est-resume__merci" role="status">
                {t(
                  "C'est envoyé. Ton estimation est dans ta boîte mail, je reviens vers toi très vite.",
                  "Sent. Your estimate is in your inbox, I'll get back to you very soon.",
                )}
              </p>
            ) : (
              <form className="est-resume__form" onSubmit={envoyer} noValidate>
                <label className="est-resume__label" htmlFor="est-prenom">{t('Ton prénom', 'Your first name')}</label>
                <input id="est-prenom" type="text" autoComplete="given-name" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                <label className="est-resume__label" htmlFor="est-email">{t('Ton email *', 'Your email *')}</label>
                <input
                  id="est-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('ton@email.com', 'your@email.com')}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (etat !== 'envoi') setEtat('repos'); }}
                />
                <input className="est-resume__piege" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={piege} onChange={(e) => setPiege(e.target.value)} />
                {etat === 'invalide' || etat === 'erreur' ? (
                  <p className="est-resume__err" role="alert">
                    {etat === 'invalide'
                      ? t('Cette adresse ne semble pas valide.', "This address doesn't look valid.")
                      : t("L'envoi a échoué, réessaie dans un instant.", 'Sending failed, please try again shortly.')}
                  </p>
                ) : null}
                <button type="submit" className="nod-btn nod-btn--primary est-resume__envoyer" disabled={vide || etat === 'envoi'}>
                  {etat === 'envoi' ? t('Envoi…', 'Sending…') : t('Recevoir mon estimation', 'Get my estimate')}
                  {etat !== 'envoi' ? <Icon name="arrow-right" size={18} /> : null}
                </button>
              </form>
            )}
            <button type="button" className="nod-btn nod-btn--primary est-resume__ouvrir" disabled={vide} onClick={() => setOuvert(!ouvert)}>
              {ouvert ? t('Fermer', 'Close') : t('Recevoir', 'Get it')}
            </button>
            {!vide ? (
              <button type="button" className="est-resume__effacer" onClick={() => setChoisis([])}>
                {t('Tout effacer', 'Clear all')}
              </button>
            ) : null}
            <p className="est-resume__note">
              {t('Ceci est une estimation. Seul un devis, établi après un premier échange, fixera le prix final de ton projet.', 'This is an estimate. Only a quote, drawn up after a first conversation, will set the final price of your project.')}{' '}
              <Link to="/contact">{t('Une question ? Écris-moi.', 'A question? Write to me.')}</Link>
            </p>
          </aside>
        </div>
      </section>

      <NodFooter />
    </>
  );
}
