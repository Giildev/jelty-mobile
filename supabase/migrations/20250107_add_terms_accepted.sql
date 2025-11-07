-- ============================================================================
-- Add Terms Acceptance Tracking to user_user table
-- ============================================================================
--
-- Este archivo agrega el campo para rastrear cuándo el usuario aceptó
-- los términos y condiciones y la política de privacidad
--
-- Para aplicar esta migración:
-- 1. Abre el SQL Editor en Supabase Dashboard:
--    https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/sql
-- 2. Copia y pega este archivo completo
-- 3. Click en "Run" para ejecutar
--
-- O desde CLI:
-- npx supabase db push
-- ============================================================================

-- Agregar columna terms_accepted_at a la tabla user_user
ALTER TABLE public.user_user
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ;

-- Agregar comentario a la columna para documentación
COMMENT ON COLUMN public.user_user.terms_accepted_at IS
'Timestamp cuando el usuario aceptó los términos y condiciones y política de privacidad durante el sign-up';

-- Opcional: Crear índice para queries que filtren por usuarios que aceptaron términos
CREATE INDEX IF NOT EXISTS idx_user_user_terms_accepted
ON public.user_user(terms_accepted_at)
WHERE terms_accepted_at IS NOT NULL;
