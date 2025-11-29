"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Helping Heart Family Rwanda"
              width={240}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-sm text-gray-700 hover:text-orange-600">About Us</Link>
            <div className="relative" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
              <Link href="/programs" className="text-sm text-gray-700 hover:text-orange-600">Our Programs</Link>
              {programsOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50">
                  <div className="bg-white shadow-lg rounded-lg py-2">
                  <Link href="/justice-begins-at-home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Justice Begins at Home</Link>
                  <Link href="/tumurere-yize" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Tumurere Yize Program</Link>
                  <Link href="/mama-youth-empowerment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Mama Youth Empowerment</Link>
                  <Link href="/mentorship-youth-empowerment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Mentorship and Youth Empowerment</Link>
                  <Link href="/drug-prevention" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Drug Prevention and Reintegration</Link>
                  <Link href="/kura-neza-mwana" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Kura Neza Mwana Program</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/impact" className="text-sm text-gray-700 hover:text-orange-600">Impact</Link>
            <Link href="/teams" className="text-sm text-gray-700 hover:text-orange-600">Teams</Link>
            <Link href="/blog" className="text-sm text-gray-700 hover:text-orange-600">Blog</Link>
            <Link href="/report" className="text-sm text-gray-700 hover:text-orange-600">Report</Link>
            <Link href="/gallery" className="text-sm text-gray-700 hover:text-orange-600">Gallery</Link>
            <Link href="/contact" className="text-sm text-gray-700 hover:text-orange-600">Contact</Link>
          </div>
          <Link href="/donate" className="text-black px-3 py-2 md:px-8 md:py-3 rounded-full hover:opacity-90 font-semibold text-xs md:text-base" style={{backgroundColor: '#fec415'}}>
            Donate
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">About Us</Link>
            <div>
              <button onClick={() => setProgramsOpen(!programsOpen)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 flex justify-between items-center">
                Our Programs
                <svg className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {programsOpen && (
                <div className="pl-4">
                  <Link href="/justice-begins-at-home" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Justice Begins at Home</Link>
                  <Link href="/tumurere-yize" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Tumurere Yize Program</Link>
                  <Link href="/mama-youth-empowerment" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Mama Youth Empowerment</Link>
                  <Link href="/mentorship-youth-empowerment" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Mentorship and Youth Empowerment</Link>
                  <Link href="/drug-prevention" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Drug Prevention and Reintegration</Link>
                  <Link href="/kura-neza-mwana" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50">Kura Neza Mwana Program</Link>
                </div>
              )}
            </div>
            <Link href="/impact" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Impact</Link>
            <Link href="/teams" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Teams</Link>
            <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Blog</Link>
            <Link href="/report" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Report</Link>
            <Link href="/gallery" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Gallery</Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Contact</Link>
            <Link href="/donate" className="block px-4 py-2 text-center rounded-lg mx-4 text-black font-semibold" style={{backgroundColor: '#fec415'}}>Donate Now</Link>
          </div>
        )}
      </div>
    </nav>
  );
}