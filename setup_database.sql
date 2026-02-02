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
 '["/ufvimages/16.jpg", "/ufvimages/26.jpg", "/ufvimages/36.jpg"]'),
('donate_mtn', 
 '{"en": "MTN Mobile Money", "fr": "MTN Mobile Money", "rw": "MTN Mobile Money", "ar": "MTN Mobile Money"}',
 '{"en": "*182*8*1*1111111#", "fr": "*182*8*1*1111111#", "rw": "*182*8*1*1111111#", "ar": "*182*8*1*1111111#"}',
 '["/MTN-Rwanda-MoMo-Logo-2 (1).jpg"]'),
('donate_bank', 
 '{"en": "Bank Transfer", "fr": "Virement Bancaire", "rw": "Kohereza kuri Banki", "ar": "تحويل بنكي"}',
 '{"en": "EQTY Bank|UVF Rwanda|****200088126", "fr": "EQTY Bank|UVF Rwanda|****200088126", "rw": "EQTY Bank|UVF Rwanda|****200088126", "ar": "EQTY Bank|UVF Rwanda|****200088126"}',
 '[]'),
('contact_info', 
 '{"en": "Contact Information", "fr": "Informations de Contact", "rw": "Amakuru yo Guhamagara", "ar": "معلومات الاتصال"}',
 '{"en": "KIGALI, GASABO, KIMIHURURA, RUGANDO, GASASA STREET: KG 652, Kigali, Rwanda, 3047|umbrellaforvulnerable@gmail.com|info@uf-v.org|https://uf-v.org", "fr": "KIGALI, GASABO, KIMIHURURA, RUGANDO, GASASA STREET: KG 652, Kigali, Rwanda, 3047|umbrellaforvulnerable@gmail.com|info@uf-v.org|https://uf-v.org", "rw": "KIGALI, GASABO, KIMIHURURA, RUGANDO, GASASA STREET: KG 652, Kigali, Rwanda, 3047|umbrellaforvulnerable@gmail.com|info@uf-v.org|https://uf-v.org", "ar": "KIGALI, GASABO, KIMIHURURA, RUGANDO, GASASA STREET: KG 652, Kigali, Rwanda, 3047|umbrellaforvulnerable@gmail.com|info@uf-v.org|https://uf-v.org"}',
 '[]');

-- Enable Row Level Security
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON content_sections FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Allow authenticated updates" ON hero_slides FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated updates" ON content_sections FOR UPDATE USING (true);
