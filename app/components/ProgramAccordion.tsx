'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

interface Program {
  id: string;
  section_key: string;
  title: any;
  content: any;
  media_urls: string[];
}

export default function ProgramAccordion() {
  const locale = useLocale();
  const [activeProgram, setActiveProgram] = useState(0);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [header, setHeader] = useState<any>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .or('section_key.eq.programs_header,section_key.like.program_%')
        .order('section_key');
      
      if (data) {
        const headerData = data.find(d => d.section_key === 'programs_header');
        const programData = data.filter(d => d.section_key.startsWith('program_'));
        setHeader(headerData);
        setPrograms(programData);
        if (programData.length > 0) setActiveProgram(0);
      }
    };
    fetchPrograms();
  }, []);

  if (!header || programs.length === 0) return null;

  const getIcon = (key: string) => {
    if (key.includes('social')) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    );
    if (key.includes('emergency')) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
      </svg>
    );
    if (key.includes('education')) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/>
      </svg>
    );
    if (key.includes('faith')) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2L3 7v11h14V7l-7-5zM6 9a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    );
    if (key.includes('women')) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    );
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2L3 7v11h14V7l-7-5z"/>
      </svg>
    );
  };

  const activeItem = programs[activeProgram];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{header.title[locale] || header.title.en}</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            {header.content[locale] || header.content.en}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="order-2 lg:order-1">
            <div className="h-[350px] sm:h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden relative">
              <Image
                src={activeItem.media_urls[0] || '/programs/social-protection/social-protection-1.jpg'}
                alt={activeItem.title[locale] || activeItem.title.en}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-10">
                <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-700/30 backdrop-blur-md border border-green-600/50 rounded-full flex items-center justify-center">
                    <span className="text-white">{getIcon(activeItem.section_key)}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{activeItem.title[locale] || activeItem.title.en}</h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">{activeItem.content[locale] || activeItem.content.en}</p>
                <a href="/programs" className="inline-block text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-2xl font-medium bg-green-700/30 backdrop-blur-md border border-green-600/50 hover:bg-green-700/50 transition-all">
                  Read More →
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-3 md:mt-4">
              {programs.map((program, idx) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgram(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeProgram === idx ? 'bg-green-900 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-2 md:space-y-3">
            {programs.map((program, idx) => (
              <div 
                key={program.id} 
                className={`rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${
                  activeProgram === idx ? 'bg-green-900 text-white' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveProgram(idx)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-900 bg-opacity-20 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-white">{getIcon(program.section_key)}</span>
                  </div>
                  <h3 className={`text-sm sm:text-base md:text-lg font-medium ${
                    activeProgram === idx ? 'text-white' : 'text-gray-900'
                  }`}>
                    {program.title[locale] || program.title.en}
                  </h3>
                </div>
                <span className={`text-lg md:text-xl ${
                  activeProgram === idx ? 'text-white' : 'text-gray-400'
                }`}>
                  ›
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
