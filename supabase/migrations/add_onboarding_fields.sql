-- Migration: Add onboarding fields to user_profile table
-- Description: Adds columns for onboarding process tracking and physical/activity information
-- Date: 2025-11-07

-- Add onboarding_completed column
ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Add measurement_system column
ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS measurement_system VARCHAR(20) DEFAULT 'metric';

-- Add activity_level column
ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS activity_level VARCHAR(50);

-- Add constraints
ALTER TABLE user_profile
ADD CONSTRAINT check_measurement_system
CHECK (measurement_system IN ('metric', 'imperial'));

ALTER TABLE user_profile
ADD CONSTRAINT check_activity_level
CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'));

-- Add comments for documentation
COMMENT ON COLUMN user_profile.onboarding_completed IS 'Indicates if user has completed the onboarding wizard';
COMMENT ON COLUMN user_profile.measurement_system IS 'User preferred measurement system: metric (cm/kg) or imperial (ft/lb)';
COMMENT ON COLUMN user_profile.activity_level IS 'User current physical activity level';
