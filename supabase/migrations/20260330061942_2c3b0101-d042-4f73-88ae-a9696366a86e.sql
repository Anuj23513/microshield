
-- Add length and format constraints to leads table
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT leads_phone_format CHECK (phone ~ '^[0-9+\-\s()]{7,20}$'),
  ADD CONSTRAINT leads_message_length CHECK (message IS NULL OR char_length(message) <= 1000);

-- Add format constraint to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT newsletter_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT newsletter_email_length CHECK (char_length(email) <= 255);

-- Replace the permissive leads INSERT policy with one that validates
DROP POLICY "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads with validation"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND phone ~ '^[0-9+\-\s()]{7,20}$'
  AND (message IS NULL OR char_length(message) <= 1000)
);

-- Replace the permissive newsletter INSERT policy with format check
DROP POLICY "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe with validation"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(email) <= 255
);
