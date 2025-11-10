-- Create user_notification_settings table for Step 8 of onboarding
-- Stores notification preferences including quiet hours

CREATE TABLE IF NOT EXISTS user_notification_settings (
  user_id UUID PRIMARY KEY REFERENCES user_user(id) ON DELETE CASCADE,
  meals_enabled BOOLEAN NOT NULL DEFAULT true,
  workouts_enabled BOOLEAN NOT NULL DEFAULT true,
  reminders_enabled BOOLEAN NOT NULL DEFAULT true,
  quiet_hours_start TIME, -- e.g., '22:00:00' for 10:00 PM
  quiet_hours_end TIME, -- e.g., '07:00:00' for 7:00 AM
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add comments for documentation
COMMENT ON TABLE user_notification_settings IS 'Stores user notification preferences for meals, workouts, and reminders';
COMMENT ON COLUMN user_notification_settings.meals_enabled IS 'Enable notifications for meal reminders';
COMMENT ON COLUMN user_notification_settings.workouts_enabled IS 'Enable notifications for workout reminders';
COMMENT ON COLUMN user_notification_settings.reminders_enabled IS 'Enable daily motivation messages and general reminders';
COMMENT ON COLUMN user_notification_settings.quiet_hours_start IS 'Start time for quiet hours (no notifications)';
COMMENT ON COLUMN user_notification_settings.quiet_hours_end IS 'End time for quiet hours (no notifications)';

-- Enable RLS
ALTER TABLE user_notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own notification settings"
  ON user_notification_settings FOR SELECT
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_notification_settings.user_id));

CREATE POLICY "Users can insert their own notification settings"
  ON user_notification_settings FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_notification_settings.user_id));

CREATE POLICY "Users can update their own notification settings"
  ON user_notification_settings FOR UPDATE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_notification_settings.user_id));

CREATE POLICY "Users can delete their own notification settings"
  ON user_notification_settings FOR DELETE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM user_user WHERE id = user_notification_settings.user_id));
