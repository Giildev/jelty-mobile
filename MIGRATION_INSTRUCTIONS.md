# Apply Daily Messages Migration

## Issue
The `getDailyMessage()` function is failing because the database table and PostgreSQL function don't exist yet.

## Solution
You need to run the migration file in your Supabase dashboard.

### Steps:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/zsrjmwciovzfssluorqi
   - Navigate to: **SQL Editor** (in the left sidebar)

2. **Open the Migration File**
   - Open this file: `migrations/add_daily_motivational_messages.sql`
   - Copy all the contents

3. **Run the Migration**
   - Paste the SQL into the Supabase SQL Editor
   - Click **RUN** button
   - You should see a success message

4. **Verify the Migration**
   - In the SQL Editor, run this test query:
   ```sql
   SELECT * FROM public.get_daily_message();
   ```
   - You should see today's motivational message

### What This Migration Does:

1. Creates `system_daily_message` table with 30 motivational messages
2. Creates `get_daily_message()` PostgreSQL function to fetch today's message
3. Inserts all 30 messages (one for each day of the month)

### After Migration:

- Restart your Expo dev server
- The error should be gone
- You should see a motivational banner on the home screen

---

**Migration File Location:** `migrations/add_daily_motivational_messages.sql`

**Also copied to:** `supabase/migrations/20250112_add_daily_motivational_messages.sql`
