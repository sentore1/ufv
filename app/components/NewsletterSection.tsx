export default function NewsletterSection() {
  return (
    <section className="py-12 text-white" style={{background: 'linear-gradient(to right, #f76e2f, #fec415)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Get the latest updates on our programs, impact stories, and ways to get involved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold">
              Subscribe →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}