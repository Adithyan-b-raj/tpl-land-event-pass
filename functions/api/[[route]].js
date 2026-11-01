export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/api/leads' && context.request.method === 'GET') {
    return new Response(JSON.stringify([{"id":"KDS-8841","name":"Adithyan B. Raj (Founder, Studio Arsenal)","phone":"919061902295","detail":"VIP Founder Pass • QR Signed [SHA256-OK] • Seat A-01","status":"CHECKED IN // GATE 1","amount":"₹6,999"},{"id":"KDS-8842","name":"Devika Krishnan (Lead Product Designer)","phone":"919847012345","detail":"Pro All-Access + Workshop Pass • QR Signed [SHA256-OK]","status":"QR TICKET ACTIVE","amount":"₹3,499"},{"id":"KDS-8843","name":"Team Zerodha Design (Group of 5)","phone":"919880112233","detail":"5x Pro Workshop Passes (15% Group Discount Applied)","status":"CHECKED IN // VIP GATE","amount":"₹14,870"}]), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
  if (url.pathname === '/api/leads' && context.request.method === 'POST') {
    const body = await context.request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: body.id || 'REQ-LIVE' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ service: 'tpl-land-event-pass', status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
