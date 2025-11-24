'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slides = [
    {
      image: '/slide1.png',
      title: 'Justice Begins at Home',
      subtitle: 'Empowering families with legal knowledge and peaceful conflict resolution'
    },
    {
      image: '/slide2.png', 
      title: 'Tumurere Yize Program',
      subtitle: 'Educational support for vulnerable children - Let us raise them to learn'
    },
    {
      image: '/slide3.png',
      title: 'Mama Youth Empowerment', 
      subtitle: 'Supporting teenage mothers with a new beginning and second chances'
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
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-out ${
            !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {slides[currentSlide].title}
          </h1>
          <p className={`text-lg md:text-xl mb-6 max-w-3xl mx-auto transition-all duration-700 ease-out delay-200 ${
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