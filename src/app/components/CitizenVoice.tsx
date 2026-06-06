import { useState } from "react";
import { CheckCircle, Send, Clock, AlertCircle } from "lucide-react";
import { grievanceCategories } from "../data/mockData";

interface CitizenVoiceProps {
  language: "en" | "hi";
}

const mockGrievances = [
  { id: "GRV-2024-001", category: "roads", status: "resolved", title: "Pothole on Main Road", titleHi: "मुख्य सड़क पर गड्ढा", date: "2026-05-10", statusDate: "2026-05-20" },
  { id: "GRV-2024-002", category: "water", status: "in-progress", title: "No water supply for 3 days", titleHi: "3 दिन से पानी नहीं", date: "2026-05-28", statusDate: "2026-06-01" },
  { id: "GRV-2024-003", category: "electricity", status: "pending", title: "Street light not working", titleHi: "स्ट्रीट लाइट काम नहीं कर रही", date: "2026-06-02", statusDate: null },
];

const statusConfig = {
  pending: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30", icon: Clock, label: "Pending", labelHi: "लंबित" },
  "in-progress": { color: "text-blue-400 bg-blue-400/10 border-blue-400/30", icon: AlertCircle, label: "In Progress", labelHi: "प्रगति में" },
  resolved: { color: "text-green-400 bg-green-400/10 border-green-400/30", icon: CheckCircle, label: "Resolved", labelHi: "हल हुआ" },
};

