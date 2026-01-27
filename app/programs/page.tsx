import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">Our Programs</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Supporting vulnerable communities through comprehensive programs</p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Social Protection Programs */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">CORE PROGRAM</span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Social Protection Programs</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Supporting vulnerable families, orphans, widows, and disadvantaged households to restore dignity and stability through comprehensive assistance and community support.
            </p>
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image src="/ufvimages/18.jpg" alt="Social protection program" fill className="object-cover object-top" />
          </div>

          <div className="bg-gradient-to-br from-green-800 to-green-900 p-12 rounded-3xl mb-10 shadow-xl">
            <h3 className="text-4xl font-bold mb-10 text-white text-center">Our Approach</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Direct Assistance</h4>
                <p className="text-gray-600 leading-relaxed">Providing immediate support to vulnerable families including food, shelter, and basic necessities</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Capacity Building</h4>
                <p className="text-gray-600 leading-relaxed">Empowering families with skills and resources for long-term self-reliance</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-700 rounded-4xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Community Integration</h4>
                <p className="text-gray-600 leading-relaxed">Connecting vulnerable families with community support networks and resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Programs Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          
          {/* Emergency Relief Programs */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/67.jpg" alt="Emergency relief program" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">Emergency Relief Programs</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Providing immediate humanitarian assistance during crises, disasters, and urgent community needs to ensure rapid response and recovery.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Rapid response to natural disasters and emergencies</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Food, shelter, and medical assistance distribution</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Community recovery and rehabilitation support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Programs */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/42.jpg" alt="Education programs" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">Education Programs</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Promoting access to education, vocational training, and life skills development for children and youth to build sustainable futures.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">School fee support for vulnerable children</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Vocational training and skills development</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Life skills and literacy programs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Faith-Based Programs */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/24.jpg" alt="Faith-based programs" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">Faith-Based Programs</h2>
              <p className="text-gray-600 leading-relaxed">
                Strengthening moral values, spiritual resilience, and ethical leadership through religious teachings and counseling for community transformation.
              </p>
            </div>
          </div>

          {/* Women & Youth Empowerment Programs */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/ufvimages/62.jpg" alt="Women and youth empowerment" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">Women & Youth Empowerment Programs</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Equipping women and young people with skills, resources, and opportunities for self-reliance and economic independence.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Business skills training and microfinance</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Leadership development and mentorship</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Digital literacy and technology access</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Family Protection & Divorce Prevention Programs - Full Width */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl overflow-hidden shadow-xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/ufvimages/35.jpg" alt="Family protection program" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-green-800">Family Protection & Divorce Prevention Programs</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Protecting the family unit by addressing the root causes of divorce through religious teachings, counseling, dialogue, and family mediation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We provide comprehensive family counseling, conflict resolution services, and educational programs to strengthen family bonds and prevent family breakdown.
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
