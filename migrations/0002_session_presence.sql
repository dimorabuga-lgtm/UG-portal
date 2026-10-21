-- Additive: no changes to existing sessions, secrets or rate-limit data.
CREATE TABLE IF NOT EXISTS session_presence (
  session_id TEXT PRIMARY KEY REFERENCES auth_sessions(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL CHECK(length(display_name) BETWEEN 1 AND 80),
  last_seen INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS session_presence_last_seen ON session_presence(last_seen);
