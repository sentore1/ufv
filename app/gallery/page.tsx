import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function GalleryPage() {
  const galleryImages = [
    // Justice Begins at Home
    { src: "/program/Justice Begans at Home pictures/Justice Begans at Home pictures 1.jpg", alt: "Justice Begins at Home - Community Education" },
    { src: "/program/Justice Begans at Home pictures/Justice Begans at Home pictures 2.JPG", alt: "Justice Begins at Home - Legal Awareness" },
    { src: "/program/Justice Begans at Home pictures/Justice Begans at Home pictures 3.jpg", alt: "Justice Begins at Home - Family Mediation" },
    { src: "/program/Justice Begans at Home pictures/Justice Begans at Home pictures 4.JPG", alt: "Justice Begins at Home - Community Leaders" },
    
    // Tumurere Yize Program
    { src: "/program/Tumurere Yize Program pictures/Tumurere Yize Program 1.jpg", alt: "Tumurere Yize - Educational Support" },
    { src: "/program/Tumurere Yize Program pictures/Tumurere Yize Program 2.JPG", alt: "Tumurere Yize - Children Learning" },
    { src: "/program/Tumurere Yize Program pictures/Tumurere Yize Program3.JPG", alt: "Tumurere Yize - School Materials" },
    { src: "/program/Tumurere Yize Program pictures/Tumurere Yize Program 4.JPG", alt: "Tumurere Yize - Library Activities" },
    
    // Mama Youth Empowerment
    { src: "/program/Mama youth empowerment pictures/mama youth 1.JPG", alt: "Mama Youth Empowerment - Teen Mothers Support" },
    { src: "/program/Mama youth empowerment pictures/mama youth 2.JPG", alt: "Mama Youth Empowerment - Skills Training" },
    { src: "/program/Mama youth empowerment pictures/IMG_5928.JPG", alt: "Mama Youth Empowerment - Peer Support" },
    
    // Mentorship and Youth Empowerment
    { src: "/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  1.JPG", alt: "Mentorship - Youth Leadership" },
    { src: "/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  2.JPG", alt: "Mentorship - Community Service" },
    { src: "/program/Mentorship and Youth empowerment/Mentorship and Youth Empowerment  3.JPG", alt: "Mentorship - Skills Development" },
    
    // Kura Neza Mwana
    { src: "/program/Kura neza Mwana program/Kuraneza 1.JPG", alt: "Kura Neza Mwana - Nutrition Education" },
    { src: "/program/Kura neza Mwana program/Kuraneza 2.JPG", alt: "Kura Neza Mwana - Community Health" },
    { src: "/program/Kura neza Mwana program/Kuraneza 3.JPG", alt: "Kura Neza Mwana - Child Care" },
    
    // Drug Prevention
    { src: "/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 1.JPG", alt: "Drug Prevention - Awareness Campaign" },
    { src: "/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 2.JPG", alt: "Drug Prevention - Youth Engagement" },
    { src: "/program/Drug Prevention and Reintegration Program/5. Drug Prevention and Reintegration Program 3.JPG", alt: "Drug Prevention - Community Outreach" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Capturing moments of transformation and hope across Rwanda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative h-96 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 text-lg font-semibold">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