export function CitizenVoice({ language }: CitizenVoiceProps) {
  const [activeTab, setActiveTab] = useState<"submit" | "track">("submit");
  const [form, setForm] = useState({ name: "", mobile: "", category: "", title: "", description: "", village: "" });
  const [submitted, setSubmitted] = useState(false);
  const [grievanceId, setGrievanceId] = useState("");
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<typeof mockGrievances[0] | null | "not-found">(null);

  const t = (en: string, hi: string) => language === "hi" ? hi : en;

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.category || !form.title) return;
    const id = `GRV-${Date.now()}`;
    const data = { ...form, id, status: "pending", timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("grievances") || "[]");
    existing.push(data);
    localStorage.setItem("grievances", JSON.stringify(existing));
    setGrievanceId(id);
    setSubmitted(true);
  };

  const handleTrack = () => {
    const found = mockGrievances.find((g) => g.id === trackId.trim());
    setTrackResult(found || "not-found");
  };

  if (submitted) {
    return (
      <section className="bg-[#040D1A] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h2 className="text-white mb-4">{t("Grievance Submitted!", "शिकायत दर्ज हो गई!")}</h2>
          <p className="text-gray-300 mb-4">
            {t("Your grievance has been received and will be addressed by our team within 7 working days.", "आपकी शिकायत प्राप्त हो गई है और हमारी टीम 7 कार्य दिवसों के भीतर इसका समाधान करेगी।")}
          </p>
          <div className="bg-[#0B2447] border border-[#FF6B13]/30 rounded-2xl p-6 mb-6">
            <div className="text-gray-400 text-sm mb-1">{t("Your Grievance ID:", "आपकी शिकायत आईडी:")}</div>
            <div className="text-[#F5B301] font-bold text-2xl font-mono">{grievanceId}</div>
            <div className="text-gray-400 text-xs mt-2">{t("Save this for tracking", "ट्रैकिंग के लिए इसे सुरक्षित रखें")}</div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", category: "", title: "", description: "", village: "" }); }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold"
          >
            {t("Submit Another", "और शिकायत दर्ज करें")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {t("Citizen Voice", "नागरिक आवाज़")}
          </span>
          <h2 className="text-white mt-2">
            {t("Your Problems, Our Priority", "आपकी समस्या, हमारी प्राथमिकता")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 mt-3">
            {t("Submit your grievances, suggestions, and development requests directly to MLA Rajendra Sharma's office.", "अपनी शिकायतें, सुझाव और विकास संबंधी मांगें सीधे विधायक राजेन्द्र शर्मा के कार्यालय में भेजें।")}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === "submit" ? "bg-[#FF6B13] text-white" : "text-gray-300"}`}
          >
            📝 {t("Submit Grievance", "शिकायत दर्ज करें")}
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === "track" ? "bg-[#FF6B13] text-white" : "text-gray-300"}`}
          >
            🔍 {t("Track Status", "स्थिति ट्रैक करें")}
          </button>
        </div>

        {activeTab === "submit" ? (
          <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-8">
            <div className="space-y-5">
              {/* Categories */}
              <div>
                <label className="block text-gray-300 text-sm mb-3">{t("Category *", "श्रेणी *")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {grievanceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setForm((p) => ({ ...p, category: cat.id }))}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                        form.category === cat.id
                          ? "bg-[#FF6B13]/20 border-[#FF6B13] text-[#F5B301]"
                          : "bg-white/5 border-white/20 text-gray-300 hover:border-[#FF6B13]/40"
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-xs text-center">{language === "hi" ? cat.labelHi : cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: t("Your Name *", "आपका नाम *"), type: "text", placeholder: t("Full name", "पूरा नाम") },
                  { key: "mobile", label: t("Mobile Number *", "मोबाइल *"), type: "tel", placeholder: "10-digit number" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-gray-300 text-sm mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">{t("Village / Area", "गाँव / क्षेत्र")}</label>
                <input type="text" placeholder={t("Your village or area name", "आपके गाँव या क्षेत्र का नाम")} value={form.village} onChange={(e) => setForm((p) => ({ ...p, village: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">{t("Brief Title *", "संक्षिप्त शीर्षक *")}</label>
                <input type="text" placeholder={t("Describe the issue in one line", "एक पंक्ति में समस्या बताएं")} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">{t("Detailed Description", "विस्तृत विवरण")}</label>
                <textarea rows={4} placeholder={t("Describe your issue in detail...", "अपनी समस्या विस्तार से बताएं...")} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13] resize-none" />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.mobile || !form.category || !form.title}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
                {t("Submit Grievance", "शिकायत जमा करें")}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-8">
              <h3 className="text-white mb-4">{t("Track Your Grievance", "अपनी शिकायत ट्रैक करें")}</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={t("Enter Grievance ID (e.g., GRV-2024-001)", "शिकायत आईडी दर्ज करें")}
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]"
                />
                <button onClick={handleTrack} className="px-6 py-3 rounded-xl bg-[#FF6B13] text-white font-semibold hover:opacity-90">
                  {t("Track", "ट्रैक")}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">{t("Try: GRV-2024-001 or GRV-2024-002", "आज़माएं: GRV-2024-001 या GRV-2024-002")}</p>

              {trackResult && trackResult !== "not-found" && (() => {
                const s = statusConfig[trackResult.status as keyof typeof statusConfig];
                const StatusIcon = s.icon;
                const cat = grievanceCategories.find((c) => c.id === trackResult.category);
                return (
                  <div className="mt-6 bg-white/5 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[#F5B301] font-mono text-sm mb-1">{trackResult.id}</div>
                        <div className="text-white font-semibold">{language === "hi" ? trackResult.titleHi : trackResult.title}</div>
                        <div className="text-gray-400 text-sm mt-1">
                          {cat?.icon} {language === "hi" ? cat?.labelHi : cat?.label}
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${s.color}`}>
                        <StatusIcon size={14} />
                        {language === "hi" ? s.labelHi : s.label}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t("Submitted:", "दर्ज:")} {new Date(trackResult.date).toLocaleDateString()}
                      {trackResult.statusDate && ` • ${t("Last updated:", "अंतिम अपडेट:")} ${new Date(trackResult.statusDate).toLocaleDateString()}`}
                    </div>
                  </div>
                );
              })()}

              {trackResult === "not-found" && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
                  {t("No grievance found with this ID. Please check the ID and try again.", "इस आईडी से कोई शिकायत नहीं मिली। कृपया आईडी जांचें और पुनः प्रयास करें।")}
                </div>
              )}
            </div>

            {/* Recent Grievances */}
            <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-4">{t("Recent Grievances (Sample)", "हाल की शिकायतें (नमूना)")}</h4>
              <div className="space-y-3">
                {mockGrievances.map((g) => {
                  const s = statusConfig[g.status as keyof typeof statusConfig];
                  const StatusIcon = s.icon;
                  const cat = grievanceCategories.find((c) => c.id === g.category);
                  return (
                    <div key={g.id} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <div>
                        <div className="text-white text-sm font-medium">{language === "hi" ? g.titleHi : g.title}</div>
                        <div className="text-gray-400 text-xs">{g.id} • {cat?.icon} {language === "hi" ? cat?.labelHi : cat?.label}</div>
                      </div>
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${s.color}`}>
                        <StatusIcon size={12} />
                        {language === "hi" ? s.labelHi : s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
