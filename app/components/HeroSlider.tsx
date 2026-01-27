'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function HeroSlider() {
  const t = useTranslations('hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slides = [
    {
      image: '/slide/slide4.jpg',
      title: t('slide1Title'),
      subtitle: t('slide1Subtitle')
    },
    {
      image: '/slide/slide5.jpg', 
      title: t('slide2Title'),
      subtitle: t('slide2Subtitle')
    },
    {
      image: '/slide/slide6.jpg',
      title: t('slide3Title'), 
      subtitle: t('slide3Subtitle')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[700px] md:h-[800px] overflow-hidden -mt-20">
      <div className="absolute inset-0">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${
                index === currentSlide ? 'active' : ''
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-[center_center]"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
      <div className="relative h-full flex items-end justify-end">
        <div className="pr-4 sm:pr-6 lg:pr-8 pb-16">
          <div className="max-w-2xl">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <h1 className={`text-2xl md:text-4xl font-bold mb-4 transition-all duration-700 ease-out text-white ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`} dangerouslySetInnerHTML={{__html: slides[currentSlide].title}}>
              </h1>
              <p className={`text-sm md:text-lg mb-6 transition-all duration-700 ease-out delay-200 text-gray-200 ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {slides[currentSlide].subtitle}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-400 ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <a 
                  href="/contact"
                  className="px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{backgroundColor: '#1f4f3f', color: 'white'}}
                >
                  {t('getInvolved')}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a 
                  href="/donate"
                  className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{'--hover-text-color': '#1f4f3f'}}
                  onMouseEnter={(e) => e.target.style.color = '#1f4f3f'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  {t('donateNow')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
