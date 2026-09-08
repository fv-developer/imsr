"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";
import {
  BookOpen,
  Download,
  ArrowUpRight,
  CircleCheckBig,
  BarChart3,
  Code2,
  Smartphone,
  Cpu,
  Layers,
  Sparkles,
  Award,
  Globe,
  Briefcase,
  Lightbulb,
  FileText,
  GraduationCap
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StreamSemester {
  id: number;
  num: string;
  yearLabel: string;
  title: string;
  quote: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  learnBadges: string[];
  keyOutcomes: string[];
  courses: { code: string; title: string; credits: number }[];
  categoryTags: string;
}

const STREAMS_DATA: StreamSemester[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Business Foundations & Analytics",
    quote: "Master core management principles, financial accounting, and data-driven managerial economics.",
    description: "Build a strong groundwork in corporate management, financial reporting, and quantitative business mathematics.",
    icon: <BarChart3 className="w-5 h-5" />,
    accentColor: "#00bcda",
    learnBadges: [
      "Management Principles",
      "Financial Accounting",
      "Managerial Economics",
      "Business Mathematics",
      "Executive Communication",
    ],
    keyOutcomes: [
      "Analyze corporate balance sheets & income statements",
      "Apply microeconomic decision frameworks",
      "Master professional business writing & presentation skills",
    ],
    courses: [
      { code: "BBA101", title: "Principles of Management", credits: 4 },
      { code: "BBA102", title: "Financial Accounting & Reporting", credits: 4 },
      { code: "BBA103", title: "Managerial Economics", credits: 3 },
      { code: "BBA104", title: "Business Mathematics & Stats", credits: 3 },
    ],
    categoryTags: "PRIMARY • FOUNDATION • CORE",
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Marketing & Commercial Strategy",
    quote: "Execute modern marketing campaigns, cost accounting models, and legal business frameworks.",
    description: "Understand market dynamics, consumer behavior, macroeconomic trends, and commercial regulations.",
    icon: <Globe className="w-5 h-5" />,
    accentColor: "#42d392",
    learnBadges: [
      "Marketing Management",
      "Cost Accounting",
      "Macroeconomics",
      "Commercial Law",
      "Excel Analytics Lab",
    ],
    keyOutcomes: [
      "Design digital marketing funnels & brand strategies",
      "Perform cost-volume profit & variance analysis",
      "Evaluate commercial contracts & regulatory compliance",
    ],
    courses: [
      { code: "BBA201", title: "Marketing Management", credits: 4 },
      { code: "BBA202", title: "Cost & Management Accounting", credits: 4 },
      { code: "BBA203", title: "Macroeconomics & Global Markets", credits: 3 },
      { code: "BBA204", title: "Business & Commercial Law", credits: 3 },
    ],
    categoryTags: "PRIMARY • MARKETING • FINANCE",
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "Corporate Finance & Analytics",
    quote: "Integrate corporate finance, talent management, supply chain logistics, and BI dashboards.",
    description: "Advance into capital structure planning, human resource strategy, and data visualization labs.",
    icon: <Cpu className="w-5 h-5" />,
    accentColor: "#00629f",
    learnBadges: [
      "Corporate Finance",
      "HRM & Talent",
      "Supply Chain Management",
      "PowerBI / Tableau Lab",
      "Design Thinking",
    ],
    keyOutcomes: [
      "Optimize capital budgeting & working capital",
      "Streamline supply chain & operations workflow",
      "Build interactive business intelligence dashboards",
    ],
    courses: [
      { code: "BBA301", title: "Corporate Financial Management", credits: 4 },
      { code: "BBA302", title: "Human Resource Management", credits: 4 },
      { code: "BBA303", title: "Supply Chain & Logistics", credits: 3 },
      { code: "BBA304", title: "Data Visualization & BI Lab", credits: 3 },
    ],
    categoryTags: "MIDDLE • ANALYTICS • OPERATIONS",
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "ERP & Corporate Internship",
    quote: "Mandatory 8-week corporate summer internship alongside enterprise SAP/Oracle ERP integration.",
    description: "Gain hands-on corporate exposure, risk management insights, and enterprise software execution.",
    icon: <Briefcase className="w-5 h-5" />,
    accentColor: "#f59e0b",
    learnBadges: [
      "SAP / Oracle ERP Lab",
      "Financial Risk",
      "International Trade",
      "Corporate Tax",
      "8-Wk Corporate Internship",
    ],
    keyOutcomes: [
      "Complete 8-week full-time corporate summer internship",
      "Operate enterprise resource planning (ERP) modules",
      "Assess foreign exchange & international trade risk",
    ],
    courses: [
      { code: "BBA401", title: "ERP Software Lab (SAP/Oracle)", credits: 4 },
      { code: "BBA402", title: "Financial Risk & Banking", credits: 4 },
      { code: "BBA403", title: "International Trade Policy", credits: 3 },
      { code: "BBA404", title: "8-Week Corporate Internship", credits: 6 },
    ],
    categoryTags: "MIDDLE • INTERNSHIP • IMMERSION",
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Strategic Leadership & Electives",
    quote: "Specialized tracks in Finance, Marketing, or Analytics with Harvard Business Publishing case studies.",
    description: "Formulate corporate strategy, evaluate new ventures, and solve executive business cases.",
    icon: <Lightbulb className="w-5 h-5" />,
    accentColor: "#a855f7",
    learnBadges: [
      "Strategic Management",
      "Specialization Elective I",
      "Specialization Elective II",
      "Venture Creation",
      "Harvard Case Lab",
    ],
    keyOutcomes: [
      "Conduct competitive industry positioning & SWOT analysis",
      "Develop innovative venture business plans",
      "Solve real-world C-suite case studies",
    ],
    courses: [
      { code: "BBA501", title: "Strategic Management", credits: 4 },
      { code: "BBA502", title: "Specialization Elective I", credits: 4 },
      { code: "BBA503", title: "Specialization Elective II", credits: 4 },
      { code: "BBA504", title: "Entrepreneurship & Innovation", credits: 3 },
    ],
    categoryTags: "SENIOR • STRATEGY • ELECTIVES",
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Global Business & Capstone",
    quote: "Global immersion modules, brand leadership, and live corporate consultancy capstone projects.",
    description: "Synthesize management knowledge into live industry consulting assignments and brand growth strategies.",
    icon: <Sparkles className="w-5 h-5" />,
    accentColor: "#ec4899",
    learnBadges: [
      "Global Environment",
      "Specialization Elective III",
      "Brand Leadership",
      "Live Consultancy Capstone",
    ],
    keyOutcomes: [
      "Deliver live corporate consultancy capstone project",
      "Execute brand positioning & growth hacking",
      "Formulate global market entry strategies",
    ],
    courses: [
      { code: "BBA601", title: "Global Business & Ethics", credits: 4 },
      { code: "BBA602", title: "Specialization Elective III", credits: 4 },
      { code: "BBA603", title: "Brand Leadership & Strategy", credits: 3 },
      { code: "BBA604", title: "Live Consultancy Capstone", credits: 4 },
    ],
    categoryTags: "SENIOR • CAPSTONE • CONSULTING",
  },
  {
    id: 7,
    num: "07",
    yearLabel: "YEAR 4 / SEMESTER 7 (HONS.)",
    title: "Research Methodology & Mentorship",
    quote: "NEP 2020 4th Year Honors specialization with quantitative business research techniques.",
    description: "Advanced research design, data collection, statistical modeling, and 1-on-1 C-suite executive coaching.",
    icon: <FileText className="w-5 h-5" />,
    accentColor: "#3b82f6",
    learnBadges: [
      "Advanced Business Research",
      "Honors Track I",
      "Honors Track II",
      "C-Suite Mentorship Lab",
    ],
    keyOutcomes: [
      "Formulate empirical quantitative research hypotheses",
      "Master SPSS / R statistical software for research",
      "Participate in executive mentorship roundtables",
    ],
    courses: [
      { code: "BBA701", title: "Advanced Research Methodology", credits: 4 },
      { code: "BBA702", title: "Honors Specialization Track I", credits: 4 },
      { code: "BBA703", title: "Honors Specialization Track II", credits: 4 },
      { code: "BBA704", title: "C-Suite Executive Lab", credits: 3 },
    ],
    categoryTags: "HONORS • RESEARCH • MENTORSHIP",
  },
  {
    id: 8,
    num: "08",
    yearLabel: "YEAR 4 / SEMESTER 8 (HONS.)",
    title: "Honors Dissertation & Thesis",
    quote: "Full-semester guided research thesis or major corporate innovation project for degree with Honors.",
    description: "Produce a publishable academic thesis or major corporate strategy defense under senior faculty guidance.",
    icon: <GraduationCap className="w-5 h-5" />,
    accentColor: "#10b981",
    learnBadges: [
      "Guided Research Thesis",
      "Global Governance",
      "Thesis Viva Defense",
      "Honors Degree Award",
    ],
    keyOutcomes: [
      "Author & defend full-length Honors research thesis",
      "Master corporate sustainability & ESG governance",
      "Graduate with B.B.A. (Hons.) Degree from University of Mumbai",
    ],
    courses: [
      { code: "BBA801", title: "Honors Research Dissertation", credits: 12 },
      { code: "BBA802", title: "Corporate Governance & ESG", credits: 4 },
    ],
    categoryTags: "HONORS • THESIS • DEGREE",
  },
];

