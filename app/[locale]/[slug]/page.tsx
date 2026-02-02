import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default async function CustomPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  
  const { data: page } = await supabase
    .from('custom_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="relative h-[400px] bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        {page.image_url && (
          <div className="absolute inset-0">
            <img src={page.image_url} alt={page.title[locale] || page.title.en} className="w-full h-full object-cover opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">{page.title[locale] || page.title.en}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: page.content[locale] || page.content.en }} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
