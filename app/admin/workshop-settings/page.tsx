"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface WorkshopSettings {
  id: string;
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
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export default function WorkshopSettingsAdmin() {
  const router = useRouter();
  const [settings, setSettings] = useState<WorkshopSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) {
      router.push("/admin");
      return;
    }
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("workshop_settings")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Error fetching settings:", error);
      } else {
        setSettings(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof WorkshopSettings, value: string | boolean) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("workshop_settings")
        .update({
          title_en: settings.title_en,
          title_fr: settings.title_fr,
          title_ar: settings.title_ar,
          title_rw: settings.title_rw,
          subtitle_en: settings.subtitle_en,
          subtitle_fr: settings.subtitle_fr,
          subtitle_ar: settings.subtitle_ar,
          subtitle_rw: settings.subtitle_rw,
          location_en: settings.location_en,
          location_fr: settings.location_fr,
          location_ar: settings.location_ar,
          location_rw: settings.location_rw,
          start_date: settings.start_date,
          end_date: settings.end_date,
          is_active: settings.is_active,
        })
        .eq("id", settings.id);

      if (error) {
        console.error("Error saving settings:", error);
        alert("Failed to save settings: " + error.message);
      } else {
        alert("Settings saved successfully!");
        fetchSettings();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">No Settings Found</h2>
          <p className="text-red-600">Please run the workshop_settings SQL script first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workshop Form Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Active Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Status</h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.is_active}
              onChange={(e) => handleChange("is_active", e.target.checked)}
              className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Workshop form is active (visible to users)</span>
          </label>
        </div>

        {/* Dates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Workshop Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={settings.start_date}
                onChange={(e) => handleChange("start_date", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={settings.end_date}
                onChange={(e) => handleChange("end_date", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* English */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span> English
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={settings.title_en}
                onChange={(e) => handleChange("title_en", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle_en}
                onChange={(e) => handleChange("subtitle_en", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={settings.location_en}
                onChange={(e) => handleChange("location_en", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* French */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🇫🇷</span> Français
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                value={settings.title_fr}
                onChange={(e) => handleChange("title_fr", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
              <input
                type="text"
                value={settings.subtitle_fr}
                onChange={(e) => handleChange("subtitle_fr", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
              <input
                type="text"
                value={settings.location_fr}
                onChange={(e) => handleChange("location_fr", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Arabic */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🇸🇦</span> العربية
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={settings.title_ar}
                onChange={(e) => handleChange("title_ar", e.target.value)}
                dir="rtl"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الفرعي</label>
              <input
                type="text"
                value={settings.subtitle_ar}
                onChange={(e) => handleChange("subtitle_ar", e.target.value)}
                dir="rtl"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
              <input
                type="text"
                value={settings.location_ar}
                onChange={(e) => handleChange("location_ar", e.target.value)}
                dir="rtl"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Kinyarwanda */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🇷🇼</span> Kinyarwanda
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Umutwe</label>
              <input
                type="text"
                value={settings.title_rw}
                onChange={(e) => handleChange("title_rw", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Umutwe Muto</label>
              <input
                type="text"
                value={settings.subtitle_rw}
                onChange={(e) => handleChange("subtitle_rw", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aho Biherereye</label>
              <input
                type="text"
                value={settings.location_rw}
                onChange={(e) => handleChange("location_rw", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Save Button at Bottom */}
        <div className="flex justify-center pb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
