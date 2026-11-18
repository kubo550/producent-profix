-- Silos: pins dropped by employees at the place where a mobile silo stands.
CREATE TABLE silos (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  comment      text CHECK (comment IS NULL OR char_length(comment) <= 1000),
  lat          double precision NOT NULL CHECK (lat BETWEEN -90 AND 90),
  lng          double precision NOT NULL CHECK (lng BETWEEN -180 AND 180),
  accuracy_m   integer CHECK (accuracy_m IS NULL OR accuracy_m >= 0),
  source       text NOT NULL CHECK (source IN ('gps', 'manual', 'address')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  created_by   text NOT NULL,
  verified_at  timestamptz NOT NULL DEFAULT now(),
  verified_by  text NOT NULL,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  updated_by   text NOT NULL,
  collected_at timestamptz,
  collected_by text,
  CHECK ((collected_at IS NULL) = (collected_by IS NULL))
);

CREATE INDEX silos_active_idx ON silos (verified_at DESC) WHERE collected_at IS NULL;
CREATE INDEX silos_collected_idx ON silos (collected_at DESC) WHERE collected_at IS NOT NULL;

-- Failed login attempts, used for rate limiting the shared panel password.
CREATE TABLE login_attempts (
  ip           text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX login_attempts_ip_idx ON login_attempts (ip, attempted_at DESC);
