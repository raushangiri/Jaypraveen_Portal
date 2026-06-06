import { useState } from "react";
import { CheckCircle, BarChart3 } from "lucide-react";
import { surveysData } from "../data/mockData";

interface SurveySectionProps {
  language: "en" | "hi";
}

export function SurveySection({ language }: SurveySectionProps) {
  const [surveys, setSurveys] = useState(surveysData);
  const [voted, setVoted] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const t = (en: string, hi: string) => language === "hi" ? hi : en;

  const handleVote = (surveyId: number, optionId: string) => {
    if (voted[surveyId]) return;
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === surveyId
          ? {
              ...s,
              totalVotes: s.totalVotes + 1,
              options: s.options.map((o) =>
                o.id === optionId ? { ...o, votes: o.votes + 1 } : o
              ),
            }
          : s
      )
    );
    setVoted((p) => ({ ...p, [surveyId]: optionId }));
    setShowResults((p) => ({ ...p, [surveyId]: true }));
  };

  const getPercent = (votes: number, total: number) => Math.round((votes / total) * 100);

  const colors = ["bg-[#FF6B13]", "bg-[#F5B301]", "bg-blue-500", "bg-purple-500", "bg-green-500"];

  return (
    <section className="bg-[#040D1A] min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {t("Opinion Polls", "जनमत सर्वेक्षण")}
          </span>
          <h2 className="text-white mt-2">
            {t("Your Voice Matters", "आपकी आवाज़ मायने रखती है")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 mt-3">
            {t("Participate in our surveys and help shape the development agenda for Rajnagar.", "हमारे सर्वेक्षणों में भाग लें और राजनगर के विकास एजेंडे को आकार देने में मदद करें।")}
          </p>
        </div>

        <div className="space-y-8">
          {surveys.map((survey) => {
            const hasVoted = !!voted[survey.id];
            const showingResults = showResults[survey.id];
            const topOption = [...survey.options].sort((a, b) => b.votes - a.votes)[0];

            return (
              <div key={survey.id} className="bg-[#0B2447] border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#FF6B13]/20 to-transparent border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 size={16} className="text-[#FF6B13]" />
                    <span className="text-[#FF6B13] text-xs font-semibold uppercase">{t("Live Poll", "लाइव पोल")}</span>
                  </div>
                  <h3 className="text-white">
                    {language === "hi" ? survey.questionHi : survey.question}
                  </h3>
                  <div className="text-gray-400 text-sm mt-1">
                    {survey.totalVotes.toLocaleString()} {t("votes so far", "वोट अब तक")}
                  </div>
                </div>

                {/* Options */}
                <div className="p-6 space-y-3">
                  {survey.options.map((option, i) => {
                    const pct = getPercent(option.votes, survey.totalVotes);
                    const isMyVote = voted[survey.id] === option.id;
                    const isTop = option.id === topOption.id && showingResults;

                    return (
                      <div key={option.id}>
                        {!showingResults ? (
                          <button
                            onClick={() => handleVote(survey.id, option.id)}
                            disabled={hasVoted}
                            className="w-full text-left px-5 py-3.5 rounded-xl border border-white/20 text-white hover:border-[#FF6B13]/60 hover:bg-[#FF6B13]/10 transition-all disabled:cursor-not-allowed font-medium"
                          >
                            <span className="text-[#F5B301] mr-3">{option.id.toUpperCase()}.</span>
                            {language === "hi" ? option.labelHi : option.label}
                          </button>
                        ) : (
                          <div className={`rounded-xl border px-5 py-3 transition-all ${isMyVote ? "border-[#FF6B13]/60 bg-[#FF6B13]/10" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-sm font-medium flex items-center gap-2">
                                {isMyVote && <CheckCircle size={14} className="text-[#FF6B13]" />}
                                <span className="text-[#F5B301] mr-1">{option.id.toUpperCase()}.</span>
                                {language === "hi" ? option.labelHi : option.label}
                              </span>
                              <span className="text-white font-bold">{pct}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${isTop ? "bg-gradient-to-r from-[#FF6B13] to-[#F5B301]" : colors[i % colors.length]}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="text-gray-400 text-xs mt-1">{option.votes.toLocaleString()} {t("votes", "वोट")}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 pb-5">
                  {hasVoted ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle size={16} />
                        {t("Your vote has been recorded", "आपका वोट दर्ज हो गया")}
                      </div>
                      <button
                        onClick={() => setShowResults((p) => ({ ...p, [survey.id]: !p[survey.id] }))}
                        className="text-[#FF6B13] text-sm hover:underline"
                      >
                        {showingResults ? t("Hide Results", "परिणाम छुपाएं") : t("Show Results", "परिणाम देखें")}
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs text-center">
                      {t("Click an option to cast your vote", "वोट देने के लिए किसी विकल्प पर क्लिक करें")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics Summary */}
        <div className="mt-10 bg-[#0B2447] border border-[#FF6B13]/20 rounded-2xl p-6">
          <h3 className="text-white mb-4">{t("Survey Analytics Overview", "सर्वेक्षण विश्लेषण")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t("Total Responses", "कुल प्रतिक्रियाएं"), value: "25,000+" },
              { label: t("Districts Covered", "जिले कवर"), value: "8" },
              { label: t("Active Surveys", "सक्रिय सर्वेक्षण"), value: "2" },
              { label: t("Insights Generated", "इनसाइट्स"), value: "15+" },
            ].map((item) => (
              <div key={item.label} className="text-center bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#F5B301]">{item.value}</div>
                <div className="text-gray-400 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
