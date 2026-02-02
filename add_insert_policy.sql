-- Add insert policy for hero_slides
DROP POLICY IF EXISTS "Allow authenticated inserts" ON hero_slides;
CREATE POLICY "Allow authenticated inserts" ON hero_slides FOR INSERT WITH CHECK (true);
