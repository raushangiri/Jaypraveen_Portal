import { Trophy, Star, CheckCircle } from "lucide-react";
import { leaderData, achievementsData } from "../data/mockData";

interface AboutSectionProps {
  language: "en" | "hi";
}

export function AboutSection({ language }: AboutSectionProps) {
  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {language === "hi" ? "नेता का परिचय" : "About The Leader"}
          </span>
          <h2 className="text-white mt-2">
            {language === "hi" ? leaderData.nameHi : leaderData.name}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>

        {/* Leader Profile */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573871261617-cb561c240085?w=600&q=80"
                alt="Leader"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white font-bold text-xl">
                  {language === "hi" ? leaderData.nameHi : leaderData.name}
                </div>
                <div className="text-[#F5B301]">
                  {language === "hi" ? leaderData.titleHi : leaderData.title}
                </div>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-[#FF6B13] rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-[#F5B301] rounded-br-3xl" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-gradient-to-b from-[#FF6B13] to-[#F5B301] rounded-full" />
              <h3 className="text-[#F5B301]">
                {language === "hi" ? "जीवन परिचय" : "Biography"}
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {language === "hi" ? leaderData.bioHi : leaderData.bio}
            </p>

            <div className="bg-[#0B2447]/60 border border-[#FF6B13]/20 rounded-2xl p-6 mb-6">
              <h4 className="text-[#F5B301] font-semibold mb-3">
                {language === "hi" ? "हमारा विज़न" : "Our Vision"}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {language === "hi" ? leaderData.visionHi : leaderData.vision}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: language === "hi" ? "निर्वाचन क्षेत्र" : "Constituency", value: language === "hi" ? leaderData.constituencyHi : leaderData.constituency },
                { label: language === "hi" ? "पार्टी" : "Party", value: language === "hi" ? leaderData.partyHi : leaderData.party },
                { label: language === "hi" ? "अनुभव" : "Experience", value: "25+ Years" },
                { label: language === "hi" ? "शिक्षा" : "Education", value: "M.A., LL.B." },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-4">
                  <div className="text-gray-400 text-xs mb-1">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Political Journey Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-white">
              {language === "hi" ? "राजनीतिक यात्रा" : "Political Journey & Achievements"}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-2 rounded-full" />
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B13] to-[#F5B301]" />
            <div className="space-y-6">
              {achievementsData.map((item, i) => (
                <div key={i} className="relative flex gap-6 items-start pl-20">
                  <div className="absolute left-5 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Trophy size={14} className="text-white" />
                  </div>
                  <div className="bg-[#0B2447] border border-white/10 rounded-xl p-5 flex-1 hover:border-[#FF6B13]/40 transition-all">
                    <div className="text-[#F5B301] font-bold text-sm mb-1">{item.year}</div>
                    <div className="text-white">
                      {language === "hi" ? item.achievementHi : item.achievement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-white">
              {language === "hi" ? "विकास के स्तम्भ" : "Pillars of Development"}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-2 rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🎓", title: language === "hi" ? "शिक्षा" : "Education", desc: language === "hi" ? "गुणवत्तापूर्ण शिक्षा हर बच्चे का अधिकार" : "Quality education as a right for every child" },
              { icon: "🏥", title: language === "hi" ? "स्वास्थ्य" : "Healthcare", desc: language === "hi" ? "सुलभ और किफायती स्वास्थ्य सेवा" : "Accessible and affordable healthcare for all" },
              { icon: "🛣️", title: language === "hi" ? "बुनियादी ढांचा" : "Infrastructure", desc: language === "hi" ? "बेहतर सड़क, बिजली, पानी" : "Better roads, electricity and water supply" },
              { icon: "💼", title: language === "hi" ? "रोजगार" : "Employment", desc: language === "hi" ? "युवाओं के लिए रोजगार के अवसर" : "Creating employment opportunities for youth" },
              { icon: "👩‍🌾", title: language === "hi" ? "कृषि" : "Agriculture", desc: language === "hi" ? "किसानों की समृद्धि हमारी प्राथमिकता" : "Farmer prosperity is our top priority" },
              { icon: "🌿", title: language === "hi" ? "पर्यावरण" : "Environment", desc: language === "hi" ? "हरित और स्वच्छ राजनगर" : "A green and clean Rajnagar for the future" },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-[#0B2447] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B13]/40 transition-all group">
                <div className="text-4xl mb-3">{pillar.icon}</div>
                <h4 className="text-[#F5B301] font-bold mb-2 group-hover:text-[#FF6B13] transition-colors">{pillar.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
