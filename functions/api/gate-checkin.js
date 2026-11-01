// Cloudflare Pages Functions - Fast Gate Check-In & Turnstile Scanner
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { pass_code } = body;

    if (!pass_code) {
      return new Response(JSON.stringify({ ok: false, error: "Scan barcode or pass code required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env && env.DB) {
      const pass = await env.DB.prepare("SELECT * FROM passes WHERE pass_code = ?").bind(pass_code).first();
      if (!pass) {
        return new Response(JSON.stringify({
          ok: false,
          result: "ERROR_INVALID",
          message: "Pass not recognized. Potential counterfeit barcode."
        }), { headers: { "Content-Type": "application/json" } });
      }

      if (pass.checkin_status === 'checked_in') {
        return new Response(JSON.stringify({
          ok: false,
          result: "ERROR_DUPLICATE",
          message: `ALREADY CHECKED IN at ${pass.checked_in_at}. Turnstile locked!`
        }), { headers: { "Content-Type": "application/json" } });
      }

      await env.DB.prepare("UPDATE passes SET checkin_status = 'checked_in', checked_in_at = CURRENT_TIMESTAMP WHERE id = ?").bind(pass.id).run();
      return new Response(JSON.stringify({
        ok: true,
        result: "SUCCESS_VALID",
        attendee: pass.attendee_name,
        tier: pass.tier_id,
        message: "VALID PASS // ACCESS GRANTED"
      }), { headers: { "Content-Type": "application/json" } });
    }

    // Default simulation logic
    if (pass_code.includes("DUP")) {
      return new Response(JSON.stringify({
        ok: false,
        result: "ERROR_DUPLICATE",
        message: "DUPLICATE TICKET // ALREADY CHECKED IN AT 18:22 // REJECT ENTRY"
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({
      ok: true,
      result: "SUCCESS_VALID",
      attendee: "Zoya Akhtar",
      tier: "VIP Backstage",
      message: "VALID PASS // ACCESS GRANTED"
    }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
