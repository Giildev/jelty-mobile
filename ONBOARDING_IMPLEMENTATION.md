# Onboarding Implementation - Step 1 Complete

## ✅ Implementación Completada

Se ha implementado exitosamente el **Paso 1 del Onboarding (Personal Information)** para la aplicación Jelty.

### Archivos Creados

#### Componentes UI
1. `/components/onboarding/ProgressIndicator.tsx` - Indicador de progreso del wizard
2. `/components/onboarding/DatePicker.tsx` - Selector de fecha de nacimiento
3. `/components/onboarding/GenderSelector.tsx` - Selector de género
4. `/components/onboarding/MeasurementToggle.tsx` - Toggle Métrico/Imperial
5. `/components/onboarding/ActivityLevelDropdown.tsx` - Dropdown para nivel de actividad
6. `/components/onboarding/NumberInput.tsx` - Input numérico con conversión de unidades

#### Validación y Schemas
7. `/utils/validation/onboardingSchemas.ts` - Schemas de validación con Zod para onboarding

#### Servicios
8. `/services/supabase/onboarding.ts` - Servicios para manejar onboarding en Supabase

#### Rutas y Pantallas
9. `/app/(onboarding)/_layout.tsx` - Layout del wizard de onboarding
10. `/app/(onboarding)/step-1.tsx` - Pantalla del Step 1 (Personal Information)

#### Migraciones
11. `/supabase/migrations/add_onboarding_fields.sql` - Migración SQL para agregar campos

### Archivos Modificados

1. **`/types/supabase.ts`**
   - Agregado campo `onboarding_completed` a `SupabaseUserProfile`
   - Agregado campos `measurement_system` y `activity_level`
   - Actualizado `UpdateUserProfileData`

2. **`/store/userStore.ts`**
   - Extendido interface `User` con campos de onboarding

3. **`/services/supabase/users.ts`**
   - Modificado `createUser` para setear `onboarding_completed: false` por defecto

4. **`/app/(auth)/sign-up.tsx`**
   - Cambiado redirección de `/(tabs)` a `/(onboarding)/step-1`

5. **`/app/(tabs)/_layout.tsx`**
   - Agregada verificación de onboarding completado
   - Redirección automática a onboarding si no está completado

---

## 🚀 Pasos para Completar la Implementación

### 1. Ejecutar Migración de Base de Datos

Debes ejecutar la migración SQL en tu base de datos Supabase para agregar las columnas necesarias:

```bash
# Opción A: Usar Supabase CLI
npx supabase db push

# Opción B: Ejecutar manualmente en Supabase Dashboard
# 1. Ve a https://supabase.com/dashboard/project/YOUR_PROJECT/editor
# 2. Abre el SQL Editor
# 3. Copia y pega el contenido de supabase/migrations/add_onboarding_fields.sql
# 4. Ejecuta la query
```

**Contenido de la migración:**
```sql
ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS measurement_system VARCHAR(20) DEFAULT 'metric';

ALTER TABLE user_profile
ADD COLUMN IF NOT EXISTS activity_level VARCHAR(50);

ALTER TABLE user_profile
ADD CONSTRAINT check_measurement_system
CHECK (measurement_system IN ('metric', 'imperial'));

ALTER TABLE user_profile
ADD CONSTRAINT check_activity_level
CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'));
```

### 2. Actualizar Row Level Security (RLS) en Supabase

Asegúrate de que las políticas de RLS permitan a los usuarios actualizar su perfil:

```sql
-- Policy para permitir que usuarios actualicen su propio perfil
CREATE POLICY "Users can update own profile"
ON user_profile FOR UPDATE
USING (auth.uid()::text = (
  SELECT clerk_user_id FROM user_user WHERE id = user_profile.user_id
))
WITH CHECK (auth.uid()::text = (
  SELECT clerk_user_id FROM user_user WHERE id = user_profile.user_id
));
```

### 3. Verificar Instalación de Dependencias

La dependencia `@react-native-community/datetimepicker` ya fue instalada automáticamente.

### 4. Probar el Flujo

1. **Crear un nuevo usuario:**
   ```bash
   npm start
   # Navega a sign-up y crea una cuenta nueva
   ```

2. **Verificar redirección al onboarding:**
   - Después de verificar el email, deberías ser redirigido a `/onboarding/step-1`
   - La pantalla mostrará "Step 1 of 9 - Personal Information"

3. **Completar el formulario:**
   - Llena todos los campos obligatorios
   - Presiona "Next"
   - Por ahora, serás redirigido a `/(tabs)` (placeholder hasta implementar step 2)

4. **Verificar en base de datos:**
   - Los datos deben guardarse en la tabla `user_profile`
   - El campo `onboarding_completed` debe ser `false` por ahora

