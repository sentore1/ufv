import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">Our Programs</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Empowering communities through justice, education, and support</p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Justice Begins at Home */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-4">FEATURED PROGRAM</span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Justice Begins at Home</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A community-centered initiative designed to empower families with legal knowledge about their rights and responsibilities, encourage peaceful conflict resolution within homes and relationships, and prevent the suffering of children by strengthening parental roles.
            </p>
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image src="/IMG_5892 (1).jpg" alt="Justice program" fill className="object-cover object-top" />
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 rounded-3xl mb-10 shadow-xl">
            <h3 className="text-4xl font-bold mb-10 text-white text-center">Our 3 Pillars</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Community-Based Legal Education</h4>
                <p className="text-gray-600 leading-relaxed">Inteko z'Abaturage - Public legal education forums held in villages and neighborhoods</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Confidential Counseling & Mediation</h4>
                <p className="text-gray-600 leading-relaxed">Private support for families in conflict to address sensitive issues</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                </div>
                <h4 className="font-bold text-2xl mb-4 text-gray-900">Partnering with Community Leaders</h4>
                <p className="text-gray-600 leading-relaxed">Working with local leaders to strengthen accountability and child protection</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center">Impact Highlights</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-gray-700 text-lg">106 families supported to resolve conflicts in Kinyinya Sector</span>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-gray-700 text-lg">Legal awareness raised across all villages in Kinyinya (125,000+ people)</span>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-gray-700 text-lg">500+ local leaders trained on GBV and proper evidence handling</span>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-gray-700 text-lg">15 secondary schools reached on GBV prevention in Gasabo District</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Programs Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          
          {/* Tumurere Yize Program */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/education (1).jpg" alt="Education program" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-orange-600">Tumurere Yize Program</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                "Let us raise them to learn" - Educational support for children from extremely poor families, orphans, children with disabilities, and street-connected children.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Over 500 children received direct educational support</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">60 children reunited with families and reintegrated into school</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Established an open library in Huye District</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mama Youth Empowerment */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/IMG_5911 (1).jpg" alt="Youth empowerment" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2 text-orange-600">Mama Youth Empowerment</h2>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">New Life Beginning</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Supporting teenage mothers with legal advocacy, education reintegration, and small business support. We believe becoming a mother at a young age is not the end—it can be a new beginning.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">45 teenage mothers received direct support</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">10 young mothers reintegrated into school</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">25 beneficiaries supported to start small businesses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mentorship and Youth Empowerment */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/IMG_5929 (1).jpg" alt="Mentorship" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-orange-600">Mentorship and Youth Empowerment</h2>
              <p className="text-gray-600 leading-relaxed">
                Equipping young people with knowledge, skills, and confidence to become leaders, changemakers, and protectors of children's rights through trained mentors and workshops on gender equality, GBV prevention, legal awareness, mental health, digital skills, and entrepreneurship.
              </p>
            </div>
          </div>

          {/* Drug Prevention and Reintegration */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-[300px]">
              <Image src="/IMG_5939 (1).jpg" alt="Drug prevention" fill className="object-cover" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-orange-600">Drug Prevention and Reintegration</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Protecting young people from drug abuse through awareness campaigns, early intervention, rehabilitation support, and community reintegration.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">160 young people supported after rehabilitation</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">Mental health support provided to affected youth</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-gray-700">AI tools used to guide and connect vulnerable youth to help</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Kura Neza Mwana Program - Full Width */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl overflow-hidden shadow-xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/IMG_5963 (1).jpg" alt="Nutrition program" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-orange-600">Kura Neza Mwana Program</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                "Nurture the Child Well" - Community-based initiative to prevent and reduce child malnutrition through nutrition education, household food production, and the "One Egg per Child" approach.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We support families to establish kitchen gardens and provide egg-laying chickens to ensure children get reliable protein sources.
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
