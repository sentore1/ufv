import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function MamaYouthEmpowerment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/program/Mama youth empowerment pictures/mama youth 1.JPG" alt="Mama Youth Empowerment" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Mama Youth Empowerment</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">New Life Beginning</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Helping Heart Family Rwanda, we believe that becoming a mother at a young age is not the end of life—it can be a new beginning. Many teenage mothers face judgment, rejection, and hopelessness, but we stand with them.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We advocate for their legal rights, help them return to school, and support them to start small businesses, so they can earn a living and take care of their children.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/program/Mama youth empowerment pictures/mama youth 2.JPG" alt="Counseling Support" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">45</div>
                <p className="text-gray-700">Teenage mothers received counseling and mentorship</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/program/Mama youth empowerment pictures/IMG_5928.JPG" alt="School Reintegration" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">10</div>
                <p className="text-gray-700">Young mothers reintegrated into school</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/financial-assistance-scaled.jpg" alt="Business Support" fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">25</div>
                <p className="text-gray-700">Beneficiaries supported to start businesses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-500 rounded-xl shadow-lg p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Peer Support Group</h3>
            <p className="text-center text-lg">We established a supportive Itsinda where members meet regularly to learn about Sexual and Reproductive Health and Rights (SRHR), share experiences, and build stronger support networks.</p>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/donate" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mr-4">
              Support Teen Mothers
            </a>
            <a href="/contact" className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Get Involved
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
