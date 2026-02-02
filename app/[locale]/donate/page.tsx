'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function DonatePage() {
  const locale = useLocale();
  const t = useTranslations('donatePage');
  const [mtn, setMtn] = useState<any>(null);
  const [bank, setBank] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('content_sections').select('*').in('section_key', ['donate_mtn', 'donate_bank']);
      if (data) {
        setMtn(data.find(s => s.section_key === 'donate_mtn'));
        setBank(data.find(s => s.section_key === 'donate_bank'));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">{t('hero')}</h1>
          <p className="text-base sm:text-xl md:text-2xl text-white/95 max-w-3xl">{t('heroDesc')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        
        {/* Donation Methods */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-16 md:mb-24 lg:mb-32">
          
          {/* Mobile Money */}
          <div className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">{mtn?.title?.[locale] || t('mobileMoney')}</h3>
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-sm">
                <Image src={mtn?.media_urls?.[0] || '/MTN-Rwanda-MoMo-Logo-2 (1).jpg'} alt="MTN" width={80} height={80} className="rounded-xl w-16 h-16 sm:w-20 sm:h-20" />
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-800 text-base sm:text-lg mb-2">{t('mtnMobileMoney')}</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1 break-all">{mtn?.content?.[locale] || '*182*8*1*1111111#'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">{bank?.title?.[locale] || t('bankTransfer')}</h3>
            <div className="space-y-4 md:space-y-6 bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm">
              {bank?.content?.[locale]?.split('|').map((item: string, i: number) => (
                <div key={i} className={i > 0 ? 'border-t border-gray-200 pt-4 md:pt-6' : ''}>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{[t('bankName'), t('accountName'), t('accountNumber')][i]}</p>
                  <p className="font-bold text-base sm:text-lg md:text-xl text-gray-900 break-all">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-16 md:mb-24 lg:mb-32">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-gray-900">{t('yourImpact')}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <p className="font-bold text-3xl md:text-4xl mb-2 md:mb-3 text-green-600">$50</p>
              <p className="text-gray-700 text-base md:text-lg">{t('schoolMaterials')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <p className="font-bold text-3xl md:text-4xl mb-2 md:mb-3 text-green-600">$100</p>
              <p className="text-gray-700 text-base md:text-lg">{t('familyCounseling')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
              </div>
              <p className="font-bold text-3xl md:text-4xl mb-2 md:mb-3 text-green-600">$200</p>
              <p className="text-gray-700 text-base md:text-lg">{t('kitchenGarden')}</p>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24 lg:mb-32">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
            <Image src="/ufvimages/20.jpg" alt="Community impact" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-900">{t('whySupport')}</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1 md:mb-2">{t('directImpact')}</h4>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">{t('directImpactDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1 md:mb-2">{t('transparency')}</h4>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">{t('transparencyDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1 md:mb-2">{t('communityLed')}</h4>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">{t('communityLedDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">{t('togetherTitle')}</h3>
          <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto">
            {t('togetherDesc')}
          </p>
          <p className="text-lg md:text-xl italic">{t('thankYou')}</p>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
