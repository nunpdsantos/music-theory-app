-- Phase 11: Auto-update updated_at for concept_tracking
CREATE TRIGGER update_concept_tracking_updated_at
  BEFORE UPDATE ON concept_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
