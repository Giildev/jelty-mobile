/**
 * Meal Time Helper Functions
 * Maps meal slot indexes to specific times and provides time-related utilities
 */

/**
 * Maps slot index to a time string
 * Based on typical meal times:
 * - Breakfast (slot 1): 07:00
 * - Lunch (slot 2): 12:00
 * - Morning Snack (slot 3): 10:00
 * - Dinner (slot 4): 19:00
 * - Afternoon Snack (slot 5): 15:00
 *
 * @param slotIndex - The slot index from the API (1-5)
 * @returns Time string in HH:mm format
 */
export function getTimeFromSlotIndex(slotIndex: number): string {
  const timeMap: Record<number, string> = {
    1: "07:00", // Breakfast
    2: "12:00", // Lunch
    3: "10:00", // Morning Snack / Snack 1
    4: "19:00", // Dinner
    5: "15:00", // Afternoon Snack / Snack 2
  };

  return timeMap[slotIndex] || "12:00"; // Default to noon if unknown
}

/**
 * Gets a display-friendly time label
 * @param time - Time string in HH:mm format
 * @returns Formatted time for display (e.g., "7:00 AM")
 */
export function formatTimeForDisplay(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    return time; // Return as-is if invalid
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for midnight

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/**
 * Sorts meals by their time
 * @param meals - Array of objects with a 'time' property
 * @returns Sorted array
 */
export function sortMealsByTime<T extends { time: string }>(meals: T[]): T[] {
  return meals.sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);

    // Compare hours first
    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    }

    // If hours are equal, compare minutes
    return timeA[1] - timeB[1];
  });
}
