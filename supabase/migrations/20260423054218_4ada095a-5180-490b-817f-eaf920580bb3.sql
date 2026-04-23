-- Table to store quiz/lead submissions from the homepage challenge form
CREATE TABLE public.quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Step answers (loose schema in JSON for flexibility / future questions)
  answers JSONB NOT NULL,
  -- Contact info (extracted for easy filtering / notifications)
  contact_name TEXT NOT NULL,
  contact_channel TEXT NOT NULL, -- telegram | whatsapp | vk
  contact_value TEXT NOT NULL,
  -- Computed offer
  estimated_price_usd INTEGER NOT NULL,
  estimated_days INTEGER NOT NULL,
  -- Tech meta
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (anonymous visitors) can submit a quiz response
CREATE POLICY "Anyone can submit quiz"
ON public.quiz_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Index for chronological browsing
CREATE INDEX idx_quiz_submissions_created_at
  ON public.quiz_submissions (created_at DESC);
