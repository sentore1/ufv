import Link from "next/link";

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">Our Impact</h2>
          <p className="text-2xl text-white/95 max-w-3xl mx-auto">
            Through our dedicated programs and community initiatives, we're making a significant impact in communities across Rwanda.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-xs text-white/90">Children Supported in Education</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">26K+</div>
            <div className="text-xs text-white/90">People Empowered Through Legal Awareness on GBV</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-xs text-white/90">Local Leaders Empowered with GBV Knowledge</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">60</div>
            <div className="text-xs text-white/90">Children Reunited with Families from the Street</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">45</div>
            <div className="text-xs text-white/90">Teen Mothers Supported in Education</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">20</div>
            <div className="text-xs text-white/90">Families Supported to Start Small Businesses</div>
          </div>
        </div>
      </div>
    </section>
  );
}
