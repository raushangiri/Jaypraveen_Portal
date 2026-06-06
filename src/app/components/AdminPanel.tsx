import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, FileText, Calendar, MessageSquare, TrendingUp, Download, LogOut } from "lucide-react";

interface AdminPanelProps {
  language: "en" | "hi";
}

const monthlyData = [
  { month: "Jan", volunteers: 320, grievances: 45, events: 2 },
  { month: "Feb", volunteers: 480, grievances: 38, events: 3 },
  { month: "Mar", volunteers: 750, grievances: 62, events: 4 },
  { month: "Apr", volunteers: 1200, grievances: 55, events: 5 },
  { month: "May", volunteers: 2100, grievances: 48, events: 6 },
  { month: "Jun", volunteers: 3200, grievances: 70, events: 4 },
];

const issueDistribution = [
  { name: "Roads", value: 32, color: "#FF6B13" },
  { name: "Water", value: 24, color: "#F5B301" },
  { name: "Electricity", value: 18, color: "#3B82F6" },
  { name: "Employment", value: 14, color: "#8B5CF6" },
  { name: "Healthcare", value: 12, color: "#10B981" },
];

const recentJoiners = [
  { name: "Ravi Kumar", village: "Naya Gaon", score: 85, date: "2026-06-05" },
  { name: "Sunita Devi", village: "Rajnagar Khas", score: 72, date: "2026-06-04" },
  { name: "Amit Sharma", village: "Barh Nala", score: 90, date: "2026-06-03" },
  { name: "Priya Singh", village: "Chandpur", score: 65, date: "2026-06-02" },
  { name: "Mohan Lal", village: "Koli Basti", score: 78, date: "2026-06-01" },
];

