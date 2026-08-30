"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface WorkshopSettings {
  title_en: string;
  title_fr: string;
  title_ar: string;
  title_rw: string;
  subtitle_en: string;
  subtitle_fr: string;
  subtitle_ar: string;
  subtitle_rw: string;
  location_en: string;
  location_fr: string;
  location_ar: string;
  location_rw: string;
  is_active: boolean;
}

export default function WorkshopRegistration() {
  const t = useTranslations('workshop');
  const pathname = usePathname();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [workshopSettings, setWorkshopSettings] = useState<WorkshopSettings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Language switcher
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const languages = [
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'fr', name: 'FR', fullName: 'Français' },
    { code: 'ar', name: 'AR', fullName: 'العربية' },
    { code: 'rw', name: 'RW', fullName: 'Kinyarwanda' }
  ];

  const changeLanguage = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  // Fetch workshop settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("workshop_settings")
          .select("*")
          .eq("is_active", true)
          .single();

        if (data) {
          setWorkshopSettings(data);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  // Get localized content
  const getLocalizedContent = (field: 'title' | 'subtitle' | 'location') => {
    if (!workshopSettings) {
      return t(field === 'title' ? 'title' : field === 'subtitle' ? 'subtitle' : 'location');
    }
    
    const fieldMap = {
      title: {
        en: workshopSettings.title_en,
        fr: workshopSettings.title_fr,
        ar: workshopSettings.title_ar,
        rw: workshopSettings.title_rw,
      },
      subtitle: {
        en: workshopSettings.subtitle_en,
        fr: workshopSettings.subtitle_fr,
        ar: workshopSettings.subtitle_ar,
        rw: workshopSettings.subtitle_rw,
      },
      location: {
        en: workshopSettings.location_en,
        fr: workshopSettings.location_fr,
        ar: workshopSettings.location_ar,
        rw: workshopSettings.location_rw,
      },
    };

    return fieldMap[field][currentLocale as 'en' | 'fr' | 'ar' | 'rw'] || fieldMap[field].en;
  };

  // Form state
  const [formData, setFormData] = useState({
    // Section A: Personal Information
    full_name: "",
    gender: "",
    date_of_birth: "",
    nationality: "",
    country_of_residence: "",
    passport_number: "",

    // Section B: Organization Details
    organization_name: "",
    organization_type: "",
    position_title: "",
    years_experience: "",

    // Section C: Contact Information
    email: "",
    phone: "",
    emergency_contact: "",

    // Section D: Travel & Accommodation
    country_of_departure: "",
    arrival_date: "",
    departure_date: "",
    accommodation_required: false,
    airport_pickup_required: false,

    // Section E: Language & Participation
    preferred_languages: [] as string[],
    interpretation_required: false,

    // Section F: Dietary & Special Needs
    dietary_requirements: "",
    allergies_conditions: "",
    special_needs: "",

    // Section G: Expectations
    expectations: "",
    capacity_building_areas: [] as string[],

    // Section H: Declaration
    signature_name: "",
    signature_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[];
      const isSelected = currentArray.includes(value);
      return {
        ...prev,
        [name]: isSelected
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("workshop_registrations")
        .insert([formData]);

      if (error) {
        console.error("Error submitting registration:", error);
        alert("Failed to submit registration. Please try again.");
      } else {
        setSubmitted(true);
        alert("Registration submitted successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {/* Language Switcher on Success Page */}
          <div className="flex justify-end mb-4">
            <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  title={lang.fullName}
                  className={`px-3 py-1 text-xs font-semibold rounded transition ${
                    currentLocale === lang.code
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('successTitle')}</h2>
            <p className="text-gray-600 mb-8">
              {t('successMessage')}
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              {t('returnHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                title={lang.fullName}
                className={`px-3 py-1 text-xs font-semibold rounded transition ${
                  currentLocale === lang.code
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
            {/* UFV Logo */}
            <div className="flex-shrink-0">
              <img src="/partners/UFV.png" alt="Umbrella for Vulnerable" className="h-24 w-auto object-contain" />
            </div>
            {/* IsDB Logo */}
            <div className="flex-shrink-0">
              <img src="/partners/isDB.JPG" alt="Islamic Development Bank" className="h-20 w-auto object-contain" />
            </div>
            {/* SIF Logo */}
            <div className="flex-shrink-0">
              <img src="/partners/SIF.png" alt="Secure Interfaith France" className="h-20 w-auto object-contain" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            {getLocalizedContent('title')}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-2">
            {getLocalizedContent('subtitle')}
          </h2>
          <p className="text-center text-gray-600 font-medium">
            {getLocalizedContent('location')}
          </p>
          <h3 className="text-2xl font-bold text-center text-green-600 mt-6">
            {t('registrationForm')}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section A: Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionA')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')} *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('gender')} *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('selectGender')}</option>
                  <option value="Male">{t('male')}</option>
                  <option value="Female">{t('female')}</option>
                  <option value="Prefer not to say">{t('preferNotToSay')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('dateOfBirth')}</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('nationality')}</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('countryOfResidence')}</label>
                <input
                  type="text"
                  name="country_of_residence"
                  value={formData.country_of_residence}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('passportNumber')}</label>
                <input
                  type="text"
                  name="passport_number"
                  value={formData.passport_number}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section B: Organization Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionB')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('organizationName')} *</label>
                <input
                  type="text"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('organizationType')}</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { value: "Local NGO", label: t('localNGO') },
                    { value: "National NGO", label: t('nationalNGO') },
                    { value: "Regional NGO", label: t('regionalNGO') },
                    { value: "Faith-Based", label: t('faithBased') },
                    { value: "Other", label: t('other') }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="organization_type"
                        value={type.value}
                        checked={formData.organization_type === type.value}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('positionTitle')}</label>
                <input
                  type="text"
                  name="position_title"
                  value={formData.position_title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('yearsExperience')}</label>
                <select
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('selectYears')}</option>
                  <option value="<1">{t('lessThan1')}</option>
                  <option value="1-3">{t('oneToThree')}</option>
                  <option value="4-7">{t('fourToSeven')}</option>
                  <option value=">7">{t('moreThan7')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section C: Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionC')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('emergencyContact')}</label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  placeholder={t('emergencyContactPlaceholder')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section D: Travel & Accommodation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionD')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('countryOfDeparture')}</label>
                <input
                  type="text"
                  name="country_of_departure"
                  value={formData.country_of_departure}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('arrivalDate')}</label>
                <input
                  type="date"
                  name="arrival_date"
                  value={formData.arrival_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('departureDate')}</label>
                <input
                  type="date"
                  name="departure_date"
                  value={formData.departure_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('accommodationRequired')}</label>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="accommodation_required"
                        value="true"
                        checked={formData.accommodation_required === true}
                        onChange={(e) => setFormData(prev => ({ ...prev, accommodation_required: true }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{t('yes')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="accommodation_required"
                        value="false"
                        checked={formData.accommodation_required === false}
                        onChange={(e) => setFormData(prev => ({ ...prev, accommodation_required: false }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{t('no')}</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('airportPickupRequired')}</label>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="airport_pickup_required"
                        value="true"
                        checked={formData.airport_pickup_required === true}
                        onChange={(e) => setFormData(prev => ({ ...prev, airport_pickup_required: true }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{t('yes')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="airport_pickup_required"
                        value="false"
                        checked={formData.airport_pickup_required === false}
                        onChange={(e) => setFormData(prev => ({ ...prev, airport_pickup_required: false }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{t('no')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section E: Language & Participation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionE')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('preferredLanguages')}</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { value: "English", label: t('english') },
                    { value: "French", label: t('french') },
                    { value: "Arabic", label: t('arabic') },
                    { value: "Swahili", label: t('swahili') },
                    { value: "Other", label: t('other') }
                  ].map((lang) => (
                    <label key={lang.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.preferred_languages.includes(lang.value)}
                        onChange={() => handleMultiSelect("preferred_languages", lang.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('interpretationRequired')}</label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="interpretation_required"
                      value="true"
                      checked={formData.interpretation_required === true}
                      onChange={(e) => setFormData(prev => ({ ...prev, interpretation_required: true }))}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{t('yes')}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="interpretation_required"
                      value="false"
                      checked={formData.interpretation_required === false}
                      onChange={(e) => setFormData(prev => ({ ...prev, interpretation_required: false }))}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{t('no')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section F: Dietary & Special Needs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionF')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('dietaryRequirements')}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { value: "Halal", label: t('halal') },
                    { value: "Vegetarian", label: t('vegetarian') },
                    { value: "Other", label: t('other') }
                  ].map((diet) => (
                    <label key={diet.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="dietary_requirements"
                        value={diet.value}
                        checked={formData.dietary_requirements === diet.value}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{diet.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('allergiesConditions')}</label>
                <textarea
                  name="allergies_conditions"
                  value={formData.allergies_conditions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('specialNeeds')}</label>
                <textarea
                  name="special_needs"
                  value={formData.special_needs}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section G: Expectations */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionG')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('expectations')}</label>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('capacityBuildingAreas')}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "Management", label: t('management') },
                    { value: "Community Engagement", label: t('communityEngagement') },
                    { value: "Fundraising", label: t('fundraising') },
                    { value: "Project Management", label: t('projectManagement') },
                    { value: "Advocacy", label: t('advocacy') },
                    { value: "Other", label: t('other') }
                  ].map((area) => (
                    <label key={area.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.capacity_building_areas.includes(area.value)}
                        onChange={() => handleMultiSelect("capacity_building_areas", area.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm">{area.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section H: Declaration */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('sectionH')}</h3>
            <p className="text-sm text-gray-700 mb-6 italic">
              {t('declarationText')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')} *</label>
                <input
                  type="text"
                  name="signature_name"
                  value={formData.signature_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('date')} *</label>
                <input
                  type="date"
                  name="signature_date"
                  value={formData.signature_date}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? t('submitting') : t('submitButton')}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-8">
          <p className="font-medium">{t('footerText')}</p>
          <p>{t('footerContact')}</p>
        </div>
      </div>
    </div>
  );
}
