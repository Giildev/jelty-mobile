# ⚠️ PASO CRÍTICO: Ejecutar Migración SQL

## Error Actual

```
Could not find the 'onboarding_completed' column of 'user_profile' in the schema cache
```

Este error indica que la tabla `user_profile` en Supabase NO tiene las columnas necesarias para el onboarding.

---

## Solución: Ejecutar Migración SQL

### Opción 1: Supabase Dashboard (Recomendado)

1. **Ve a tu proyecto en Supabase:**
   - https://supabase.com/dashboard

2. **Abre el SQL Editor:**
   - En el menú lateral, click en "SQL Editor"
   - O ve directamente a: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

3. **Crea una nueva query:**
   - Click en "New query"

4. **Copia y pega este SQL:**

```sql
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
```

5. **Ejecuta la query:**
   - Click en el botón "Run" o presiona `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

6. **Verifica que se ejecutó correctamente:**
   - Deberías ver un mensaje de éxito
   - Si hay algún error, léelo cuidadosamente

---

### Opción 2: Supabase CLI (Alternativa)

Si tienes Supabase CLI instalado:

```bash
# Navega al proyecto
cd /Users/giildev/Documents/jelty

# Ejecuta la migración
npx supabase db push
```

---

## Verificar que Funcionó

Después de ejecutar la migración, verifica que las columnas se crearon:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_profile'
AND column_name IN ('onboarding_completed', 'measurement_system', 'activity_level');
```

Deberías ver:

| column_name | data_type | is_nullable |
|------------|-----------|-------------|
| onboarding_completed | boolean | YES |
| measurement_system | character varying | YES |
| activity_level | character varying | YES |

---

## Actualizar Usuarios Existentes (Opcional)

Si tienes usuarios existentes en la BD, actualízalos:

```sql
-- Marcar todos los usuarios existentes con onboarding incompleto
UPDATE user_profile
SET onboarding_completed = false
WHERE onboarding_completed IS NULL;

-- Establecer sistema métrico por defecto
UPDATE user_profile
SET measurement_system = 'metric'
WHERE measurement_system IS NULL;
```

---

## Siguiente Paso

Una vez ejecutada la migración:

1. **Reinicia tu app Expo:**
   ```bash
   # Detén el servidor (Ctrl+C)
   # Reinicia
   npm start
   ```

2. **Prueba el flujo completo:**
   - Crea una nueva cuenta
   - Verifica el email
   - Deberías ser redirigido al onboarding
   - Completa el formulario
   - Los datos deben guardarse sin errores

---

## Troubleshooting

### Si aún ves el error después de ejecutar la migración:

1. **Verifica que la migración se ejecutó:**
   ```sql
   \d user_profile
   ```

2. **Limpia el caché de Supabase:**
   - En Supabase Dashboard, ve a Settings → API
   - Click en "Refresh schema cache"

3. **Reinicia completamente la app:**
   - Cierra Metro bundler
   - Limpia caché: `npx expo start -c`

### Si ves un error de constraint:

Si obtienes un error como "constraint already exists", ejecuta esto primero:

```sql
-- Eliminar constraints existentes
ALTER TABLE user_profile
DROP CONSTRAINT IF EXISTS check_measurement_system;

ALTER TABLE user_profile
DROP CONSTRAINT IF EXISTS check_activity_level;

-- Luego ejecuta la migración completa de nuevo
```

---

**Archivo de migración ubicado en:**
`/Users/giildev/Documents/jelty/supabase/migrations/add_onboarding_fields.sql`
