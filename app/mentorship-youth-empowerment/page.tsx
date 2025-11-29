import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function MentorshipYouthEmpowerment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-96">
        <Image src="/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  1.JPG" alt="Mentorship and Youth Empowerment" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">Mentorship and Youth Empowerment</h1>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At Helping Heart Family Rwanda, we believe that empowered youth are key to building stronger, safer, and more just communities. Our Mentorship and Youth Empowerment Program equips young people with the knowledge, skills, and confidence they need to become leaders, changemakers, and protectors of children's rights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  2.JPG" alt="Mentorship" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">What We Offer</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Personal development and leadership training</li>
                  <li>• Life skills and community service guidance</li>
                  <li>• Gender equality and GBV prevention workshops</li>
                  <li>• Legal awareness and mental health support</li>
                  <li>• Digital skills and entrepreneurship training</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src="/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  3.JPG" alt="Impact" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">Our Impact</h3>
                <p className="text-gray-700 leading-relaxed">
                  By giving young people the right tools and supportive guidance, we help them take responsibility in their communities, become role models, and inspire others to make positive change. Youth are not only beneficiaries, but active contributors to building inclusive, informed, and empowered communities across Rwanda.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/contact" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mr-4">
              Join as Mentor
            </a>
            <a href="/donate" className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Support Youth
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
