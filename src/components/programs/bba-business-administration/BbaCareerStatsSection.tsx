"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatCardData {
  id: number;
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subtextPrefix: string;
  subtextValue: string;
  bgStyle: string;
  shadowStyle: string;
  patternType: "dots" | "stripes" | "circles" | "grid";
}

const PLACEMENT_STATS_DATA: StatCardData[] = [
  {
    id: 1,
    label: "Placement Rate",
    target: 98.4,
    prefix: "",
    suffix: "%",
    decimals: 1,
    subtextPrefix: "Vs last cohort:",
    subtextValue: "97.6%",
    bgStyle: "bg-[#0a0c10] text-white",
    shadowStyle: "shadow-xl shadow-black/20",
    patternType: "dots",
  },
  {
    id: 2,
    label: "Average CTC",
    target: 24.5,
    prefix: "₹",
    suffix: " L",
    decimals: 1,
    subtextPrefix: "Vs last year:",
    subtextValue: "₹21.2 L",
    bgStyle: "bg-[#00629f] text-white",
    shadowStyle: "shadow-xl shadow-[#00629f]/25",
    patternType: "stripes",
  },
  {
    id: 3,
    label: "Highest Offer",
    target: 52,
    prefix: "₹",
    suffix: " LPA",
    decimals: 0,
    subtextPrefix: "Role:",
    subtextValue: "US DeepTech Lead",
    bgStyle: "bg-[#00bcda] text-white",
    shadowStyle: "shadow-xl shadow-[#00bcda]/25",
    patternType: "circles",
  },
  {
    id: 4,
    label: "Recruiter Network",
    target: 180,
    prefix: "",
    suffix: "+",
    decimals: 0,
    subtextPrefix: "Partners:",
    subtextValue: "Silicon Valley & India",
    bgStyle: "bg-gradient-to-br from-[#00a876] via-[#00986a] to-[#007e58] text-white",
    shadowStyle: "shadow-xl shadow-emerald-600/25",
    patternType: "grid",
  },
  {
    id: 5,
    label: "Global Offers",
    target: 350,
    prefix: "",
    suffix: "+",
    decimals: 0,
    subtextPrefix: "Includes:",
    subtextValue: "In-term Paid Co-ops",
    bgStyle: "bg-[#079db5] text-white",
    shadowStyle: "shadow-xl shadow-[#079db5]/25",
    patternType: "dots",
  },
];

function CardPattern({ type, id }: { type: string; id: number }) {
  if (type === "dots") {
    return (
      <>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-white/20 transition-all duration-700 pointer-events-none" />
        <svg
          className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700 pointer-events-none"
          width="100%"
          height="100%"
        >
          <pattern id={`dot-pattern-career-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#ffffff" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dot-pattern-career-${id})`} />
        </svg>
      </>
    );
  }
  if (type === "stripes") {
    return (
      <>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/15 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-white/25 transition-all duration-700 pointer-events-none" />
        <svg
          className="absolute inset-0 w-full h-full opacity-15 group-hover:opacity-30 group-hover:scale-115 transition-all duration-700 pointer-events-none"
          width="100%"
          height="100%"
        >
          <pattern id={`stripe-pattern-career-${id}`} width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="16" stroke="#ffffff" strokeWidth="2.5" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#stripe-pattern-career-${id})`} />
        </svg>
      </>
    );
  }
  if (type === "circles") {
    return (
      <>
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-white/15 rounded-full blur-xl group-hover:scale-150 group-hover:bg-white/30 transition-all duration-700 pointer-events-none" />
        <svg
          className="absolute -bottom-8 -right-8 w-44 h-44 opacity-25 group-hover:opacity-45 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="100" r="85" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="#ffffff" strokeWidth="3" />
        </svg>
      </>
    );
  }
  if (type === "grid") {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-175 group-hover:bg-white/20 transition-all duration-700 pointer-events-none" />
        <svg
          className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700 pointer-events-none"
          width="100%"
          height="100%"
        >
          <pattern id={`grid-pattern-career-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-pattern-career-${id})`} />
        </svg>
      </>
    );
  }
  return null;
}

function StatCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState<number>(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 90%",
        },
        onUpdate: () => {
          setCount(obj.val);
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={counterRef}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function BbaCareerStatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".stats-fade");
      elements?.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="career-stats"
      className="py-20 md:py-28 bg-[#e7efff] text-zinc-900 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="stats-fade text-center max-w-4xl mx-auto mb-12 md:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-medium tracking-tight text-zinc-950 leading-tight mb-4">
            Career Success,{" "}
            <span
              className="italic font-serif pr-2 inline-block"
              style={{
                background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 98, 159))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Backed by Results
            </span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg md:text-[18px] font-light leading-relaxed max-w-3xl mx-auto">
            Our undergraduates build live enterprise software and launch validated commercial startups during college. Recruiters assess real deployed code, not theoretical resumes.
          </p>
        </div>

        {/* 5 STAT CARDS GRID WITH WORKING SCROLL COUNTER ANIMATION */}
        <div className="stats-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {PLACEMENT_STATS_DATA.map((card) => (
            <div
              key={card.id}
              className={`group ${card.bgStyle} ${card.shadowStyle} rounded-2xl sm:rounded-3xl p-6 md:p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between min-h-[190px] md:min-h-[200px] relative overflow-hidden select-none`}
            >
              {/* BACKGROUND PATTERN */}
              <CardPattern type={card.patternType} id={card.id} />

              {/* TOP LABEL */}
              <div className="relative z-10">
                <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-wider text-white/90">
                  {card.label}
                </p>
              </div>

              {/* CENTER BIG STAT NUMBER WITH GSAP COUNTER */}
              <div className="relative z-10 my-2">
                <h3 className="font-display font-medium text-3xl sm:text-3xl md:text-4xl lg:text-[38px] tracking-tight text-white leading-none">
                  <StatCounter
                    target={card.target}
                    prefix={card.prefix}
                    suffix={card.suffix}
                    decimals={card.decimals}
                  />
                </h3>
              </div>

              {/* BOTTOM SUBTEXT */}
              <div className="relative z-10">
                <p className="text-[11px] md:text-[12px] text-white/80 font-normal leading-tight">
                  {card.subtextPrefix}{" "}
                  <span className="font-semibold text-white">{card.subtextValue}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
