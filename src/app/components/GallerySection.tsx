import { useState } from "react";
import { X, ExternalLink, Calendar, MapPin, CheckCircle } from "lucide-react";
import { ministerMeetingsData } from "../data/mockData";

interface GallerySectionProps {
  language: "en" | "hi";
}

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1633050745530-8f9f0b7a132e?w=600&q=80", caption: "Meeting with Union Minister", captionHi: "केंद्रीय मंत्री के साथ बैठक", category: "Ministers" },
  { src: "https://images.unsplash.com/photo-1592820186056-dc600b8ddff4?w=600&q=80", caption: "State Level Conference", captionHi: "राज्य स्तरीय सम्मेलन", category: "Meetings" },
  { src: "https://images.unsplash.com/photo-1713001075225-8c490e800e29?w=600&q=80", caption: "Jan Sampark Rally", captionHi: "जन संपर्क रैली", category: "Rallies" },
  { src: "https://images.unsplash.com/photo-1715351151262-6b1e1cee2318?w=600&q=80", caption: "Public Meeting Rajnagar", captionHi: "राजनगर जनसभा", category: "Rallies" },
  { src: "https://images.unsplash.com/photo-1585146437117-c62c9d7966a7?w=600&q=80", caption: "Education Minister Meeting", captionHi: "शिक्षा मंत्री से मुलाकात", category: "Ministers" },
  { src: "https://images.unsplash.com/photo-1651471238978-cf62e8aeb45e?w=600&q=80", caption: "Health Minister Discussion", captionHi: "स्वास्थ्य मंत्री से चर्चा", category: "Ministers" },
  { src: "https://images.unsplash.com/photo-1759738098462-90ffac98c554?w=600&q=80", caption: "Village Development Visit", captionHi: "ग्राम विकास यात्रा", category: "Development" },
  { src: "https://images.unsplash.com/photo-1759738101500-6d8d522b2681?w=600&q=80", caption: "Women Empowerment Program", captionHi: "महिला सशक्तिकरण कार्यक्रम", category: "Programs" },
  { src: "https://images.unsplash.com/photo-1760872645513-63b6846ce3c9?w=600&q=80", caption: "Road Inauguration Ceremony", captionHi: "सड़क उद्घाटन समारोह", category: "Development" },
  { src: "https://images.unsplash.com/photo-1723957712786-1536e701b389?w=600&q=80", caption: "Field Inspection Tour", captionHi: "क्षेत्र निरीक्षण दौरा", category: "Development" },
  { src: "https://images.unsplash.com/photo-1632261811725-4697edf73a48?w=600&q=80", caption: "Party Workers Meeting", captionHi: "पार्टी कार्यकर्ता बैठक", category: "Meetings" },
  { src: "https://images.unsplash.com/photo-1573871261617-cb561c240085?w=600&q=80", caption: "Press Conference", captionHi: "प्रेस वार्ता", category: "Media" },
];

const categories = ["All", "Ministers", "Rallies", "Meetings", "Development", "Programs", "Media"];

export function GallerySection({ language }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryImages[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"gallery" | "ministers">("gallery");

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((g) => g.category === activeCategory);

  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {language === "hi" ? "मीडिया गैलरी" : "Media Gallery"}
          </span>
          <h2 className="text-white mt-2">
            {language === "hi" ? "फोटो गैलरी" : "Photo Gallery"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "gallery" ? "bg-[#FF6B13] text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            📸 {language === "hi" ? "फोटो गैलरी" : "Photo Gallery"}
          </button>
          <button
            onClick={() => setActiveTab("ministers")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "ministers" ? "bg-[#FF6B13] text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            🤝 {language === "hi" ? "मंत्री बैठकें" : "Minister Meetings"}
          </button>
        </div>

        {activeTab === "gallery" ? (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat ? "bg-[#FF6B13] text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(img)}
                  className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0B2447]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {language === "hi" ? img.captionHi : img.caption}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-[#FF6B13] flex items-center justify-center">
                      <ExternalLink size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Minister Meetings Tab */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministerMeetingsData.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-[#0B2447] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF6B13]/40 transition-all duration-300 group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={meeting.image}
                    alt={meeting.ministerName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447] via-[#0B2447]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-white font-bold">
                      {language === "hi" ? meeting.ministerNameHi : meeting.ministerName}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Calendar size={12} className="text-[#FF6B13]" />
                    {new Date(meeting.date).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                    <MapPin size={12} className="text-[#FF6B13] ml-2" />
                    {meeting.location}
                  </div>
                  <div className="text-gray-300 text-sm mb-3 font-medium">
                    📋 {language === "hi" ? meeting.purposeHi : meeting.purpose}
                  </div>
                  <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-2.5">
                    <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-300 text-xs font-medium">
                      {language === "hi" ? "परिणाम: " : "Outcome: "}{meeting.outcome}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src.replace("w=600", "w=1200")}
              alt={lightbox.caption}
              className="w-full rounded-2xl"
            />
            <p className="text-white text-center mt-4 text-lg">
              {language === "hi" ? lightbox.captionHi : lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
