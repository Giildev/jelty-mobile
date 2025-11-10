-- Add experience_level field to user_training_preference table
-- This field will store the user's exercise experience level (beginner, intermediate, advanced)

ALTER TABLE user_training_preference
ADD COLUMN IF NOT EXISTS experience_level TEXT;

-- Add a check constraint to ensure only valid values are stored
ALTER TABLE user_training_preference
ADD CONSTRAINT experience_level_check
CHECK (experience_level IN ('beginner', 'intermediate', 'advanced'));

-- Add comment to document the column
COMMENT ON COLUMN user_training_preference.experience_level IS 'User exercise experience level: beginner, intermediate, or advanced';
