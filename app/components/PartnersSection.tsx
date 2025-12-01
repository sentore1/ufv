'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PartnersSection() {
  const [isGridView, setIsGridView] = useState(false);
  const partners = [
    { id: 1, name: 'Partner 1', logo: '/partners/partner1.jpeg' },
    { id: 2, name: 'Partner 2', logo: '/partners/partner2.png' },
    { id: 3, name: 'Partner 3', logo: '/partners/partner3.jpeg' },
    { id: 4, name: 'Partner 4', logo: '/partners/partner4.jpeg' },
    { id: 5, name: 'Partner 5', logo: '/partners/partner5.JPG' },
    { id: 6, name: 'Partner 6', logo: '/partners/partner6.JPG' },
    { id: 7, name: 'Partner 7', logo: '/partners/partner7.JPG' },
    { id: 8, name: 'Partner 8', logo: '/partners/partner8.jpeg' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-2">Our Partners</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We collaborate with these amazing organizations to create lasting impact in
            communities across Rwanda.
          </p>
          <button 
            onClick={() => setIsGridView(!isGridView)}
            className="border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            {isGridView ? 'View as List' : 'View as Grid'}
          </button>
        </div>
        <div className={isGridView ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center' : 'flex justify-center items-center gap-6 flex-wrap'}>
          {partners.map((partner) => (
            <div key={partner.id} className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border border-gray-200">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}