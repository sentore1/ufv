'use client';

export default function CTASection() {
  return (
    <section className="py-24 text-white" style={{backgroundColor: '#f54a00'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Join Our Mission to Improve Nutrition, Health, and Wellbeing for Everyone
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Together, we can create sustainable solutions and transform lives through nutrition, education, and community empowerment across Rwanda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="bg-white px-8 py-3 rounded-full hover:bg-gray-100 font-semibold text-center" style={{color: '#f54a00'}}>
            Become a Volunteer
          </a>
          <a href="/donate" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 font-semibold flex items-center justify-center gap-2 transition-colors">
            Support Our Mission
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}