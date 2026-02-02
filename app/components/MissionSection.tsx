'use client';

import Image from "next/image";
import {Link} from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function MissionSection() {
  const locale = useLocale();
  const [currentMissionImage, setCurrentMissionImage] = useState(0);
  const [currentVisionImage, setCurrentVisionImage] = useState(0);
  const [mission, setMission] = useState<any>(null);
  const [vision, setVision] = useState<any>(null);

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .in('section_key', ['mission', 'vision']);
      
      if (data) {
        const missionData = data.find(s => s.section_key === 'mission');
        const visionData = data.find(s => s.section_key === 'vision');
        setMission(missionData);
        setVision(visionData);
      }
    };
    fetchSections();
  }, []);
  
  const missionImages = mission?.media_urls || [];
  const visionImages = vision?.media_urls || [];

  useEffect(() => {
    if (missionImages.length === 0 || visionImages.length === 0) return;
    
    const missionInterval = setInterval(() => {
      setCurrentMissionImage((prev) => (prev + 1) % missionImages.length);
    }, 4000);
    
    const visionInterval = setInterval(() => {
      setCurrentVisionImage((prev) => (prev + 1) % visionImages.length);
    }, 4500);
    
    return () => {
      clearInterval(missionInterval);
      clearInterval(visionInterval);
    };
  }, [missionImages.length, visionImages.length]);

  if (!mission || !vision) return null;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Who We Are</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Transforming Lives</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              {missionImages.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt="Community empowerment"
                  fill
                  className={`object-cover object-center transition-opacity duration-1000 ${
                    index === currentMissionImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold">{mission.title[locale] || mission.title.en}</h4>
                <p className="text-sm opacity-90">Our Mission</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                {mission.content[locale] || mission.content.en}
              </p>
            </div>
          </Link>
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              {visionImages.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt="Educational support"
                  fill
                  className={`object-cover object-center transition-opacity duration-1000 ${
                    index === currentVisionImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold">{vision.title[locale] || vision.title.en}</h4>
                <p className="text-sm opacity-90">Our Vision</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                {vision.content[locale] || vision.content.en}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}