import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function GalleryPage() {
  const galleryImages = [
    { src: "/gallery5 (1).jpg", alt: "Community event" },
    { src: "/gallery6 (1).jpg", alt: "Program activity" },
    { src: "/gallery7 (1).jpg", alt: "Youth empowerment" },
    { src: "/gallery8 (1).jpg", alt: "Education support" },
    { src: "/IMG_5563 (1).jpg", alt: "Community work" },
    { src: "/IMG_5564 (1).jpg", alt: "Team collaboration" },
    { src: "/IMG_5892 (1).jpg", alt: "Justice program" },
    { src: "/IMG_5911 (1).jpg", alt: "Youth support" },
    { src: "/IMG_5929 (1).jpg", alt: "Mentorship" },
    { src: "/IMG_5939 (1).jpg", alt: "Community gathering" },
    { src: "/IMG_5963 (1).jpg", alt: "Nutrition program" },
    { src: "/IMG_5966 (1).jpg", alt: "Impact work" },
    { src: "/IMG_6242-1 (1).jpg", alt: "GBV prevention" },
    { src: "/IMG_4186 (1).jpg", alt: "Field work" },
    { src: "/IMG_4746 (1).jpg", alt: "Community outreach" },
    { src: "/IMG_4752-scaled (1).jpg", alt: "Program implementation" },
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
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
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
