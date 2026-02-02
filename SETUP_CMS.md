# CMS Setup Instructions

## 1. Create Supabase Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Hero Slides Table
CREATE TABLE hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  subtitle JSONB NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Sections Table
CREATE TABLE content_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title JSONB,
  content JSONB,
  media_urls JSONB,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero slides
INSERT INTO hero_slides (title, subtitle, media_url, order_index) VALUES
('{"en": "Empowering Communities", "fr": "Autonomiser les communautés", "rw": "Gutera imbaraga abaturage", "ar": "تمكين المجتمعات"}', 
 '{"en": "Through Education and Support", "fr": "Par l''éducation et le soutien", "rw": "Binyuze mu burezi n''ubufasha", "ar": "من خلال التعليم والدعم"}',
 '/slide/slide4.jpg', 1),
('{"en": "Building Stronger Families", "fr": "Construire des familles plus fortes", "rw": "Kubaka imiryango ikomeye", "ar": "بناء عائلات أقوى"}',
 '{"en": "Supporting vulnerable communities", "fr": "Soutenir les communautés vulnérables", "rw": "Gufasha abaturage bafite ibibazo", "ar": "دعم المجتمعات الضعيفة"}',
 '/slide/slide5.jpg', 2),
('{"en": "Creating Lasting Change", "fr": "Créer un changement durable", "rw": "Kurema impinduka zihoraho", "ar": "خلق تغيير دائم"}',
 '{"en": "Join us in making a difference", "fr": "Rejoignez-nous pour faire la différence", "rw": "Dufatanye mu guhindura", "ar": "انضم إلينا في إحداث فرق"}',
 '/slide/slide6.jpg', 3);

-- Insert default sections
INSERT INTO content_sections (section_key, title, content, media_urls) VALUES
('mission', 
 '{"en": "Our Mission", "fr": "Notre Mission", "rw": "Inshingano Zacu", "ar": "مهمتنا"}',
 '{"en": "To empower vulnerable communities through education, protection, and sustainable development programs.", "fr": "Autonomiser les communautés vulnérables par l''éducation, la protection et les programmes de développement durable.", "rw": "Gutera imbaraga abaturage bafite ibibazo binyuze mu burezi, kurinda no gukora gahunda z''iterambere rirambye.", "ar": "تمكين المجتمعات الضعيفة من خلال التعليم والحماية وبرامج التنمية المستدامة."}',
 '["/ufvimages/14.jpg", "/ufvimages/24.jpg", "/ufvimages/34.jpg"]'),
('vision',
 '{"en": "Our Vision", "fr": "Notre Vision", "rw": "Icyerekezo Cyacu", "ar": "رؤيتنا"}',
 '{"en": "A society where every individual has access to opportunities for growth and development.", "fr": "Une société où chaque individu a accès aux opportunités de croissance et de développement.", "rw": "Sosiyete aho buri muntu agira amahirwe yo gukura no guteza imbere.", "ar": "مجتمع يتمتع فيه كل فرد بفرص النمو والتطور."}',
 '["/ufvimages/16.jpg", "/ufvimages/26.jpg", "/ufvimages/36.jpg"]');

-- Enable Row Level Security
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON content_sections FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Allow authenticated updates" ON hero_slides FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated updates" ON content_sections FOR UPDATE USING (true);
```

## 2. Update Environment Variables

Make sure your `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 3. Access Admin Panel

Navigate to `/admin/content` to manage:
- Hero slides (images/videos, titles, subtitles)
- Content sections (mission, vision, etc.)

## 4. Add New Sections

To add more editable sections:

1. Insert into database:
```sql
INSERT INTO content_sections (section_key, title, content, media_urls) VALUES
('about', 
 '{"en": "About Us", "fr": "À Propos"}',
 '{"en": "Your content here"}',
 '["/path/to/image.jpg"]');
```

2. Use in your page:
```tsx
import DynamicSection from '@/app/components/DynamicSection';

<DynamicSection sectionKey="about" className="py-16" />
```

## 5. Video Support

For hero videos:
1. Upload video to `/public/videos/`
2. In admin panel, set Media Type to "Video"
3. Set Media URL to `/videos/your-video.mp4`
