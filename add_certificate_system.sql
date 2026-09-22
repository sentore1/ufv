-- Add certificate system support to workshop_registrations
-- Run this SQL script in your Supabase SQL editor

-- 1. Add certificate_number to workshop_registrations table
ALTER TABLE workshop_registrations 
ADD COLUMN IF NOT EXISTS certificate_number VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS certificate_generated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS attended BOOLEAN DEFAULT true;

-- Create index on certificate_number for fast verification lookups
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_certificate_number 
ON workshop_registrations(certificate_number);

-- 2. Create certificate_directors table for managing director signatures
CREATE TABLE IF NOT EXISTS certificate_directors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  signature_position INTEGER NOT NULL DEFAULT 1, -- 1=left, 2=center, 3=right
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on active directors ordered by display_order
CREATE INDEX IF NOT EXISTS idx_certificate_directors_active 
ON certificate_directors(is_active, display_order);

-- Enable Row Level Security for certificate_directors
ALTER TABLE certificate_directors ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read of active directors (for certificate generation)
CREATE POLICY "Allow public read active directors" ON certificate_directors
  FOR SELECT USING (is_active = true);

-- Policy to allow authenticated users full access (for admin)
CREATE POLICY "Allow authenticated full access to directors" ON certificate_directors
  FOR ALL USING (true);

-- Add trigger to update the updated_at timestamp
CREATE TRIGGER update_certificate_directors_updated_at BEFORE UPDATE
    ON certificate_directors FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Insert default directors (you can modify these)
INSERT INTO certificate_directors (full_name, role, signature_position, display_order) VALUES
  ('Dr. John Smith', 'Executive Director', 1, 1),
  ('Ms. Sarah Johnson', 'Program Director', 2, 2),
  ('Mr. Michael Brown', 'Training Coordinator', 3, 3)
ON CONFLICT DO NOTHING;

-- Function to generate unique certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  -- Get current year
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  -- Get count of certificates this year + 1
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM workshop_registrations
  WHERE certificate_number LIKE 'UFV-' || year_part || '-%';
  
  -- Format: UFV-2026-0001
  new_number := 'UFV-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Verify the setup
SELECT 'Tables created successfully!' as status;
SELECT * FROM certificate_directors ORDER BY display_order;
