import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { leaderData } from "../data/mockData";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}

const navItems = [
  { id: "home", label: "Home", labelHi: "होम" },
  { id: "about", label: "About", labelHi: "परिचय" },
  { id: "news", label: "News", labelHi: "समाचार" },
  { id: "gallery", label: "Gallery", labelHi: "गैलरी" },
  { id: "events", label: "Events", labelHi: "कार्यक्रम" },
  { id: "join", label: "Join Us", labelHi: "जुड़ें" },
  { id: "voice", label: "Citizen Voice", labelHi: "नागरिक आवाज़" },
  { id: "survey", label: "Survey", labelHi: "सर्वेक्षण" },
  { id: "admin", label: "Admin", labelHi: "एडमिन" },
];

export function Navbar({ currentPage, setCurrentPage, language, setLanguage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLabel = (item: typeof navItems[0]) =>
    language === "hi" ? item.labelHi : item.label;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B2447]/95 backdrop-blur-md border-b border-[#FF6B13]/30 shadow-lg">
      {/* Top strip - party branding */}
      <div className="bg-gradient-to-r from-[#FF6B13] via-[#FF8C00] to-[#F5B301] py-1 px-4 text-center">
        <span className="text-white text-xs font-semibold tracking-widest uppercase">
          {language === "hi" ? leaderData.partyHi : leaderData.party} &nbsp;|&nbsp; {language === "hi" ? leaderData.tagline : leaderData.taglineEn}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Leader Name */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center text-white font-bold text-lg shadow-md">
              R
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">
                {language === "hi" ? "रामचंद्र मंडल" : "Ramchandra Mandal"}
              </div>
              <div className="text-[#F5B301] text-xs">
                {language === "hi" ? leaderData.constituencyHi : leaderData.constituency}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-[#FF6B13] text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {navLabel(item)}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF6B13]/50 text-[#F5B301] hover:bg-[#FF6B13]/20 transition-all text-sm font-medium"
            >
              <Globe size={14} />
              {language === "en" ? "हिंदी" : "English"}
            </button>

            {/* Join CTA */}
            <button
              onClick={() => setCurrentPage("join")}
              className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md"
            >
              {language === "hi" ? "जुड़ें" : "Join Now"}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-1"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B2447] border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? "bg-[#FF6B13] text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {navLabel(item)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
