'use client';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

export default function ImpactSection() {
  const t = useTranslations('home');
  return (
    <section className="py-20 bg-gradient-to-br from-green-900 to-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">{t('ourImpact')}</h2>
          <p className="text-2xl text-white/95 max-w-3xl mx-auto">
            {t('impactIntro')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('studentsSupported')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('familiesSupported')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('womenEmpowered')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('mediationServices')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('emergencyRelief')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-sm text-white/90">{t('youthSupported')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
