import { useEffect, useRef, useState } from "react";
import { Users, Calendar, MapPin, Heart } from "lucide-react";
import { statsData } from "../data/mockData";

interface StatsSectionProps {
  language: "en" | "hi";
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

const icons = { Users, Calendar, MapPin, Heart };

function StatCard({ stat, language, animate }: { stat: typeof statsData[0]; language: "en" | "hi"; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate);
  const Icon = icons[stat.icon as keyof typeof icons];

  const format = (n: number) => {
    if (n >= 100000) return (n / 100000).toFixed(1) + "L";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0B2447] to-[#0B2447]/80 border border-[#FF6B13]/20 rounded-2xl p-8 text-center hover:border-[#FF6B13]/60 transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B13]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FF6B13] to-[#F5B301] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} className="text-white" />
        </div>
        <div className="text-4xl font-extrabold text-white mb-1">
          {format(count)}{stat.suffix}
        </div>
        <div className="text-[#F5B301] font-semibold text-lg">
          {language === "hi" ? stat.labelHi : stat.label}
        </div>
      </div>
    </div>
  );
}

export function StatsSection({ language }: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#040D1A] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#FF6B13] font-semibold text-sm tracking-widest uppercase">
            {language === "hi" ? "हमारी उपलब्धियाँ" : "Our Achievements"}
          </span>
          <h2 className="text-white mt-2">
            {language === "hi" ? "संख्याओं में प्रगति" : "Progress in Numbers"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B13] to-[#F5B301] mx-auto mt-3 rounded-full" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <StatCard key={stat.label} stat={stat} language={language} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
