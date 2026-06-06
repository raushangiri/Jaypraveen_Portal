import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Play, Users, Star, ArrowRight } from "lucide-react";
import { leaderData } from "../data/mockData";

interface HeroSectionProps {
  language: "en" | "hi";
  setCurrentPage: (page: string) => void;
}

const slides = [
  {
    bg: "https://images.unsplash.com/photo-1713001075225-8c490e800e29?w=1920&q=80",
    overlayColor: "from-[#0B2447]/90 via-[#0B2447]/70 to-transparent"
  },
  {
    bg: "https://images.unsplash.com/photo-1715351151262-6b1e1cee2318?w=1920&q=80",
    overlayColor: "from-[#0B2447]/85 via-[#0B2447]/65 to-transparent"
  },
  {
    bg: "https://images.unsplash.com/photo-1760872645513-63b6846ce3c9?w=1920&q=80",
    overlayColor: "from-[#0B2447]/90 via-[#0B2447]/70 to-transparent"
  }
];

export function HeroSection({ language, setCurrentPage }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.bg}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`} />
        </div>
      ))}

      {/* Indian flag color strips (decorative) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B13] via-white to-[#138808] opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#138808] via-white to-[#FF6B13] opacity-70" />

      {/* Decorative Circle */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 rounded-full bg-[#FF6B13]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#F5B301]/5 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Party Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B13]/20 border border-[#FF6B13]/40 text-[#F5B301] text-sm font-medium mb-6"
          >
            <Star size={14} fill="currentColor" />
            {language === "hi" ? leaderData.partyHi : leaderData.party}
            <Star size={14} fill="currentColor" />
          </motion.div>

          {/* Leader Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-3"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {language === "hi" ? "श्री रामचंद्र" : "Shree Ramchandra"}
            <br />
            <span className="bg-gradient-to-r from-[#FF6B13] to-[#F5B301] bg-clip-text text-transparent">
              {language === "hi" ? "मंडल" : "Mandal"}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#F5B301] font-semibold mb-2"
          >
            {language === "hi" ? leaderData.titleHi : leaderData.title}
            {" • "}
            {language === "hi" ? leaderData.constituencyHi : leaderData.constituency}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl text-white/90 font-bold tracking-wider mb-6"
          >
            {language === "hi" ? leaderData.tagline : leaderData.taglineEn}
          </motion.p>

          {/* Vision */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/75 text-lg leading-relaxed mb-10 max-w-2xl"
          >
            {language === "hi" ? leaderData.visionHi : leaderData.vision}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => setCurrentPage("join")}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold text-lg shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300"
            >
              <Users size={20} />
              {language === "hi" ? "आंदोलन से जुड़ें" : "Join The Movement"}
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              {language === "hi" ? "परिचय देखें" : "Know More"}
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Quick Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 flex flex-wrap gap-6"
          >
            {[
              { num: "25+", label: language === "hi" ? "वर्षों की सेवा" : "Years of Service" },
              { num: "12K+", label: language === "hi" ? "स्वयंसेवक" : "Volunteers" },
              { num: "218", label: language === "hi" ? "गाँव" : "Villages" },
              { num: "1.85L+", label: language === "hi" ? "नागरिक" : "Citizens" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-[#F5B301]">{s.num}</div>
                <div className="text-white/70 text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-[#FF6B13]" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </div>
  );
}
