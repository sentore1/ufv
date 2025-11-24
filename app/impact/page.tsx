import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">Our Impact</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Real results from our programs across Rwanda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Key Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 rounded-3xl text-center text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-6xl font-bold mb-3">106</div>
            <p className="text-xl font-semibold mb-2">Families Supported</p>
            <p className="text-sm text-white/90">Conflicts resolved in Kinyinya Sector</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 rounded-3xl text-center text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-6xl font-bold mb-3">125K+</div>
            <p className="text-xl font-semibold mb-2">People Reached</p>
            <p className="text-sm text-white/90">Legal awareness raised in Kinyinya</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 rounded-3xl text-center text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-6xl font-bold mb-3">500+</div>
            <p className="text-xl font-semibold mb-2">Leaders Trained</p>
            <p className="text-sm text-white/90">On GBV and evidence handling</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 rounded-3xl text-center text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-6xl font-bold mb-3">500+</div>
            <p className="text-xl font-semibold mb-2">Children Helped</p>
            <p className="text-sm text-white/90">Educational support provided</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-20 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image src="/IMG_5966 (1).jpg" alt="Community impact" fill className="object-cover" />
        </div>

        {/* Impact Areas Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          
          {/* Education Impact */}
          <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Education Impact</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">500+ children</p>
                  <p className="text-gray-600">Received educational support and learning resources</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">60 children</p>
                  <p className="text-gray-600">Reunited with families and reintegrated into school</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Open library</p>
                  <p className="text-gray-600">Established in Huye District</p>
                </div>
              </div>
            </div>
          </div>

          {/* Youth Empowerment */}
          <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Youth Empowerment</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">45 teenage mothers</p>
                  <p className="text-gray-600">Received counseling and mentorship</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">25 young mothers</p>
                  <p className="text-gray-600">Supported to start small businesses</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">10 mothers</p>
                  <p className="text-gray-600">Successfully reintegrated into school</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Drug Prevention - Full Width */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-16 rounded-3xl mb-20 shadow-2xl">
          <h3 className="text-4xl font-bold mb-12 text-center">Drug Prevention & Rehabilitation Impact</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">160</div>
              <p className="text-xl">Young people supported after rehabilitation</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">100%</div>
              <p className="text-xl">Reunited with their families</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">AI</div>
              <p className="text-xl">Powered tools to guide vulnerable youth</p>
            </div>
          </div>
        </div>

        {/* GBV Prevention Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-4xl font-bold mb-8 text-gray-900">GBV Prevention</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">15 secondary schools reached in Gasabo District</span>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">500+ local leaders trained on proper evidence handling</span>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Community-wide awareness campaigns conducted</span>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Confidential counseling services established</span>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/IMG_6242-1 (1).jpg" alt="GBV prevention" fill className="object-cover" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-16 rounded-3xl text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-900">Join Us in Making a Difference</h3>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Together, we can create lasting change in communities across Rwanda. Your support helps us expand our reach and deepen our impact.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all transform hover:scale-105">
            Get Involved
          </button>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
