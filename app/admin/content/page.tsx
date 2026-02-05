'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContentAdmin() {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const languages = ['en', 'fr', 'rw', 'ar'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: slides } = await supabase.from('hero_slides').select('*').order('order_index');
    const { data: secs } = await supabase.from('content_sections').select('*');
    console.log('Fetched sections:', secs);
    setHeroSlides(slides || []);
    setSections(secs || []);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file);
    setUploading(false);
    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      return publicUrl;
    }
    return null;
  };

  const saveSlide = async (slide: any) => {
    const dataToSave = editingItem?.id === slide.id ? editingItem : slide;
    const { error } = await supabase.from('hero_slides').update({
      title: dataToSave.title,
      subtitle: dataToSave.subtitle,
      media_url: dataToSave.media_url,
      media_type: dataToSave.media_type,
      is_active: dataToSave.is_active
    }).eq('id', slide.id);
    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      alert('Saved!');
      fetchData();
      setEditingItem(null);
    }
  };

  const deleteSlide = async (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      await supabase.from('hero_slides').delete().eq('id', id);
      fetchData();
    }
  };

  const addSlide = async () => {
    const maxOrder = Math.max(...heroSlides.map(s => s.order_index), 0);
    await supabase.from('hero_slides').insert([{
      title: { en: 'New Slide', fr: 'Nouvelle Diapositive', rw: 'Slide Nshya', ar: 'شريحة جديدة' },
      subtitle: { en: 'Add subtitle', fr: 'Ajouter sous-titre', rw: 'Ongeraho umutwe', ar: 'أضف عنوان فرعي' },
      media_url: '/slide/slide4.jpg',
      media_type: 'image',
      order_index: maxOrder + 1,
      is_active: true
    }]);
    fetchData();
  };

  const saveSection = async (section: any) => {
    const dataToSave = editingItem?.id === section.id ? editingItem : section;
    const { error } = await supabase.from('content_sections').update({
      title: dataToSave.title,
      content: dataToSave.content,
      updated_at: new Date().toISOString()
    }).eq('id', section.id);
    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      alert('Saved!');
      fetchData();
      setEditingItem(null);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Management</h1>
        
        <div className="flex gap-4 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('hero')} className={`px-6 py-2 rounded ${activeTab === 'hero' ? 'bg-green-800 text-white' : 'bg-white'}`}>Hero</button>
          <button onClick={() => setActiveTab('sections')} className={`px-6 py-2 rounded ${activeTab === 'sections' ? 'bg-green-800 text-white' : 'bg-white'}`}>Mission/Vision</button>
          <button onClick={() => setActiveTab('programs')} className={`px-6 py-2 rounded ${activeTab === 'programs' ? 'bg-green-800 text-white' : 'bg-white'}`}>Programs</button>
          <button onClick={() => setActiveTab('impact')} className={`px-6 py-2 rounded ${activeTab === 'impact' ? 'bg-green-800 text-white' : 'bg-white'}`}>Impact</button>
          <button onClick={() => setActiveTab('cta')} className={`px-6 py-2 rounded ${activeTab === 'cta' ? 'bg-green-800 text-white' : 'bg-white'}`}>CTA</button>
          <button onClick={() => setActiveTab('testimonials')} className={`px-6 py-2 rounded ${activeTab === 'testimonials' ? 'bg-green-800 text-white' : 'bg-white'}`}>Testimonials</button>
          <button onClick={() => setActiveTab('about')} className={`px-6 py-2 rounded ${activeTab === 'about' ? 'bg-green-800 text-white' : 'bg-white'}`}>About</button>
          <button onClick={() => setActiveTab('map')} className={`px-6 py-2 rounded ${activeTab === 'map' ? 'bg-green-800 text-white' : 'bg-white'}`}>Map</button>
          <button onClick={() => setActiveTab('newsletter')} className={`px-6 py-2 rounded ${activeTab === 'newsletter' ? 'bg-green-800 text-white' : 'bg-white'}`}>Newsletter</button>
          <button onClick={() => setActiveTab('donate')} className={`px-6 py-2 rounded ${activeTab === 'donate' ? 'bg-green-800 text-white' : 'bg-white'}`}>Donate</button>
          <button onClick={() => setActiveTab('contact')} className={`px-6 py-2 rounded ${activeTab === 'contact' ? 'bg-green-800 text-white' : 'bg-white'}`}>Contact</button>
        </div>

        {activeTab === 'hero' && (
          <div className="space-y-6">
            <button onClick={addSlide} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              + Add New Slide
            </button>
            {heroSlides.map((slide) => {
              const isEditing = editingItem?.id === slide.id;
              const current = isEditing ? editingItem : slide;
              return (
              <div key={slide.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4">Slide {slide.order_index}</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <input 
                        type="text" 
                        placeholder={`Subtitle (${lang})`}
                        value={current.subtitle?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, subtitle: {...current.subtitle, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium mb-2">Upload Image/Video</label>
                    <input type="file" accept="image/*,video/*" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImage(file);
                        if (url) setEditingItem({...current, media_url: url, media_type: file.type.startsWith('video') ? 'video' : 'image'});
                      }
                    }} className="w-full p-2 border rounded mb-2" disabled={uploading} />
                    <input type="text" placeholder="Or paste URL" value={current.media_url || ''} onChange={(e) => setEditingItem({...current, media_url: e.target.value})} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select value={current.media_type || 'image'} onChange={(e) => setEditingItem({...current, media_type: e.target.value})} className="w-full p-2 border rounded">
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={current.is_active} onChange={(e) => setEditingItem({...current, is_active: e.target.checked})} />
                      Active
                    </label>
                  </div>
                  <button onClick={() => saveSlide(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                  <button onClick={() => deleteSlide(slide.id)} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    Delete Slide
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            <button onClick={async () => {
              const count = sections.filter(s => s.section_key.startsWith('program_')).length;
              await supabase.from('content_sections').insert([{
                section_key: `program_custom_${count + 1}`,
                title: { en: 'New Program', fr: 'Nouveau Programme', rw: 'Gahunda Nshya', ar: 'برنامج جديد' },
                content: { en: 'Program description', fr: 'Description du programme', rw: 'Ibisobanuro', ar: 'وصف البرنامج' },
                media_urls: ['/programs/social-protection/social-protection-1.jpg']
              }]);
              fetchData();
            }} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              + Add New Program
            </button>
            {sections.filter(s => s.section_key.startsWith('program')).map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4 capitalize">{section.section_key.replace('program_', '').replace('_', ' ')}</h3>
                <div className="space-y-4">
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Program Image</label>
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImage(file);
                        if (url) setEditingItem({...current, media_urls: [url]});
                      }
                    }} className="w-full border p-2 rounded mb-2" disabled={uploading} />
                    <input type="text" placeholder="Or paste image URL" value={current.media_urls?.[0] || ''} onChange={(e) => setEditingItem({...current, media_urls: [e.target.value]})} className="w-full border p-2 rounded" />
                    {current.media_urls?.[0] && <img src={current.media_urls[0]} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />}
                  </div>
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Description (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={async () => {
                    const { error } = await supabase.from('content_sections').update({
                      title: current.title,
                      content: current.content,
                      media_urls: current.media_urls,
                      updated_at: new Date().toISOString()
                    }).eq('id', section.id);
                    if (error) alert('Error: ' + error.message);
                    else { alert('Saved!'); fetchData(); setEditingItem(null); }
                  }} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                  {section.section_key.includes('custom') && (
                    <button onClick={async () => {
                      if (confirm('Delete this program?')) {
                        await supabase.from('content_sections').delete().eq('id', section.id);
                        fetchData();
                      }
                    }} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-6">
            {sections.filter(s => ['mission', 'vision'].includes(s.section_key)).map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4 capitalize">{section.section_key}</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-6">
            <button onClick={async () => {
              const newKey = prompt('Enter section key (e.g., impact_newmetric):');
              if (!newKey) return;
              await supabase.from('content_sections').insert([{
                section_key: newKey,
                title: { en: 'New Metric', fr: 'Nouvelle Métrique', rw: 'Igipimo Gishya', ar: 'مقياس جديد' },
                content: { en: 'Description', fr: 'Description', rw: 'Ibisobanuro', ar: 'وصف' },
                media_urls: []
              }]);
              fetchData();
            }} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              + Add New Impact Metric
            </button>
            {sections.filter(s => s.section_key.startsWith('impact_')).map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4 capitalize">{section.section_key.replace('impact_', '')}</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                  <button onClick={async () => {
                    if (confirm('Delete this metric?')) {
                      await supabase.from('content_sections').delete().eq('id', section.id);
                      fetchData();
                    }
                  }} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'cta' && (
          <div className="space-y-6">
            {sections.filter(s => s.section_key === 'cta_section').map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4">Call to Action Section</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <button onClick={async () => {
              const count = sections.filter(s => s.section_key.startsWith('testimonial_')).length;
              await supabase.from('content_sections').insert([{
                section_key: `testimonial_${count + 1}`,
                title: { en: 'Person Name', fr: 'Nom de la Personne', rw: 'Izina', ar: 'الاسم' },
                content: { en: 'Quote text|Location', fr: 'Citation|Lieu', rw: 'Amagambo|Ahantu', ar: 'اقتباس|موقع' },
                media_urls: []
              }]);
              fetchData();
            }} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              + Add New Testimonial
            </button>
            {sections.filter(s => s.section_key.startsWith('testimonial')).map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4 capitalize">{section.section_key.replace('_', ' ')}</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang}) - Format: "Quote text|Location"`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                  {!section.section_key.includes('header') && (
                    <button onClick={async () => {
                      if (confirm('Delete this testimonial?')) {
                        await supabase.from('content_sections').delete().eq('id', section.id);
                        fetchData();
                      }
                    }} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            {sections.filter(s => s.section_key === 'about_us').map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4">About Us Section</h3>
                <div className="space-y-4">
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Section Image</label>
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImage(file);
                        if (url) setEditingItem({...current, media_urls: [url]});
                      }
                    }} className="w-full border p-2 rounded mb-2" disabled={uploading} />
                    <input type="text" placeholder="Or paste image URL" value={current.media_urls?.[0] || ''} onChange={(e) => setEditingItem({...current, media_urls: [e.target.value]})} className="w-full border p-2 rounded" />
                    {current.media_urls?.[0] && <img src={current.media_urls[0]} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />}
                  </div>
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={async () => {
                    const { error } = await supabase.from('content_sections').update({
                      title: current.title,
                      content: current.content,
                      media_urls: current.media_urls,
                      updated_at: new Date().toISOString()
                    }).eq('id', section.id);
                    if (error) alert('Error: ' + error.message);
                    else { alert('Saved!'); fetchData(); setEditingItem(null); }
                  }} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6">
            {sections.filter(s => s.section_key === 'map_section').map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4">Map Section</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang}) - Format: "Description|Community Title|Community Description"`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-32" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            {sections.filter(s => s.section_key === 'newsletter_section').map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4">Newsletter Section</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang}) - Format: "Description|Placeholder|Button Text"`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}
        {(activeTab === 'donate' || activeTab === 'contact') && (
          <div className="space-y-6">
            {sections.filter(s => s.section_key.startsWith(activeTab)).map((section) => {
              const isEditing = editingItem?.id === section.id;
              const current = isEditing ? editingItem : section;
              return (
              <div key={section.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-4 capitalize">{section.section_key.replace(activeTab + '_', '')}</h3>
                <div className="space-y-4">
                  {languages.map(lang => (
                    <div key={lang} className="border-l-4 border-green-800 pl-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">{lang}</p>
                      <input 
                        type="text" 
                        placeholder={`Title (${lang})`}
                        value={current.title?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, title: {...current.title, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <textarea 
                        placeholder={`Content (${lang})`}
                        value={current.content?.[lang] || ''} 
                        onChange={(e) => setEditingItem({...current, content: {...current.content, [lang]: e.target.value}})} 
                        className="w-full p-2 border rounded h-24" 
                      />
                    </div>
                  ))}
                  <button onClick={() => saveSection(current)} className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
