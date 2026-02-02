'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/admin' && !localStorage.getItem('adminAuth')) {
      router.push('/admin');
    }
  }, [pathname, router]);

  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <img src="/ufvimages/logo.png" alt="Logo" className="w-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <button onClick={() => router.push('/admin/dashboard')} className={`w-full text-left px-4 py-3 rounded ${pathname === '/admin/dashboard' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}>
              Dashboard
            </button>
            <button onClick={() => router.push('/admin/content')} className={`w-full text-left px-4 py-3 rounded ${pathname === '/admin/content' ? 'bg-green-800 text-white' : 'hover:bg-gray-100'}`}>
              CMS
            </button>
            <button onClick={() => router.push('/admin/pages')} className={`w-full text-left px-4 py-3 rounded ${pathname === '/admin/pages' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
              Pages
            </button>
            <button onClick={() => router.push('/admin/translations')} className={`w-full text-left px-4 py-3 rounded ${pathname === '/admin/translations' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}>
              Translations
            </button>
            <button onClick={() => { localStorage.removeItem('adminAuth'); router.push('/admin'); }} className="w-full text-left px-4 py-3 rounded text-red-600 hover:bg-red-50 mt-4">
              Logout
            </button>
          </nav>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
