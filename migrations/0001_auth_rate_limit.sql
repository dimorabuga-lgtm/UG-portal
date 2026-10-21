CREATE TABLE IF NOT EXISTS login_attempts (
  identity TEXT PRIMARY KEY,
  started INTEGER NOT NULL,
  attempts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS login_attempts_started ON login_attempts(started);
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_sessions_expires ON auth_sessions(expires);
