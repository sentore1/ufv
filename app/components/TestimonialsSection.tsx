'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function TestimonialsSection() {
  const locale = useLocale();
  const [sections, setSections] = useState<any>({});

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .in('section_key', ['testimonials_header', 'testimonial_1', 'testimonial_2']);
      
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

  if (!sections.testimonials_header) return null;

  const parseTestimonial = (content: string) => {
    const [text, location] = content.split('|');
    return { text, location };
  };

  const t1 = parseTestimonial(sections.testimonial_1?.content[locale] || sections.testimonial_1?.content.en || '|');
  const t2 = parseTestimonial(sections.testimonial_2?.content[locale] || sections.testimonial_2?.content.en || '|');

  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{sections.testimonials_header?.title[locale] || sections.testimonials_header?.title.en}</h2>
          <p className="text-xl text-gray-600">{sections.testimonials_header?.content[locale] || sections.testimonials_header?.content.en}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold">CL</span>
              </div>
              <div>
                <h4 className="font-semibold">{sections.testimonial_1?.title[locale] || sections.testimonial_1?.title.en}</h4>
                <p className="text-gray-500 text-sm">{t1.location}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{t1.text}"</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-yellow-600 font-bold">TM</span>
              </div>
              <div>
                <h4 className="font-semibold">{sections.testimonial_2?.title[locale] || sections.testimonial_2?.title.en}</h4>
                <p className="text-gray-500 text-sm">{t2.location}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{t2.text}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}