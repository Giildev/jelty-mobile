-- ============================================================================
-- Allow NULL in first_name and last_name for sign-up flow
-- ============================================================================
-- Date: 2025-11-08
-- Reason: Users don't provide names during sign-up, only during onboarding
--
-- Problem: Sign-up creates user profile with empty first_name/last_name,
-- but encryptData("") returns null, causing NOT NULL constraint violation
--
-- Solution: Remove NOT NULL constraint from these fields
-- ============================================================================

-- 1. Remove NOT NULL constraint from first_name and last_name
ALTER TABLE public.user_profile
  ALTER COLUMN first_name DROP NOT NULL,
  ALTER COLUMN last_name DROP NOT NULL;

-- 2. Update comments to reflect NULL behavior
COMMENT ON COLUMN public.user_profile.first_name IS 'First name (ENCRYPTED with AES-256-CBC, NULL until onboarding completed)';
COMMENT ON COLUMN public.user_profile.last_name IS 'Last name (ENCRYPTED with AES-256-CBC, NULL until onboarding completed)';

-- 3. Verify changes
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_profile'
  AND column_name IN ('first_name', 'last_name');

-- Expected result:
-- column_name  | data_type | is_nullable | column_default
-- -------------|-----------|-------------|---------------
-- first_name   | text      | YES         | NULL
-- last_name    | text      | YES         | NULL
