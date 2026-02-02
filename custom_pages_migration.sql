-- Custom Pages Table
CREATE TABLE custom_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  content JSONB NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;

-- Public read access for active pages
CREATE POLICY "Allow public read access to active pages" ON custom_pages 
  FOR SELECT USING (is_active = true);

-- Admin write access
CREATE POLICY "Allow authenticated updates" ON custom_pages 
  FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX idx_custom_pages_slug ON custom_pages(slug);
CREATE INDEX idx_custom_pages_active ON custom_pages(is_active);
