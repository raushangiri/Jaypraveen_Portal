import { useState } from "react";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import { newsData } from "../data/mockData";

interface NewsSectionProps {
  language: "en" | "hi";
  preview?: boolean;
  setCurrentPage?: (page: string) => void;
}

const categoryColors: Record<string, string> = {
  Development: "bg-blue-500/20 text-blue-300",
  Political: "bg-purple-500/20 text-purple-300",
  Employment: "bg-green-500/20 text-green-300",
  Healthcare: "bg-red-500/20 text-red-300",
  Education: "bg-yellow-500/20 text-yellow-300",
  Infrastructure: "bg-orange-500/20 text-orange-300",
};

export function NewsSection({ language, preview = false, setCurrentPage }: NewsSectionProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(newsData.map((n) => n.category)))];
  const displayed = preview ? newsData.slice(0, 3) : newsData;
  const filtered = displayed.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const title = language === "hi" ? n.titleHi : n.title;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className={`py-20 px-4 ${preview ? "bg-[#0B2447]/50" : "bg-[#040D1A]"} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {language === "hi" ? "ताज़ा खबरें" : "Latest News"}
          </span>
          <h2 className="text-white mt-2">
            {language === "hi" ? "समाचार एवं अपडेट" : "News & Updates"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>

        {/* Filters (full page only) */}
        {!preview && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === "hi" ? "खबर खोजें..." : "Search news..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B13]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#FF6B13] text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((news) => (
            <div
              key={news.id}
              className="bg-[#0B2447]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF6B13]/40 hover:transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[news.category] || "bg-gray-500/20 text-gray-300"}`}>
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={12} />
                  {new Date(news.date).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </div>
                <h3 className="text-white font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-[#F5B301] transition-colors">
                  {language === "hi" ? news.titleHi : news.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {language === "hi" ? news.summaryHi : news.summary}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {news.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-[#FF6B13] bg-[#FF6B13]/10 px-2 py-0.5 rounded-full">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {preview && setCurrentPage && (
          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage("news")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#FF6B13] text-[#FF6B13] font-semibold hover:bg-[#FF6B13] hover:text-white transition-all duration-300"
            >
              {language === "hi" ? "सभी समाचार देखें" : "View All News"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