export default function BbaCurriculumSection() {
  const [activeStreamIndex, setActiveStreamIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);
  const activeStream = STREAMS_DATA[activeStreamIndex];

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
      {/* BACKGROUND DECORATIVE GLOWS (ISOLATED OVERFLOW-HIDDEN TO PREVENT PAGE OVERFLOW WITHOUT BREAKING STICKY) */}
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
            Designed in accordance with NEP 2020 guidelines, combining core managerial skills, data analytics, corporate internships, and 4th-year research honors thesis.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP & LAPTOP LAYOUT: IN-PLACE FLEX ACCORDION GALLERY (lg:flex) */}
        {/* ============================================================ */}
        <div className="curr-anim hidden lg:flex flex-row w-full h-[580px] gap-2.5 overflow-hidden rounded-[28px] bg-[#090d16]/95 backdrop-blur-xl border border-white/15 p-3 shadow-2xl">
          {STREAMS_DATA.map((stream, idx) => {
            const isActive = idx === activeStreamIndex;
            return (
              <div
                key={stream.id}
                onClick={() => setActiveStreamIndex(idx)}
                onMouseEnter={() => setActiveStreamIndex(idx)}
                className={`relative rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden flex flex-col justify-between border ${
                  isActive
                    ? "flex-[12] bg-[#0d1424] border-cyan-400/50 shadow-2xl p-6 md:p-8"
                    : "flex-1 bg-white/5 hover:bg-white/10 border-white/10 p-3"
                }`}
                style={{
                  borderTopColor: stream.accentColor,
                  borderTopWidth: "4px",
                }}
              >
                {/* -------------------------------------------------------- */}
                {/* EXPANDED CONTENT (WHEN THIS CARD IS ACTIVE) */}
                {/* -------------------------------------------------------- */}
                {isActive ? (
                  <div className="flex flex-col justify-between h-full overflow-y-auto pr-1 no-scrollbar animate-in fade-in duration-300">
                    <div>
                      {/* HEADER TAG & ICON */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase">
                          STREAM {stream.num} / 08 • {stream.yearLabel}
                        </span>
                        <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-white">
                          {stream.icon}
                        </div>
                      </div>

                      {/* MAIN TITLE */}
                      <h3 className="font-display font-medium text-[25px] text-white leading-snug mb-3">
                        {stream.title}
                      </h3>

                      {/* QUOTE */}
                      <p className="italic font-serif text-cyan-200 text-base xl:text-lg leading-relaxed mb-4">
                        &ldquo;{stream.quote}&rdquo;
                      </p>

                      {/* DESCRIPTION */}
                      <p className="text-zinc-300 text-sm xl:text-base font-light leading-relaxed mb-6">
                        {stream.description}
                      </p>

                      {/* WHAT YOU LEARN */}
                      <div className="mb-6">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                          WHAT YOU LEARN
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stream.learnBadges.map((badge, bIdx) => (
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
                      <div className="mb-6">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                          KEY OUTCOMES
                        </p>
                        <div className="space-y-2">
                          {stream.keyOutcomes.map((outcome, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2.5 text-sm text-zinc-200 font-light">
                              <CircleCheckBig className="w-4 h-4 text-cyan-300 shrink-0" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ACTION BUTTON */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <span className="text-[11px] font-mono tracking-wider text-zinc-400">
                        {stream.categoryTags}
                      </span>
                      <a
                        href="tel:+918508173333"
                        className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-md hover:scale-[1.02] shrink-0"
                      >
                        <span>Download Syllabus PDF</span>
                        <ArrowUpRight className="w-4 h-4 text-[#00629f]" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* -------------------------------------------------------- */
                  /* COLLAPSED VERTICAL BAR (WHEN THIS CARD IS INACTIVE) */
                  /* -------------------------------------------------------- */
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    {/* TOP ICON */}
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      {stream.icon}
                    </div>

                    {/* VERTICAL ROTATED TEXT LABEL */}
                    <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
                      <span className="text-[18px] font-medium uppercase tracking-wider text-zinc-200 group-hover:text-white whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
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
            SWIPE / SCROLL TO EXPLORE 8 SEMESTERS
          </p>

          <div className="relative space-y-6">
            {STREAMS_DATA.map((stream, idx) => (
              <div
                key={stream.id}
                className="sticky rounded-3xl p-6 sm:p-8 bg-[#090d16]/95 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300"
                style={{
                  top: `${125 + idx * 12}px`,
                  zIndex: idx + 1,
                  borderLeftColor: stream.accentColor,
                  borderLeftWidth: "6px",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase">
                    SEMESTER {stream.num} / 08 • {stream.yearLabel}
                  </span>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-white">
                    {stream.icon}
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

                {/* LEARN BADGES */}
                <div className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    WHAT YOU LEARN
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stream.learnBadges.map((badge, bIdx) => (
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
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
