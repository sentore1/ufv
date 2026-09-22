-- Manually create a test certificate to verify the verification page works
-- Run this in Supabase SQL Editor

-- Update Dusingizimana Issa's registration with a certificate number
UPDATE workshop_registrations
SET 
  certificate_number = 'UFV-2026-0001',
  certificate_generated_at = NOW(),
  attended = true
WHERE full_name = 'Dusingizimana Issa';

-- Verify it was saved
SELECT 
  id,
  full_name,
  certificate_number,
  certificate_generated_at
FROM workshop_registrations
WHERE certificate_number = 'UFV-2026-0001';
