-- ============================================================================
-- Agregar campo country_code a user_profile
-- ============================================================================
--
-- Este campo almacena el código de marcación del país (ej: +1, +52, +34)
-- Es necesario para mostrar el número de teléfono completo al usuario
--
-- Para aplicar esta migración:
-- 1. Abre el SQL Editor en Supabase Dashboard:
--    https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/sql
-- 2. Copia y pega este archivo
-- 3. Click en "Run"
--
-- O desde CLI:
-- npx supabase db push
-- ============================================================================

-- Agregar columna country_code a user_profile
ALTER TABLE public.user_profile
ADD COLUMN IF NOT EXISTS country_code VARCHAR(10);

-- Agregar comentario para documentación
COMMENT ON COLUMN public.user_profile.country_code IS 'Código de marcación del país (ej: +1, +52, +34). Se captura durante el sign-up.';

-- Verificar que se agregó correctamente
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_profile'
  AND column_name = 'country_code';

-- Resultado esperado:
-- column_name  | data_type        | character_maximum_length
-- -------------|------------------|-------------------------
-- country_code | character varying| 10
