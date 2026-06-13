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
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
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
      .single();

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
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});