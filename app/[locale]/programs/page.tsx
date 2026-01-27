'use client';
import Image from "next/image";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {useTranslations} from 'next-intl';

export default function ProgramsPage() {
  const t = useTranslations('programsPage');
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="relative h-[400px] bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">{t('hero')}</h1>
          <p className="text-2xl text-white/95 max-w-3xl">{t('heroDesc')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">{t('coreProgram')}</span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">{t('socialProtection')}</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('socialProtectionDesc')}
            </p>
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image src="/ufvimages/18.jpg" alt="Social protection program" fill className="object-cover object-top" />
          </div>

          <div className="bg-gradient-to-br from-green-800 to-green-900 p-12 rounded-3xl mb-10 shadow-xl">
            <h3 className="text-4xl font-bold mb-10 text-white text-center">{t('ourApproach')}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">{t('directAssistance')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('directAssistanceDesc')}</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">{t('capacityBuilding')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('capacityBuildingDesc')}</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">{t('communityIntegration')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('communityIntegrationDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/67.jpg" alt="Emergency relief program" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">{t('emergencyRelief')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('emergencyReliefDesc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('rapidResponse')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('foodShelter')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('communityRecovery')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/42.jpg" alt="Education programs" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">{t('education')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('educationDesc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('schoolFees')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('vocationalTraining')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('lifeSkills')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/24.jpg" alt="Faith-based programs" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">{t('faithBased')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('faithBasedDesc')}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/62.jpg" alt="Women and youth empowerment" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">{t('womenYouth')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('womenYouthDesc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('businessSkills')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('leadership')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">{t('digitalLiteracy')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl overflow-hidden shadow-xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/ufvimages/35.jpg" alt="Family protection program" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-green-800">{t('familyProtection')}</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                {t('familyProtectionDesc')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('familyProtectionDesc2')}
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
