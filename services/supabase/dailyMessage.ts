import { supabase } from "./client";
import type { DbSystemDailyMessage } from "@/types/database";

/**
 * Get the daily motivational message based on current day of month
 * Uses the PostgreSQL function get_daily_message()
 *
 * @returns The motivational message for today, or null if not found
 */
export async function getDailyMessage(): Promise<DbSystemDailyMessage | null> {
  try {
    const { data, error } = await supabase.rpc("get_daily_message").single();

    if (error) {
      console.error("[getDailyMessage] Error fetching daily message:", error);
      return null;
    }

    return data as DbSystemDailyMessage;
  } catch (err) {
    console.error("[getDailyMessage] Unexpected error:", err);
    return null;
  }
}

/**
 * Get a specific message by day of month (for testing/preview)
 *
 * @param dayOfMonth - Day of month (1-30)
 * @returns The motivational message for the specified day, or null if not found
 */
export async function getDailyMessageByDay(
  dayOfMonth: number
): Promise<DbSystemDailyMessage | null> {
  try {
    const { data, error } = await supabase
      .from("system_daily_message")
      .select("*")
      .eq("day_of_month", dayOfMonth)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("[getDailyMessageByDay] Error:", error);
      return null;
    }

    return data as DbSystemDailyMessage;
  } catch (err) {
    console.error("[getDailyMessageByDay] Unexpected error:", err);
    return null;
  }
}
