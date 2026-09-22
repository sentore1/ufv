-- Debug Certificate Verification Issue
-- Run these queries in Supabase SQL Editor to diagnose the problem

-- 1. Check if the certificate_number column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'workshop_registrations'
AND column_name IN ('certificate_number', 'certificate_generated_at', 'attended');

-- 2. Check if any certificates have been generated
SELECT 
  id,
  full_name,
  email,
  certificate_number,
  certificate_generated_at,
  created_at
FROM workshop_registrations
ORDER BY created_at DESC
LIMIT 10;

-- 3. Search for specific certificate
SELECT 
  id,
  full_name,
  email,
  organization_name,
  certificate_number,
  certificate_generated_at
FROM workshop_registrations
WHERE certificate_number = 'UFV-2026-0001';

-- 4. Check if the RPC function exists
SELECT generate_certificate_number() as test_certificate_number;

-- 5. Check RLS policies on workshop_registrations
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'workshop_registrations';

-- If the column doesn't exist, run this:
-- ALTER TABLE workshop_registrations 
-- ADD COLUMN IF NOT EXISTS certificate_number VARCHAR(50) UNIQUE,
-- ADD COLUMN IF NOT EXISTS certificate_generated_at TIMESTAMP WITH TIME ZONE,
-- ADD COLUMN IF NOT EXISTS attended BOOLEAN DEFAULT true;