---

## 📋 Campos Recolectados en Step 1

### Información Personal
- ✅ First Name (required)
- ✅ Last Name (required)
- ✅ Email (readonly, pre-poblado desde sign-up)
- ✅ Phone Number (readonly, pre-poblado desde sign-up)
- ✅ Birth Date (required, formato dd/mm/yyyy)
- ✅ Gender (required: Male, Female, Other, Prefer not to say)

### Información Física
- ✅ Measurement System (required: Metric/Imperial)
- ✅ Height (required, en cm o ft)
- ✅ Weight (required, en kg o lb)
- ✅ Body Fat % (optional)
- ✅ Activity Level (required: Sedentary, Lightly Active, Moderately Active, Very Active, Extra Active)

### Ubicación
- ✅ Country (required, selector de país)
- ✅ City (required)
- ✅ Address (required)
- ✅ ZIP Code (required)

---

## 🔄 Flujo de Onboarding Implementado

```
Sign-Up → Verify Email → Onboarding Step 1 → [Step 2-9] → Tabs (Home)
                              ↓
                       Save to Supabase
                       (onboarding_completed: false)
```

### Redirecciones Automáticas

1. **Al crear cuenta nueva:**
   - `sign-up.tsx` → `/(onboarding)/step-1`

2. **Al hacer login con onboarding incompleto:**
   - `tabs/_layout.tsx` verifica `onboarding_completed`
   - Si es `false` → Redirect a `/(onboarding)/step-1`

3. **Al completar onboarding (futuro):**
   - Marcar `onboarding_completed: true`
   - Redirect a `/(tabs)`

---

## 🎨 Características de UI Implementadas

### Progress Indicator
- Muestra "Step 1 of 9" con porcentaje (11%)
- Barra de progreso visual
- Label del paso actual

### Form Components
- **DatePicker**: Modal nativo (iOS) y picker estándar (Android)
- **GenderSelector**: 4 botones en grid 2x2
- **MeasurementToggle**: Toggle estilo iOS entre Metric/Imperial
- **ActivityLevelDropdown**: Modal con lista de opciones
- **NumberInput**: Input con conversión automática entre unidades

### Validación
- Validación en tiempo real con Zod
- Mensajes de error en español
- Todos los campos obligatorios (según requerimientos)
- Validación de edad mínima (13 años)

### Navegación
- Botón "Back" (top-left)
- Botón "Skip" (top-right)
- Botón "Next" (bottom)
- Link "Skip for now" (bottom)
- Mensaje de privacidad (bottom)

---

## 🔮 Próximos Pasos (Steps 2-9)

Para completar el wizard de onboarding, necesitas implementar:

1. **Step 2**: [Define el contenido]
2. **Step 3**: [Define el contenido]
3. **Step 4**: [Define el contenido]
4. **Step 5**: [Define el contenido]
5. **Step 6**: [Define el contenido]
6. **Step 7**: [Define el contenido]
7. **Step 8**: [Define el contenido]
8. **Step 9**: [Define el contenido]

### Al completar el último paso:

```typescript
// En el último step del onboarding
await markOnboardingComplete(userId);
router.replace("/(tabs)");
```

---

## 🛠️ Debugging

### Si el onboarding no se muestra:

1. **Verificar que la migración se ejecutó:**
   ```sql
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'user_profile'
   AND column_name IN ('onboarding_completed', 'measurement_system', 'activity_level');
   ```

2. **Verificar valor de onboarding_completed:**
   ```sql
   SELECT email, onboarding_completed
   FROM user_user
   JOIN user_profile ON user_user.id = user_profile.user_id;
   ```

3. **Forzar redirect al onboarding:**
   ```sql
   UPDATE user_profile SET onboarding_completed = false WHERE user_id = 'YOUR_USER_ID';
   ```

### Logs útiles:

El código ya incluye logs en consola para debugging:
- "Error checking onboarding:" - Error al verificar estado
- "Error loading user data:" - Error al cargar datos del usuario
- "Error saving onboarding step 1:" - Error al guardar

---

## 📱 Diseño Responsive

Todos los componentes soportan:
- ✅ Dark mode
- ✅ Safe areas (iOS/Android)
- ✅ Keyboard avoidance
- ✅ ScrollView para pantallas pequeñas

---

## 🔐 Seguridad

- ✅ Email y Phone son readonly (no se pueden modificar)
- ✅ Datos encriptados en tránsito (Supabase SSL)
- ✅ Validación server-side en Supabase (RLS)
- ✅ Validación client-side con Zod

---

**Fecha de implementación:** 2025-11-07
**Versión:** 1.0.0
**Estado:** ✅ Listo para pruebas
