-- Phase 11: Add concept_tracking row to signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  INSERT INTO public.curriculum_progress (user_id)
  VALUES (NEW.id);

  INSERT INTO public.gamification_data (user_id)
  VALUES (NEW.id);

  INSERT INTO public.concept_tracking (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
