-- Phase 11: RLS policies for concept_tracking
ALTER TABLE concept_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own concept tracking"
  ON concept_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own concept tracking"
  ON concept_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own concept tracking"
  ON concept_tracking FOR UPDATE
  USING (auth.uid() = user_id);
