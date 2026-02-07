'use client';
import Image from "next/image";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {useTranslations, useLocale} from 'next-intl';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AboutPage() {
  const t = useTranslations('aboutPage');
  const locale = useLocale();
  const [sections, setSections] = useState<any>({});

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await supabase
        .from('content_sections')
        .select('*')
        .in('section_key', ['about_mission', 'about_vision', 'about_challenges', 'about_response', 'about_values', 'about_partners']);
      
      if (data) {
        const sectionsMap: any = {};
        data.forEach(section => {
          sectionsMap[section.section_key] = section;
        });
        setSections(sectionsMap);
      }
    };
    fetchSections();
  }, []);

  const mission = sections.about_mission;
  const vision = sections.about_vision;
  const challenges = sections.about_challenges;
  const response = sections.about_response;
  const values = sections.about_values;
  const partners = sections.about_partners;

  const [missionText1, missionText2] = mission?.content[locale]?.split('|') || ['', ''];
  const [challengeTitle1, challengeDesc1, challengeTitle2, challengeDesc2, challengeTitle3, challengeDesc3] = challenges?.content[locale]?.split('|') || [];
  const [responseText1, responseText2] = response?.content[locale]?.split('|') || ['', ''];
  const [value1Title, value1Desc, value2Title, value2Desc, value3Title, value3Desc, value4Title, value4Desc] = values?.content[locale]?.split('|') || [];
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="relative h-[400px] bg-gradient-to-br from-green-800 via-green-900 to-green-950 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">{t('hero')}</h1>
          <p className="text-2xl text-white/95 max-w-3xl">{t('heroDesc')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={mission?.media_urls[0] || "/ufvimages/47.jpg"} alt="Community work" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-900">{mission?.title[locale] || t('ourMission')}</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {missionText1 || t('missionText1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {missionText2 || t('missionText2')}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-16 mb-32 text-center shadow-2xl">
          <h2 className="text-5xl font-bold mb-8 text-white">{vision?.title[locale] || t('ourVision')}</h2>
          <p className="text-2xl text-white leading-relaxed max-w-4xl mx-auto">
            {vision?.content[locale] || t('visionText')}
          </p>
        </div>

        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">{challenges?.title[locale] || t('challengesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">{challengeTitle1 || t('poverty')}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{challengeDesc1 || t('povertyDesc')}</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">{challengeTitle2 || t('emergency')}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{challengeDesc2 || t('emergencyDesc')}</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">{challengeTitle3 || t('opportunities')}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{challengeDesc3 || t('opportunitiesDesc')}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-900">{response?.title[locale] || t('ourResponse')}</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {responseText1 || t('responseText1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {responseText2 || t('responseText2')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-green-700 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Comprehensive social protection and emergency relief</span>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-green-700 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Education and empowerment programs for sustainable development</span>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-green-700 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Faith-based and family protection initiatives</span>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={response?.media_urls[0] || "/ufvimages/34.jpg"} alt="Team work" fill className="object-cover" />
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">{t('testimonials')}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">CL</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{t('communityLeader')}</h4>
                  <p className="text-gray-500">Kigabiro, Rwamagana</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic leading-relaxed">"The social protection programs have transformed our community. Vulnerable families now have access to the support they need to rebuild their lives with dignity."</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">TM</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{t('beneficiary')}</h4>
                  <p className="text-gray-500">Kimihurura, Gasabo</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic leading-relaxed">"Through the women empowerment program, I gained skills and resources to start my own business. Now I can support my family and contribute to my community's development."</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-16 mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">{values?.title[locale] || t('coreValues')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{value1Title || t('integrity')}</h3>
              <p className="text-gray-600">{value1Desc || t('integrityDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{value2Title || t('compassion')}</h3>
              <p className="text-gray-600">{value2Desc || t('compassionDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{value3Title || t('community')}</h3>
              <p className="text-gray-600">{value3Desc || t('communityDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{value4Title || t('empowerment')}</h3>
              <p className="text-gray-600">{value4Desc || t('empowermentDesc')}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{partners?.title[locale] || t('ourPartners')}</h2>
            <div className="w-20 h-1 bg-green-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {partners?.content[locale] || t('partnersDesc')}
            </p>
          </div>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div className="w-48 h-24 bg-white shadow-lg overflow-hidden">
              <Image src="/partners/partner2.png" alt="Partner 2" width={192} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-48 h-24 bg-white shadow-lg overflow-hidden">
              <Image src="/partners/partner3.jpeg" alt="Partner 3" width={192} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-48 h-24 bg-white shadow-lg overflow-hidden">
              <Image src="/partners/partner4.jpeg" alt="Partner 4" width={192} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-48 h-24 bg-white shadow-lg overflow-hidden">
              <Image src="/partners/partner6.JPG" alt="Partner 6" width={192} height={96} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
