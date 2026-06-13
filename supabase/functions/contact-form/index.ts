import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ status: "error", message: "Champs requis manquants" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stocke dans Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, message });

    // Envoie le mail via Resend
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
        subject: `Nouveau message de ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #3A2E1F;">
            <div style="margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #E8642C;">
              <span style="font-size: 24px; font-weight: 800; font-style: italic; color: #E8642C;">NOD</span>
              <span style="font-size: 14px; color: #8A7A6A; margin-left: 8px;">nouveau message</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; width: 100px; vertical-align: top;">Nom</td>
                <td style="padding: 8px 0; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #E8642C; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #8A7A6A; vertical-align: top;">Téléphone</td>
                <td style="padding: 8px 0; font-size: 15px;">${phone || "Non renseigné"}</td>
              </tr>
            </table>
            <div style="background: #FBF6F1; padding: 20px; border-left: 3px solid #E8642C; margin-bottom: 24px;">
              <p style="font-size: 13px; color: #8A7A6A; margin: 0 0 8px 0;">Message</p>
              <p style="font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-line;">${message}</p>
            </div>
            <p style="font-size: 13px; color: #8A7A6A;">
              Répondre directement à cet email écrira à ${email}
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return new Response(
      JSON.stringify({ status: "ok" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});