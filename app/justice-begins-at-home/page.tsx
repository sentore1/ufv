import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function JusticeBeginsAtHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/IMG_5911 (1).jpg" alt="Justice Begins at Home" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Justice Begins at Home</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              This initiative aims to promote justice, accountability, and nonviolence within families by increasing legal awareness, strengthening peaceful dialogue, and reinforcing the role of parents and leaders in protecting children.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/IMG_5929 (1).jpg" alt="Challenge" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-orange-600 mb-4">The Challenge</h2>
                <p className="text-gray-700 mb-4">In our work across different Districts, we have seen the everyday struggles families face:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Family conflict and domestic violence</li>
                  <li>Child neglect and abuse</li>
                  <li>School dropouts and children going to the streets</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/IMG_5911 (1).jpg" alt="Strategies" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Key Strategies</h2>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Community-Based Legal Education</strong> - Inteko z'Abaturage forums</li>
                  <li><strong>Confidential Counseling & Mediation</strong> for families in conflict</li>
                  <li><strong>Partnering with Community Leaders</strong> to strengthen accountability</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-500 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Impact So Far</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold mb-2">106</div>
                <p>Families supported to resolve conflicts in Kinyinya Sector</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold mb-2">125K+</div>
                <p>People reached through legal awareness campaigns</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold mb-2">500+</div>
                <p>Local leaders trained on GBV and evidence handling</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold mb-2">15</div>
                <p>Secondary schools reached on GBV prevention</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/contact" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Get Involved
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
