-- Migration to remove unnecessary fields from workshop_registrations table
-- Run this SQL script in your Supabase SQL editor

-- Remove columns that are no longer needed
ALTER TABLE workshop_registrations 
DROP COLUMN IF EXISTS arrival_date,
DROP COLUMN IF EXISTS departure_date,
DROP COLUMN IF EXISTS accommodation_required,
DROP COLUMN IF EXISTS airport_pickup_required,
DROP COLUMN IF EXISTS allergies_conditions,
DROP COLUMN IF EXISTS special_needs,
DROP COLUMN IF EXISTS expectations,
DROP COLUMN IF EXISTS signature_name,
DROP COLUMN IF EXISTS signature_date;

-- Verify the updated table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'workshop_registrations'
ORDER BY ordinal_position;
