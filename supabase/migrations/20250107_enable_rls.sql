-- ============================================================================
-- Row Level Security (RLS) Policies for User Tables
-- ============================================================================
--
-- IMPORTANT: Este archivo debe ejecutarse DESPUÉS de deployar el webhook
--
-- Para aplicar estas políticas:
-- 1. Abre el SQL Editor en Supabase Dashboard:
--    https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/sql
-- 2. Copia y pega este archivo completo
-- 3. Click en "Run" para ejecutar
--
-- O desde CLI:
-- npx supabase db push
-- ============================================================================

-- ============================================================================
-- PASO 1: Habilitar Row Level Security en las tablas principales
-- ============================================================================

-- Habilitar RLS en user_user
ALTER TABLE public.user_user ENABLE ROW LEVEL SECURITY;

-- Habilitar RLS en user_profile
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PASO 2: Políticas para user_user
-- ============================================================================

-- Política: Permitir SELECT solo a service_role (webhooks y admin)
-- Los usuarios NO pueden leer directamente de user_user desde la app
-- Deben usar las funciones RPC o queries con joins a través de user_profile
CREATE POLICY "Service role can read all users"
ON public.user_user
FOR SELECT
TO service_role
USING (true);

-- Política: Solo service_role puede insertar (via webhook o sign-up)
CREATE POLICY "Service role can insert users"
ON public.user_user
FOR INSERT
TO service_role
WITH CHECK (true);

-- Política: Solo service_role puede actualizar
CREATE POLICY "Service role can update users"
ON public.user_user
FOR UPDATE
TO service_role
USING (true);

-- Política: Solo service_role puede eliminar (soft delete)
CREATE POLICY "Service role can delete users"
ON public.user_user
FOR DELETE
TO service_role
USING (true);

-- ============================================================================
-- PASO 3: Políticas para user_profile
-- ============================================================================

-- Política: Permitir SELECT solo a service_role
-- Similar a user_user, el acceso desde la app será via RPC functions
CREATE POLICY "Service role can read all profiles"
ON public.user_profile
FOR SELECT
TO service_role
USING (true);

-- Política: Solo service_role puede insertar
CREATE POLICY "Service role can insert profiles"
ON public.user_profile
FOR INSERT
TO service_role
WITH CHECK (true);

-- Política: Solo service_role puede actualizar
CREATE POLICY "Service role can update profiles"
ON public.user_profile
FOR UPDATE
TO service_role
USING (true);

-- Política: Solo service_role puede eliminar
CREATE POLICY "Service role can delete profiles"
ON public.user_profile
FOR DELETE
TO service_role
USING (true);

-- ============================================================================
-- PASO 4: Funciones RPC para acceso seguro desde la app
-- ============================================================================

-- Función: Obtener perfil del usuario autenticado
-- La app llamará a esta función con el clerk_user_id del usuario autenticado
--
-- Uso desde la app:
-- const { data } = await supabase.rpc('get_user_profile', {
--   p_clerk_user_id: clerkUserId
-- });
--
CREATE OR REPLACE FUNCTION public.get_user_profile(p_clerk_user_id TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER -- Ejecuta con permisos de owner (bypassa RLS)
AS $$
DECLARE
  v_result json;
BEGIN
  -- Obtener usuario y perfil en una sola query
  SELECT json_build_object(
    'user', row_to_json(u.*),
    'profile', row_to_json(p.*)
  )
  INTO v_result
  FROM user_user u
  LEFT JOIN user_profile p ON p.user_id = u.id
  WHERE u.clerk_user_id = p_clerk_user_id
    AND u.deleted_at IS NULL;

  RETURN v_result;
END;
$$;

-- Función: Actualizar perfil del usuario
--
-- Uso desde la app:
-- const { data } = await supabase.rpc('update_user_profile', {
--   p_clerk_user_id: clerkUserId,
--   p_first_name: 'John',
--   p_last_name: 'Doe',
--   p_phone: '+1234567890',
--   p_country: 'United States'
-- });
--
CREATE OR REPLACE FUNCTION public.update_user_profile(
  p_clerk_user_id TEXT,
  p_first_name TEXT DEFAULT NULL,
  p_last_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_country TEXT DEFAULT NULL,
  p_birth_date DATE DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_height_cm NUMERIC DEFAULT NULL,
  p_weight_kg NUMERIC DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_result json;
BEGIN
  -- Obtener user_id
  SELECT id INTO v_user_id
  FROM user_user
  WHERE clerk_user_id = p_clerk_user_id
    AND deleted_at IS NULL;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Actualizar profile (solo campos no NULL)
  UPDATE user_profile
  SET
    first_name = COALESCE(p_first_name, first_name),
    last_name = COALESCE(p_last_name, last_name),
    phone = COALESCE(p_phone, phone),
    country = COALESCE(p_country, country),
    birth_date = COALESCE(p_birth_date, birth_date),
    gender = COALESCE(p_gender, gender),
    city = COALESCE(p_city, city),
    height_cm = COALESCE(p_height_cm, height_cm),
    weight_kg = COALESCE(p_weight_kg, weight_kg),
    updated_at = NOW()
  WHERE user_id = v_user_id;

  -- Retornar perfil actualizado
  SELECT json_build_object(
    'user', row_to_json(u.*),
    'profile', row_to_json(p.*)
  )
  INTO v_result
  FROM user_user u
  LEFT JOIN user_profile p ON p.user_id = u.id
  WHERE u.id = v_user_id;

  RETURN v_result;
END;
$$;

-- Dar permisos de ejecución a authenticated y anon
GRANT EXECUTE ON FUNCTION public.get_user_profile(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.update_user_profile(TEXT, TEXT, TEXT, TEXT, TEXT, DATE, TEXT, TEXT, NUMERIC, NUMERIC) TO authenticated, anon;

-- ============================================================================
-- PASO 5: Verificación
-- ============================================================================

-- Verificar que RLS está habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('user_user', 'user_profile');

-- Debería mostrar:
-- tablename     | rowsecurity
-- --------------|------------
-- user_user     | t
-- user_profile  | t

-- Verificar políticas creadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('user_user', 'user_profile')
ORDER BY tablename, policyname;

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================

-- 1. TODAS las queries desde la app ahora deben usar las funciones RPC:
--    - get_user_profile(clerk_user_id) para leer datos
--    - update_user_profile(...) para actualizar perfil
--
-- 2. NO uses supabase.from('user_user').select() desde la app
--    Esto fallará porque anon role no tiene políticas SELECT
--
-- 3. Los webhooks seguirán funcionando porque usan service_role key
--
-- 4. Para agregar más funciones RPC, sigue el patrón:
--    - SECURITY DEFINER para bypassar RLS
--    - Validar clerk_user_id del usuario autenticado
--    - GRANT EXECUTE a authenticated y anon
--
-- 5. Considera agregar validación adicional:
--    - Rate limiting por usuario
--    - Logging de accesos
--    - Validación de datos de entrada

-- ============================================================================
-- FIN
-- ============================================================================
