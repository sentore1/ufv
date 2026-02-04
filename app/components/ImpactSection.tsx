'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function ImpactSection() {
  const locale = useLocale();
  const [sections, setSections] = useState<any>({});

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .in('section_key', ['impact_header', 'impact_students', 'impact_families', 'impact_women', 'impact_mediation', 'impact_emergency', 'impact_youth']);
      
      if (data) {
        const mapped = data.reduce((acc: any, item: any) => {
          acc[item.section_key] = item;
          return acc;
        }, {});
        setSections(mapped);
      }
    };
    fetchSections();
  }, []);

  if (!sections.impact_header) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-green-900 to-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">{sections.impact_header?.title[locale] || sections.impact_header?.title.en}</h2>
          <p className="text-2xl text-white/95 max-w-3xl mx-auto">
            {sections.impact_header?.content[locale] || sections.impact_header?.content.en}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_students?.content[locale] || sections.impact_students?.content.en}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_families?.content[locale] || sections.impact_families?.content.en}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_women?.content[locale] || sections.impact_women?.content.en}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_mediation?.content[locale] || sections.impact_mediation?.content.en}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_emergency?.content[locale] || sections.impact_emergency?.content.en}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-xs sm:text-sm text-white/90">{sections.impact_youth?.content[locale] || sections.impact_youth?.content.en}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
