'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function NewsletterSection() {
  const locale = useLocale();
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    const fetchSection = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_key', 'newsletter_section')
        .single();
      
      if (data) setSection(data);
    };
    fetchSection();
  }, []);

  if (!section) return null;

  const [description, placeholder, buttonText] = (section.content[locale] || section.content.en || '||').split('|');

  return (
    <section className="py-12 text-white" style={{background: 'linear-gradient(to right, #f76e2f, #fec415)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{section.title[locale] || section.title.en}</h2>
          <p className="mb-6">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold">
              {buttonText} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}