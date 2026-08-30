-- Create workshop_settings table
CREATE TABLE IF NOT EXISTS workshop_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Workshop details
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_rw TEXT NOT NULL,
  
  subtitle_en TEXT NOT NULL,
  subtitle_fr TEXT NOT NULL,
  subtitle_ar TEXT NOT NULL,
  subtitle_rw TEXT NOT NULL,
  
  location_en TEXT NOT NULL,
  location_fr TEXT NOT NULL,
  location_ar TEXT NOT NULL,
  location_rw TEXT NOT NULL,
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO workshop_settings (
  title_en, title_fr, title_ar, title_rw,
  subtitle_en, subtitle_fr, subtitle_ar, subtitle_rw,
  location_en, location_fr, location_ar, location_rw,
  start_date, end_date
) VALUES (
  'WORKSHOP OF REGIONAL CAPACITY BUILDING PROJECT FOR LOCAL NGOs',
  'ATELIER DU PROJET DE RENFORCEMENT DES CAPACITÉS RÉGIONALES POUR LES ONG LOCALES',
  'ورشة عمل مشروع بناء القدرات الإقليمية للمنظمات غير الحكومية المحلية',
  'UMUHUGURO W''UMUSHINGA WO KUBAKA UBUSHOBOZI BW''AKARERE K''IMIRYANGO ITARI IYA LETA',
  
  'DEALING WITH MUSLIM COMMUNITIES IN AFRICA',
  'TRAVAILLANT AVEC LES COMMUNAUTÉS MUSULMANES EN AFRIQUE',
  'التعامل مع المجتمعات المسلمة في أفريقيا',
  'IKORANA N''ABANYAMUSLIM MURI AFURIKA',
  
  '27 SEPTEMBER - 01 OCTOBER 2026, KIGALI-RWANDA',
  '27 SEPTEMBRE - 01 OCTOBRE 2026, KIGALI-RWANDA',
  '27 سبتمبر - 01 أكتوبر 2026، كيغالي-رواندا',
  '27 NZERI - 01 UKWAKIRA 2026, KIGALI-RWANDA',
  
  '2026-09-27',
  '2026-10-01'
);

-- Add a trigger to update the updated_at timestamp
CREATE TRIGGER update_workshop_settings_updated_at BEFORE UPDATE
    ON workshop_settings FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE workshop_settings ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read settings
CREATE POLICY "Allow public read" ON workshop_settings
  FOR SELECT USING (true);

-- Policy to allow authenticated users to update settings (for admin)
CREATE POLICY "Allow authenticated update" ON workshop_settings
  FOR UPDATE USING (true);
