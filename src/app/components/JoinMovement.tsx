import { useState } from "react";
import { CheckCircle, Users, Star } from "lucide-react";

interface JoinMovementProps {
  language: "en" | "hi";
}

const contributionAreas = [
  { id: "digital", label: "Digital Campaigning", labelHi: "डिजिटल प्रचार" },
  { id: "ground", label: "Ground Campaign", labelHi: "जमीनी अभियान" },
  { id: "events", label: "Event Management", labelHi: "कार्यक्रम प्रबंधन" },
  { id: "social", label: "Social Work", labelHi: "सामाजिक कार्य" },
  { id: "youth", label: "Youth Outreach", labelHi: "युवा संपर्क" },
  { id: "women", label: "Women Empowerment", labelHi: "महिला सशक्तिकरण" },
];

const states = ["Rajasthan", "Delhi", "Maharashtra", "Uttar Pradesh", "Gujarat", "Other"];

export function JoinMovement({ language }: JoinMovementProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", age: "", gender: "", education: "", occupation: "",
    state: "Rajasthan", district: "", block: "", village: "", pincode: "",
    whyJoin: "", concerns: "", contributions: [] as string[], ideology: "", previousWork: ""
  });

  const set = (key: string, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));

  const toggleContrib = (id: string) => {
    set("contributions", form.contributions.includes(id)
      ? form.contributions.filter((c) => c !== id)
      : [...form.contributions, id]
    );
  };

  const scoreApplicant = () => {
    let score = 0;
    if (form.contributions.length >= 3) score += 30;
    else if (form.contributions.length >= 1) score += 15;
    if (form.previousWork) score += 25;
    if (form.age && parseInt(form.age) < 35) score += 15;
    if (form.whyJoin.length > 50) score += 20;
    if (form.email) score += 10;
    return Math.min(score, 100);
  };

  const handleSubmit = () => {
    const data = { ...form, score: scoreApplicant(), timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("joiners") || "[]");
    existing.push(data);
    localStorage.setItem("joiners", JSON.stringify(existing));
    setSubmitted(true);
  };

  const t = (en: string, hi: string) => language === "hi" ? hi : en;

  if (submitted) {
    return (
      <section className="bg-[#040D1A] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/30">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h2 className="text-white mb-4">{t("Welcome to the Movement!", "आंदोलन में आपका स्वागत है!")}</h2>
          <p className="text-gray-300 text-lg mb-6">
            {t(
              `Congratulations ${form.name}! Your application has been received. Our team will contact you shortly on ${form.mobile}.`,
              `बधाई हो ${form.name}! आपका आवेदन प्राप्त हो गया है। हमारी टीम जल्द ही ${form.mobile} पर संपर्क करेगी।`
            )}
          </p>
          <div className="bg-[#0B2447] border border-[#FF6B13]/30 rounded-2xl p-6 mb-6">
            <div className="text-[#F5B301] font-bold text-lg mb-2">
              {t("Your Lead Score", "आपका लीड स्कोर")}: {scoreApplicant()}/100
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] rounded-full transition-all duration-1000" style={{ width: `${scoreApplicant()}%` }} />
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", mobile: "", email: "", age: "", gender: "", education: "", occupation: "", state: "Rajasthan", district: "", block: "", village: "", pincode: "", whyJoin: "", concerns: "", contributions: [], ideology: "", previousWork: "" }); }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold"
          >
            {t("Register Another", "और पंजीकरण करें")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {t("Join The Movement", "आंदोलन से जुड़ें")}
          </span>
          <h2 className="text-white mt-2">{t("Be Part of Change", "बदलाव का हिस्सा बनें")}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${s <= step ? "bg-[#FF6B13] text-white" : "bg-white/10 text-gray-400"}`}>
                {s < step ? <CheckCircle size={18} /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${s < step ? "bg-[#FF6B13]" : "bg-white/20"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mb-8 text-xs text-gray-400">
          <span className={step >= 1 ? "text-[#F5B301]" : ""}>{t("Personal", "व्यक्तिगत")}</span>
          <span className={step >= 2 ? "text-[#F5B301]" : ""}>{t("Location", "स्थान")}</span>
          <span className={step >= 3 ? "text-[#F5B301]" : ""}>{t("Interests", "रुचि")}</span>
        </div>

        <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-[#F5B301] mb-4">{t("Personal Information", "व्यक्तिगत जानकारी")}</h3>
              {[
                { key: "name", label: t("Full Name *", "पूरा नाम *"), type: "text", placeholder: t("Enter your full name", "अपना पूरा नाम दर्ज करें") },
                { key: "mobile", label: t("Mobile Number *", "मोबाइल नंबर *"), type: "tel", placeholder: "10-digit mobile number" },
                { key: "email", label: t("Email Address", "ईमेल पता"), type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form] as string}
                    onChange={(e) => set(field.key, e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13] transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">{t("Age", "उम्र")}</label>
                  <input type="number" min="18" max="80" placeholder="18+" value={form.age} onChange={(e) => set("age", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">{t("Gender", "लिंग")}</label>
                  <select value={form.gender} onChange={(e) => set("gender", e.target.value)}
                    className="w-full bg-[#0B2447] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B13]">
                    <option value="">{t("Select", "चुनें")}</option>
                    <option value="male">{t("Male", "पुरुष")}</option>
                    <option value="female">{t("Female", "महिला")}</option>
                    <option value="other">{t("Other", "अन्य")}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">{t("Education", "शिक्षा")}</label>
                  <select value={form.education} onChange={(e) => set("education", e.target.value)}
                    className="w-full bg-[#0B2447] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B13]">
                    <option value="">{t("Select", "चुनें")}</option>
                    {["10th", "12th", "Graduate", "Post Graduate", "PhD"].map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">{t("Occupation", "व्यवसाय")}</label>
                  <select value={form.occupation} onChange={(e) => set("occupation", e.target.value)}
                    className="w-full bg-[#0B2447] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B13]">
                    <option value="">{t("Select", "चुनें")}</option>
                    {[t("Student", "छात्र"), t("Business", "व्यवसाय"), t("Service", "नौकरी"), t("Farmer", "किसान"), t("Professional", "पेशेवर"), t("Other", "अन्य")].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => form.name && form.mobile && setStep(2)}
                disabled={!form.name || !form.mobile}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {t("Next: Location →", "अगला: स्थान →")}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#F5B301] mb-4">{t("Location Information", "स्थान की जानकारी")}</h3>
              <div>
                <label className="block text-gray-300 text-sm mb-1">{t("State", "राज्य")}</label>
                <select value={form.state} onChange={(e) => set("state", e.target.value)}
                  className="w-full bg-[#0B2447] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B13]">
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {[
                { key: "district", label: t("District *", "जिला *"), placeholder: t("Enter district", "जिला दर्ज करें") },
                { key: "block", label: t("Block / Tehsil", "ब्लॉक / तहसील"), placeholder: t("Enter block", "ब्लॉक दर्ज करें") },
                { key: "village", label: t("Village / Ward", "गाँव / वार्ड"), placeholder: t("Enter village or ward", "गाँव या वार्ड दर्ज करें") },
                { key: "pincode", label: t("Pincode", "पिनकोड"), placeholder: "6-digit pincode" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm mb-1">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form] as string}
                    onChange={(e) => set(field.key, e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]"
                  />
                </div>
              ))}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl bg-white/10 text-gray-300 font-semibold hover:bg-white/20 transition-colors">
                  ← {t("Back", "वापस")}
                </button>
                <button
                  onClick={() => form.district && setStep(3)}
                  disabled={!form.district}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold disabled:opacity-50"
                >
                  {t("Next: Interests →", "अगला: रुचि →")}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-[#F5B301] mb-4">{t("Your Political Interests", "आपकी राजनीतिक रुचि")}</h3>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t("Why do you want to join?", "आप क्यों जुड़ना चाहते हैं?")}</label>
                <textarea
                  rows={3}
                  placeholder={t("Share your motivation...", "अपनी प्रेरणा साझा करें...")}
                  value={form.whyJoin}
                  onChange={(e) => set("whyJoin", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13] resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-3">{t("Areas you want to contribute in:", "आप किन क्षेत्रों में योगदान करना चाहते हैं:")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {contributionAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleContrib(area.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        form.contributions.includes(area.id)
                          ? "bg-[#FF6B13]/20 border-[#FF6B13] text-[#F5B301]"
                          : "bg-white/5 border-white/20 text-gray-300 hover:border-[#FF6B13]/50"
                      }`}
                    >
                      {form.contributions.includes(area.id) && <CheckCircle size={14} />}
                      {language === "hi" ? area.labelHi : area.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t("Previous political/social work experience:", "पूर्व राजनीतिक/सामाजिक कार्य अनुभव:")}</label>
                <textarea
                  rows={2}
                  placeholder={t("Describe any previous work (optional)", "कोई पूर्व कार्य बताएं (वैकल्पिक)")}
                  value={form.previousWork}
                  onChange={(e) => set("previousWork", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13] resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl bg-white/10 text-gray-300 font-semibold">
                  ← {t("Back", "वापस")}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  🚀 {t("Submit Application", "आवेदन जमा करें")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: t("Direct Impact", "सीधा प्रभाव"), desc: t("Make a real difference", "वास्तविक बदलाव लाएं") },
            { icon: "🤝", title: t("Network", "नेटवर्क"), desc: t("Connect with leaders", "नेताओं से जुड़ें") },
            { icon: "⭐", title: t("Recognition", "मान्यता"), desc: t("Get recognized for work", "कार्य की मान्यता पाएं") },
          ].map((b) => (
            <div key={b.title} className="bg-[#0B2447]/60 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{b.icon}</div>
              <div className="text-[#F5B301] text-sm font-semibold">{b.title}</div>
              <div className="text-gray-400 text-xs">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
