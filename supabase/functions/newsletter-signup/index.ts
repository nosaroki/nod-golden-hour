import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Outils partagés par les fonctions du site : origine autorisée, échappement
// HTML, limite d'envois par adresse IP.

const ORIGINES = [
  /^https:\/\/(www\.)?nod-consulting\.com$/,
  /^https:\/\/nod-golden-hour[a-z0-9-]*\.vercel\.app$/,
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


Deno.serve(async (req) => {
  const corsHeaders = enTetes(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST" || !origineAutorisee(req) || tropDEnvois(req)) {
    return new Response(JSON.stringify({ status: "error" }), { status: 403, headers: corsHeaders });
  }

  try {
    const corps = await req.json();
    const email = String(corps.email ?? "").trim().toLowerCase();
    if (corps.website) {
      return new Response(JSON.stringify({ status: "ok" }), { headers: corsHeaders });
    }

    if (!EMAIL.test(email)) {
      return new Response(
        JSON.stringify({ status: "error", message: "Email invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ status: "exists" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() });

    if (insertError) {
      throw new Error(insertError.message);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NOD Consulting <contact@nod-consulting.com>",
        to: [email],
        subject: "Bienvenue chez NOD Consulting",
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #F8F3EE;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F3EE; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width: 480px; width: 100%;">
          <tr>
            <td align="center" style="padding: 40px 24px 32px;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 42px; font-weight: bold; font-style: italic; letter-spacing: -1px;">
                <span style="color: #F55E30;">N</span><span style="color: #FF914D;">O</span><span style="color: #FFD35E;">D</span>
              </span>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 24px 32px;">
              <div style="width: 48px; height: 2px; background-color: #F55E30;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px;">
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.9; color: #3A2E1F; margin: 0 0 20px;">
                Merci pour votre inscription.
              </p>
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.9; color: #3A2E1F; margin: 0 0 20px;">
                On prépare un nouveau modèle créatif. Vous serez parmi les premiers à le découvrir.
              </p>
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.9; color: #3A2E1F; margin: 0 0 8px;">
                D'ici là, n'hésitez pas à nous écrire.
              </p>
              <p style="margin: 0 0 40px;">
                <a href="mailto:contact@nod-consulting.com" style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; color: #F55E30; text-decoration: none;">
                  contact@nod-consulting.com
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #E8D5C4;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: -apple-system, Arial, sans-serif; font-size: 12px; color: #B0A090;">
                    NOD Consulting
                  </td>
                  <td align="right">
                    <a href="https://nod-consulting.com" style="font-family: -apple-system, Arial, sans-serif; font-size: 12px; color: #B0A090; text-decoration: none;">
                      nod-consulting.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
    }

    return new Response(
      JSON.stringify({ status: "ok" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ status: "error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});