import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function KuraNezaMwana() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/program/Kura neza Mwana program/Kuraneza 1.JPG" alt="Kura Neza Mwana Program" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Kura Neza Mwana Program</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Kura Neza Mwana is a community-based initiative designed to prevent and reduce child malnutrition by empowering parents and strengthening household nutrition practices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through education, support, and community engagement, we help families understand the importance of proper nutrition and provide them with the tools and knowledge to ensure their children grow up healthy and strong.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Program in Action</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">See how we're making a difference in child nutrition and community health</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/program/Kura neza Mwana program/Kuraneza 2.JPG" alt="Nutrition Education" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                </div>
              </div>
              
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/program/Kura neza Mwana program/Kuraneza 3.JPG" alt="Community Support" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                </div>
              </div>
              
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/program/Kura neza Mwana program/Kuraneza 4.JPG" alt="Child Health Monitoring" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                </div>
              </div>
              
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/program/Kura neza Mwana program/Kuraneza 5.JPG" alt="Family Nutrition Training" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="mb-6 text-orange-100">Help us ensure every child in Rwanda grows up healthy and well-nourished</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg">
                Join This Program
              </a>
              <a href="/donate" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Support Nutrition
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
