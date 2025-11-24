export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-xl text-gray-600">Hear from community members whose lives have been transformed</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold">CL</span>
              </div>
              <div>
                <h4 className="font-semibold">Community Leader</h4>
                <p className="text-gray-500 text-sm">Kinyinya Sector</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"The Justice Begins at Home program has brought peace to our families. We now have the legal knowledge and tools to resolve conflicts peacefully within our homes."</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-yellow-600 font-bold">TM</span>
              </div>
              <div>
                <h4 className="font-semibold">Teen Mother</h4>
                <p className="text-gray-500 text-sm">Mama Youth Program</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"Through the Mama Youth Empowerment program, I was able to return to school and start a small business. I now have hope for my future and my child's future."</p>
          </div>
        </div>
      </div>
    </section>
  );
}