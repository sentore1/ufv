'use client';

import { useState, useEffect } from 'react';

export default function TranslationsAdmin() {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [languages, setLanguages] = useState(['en', 'fr', 'rw', 'ar']);
  const [selectedKey, setSelectedKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newLang, setNewLang] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTranslations();
  }, [languages]);

  const loadTranslations = async () => {
    const data: Record<string, any> = {};
    for (const lang of languages) {
      try {
        const res = await fetch(`/api/translations?lang=${lang}`);
        if (res.ok) data[lang] = await res.json();
      } catch (e) {
        data[lang] = {};
      }
    }
    setTranslations(data);
  };

  const getAllKeys = (obj: any, prefix = ''): string[] => {
    let keys: string[] = [];
    for (const key in obj) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], path));
      } else {
        keys.push(path);
      }
    }
    return keys;
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const setValueByPath = (obj: any, path: string, value: string) => {
    const parts = path.split('.');
    const last = parts.pop()!;
    const target = parts.reduce((acc, part) => {
      if (!acc[part]) acc[part] = {};
      return acc[part];
    }, obj);
    target[last] = value;
  };

  const allKeys = translations.en ? getAllKeys(translations.en) : [];
  const filteredKeys = allKeys.filter(key => 
    key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    languages.some(lang => 
      getValueByPath(translations[lang], key)?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const saveTranslations = async () => {
    for (const lang of languages) {
      await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang, data: translations[lang] })
      });
    }
    alert('Translations saved!');
  };

  const addNewKey = async () => {
    if (!newKey) return;
    const updated = { ...translations };
    languages.forEach(lang => {
      if (!updated[lang]) updated[lang] = {};
      setValueByPath(updated[lang], newKey, '');
    });
    setTranslations(updated);
    setNewKey('');
    
    for (const lang of languages) {
      await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang, data: updated[lang] })
      });
    }
    alert('New key added and saved!');
  };

  const addNewLanguage = () => {
    if (!newLang || languages.includes(newLang)) return;
    setLanguages([...languages, newLang]);
    setNewLang('');
  };

  const updateTranslation = (key: string, lang: string, value: string) => {
    const updated = { ...translations };
    setValueByPath(updated[lang], key, value);
    setTranslations(updated);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Translation Manager</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Translations</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by key or value..."
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Add New Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="e.g. nav.newItem"
                  className="flex-1 p-2 border rounded"
                />
                <button onClick={addNewKey} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Add New Language</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  placeholder="e.g. es"
                  className="flex-1 p-2 border rounded"
                />
                <button onClick={addNewLanguage} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Languages: {languages.map(l => <span key={l} className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">{l}</span>)}
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-end">
          <button onClick={saveTranslations} className="bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold text-lg shadow-lg">
            💾 Save All Translations
          </button>
        </div>

        <div className="space-y-4">
          {filteredKeys.map((key) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-4 text-green-800">{key}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map(lang => (
                  <div key={lang} className="border-l-4 border-green-800 pl-4">
                    <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                    <textarea
                      value={getValueByPath(translations[lang], key) || ''}
                      onChange={(e) => updateTranslation(key, lang, e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredKeys.length === 0 && (
          <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
            No translations found
          </div>
        )}
      </div>
    </div>
  );
}
