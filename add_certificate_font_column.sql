-- Add certificate_font column to workshop_registrations table
ALTER TABLE workshop_registrations
ADD COLUMN IF NOT EXISTS certificate_font VARCHAR(100) DEFAULT 'Brush Script MT';

-- Add comment to the column
COMMENT ON COLUMN workshop_registrations.certificate_font IS 'Font to use for participant name on certificate';
