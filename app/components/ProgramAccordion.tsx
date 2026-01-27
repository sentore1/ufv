'use client';

import { useState } from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

interface Program {
  id: number;
  titleKey: string;
  descKey: string;
  icon: string;
}

export default function ProgramAccordion() {
  const t = useTranslations('programs');
  const [activeProgram, setActiveProgram] = useState(1);

  const programs: Program[] = [
    { id: 1, titleKey: "socialProtection", descKey: "socialProtectionDesc", icon: "shield" },
    { id: 2, titleKey: "emergencyRelief", descKey: "emergencyReliefDesc", icon: "heart" },
    { id: 3, titleKey: "education", descKey: "educationDesc", icon: "book" },
    { id: 4, titleKey: "faithBased", descKey: "faithBasedDesc", icon: "scale" },
    { id: 5, titleKey: "womenYouth", descKey: "womenYouthDesc", icon: "users" },
    { id: 6, titleKey: "familyProtection", descKey: "familyProtectionDesc", icon: "nutrition" }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'nutrition':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5z"/>
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
          </svg>
        );
      case 'book':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/>
          </svg>
        );
      case 'scale':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11h14V7l-7-5zM6 9a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getImageForProgram = (id: number) => {
    const images = {
      1: '/programs/social-protection/social-protection-1.jpg',
      2: '/programs/emergency-relief/emergency-relief-1.jpg', 
      3: '/programs/education/education-1.jpg',
      4: '/programs/faith-based/faith-based-1.jpg',
      5: '/programs/women-youth-empowerment/women-youth-1.jpg',
      6: '/programs/family-protection/family-protection-1.jpg'
    };
    return images[id as keyof typeof images] || '/programs/social-protection/social-protection-1.jpg';
  };

  const activeItem = programs.find(p => p.id === activeProgram) || programs[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <div className="h-[500px] w-full rounded-2xl overflow-hidden relative">
              <Image
                src={getImageForProgram(activeItem.id)}
                alt={t(activeItem.titleKey)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-700/30 backdrop-blur-md border border-green-600/50 rounded-full flex items-center justify-center">
                    <span className="text-white">{getIcon(activeItem.icon)}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{t(activeItem.titleKey)}</h3>
                </div>
                <p className="text-lg mb-6 leading-relaxed">{t(activeItem.descKey)}</p>
                <a href="/programs" className="inline-block text-white px-6 py-2 rounded-2xl font-medium bg-green-700/30 backdrop-blur-md border border-green-600/50 hover:bg-green-700/50 transition-all">
                  {t('readMore')} →
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgram(program.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeProgram === program.id ? 'bg-green-900 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-3">
            {programs.map((program) => (
              <div 
                key={program.id} 
                className={`rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${
                  activeProgram === program.id ? 'bg-green-900 text-white' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveProgram(program.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-900 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">{getIcon(program.icon)}</span>
                  </div>
                  <h3 className={`text-lg font-medium ${
                    activeProgram === program.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t(program.titleKey)}
                  </h3>
                </div>
                <span className={`text-xl ${
                  activeProgram === program.id ? 'text-white' : 'text-gray-400'
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
