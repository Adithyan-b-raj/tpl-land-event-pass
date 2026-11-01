// Cloudflare Pages Functions - Festival Passes API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const tiers = await env.DB.prepare("SELECT * FROM ticket_tiers").all();
      return new Response(JSON.stringify({ ok: true, tiers: tiers.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      tiers: [
        { id: 'tier_ga', tier_name: 'GA Weekend Pass (3-Day)', price_inr: 8999, available_qty: 5000, sold_qty: 4810 },
        { id: 'tier_vip', tier_name: 'VIP Backstage & Artist Deck', price_inr: 19999, available_qty: 1200, sold_qty: 1140 },
        { id: 'tier_single', tier_name: 'Single Day Pass (Dec 19)', price_inr: 3999, available_qty: 3000, sold_qty: 2400 }
      ]
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { attendee_name, email, phone, tier_id, has_camping, has_shuttle, total_amount } = body;

    if (!attendee_name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "Name and phone required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = "pass_" + Date.now().toString(36);
    const passCode = "HP-" + Math.floor(Math.random() * 8999 + 1000) + (tier_id === 'tier_vip' ? '-VIP' : '-GA');

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO passes (id, pass_code, attendee_name, email, phone, tier_id, has_camping, has_shuttle, checkin_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'unclaimed')"
      ).bind(id, passCode, attendee_name, email || '', phone, tier_id || 'tier_ga', has_camping ? 1 : 0, has_shuttle ? 1 : 0).run();
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Ticket Issued! Pass confirmed for " + attendee_name,
      pass_code: passCode,
      tier: tier_id
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
