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
  const [categories, setCategories] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [donorType, setDonorType] = useState<string>('personal');
  const [needReceipt, setNeedReceipt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    additionalNote: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('content_sections').select('*').eq('section_key', 'donation_categories').single();
      if (data) setCategories(data);
    };
    fetchData();
  }, []);

  const categoryList = categories?.content[locale]?.split('|') || [];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="relative h-[300px] bg-gradient-to-br from-green-800 via-green-700 to-green-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{t('hero')}</h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl">{t('heroDesc')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className={`ml-2 font-semibold ${step >= 1 ? 'text-green-700' : 'text-gray-400'}`}>
                {locale === 'en' ? 'Category' : locale === 'fr' ? 'Catégorie' : locale === 'rw' ? 'Icyiciro' : 'الفئة'}
              </span>
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-green-700' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className={`ml-2 font-semibold ${step >= 2 ? 'text-green-700' : 'text-gray-400'}`}>
                {locale === 'en' ? 'Your Info' : locale === 'fr' ? 'Vos infos' : locale === 'rw' ? 'Amakuru yawe' : 'معلوماتك'}
              </span>
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-green-700' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <span className={`ml-2 font-semibold ${step >= 3 ? 'text-green-700' : 'text-gray-400'}`}>
                {locale === 'en' ? 'Payment' : locale === 'fr' ? 'Paiement' : locale === 'rw' ? 'Kwishyura' : 'الدفع'}
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {locale === 'en' ? 'Please select the purpose and enter the amount of your donation.' : 
               locale === 'fr' ? 'Veuillez sélectionner l\'objectif et entrer le montant de votre don.' :
               locale === 'rw' ? 'Nyamuneka hitamo intego kandi wandike amafaranga y\'impano yawe.' :
               'يرجى تحديد الغرض وإدخال مبلغ التبرع الخاص بك.'}
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {locale === 'en' ? 'Select Category' : locale === 'fr' ? 'Sélectionner la catégorie' : locale === 'rw' ? 'Hitamo icyiciro' : 'اختر الفئة'}
              </label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg">
                <option value="">{locale === 'en' ? 'Choose...' : locale === 'fr' ? 'Choisir...' : locale === 'rw' ? 'Hitamo...' : 'اختر...'}</option>
                {categoryList.map((cat: string, i: number) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {selectedCategory && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {locale === 'en' ? 'Amount ($)' : locale === 'fr' ? 'Montant ($)' : locale === 'rw' ? 'Amafaranga ($)' : 'المبلغ ($)'}
                </label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg" />
              </div>
            )}
            <div className="mt-8 flex justify-between items-center p-4 bg-gray-100 rounded-lg">
              <span className="text-xl font-bold">Total donation</span>
              <span className="text-2xl font-bold text-green-700">${amount || '0.00'}</span>
            </div>
            <button onClick={() => amount && setStep(2)} disabled={!amount || !selectedCategory} className="w-full mt-6 bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed">
              NEXT →
            </button>
          </div>
        )}

        {/* Step 2: Donor Information */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {locale === 'en' ? 'Your Information' : locale === 'fr' ? 'Vos informations' : locale === 'rw' ? 'Amakuru yawe' : 'معلوماتك'}
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {locale === 'en' ? 'Donor Type' : locale === 'fr' ? 'Type de donateur' : locale === 'rw' ? 'Ubwoko bw\'uwatanze' : 'نوع المتبرع'}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="personal" checked={donorType === 'personal'} onChange={(e) => setDonorType(e.target.value)} className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Personal' : locale === 'fr' ? 'Personnel' : locale === 'rw' ? 'Umuntu ku giti cye' : 'شخصي'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="company" checked={donorType === 'company'} onChange={(e) => setDonorType(e.target.value)} className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Company' : locale === 'fr' ? 'Entreprise' : locale === 'rw' ? 'Isosiyete' : 'شركة'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="ngo" checked={donorType === 'ngo'} onChange={(e) => setDonorType(e.target.value)} className="w-4 h-4" />
                  <span>{locale === 'en' ? 'NGO' : locale === 'fr' ? 'ONG' : locale === 'rw' ? 'Umuryango' : 'منظمة'}</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">{locale === 'en' ? 'Full Name' : locale === 'fr' ? 'Nom complet' : locale === 'rw' ? 'Amazina yose' : 'الاسم الكامل'} *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{locale === 'en' ? 'Email' : locale === 'fr' ? 'Email' : locale === 'rw' ? 'Imeri' : 'البريد الإلكتروني'} *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{locale === 'en' ? 'Phone' : locale === 'fr' ? 'Téléphone' : locale === 'rw' ? 'Telefone' : 'الهاتف'}</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{locale === 'en' ? 'Address' : locale === 'fr' ? 'Adresse' : locale === 'rw' ? 'Aderesi' : 'العنوان'}</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 border-2 border-gray-300 rounded-lg" />
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={needReceipt} onChange={(e) => setNeedReceipt(e.target.checked)} className="w-5 h-5 mt-1" />
                <span>{locale === 'en' ? 'I need a donation receipt' : locale === 'fr' ? 'J\'ai besoin d\'un reçu de don' : locale === 'rw' ? 'Nkeneye inyemezabwishyu' : 'أحتاج إيصال تبرع'}</span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{locale === 'en' ? 'Additional Note' : locale === 'fr' ? 'Note supplémentaire' : locale === 'rw' ? 'Inyongera' : 'ملاحظة إضافية'}</label>
              <textarea value={formData.additionalNote} onChange={(e) => setFormData({...formData, additionalNote: e.target.value})} rows={3} className="w-full p-3 border-2 border-gray-300 rounded-lg"></textarea>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
                ← BACK
              </button>
              <button onClick={() => setStep(3)} disabled={!formData.name || !formData.email} className="flex-1 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed">
                NEXT →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {locale === 'en' ? 'Choose Payment Method' : locale === 'fr' ? 'Choisir la méthode de paiement' : locale === 'rw' ? 'Hitamo uburyo bwo kwishyura' : 'اختر طريقة الدفع'}
            </h2>
            <div className="space-y-4 mb-6">
              <div className="p-6 border-2 border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-2">MTN Mobile Money</h3>
                <p className="text-2xl font-bold text-green-600">*182*8*1*1111111#</p>
              </div>
              <div className="p-6 border-2 border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Bank Transfer</h3>
                <p className="text-sm text-gray-600">Contact us for bank details</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
                ← BACK
              </button>
              <button onClick={async () => {
                await fetch('/api/donations', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    category: selectedCategory,
                    amount,
                    donorType,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    needReceipt,
                    additionalNote: formData.additionalNote
                  })
                });
                setShowSuccess(true);
              }} className="flex-1 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800">
                COMPLETE DONATION
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {locale === 'en' ? 'Thank You!' : locale === 'fr' ? 'Merci!' : locale === 'rw' ? 'Murakoze!' : 'شكراً لك!'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {locale === 'en' ? 'Your donation has been received. We will contact you shortly with payment instructions.' : 
                 locale === 'fr' ? 'Votre don a été reçu. Nous vous contacterons bientôt avec les instructions de paiement.' :
                 locale === 'rw' ? 'Impano yawe yakirijwe. Tuzakumenyesha vuba amabwiriza yo kwishyura.' :
                 'تم استلام تبرعك. سنتواصل معك قريباً بتعليمات الدفع.'}
              </p>
              <button onClick={() => { setShowSuccess(false); setStep(1); setSelectedCategory(''); setAmount(''); setFormData({name: '', email: '', phone: '', address: '', additionalNote: ''}); }} className="bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800">
                {locale === 'en' ? 'Close' : locale === 'fr' ? 'Fermer' : locale === 'rw' ? 'Funga' : 'إغلاق'}
              </button>
            </div>
          </div>
        )}

      </div>
      
      <Footer />
    </div>
  );
}
