import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function KuraNezaMwana() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/IMG_3588.jpg" alt="Kura Neza Mwana Program" fill className="object-cover" />
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
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/healthcare (1).jpg" alt="Nutrition Education" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">Nutrition Education</h3>
                <p className="text-gray-700">Empowering parents with knowledge about proper nutrition and healthy feeding practices for their children.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/IMG_3588.jpg" alt="Community Support" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">Community Support</h3>
                <p className="text-gray-700">Building strong community networks to support families and ensure every child has access to nutritious food.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/contact" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mr-4">
              Join This Program
            </a>
            <a href="/donate" className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Support Nutrition
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
