import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { leaderData } from "../data/mockData";

interface FooterProps {
  language: "en" | "hi";
  setCurrentPage: (page: string) => void;
}

export function Footer({ language, setCurrentPage }: FooterProps) {
  const t = (en: string, hi: string) => language === "hi" ? hi : en;

  const quickLinks = [
    { id: "home", label: t("Home", "होम") },
    { id: "about", label: t("About Leader", "नेता परिचय") },
    { id: "news", label: t("News & Updates", "समाचार") },
    { id: "gallery", label: t("Photo Gallery", "फोटो गैलरी") },
    { id: "events", label: t("Events", "कार्यक्रम") },
    { id: "join", label: t("Join Movement", "आंदोलन से जुड़ें") },
    { id: "voice", label: t("Citizen Voice", "नागरिक आवाज़") },
    { id: "survey", label: t("Opinion Survey", "जनमत सर्वेक्षण") },
  ];

  return (
    <footer className="bg-[#040D1A] border-t border-white/10">
      {/* Indian flag strip */}
      <div className="h-1 bg-gradient-to-r from-[#FF6B13] via-white to-[#138808]" />

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">
                  {t("Ram Chandra Mandal", "राम चंद्र मंडल")}
                </div>
                <div className="text-[#F5B301] text-xs">
                  {t("Founder of Vanchit Kranti Dal", "वंचित क्रांति दल के संस्थापक")}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t(
                "Dedicated to the development, welfare, and empowerment of every citizen of Darbhanga constituency.",
                "दरभंगा विधानसभा के प्रत्येक नागरिक के विकास, कल्याण और सशक्तिकरण के लिए समर्पित।"
              )}
            </p>
            <div className="text-[#F5B301] font-bold text-lg">{leaderData.tagline}</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("Quick Links", "त्वरित लिंक")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="text-gray-400 hover:text-[#FF6B13] text-sm transition-colors text-left"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("Contact Us", "हमसे संपर्क करें")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-[#FF6B13] mt-0.5 flex-shrink-0" />
                <span>{leaderData.address}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-[#FF6B13]" />
                <a href={`tel:${leaderData.phone}`} className="hover:text-[#FF6B13] transition-colors">{leaderData.phone}</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-[#FF6B13]" />
                <a href={`mailto:${leaderData.email}`} className="hover:text-[#FF6B13] transition-colors">{leaderData.email}</a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-5">
              <h5 className="text-gray-300 text-sm font-medium mb-3">{t("Follow Us", "हमें फॉलो करें")}</h5>
              <div className="flex gap-2">
                {[
                  { icon: "📘", label: "Facebook" },
                  { icon: "🐦", label: "Twitter/X" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "▶️", label: "YouTube" },
                  { icon: "💬", label: "WhatsApp" },
                ].map((s) => (
                  <button
                    key={s.label}
                    title={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF6B13]/20 flex items-center justify-center transition-colors text-base"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("Get Involved", "जुड़ें")}</h4>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage("join")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold hover:opacity-90 transition-opacity text-sm"
              >
                🤝 {t("Join The Movement", "आंदोलन से जुड़ें")}
              </button>
              <button
                onClick={() => setCurrentPage("voice")}
                className="w-full py-3 rounded-xl border border-[#FF6B13]/40 text-[#FF6B13] font-bold hover:bg-[#FF6B13]/10 transition-colors text-sm"
              >
                📢 {t("Submit Grievance", "शिकायत दर्ज करें")}
              </button>
              <button
                onClick={() => setCurrentPage("survey")}
                className="w-full py-3 rounded-xl border border-white/20 text-gray-300 font-bold hover:bg-white/10 transition-colors text-sm"
              >
                📊 {t("Take Survey", "सर्वेक्षण में भाग लें")}
              </button>
            </div>

            {/* Newsletter */}
            <div className="mt-5">
              <div className="text-gray-300 text-sm font-medium mb-2">{t("Subscribe to Updates", "अपडेट की सदस्यता")}</div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("Your email", "आपका ईमेल")}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]"
                />
                <button className="px-3 py-2 rounded-lg bg-[#FF6B13] text-white text-xs font-semibold hover:opacity-90">
                  {t("Go", "जाएं")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
          <span>© 2026 {t("Rajendra Kumar Sharma. All rights reserved.", "राजेन्द्र कुमार शर्मा। सर्वाधिकार सुरक्षित।")}</span>
          <span className="flex items-center gap-1">
            {t("Official Digital Platform", "आधिकारिक डिजिटल प्लेटफॉर्म")}
            <span className="text-[#FF6B13]">•</span>
            {t("Vanchit Kranti Dal", "वंचित क्रांति दल")}
          </span>
        </div>
      </div>
    </footer>
  );
}
