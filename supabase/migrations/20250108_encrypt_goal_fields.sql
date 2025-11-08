-- Migration: Convert goal and body goal numeric fields to TEXT for encryption
-- This allows storing encrypted values for sensitive health data

-- user_goal table: Convert numeric fields to TEXT
ALTER TABLE public.user_goal
  ALTER COLUMN target_weight_kg TYPE TEXT USING target_weight_kg::TEXT,
  ALTER COLUMN target_bodyfat_pct TYPE TEXT USING target_bodyfat_pct::TEXT,
  ALTER COLUMN timeframe TYPE TEXT USING timeframe::TEXT;

-- user_body_goal table: Convert all measurement fields to TEXT
ALTER TABLE public.user_body_goal
  ALTER COLUMN chest_cm TYPE TEXT USING chest_cm::TEXT,
  ALTER COLUMN waist_cm TYPE TEXT USING waist_cm::TEXT,
  ALTER COLUMN hips_cm TYPE TEXT USING hips_cm::TEXT,
  ALTER COLUMN biceps_cm TYPE TEXT USING biceps_cm::TEXT,
  ALTER COLUMN thighs_cm TYPE TEXT USING thighs_cm::TEXT,
  ALTER COLUMN neck_cm TYPE TEXT USING neck_cm::TEXT,
  ALTER COLUMN shoulders_cm TYPE TEXT USING shoulders_cm::TEXT,
  ALTER COLUMN forearms_cm TYPE TEXT USING forearms_cm::TEXT,
  ALTER COLUMN calves_cm TYPE TEXT USING calves_cm::TEXT;

-- Add comments explaining encryption
COMMENT ON COLUMN public.user_goal.target_weight_kg IS 'Encrypted TEXT field containing target weight in kg';
COMMENT ON COLUMN public.user_goal.target_bodyfat_pct IS 'Encrypted TEXT field containing target body fat percentage';
COMMENT ON COLUMN public.user_goal.timeframe IS 'Encrypted TEXT field containing goal timeframe';

COMMENT ON COLUMN public.user_body_goal.chest_cm IS 'Encrypted TEXT field containing chest measurement in cm';
COMMENT ON COLUMN public.user_body_goal.waist_cm IS 'Encrypted TEXT field containing waist measurement in cm';
COMMENT ON COLUMN public.user_body_goal.hips_cm IS 'Encrypted TEXT field containing hips measurement in cm';
COMMENT ON COLUMN public.user_body_goal.biceps_cm IS 'Encrypted TEXT field containing biceps measurement in cm';
COMMENT ON COLUMN public.user_body_goal.thighs_cm IS 'Encrypted TEXT field containing thighs measurement in cm';
COMMENT ON COLUMN public.user_body_goal.neck_cm IS 'Encrypted TEXT field containing neck measurement in cm';
COMMENT ON COLUMN public.user_body_goal.shoulders_cm IS 'Encrypted TEXT field containing shoulders measurement in cm';
COMMENT ON COLUMN public.user_body_goal.forearms_cm IS 'Encrypted TEXT field containing forearms measurement in cm';
COMMENT ON COLUMN public.user_body_goal.calves_cm IS 'Encrypted TEXT field containing calves measurement in cm';
