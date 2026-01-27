'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function AboutUsSection() {
  const t = useTranslations('aboutUs');
  return (
    <section className="py-16" style={{backgroundColor: '#538A71'}}>
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <p className="text-xs font-medium text-gray-700">UVF Impact</p>
              <p className="text-xs text-gray-500">Community Work</p>
            </div>
            <div className="h-80 w-80 mx-auto relative rounded-2xl overflow-hidden">
              <Image
                src="/ufvimages/42.jpg"
                alt="UVF Community Work"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/ufvimages/logo.png"
                  alt="UVF Logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-xs font-medium text-white/80">Umbrella for Vulnerable</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('title')}
              </h2>
              <p className="text-sm text-white/90 leading-relaxed">
                {t('description')}
              </p>
            </div>
            
            <a 
              href="/about"
              className="inline-flex items-center px-4 py-2 border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {t('learnMore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
