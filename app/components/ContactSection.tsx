'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  
  const contactImages = [
    '/ufvimages/18.jpg',
    '/ufvimages/28.jpg', 
    '/ufvimages/38.jpg',
    '/ufvimages/48.jpg'
  ];

  const carouselSlides = [
    { image: '/ufvimages/38.jpg', title: 'Empowering Communities Through Education' },
    { image: '/ufvimages/62.jpg', title: 'Supporting Vulnerable Families' },
    { image: '/ufvimages/72.jpg', title: 'Building Stronger Communities Together' },
    { image: '/ufvimages/42.jpg', title: 'Emergency Relief Programs' },
    { image: '/ufvimages/37.jpg', title: 'Women & Youth Empowerment' },
    { image: '/ufvimages/22.jpg', title: 'Faith-Based Community Support' },
    { image: '/ufvimages/12.jpg', title: 'Family Protection Services' },
    { image: '/ufvimages/82.jpg', title: 'Skills Training Programs' },
    { image: '/ufvimages/15.jpg', title: 'Community Health Initiatives' },
    { image: '/ufvimages/22.jpg', title: 'Social Protection Networks' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % contactImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [contactImages.length]);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentCarousel((prev) => {
        if (prev >= carouselSlides.length - 1) {
          setTimeout(() => setCurrentCarousel(0), 500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(carouselInterval);
  }, [carouselSlides.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Contact from Landing Page' }),
      });
      
      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-26 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-6xl font-bold text-gray-900">{t('impactStories')}</h2>
        </div>
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(calc(-${currentCarousel + 1} * (50% + 12px) + 25%))`,
              paddingLeft: '12.5%',
              paddingRight: '12.5%',
              transition: currentCarousel === 0 && currentCarousel !== carouselSlides.length ? 'none' : 'transform 0.5s ease-in-out'
            }}
          >
            {[...carouselSlides.slice(-1), ...carouselSlides, ...carouselSlides].map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-96 relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                style={{ width: '50%', minWidth: '50%' }}
              >
                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-2">{t('getInTouch')}</h2>
          <div className="w-16 h-1 mx-auto mb-6" style={{backgroundColor: '#1f4f3f'}}></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('getInTouchDesc')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="text-white rounded-2xl overflow-hidden relative min-h-[600px] flex flex-col justify-end" style={{backgroundColor: '#1f4f3f'}}>
            {contactImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Contact Us"
                fill
                className={`object-cover object-center transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-green-800/90 via-green-700/50 to-transparent"></div>
            
            <div className="relative p-8 space-y-4 z-10">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p>{t('address')}</p>
                  <p>{t('addressLine2')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>info@uf-v.org</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>+250782009432</span>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 mt-6 border border-white/30 backdrop-blur-md">
                <h3 className="text-lg font-semibold mb-3 text-white">{t('officeHours')}</h3>
                <div className="space-y-1 text-sm text-white/90">
                  <p>{t('mondayFriday')}</p>
                  <p>{t('weekend')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-black">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t('name')}
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 placeholder:text-gray-500"
              />
              <input
                type="email"
                placeholder={t('email')}
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 placeholder:text-gray-500"
              />
              <input
                type="tel"
                placeholder={t('phone')}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 placeholder:text-gray-500"
              />
              <textarea
                placeholder={t('message')}
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 resize-none placeholder:text-gray-500"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-4 rounded-lg font-semibold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#1f4f3f'}}
              >
                {loading ? t('sending') : t('sendButton')}
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
