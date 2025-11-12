-- Create workout_exercise_media table
-- Stores images and videos for exercise demonstrations and galleries

-- First, create enum types if they don't exist
DO $$ BEGIN
  CREATE TYPE media_type AS ENUM ('image', 'video');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE media_role AS ENUM ('primary', 'gallery', 'demonstration');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create the workout_exercise_media table
CREATE TABLE IF NOT EXISTS workout_exercise_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES workout_exercise(id) ON DELETE CASCADE,
  type media_type NOT NULL,
  role media_role NOT NULL DEFAULT 'gallery',
  storage_bucket TEXT NOT NULL DEFAULT 'public',
  storage_path TEXT NOT NULL,
  public_url TEXT,
  alt_text TEXT,
  caption TEXT,
  sort_index INTEGER NOT NULL DEFAULT 1,
  is_primary BOOLEAN NOT NULL DEFAULT false,

  -- Media metadata
  width_px INTEGER,
  height_px INTEGER,
  duration_s NUMERIC, -- Duration for videos
  format TEXT, -- e.g., 'mp4', 'jpg', 'png'
  bytes BIGINT, -- File size in bytes

  -- Optional paths for video support
  thumbnail_path TEXT, -- Thumbnail for videos
  poster_path TEXT, -- Poster frame for videos

  -- Source tracking
  source_url TEXT, -- Original source URL if applicable

  -- Timestamps and soft delete
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ,

  -- Constraints
  CHECK (sort_index >= 1),
  CHECK (bytes IS NULL OR bytes >= 0),
  CHECK (duration_s IS NULL OR duration_s >= 0)
);

-- Add comments for documentation
COMMENT ON TABLE workout_exercise_media IS 'Stores media files (images and videos) for exercise demonstrations';
COMMENT ON COLUMN workout_exercise_media.exercise_id IS 'Reference to the exercise this media belongs to';
COMMENT ON COLUMN workout_exercise_media.type IS 'Type of media: image or video';
COMMENT ON COLUMN workout_exercise_media.role IS 'Role of the media: primary (main image), gallery, or demonstration';
COMMENT ON COLUMN workout_exercise_media.storage_bucket IS 'Supabase storage bucket name';
COMMENT ON COLUMN workout_exercise_media.storage_path IS 'Path to the file in storage';
COMMENT ON COLUMN workout_exercise_media.public_url IS 'Public URL to access the media';
COMMENT ON COLUMN workout_exercise_media.sort_index IS 'Order of media items in gallery (1-based)';
COMMENT ON COLUMN workout_exercise_media.is_primary IS 'Whether this is the primary/featured media for the exercise';
COMMENT ON COLUMN workout_exercise_media.thumbnail_path IS 'Path to thumbnail image (for videos)';
COMMENT ON COLUMN workout_exercise_media.poster_path IS 'Path to poster frame (for videos)';

-- Create indexes for better query performance
CREATE INDEX idx_workout_exercise_media_exercise_id
  ON workout_exercise_media(exercise_id)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_workout_exercise_media_type
  ON workout_exercise_media(type)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_workout_exercise_media_is_primary
  ON workout_exercise_media(exercise_id, is_primary)
  WHERE deleted_at IS NULL AND is_primary = true;

CREATE INDEX idx_workout_exercise_media_sort
  ON workout_exercise_media(exercise_id, sort_index)
  WHERE deleted_at IS NULL;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_workout_exercise_media_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_workout_exercise_media_updated_at
  BEFORE UPDATE ON workout_exercise_media
  FOR EACH ROW
  EXECUTE FUNCTION update_workout_exercise_media_updated_at();

-- Enable RLS
ALTER TABLE workout_exercise_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public read access for all exercise media
CREATE POLICY "Exercise media is publicly readable"
  ON workout_exercise_media FOR SELECT
  USING (true);

-- Only authenticated users can insert media
CREATE POLICY "Authenticated users can insert exercise media"
  ON workout_exercise_media FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update media
CREATE POLICY "Authenticated users can update exercise media"
  ON workout_exercise_media FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete media (soft delete)
CREATE POLICY "Authenticated users can delete exercise media"
  ON workout_exercise_media FOR DELETE
  TO authenticated
  USING (true);
