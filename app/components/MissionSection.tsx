import Image from "next/image";
import Link from "next/link";

export default function MissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">WHO WE ARE</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Transforming Ideas into Reality</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              <Image
                src="/Picture1 (2).png"
                alt="Community empowerment"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold">Our Mission</h4>
                <p className="text-sm opacity-90">Empowering communities through advocacy, education, and action</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                To promote and protect the rights of children, women, and families in Rwanda by empowering communities through advocacy, education, and action.
              </p>
            </div>
          </Link>
          <Link href="/about" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 relative overflow-hidden">
              <Image
                src="/Picture4 (1).png"
                alt="Educational support"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold">Our Vision</h4>
                <p className="text-sm opacity-90">Rights of children equally provided and respected</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                To have a community where the rights of children are equally provided and respected.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}