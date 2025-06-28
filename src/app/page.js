"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import LogoParticlesCanvas from "./components/LogoParticles";
export default function Home() {
  const keywords = [
    "Mental Health",
    "Career Growth",
    "Clean Beauty",
    "Pharmacy",
    "Trans Medicine",
    "Inclusion",
    "Governance",
  ];
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [loading,setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="absolute w-full min-h-screen flex items-center justify-center text-white">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FBEAEA] z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500" />
        </div>
      )}
      <BackgroundGradientAnimation className="w-full flex flex-col items-center justify-center px-4 py-12 md:py-24 pb-24  max-h-screen sm:overflow-visible">
        {/* Hero Content */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          {/* <Image
            src="/logo.png"
            alt="SpeaktoMegh Logo"
            width={120}
            height={120}
            className="md:mb-4 sm:mb-0"
          /> */}
          <LogoParticlesCanvas />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Mental Health, Reimagined
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl italic mb-2">
            Because your story deserves more than a diagnosis.
          </p>

          <p className="text-xs sm:text-sm md:text-md mb-6 text-gray-300">
            Vasudhaiva Kutumbakam — the world is one family
          </p>

          {/* Floating Keywords */}
          <div className="text-base sm:text-lg font-semibold text-emerald-300 mb-6">
            {keywords[currentKeyword]}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            <button className="bg-pink-600 hover:bg-pink-500 px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base shadow-lg transition">
              Start Your Journey
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base shadow-lg transition">
              Book a Session
            </button>
            <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base shadow-lg transition">
              View My Ventures
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-400 px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base text-black font-semibold shadow transition">
              Explore Resources
            </button>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </main>
  );
}
