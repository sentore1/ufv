import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">About Us</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Building stronger families and communities across Rwanda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/IMG_5563 (1).jpg" alt="Community work" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              At Helping Heart Family Rwanda, we are dedicated to promoting justice, accountability, and nonviolence within families by increasing legal awareness, strengthening peaceful dialogue, and reinforcing the role of parents and leaders in protecting children.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through our work across different districts, we have witnessed the everyday struggles families face, and we are committed to addressing these challenges through community-centered initiatives.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-16 mb-32 text-center shadow-2xl">
          <h2 className="text-5xl font-bold mb-8 text-white">Our Vision</h2>
          <p className="text-2xl text-white leading-relaxed max-w-4xl mx-auto">
            A Rwanda where every family is empowered with knowledge, every child is protected, and every community thrives through justice, peace, and mutual support.
          </p>
        </div>

        {/* Challenges Section */}
        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">Challenges We Address</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Family Conflict</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Family conflict and domestic violence affecting household stability and child wellbeing</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Child Protection</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Child neglect and abuse where children are left unprotected in unsafe homes</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Education Access</h3>
              <p className="text-gray-600 text-lg leading-relaxed">School dropouts and children going to the streets due to family instability</p>
            </div>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-900">Our Approach</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              These issues are not due to a lack of laws—Rwanda's legal framework is strong. The problem is limited legal awareness, lack of conflict resolution tools, and community disengagement.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We employ community-centered initiatives designed to empower families with legal knowledge, encourage peaceful conflict resolution, and prevent the suffering of children by strengthening parental roles.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Community-based legal education and awareness</span>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Confidential counseling and mediation services</span>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-lg text-gray-700">Partnership with local leaders and authorities</span>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/IMG_5564 (1).jpg" alt="Team work" fill className="object-cover" />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">CL</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Community Leader</h4>
                  <p className="text-gray-500">Kinyinya Sector</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic leading-relaxed">"The Justice Begins at Home program has brought peace to our families. We now have the legal knowledge and tools to resolve conflicts peacefully within our homes."</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">TM</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Teen Mother</h4>
                  <p className="text-gray-500">Mama Youth Program</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic leading-relaxed">"Through the Mama Youth Empowerment program, I was able to return to school and start a small business. I now have hope for my future and my child's future."</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-3xl p-16 mb-32">
          <h2 className="text-5xl font-bold mb-12 text-gray-900 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Integrity</h3>
              <p className="text-gray-600">Upholding honesty and transparency in all our work</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Compassion</h3>
              <p className="text-gray-600">Showing empathy and care for every family we serve</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">Building strong partnerships and local engagement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Empowerment</h3>
              <p className="text-gray-600">Equipping communities with knowledge and tools</p>
            </div>
          </div>
        </div>

      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with these amazing organizations to create lasting impact in communities across Rwanda.
            </p>
          </div>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
              <Image src="/partners/partner1.jpeg" alt="Partner 1" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
              <Image src="/partners/partner2.png" alt="Partner 2" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
              <Image src="/partners/partner3.jpeg" alt="Partner 3" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
              <Image src="/partners/partner4.jpeg" alt="Partner 4" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
              <Image src="/partners/partner5.jpeg" alt="Partner 5" width={96} height={96} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
