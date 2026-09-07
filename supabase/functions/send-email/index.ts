import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, formType, propertyType, address, area, condition } =
      await req.json();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Jméno a telefon jsou povinné." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const isOdhad = formType === "odhad";

    const subject = isOdhad
      ? `Žádost o odhad nemovitosti – ${name}`
      : `Nová zpráva z webu – ${name}`;

    const htmlBody = `
      <h2>${isOdhad ? "Žádost o odhad nemovitosti" : "Nová zpráva z kontaktního formuláře"}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;">Jméno:</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Telefon:</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>
        ${email ? `<tr><td style="padding:8px;font-weight:bold;">E-mail:</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>` : ""}
        ${propertyType ? `<tr><td style="padding:8px;font-weight:bold;">Typ nemovitosti:</td><td style="padding:8px;">${escapeHtml(propertyType)}</td></tr>` : ""}
        ${address ? `<tr><td style="padding:8px;font-weight:bold;">Adresa:</td><td style="padding:8px;">${escapeHtml(address)}</td></tr>` : ""}
        ${area ? `<tr><td style="padding:8px;font-weight:bold;">Plocha:</td><td style="padding:8px;">${escapeHtml(area)} m²</td></tr>` : ""}
        ${condition ? `<tr><td style="padding:8px;font-weight:bold;">Stav:</td><td style="padding:8px;">${escapeHtml(condition)}</td></tr>` : ""}
        ${message ? `<tr><td style="padding:8px;font-weight:bold;">Zpráva:</td><td style="padding:8px;">${escapeHtml(message)}</td></tr>` : ""}
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Web formulář <onboarding@resend.dev>",
        to: ["radek.vetrovsky@re-max.cz"],
        subject,
        html: htmlBody,
        reply_to: email || undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(
        JSON.stringify({ error: "Nepodařilo se odeslat email." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Interní chyba serveru." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
