import { useState } from "react";
import { Calendar, MapPin, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";
import { eventsData } from "../data/mockData";

interface EventsSectionProps {
  language: "en" | "hi";
  preview?: boolean;
  setCurrentPage?: (page: string) => void;
}

const typeColors: Record<string, string> = {
  Rally: "bg-red-500/20 text-red-300 border-red-500/30",
  Workshop: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Conference: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Tour: "bg-green-500/20 text-green-300 border-green-500/30",
};

export function EventsSection({ language, preview = false, setCurrentPage }: EventsSectionProps) {
  const [registered, setRegistered] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [success, setSuccess] = useState<number | null>(null);

  const displayed = preview ? eventsData.slice(0, 3) : eventsData;

  const handleRegister = (eventId: number) => {
    if (!formData.name || !formData.phone) return;
    const key = `event_registrations`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ eventId, ...formData, time: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    setRegistered((prev) => [...prev, eventId]);
    setSuccess(eventId);
    setShowForm(null);
    setFormData({ name: "", phone: "", email: "" });
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <section className={`py-20 px-4 ${preview ? "bg-[#040D1A]" : "bg-[#0B2447]/30 min-h-screen"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {language === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
          </span>
          <h2 className="text-white mt-2">
            {language === "hi" ? "कार्यक्रम एवं रैलियाँ" : "Events & Rallies"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>

        {success && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2">
            <CheckCircle size={20} />
            {language === "hi" ? "पंजीकरण सफल!" : "Registration Successful!"}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {displayed.map((event) => {
            const isRegistered = registered.includes(event.id);
            const pct = Math.round((event.registrations / event.capacity) * 100);

            return (
              <div
                key={event.id}
                className="bg-[#0B2447] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF6B13]/40 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447] to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type] || "bg-gray-500/20 text-gray-300"}`}>
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-3">
                    {language === "hi" ? event.titleHi : event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar size={14} className="text-[#FF6B13]" />
                      {new Date(event.date).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric"
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock size={14} className="text-[#FF6B13]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin size={14} className="text-[#FF6B13]" />
                      {event.venue}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Users size={14} className="text-[#FF6B13]" />
                      {event.registrations.toLocaleString()} / {event.capacity.toLocaleString()} {language === "hi" ? "पंजीकृत" : "registered"}
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6B13] to-[#F5B301] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-gray-400 text-xs mt-1">{pct}% {language === "hi" ? "भरा हुआ" : "filled"}</div>
                  </div>

                  {isRegistered ? (
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <CheckCircle size={18} />
                      {language === "hi" ? "पंजीकृत हो गए!" : "You're Registered!"}
                    </div>
                  ) : showForm === event.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder={language === "hi" ? "नाम *" : "Name *"}
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#FF6B13]"
                      />
                      <input
                        type="tel"
                        placeholder={language === "hi" ? "मोबाइल *" : "Mobile *"}
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#FF6B13]"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRegister(event.id)}
                          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-semibold text-sm"
                        >
                          {language === "hi" ? "पुष्टि करें" : "Confirm"}
                        </button>
                        <button
                          onClick={() => setShowForm(null)}
                          className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 text-sm"
                        >
                          {language === "hi" ? "रद्द" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowForm(event.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      {language === "hi" ? "पंजीकरण करें" : "Register Now"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {preview && setCurrentPage && (
          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage("events")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#FF6B13] text-[#FF6B13] font-semibold hover:bg-[#FF6B13] hover:text-white transition-all duration-300"
            >
              {language === "hi" ? "सभी कार्यक्रम देखें" : "View All Events"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
