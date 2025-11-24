import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-6">Support Our Mission</h1>
          <p className="text-2xl text-white/95 max-w-3xl">Your donation helps transform lives across Rwanda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Donation Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-32">
          
          {/* Mobile Money */}
          <div className="bg-gray-50 p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Mobile Money (Rwanda)</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm">
                <Image src="/MTN-Rwanda-MoMo-Logo-2 (1).jpg" alt="MTN Mobile Money" width={80} height={80} className="rounded-xl" />
                <div>
                  <p className="font-semibold text-gray-800 text-lg mb-2">MTN Mobile Money</p>
                  <p className="text-3xl font-bold text-orange-600 mb-1">*182*8*1#</p>
                  <p className="text-sm text-gray-600">Business Code: [Your Code]</p>
                </div>
              </div>
              <div className="bg-orange-100 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-2">How to Donate:</h4>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Dial *182*8*1# on your MTN phone</li>
                  <li>Select "Send Money"</li>
                  <li>Enter our business number</li>
                  <li>Enter amount and confirm</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="bg-gray-50 p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Bank Transfer</h3>
            <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                <p className="font-bold text-xl text-gray-900">Bank of Kigali</p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-1">Account Name</p>
                <p className="font-bold text-xl text-gray-900">Helping Heart Family Rwanda</p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-1">Account Number</p>
                <p className="font-bold text-xl text-gray-900">[Your Account Number]</p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-1">Swift Code</p>
                <p className="font-bold text-xl text-gray-900">BKIGRWRW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-32">
          <h3 className="text-5xl font-bold mb-12 text-center text-gray-900">Your Impact</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <p className="font-bold text-4xl mb-3 text-orange-600">$50</p>
              <p className="text-gray-700 text-lg">Provides school materials for 5 children</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              </div>
              <p className="font-bold text-4xl mb-3 text-orange-600">$100</p>
              <p className="text-gray-700 text-lg">Supports family counseling sessions</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
              </div>
              <p className="font-bold text-4xl mb-3 text-orange-600">$200</p>
              <p className="text-gray-700 text-lg">Establishes a kitchen garden for nutrition</p>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/IMG_5966 (1).jpg" alt="Community impact" fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-8 text-gray-900">Why Your Support Matters</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Direct Impact</h4>
                  <p className="text-gray-600 text-lg">100% of your donation goes directly to programs that transform lives</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Transparency</h4>
                  <p className="text-gray-600 text-lg">Regular updates on how your contribution is making a difference</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">Community-Led</h4>
                  <p className="text-gray-600 text-lg">Supporting local solutions that create sustainable change</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-16 text-center text-white shadow-2xl">
          <h3 className="text-5xl font-bold mb-6">Together, We Build Stronger Communities</h3>
          <p className="text-2xl mb-8 max-w-3xl mx-auto">
            Every contribution, no matter the size, helps us create lasting change in the lives of families across Rwanda.
          </p>
          <p className="text-xl italic">Thank you for your generosity and support!</p>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
