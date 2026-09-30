-- Fix the generate_certificate_number function to prevent duplicates
-- Run this in your Supabase SQL Editor

CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_part TEXT;
  max_sequence INTEGER;
  next_sequence INTEGER;
  attempts INTEGER := 0;
  max_attempts INTEGER := 10;
BEGIN
  -- Get current year
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  -- Loop to handle race conditions
  WHILE attempts < max_attempts LOOP
    -- Get the highest sequence number for this year
    SELECT COALESCE(
      MAX(
        CAST(
          SUBSTRING(certificate_number FROM 'UFV-' || year_part || '-(\d+)')
          AS INTEGER
        )
      ),
      0
    ) INTO max_sequence
    FROM workshop_registrations
    WHERE certificate_number LIKE 'UFV-' || year_part || '-%';
    
    -- Increment to get next number
    next_sequence := max_sequence + 1;
    
    -- Format: UFV-2026-0001
    new_number := 'UFV-' || year_part || '-' || LPAD(next_sequence::TEXT, 4, '0');
    
    -- Check if this number already exists (race condition check)
    IF NOT EXISTS (
      SELECT 1 FROM workshop_registrations 
      WHERE certificate_number = new_number
    ) THEN
      -- Number is unique, return it
      RETURN new_number;
    END IF;
    
    -- If we get here, there was a race condition, try again
    attempts := attempts + 1;
    
    -- Small delay to reduce contention (0.1 seconds)
    PERFORM pg_sleep(0.1);
  END LOOP;
  
  -- If we exhausted all attempts, raise an error
  RAISE EXCEPTION 'Failed to generate unique certificate number after % attempts', max_attempts;
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT generate_certificate_number() as test_certificate_number;

-- Verify it works multiple times
SELECT generate_certificate_number() as test_certificate_number;
