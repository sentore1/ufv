import Link from "next/link";

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">Our Impact</h2>
          <p className="text-2xl text-white/95 max-w-3xl mx-auto mb-8">
            Through our dedicated programs and community initiatives, we're making a significant impact in communities across Rwanda.
          </p>
          <Link href="/impact" className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all">
            View Full Impact Report →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2">106</div>
            <div className="text-base text-white/90">Families Supported</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-base text-white/90">Leaders Trained</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2">160</div>
            <div className="text-base text-white/90">Youth Rehabilitated</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2">45</div>
            <div className="text-base text-white/90">Teen Mothers Supported</div>
          </div>
        </div>
      </div>
    </section>
  );
}
