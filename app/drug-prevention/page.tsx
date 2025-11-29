import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function DrugPrevention() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 1.JPG" alt="Drug Prevention and Reintegration" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Drug Prevention and Reintegration</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At Helping Heart Family Rwanda, our Drug Prevention and Reintegration Program is designed to protect young people from the dangers of drug abuse while supporting those already affected to rebuild their lives. The program focuses on awareness, early intervention, and rehabilitation support to help youth overcome addiction and reintegrate into society as productive members of their communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Awareness</h3>
              <p className="text-gray-700">Educating youth about the dangers of drug abuse</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Early Intervention</h3>
              <p className="text-gray-700">Identifying and supporting at-risk youth</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rehabilitation</h3>
              <p className="text-gray-700">Supporting recovery and reintegration</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Program Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src="/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 2.JPG" alt="Drug Prevention Activities" fill className="object-cover" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src="/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 3.JPG" alt="Youth Engagement" fill className="object-cover" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src="/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 4.JPG" alt="Community Outreach" fill className="object-cover" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src="/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 5.JPG" alt="Rehabilitation Support" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/contact" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mr-4">
              Get Help
            </a>
            <a href="/donate" className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Support This Program
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
