'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function HeroSlider() {
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      
      if (data) {
        setSlides(data.map(slide => ({
          image: slide.media_url,
          title: slide.title[locale] || slide.title.en,
          subtitle: slide.subtitle[locale] || slide.subtitle.en,
          mediaType: slide.media_type
        })));
      }
    };
    fetchSlides();
  }, [locale]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

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
              {slide.mediaType === 'video' ? (
                slide.image.includes('youtube.com') || slide.image.includes('youtu.be') ? (
                  <iframe
                    src={`${slide.image.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}?autoplay=1&mute=1&loop=1&controls=0`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={slide.image}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-[center_center]"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
      <div className="relative h-full flex items-end justify-center md:justify-end px-4">
        <div className="w-full md:max-w-2xl pb-12 md:pb-16">
          <div className="w-full">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8">
              <h1 className={`text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 transition-all duration-700 ease-out text-white ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`} dangerouslySetInnerHTML={{__html: slides[currentSlide].title}}>
              </h1>
              <p className={`text-sm md:text-lg mb-4 md:mb-6 transition-all duration-700 ease-out delay-200 text-gray-200 ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {slides[currentSlide].subtitle}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-400 ${
                !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <a 
                  href="/contact"
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{backgroundColor: '#1f4f3f', color: 'white'}}
                >
                  Get Involved
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a 
                  href="/donate"
                  className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-white hover:text-[#1f4f3f] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
