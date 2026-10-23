import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EMAIL, echapper, enTetes, origineAutorisee, reponse, tropDEnvois } from "../_shared/securite.ts";

Deno.serve(async (req) => {
  const entetes = enTetes(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: entetes });
  if (req.method !== "POST" || !origineAutorisee(req)) {
    return reponse({ status: "error" }, 403, entetes);
  }

  try {
    const corps = await req.json();
    const name = String(corps.name ?? "").trim();
    const email = String(corps.email ?? "").trim().toLowerCase();
    const phone = String(corps.phone ?? "").trim();
    const message = String(corps.message ?? "").trim();
    const piege = String(corps.website ?? "");

    // Champ piège rempli : c'est un robot. On répond « ok » sans rien faire.
    if (piege) return reponse({ status: "ok" }, 200, entetes);
    if (tropDEnvois(req)) return reponse({ status: "error" }, 429, entetes);

    if (
      !name || name.length > 120 ||
      !EMAIL.test(email) ||
      phone.length > 40 ||
      !message || message.length > 5000
    ) {
      return reponse({ status: "error" }, 400, entetes);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: erreurBase } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, message });
    if (erreurBase) console.error("contact_submissions:", erreurBase.message);

    const n = echapper(name);
    const e = echapper(email);
    const p = echapper(phone);
    const m = echapper(message);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NOD Consulting <contact@nod-consulting.com>",
        to: ["contact@nod-consulting.com"],
        reply_to: email,
        subject: `Nouveau message de ${name.replace(/[\r\n]/g, " ").slice(0, 80)}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #3A2E1F;">
            <div style="margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #E8642C;">
              <span style="font-size: 24px; font-weight: 800; font-style: italic; color: #E8642C;">NOD</span>
              <span style="font-size: 14px; color: #8A7A6A; margin-left: 8px;">nouveau message</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; width: 100px; vertical-align: top;">Nom</td>
                <td style="padding: 8px 0; font-size: 15px;">${n}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;">
                  <a href="mailto:${e}" style="color: #E8642C; text-decoration: none;">${e}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; vertical-align: top;">Téléphone</td>
                <td style="padding: 8px 0; font-size: 15px;">${p || "Non renseigné"}</td>
              </tr>
            </table>
            <div style="background: #FBF6F1; padding: 20px; border-left: 3px solid #E8642C; margin-bottom: 24px;">
              <p style="font-size: 13px; color: #8A7A6A; margin: 0 0 8px 0;">Message</p>
              <p style="font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-line;">${m}</p>
            </div>
            <p style="font-size: 13px; color: #8A7A6A;">
              Répondre directement à cet email écrira à ${e}
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend:", await res.text());
      return reponse({ status: "error" }, 502, entetes);
    }

    return reponse({ status: "ok" }, 200, entetes);
  } catch (error) {
    console.error("contact-form:", error);
    return reponse({ status: "error" }, 500, entetes);
  }
});
