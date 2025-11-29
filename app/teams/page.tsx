import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function TeamsPage() {
  const teamMembers = [
    { name: "Kantengwa Marie Odette", role: "Visionary of Helping Heart Family Rwanda", image: "/team/Kantengwa Marie Odette.jpeg" },
    { name: "Rwikaza Gentil", role: "Co-Founder and Executive Director, Helping Heart Family Rwanda", image: "/team/Rwikaza Gentil.jpg" },
    { name: "Uwamahoro Diane", role: "Deputy Executive Director, Helping Heart Family Rwanda", image: "/team/Uwamahoro Diane.jpg" },
    { name: "Banamwana Yvonne", role: "General Secretary, Helping Heart Family Rwanda", image: "/team/Banamwana Yvonne.jpg" },
    { name: "UMUHOZA Ana", role: "Administration & Finance Manager, Helping Heart Family Rwanda", image: "/team/UMUHOZA Ana.png" },
    { name: "UMUHOZA Eduige", role: "Audit Committee, Helping Heart Family Rwanda", image: "/team/UMUHOZA Eduige.jpg" },
    { name: "Geofrey MUKUNDANE", role: "Audit Committee, Helping Heart Family Rwanda", image: "/team/Geofrey MUKUNDANE.jpg" },
    { name: "NIYOMUGABO Felicier", role: "Advisor, Helping Heart Family Rwanda", image: "/team/NIYOMUGABO Felicier.jpg" },
    { name: "NIYONSABA Yvette", role: "Advisor, Helping Heart Family Rwanda", image: "/team/NIYONSABA Yvette.jpg" },
    { name: "Merveille Jedidja AZABE", role: "Advisor, Helping Heart Family Rwanda", image: "/team/Merveille Jedidja AZABE.jpeg" },
    { name: "IRAKOZE Eric", role: "Conflict Resolution Committee, Helping Heart Family Rwanda", image: "/team/IRAKOZE Eric.jpg" },
    { name: "UWIMANA Jeannette", role: "Conflict Resolution Committee, Helping Heart Family Rwanda", image: "/team/UWIMANA Jeannette.jpg" },
    { name: "UWAMAHORO Blandine", role: "Conflict Resolution Committee, Helping Heart Family Rwanda", image: "/team/UWAMAHORO Blandine.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-[400px] bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Team</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Meet Our Dedicated Team</h2>
          <p className="text-xl text-gray-600">Passionate individuals working together to transform communities</p>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-orange-50 p-12 rounded-lg text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Join Our Team</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference in communities across Rwanda.
          </p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 font-semibold">
            View Opportunities
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
