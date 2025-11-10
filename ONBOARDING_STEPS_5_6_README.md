# Onboarding Steps 5 & 6 Implementation

## Summary
Successfully implemented Steps 5 (Exercise Preferences) and 6 (Availability & Schedule) of the onboarding process.

## What Was Implemented

### 1. Components Created
- **RadioButtonGroup** (`components/onboarding/RadioButtonGroup.tsx`)
  - Single-select radio button group with visual feedback
  - Used for Experience Level and Equipment Availability selection

- **DaySelector** (`components/onboarding/DaySelector.tsx`)
  - Multi-select day of the week selector
  - Shows Mon-Sun with full day names in Spanish
  - Active days have primary color background

- **TimeOfDaySelector** (`components/onboarding/TimeOfDaySelector.tsx`)
  - Single-select time preference component
  - Options: Morning, Afternoon, Evening, Flexible
  - Icon-based visual design with sun/moon icons

### 2. Components Updated
- **MultiSelectChips** (`components/onboarding/MultiSelectChips.tsx`)
  - Updated active state styling: primary color background with white text
  - Inactive state: white background with gray text
  - This change also affects Step 4 (Dietary Preferences)

### 3. Validation Schemas
Added to `utils/validation/onboardingSchemas.ts`:
- **exercisePreferencesSchema**: Validates Step 5 form data
  - experienceLevel: beginner | intermediate | advanced (required)
  - preferredTrainingTypes: array of strings (optional)
  - equipmentAvailability: none | home_equipment | full_gym (required)
  - injuries: array of strings (optional, encrypted)

- **availabilitySchema**: Validates Step 6 form data
  - daysAvailable: array of day strings (required, min 1)
  - timePerSession: number (required)
  - preferredTimeOfDay: morning | afternoon | evening | flexible (required)
  - additionalNotes: string (optional, encrypted)

### 4. Database Services
Added to `services/supabase/onboarding.ts`:
- **saveOnboardingStep5()**: Saves exercise preferences
  - Tables: user_training_preference, user_exercise_preference, user_equipment_access, user_injury

- **loadOnboardingStep5()**: Loads exercise preferences from database

- **saveOnboardingStep6()**: Saves availability and schedule
  - Tables: user_training_preference, user_availability

- **loadOnboardingStep6()**: Loads availability data from database

### 5. Screens Created
- **step-5.tsx** (`app/(onboarding)/step-5.tsx`)
  - Experience Level selection (radio buttons)
  - Preferred Training Types (multi-select chips)
  - Equipment Availability (radio buttons)
  - Training Limitations (chip input for injuries)

- **step-6.tsx** (`app/(onboarding)/step-6.tsx`)
  - Days Available (day selector)
  - Time per Session (dropdown: 30/45/60/75/90 min)
  - Preferred Time of Day (time selector)
  - Additional Notes (text area)

### 6. Database Migration
Created migration file: `supabase/migrations/20250110_add_experience_level.sql`
- Adds `experience_level` field to `user_training_preference` table
- Adds check constraint for valid values (beginner, intermediate, advanced)

## Manual Steps Required

### 1. Apply Database Migration
The database migration needs to be applied to Supabase. You can do this in two ways:

#### Option A: Via Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250110_add_experience_level.sql`
4. Paste and execute the SQL

#### Option B: Via Supabase CLI (if linked)
```bash
npx supabase db push
```

### 2. Test the Flow
1. Start the app: `npm start`
2. Navigate through the onboarding flow
3. Test Step 4 → Step 5 → Step 6 navigation
4. Verify data is saved and loaded correctly

## Data Encryption

### Encrypted Fields
- Step 5: injuries (user-entered text)
- Step 6: additionalNotes (user-entered text)

### Non-Encrypted Fields
- Step 5: experienceLevel, preferredTrainingTypes, equipmentAvailability (predefined options)
- Step 6: daysAvailable, timePerSession, preferredTimeOfDay (predefined options)

## Navigation Flow
```
Step 4 (Dietary Preferences)
  ↓ Next
Step 5 (Exercise Preferences)
  ↓ Next
Step 6 (Availability & Schedule)
  ↓ Next
[Step 7 - To be implemented]
```

## Database Tables Used

### Step 5
- `user_training_preference`: experience_level
- `user_exercise_preference`: training types (Strength, Cardio, etc.)
- `user_equipment_access`: equipment availability
- `user_injury`: training limitations (encrypted)

### Step 6
- `user_training_preference`: time_per_session_min, time_per_session_max, preferred_time_of_day, additional_notes
- `user_availability`: day_of_week

## Package Dependencies Added
- `@react-native-picker/picker`: For session time dropdown in Step 6

## UI/UX Consistency
Both steps follow the same layout pattern as Steps 1-4:
- Progress indicator at top (X/9 steps)
- Scrollable content area
- Back + Next buttons at bottom
- Privacy message with lock icon
- Form validation with error messages
- Dark mode support throughout
- Consistent spacing and typography

## Next Steps
To continue the onboarding flow, you'll need to:
1. Implement Steps 7, 8, and 9
2. Update the total steps count if needed
3. Add final completion logic and navigation after Step 9
