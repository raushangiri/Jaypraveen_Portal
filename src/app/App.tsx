import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { NewsSection } from "./components/NewsSection";
import { EventsSection } from "./components/EventsSection";
import { AboutSection } from "./components/AboutSection";
import { GallerySection } from "./components/GallerySection";
import { JoinMovement } from "./components/JoinMovement";
import { CitizenVoice } from "./components/CitizenVoice";
import { SurveySection } from "./components/SurveySection";
import { AdminPanel } from "./components/AdminPanel";
import { AIChat } from "./components/AIChat";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [language, setLanguage] = useState<"en" | "hi">("en");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#040D1A]" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigate}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Page-specific top padding for non-home pages */}
      <main className={currentPage !== "home" ? "pt-20" : ""}>
        {currentPage === "home" && (
          <>
            <HeroSection language={language} setCurrentPage={navigate} />
            <StatsSection language={language} />
            <NewsSection language={language} preview setCurrentPage={navigate} />
            <EventsSection language={language} preview setCurrentPage={navigate} />

            {/* Minister Meetings Teaser */}
            <section className="py-20 px-4 bg-[#0B2447]/30">
              <div className="max-w-6xl mx-auto text-center">
                <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
                  {language === "hi" ? "उच्च स्तरीय संपर्क" : "High-Level Contacts"}
                </span>
                <h2 className="text-white mt-2 mb-3">
                  {language === "hi" ? "मंत्रियों के साथ मुलाकातें" : "Meetings With Ministers"}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mb-4 rounded-full" />
                <p className="text-gray-400 max-w-xl mx-auto mb-10">
                  {language === "hi"
                    ? "हमारे नेता ने केंद्रीय और राज्य मंत्रियों के साथ नियमित बैठकें कर राजनगर के लिए ऐतिहासिक विकास कार्य सुनिश्चित किए हैं।"
                    : "Our leader has secured landmark development commitments for Rajnagar through regular meetings with Union and State Ministers."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                  {[
                    { emoji: "🚂", label: language === "hi" ? "रेल मंत्री" : "Railway Min.", outcome: language === "hi" ? "नई रेल लाइन" : "New Rail Line" },
                    { emoji: "🏛️", label: language === "hi" ? "मुख्यमंत्री" : "Chief Minister", outcome: language === "hi" ? "₹120 करोड़" : "₹120 Crore" },
                    { emoji: "📚", label: language === "hi" ? "शिक्षा मंत्री" : "Education Min.", outcome: language === "hi" ? "5 नए स्कूल" : "5 New Schools" },
                    { emoji: "🏥", label: language === "hi" ? "स्वास्थ्य मंत्री" : "Health Min.", outcome: language === "hi" ? "200 बेड अस्पताल" : "200-Bed Hospital" },
                    { emoji: "🛣️", label: language === "hi" ? "ग्रामीण विकास" : "Rural Dev. Min.", outcome: language === "hi" ? "₹85 करोड़" : "₹85 Crore" },
                    { emoji: "🌾", label: language === "hi" ? "कृषि मंत्री" : "Agriculture Min.", outcome: language === "hi" ? "बीमा विस्तार" : "Insurance Exp." },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0B2447] border border-white/10 rounded-xl p-4 hover:border-[#FF6B13]/40 transition-all">
                      <div className="text-3xl mb-2">{item.emoji}</div>
                      <div className="text-gray-300 text-xs font-medium">{item.label}</div>
                      <div className="text-[#F5B301] text-xs mt-1 font-semibold">{item.outcome}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("gallery")}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#FF6B13] text-[#FF6B13] font-semibold hover:bg-[#FF6B13] hover:text-white transition-all duration-300"
                >
                  {language === "hi" ? "सभी मुलाकातें देखें" : "View All Meetings"} →
                </button>
              </div>
            </section>

            {/* Join CTA Banner */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#FF6B13] via-[#FF8C00] to-[#F5B301] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 800 }}>
                  {language === "hi" ? "बदलाव का हिस्सा बनें!" : "Be Part of the Change!"}
                </h2>
                <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                  {language === "hi"
                    ? "12,000+ स्वयंसेवकों के साथ मिलकर राजनगर को एक बेहतर कल की ओर ले जाएं।"
                    : "Join 12,000+ volunteers in building a better tomorrow for Rajnagar. Every action counts."}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => navigate("join")}
                    className="px-10 py-4 rounded-full bg-white text-[#FF6B13] font-extrabold text-lg hover:bg-white/90 transition-colors shadow-xl"
                  >
                    🤝 {language === "hi" ? "अभी जुड़ें" : "Join Now"}
                  </button>
                  <button
                    onClick={() => navigate("voice")}
                    className="px-10 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-colors"
                  >
                    📢 {language === "hi" ? "शिकायत दर्ज करें" : "Report Issue"}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === "about" && <AboutSection language={language} />}
        {currentPage === "news" && <NewsSection language={language} />}
        {currentPage === "gallery" && <GallerySection language={language} />}
        {currentPage === "events" && <EventsSection language={language} />}
        {currentPage === "join" && <JoinMovement language={language} />}
        {currentPage === "voice" && <CitizenVoice language={language} />}
        {currentPage === "survey" && <SurveySection language={language} />}
        {currentPage === "admin" && <AdminPanel language={language} />}
      </main>

      <Footer language={language} setCurrentPage={navigate} />

      {/* Floating AI Chat */}
      <AIChat language={language} />
    </div>
  );
}
