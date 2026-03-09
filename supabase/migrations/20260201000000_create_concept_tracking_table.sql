-- Phase 11: Concept tracking (per-concept accuracy over 30-day sliding window)
CREATE TABLE IF NOT EXISTS concept_tracking (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
