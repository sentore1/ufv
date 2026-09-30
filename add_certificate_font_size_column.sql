-- Add certificate_font_size column to workshop_registrations table
ALTER TABLE workshop_registrations
ADD COLUMN IF NOT EXISTS certificate_font_size INTEGER DEFAULT 200;

-- Add comment to the column
COMMENT ON COLUMN workshop_registrations.certificate_font_size IS 'Font size (in pixels) for participant name on certificate';
