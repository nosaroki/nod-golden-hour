// Outils partagés par les fonctions du site : origine autorisée, échappement
// HTML, limite d'envois par adresse IP.

const ORIGINES = [
  /^https:\/\/(www\.)?nod-consulting\.com$/,
  /^https:\/\/nod-golden-hour[a-z0-9-]*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
];

export function enTetes(req: Request): Record<string, string> {
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

export function origineAutorisee(req: Request): boolean {
  const origine = req.headers.get("origin");
  return !!origine && ORIGINES.some((r) => r.test(origine));
}

export function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const EMAIL = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,24}$/i;

// Limite simple en mémoire : 5 envois par IP et par heure. Elle ne survit pas
// au redémarrage de la fonction, le champ piège fait le reste.
const envois = new Map<string, number[]>();
export function tropDEnvois(req: Request, max = 5, fenetreMs = 3600_000): boolean {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < fenetreMs);
  recents.push(maintenant);
  envois.set(ip, recents);
  return recents.length > max;
}

export function reponse(corps: unknown, statut: number, entetes: Record<string, string>) {
  return new Response(JSON.stringify(corps), { status: statut, headers: entetes });
}
