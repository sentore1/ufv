'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: { en: '', fr: '', rw: '', ar: '' },
    content: { en: '', fr: '', rw: '', ar: '' },
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data } = await supabase.from('custom_pages').select('*').order('created_at', { ascending: false });
    if (data) setPages(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      await supabase.from('custom_pages').update(formData).eq('id', editingPage.id);
    } else {
      await supabase.from('custom_pages').insert([formData]);
    }
    resetForm();
    fetchPages();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      await supabase.from('custom_pages').delete().eq('id', id);
      fetchPages();
    }
  };

  const resetForm = () => {
    setFormData({ slug: '', title: { en: '', fr: '', rw: '', ar: '' }, content: { en: '', fr: '', rw: '', ar: '' }, image_url: '', is_active: true });
    setEditingPage(null);
    setShowForm(false);
  };

  const startEdit = (page: any) => {
    setEditingPage(page);
    setFormData({ slug: page.slug, title: page.title, content: page.content, image_url: page.image_url || '', is_active: page.is_active });
    setShowForm(true);
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Page Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-6 py-2 rounded-lg">
          {showForm ? 'Cancel' : 'Add New Page'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="mb-4">
            <label className="block font-semibold mb-2">Page Slug (URL)</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border p-2 rounded" required />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Hero Image</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = await uploadImage(file);
                if (url) setFormData({...formData, image_url: url});
              }
            }} className="w-full border p-2 rounded mb-2" disabled={uploading} />
            <input type="text" placeholder="Or paste image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full border p-2 rounded" />
            {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />}
          </div>

          {['en', 'fr', 'rw', 'ar'].map(lang => (
            <div key={lang} className="mb-4">
              <label className="block font-semibold mb-2">Title ({lang.toUpperCase()})</label>
              <input type="text" value={formData.title[lang as keyof typeof formData.title]} onChange={(e) => setFormData({...formData, title: {...formData.title, [lang]: e.target.value}})} className="w-full border p-2 rounded" />
              <label className="block font-semibold mb-2 mt-2">Content ({lang.toUpperCase()})</label>
              <textarea value={formData.content[lang as keyof typeof formData.content]} onChange={(e) => setFormData({...formData, content: {...formData.content, [lang]: e.target.value}})} className="w-full border p-2 rounded h-32" />
            </div>
          ))}

          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="mr-2" />
              Active
            </label>
          </div>

          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg" disabled={uploading}>{uploading ? 'Uploading...' : editingPage ? 'Update' : 'Create'} Page</button>
        </form>
      )}

      <div className="grid gap-4">
        {pages.map(page => (
          <div key={page.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
            <div className="flex gap-4 items-center">
              {page.image_url && <img src={page.image_url} alt={page.title.en} className="w-24 h-24 object-cover rounded" />}
              <div>
                <h3 className="text-xl font-bold">/{page.slug}</h3>
                <p className="text-gray-600">{page.title.en}</p>
                <span className={`inline-block px-2 py-1 rounded text-sm ${page.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {page.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(page)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
              <button onClick={() => handleDelete(page.id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
