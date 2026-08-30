"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslations } from "next-intl";

export default function WorkshopRegistration() {
  const t = useTranslations();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering for the Regional Capacity Building Workshop. We have received your registration and will contact you soon with further details.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
            WORKSHOP OF REGIONAL CAPACITY BUILDING PROJECT FOR LOCAL NGOs
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-2">
            DEALING WITH MUSLIM COMMUNITIES IN AFRICA
          </h2>
          <p className="text-center text-gray-600 font-medium">
            25-31 JANUARY 2026, KIGALI-RWANDA
          </p>
          <h3 className="text-2xl font-bold text-center text-green-600 mt-6">
            REGISTRATION FORM
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section A: Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION A: PERSONAL INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
                <input
                  type="text"
                  name="country_of_residence"
                  value={formData.country_of_residence}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Passport / National ID Number</label>
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
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION B: ORGANIZATION DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name of Organization *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Organization</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["Local NGO", "National NGO", "Regional NGO", "Faith-Based", "Other"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="organization_type"
                        value={type}
                        checked={formData.organization_type === type}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position/Title</label>
                <input
                  type="text"
                  name="position_title"
                  value={formData.position_title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience with Muslim Communities</label>
                <select
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="<1">&lt;1</option>
                  <option value="1-3">1-3</option>
                  <option value="4-7">4-7</option>
                  <option value=">7">&gt;7</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section C: Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION C: CONTACT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone / WhatsApp Number *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  placeholder="Name and Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section D: Travel & Accommodation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION D: TRAVEL & ACCOMMODATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Departure</label>
                <input
                  type="text"
                  name="country_of_departure"
                  value={formData.country_of_departure}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Date</label>
                <input
                  type="date"
                  name="arrival_date"
                  value={formData.arrival_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation required?</label>
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
                      <span className="text-sm">Yes</span>
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
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Airport pickup/drop-off required?</label>
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
                      <span className="text-sm">Yes</span>
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
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section E: Language & Participation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION E: LANGUAGE & PARTICIPATION</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Language(s)</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["English", "French", "Arabic", "Swahili", "Other"].map((lang) => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.preferred_languages.includes(lang)}
                        onChange={() => handleMultiSelect("preferred_languages", lang)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interpretation services required?</label>
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
                    <span className="text-sm">Yes</span>
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
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section F: Dietary & Special Needs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION F: DIETARY & SPECIAL NEEDS</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Requirements</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Halal", "Vegetarian", "Other"].map((diet) => (
                    <label key={diet} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="dietary_requirements"
                        value={diet}
                        checked={formData.dietary_requirements === diet}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{diet}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies or medical conditions</label>
                <textarea
                  name="allergies_conditions"
                  value={formData.allergies_conditions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special needs or accessibility requirements</label>
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
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION G: EXPECTATIONS</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What do you expect to gain from this workshop?</label>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Key capacity-building area</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Management", "Community Engagement", "Fundraising", "Project Management", "Advocacy", "Other"].map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.capacity_building_areas.includes(area)}
                        onChange={() => handleMultiSelect("capacity_building_areas", area)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section H: Declaration */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">SECTION H: DECLARATION</h3>
            <p className="text-sm text-gray-700 mb-6 italic">
              I confirm that the information provided above is accurate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
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
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-8">
          <p className="font-medium">Regional Capacity Building Project for Local NGOs dealing with Muslim Communities in Africa.</p>
          <p>Email: umbrellaforvulnerable@gmail.com | Po Box 3047 Kigali-Rwanda</p>
        </div>
      </div>
    </div>
  );
}
