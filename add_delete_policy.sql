-- Add delete policy for hero_slides
DROP POLICY IF EXISTS "Allow authenticated deletes" ON hero_slides;
CREATE POLICY "Allow authenticated deletes" ON hero_slides FOR DELETE USING (true);
