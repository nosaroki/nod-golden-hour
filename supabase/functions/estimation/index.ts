
// Outils partagés par les fonctions du site : origine autorisée, échappement
// HTML, limite d'envois par adresse IP.

const ORIGINES = [
  /^https:\/\/(www\.)?nod-consulting\.com$/,
  /^https:\/\/nod-golden-hour[a-z0-9-]*\.vercel\.app$/,
  /^https:\/\/nod-consulting\.[a-z0-9-]+\.workers\.dev$/,
  /^http:\/\/localhost:\d+$/,
];

function enTetes(req: Request): Record<string, string> {
  const origine = req.headers.get("origin") ?? "";
  const ok = ORIGINES.some((r) => r.test(origine));
  return {
    "Access-Control-Allow-Origin": ok ? origine : "https://nod-consulting.com",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

function origineAutorisee(req: Request): boolean {
  const origine = req.headers.get("origin");
  return !!origine && ORIGINES.some((r) => r.test(origine));
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,24}$/i;

// Limite simple en mémoire : 5 envois par IP et par heure. Elle ne survit pas
// au redémarrage de la fonction, le champ piège fait le reste.
const envois = new Map<string, number[]>();
function tropDEnvois(req: Request, max = 5, fenetreMs = 3600_000): boolean {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < fenetreMs);
  recents.push(maintenant);
  envois.set(ip, recents);
  return recents.length > max;
}

function reponse(corps: unknown, statut: number, entetes: Record<string, string>) {
  return new Response(JSON.stringify(corps), { status: statut, headers: entetes });
}


// Le vrai logo NOD (dégradé rouge, orange, jaune), joint au mail en image
// intégrée : Gmail n'affiche ni le SVG ni les images en data URI.
const LOGO_PNG = "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";

const C = {
  creme: "#FFF0E5",
  papier: "#FFFAF6",
  nuit: "#112542",
  doux: "#5B6478",
  rouge: "#F55F31",
  orange: "#FF914D",
  jaune: "#FFD35F",
  filet: "#F1D9C7",
};
const SERIF = "Spectral, Georgia, 'Times New Roman', serif";
const SANS = "'Bricolage Grotesque', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Tarifs de départ, copie de src/site/estimation-data.ts : le prix est
// recalculé ici à partir des identifiants, jamais repris tel quel du navigateur.
// À mettre à jour en même temps que la page Estimation.
type Tarif = { fr: string; en: string; prix: number | null; mensuel?: boolean; annuel?: boolean };
const TARIFS: Record<string, Tarif> = {
 "lancement-court": {
  "fr": "Lancement complet, format court",
  "en": "Full launch, short format",
  "prix": 8000
 },
 "lancement-complet": {
  "fr": "Lancement complet, accompagnement complet",
  "en": "Full launch, full support",
  "prix": 15000
 },
 "cadrage": {
  "fr": "Cadrage stratégique",
  "en": "Strategic framing",
  "prix": 1800
 },
 "identite": {
  "fr": "Identité de marque",
  "en": "Brand identity",
  "prix": 3500
 },
 "audit-positionnement": {
  "fr": "Audit et positionnement",
  "en": "Audit and positioning",
  "prix": 900
 },
 "strategie-contenu": {
  "fr": "Stratégie de contenu",
  "en": "Content strategy",
  "prix": 900
 },
 "audit-reseaux": {
  "fr": "Audit des réseaux",
  "en": "Social media audit",
  "prix": 400
 },
 "site-simple": {
  "fr": "Vitrine simple",
  "en": "One-page website",
  "prix": 1200
 },
 "site-etoffe": {
  "fr": "Vitrine étoffée",
  "en": "Standard website",
  "prix": 2000
 },
 "site-complet": {
  "fr": "Vitrine complète",
  "en": "Full website",
  "prix": 3500
 },
 "plateforme": {
  "fr": "Plateforme sur mesure",
  "en": "Custom platform",
  "prix": null
 },
 "multilingue": {
  "fr": "Site multilingue",
  "en": "Multilingual website",
  "prix": 300
 },
 "reservation": {
  "fr": "Réservation sur mesure",
  "en": "Custom booking",
  "prix": 350
 },
 "paiement": {
  "fr": "Paiement en ligne",
  "en": "Online payment",
  "prix": 600
 },
 "donnees": {
  "fr": "Données et espaces utilisateurs",
  "en": "Data and user accounts",
  "prix": 1500
 },
 "ia": {
  "fr": "Intégration IA",
  "en": "AI integration",
  "prix": 800
 },
 "sur-mesure": {
  "fr": "Fonctionnalité sur mesure",
  "en": "Custom feature",
  "prix": null
 },
 "gestion-annuelle": {
  "fr": "Domaine, hébergement et mails",
  "en": "Domain, hosting and email",
  "prix": 150,
  "annuel": true
 },
 "audit-seo": {
  "fr": "Audit SEO",
  "en": "SEO audit",
  "prix": 350
 },
 "optimisation-seo": {
  "fr": "Optimisation SEO",
  "en": "SEO optimisation",
  "prix": 600
 },
 "pack-posts": {
  "fr": "Pack 10 posts",
  "en": "10-post pack",
  "prix": 800
 },
 "canva": {
  "fr": "Templates Canva",
  "en": "Canva templates",
  "prix": 350
 },
 "video": {
  "fr": "Vidéo à la carte",
  "en": "Single video",
  "prix": 350
 },
 "photo": {
  "fr": "Session photo",
  "en": "Photo session",
  "prix": 200
 },
 "pack-mensuel": {
  "fr": "Pack mensuel",
  "en": "Monthly pack",
  "prix": 900,
  "mensuel": true
 },
 "reseaux-essentiel": {
  "fr": "Gestion essentielle",
  "en": "Essential management",
  "prix": 1200,
  "mensuel": true
 },
 "reseaux-premium": {
  "fr": "Gestion premium",
  "en": "Premium management",
  "prix": 1800,
  "mensuel": true
 },
 "pub-gestion": {
  "fr": "Gestion des publicités, mise en place comprise (15 % du budget, minimum)",
  "en": "Ad management, setup included (15% of budget, minimum)",
  "prix": 350,
  "mensuel": true
 },
 "pub-audit": {
  "fr": "Audit de campagnes",
  "en": "Campaign audit",
  "prix": 400
 }
};
const DUO = {"ids": ["audit-positionnement", "strategie-contenu"], "prix": 1600, "fr": "Audit, positionnement et stratégie de contenu", "en": "Audit, positioning and content strategy"};

const TEXTES = {
  fr: {
    objet: "Ton estimation NOD",
    apercu: "Le récapitulatif de ta sélection, avec les tarifs de départ.",
    titre: (p: string) => (p ? `Voici ton estimation, ${p}.` : "Voici ton estimation."),
    intro: "Tu trouveras ci-dessous ce que tu as sélectionné, avec les tarifs de départ. Je reviens vers toi prochainement pour qu'on en parle ensemble.",
    selection: "Ta sélection",
    apd: "À partir de",
    mois: "par mois",
    an: "par an",
    puis: "puis",
    et: "et",
    devis: "Sur devis",
    partieDevis: "Une partie sur devis",
    note: "Ceci est une estimation. Seul un devis, établi après un premier échange, fixera le prix final de ton projet.",
    brochure: "Toutes les prestations sont détaillées dans la brochure.",
    brochureBouton: "Lire la brochure",
    salut: "À très vite,",
  },
  en: {
    objet: "Your NOD estimate",
    apercu: "A summary of your selection, with starting prices.",
    titre: (p: string) => (p ? `Here is your estimate, ${p}.` : "Here is your estimate."),
    intro: "Below is what you selected, with starting prices. I'll get back to you soon so we can talk it through together.",
    selection: "Your selection",
    apd: "From",
    mois: "per month",
    an: "per year",
    puis: "then",
    et: "and",
    devis: "On quote",
    partieDevis: "Part of it on quote",
    note: "This is an estimate. Only a quote, drawn up after a first conversation, will set the final price of your project.",
    brochure: "Every service is detailed in the brochure.",
    brochureBouton: "Read the brochure",
    salut: "Talk soon,",
  },
};
type Langue = keyof typeof TEXTES;

const euros = (n: number) => n.toLocaleString("fr-FR").replace(/[  \s]/g, "&nbsp;") + "&nbsp;€";

function calculer(ids: string[], langue: Langue) {
  const valides = [...new Set(ids)].filter((id) => id in TARIFS).slice(0, 40);
  const duo = DUO.ids.every((id: string) => valides.includes(id));
  const lignes: { nom: string; prix: number | null; mensuel?: boolean; annuel?: boolean }[] = [];
  for (const id of valides) {
    const l = TARIFS[id];
    if (duo && DUO.ids.includes(id)) {
      if (id === DUO.ids[0]) lignes.push({ nom: langue === "en" ? DUO.en : DUO.fr, prix: DUO.prix });
      continue;
    }
    lignes.push({ nom: langue === "en" ? l.en : l.fr, prix: l.prix, mensuel: l.mensuel, annuel: l.annuel });
  }
  const unique = lignes.filter((l) => !l.mensuel && !l.annuel && l.prix !== null).reduce((s, l) => s + (l.prix ?? 0), 0);
  const mensuel = lignes.filter((l) => l.mensuel).reduce((s, l) => s + (l.prix ?? 0), 0);
  const annuel = lignes.filter((l) => l.annuel).reduce((s, l) => s + (l.prix ?? 0), 0);
  const surDevis = lignes.some((l) => l.prix === null);
  return { lignes, unique, mensuel, annuel, surDevis };
}

type Calcul = ReturnType<typeof calculer>;

function prixLigne(l: Calcul["lignes"][number], T: (typeof TEXTES)[Langue]) {
  if (l.prix === null) return T.devis;
  return euros(l.prix) + (l.mensuel ? ` ${T.mois}` : l.annuel ? ` ${T.an}` : "");
}

function tableau(c: Calcul, T: (typeof TEXTES)[Langue]) {
  const rangs = c.lignes.map((l) => `
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid ${C.filet};font-family:${SERIF};font-size:16px;color:${C.nuit};">${echapper(l.nom)}</td>
              <td align="right" style="padding:14px 0;border-bottom:1px solid ${C.filet};font-family:${SERIF};font-size:16px;color:${C.nuit};white-space:nowrap;">${prixLigne(l, T)}</td>
            </tr>`).join("");
  const suite = [
    c.mensuel ? `${T.puis} ${euros(c.mensuel)} ${T.mois}` : "",
    c.annuel ? `${T.et} ${euros(c.annuel)} ${T.an}` : "",
    c.surDevis ? T.partieDevis : "",
  ].filter(Boolean).map((x) => `<p style="margin:4px 0 0;font-family:${SERIF};font-size:15px;color:${C.creme};">${x}</p>`).join("");
  return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rangs}</table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:${C.nuit};border-radius:16px;">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 6px;font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.jaune};">${T.apd}</p>
              <p style="margin:0;font-family:${SERIF};font-weight:300;font-size:38px;line-height:1.1;color:${C.creme};">${euros(c.unique)}</p>
              ${suite}
            </td></tr>
          </table>`;
}

function mailClient(c: Calcul, prenom: string, langue: Langue, brochureUrl: string | null) {
  const T = TEXTES[langue];
  return `<!DOCTYPE html>
<html lang="${langue}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${C.creme};">
  <div style="display:none;max-height:0;overflow:hidden;">${T.apercu}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.creme};">
    <tr><td align="center" style="padding:48px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;">
        <tr><td style="padding:0 8px 40px;">
          <img src="cid:nod-logo" width="110" height="40" alt="NOD" style="display:block;border:0;width:110px;height:auto;">
        </td></tr>
        <tr><td style="padding:0 8px;">
          <h1 style="margin:0;font-family:${SERIF};font-weight:300;font-size:34px;line-height:1.15;color:${C.nuit};">${T.titre(echapper(prenom))}</h1>
          <p style="margin:18px 0 0;font-family:${SERIF};font-size:17px;line-height:1.7;color:${C.nuit};">${T.intro}</p>
        </td></tr>
        <tr><td style="padding:32px 8px 0;">
          <p style="margin:0 0 4px;font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.doux};">${T.selection}</p>
          ${tableau(c, T)}
          <p style="margin:16px 0 0;font-family:${SERIF};font-size:14px;line-height:1.6;color:${C.doux};">${T.note}</p>
        </td></tr>
        ${brochureUrl ? `
        <tr><td style="padding:28px 8px 0;">
          <p style="margin:0 0 14px;font-family:${SERIF};font-size:16px;line-height:1.6;color:${C.nuit};">${T.brochure}</p>
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background:${C.rouge};border-radius:999px;">
              <a href="${brochureUrl}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:15px;font-weight:600;color:${C.creme};text-decoration:none;">${T.brochureBouton}</a>
            </td>
          </tr></table>
        </td></tr>` : ""}
        <tr><td style="padding:48px 8px 0;">
          <p style="margin:0;font-family:${SERIF};font-size:16px;color:${C.nuit};">${T.salut}</p>
          <p style="margin:4px 0 0;font-family:${SERIF};font-size:16px;color:${C.nuit};">Nnéna</p>
        </td></tr>
        <tr><td style="padding:40px 8px 0;">
          <div style="height:2px;line-height:2px;font-size:0;background:${C.rouge};background-image:linear-gradient(90deg,${C.rouge},${C.orange},${C.jaune});">&nbsp;</div>
          <p style="margin:18px 0 0;font-family:${SERIF};font-style:italic;font-size:15px;color:${C.nuit};">NOD, say yes to new projects</p>
          <p style="margin:6px 0 0;font-family:${SANS};font-size:12px;"><a href="https://nod-consulting.com" style="color:${C.rouge};text-decoration:none;">nod-consulting.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function mailNnena(c: Calcul, prenom: string, email: string, langue: Langue) {
  const T = TEXTES.fr;
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:32px 16px;background:${C.creme};">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;margin:0 auto;">
    <tr><td>
      <h1 style="margin:0 0 8px;font-family:${SERIF};font-weight:300;font-size:28px;color:${C.nuit};">Nouvelle estimation</h1>
      <p style="margin:0 0 24px;font-family:${SANS};font-size:14px;color:${C.doux};">${echapper(prenom || "Sans prénom")} · <a href="mailto:${echapper(email)}" style="color:${C.rouge};">${echapper(email)}</a> · ${langue.toUpperCase()}</p>
      ${tableau(c, T)}
      <p style="margin:20px 0 0;font-family:${SERIF};font-size:15px;color:${C.nuit};">Réponds directement à ce mail pour lui écrire.</p>
    </td></tr>
  </table>
</body></html>`;
}

async function envoyer(contenu: Record<string, unknown>) {
  return await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify(contenu),
  });
}

Deno.serve(async (req) => {
  const entetes = enTetes(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: entetes });
  if (req.method !== "POST" || !origineAutorisee(req) || tropDEnvois(req)) {
    return reponse({ status: "error" }, 403, entetes);
  }

  try {
    const corps = await req.json();
    // Champ piège : un robot le remplit, on fait comme si tout allait bien.
    if (corps.website) return reponse({ status: "ok" }, 200, entetes);

    const email = String(corps.email ?? "").trim().toLowerCase();
    const prenom = String(corps.prenom ?? "").trim().slice(0, 60);
    const langue: Langue = corps.langue === "en" ? "en" : "fr";
    const ids = Array.isArray(corps.ids) ? corps.ids.map(String) : [];
    if (!EMAIL.test(email)) return reponse({ status: "error" }, 400, entetes);

    const calcul = calculer(ids, langue);
    if (calcul.lignes.length === 0) return reponse({ status: "error" }, 400, entetes);

    const brochureUrl =
      Deno.env.get(langue === "en" ? "BROCHURE_URL_EN" : "BROCHURE_URL_FR") || Deno.env.get("BROCHURE_URL") || null;
    const logo = { filename: "nod-logo.png", content: LOGO_PNG, content_id: "nod-logo", content_type: "image/png" };

    const client = await envoyer({
      from: "NOD Consulting <contact@nod-consulting.com>",
      to: [email],
      reply_to: "contact@nod-consulting.com",
      subject: TEXTES[langue].objet,
      html: mailClient(calcul, prenom, langue, brochureUrl),
      attachments: [logo],
    });
    if (!client.ok) {
      console.error("Resend client :", await client.text());
      return reponse({ status: "error" }, 502, entetes);
    }

    const nnena = await envoyer({
      from: "NOD Consulting <contact@nod-consulting.com>",
      to: ["contact@nod-consulting.com"],
      reply_to: email,
      subject: `Nouvelle estimation${prenom ? ` : ${prenom}` : ""}`,
      html: mailNnena(calcul, prenom, email, langue),
    });
    if (!nnena.ok) console.error("Resend Nnéna :", await nnena.text());

    return reponse({ status: "ok" }, 200, entetes);
  } catch (e) {
    console.error(e);
    return reponse({ status: "error" }, 500, entetes);
  }
});
