# Supabase Database Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON reports FOR SELECT USING (true);

-- Create policies for insert/update/delete (you can add authentication later)
CREATE POLICY "Allow all operations" ON blogs FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON reports FOR ALL USING (true);
```

## Admin Login
- URL: http://localhost:3000/admin
- Password: admin123

## Usage
1. Login at /admin
2. Publish blogs and reports from /admin/dashboard
3. Users can view blogs at /blog
4. Users can view reports at /report
