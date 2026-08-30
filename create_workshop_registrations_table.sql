-- Create workshop_registrations table
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Section A: Personal Information
  full_name VARCHAR(255) NOT NULL,
  gender VARCHAR(50),
  date_of_birth DATE,
  nationality VARCHAR(100),
  country_of_residence VARCHAR(100),
  passport_number VARCHAR(100),
  
  -- Section B: Organization Details
  organization_name VARCHAR(255) NOT NULL,
  organization_type VARCHAR(100),
  position_title VARCHAR(255),
  years_experience VARCHAR(50),
  
  -- Section C: Contact Information
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  emergency_contact VARCHAR(255),
  
  -- Section D: Travel & Accommodation
  country_of_departure VARCHAR(100),
  arrival_date DATE,
  departure_date DATE,
  accommodation_required BOOLEAN DEFAULT false,
  airport_pickup_required BOOLEAN DEFAULT false,
  
  -- Section E: Language & Participation
  preferred_languages TEXT[], -- Array of languages
  interpretation_required BOOLEAN DEFAULT false,
  
  -- Section F: Dietary & Special Needs
  dietary_requirements VARCHAR(100),
  allergies_conditions TEXT,
  special_needs TEXT,
  
  -- Section G: Expectations
  expectations TEXT,
  capacity_building_areas TEXT[], -- Array of areas
  
  -- Section H: Declaration
  signature_name VARCHAR(255),
  signature_date DATE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_email ON workshop_registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_created_at ON workshop_registrations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert (public registration)
CREATE POLICY "Allow public registration" ON workshop_registrations
  FOR INSERT WITH CHECK (true);

-- Policy to allow authenticated users to read all registrations (for admin)
CREATE POLICY "Allow authenticated read" ON workshop_registrations
  FOR SELECT USING (true);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_workshop_registrations_updated_at BEFORE UPDATE
    ON workshop_registrations FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
