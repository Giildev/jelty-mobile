-- ============================================================================
-- Ampliar columnas encriptadas en user_profile
-- ============================================================================
--
-- Problema: Los campos encriptados con AES-256-CBC generan strings base64
-- de 100+ caracteres, pero algunas columnas tienen límite VARCHAR(10) o VARCHAR(50)
--
-- Solución: Convertir todas las columnas que serán encriptadas a tipo TEXT
-- (sin límite de caracteres)
--
-- Campos afectados (según crypto.ts):
-- - first_name, last_name
-- - phone
-- - birth_date
-- - height_cm, weight_kg, bodyfat_percentage
-- - country, city, address, zip_code, country_code
--
-- Para aplicar esta migración:
-- 1. Abre el SQL Editor en Supabase Dashboard
-- 2. Copia y pega este archivo
-- 3. Click en "Run"
--
-- O desde CLI:
-- npx supabase db push
-- ============================================================================

-- Ampliar columnas de texto a TEXT para soportar datos encriptados
ALTER TABLE public.user_profile
  ALTER COLUMN first_name TYPE TEXT,
  ALTER COLUMN last_name TYPE TEXT,
  ALTER COLUMN phone TYPE TEXT,
  ALTER COLUMN birth_date TYPE TEXT,
  ALTER COLUMN country TYPE TEXT,
  ALTER COLUMN city TYPE TEXT,
  ALTER COLUMN address TYPE TEXT,
  ALTER COLUMN zip_code TYPE TEXT,
  ALTER COLUMN country_code TYPE TEXT;

-- Ampliar columnas numéricas a TEXT (ya que estarán encriptadas como strings)
ALTER TABLE public.user_profile
  ALTER COLUMN height_cm TYPE TEXT,
  ALTER COLUMN weight_kg TYPE TEXT,
  ALTER COLUMN bodyfat_percentage TYPE TEXT;

-- Actualizar comentarios para indicar que estos campos están encriptados
COMMENT ON COLUMN public.user_profile.first_name IS 'Nombre del usuario (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.last_name IS 'Apellido del usuario (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.phone IS 'Número de teléfono (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.birth_date IS 'Fecha de nacimiento en formato ISO (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.height_cm IS 'Altura en centímetros (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.weight_kg IS 'Peso en kilogramos (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.bodyfat_percentage IS 'Porcentaje de grasa corporal (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.country IS 'País de residencia (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.city IS 'Ciudad de residencia (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.address IS 'Dirección (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.zip_code IS 'Código postal (ENCRIPTADO con AES-256-CBC)';
COMMENT ON COLUMN public.user_profile.country_code IS 'Código de país para teléfono (ENCRIPTADO con AES-256-CBC)';

-- Verificar que se aplicaron los cambios
SELECT
  column_name,
  data_type,
  character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_profile'
  AND column_name IN (
    'first_name', 'last_name', 'phone', 'birth_date',
    'height_cm', 'weight_kg', 'bodyfat_percentage',
    'country', 'city', 'address', 'zip_code', 'country_code'
  )
ORDER BY column_name;

-- Resultado esperado: Todas las columnas deben mostrar data_type = 'text'
