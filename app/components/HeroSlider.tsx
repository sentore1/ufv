'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slides = [
    {
      image: '/slide/slide4.jpg',
      title: 'Welcome to Helping Heart Family Rwanda<br />(H.H.F.R)!',
      subtitle: ''
    },
    {
      image: '/slide/slide5.jpg', 
      title: 'At Helping Heart Family Rwanda',
      subtitle: 'A youth-led, community-driven organization dedicated to promoting and protecting the rights of children, women, and families across Rwanda.'
    },
    {
      image: '/slide/slide6.jpg',
      title: 'Shaping the Future of Communities', 
      subtitle: 'A future where every child grows up in dignity, every woman lives free from violence, and every family has the stability and knowledge to build a better tomorrow.'
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
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Sliding Background Images */}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-700 ease-out drop-shadow-lg ${
            !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} dangerouslySetInnerHTML={{__html: slides[currentSlide].title}}>
          </h1>
          <p className={`text-sm md:text-base mb-6 max-w-3xl mx-auto transition-all duration-700 ease-out delay-200 drop-shadow-lg ${
            !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {slides[currentSlide].subtitle}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-400 ${
            !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <a 
              href="/contact"
              className="px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
              style={{backgroundColor: '#fec415', color: 'black'}}
            >
              Get Involved
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
            <a 
              href="/donate"
              className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-orange-500 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}