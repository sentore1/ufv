import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-2">Get in Touch</h2>
          <div className="w-16 h-1 mx-auto mb-6" style={{backgroundColor: '#f54a00'}}></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Contact Info with Image */}
          <div className="text-white rounded-2xl overflow-hidden relative min-h-[600px] flex flex-col justify-end" style={{backgroundColor: '#f54a00'}}>
            <Image
              src="/IMG_4186.jpg"
              alt="Contact Us"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 via-orange-500/50 to-transparent"></div>
            
            <div className="relative p-8 space-y-4 z-10">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>+250788977568</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>hezainitiative@gmail.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>Rulindo, Rwanda</span>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 mt-6 border border-white/30 backdrop-blur-md">
                <h3 className="text-lg font-semibold mb-3 text-white">Office Hours</h3>
                <div className="space-y-1 text-sm text-white/90">
                  <p>Monday - Friday: 9:00 - 17:00</p>
                  <p>Saturday: 9:00 - 13:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-black">Send Us A Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500"
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none placeholder:text-gray-500"
              ></textarea>
              <button
                type="submit"
                className="w-full text-white py-4 rounded-lg font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{backgroundColor: '#f54a00'}}
              >
                Send Message
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}