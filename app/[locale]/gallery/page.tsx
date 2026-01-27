import Image from "next/image";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function GalleryPage() {
  const galleryImages = [
    { src: "/ufvimages/3.jpg", alt: "Community Impact" },
    { src: "/ufvimages/4.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/5.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/6.jpg", alt: "Community Outreach" },
    { src: "/ufvimages/7.jpg", alt: "Skills Development" },
    { src: "/ufvimages/8.jpg", alt: "Leadership Training" },
    { src: "/ufvimages/9.jpg", alt: "Community Support" },
    { src: "/ufvimages/10.jpg", alt: "Program Activities" },
    { src: "/ufvimages/11.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/12.jpg", alt: "Community Development" },
    { src: "/ufvimages/13.jpg", alt: "Educational Support" },
    { src: "/ufvimages/14.jpg", alt: "Empowerment Programs" },
    { src: "/ufvimages/15.jpg", alt: "Community Building" },
    { src: "/ufvimages/16.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/17.jpg", alt: "Skills Training" },
    { src: "/ufvimages/18.jpg", alt: "Community Impact" },
    { src: "/ufvimages/19.jpg", alt: "Program Success" },
    { src: "/ufvimages/20.jpg", alt: "Youth Development" },
    { src: "/ufvimages/21.jpg", alt: "Community Engagement" },
    { src: "/ufvimages/22.jpg", alt: "Educational Excellence" },
    { src: "/ufvimages/23.jpg", alt: "Community Programs" },
    { src: "/ufvimages/234.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/24.jpg", alt: "Skills Development" },
    { src: "/ufvimages/25.jpg", alt: "Community Support" },
    { src: "/ufvimages/26.jpg", alt: "Educational Impact" },
    { src: "/ufvimages/27.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/272907029_5183836148313305_5060671334956589346_n.jpg", alt: "Community Event" },
    { src: "/ufvimages/28.jpg", alt: "Program Success" },
    { src: "/ufvimages/29.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/2r32r32r32r.jpg", alt: "Community Outreach" },
    { src: "/ufvimages/30.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/31.jpg", alt: "Skills Training" },
    { src: "/ufvimages/32.jpg", alt: "Community Development" },
    { src: "/ufvimages/32234243.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/33.jpg", alt: "Program Impact" },
    { src: "/ufvimages/34.jpg", alt: "Community Building" },
    { src: "/ufvimages/35.jpg", alt: "Educational Support" },
    { src: "/ufvimages/36.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/37.jpg", alt: "Community Programs" },
    { src: "/ufvimages/38.jpg", alt: "Skills Development" },
    { src: "/ufvimages/39.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/40.jpg", alt: "Community Impact" },
    { src: "/ufvimages/41.jpg", alt: "Educational Excellence" },
    { src: "/ufvimages/42.jpg", alt: "Program Success" },
    { src: "/ufvimages/42424.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/42424dwd.jpg", alt: "Community Support" },
    { src: "/ufvimages/424w.jpg", alt: "Skills Training" },
    { src: "/ufvimages/424weee.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/43.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/4324.jpg", alt: "Community Development" },
    { src: "/ufvimages/44.jpg", alt: "Program Impact" },
    { src: "/ufvimages/45.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/46.jpg", alt: "Community Building" },
    { src: "/ufvimages/47.jpg", alt: "Educational Support" },
    { src: "/ufvimages/48.jpg", alt: "Skills Development" },
    { src: "/ufvimages/49.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/50.jpg", alt: "Community Programs" },
    { src: "/ufvimages/51.jpg", alt: "Program Success" },
    { src: "/ufvimages/52.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/53.jpg", alt: "Community Impact" },
    { src: "/ufvimages/54.jpg", alt: "Educational Excellence" },
    { src: "/ufvimages/55.jpg", alt: "Skills Training" },
    { src: "/ufvimages/56.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/57.jpg", alt: "Community Support" },
    { src: "/ufvimages/58.jpg", alt: "Program Impact" },
    { src: "/ufvimages/59.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/60.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/61.jpg", alt: "Community Development" },
    { src: "/ufvimages/62.jpg", alt: "Skills Development" },
    { src: "/ufvimages/63.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/64.jpg", alt: "Community Building" },
    { src: "/ufvimages/65.jpg", alt: "Program Success" },
    { src: "/ufvimages/66.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/67.jpg", alt: "Educational Support" },
    { src: "/ufvimages/68.jpg", alt: "Community Programs" },
    { src: "/ufvimages/69.jpg", alt: "Skills Training" },
    { src: "/ufvimages/70.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/71.jpg", alt: "Community Impact" },
    { src: "/ufvimages/72.jpg", alt: "Program Impact" },
    { src: "/ufvimages/73.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/74.jpg", alt: "Educational Excellence" },
    { src: "/ufvimages/75.jpg", alt: "Community Support" },
    { src: "/ufvimages/76.jpg", alt: "Skills Development" },
    { src: "/ufvimages/77.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/78.jpg", alt: "Community Development" },
    { src: "/ufvimages/79.jpg", alt: "Program Success" },
    { src: "/ufvimages/80.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/81.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/82.jpg", alt: "Community Building" },
    { src: "/ufvimages/83.jpg", alt: "Skills Training" },
    { src: "/ufvimages/84.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/85.jpg", alt: "Community Programs" },
    { src: "/ufvimages/86.jpg", alt: "Program Impact" },
    { src: "/ufvimages/87.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/88.jpg", alt: "Educational Support" },
    { src: "/ufvimages/bxbrtre.jpg", alt: "Community Event" },
    { src: "/ufvimages/caca.jpg", alt: "Youth Programs" },
    { src: "/ufvimages/ctetet.jpg", alt: "Skills Development" },
    { src: "/ufvimages/daaa.jpg", alt: "Community Impact" },
    { src: "/ufvimages/ewrewr.jpg", alt: "Youth Empowerment" },
    { src: "/ufvimages/gsgsg.jpg", alt: "Educational Programs" },
    { src: "/ufvimages/herhr.jpg", alt: "Community Support" },
    { src: "/ufvimages/retetet.jpg", alt: "Program Success" },
    { src: "/ufvimages/rqrqrq.jpg", alt: "Youth Leadership" },
    { src: "/ufvimages/rqrqrqra.jpg", alt: "Community Development" },
    { src: "/ufvimages/rwqrqr.jpg", alt: "Skills Training" },
    { src: "/ufvimages/sbsbber.jpg", alt: "Youth Activities" },
    { src: "/ufvimages/tqtqt.jpg", alt: "Educational Excellence" },
    { src: "/ufvimages/tqtqtwqt.jpg", alt: "Community Programs" },
    { src: "/ufvimages/tqtvda.jpg", alt: "Program Impact" },
    { src: "/ufvimages/vavaewrrewrr.jpg", alt: "Youth Engagement" },
    { src: "/ufvimages/vxv.jpg", alt: "Community Building" },
    { src: "/ufvimages/wgv.jpg", alt: "Skills Development" },
    { src: "/ufvimages/wgwgwgw.jpg", alt: "Youth Empowerment" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-green-800 via-green-900 to-green-950 overflow-hidden">
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
