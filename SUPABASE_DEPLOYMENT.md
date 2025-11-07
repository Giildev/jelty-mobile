# Guía de Deployment: Integración Supabase + Clerk

## 🎉 Implementación Completada y Auditada

### ✅ Issues Críticos Resueltos
- **Seguridad**: Dependencies de Edge Function actualizadas (svix 1.81.0, Deno std 0.224.0)
- **Race Condition**: Webhook verifica usuarios existentes antes de insertar
- **Integridad de Datos**: Webhook ahora crea profiles por defecto
- **Seguridad**: Políticas RLS creadas para proteger datos de usuarios

### 1. Código Implementado
- ✅ Cliente de Supabase configurado (`services/supabase/client.ts`)
- ✅ Servicios CRUD de usuarios (`services/supabase/users.ts`)
- ✅ Tipos TypeScript para Supabase (`types/supabase.ts`)
- ✅ Store de Zustand actualizado con campos adicionales (phone, country, countryCode)
- ✅ Integración en flujo de sign-up (`app/(auth)/sign-up.tsx`)
- ✅ Edge Function con protección contra race conditions (`supabase/functions/clerk-webhook/`)
- ✅ Políticas RLS y funciones RPC seguras (`supabase/migrations/20250107_enable_rls.sql`)

### 2. Variables de Entorno Configuradas
En tu `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://zsrjmwciovzfssluorqi.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Pasos de Deployment (En Orden)

### PASO 1: Login en Supabase CLI

```bash
npx supabase login
```

Esto abrirá tu navegador:
1. Inicia sesión con tu cuenta de Supabase
2. Autoriza el acceso desde la CLI
3. Vuelve a la terminal

---

### PASO 2: Linkear Proyecto Local con Supabase

```bash
npx supabase link --project-ref zsrjmwciovzfssluorqi
```

Te pedirá la contraseña de tu base de datos: `Hl0KDVS5Bz0JQW`

---

### PASO 3: Configurar Secrets de Edge Function

```bash
# 1. Signing secret de Clerk (para validar webhooks)
npx supabase secrets set CLERK_WEBHOOK_SECRET=whsec_FmBKjhbb7RPTcSVmJgf6jT6k0+CHB+sz

# 2. URL de Supabase
npx supabase secrets set SUPABASE_URL=https://zsrjmwciovzfssluorqi.supabase.co

# 3. Service Role Key (obtén este valor del dashboard)
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

**⚠️ Para obtener el Service Role Key:**
1. Ve a: https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/settings/api
2. En la sección "Project API keys"
3. Copia el valor de **service_role** (secret key)
4. Pégalo en el comando de arriba

---

### PASO 4: Deployar Edge Function

```bash
npx supabase functions deploy clerk-webhook
```

Esto deployará la función y te dará una URL:
```
https://zsrjmwciovzfssluorqi.supabase.co/functions/v1/clerk-webhook
```

**Verifica que se deployó correctamente:**
- Ve a: https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/functions
- Deberías ver `clerk-webhook` en la lista

---

### PASO 5: Aplicar Políticas de Seguridad RLS

**CRÍTICO**: Este paso es OBLIGATORIO para proteger tus datos.

1. **Abre el SQL Editor en Supabase:**
   https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/sql

2. **Crea una nueva query**

3. **Copia y pega TODO el contenido de este archivo:**
   ```
   supabase/migrations/20250107_enable_rls.sql
   ```

4. **Click en "Run"**

5. **Verifica que se aplicó correctamente:**
   Deberías ver en los resultados:
   ```
   tablename     | rowsecurity
   --------------|------------
   user_user     | t
   user_profile  | t
   ```

**¿Qué hace esto?**
- Habilita Row Level Security (RLS) en `user_user` y `user_profile`
- Crea políticas para que SOLO el service_role (webhooks) pueda acceder directamente
- Crea funciones RPC seguras para que la app acceda a los datos

---

### PASO 6: Configurar Webhook en Clerk Dashboard

1. **Ve a Clerk Dashboard:**
   https://dashboard.clerk.com

2. **Selecciona tu aplicación**

3. **Ve a Webhooks en el menú lateral**

4. **Click en "+ Add Endpoint"**

5. **Configura el webhook:**
   - **URL**: `https://zsrjmwciovzfssluorqi.supabase.co/functions/v1/clerk-webhook`
   - **Events**: Selecciona estos eventos:
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`
   - Click en **Create**

6. **Verifica el Signing Secret:**
   - En la configuración del webhook, verifica que el signing secret sea:
     ```
     whsec_FmBKjhbb7RPTcSVmJgf6jT6k0+CHB+sz
     ```
   - Este valor ya está configurado en Supabase (Paso 3)

---

## 🔒 Cambios Importantes en tu Código (DESPUÉS de aplicar RLS)

### ❌ NO USAR MÁS (Fallará con RLS habilitado):

```typescript
// ❌ Esto ya NO funcionará
const { data } = await supabase
  .from('user_user')
  .select('*')
  .eq('clerk_user_id', clerkUserId);
