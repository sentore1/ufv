'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function ProgramAccordion() {
  const [activeProgram, setActiveProgram] = useState(1);

  const programs: Program[] = [
    {
      id: 1,
      title: "Justice Begins at Home",
      description: "Community-centered initiative to promote justice, accountability, and nonviolence within families by increasing legal awareness and peaceful dialogue.",
      icon: "scale"
    },
    {
      id: 2,
      title: "Tumurere Yize Program",
      description: "Educational support for children from extremely poor families, orphans, children with disabilities, and street-connected children.",
      icon: "book"
    },
    {
      id: 3,
      title: "Mama Youth Empowerment",
      description: "Supporting teenage mothers through counseling, skills-building, and mentorship to restore hope, dignity, and opportunity for young mothers.",
      icon: "heart"
    },
    {
      id: 4,
      title: "Mentorship and Youth Empowerment",
      description: "Equipping young people with knowledge, skills, and confidence to become leaders, changemakers, and protectors of children's rights.",
      icon: "users"
    },
    {
      id: 5,
      title: "Drug Prevention and Reintegration",
      description: "Protecting young people from the dangers of drug abuse while supporting those already affected to rebuild their lives through awareness and rehabilitation support.",
      icon: "shield"
    },
    {
      id: 6,
      title: "Kura Neza Mwana Program",
      description: "Community-based initiative designed to prevent and reduce child malnutrition by empowering parents and strengthening household nutrition practices.",
      icon: "nutrition"
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'nutrition':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5z"/>
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
          </svg>
        );
      case 'book':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/>
          </svg>
        );
      case 'scale':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11h14V7l-7-5zM6 9a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getImageForProgram = (id: number) => {
    const images = {
      1: '/program/Justice Begans at Home pictures/Justice Begans at Home pictures 1.jpg',
      2: '/program/Tumurere Yize Program pictures/Tumurere Yize Program 1.jpg', 
      3: '/program/Mama youth empowerment pictures/IMG_5928.JPG',
      4: '/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  1.JPG',
      5: '/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 1.JPG',
      6: '/program/Kura neza Mwana program/Kuraneza 1.JPG'
    };
    return images[id as keyof typeof images] || '/program/Kura neza Mwana program/Kuraneza 1.JPG';
  };

  const getUrlForProgram = (id: number) => {
    const urls = {
      1: '/justice-begins-at-home',
      2: '/tumurere-yize',
      3: '/mama-youth-empowerment',
      4: '/mentorship-youth-empowerment',
      5: '/drug-prevention',
      6: '/kura-neza-mwana'
    };
    return urls[id as keyof typeof urls] || '/';
  };

  const activeItem = programs.find(p => p.id === activeProgram) || programs[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Through our diverse range of programs, we address countless challenges, resources,
            and opportunities to create lasting impact in communities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1">
            <div className="h-[500px] w-full rounded-2xl overflow-hidden relative">
              <Image
                src={getImageForProgram(activeItem.id)}
                alt={activeItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/30 backdrop-blur-md border border-orange-400/50 rounded-full flex items-center justify-center">
                    <span className="text-white">{getIcon(activeItem.icon)}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{activeItem.title}</h3>
                </div>
                <p className="text-lg mb-6 leading-relaxed">{activeItem.description}</p>
                <a href={getUrlForProgram(activeItem.id)} className="inline-block text-white px-6 py-2 rounded-2xl font-medium bg-orange-500/30 backdrop-blur-md border border-orange-400/50 hover:bg-orange-500/50 transition-all">
                  Read More →
                </a>
              </div>
            </div>
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgram(program.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeProgram === program.id ? 'bg-orange-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Right side - Program List */}
          <div className="order-1 lg:order-2 space-y-3">
            {programs.map((program) => (
              <div 
                key={program.id} 
                className={`rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${
                  activeProgram === program.id ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveProgram(program.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">{getIcon(program.icon)}</span>
                  </div>
                  <h3 className={`text-lg font-medium ${
                    activeProgram === program.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {program.title}
                  </h3>
                </div>
                <span className={`text-xl ${
                  activeProgram === program.id ? 'text-white' : 'text-gray-400'
                }`}>
                  ›
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}