export function AdminPanel({ language }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState(false);

  const t = (en: string, hi: string) => language === "hi" ? hi : en;

  const login = () => {
    if (password === "admin123") {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const joiners = JSON.parse(localStorage.getItem("joiners") || "[]");
  const grievances = JSON.parse(localStorage.getItem("grievances") || "[]");
  const eventRegs = JSON.parse(localStorage.getItem("event_registrations") || "[]");

  if (!authenticated) {
    return (
      <section className="bg-[#040D1A] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center">
              <span className="text-white text-3xl">🔐</span>
            </div>
            <h2 className="text-white">{t("Admin Login", "एडमिन लॉगिन")}</h2>
            <p className="text-gray-400 text-sm mt-1">{t("Restricted access — authorized personnel only", "प्रतिबंधित पहुंच — केवल अधिकृत कर्मी")}</p>
          </div>
          <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-8">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">{t("Username", "यूज़रनेम")}</label>
              <input type="text" defaultValue="admin" readOnly
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white opacity-60" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">{t("Password", "पासवर्ड")}</label>
              <input
                type="password"
                placeholder={t("Enter password", "पासवर्ड दर्ज करें")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${error ? "border-red-500" : "border-white/20 focus:border-[#FF6B13]"}`}
              />
              {error && <p className="text-red-400 text-xs mt-1">{t("Incorrect password", "गलत पासवर्ड")}</p>}
              <p className="text-gray-500 text-xs mt-1">{t("Demo password: admin123", "डेमो पासवर्ड: admin123")}</p>
            </div>
            <button onClick={login} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B13] to-[#F5B301] text-white font-bold hover:opacity-90 transition-opacity">
              {t("Login to Dashboard", "डैशबोर्ड में प्रवेश करें")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: "dashboard", label: t("Dashboard", "डैशबोर्ड"), icon: TrendingUp },
    { id: "joiners", label: t("Joiners", "सदस्य"), icon: Users },
    { id: "grievances", label: t("Grievances", "शिकायतें"), icon: MessageSquare },
    { id: "events", label: t("Events", "कार्यक्रम"), icon: Calendar },
  ];

  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white">{t("Admin Control Panel", "प्रशासन नियंत्रण केंद्र")}</h2>
            <p className="text-gray-400 text-sm">{t("Rajendra Sharma — Political Management System", "राजेन्द्र शर्मा — राजनीतिक प्रबंधन प्रणाली")}</p>
          </div>
          <button onClick={() => setAuthenticated(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors text-sm">
            <LogOut size={16} />
            {t("Logout", "लॉगआउट")}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("Total Joiners", "कुल सदस्य"), value: (12847 + joiners.length).toLocaleString(), icon: Users, color: "from-[#FF6B13] to-orange-600" },
            { label: t("Grievances", "शिकायतें"), value: (156 + grievances.length).toString(), icon: MessageSquare, color: "from-blue-500 to-blue-700" },
            { label: t("Event Registrations", "कार्यक्रम पंजीकरण"), value: (1582 + eventRegs.length).toLocaleString(), icon: Calendar, color: "from-purple-500 to-purple-700" },
            { label: t("Survey Votes", "सर्वेक्षण वोट"), value: "25,000+", icon: FileText, color: "from-green-500 to-green-700" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0B2447] border border-white/10 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[#FF6B13] text-white" : "text-gray-300 hover:text-white"}`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4">{t("Monthly Volunteer Growth", "मासिक स्वयंसेवक वृद्धि")}</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#666" tick={{ fill: "#999", fontSize: 12 }} />
                    <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#0B2447", border: "1px solid rgba(255,107,19,0.3)", borderRadius: "8px", color: "white" }} />
                    <Line type="monotone" dataKey="volunteers" stroke="#FF6B13" strokeWidth={2.5} dot={{ fill: "#FF6B13" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4">{t("Issue Distribution", "समस्या वितरण")}</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={issueDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                      {issueDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0B2447", border: "1px solid rgba(255,107,19,0.3)", borderRadius: "8px", color: "white" }} formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {issueDistribution.map((item) => (
                    <span key={item.name} className="flex items-center gap-1 text-xs text-gray-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name} {item.value}%
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-4">{t("Monthly Activity Overview", "मासिक गतिविधि अवलोकन")}</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#666" tick={{ fill: "#999", fontSize: 12 }} />
                  <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#0B2447", border: "1px solid rgba(255,107,19,0.3)", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="grievances" fill="#F5B301" radius={[4, 4, 0, 0]} name={t("Grievances", "शिकायतें")} />
                  <Bar dataKey="events" fill="#FF6B13" radius={[4, 4, 0, 0]} name={t("Events", "कार्यक्रम")} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">{t("Recent Joiners (Sample)", "हाल के सदस्य (नमूना)")}</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {[t("Name", "नाम"), t("Village", "गाँव"), t("Score", "स्कोर"), t("Date", "तारीख")].map((h) => (
                        <th key={h} className="text-left text-gray-400 text-sm pb-3 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentJoiners.map((j) => (
                      <tr key={j.name} className="hover:bg-white/5">
                        <td className="py-3 pr-4 text-white text-sm">{j.name}</td>
                        <td className="py-3 pr-4 text-gray-300 text-sm">{j.village}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${j.score >= 80 ? "bg-green-500/20 text-green-400" : j.score >= 60 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                            {j.score}/100
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 text-sm">{new Date(j.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {joiners.slice(-3).map((j: any, i: number) => (
                      <tr key={i} className="hover:bg-white/5">
                        <td className="py-3 pr-4 text-white text-sm">{j.name} <span className="text-green-400 text-xs">(New)</span></td>
                        <td className="py-3 pr-4 text-gray-300 text-sm">{j.village || j.district}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${j.score >= 80 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {j.score}/100
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 text-sm">{new Date(j.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "joiners" && (
          <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-semibold">{t("All Joiners", "सभी सदस्य")} ({joiners.length + 12847})</h4>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B13]/20 text-[#FF6B13] text-sm font-medium hover:bg-[#FF6B13]/30">
                <Download size={14} />
                {t("Export CSV", "CSV डाउनलोड")}
              </button>
            </div>
            {joiners.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {t("No new registrations yet. Go to 'Join Us' to register.", "'जुड़ें' अनुभाग में जाकर पंजीकरण करें।")}
              </div>
            ) : (
              <div className="space-y-3">
                {joiners.map((j: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 flex flex-wrap gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold">{j.name}</div>
                      <div className="text-gray-400 text-sm">{j.mobile} • {j.email}</div>
                      <div className="text-gray-400 text-sm">{j.district}, {j.state}</div>
                    </div>
                    <div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${j.score >= 80 ? "bg-green-500/20 text-green-400" : j.score >= 60 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                        Score: {j.score}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "grievances" && (
          <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4">{t("All Grievances", "सभी शिकायतें")} ({grievances.length + 156})</h4>
            {grievances.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {t("No new grievances submitted. Go to 'Citizen Voice' to submit one.", "'नागरिक आवाज़' में जाकर शिकायत दर्ज करें।")}
              </div>
            ) : (
              <div className="space-y-3">
                {grievances.map((g: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white font-medium">{g.title}</div>
                        <div className="text-gray-400 text-sm">{g.name} • {g.mobile} • {g.village}</div>
                        <div className="text-gray-500 text-xs font-mono mt-1">{g.id}</div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">{t("Pending", "लंबित")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "events" && (
          <div className="bg-[#0B2447] border border-white/10 rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4">{t("Event Registrations", "कार्यक्रम पंजीकरण")} ({eventRegs.length + 1582})</h4>
            {eventRegs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {t("No event registrations yet.", "अभी तक कोई कार्यक्रम पंजीकरण नहीं।")}
              </div>
            ) : (
              <div className="space-y-2">
                {eventRegs.map((r: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                      <span className="text-white text-sm font-medium">{r.name}</span>
                      <span className="text-gray-400 text-sm ml-3">{r.phone}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{t("Event", "कार्यक्रम")} #{r.eventId}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
