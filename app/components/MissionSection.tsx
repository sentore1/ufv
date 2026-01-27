'use client';

import Image from "next/image";
import {Link} from '@/i18n/routing';
import { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';

export default function MissionSection() {
  const t = useTranslations('home');
  const [currentMissionImage, setCurrentMissionImage] = useState(0);
  const [currentVisionImage, setCurrentVisionImage] = useState(0);
  
  const missionImages = [
    '/ufvimages/14.jpg',
    '/ufvimages/24.jpg',
    '/ufvimages/34.jpg'
  ];
  
  const visionImages = [
    '/ufvimages/16.jpg',
    '/ufvimages/26.jpg',
    '/ufvimages/36.jpg'
  ];

  useEffect(() => {
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
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">{t('whoWeAre')}</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('transforming')}</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              {missionImages.map((image, index) => (
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
                <h4 className="text-xl font-bold">{t('ourMission')}</h4>
                <p className="text-sm opacity-90">{t('missionDesc')}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                {t('missionText')}
              </p>
            </div>
          </Link>
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              {visionImages.map((image, index) => (
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
                <h4 className="text-xl font-bold">{t('ourVision')}</h4>
                <p className="text-sm opacity-90">{t('visionDesc')}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                {t('visionText')}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}