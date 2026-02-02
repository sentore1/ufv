'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface DynamicSectionProps {
  sectionKey: string;
  className?: string;
}

export default function DynamicSection({ sectionKey, className = '' }: DynamicSectionProps) {
  const locale = useLocale();
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    const fetchSection = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .eq('is_active', true)
        .single();
      
      if (data) setSection(data);
    };
    fetchSection();
  }, [sectionKey]);

  if (!section) return null;

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {section.title && (
          <h2 className="text-3xl font-bold mb-6">
            {section.title[locale] || section.title.en}
          </h2>
        )}
        {section.content && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content[locale] || section.content.en }} />
        )}
        {section.media_urls && section.media_urls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {section.media_urls.map((url: string, idx: number) => (
              <div key={idx} className="relative h-64">
                <Image src={url} alt="" fill className="object-cover rounded-lg" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
