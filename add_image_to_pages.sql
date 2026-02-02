-- Add image_url column to existing custom_pages table
ALTER TABLE custom_pages ADD COLUMN IF NOT EXISTS image_url TEXT;
