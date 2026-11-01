-- ============================================================
-- HYPERPULSE MUSIC FESTIVAL D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  dates TEXT NOT NULL,
  venue TEXT NOT NULL,
  total_capacity INTEGER DEFAULT 15000,
  current_turnstile_count INTEGER DEFAULT 8420
);

CREATE TABLE IF NOT EXISTS ticket_tiers (
  id TEXT PRIMARY KEY,
  tier_name TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  perks TEXT,
  available_qty INTEGER DEFAULT 500,
  sold_qty INTEGER DEFAULT 420
);

CREATE TABLE IF NOT EXISTS passes (
  id TEXT PRIMARY KEY,
  pass_code TEXT UNIQUE NOT NULL,
  attendee_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  tier_id TEXT NOT NULL,
  has_camping INTEGER DEFAULT 0,
  has_shuttle INTEGER DEFAULT 0,
  checkin_status TEXT DEFAULT 'unclaimed', -- 'unclaimed', 'checked_in', 'duplicate_flag'
  checked_in_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tier_id) REFERENCES ticket_tiers(id)
);

CREATE TABLE IF NOT EXISTS gate_scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pass_code TEXT NOT NULL,
  gate_name TEXT DEFAULT 'North Turnstile 01',
  scan_result TEXT NOT NULL, -- 'SUCCESS_VALID', 'ERROR_DUPLICATE', 'ERROR_INVALID'
  scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_passes_code ON passes(pass_code);
CREATE INDEX IF NOT EXISTS idx_passes_status ON passes(checkin_status);
