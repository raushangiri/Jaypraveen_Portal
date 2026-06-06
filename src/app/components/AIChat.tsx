import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { aiChatResponses } from "../data/mockData";

interface AIChatProps {
  language: "en" | "hi";
}

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickQuestions = [
  { label: "About Leader", labelHi: "नेता के बारे में", key: "about" },
  { label: "Events", labelHi: "कार्यक्रम", key: "events" },
  { label: "Join Us", labelHi: "जुड़ें", key: "join" },
  { label: "Development", labelHi: "विकास", key: "development" },
  { label: "Grievance", labelHi: "शिकायत", key: "grievance" },
  { label: "Contact", labelHi: "संपर्क", key: "contact" },
];

function getResponse(input: string, language: "en" | "hi"): string {
  const lower = input.toLowerCase();
  const key = Object.keys(aiChatResponses).find((k) =>
    lower.includes(k) ||
    (k === "about" && (lower.includes("who") || lower.includes("biography") || lower.includes("परिचय"))) ||
    (k === "events" && (lower.includes("event") || lower.includes("कार्यक्रम") || lower.includes("rally"))) ||
    (k === "join" && (lower.includes("join") || lower.includes("volunteer") || lower.includes("जुड़"))) ||
    (k === "grievance" && (lower.includes("complaint") || lower.includes("problem") || lower.includes("शिकायत"))) ||
    (k === "development" && (lower.includes("development") || lower.includes("road") || lower.includes("विकास"))) ||
    (k === "contact" && (lower.includes("contact") || lower.includes("phone") || lower.includes("संपर्क")))
  );
  const resp = aiChatResponses[key || "default"];
  return language === "hi" ? resp.hi : resp.en;
}

export function AIChat({ language }: AIChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: language === "hi" ? aiChatResponses.default.hi : aiChatResponses.default.en }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getResponse(text, language);
      setMessages((p) => [...p, { role: "bot", text: response }]);
      setTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gradient-to-br from-[#FF6B13] to-[#F5B301] hover:scale-110 shadow-orange-500/40"
        }`}
        title={language === "hi" ? "AI सहायक" : "AI Assistant"}
      >
        {open ? <X size={22} className="text-white" /> : <MessageSquare size={22} className="text-white" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[520px] bg-[#0B2447] border border-[#FF6B13]/30 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6B13] to-[#F5B301] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                {language === "hi" ? "राजेन्द्र AI सहायक" : "Rajendra AI Assistant"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-white/80 text-xs">{language === "hi" ? "ऑनलाइन" : "Online 24/7"}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "bot" ? "bg-[#FF6B13]/20" : "bg-white/20"}`}>
                  {msg.role === "bot" ? <Bot size={14} className="text-[#FF6B13]" /> : <User size={14} className="text-white" />}
                </div>
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-white/10 text-white rounded-tl-sm"
                    : "bg-gradient-to-br from-[#FF6B13] to-[#F5B301] text-white rounded-tr-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FF6B13]/20 flex items-center justify-center">
                  <Bot size={14} className="text-[#FF6B13]" />
                </div>
                <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#FF6B13] animate-bounce" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 pb-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {quickQuestions.map((q) => (
                <button
                  key={q.key}
                  onClick={() => sendMessage(q.key)}
                  className="flex-shrink-0 px-3 py-1 rounded-full bg-[#FF6B13]/15 border border-[#FF6B13]/30 text-[#F5B301] text-xs hover:bg-[#FF6B13]/25 transition-colors"
                >
                  {language === "hi" ? q.labelHi : q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={language === "hi" ? "अपना प्रश्न टाइप करें..." : "Ask a question..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FF6B13]"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center disabled:opacity-40"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
