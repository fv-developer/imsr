"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";
import {
  CircleCheckBig,
  BarChart3,
  Cpu,
  Sparkles,
  Globe,
  Briefcase,
  Lightbulb,
  Layers,
  GraduationCap,
} from "lucide-react";
import { ProgramConfig } from "@/data/programsData";
import { getCurriculumForProgram } from "@/data/curriculumData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STREAM_ICONS = [
  <BarChart3 className="w-5 h-5" key="1" />,
  <Globe className="w-5 h-5" key="2" />,
  <Briefcase className="w-5 h-5" key="3" />,
  <Layers className="w-5 h-5" key="4" />,
  <Lightbulb className="w-5 h-5" key="5" />,
  <Sparkles className="w-5 h-5" key="6" />,
  <Cpu className="w-5 h-5" key="7" />,
  <GraduationCap className="w-5 h-5" key="8" />,
];

const STREAM_ACCENT_COLORS = [
  "#00bcda",
  "#42d392",
  "#00629f",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
  "#3b82f6",
  "#10b981",
];

export default function ProgramCurriculumSection({ config }: { config: ProgramConfig }) {
  const [activeStreamIndex, setActiveStreamIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);

  const streamsData = getCurriculumForProgram(config.slug);
  const totalStreamsCount = streamsData.length;
  const totalStreamsPadded = String(totalStreamsCount).padStart(2, "0");

  // Reset active stream index if config/slug changes
  useEffect(() => {
    setActiveStreamIndex(0);
  }, [config.slug]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".curr-anim");
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
      id="curriculum"
      className="py-20 md:py-28 text-white relative selection:bg-cyan-400 selection:text-zinc-950"
      style={{
        background: "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79, 7, 65) 100%)",
      }}
    >
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* BIG HEADING WITH SPLITTEXT ANIMATION (120PX FONT SIZE) */}
        <div className="curr-anim mb-12 text-center md:text-left">
          <h2 className="font-display font-medium text-[52px] sm:text-[85px] md:text-[120px] leading-[84px] tracking-tight text-white uppercase drop-shadow-md select-none">
            <SplitText text="Curriculum" />
          </h2>

          <p className="mt-6 text-zinc-200 text-[18px] font-light leading-relaxed max-w-3xl">
            Aligned with NEP 2020 guidelines, combining management fundamentals, business analytics, practical projects, industry internships, and advanced research opportunities.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP & LAPTOP LAYOUT: IN-PLACE FLEX ACCORDION GALLERY (lg:flex) */}
        {/* ============================================================ */}
        <div className="curr-anim hidden lg:flex flex-row w-full h-[620px] xl:h-[640px] gap-2.5 overflow-hidden rounded-[28px] bg-[#090d16]/95 backdrop-blur-xl border border-white/15 p-3 shadow-2xl">
          {streamsData.map((stream, idx) => {
            const isActive = idx === activeStreamIndex;
            const icon = STREAM_ICONS[idx % STREAM_ICONS.length];
            const accentColor = STREAM_ACCENT_COLORS[idx % STREAM_ACCENT_COLORS.length];
            const learnBadges = stream.learnBadges;

            return (
              <div
                key={stream.id}
                onClick={() => setActiveStreamIndex(idx)}
                onMouseEnter={() => setActiveStreamIndex(idx)}
                className={`relative rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden flex flex-col border ${
                  isActive
                    ? "flex-[12] bg-[#0d1424] border-cyan-400/50 shadow-2xl p-6 md:p-8 justify-start"
                    : "flex-1 bg-white/5 hover:bg-white/10 border-white/10 p-3 justify-between"
                }`}
                style={{
                  borderTopColor: accentColor,
                  borderTopWidth: "4px",
                }}
              >
                {/* -------------------------------------------------------- */}
                {/* EXPANDED CONTENT (WHEN THIS CARD IS ACTIVE) */}
                {/* -------------------------------------------------------- */}
                {isActive ? (
                  <div className="flex flex-col justify-start h-full overflow-y-auto pr-3 space-y-5 animate-in fade-in duration-300 [scrollbar-width:thin] [scrollbar-color:rgba(0,188,218,0.4)_rgba(255,255,255,0.05)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/70">
                    {/* HEADER TAG & ICON */}
                    <div className="flex items-center justify-between shrink-0">
                      <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase">
                        STREAM {stream.num} / {totalStreamsPadded} • {stream.yearLabel}
                      </span>
                      <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-white">
                        {icon}
                      </div>
                    </div>

                    {/* MAIN TITLE */}
                    <h3 className="font-display font-medium text-[24px] xl:text-[26px] text-white leading-snug shrink-0">
                      {stream.title}
                    </h3>

                    {/* QUOTE */}
                    <p className="italic font-serif text-cyan-200 text-base xl:text-lg leading-relaxed shrink-0">
                      &ldquo;{stream.quote}&rdquo;
                    </p>

                    {/* DESCRIPTION */}
                    <p className="text-zinc-300 text-sm xl:text-base font-light leading-relaxed shrink-0">
                      {stream.description}
                    </p>

                    {/* CORE SUBJECTS (IF PRESENT) */}
                    {stream.coreSubjects && (
                      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed font-normal shrink-0">
                        {stream.coreSubjects}
                      </div>
                    )}

                    {/* WHAT YOU LEARN */}
                    <div className="shrink-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                        WHAT YOU LEARN
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {learnBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* KEY OUTCOMES */}
                    <div className="shrink-0 pb-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                        KEY OUTCOMES
                      </p>
                      <div className="space-y-2">
                        {stream.keyOutcomes.map((outcome, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-2.5 text-sm text-zinc-200 font-light">
                            <CircleCheckBig className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* -------------------------------------------------------- */
                  /* COLLAPSED VERTICAL BAR (WHEN THIS CARD IS INACTIVE) */
                  /* -------------------------------------------------------- */
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    {/* TOP ICON */}
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      {icon}
                    </div>

                    {/* VERTICAL ROTATED TEXT LABEL */}
                    <div className="flex-1 flex items-center justify-center my-3 overflow-hidden">
                      <span className="text-[12px] xl:text-[13px] font-medium uppercase tracking-wide text-zinc-200 group-hover:text-white whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                        {stream.title}
                      </span>
                    </div>

                    {/* BOTTOM NUMBER */}
                    <span className="font-mono text-[20px] font-medium text-zinc-400 shrink-0">
                      {stream.num}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET LAYOUT: SCROLL-DRIVEN STACKED CARDS DECK (< lg) */}
        {/* ============================================================ */}
        <div className="curr-anim block lg:hidden space-y-6">
          <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-4 text-center">
            SWIPE / SCROLL TO EXPLORE {totalStreamsCount} SEMESTERS
          </p>

          <div className="relative space-y-6">
            {streamsData.map((stream, idx) => {
              const icon = STREAM_ICONS[idx % STREAM_ICONS.length];
              const accentColor = STREAM_ACCENT_COLORS[idx % STREAM_ACCENT_COLORS.length];
              const learnBadges = stream.learnBadges;

              return (
                <div
                  key={stream.id}
                  className="sticky rounded-3xl p-6 sm:p-8 bg-[#090d16]/95 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300"
                  style={{
                    top: `${125 + idx * 12}px`,
                    zIndex: idx + 1,
                    borderLeftColor: accentColor,
                    borderLeftWidth: "6px",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase">
                      SEMESTER {stream.num} / {totalStreamsPadded} • {stream.yearLabel}
                    </span>
                    <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-white">
                      {icon}
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-2.5">
                    {stream.title}
                  </h3>

                  <p className="italic font-serif text-cyan-200 text-sm leading-relaxed mb-3">
                    &ldquo;{stream.quote}&rdquo;
                  </p>

                  <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                    {stream.description}
                  </p>

                  {/* CORE SUBJECTS (IF PRESENT) */}
                  {stream.coreSubjects && (
                    <div className="p-3 mb-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed font-normal">
                      {stream.coreSubjects}
                    </div>
                  )}

                  {/* LEARN BADGES */}
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      WHAT YOU LEARN
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {learnBadges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white border border-white/15"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* KEY OUTCOMES */}
                  <div className="space-y-1.5 border-t border-white/10 pt-3">
                    {stream.keyOutcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2 text-xs text-zinc-200 font-light">
                        <CircleCheckBig className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
