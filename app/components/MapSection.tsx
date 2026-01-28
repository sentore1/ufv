"use client";

import Image from "next/image";
import { useState } from "react";

export default function MapSection() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    { id: 1, name: "Rwanda", x: "58%", y: "52%", info: "Our operational area in Rwanda" },
  ];

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          <div className="bg-[#1f4f3f] text-white p-10 rounded-lg space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Our Support Umbrella for Vulnerable
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              ACFH is deeply grateful for the organizations and individuals who stand with us. Their unwavering support makes our work possible and our impact stronger, allowing us to extend our reach and deepen our commitment to those in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-white text-[#1f4f3f] px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-sm lg:text-base">
                LEARN MORE
              </button>
              <button className="border-2 border-white text-white px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1f4f3f] transition text-sm lg:text-base">
                JOIN US NOW
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center px-8 relative">
            <div className="relative w-full max-w-sm">
              <Image
                src="/ufvimages/map.png"
                alt="Map showing our locations"
                width={400}
                height={350}
                className="w-full"
              />
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.name)}
                  className="absolute w-4 h-4 bg-[#1f4f3f] rounded-full border-2 border-white shadow-lg hover:scale-150 transition-transform cursor-pointer"
                  style={{ left: location.x, top: location.y, transform: "translate(-50%, -50%)" }}
                  title={location.name}
                />
              ))}
              {selectedLocation && (
                <div className="absolute top-0 left-0 bg-white p-4 rounded-lg shadow-xl z-10">
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <h4 className="font-bold text-lg mb-2">{selectedLocation}</h4>
                  <p className="text-sm text-gray-600">
                    {locations.find((l) => l.name === selectedLocation)?.info}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-10 shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              We believe in the power of community engagement to drive positive change. 🇳🇱🇷🇼
            </h3>
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
              That's why we work closely with local leaders, healthcare providers, and community members to ensure that our programs are responsive to the needs of the people we serve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
