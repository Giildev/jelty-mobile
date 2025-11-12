-- ============================================================================
-- MIGRATION: Add Daily Motivational Messages System
-- ============================================================================
-- Description: Creates a system table for storing daily motivational messages
--              that will be displayed in the home screen banner.
--              Messages rotate based on the day of the month (1-30).
--
-- Created: 2025-11-12
-- Author: Claude Code
-- ============================================================================

-- ============================================================================
-- 1. CREATE TABLE: system_daily_message
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.system_daily_message (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_text TEXT NOT NULL,
  day_of_month INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT day_of_month_range CHECK (day_of_month >= 1 AND day_of_month <= 30),
  CONSTRAINT unique_day_of_month UNIQUE (day_of_month)
);

COMMENT ON TABLE public.system_daily_message IS 'System table for daily motivational messages that rotate based on day of month';
COMMENT ON COLUMN public.system_daily_message.message_text IS 'The motivational message text to display';
COMMENT ON COLUMN public.system_daily_message.day_of_month IS 'Day of month (1-30) when this message should be displayed';
COMMENT ON COLUMN public.system_daily_message.is_active IS 'Whether this message is currently active (for future enable/disable functionality)';

-- Create index for quick lookups by day
CREATE INDEX IF NOT EXISTS idx_system_daily_message_day
  ON public.system_daily_message(day_of_month)
  WHERE is_active = true;

-- ============================================================================
-- 2. INSERT 30 MOTIVATIONAL MESSAGES
-- ============================================================================

INSERT INTO public.system_daily_message (message_text, day_of_month) VALUES
  ('Every workout is a step toward a stronger you. Keep pushing!', 1),
  ('Your body can do anything. It''s your mind you need to convince.', 2),
  ('The only bad workout is the one that didn''t happen.', 3),
  ('Progress is progress, no matter how small. Celebrate it!', 4),
  ('Consistency is the key to transformation. Stay committed!', 5),
  ('Your health is an investment, not an expense.', 6),
  ('Believe in yourself and all that you are capable of achieving.', 7),
  ('Champions are made when no one is watching.', 8),
  ('The body achieves what the mind believes.', 9),
  ('You''re one meal away from a good mood, one workout away from feeling amazing.', 10),
  ('Success is the sum of small efforts repeated day in and day out.', 11),
  ('Don''t wish for it, work for it. Your future self will thank you.', 12),
  ('The pain you feel today will be the strength you feel tomorrow.', 13),
  ('You don''t have to be great to start, but you have to start to be great.', 14),
  ('Wake up with determination, go to bed with satisfaction.', 15),
  ('Your only limit is you. Break through it today!', 16),
  ('Strive for progress, not perfection.', 17),
  ('Take care of your body. It''s the only place you have to live.', 18),
  ('The secret to getting ahead is getting started.', 19),
  ('Make yourself a priority. You deserve it!', 20),
  ('Every healthy choice you make is an act of self-love.', 21),
  ('You are stronger than your excuses.', 22),
  ('Fitness is not about being better than someone else. It''s about being better than you used to be.', 23),
  ('Your journey is your own. Focus on your progress, not others.', 24),
  ('Small daily improvements lead to stunning results.', 25),
  ('You didn''t come this far to only come this far. Keep going!', 26),
  ('The hardest step is the first one. You''ve already started!', 27),
  ('Your body is a reflection of your lifestyle. Make it count!', 28),
  ('Be proud of yourself for showing up today.', 29),
  ('Remember why you started. Let that fuel you forward.', 30)
ON CONFLICT (day_of_month) DO NOTHING;

-- ============================================================================
-- 3. CREATE FUNCTION: Get Today's Message
-- ============================================================================
-- This function returns the appropriate message based on the current day of month
-- If the day is 31, it wraps around to day 30

CREATE OR REPLACE FUNCTION public.get_daily_message()
RETURNS TABLE (
  id UUID,
  message_text TEXT,
  day_of_month INTEGER
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  current_day INTEGER;
BEGIN
  -- Get current day of month, wrap 31 to 30
  current_day := EXTRACT(DAY FROM CURRENT_DATE);
  IF current_day > 30 THEN
    current_day := 30;
  END IF;

  -- Return the message for this day
  RETURN QUERY
  SELECT
    sdm.id,
    sdm.message_text,
    sdm.day_of_month
  FROM public.system_daily_message sdm
  WHERE sdm.day_of_month = current_day
    AND sdm.is_active = true
  LIMIT 1;
END;
$$;

COMMENT ON FUNCTION public.get_daily_message() IS 'Returns the motivational message for the current day of month';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- To test the function, run:
-- SELECT * FROM public.get_daily_message();
