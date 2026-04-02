-- Enable RLS on tables that have it disabled (CRITICAL security fix)

-- 1. Enable RLS on all flagged tables
ALTER TABLE public.breaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_sessions ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for breaks (authenticated users only, own data)
CREATE POLICY "Users can view own breaks"
  ON public.breaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own breaks"
  ON public.breaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own breaks"
  ON public.breaks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own breaks"
  ON public.breaks FOR DELETE
  USING (auth.uid() = user_id);

-- 3. Create policies for project_logs (authenticated users only, own data)
CREATE POLICY "Users can view own project_logs"
  ON public.project_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own project_logs"
  ON public.project_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own project_logs"
  ON public.project_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own project_logs"
  ON public.project_logs FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Create policies for quiz_sessions (authenticated users only, own data)
CREATE POLICY "Users can view own quiz_sessions"
  ON public.quiz_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz_sessions"
  ON public.quiz_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz_sessions"
  ON public.quiz_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quiz_sessions"
  ON public.quiz_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Create policies for work_sessions (authenticated users only, own data)
CREATE POLICY "Users can view own work_sessions"
  ON public.work_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own work_sessions"
  ON public.work_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own work_sessions"
  ON public.work_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own work_sessions"
  ON public.work_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Fix survey_suggestions: drop the "Always True" policy and replace with INSERT-only
DROP POLICY IF EXISTS "Enable insert for anon" ON public.survey_suggestions;
DROP POLICY IF EXISTS "Allow all" ON public.survey_suggestions;
-- Drop any existing permissive policies (the "Always True" one)
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies WHERE tablename = 'survey_suggestions' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.survey_suggestions', pol.policyname);
  END LOOP;
END $$;

-- Only allow anonymous INSERT (for survey submissions from the frontend)
CREATE POLICY "Allow anon insert"
  ON public.survey_suggestions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read survey suggestions (for admin/analytics)
CREATE POLICY "Allow authenticated select"
  ON public.survey_suggestions FOR SELECT
  TO authenticated
  USING (true);
