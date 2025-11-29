import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function TumurereYize() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/education (1).jpg" alt="Tumurere Yize Program" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Tumurere Yize Program</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Helping Heart Family Rwanda, we believe that education is not a choice but a necessity, and that no child should be left behind. This is why we launched the Tumurere Yize Program, meaning "Let us raise them to learn."
            </p>
            <p className="text-gray-700 leading-relaxed">
              The initiative provides educational support to children who are often forgotten—those from extremely poor families, orphans, children with disabilities, and street-connected children.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/education (1).jpg" alt="Educational Support" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                <p className="text-gray-700">Children received educational support</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/IMG_6242-1.jpg" alt="Family Reunification" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">60</div>
                <p className="text-gray-700">Children reunited with families</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/education (1).jpg" alt="Library" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">1</div>
                <p className="text-gray-700">Open library established in Huye District</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/donate" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mr-4">
              Support Education
            </a>
            <a href="/contact" className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
