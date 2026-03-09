-- Enable Row Level Security on all core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamification_data ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Curriculum progress
CREATE POLICY "Users can read own progress"
  ON curriculum_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own progress"
  ON curriculum_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON curriculum_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Gamification data
CREATE POLICY "Users can read own gamification"
  ON gamification_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own gamification"
  ON gamification_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gamification"
  ON gamification_data FOR UPDATE
  USING (auth.uid() = user_id);
