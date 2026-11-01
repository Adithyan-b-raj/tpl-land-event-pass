-- ============================================================
-- HYPERPULSE FESTIVAL SEED DATA
-- ============================================================

INSERT OR IGNORE INTO events (id, name, dates, venue, total_capacity, current_turnstile_count) VALUES
  ('event_2026', 'HYPERPULSE // 04 - Electronic Arts & Sound Horizon', 'Dec 18-20, 2026', 'Vagator Cliffs & Amphitheatre, Goa', 15000, 8420);

INSERT OR IGNORE INTO ticket_tiers (id, tier_name, price_inr, perks, available_qty, sold_qty) VALUES
  ('tier_ga', 'GA Weekend Pass (3-Day)', 8999, 'Access to Main Horizon & Warehouse stages, free hydration stations', 5000, 4810),
  ('tier_vip', 'VIP Backstage & Artist Deck', 19999, 'Elevated viewing decks, private craft bars, AC restrooms, express security turnstile', 1200, 1140),
  ('tier_single', 'Single Day Pass (Dec 19)', 3999, '1-Day general access to all daylight stages', 3000, 2400);

INSERT OR IGNORE INTO passes (id, pass_code, attendee_name, email, phone, tier_id, has_camping, has_shuttle, checkin_status) VALUES
  ('pass_001', 'HP-9941-VIP', 'Zoya Akhtar', 'zoya@pulse.audio', '+91 98200 11440', 'tier_vip', 1, 1, 'checked_in'),
  ('pass_002', 'HP-8812-GA', 'Nikhil Kamath', 'nikhil@bluelake.in', '+91 99000 88210', 'tier_ga', 0, 1, 'unclaimed'),
  ('pass_003', 'HP-7730-VIP', 'Tariq Mansur', 'tariq@technowave.ae', '+971 50 123 4567', 'tier_vip', 1, 0, 'unclaimed');
