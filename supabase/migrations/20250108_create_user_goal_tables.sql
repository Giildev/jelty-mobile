-- Create user_goal table for fitness goals and targets
CREATE TABLE IF NOT EXISTS public.user_goal (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  goal_type text NOT NULL,
  target_weight_kg text, -- Encrypted
  target_bodyfat_pct text, -- Encrypted
  timeframe text, -- Encrypted
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone,
  CONSTRAINT user_goal_pkey PRIMARY KEY (id),
  CONSTRAINT user_goal_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_user(id) ON DELETE CASCADE
);

-- Create user_body_goal table for target body measurements
CREATE TABLE IF NOT EXISTS public.user_body_goal (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  chest_cm text, -- Encrypted
  waist_cm text, -- Encrypted
  hips_cm text, -- Encrypted
  biceps_cm text, -- Encrypted
  thighs_cm text, -- Encrypted
  neck_cm text, -- Encrypted
  shoulders_cm text, -- Encrypted
  forearms_cm text, -- Encrypted
  calves_cm text, -- Encrypted
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone,
  CONSTRAINT user_body_goal_pkey PRIMARY KEY (id),
  CONSTRAINT user_body_goal_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_user(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_goal_user_id ON public.user_goal(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_body_goal_user_id ON public.user_body_goal(user_id) WHERE deleted_at IS NULL;

-- Enable Row Level Security
ALTER TABLE public.user_goal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_body_goal ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_goal
CREATE POLICY "Users can view their own goals"
  ON public.user_goal
  FOR SELECT
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_goal.user_id));

CREATE POLICY "Users can insert their own goals"
  ON public.user_goal
  FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_goal.user_id));

CREATE POLICY "Users can update their own goals"
  ON public.user_goal
  FOR UPDATE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_goal.user_id));

CREATE POLICY "Users can delete their own goals"
  ON public.user_goal
  FOR DELETE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_goal.user_id));

-- RLS Policies for user_body_goal
CREATE POLICY "Users can view their own body goals"
  ON public.user_body_goal
  FOR SELECT
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_body_goal.user_id));

CREATE POLICY "Users can insert their own body goals"
  ON public.user_body_goal
  FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_body_goal.user_id));

CREATE POLICY "Users can update their own body goals"
  ON public.user_body_goal
  FOR UPDATE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_body_goal.user_id));

CREATE POLICY "Users can delete their own body goals"
  ON public.user_body_goal
  FOR DELETE
  USING (auth.uid()::text = (SELECT clerk_user_id FROM public.user_user WHERE id = user_body_goal.user_id));

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_goal_updated_at BEFORE UPDATE ON public.user_goal
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_body_goal_updated_at BEFORE UPDATE ON public.user_body_goal
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
