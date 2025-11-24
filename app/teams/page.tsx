import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function TeamsPage() {
  const teamMembers = [
    { name: "Niyomugabo Felicien", image: "/team/niyomugabofelicien (1).jpg" },
    { name: "Mukundane Geoffrey", image: "/team/mukundanegeoffrey (1).jpg" },
    { name: "Irakoza Eric", image: "/team/irakozeeric (1).jpg" },
    { name: "Nsengimana Emmanuel", image: "/team/nsengaemmanuel (1).jpeg" },
    { name: "Nsanzimana Andre", image: "/team/nsanzimanaandre (1).jpg" },
    { name: "Bishakwe Sarno", image: "/team/bishakwesarno (1).jpg" },
    { name: "Niyonkuru Elysee", image: "/team/niyonkuruelysee (1).jpg" },
    { name: "Kayumba Yvette", image: "/team/kayumbayvette (1).jpg" },
    { name: "Mbabazi Jeanne", image: "/team/mbabazijeanne (1).jpg" },
    { name: "Umuhoza Eduige", image: "/team/umuhozaeduige (1).jpg" },
    { name: "Azabe Merveille", image: "/team/azabemerveille (1).jpg" },
    { name: "Bahontaganira Winny", image: "/team/bahontaganirawinny (1).jpg" },
    { name: "Akaliza Laullete Annely", image: "/team/akalizalaulletteannely (1).jpg" },
    { name: "Namukasa Jamirah", image: "/team/namukasajamirah (1).jpg" },
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