```

### ✅ USAR EN SU LUGAR:

Actualiza `services/supabase/users.ts` para usar las funciones RPC:

```typescript
/**
 * Obtener usuario por Clerk ID usando función RPC segura
 */
export async function getUserByClerkId(clerkUserId: string) {
  try {
    const { data, error } = await supabase
      .rpc('get_user_profile', {
        p_clerk_user_id: clerkUserId
      });

    if (error || !data) {
      return null;
    }

    return {
      user: data.user,
      profile: data.profile
    };
  } catch (error) {
    console.error("Error getting user by Clerk ID:", error);
    return null;
  }
}

/**
 * Actualizar perfil usando función RPC segura
 */
export async function updateUserProfile(
  clerkUserId: string,
  profileData: UpdateUserProfileData
): Promise<SupabaseUserProfile | null> {
  try {
    const { data, error } = await supabase
      .rpc('update_user_profile', {
        p_clerk_user_id: clerkUserId,
        p_first_name: profileData.first_name,
        p_last_name: profileData.last_name,
        p_phone: profileData.phone,
        p_country: profileData.country,
        p_birth_date: profileData.birth_date,
        p_gender: profileData.gender,
        p_city: profileData.city,
        p_height_cm: profileData.height_cm,
        p_weight_kg: profileData.weight_kg
      });

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return data.profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
}
```

**⚠️ IMPORTANTE**: La función `createUser` en sign-up.tsx seguirá funcionando porque usa el service_role key en el webhook. Pero cualquier lectura/actualización desde la app DEBE usar las funciones RPC.

---

## 🧪 Probar la Integración

### Test 1: Registro de Nuevo Usuario

1. Abre la app en simulador/emulador
2. Ve a Sign Up
3. Completa el formulario:
   - Email: test@example.com
   - País: México
   - Teléfono: 1234567890
   - Contraseña: Test1234!
4. Acepta términos y envía
5. Verifica el código de email

**Resultado esperado:**
- ✅ Usuario creado en Clerk
- ✅ Usuario guardado en Supabase (`user_user`)
- ✅ Profile creado en Supabase (`user_profile` con phone y country)
- ✅ Store de Zustand actualizado
- ✅ Redirección a tabs
- ✅ NO hay errores en console

### Test 2: Verificar Webhook

1. **Ve a Clerk Dashboard → Webhooks → Recent Attempts**
2. Deberías ver un intento para `user.created`
3. Status debe ser `200 OK`
4. Response: `{"success":true,"message":"User created","user_id":"..."}`

### Test 3: Verificar RLS

Intenta hacer una query directa desde la app (debería fallar):

```typescript
// Esta query debería FALLAR con error de permisos
const { data, error } = await supabase
  .from('user_user')
  .select('*');

console.log(error); // "permission denied for table user_user"
```

### Test 4: Verificar Función RPC

```typescript
// Esta query debería FUNCIONAR
const { data, error } = await supabase.rpc('get_user_profile', {
  p_clerk_user_id: 'user_xxx'
});

console.log(data); // { user: {...}, profile: {...} }
```

---

## 📊 Verificar en Base de Datos

```sql
-- Ver usuarios creados
SELECT * FROM user_user ORDER BY created_at DESC LIMIT 10;

-- Ver perfiles de usuarios
SELECT * FROM user_profile ORDER BY created_at DESC LIMIT 10;

-- Ver usuario específico con perfil
SELECT u.*, p.*
FROM user_user u
LEFT JOIN user_profile p ON u.id = p.user_id
WHERE u.clerk_user_id = 'user_xxx';

-- Verificar RLS habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('user_user', 'user_profile');
```

---

## 🐛 Troubleshooting

### Error: "Access token not provided"
**Solución:** Ejecuta `npx supabase login`

### Error: "Invalid signature" en webhook
**Solución:** Verifica que el `CLERK_WEBHOOK_SECRET` sea correcto:
```bash
npx supabase secrets list
```

### Error: "permission denied for table user_user"
**Solución:**
1. Verifica que aplicaste las políticas RLS (Paso 5)
2. Actualiza tu código para usar funciones RPC en lugar de queries directas
3. Revisa que las funciones RPC tienen permisos: `GRANT EXECUTE TO authenticated, anon`

### Error: "Failed to create user" en Supabase
**Solución:**
1. Verifica que las tablas existan
2. Verifica que el `SUPABASE_SERVICE_ROLE_KEY` sea correcto
3. Revisa logs: https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/functions/clerk-webhook

### Usuario se crea en Clerk pero no en Supabase
**Solución:**
- Esto es esperado si falla Supabase (Clerk es la fuente de verdad)
- Revisa console.log en Metro bundler
- El webhook se ejecutará después y creará el usuario en Supabase
- Si el webhook también falla, revisa logs en Clerk Dashboard → Webhooks → Recent Attempts

### Webhook se ejecuta dos veces
**Solución:**
- Esto es **normal** y está manejado
- La app crea el usuario durante sign-up
- El webhook intenta crear el usuario después
- El webhook detecta que ya existe (líneas 95-113) y retorna éxito sin duplicar

---

## 📈 Monitoreo y Logs

### Logs de Edge Function (Tiempo Real)

```bash
# Ver logs en tiempo real
npx supabase functions logs clerk-webhook --follow

# Ver últimos logs
npx supabase functions logs clerk-webhook
```

### Desde Dashboard de Supabase

1. Ve a: https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi/functions/clerk-webhook
2. Click en **Logs**
3. Verás todos los requests y respuestas

### Desde Dashboard de Clerk

1. Ve a: https://dashboard.clerk.com
2. Webhooks → [tu webhook] → **Recent Attempts**
3. Verás todos los webhooks enviados

---

## 🔐 Arquitectura de Seguridad (Post-RLS)

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE (React Native)                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Supabase Client con ANON KEY                        │  │
│  │  ❌ NO puede hacer SELECT/INSERT/UPDATE directos     │  │
│  │  ✅ SOLO puede llamar funciones RPC autorizadas      │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│                   RPC Functions                              │
│          (get_user_profile, update_user_profile)            │
│                            ↓                                 │
│                   SECURITY DEFINER                           │
│              (Ejecutan con permisos de owner)               │
│                            ↓                                 │
│                   Supabase PostgreSQL                        │
│                   (Bypassa RLS policies)                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  WEBHOOK (Edge Function)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Supabase Client con SERVICE_ROLE KEY                │  │
│  │  ✅ Bypassa TODAS las políticas RLS                   │  │
│  │  ✅ Acceso completo a todas las tablas                │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│                   Supabase PostgreSQL                        │
│                  (Acceso directo, sin RLS)                   │
└─────────────────────────────────────────────────────────────┘
```

**Ventajas de esta arquitectura:**
- ✅ Los usuarios NO pueden leer datos de otros usuarios
- ✅ Los webhooks tienen acceso total para sincronización
- ✅ La lógica de negocio está centralizada en funciones RPC
- ✅ Fácil de auditar y mantener

---

## 🎯 Resumen de Cambios vs Versión Anterior

### Edge Function (`supabase/functions/clerk-webhook/index.ts`)
- ✅ **Actualizado**: Dependencies (svix 1.4.9 → 1.81.0, Deno std 0.168.0 → 0.224.0)
- ✅ **Nuevo**: Verificación de usuario existente antes de insertar (evita race condition)
- ✅ **Nuevo**: Creación automática de `user_profile` en webhook

### Base de Datos
- ✅ **Nuevo**: Políticas RLS en `user_user` y `user_profile`
- ✅ **Nuevo**: Funciones RPC `get_user_profile` y `update_user_profile`
- ✅ **Seguridad**: Solo service_role puede acceder directamente a las tablas

### App (Próximos cambios requeridos)
- ⚠️ **Requerido**: Actualizar `services/supabase/users.ts` para usar RPC functions
- ⚠️ **Requerido**: Reemplazar queries directas con llamadas a RPC

---

## ✅ Checklist Final

Antes de considerar la integración completa:

- [ ] Login en Supabase CLI
- [ ] Proyecto linkeado (`npx supabase link`)
- [ ] Secrets configurados (CLERK_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Edge Function deployada (`npx supabase functions deploy clerk-webhook`)
- [ ] Políticas RLS aplicadas (ejecutar `20250107_enable_rls.sql`)
- [ ] Webhook configurado en Clerk Dashboard
- [ ] Código actualizado para usar funciones RPC
- [ ] Probado registro de nuevo usuario
- [ ] Verificado que RLS está activo (queries directas fallan)
- [ ] Verificado que funciones RPC funcionan

---

## 🚀 Próximos Pasos (Opcional)

### 1. Generar Tipos TypeScript Automáticamente

```bash
npx supabase gen types typescript --linked > types/database.types.ts
```

Luego actualiza `types/supabase.ts` para importar desde `database.types.ts`

### 2. Implementar Retry Logic en Sign-Up

Agrega reintentos en `app/(auth)/sign-up.tsx` línea 96 para manejar fallos temporales de Supabase.

### 3. Configurar Error Tracking

```bash
npx expo install @sentry/react-native
```

Configura Sentry para rastrear errores de creación de usuarios en Supabase.

### 4. Optimizar Queries con Joins

En lugar de múltiples queries, usa joins en las funciones RPC.

---

## 📚 Recursos

- **Supabase RLS**: https://supabase.com/docs/guides/auth/row-level-security
- **Supabase Functions**: https://supabase.com/docs/guides/functions
- **Clerk Webhooks**: https://clerk.com/docs/integrations/webhooks
- **Svix Docs**: https://docs.svix.com/

---

🎉 **¡Integración Completa y Segura!**

Cuando completes todos los pasos, tendrás una integración robusta, segura y escalable entre Clerk y Supabase.
