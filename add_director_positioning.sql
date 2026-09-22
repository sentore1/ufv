-- Add positioning and font size fields to certificate_directors table
-- Run this SQL script in your Supabase SQL editor

ALTER TABLE certificate_directors 
ADD COLUMN IF NOT EXISTS position_x INTEGER DEFAULT 500,
ADD COLUMN IF NOT EXISTS position_y INTEGER DEFAULT 2210,
ADD COLUMN IF NOT EXISTS font_size_name INTEGER DEFAULT 42,
ADD COLUMN IF NOT EXISTS font_size_role INTEGER DEFAULT 38;

-- Update existing records with default positions based on signature_position
UPDATE certificate_directors
SET 
  position_x = CASE 
    WHEN signature_position = 1 THEN 500
    WHEN signature_position = 2 THEN 1754
    WHEN signature_position = 3 THEN 2600
    ELSE 1754
  END,
  position_y = 2210,
  font_size_name = 42,
  font_size_role = 38
WHERE position_x IS NULL OR position_y IS NULL;

-- Verify the updates
SELECT id, full_name, position_x, position_y, font_size_name, font_size_role FROM certificate_directors;
