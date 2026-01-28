"use client";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import { useState, useEffect } from "react";
import {useTranslations, useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/routing';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const changeLanguage = (lang: string) => {
    router.replace(pathname, {locale: lang});
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={isScrolled ? "/ufvimages/logo v2.png" : "/ufvimages/logo white v2.png"}
              alt="Umbrella for Vulnerable"
              width={300}
              height={100}
              className="h-20 w-auto"
            />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className={`text-sm hover:text-green-700 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('about')}</Link>
            <div className="relative" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
              <Link href="/programs" className={`text-sm hover:text-green-700 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>{t('programs')}</Link>
              {programsOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-lg py-2">
                  <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t('programs')}</Link>
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t('about')}</Link>
                  <Link href="/impact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t('impact')}</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/impact" className={`text-sm hover:text-green-700 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('impact')}</Link>
            <Link href="/blog" className={`text-sm hover:text-green-700 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('blog')}</Link>
            <Link href="/gallery" className={`text-sm hover:text-green-700 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('gallery')}</Link>
            <Link href="/contact" className={`text-sm hover:text-green-700 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('contact')}</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button className={`flex items-center space-x-1 hover:text-green-700 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-sm">{languages.find(l => l.code === locale)?.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 pt-2 w-48 z-50">
                  <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-lg py-2">
                    {languages.map(lang => (
                      <button key={lang.code} onClick={() => changeLanguage(lang.code)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/donate" className="text-white px-3 py-2 md:px-8 md:py-3 rounded-full hover:opacity-90 font-semibold text-xs md:text-base" style={{backgroundColor: '#1f4f3f'}}>
              {t('donate')}
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 space-y-2 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-black/50 backdrop-blur-md'
          } rounded-lg mt-2`}>
            <Link href="/about" className={`block px-4 py-2 hover:bg-green-50 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('about')}</Link>
            <div>
              <button onClick={() => setProgramsOpen(!programsOpen)} className={`w-full text-left px-4 py-2 hover:bg-green-50 flex justify-between items-center ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {t('programs')}
                <svg className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {programsOpen && (
                <div className="pl-4">
                  <Link href="/programs" className={`block px-4 py-2 text-sm hover:bg-green-50 ${
                    isScrolled ? 'text-gray-600' : 'text-white/90'
                  }`}>{t('programs')}</Link>
                  <Link href="/about" className={`block px-4 py-2 text-sm hover:bg-green-50 ${
                    isScrolled ? 'text-gray-600' : 'text-white/90'
                  }`}>{t('about')}</Link>
                  <Link href="/impact" className={`block px-4 py-2 text-sm hover:bg-green-50 ${
                    isScrolled ? 'text-gray-600' : 'text-white/90'
                  }`}>{t('impact')}</Link>
                </div>
              )}
            </div>
            <Link href="/impact" className={`block px-4 py-2 hover:bg-green-50 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('impact')}</Link>
            <Link href="/blog" className={`block px-4 py-2 hover:bg-green-50 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('blog')}</Link>
            <Link href="/gallery" className={`block px-4 py-2 hover:bg-green-50 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('gallery')}</Link>
            <Link href="/contact" className={`block px-4 py-2 hover:bg-green-50 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>{t('contact')}</Link>
            <div>
              <button onClick={() => setLangOpen(!langOpen)} className={`w-full text-left px-4 py-2 hover:bg-green-50 flex justify-between items-center ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>Language {languages.find(l => l.code === locale)?.flag}</span>
                </span>
                <svg className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="pl-4">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 flex items-center space-x-2 ${
                      isScrolled ? 'text-gray-600' : 'text-white/90'
                    }`}>
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/donate" className="block px-4 py-2 text-center rounded-lg mx-4 text-white font-semibold" style={{backgroundColor: '#1f4f3f'}}>{t('donate')}</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
