-- Create user_cooking_preference table for Step 7 of onboarding
-- Stores cooking habits and shopping routine information

CREATE TABLE IF NOT EXISTS user_cooking_preference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_user(id) ON DELETE CASCADE,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  cook_time_min INTEGER, -- Minimum time available to cook in minutes
  cook_time_max INTEGER, -- Maximum time available to cook in minutes
  cooking_for_people INTEGER CHECK (cooking_for_people >= 1 AND cooking_for_people <= 5),
  shopping_frequency TEXT CHECK (shopping_frequency IN ('weekly', 'bi_weekly', 'monthly')),
  monthly_food_budget NUMERIC(10, 2), -- Optional budget tracking
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ,
  UNIQUE(user_id, deleted_at)
);

-- Add comments for documentation
COMMENT ON TABLE user_cooking_preference IS 'Stores user cooking habits and shopping routine for meal planning';
COMMENT ON COLUMN user_cooking_preference.skill_level IS 'User cooking skill level: beginner, intermediate, advanced, expert';
COMMENT ON COLUMN user_cooking_preference.cook_time_min IS 'Minimum time available to cook per meal in minutes';
COMMENT ON COLUMN user_cooking_preference.cook_time_max IS 'Maximum time available to cook per meal in minutes';
COMMENT ON COLUMN user_cooking_preference.cooking_for_people IS 'Number of people user is cooking for (including themselves)';
COMMENT ON COLUMN user_cooking_preference.shopping_frequency IS 'How often user shops for groceries';

-- Create index for faster queries
CREATE INDEX idx_user_cooking_preference_user_id ON user_cooking_preference(user_id) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE user_cooking_preference ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own cooking preferences"
  ON user_cooking_preference FOR SELECT
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_cooking_preference.user_id));

CREATE POLICY "Users can insert their own cooking preferences"
  ON user_cooking_preference FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_cooking_preference.user_id));

CREATE POLICY "Users can update their own cooking preferences"
  ON user_cooking_preference FOR UPDATE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_cooking_preference.user_id));

CREATE POLICY "Users can delete their own cooking preferences"
  ON user_cooking_preference FOR DELETE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_cooking_preference.user_id));
