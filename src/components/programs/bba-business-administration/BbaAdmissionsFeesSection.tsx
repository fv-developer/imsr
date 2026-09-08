"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, CheckCircle2, ShieldCheck, Award, ArrowUpRight, GraduationCap, DollarSign } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Online Application",
    desc: "Submit your basic academic details, statement of purpose, and 10+2 transcripts online.",
  },
  {
    step: "02",
    title: "Personal Interview & Assessment",
    desc: "Engage in an interactive candidate interview evaluating leadership mindset and communication.",
  },
  {
    step: "03",
    title: "Enrollment & Offer Letter",
    desc: "Receive your official admission offer and confirm your seat with initial fee token payment.",
  },
];

const SCHOLARSHIPS = [
  {
    title: "Merit Scholarship",
    grant: "Up to 50% Tuition Waiver",
    criteria: "Awarded to candidates scoring 90%+ in 10+2 Board Examinations.",
  },
  {
    title: "CXO Leadership Grant",
    grant: "₹75,000 Special Fee Credit",
    criteria: "Recognizing outstanding achievements in national sports, debate, or entrepreneurship.",
  },
  {
    title: "Early Bird Application Advantage",
    grant: "₹25,000 Enrollment Credit",
    criteria: "Applicable for candidates completing enrollment during Cohort Phase 1.",
  },
];

export default function BbaAdmissionsFeesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".adm-anim");
      elements?.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.08,
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
      id="admissions-fees"
      className="py-20 md:py-28 bg-white text-zinc-950 relative overflow-hidden font-sans select-none border-t border-zinc-100"
    >
      {/* SOFT TEAL BACKGROUND GLOW */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at bottom left,
              rgba(56, 193, 182, 0.25),
              transparent 70%
            )
          `,
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="adm-anim max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00629f]/10 text-[#00629f] font-semibold text-xs uppercase tracking-widest mb-3 border border-[#00629f]/20">
            <FileText className="w-4 h-4 text-[#00bcda]" />
            <span>Enrollment Guidelines</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-zinc-950 tracking-tight leading-tight">
            Admissions & <span className="text-[#00629f] italic">Fee Structure</span>
          </h2>
          <p className="mt-4 text-zinc-600 font-light text-base sm:text-lg leading-relaxed">
            Transparent fee breakdowns, merit-based scholarship grants, and straightforward admission criteria designed to welcome high-potential future business leaders.
          </p>
        </div>

        {/* 2-COLUMN GRID: FEE & ELIGIBILITY | ADMISSION PROCESS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* FEE BREAKDOWN CARD (LG: 7 COLS) */}
          <div className="adm-anim lg:col-span-7 bg-zinc-50 border border-zinc-200/90 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00bcda]">
                    Academic Investment
                  </span>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-zinc-950 mt-1">
                    BBA (Hons.) Fee Schedule
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#00629f]/10 text-[#00629f] flex items-center justify-center border border-[#00629f]/20 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
                  <span className="text-sm font-medium text-zinc-700">Tuition Fee (Per Semester)</span>
                  <span className="font-display font-bold text-lg text-zinc-950">₹1,25,000</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
                  <span className="text-sm font-medium text-zinc-700">Development & Lab Fund (Annual)</span>
                  <span className="font-display font-bold text-lg text-zinc-950">₹25,000</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
                  <span className="text-sm font-medium text-zinc-700">One-Time Registration & Security Deposit</span>
                  <span className="font-display font-bold text-lg text-zinc-950">₹15,000</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Flexible Semester Installment Plans Available</span>
              </div>
              <a
                href="#admissions-booking"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00629f] hover:text-[#004d7c] transition-colors"
              >
                <span>Request Detailed Prospectus</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ELIGIBILITY & CRITERIA (LG: 5 COLS) */}
          <div className="adm-anim lg:col-span-5 bg-zinc-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#00bcda]/20 text-[#00bcda] border border-[#00bcda]/30 font-semibold text-[11px] uppercase tracking-wider mb-4">
                Requirement
              </span>
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-white mb-6">
                Eligibility Criteria
              </h3>

              <ul className="space-y-4 text-zinc-300 text-sm font-light leading-relaxed mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00bcda] shrink-0 mt-0.5" />
                  <span>Passed 10+2 or equivalent examination from a recognized Higher Secondary Board (CBSE, ICSE, State Board, IB).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00bcda] shrink-0 mt-0.5" />
                  <span>Minimum 50% aggregate score in 10+2 (45% for reserved category candidates).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00bcda] shrink-0 mt-0.5" />
                  <span>Candidates awaiting final 10+2 result status can apply on provisional basis.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <a
                href="tel:+918508173333"
                className="w-full bg-[#00629f] hover:bg-[#005083] text-white font-medium text-sm py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Speak to Admissions Officer</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* 3 STEP ADMISSION PROCESS */}
        <div className="adm-anim mb-16">
          <h3 className="font-display font-semibold text-2xl text-zinc-950 mb-8">
            3-Step Application Journey
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADMISSION_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <span className="text-4xl font-display font-bold text-zinc-200 group-hover:text-[#00bcda]/30 transition-colors block mb-3">
                  {item.step}
                </span>
                <h4 className="font-display font-semibold text-lg text-zinc-950 mb-2">
                  {item.title}
                </h4>
                <p className="text-zinc-600 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SCHOLARSHIP GRANTS GRID */}
        <div className="adm-anim bg-[#00629f]/5 border border-[#00629f]/15 rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00629f]">
                Financial Aid
              </span>
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-zinc-950 mt-1">
                Merit & Leadership Scholarships
              </h3>
            </div>
            <Award className="w-10 h-10 text-[#00629f] shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHOLARSHIPS.map((sch, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-xs">
                <h4 className="font-display font-semibold text-base text-zinc-950 mb-1">
                  {sch.title}
                </h4>
                <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-3">
                  {sch.grant}
                </span>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">
                  {sch.criteria}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
