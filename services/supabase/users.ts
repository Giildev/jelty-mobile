import { supabase, supabaseAdmin } from "./client";
import type {
  SupabaseUser,
  SupabaseUserProfile,
  CreateUserData,
  UpdateUserProfileData,
} from "@/types/supabase";

/**
 * User Service
 * Handles all user-related database operations in Supabase
 * Uses supabaseAdmin for write operations to bypass RLS
 */

/**
 * Creates a new user in Supabase
 * Creates records in both user_user and user_profile tables
 *
 * @param userData - User data from sign-up form
 * @returns Created user with profile data
 * @throws Error if user creation fails
 *
 * @example
 * const user = await createUser({
 *   clerk_user_id: 'user_123',
 *   email: 'user@example.com',
 *   phone: '+1234567890',
 *   country: 'United States',
 *   country_code: '+1',
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   termsAccepted: true
 * });
 */
export async function createUser(userData: CreateUserData): Promise<{
  user: SupabaseUser;
  profile: SupabaseUserProfile;
}> {
  try {
    // 1. Create user in user_user table (using admin client to bypass RLS)
    const { data: user, error: userError } = await supabaseAdmin
      .from("user_user")
      .insert({
        clerk_user_id: userData.clerk_user_id,
        email: userData.email,
        status: "active",
        terms_accepted_at: userData.termsAccepted ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    if (!user) {
      throw new Error("User creation returned no data");
    }

    // 2. Create user profile in user_profile table (using admin client)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("user_profile")
      .insert({
        user_id: user.id,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone,
        country: userData.country,
        country_code: userData.country_code,
        onboarding_completed: false, // User needs to complete onboarding
      })
      .select()
      .single();

    if (profileError) {
      // If profile creation fails, we should delete the user to maintain consistency
      await supabaseAdmin.from("user_user").delete().eq("id", user.id);
      throw new Error(`Failed to create user profile: ${profileError.message}`);
    }

    if (!profile) {
      await supabaseAdmin.from("user_user").delete().eq("id", user.id);
      throw new Error("Profile creation returned no data");
    }

    return { user, profile };
  } catch (error) {
    console.error("Error creating user in Supabase:", error);
    throw error;
  }
}

/**
 * Gets a user by their Clerk user ID
 * Includes profile data
 *
 * @param clerkUserId - The Clerk user ID
 * @returns User with profile data or null if not found
 *
 * @example
 * const userData = await getUserByClerkId('user_123');
 * if (userData) {
 *   console.log(userData.user.email);
 *   console.log(userData.profile.phone);
 * }
 */
export async function getUserByClerkId(clerkUserId: string): Promise<{
  user: SupabaseUser;
  profile: SupabaseUserProfile;
} | null> {
  try {
    // Get user from user_user table
    const { data: user, error: userError } = await supabase
      .from("user_user")
      .select("*")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (userError || !user) {
      return null;
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    if (profileError || !profile) {
      return null;
    }

    return { user, profile };
  } catch (error) {
    console.error("Error getting user by Clerk ID:", error);
    return null;
  }
}

/**
 * Gets a user and their profile by Supabase UUID
 *
 * @param supabaseUserId - The Supabase user UUID
 * @returns User and profile data, or null if not found
 */
export async function getUserBySupabaseId(supabaseUserId: string): Promise<{
  user: SupabaseUser;
  profile: SupabaseUserProfile;
} | null> {
  try {
    // Get user from user_user table (using admin client to bypass RLS)
    const { data: user, error: userError } = await supabaseAdmin
      .from("user_user")
      .select("*")
      .eq("id", supabaseUserId)
      .is("deleted_at", null)
      .single();

    if (userError || !user) {
      console.error("Error getting user from user_user:", userError);
      return null;
    }

    // Get user profile (using admin client to bypass RLS)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    if (profileError || !profile) {
      console.error("Error getting profile from user_profile:", profileError);
      return null;
    }

    return { user, profile };
  } catch (error) {
    console.error("Error getting user by Supabase ID:", error);
    return null;
  }
}

/**
 * Updates a user's profile information
 *
 * @param clerkUserId - The Clerk user ID
 * @param profileData - Profile data to update
 * @returns Updated profile or null if update fails
 *
 * @example
 * const updated = await updateUserProfile('user_123', {
 *   phone: '+9876543210',
 *   country: 'Canada'
 * });
 */
export async function updateUserProfile(
  clerkUserId: string,
  profileData: UpdateUserProfileData
): Promise<SupabaseUserProfile | null> {
  try {
    // First get the user to find their user_id
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    // Update profile (using admin client)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("user_profile")
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (profileError) {
      throw new Error(`Failed to update profile: ${profileError.message}`);
    }

    return profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
}

/**
 * Soft deletes a user and their profile
 * Sets deleted_at timestamp instead of actually deleting the record
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Success status
 *
 * @example
 * const success = await deleteUser('user_123');
 */
export async function deleteUser(clerkUserId: string): Promise<boolean> {
  try {
    const now = new Date().toISOString();

    // Get user first (using admin client)
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .single();

    if (!user) {
      return false;
    }

    // Soft delete profile (using admin client)
    await supabaseAdmin
      .from("user_profile")
      .update({ deleted_at: now })
      .eq("user_id", user.id);

    // Soft delete user (using admin client)
    const { error } = await supabaseAdmin
      .from("user_user")
      .update({ deleted_at: now, status: "inactive" })
      .eq("id", user.id);

    if (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}
