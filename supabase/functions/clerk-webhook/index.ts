import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";
import { Webhook } from "https://esm.sh/svix@1.81.0";

const CLERK_WEBHOOK_SECRET = Deno.env.get("CLERK_WEBHOOK_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

/**
 * Clerk Webhook Handler
 * Sincroniza eventos de usuarios de Clerk con Supabase
 *
 * Eventos manejados:
 * - user.created: Crea usuario en Supabase
 * - user.updated: Actualiza datos del usuario
 * - user.deleted: Soft delete del usuario
 */

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    phone_numbers?: Array<{ phone_number: string }>;
    [key: string]: any;
  };
}

serve(async (req) => {
  try {
    // Verificar método HTTP
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verificar variables de entorno
    if (!CLERK_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener headers para verificación de firma
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response(
        JSON.stringify({ error: "Missing svix headers" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener body del request
    const body = await req.text();

    // Verificar firma del webhook con Svix
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let evt: ClerkWebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkWebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Crear cliente de Supabase con service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Manejar diferentes tipos de eventos
    const { type, data } = evt;

    console.log(`Received webhook event: ${type}`, data);

    switch (type) {
      case "user.created": {
        // Extraer datos del usuario
        const clerkUserId = data.id;
        const email = data.email_addresses?.[0]?.email_address || "";

        // IMPORTANT: Verificar si el usuario ya existe para evitar race condition
        // (La app puede crear el usuario antes que llegue el webhook)
        const { data: existingUser } = await supabase
          .from("user_user")
          .select("id")
          .eq("clerk_user_id", clerkUserId)
          .single();

        if (existingUser) {
          console.log(`User already exists in Supabase: ${existingUser.id}`);
          return new Response(
            JSON.stringify({
              success: true,
              message: "User already exists",
              user_id: existingUser.id
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        // Crear usuario en user_user
        const { data: user, error: userError } = await supabase
          .from("user_user")
          .insert({
            clerk_user_id: clerkUserId,
            email: email,
            status: "active",
          })
          .select()
          .single();

        if (userError) {
          console.error("Error creating user:", userError);
          return new Response(
            JSON.stringify({ error: "Failed to create user" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        // IMPORTANT: Crear profile por defecto para el usuario
        // Esto asegura que todos los usuarios tengan un profile, incluso si el webhook
        // se ejecuta antes que el flujo de sign-up de la app
        const { error: profileError } = await supabase
          .from("user_profile")
          .insert({
            user_id: user.id,
            first_name: "",
            last_name: "",
            phone: null,
            country: null,
            country_code: null,
          });

        if (profileError) {
          console.error("Error creating user profile:", profileError);
          // No fallar el webhook, el profile puede ser creado después por la app
          // o en un intento posterior
        } else {
          console.log(`User profile created for user: ${user.id}`);
        }

        console.log(`User created in Supabase: ${user.id}`);

        return new Response(
          JSON.stringify({ success: true, message: "User created", user_id: user.id }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      case "user.updated": {
        const clerkUserId = data.id;
        const email = data.email_addresses?.[0]?.email_address || "";

        // Actualizar email en user_user si cambió
        const { error: updateError } = await supabase
          .from("user_user")
          .update({
            email: email,
            updated_at: new Date().toISOString(),
          })
          .eq("clerk_user_id", clerkUserId);

        if (updateError) {
          console.error("Error updating user:", updateError);
          return new Response(
            JSON.stringify({ error: "Failed to update user" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        console.log(`User updated in Supabase: ${clerkUserId}`);

        return new Response(
          JSON.stringify({ success: true, message: "User updated" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      case "user.deleted": {
        const clerkUserId = data.id;
        const now = new Date().toISOString();

        // Obtener user_id
        const { data: user } = await supabase
          .from("user_user")
          .select("id")
          .eq("clerk_user_id", clerkUserId)
          .single();

        if (!user) {
          return new Response(
            JSON.stringify({ error: "User not found" }),
            { status: 404, headers: { "Content-Type": "application/json" } }
          );
        }

        // Soft delete user profile
        await supabase
          .from("user_profile")
          .update({ deleted_at: now })
          .eq("user_id", user.id);

        // Soft delete user
        const { error: deleteError } = await supabase
          .from("user_user")
          .update({
            deleted_at: now,
            status: "inactive",
          })
          .eq("id", user.id);

        if (deleteError) {
          console.error("Error deleting user:", deleteError);
          return new Response(
            JSON.stringify({ error: "Failed to delete user" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        console.log(`User deleted in Supabase: ${clerkUserId}`);

        return new Response(
          JSON.stringify({ success: true, message: "User deleted" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      default:
        console.log(`Unhandled event type: ${type}`);
        return new Response(
          JSON.stringify({ success: true, message: "Event ignored" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
