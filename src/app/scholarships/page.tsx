"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  PhoneCall,
  Lightbulb,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import FAQs from "@/components/ui/text-reveal-faqs";
import { SCHOLARSHIPS_FAQS } from "@/data/faqsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden pb-1">
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="anim-word inline-block mr-[0.25em] translate-y-full opacity-0"
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// PROGRAMMES DATA (EXACT MATCH FROM SCREENSHOT 2 & 3)
const PROGRAMMES_LIST = [
  {
    title: "Business Administration",
    description: "Build a foundation in management, leadership, strategic thinking, and business operations.",
    icon: <Briefcase className="w-6 h-6 text-[#00629f]" />,
    href: "/programs/bba-in-business-administration",
    image: "/images/hero-slider/slider-1.webp",
  },
  {
    title: "Commerce",
    description: "Develop an understanding of business, finance, commerce, and contemporary organisational practices.",
    icon: <TrendingUp className="w-6 h-6 text-[#00a876]" />,
    href: "/programs/bcom-in-business-administration",
    image: "/images/hero-slider/slider-2.webp",
  },
  {
    title: "Entrepreneurship",
    description: "Explore innovation, business development, entrepreneurial thinking, and the process of building a venture.",
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    href: "/programs/bba-in-business-administration-entrepreneurship",
    image: "/images/hero-slider/slider-3.webp",
  },
  {
    title: "Artificial Intelligence",
    description: "Discover the role of emerging technologies, AI-driven applications, and data-informed decision-making in business.",
    icon: <Cpu className="w-6 h-6 text-teal-600" />,
    href: "/programs/bba-in-artificial-intelligence",
    image: "/images/experiential-learning/masterclass/viken-shah-1.jpg",
  },
  {
    title: "Digital Media & Growth Marketing",
    description: "Develop an understanding of digital platforms, marketing strategy, audience engagement, and business growth.",
    icon: <Layers className="w-6 h-6 text-fuchsia-600" />,
    href: "/programs/bsc-in-digital-media-growth-marketing",
    image: "/images/experiential-learning/masterclass/unnat-khetan-1.jpg",
  },
];

// APPLICATION ROADMAP STEPS (EXACT MATCH FROM SCREENSHOT 3 & 4 - 5 STEPS ONLY)
const APPLICATION_STEPS = [
  {
    step: "01",
    title: "Explore Your Programme",
    desc: "Review the available programmes at Future Varsity – IMSR and identify the course that aligns with your interests and career goals.",
    icon: <Compass className="w-6 h-6 text-emerald-400" />,
  },
  {
    step: "02",
    title: "Submit Your Admission Enquiry",
    desc: "Complete the admission enquiry form with your contact details and preferred programme.",
    icon: <FileText className="w-6 h-6 text-cyan-400" />,
  },
  {
    step: "03",
    title: "Check Your Eligibility",
    desc: "Speak with the admissions team to understand the eligibility requirements, scholarship categories, early bird benefits, and applicable deadlines.",
    icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />,
  },
  {
    step: "04",
    title: "Submit the Required Documents",
    desc: "Provide the academic records and other supporting documents required for your chosen scholarship or admission offer.",
    icon: <BookOpen className="w-6 h-6 text-teal-400" />,
  },
  {
    step: "05",
    title: "Receive Guidance from the Admissions Team",
    desc: "Understand the next steps, applicable terms, fee payment requirements, and the status of your application.",
    icon: <GraduationCap className="w-6 h-6 text-fuchsia-400" />,
  },
];

export default function ScholarshipsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero background
      gsap.fromTo(
        ".scholarships-hero-bg",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Heading text reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".anim-word");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.1,
          }
        );

        const gradientSpan = headingRef.current.querySelector(".fade-up-scroll");
        if (gradientSpan) {
          gsap.fromTo(
            gradientSpan,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.35,
              ease: "power3.out",
            }
          );
        }
      }

      // Hero elements stagger
      gsap.fromTo(
        ".scholarships-hero-animate",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900 relative selection:bg-[#00bcda] selection:text-white font-sans overflow-x-hidden">
      {/* GLOBAL HEADER */}
      <Header activeNav="Scholarships" />

      {/* ============================================================== */}
      {/* SECTION 1: HERO BANNER (EXACT TITLE & BREADCRUMB)              */}
      {/* ============================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
      >
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 scholarships-hero-bg overflow-hidden">
          <Image
            src="/images/student-life/student-life.webp"
            alt="Scholarships & Early Bird Offers at Future Varsity – IMSR"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.38]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
          {/* BREADCRUMB NAVIGATION */}
          <div className="scholarships-hero-animate flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate">
              Scholarships
            </span>
          </div>

          {/* HERO TITLE DIRECTLY UNDER BREADCRUMB */}
          <div className="max-w-4xl w-full flex flex-col items-start text-left">
            <h1
              ref={headingRef}
              className="font-display font-medium text-[26px] leading-[27px] sm:text-[48px] sm:leading-[45px] tracking-tight text-white text-left mb-6"
            >
              <SplitText text="Scholarships & Early Bird Offers at" />
              <br className="hidden sm:inline" />
              <span
                className="font-medium inline-block pb-1 italic font-serif fade-up-scroll pr-3 opacity-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Future Varsity – IMSR
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: MAKE YOUR FUTURE COUNT (SCREENSHOT 1)               */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-white text-zinc-900 border-b border-zinc-200">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full flex flex-col items-start text-left">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-[1.2] mb-6 max-w-5xl">
              Make Your Future Count with{" "}
              <span
                className="font-medium inline-block pr-3 italic font-serif"
                style={{
                  background: "linear-gradient(135deg, #00629f, #00bcda)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Scholarships and Early Admission Benefits
              </span>
            </h2>

            <div className="space-y-5 text-zinc-600 font-light text-base sm:text-lg lg:text-[19px] leading-relaxed mb-8 w-full max-w-5xl">
              <p>
                At Future Varsity – Institute of Management Studies &amp; Research (IMSR), we believe that access to quality education can open doors to meaningful opportunities. Our scholarship initiatives and early bird admission offers are designed to help eligible students take the next step towards their academic and professional goals.
              </p>
              <p>
                Whether you aspire to pursue business administration, commerce, entrepreneurship, artificial intelligence, or digital media and growth marketing, explore the available financial assistance and early admission benefits that may help make your educational journey more accessible.
              </p>
              <p className="text-zinc-950 font-medium text-base sm:text-lg lg:text-[19px] pt-1">
                Start your journey early. Explore your opportunities. Invest in your future.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="#enquire"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00629f] to-[#00bcda] text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:opacity-95 transition-all duration-300 shadow-lg shadow-[#00629f]/25 inline-flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="#enquire"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-zinc-300 hover:border-zinc-900 text-zinc-800 font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:bg-zinc-50 transition-all duration-300 inline-flex items-center justify-center gap-2.5 group"
              >
                <span>Enquire About Scholarships</span>
                <PhoneCall className="w-4.5 h-4.5 text-[#00629f]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: SCHOLARSHIP OPPORTUNITIES AT IMSR (DARK STEP THEME) */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-zinc-950 text-white border-b border-zinc-900">
        {/* Ambient glow effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00629f]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[#42d392]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl lg:max-w-6xl mx-auto mb-16">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-3">
              Scholarship Opportunities{" "}
              <span
                className="font-medium inline-block pr-3 italic font-serif"
                style={{
                  background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                at IMSR
              </span>
            </h2>
            <h3 className="text-lg sm:text-xl font-medium text-cyan-300 mb-6">
              Supporting Your Academic Ambitions
            </h3>
            <div className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed space-y-3 max-w-4xl mx-auto">
              <p>
                A student&apos;s potential goes beyond academic achievements. At IMSR, scholarship opportunities can help eligible students pursue their educational aspirations while working towards their career goals.
              </p>
              <p className="text-sm sm:text-base text-zinc-400">
                Students are encouraged to enquire about the available scholarship schemes, eligibility requirements, supporting documents, and application timelines before applying.
              </p>
            </div>
          </div>

          {/* Subheading & Eligibility Criteria Step Cards */}
          <div
            className="rounded-3xl border border-white/15 p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-sm w-full relative overflow-hidden"
            style={{
              background:
                "linear-gradient(28deg, rgb(7, 116, 130) 0%, rgb(0, 59, 77) 48%, rgb(79, 7, 65) 100%)",
            }}
          >
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-white mb-3">
                Who Can Apply for Scholarships?
              </h3>
              <p className="text-sm sm:text-base text-white/85 font-light max-w-3xl mx-auto">
                Scholarship eligibility may vary depending on the scheme and its applicable criteria. Depending on the available opportunities, students may be considered based on:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Step 1 */}
              <div className="rounded-2xl p-6 sm:p-8 bg-black/25 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 hover:bg-black/35 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-white/50 group-hover:text-emerald-400 transition-colors">
                      01
                    </span>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30">
                      Step 01
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                    Academic Merit
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    Recognition of academic performance and achievements.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl p-6 sm:p-8 bg-black/25 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 hover:bg-black/35 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-white/50 group-hover:text-cyan-400 transition-colors">
                      02
                    </span>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30">
                      Step 02
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    Financial Need
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    Assistance for eligible students who require financial support to pursue higher education.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl p-6 sm:p-8 bg-black/25 backdrop-blur-md border border-white/15 hover:border-teal-400/50 hover:bg-black/35 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-white/50 group-hover:text-teal-400 transition-colors">
                      03
                    </span>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-teal-300 px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-400/30">
                      Step 03
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2.5 group-hover:text-teal-300 transition-colors">
                    Applicable Scholarship Schemes
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    Opportunities available under relevant institutional, government, or other approved schemes, subject to their individual eligibility conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons & Note Banner */}
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-col items-center justify-center text-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#enquire"
                  className="px-8 py-4 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-kanit font-medium text-[15px] uppercase tracking-[0.4px] transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Apply For Scholarship</span>
                  <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="#enquire"
                  className="px-8 py-4 rounded-full border border-white/30 hover:border-white/60 text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2.5 group"
                >
                  <span>Enquire About Scholarships</span>
                  <PhoneCall className="w-4.5 h-4.5 text-cyan-300" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-white/80 font-light italic max-w-2xl text-center">
                Please contact the admissions team to confirm which scholarship categories are currently available and whether you meet the applicable criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: EARLY BIRD OFFERS (SCREENSHOT 2)                    */}
      {/* ============================================================== */}
      <section
        className="py-20 sm:py-28 relative overflow-hidden text-white select-none shadow-inner"
        style={{
          background: "linear-gradient(178deg, rgba(93, 212, 231, 1) 0%, rgba(0, 147, 126, 1) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
          }}
        >
          <svg className="w-full h-full" width="100%" height="100%">
            <pattern id="early-bird-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#early-bird-grid)" />
          </svg>
        </div>

        <div className="absolute top-0 right-10 w-[450px] h-[450px] bg-white/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-teal-900/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-3">
                Early Bird Admission Offers
              </h2>
              <h3 className="text-xl sm:text-2xl text-teal-950 font-medium mb-6">
                Plan Ahead. Apply Early. Explore the Benefits.
              </h3>
              <div className="space-y-4 text-white/95 font-light text-base sm:text-lg leading-relaxed mb-8">
                <p>
                  Taking the first step towards your future early can help you plan your education with greater confidence. IMSR&apos;s early bird admission offers, when available, provide prospective students with an opportunity to explore applicable admission benefits by completing the admission process within the specified promotional period.
                </p>
                <p>
                  Students interested in undergraduate programmes are encouraged to enquire about early admission opportunities for the upcoming academic session and understand the applicable deadlines, conditions, and benefits.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="#enquire"
                  className="px-8 py-4 rounded-full bg-zinc-950 text-white hover:bg-zinc-900 font-kanit font-medium text-[15px] uppercase tracking-[0.4px] transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Enquire About Early Bird Offers</span>
                  <ArrowUpRight className="w-4.5 h-4.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Why Consider Early Admission Frosted Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-7 sm:p-9 bg-black/25 backdrop-blur-xl border border-white/30 shadow-2xl text-white">
                <h4 className="text-xl font-display font-medium text-white mb-6">
                  Why Consider Early Admission?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3.5 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Explore Available Offers:</strong>
                      <span className="font-light text-white/85 text-xs sm:text-sm">Enquire about early bird benefits applicable to your chosen programme.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Plan Your Education:</strong>
                      <span className="font-light text-white/85 text-xs sm:text-sm">Understand the admission process, fee structure, and payment timelines in advance.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Get Admission Guidance:</strong>
                      <span className="font-light text-white/85 text-xs sm:text-sm">Receive assistance from the admissions team regarding programme selection and application requirements.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Prepare for Your Next Chapter:</strong>
                      <span className="font-light text-white/85 text-xs sm:text-sm">Take timely steps towards your academic and professional aspirations.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 pt-6 border-t border-white/20">
            <p className="text-xs sm:text-sm text-white/80 font-light italic">
              * Early bird offers, if available, are subject to programme-specific eligibility, deadlines, availability, and applicable terms and conditions.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: EXPLORE PROGRAMMES AT IMSR (SCREENSHOT 2 & 3)       */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-white text-zinc-900 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-tight mb-4">
              Explore Programmes{" "}
              <span
                className="font-medium inline-block pr-3 italic font-serif"
                style={{
                  background: "linear-gradient(135deg, #00629f, #00bcda)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                at IMSR
              </span>
            </h2>
            <p className="text-zinc-600 font-light text-base sm:text-lg leading-relaxed">
              Discover programmes designed to help you develop relevant knowledge, practical skills, and industry-oriented perspectives.
            </p>
          </div>

          {/* Programmes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PROGRAMMES_LIST.map((prog, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-[#00bcda]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative w-full h-44 overflow-hidden bg-zinc-950">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white/90 shadow-md">
                    {prog.icon}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-medium text-xl text-zinc-950 mb-2.5 group-hover:text-[#00629f] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>

                  <Link
                    href={prog.href}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00629f] hover:text-[#00bcda] transition-colors group/link"
                  >
                    <span>View Programme</span>
                    <ArrowUpRight className="w-4 h-4 group-link-hover:translate-x-0.5 group-link-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote banner */}
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
            <p className="text-xs sm:text-sm text-zinc-700 font-light italic">
              Contact the admissions team to confirm programme availability, applicable scholarship schemes, and early bird offers for your chosen course.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: HOW TO APPLY (SCREENSHOT 3 & 4 - 5 STEPS ONLY)      */}
      {/* ============================================================== */}
      <section
        className="py-20 sm:py-24 relative overflow-hidden text-white border-b border-zinc-900"
        style={{
          background: "linear-gradient(135deg, #072a38 0%, #031c26 50%, #09131f 100%)",
        }}
      >
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00bcda]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              How to Apply for Scholarships and Early Bird Offers
            </h2>
            <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              Getting started is simple. Follow these steps to explore the opportunities available to you.
            </p>
          </div>

          {/* 5 Steps Grid (Exact 5 Steps from Screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {APPLICATION_STEPS.map((stepItem, idx) => (
              <div
                key={idx}
                className={`rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-8 hover:border-emerald-400/50 hover:bg-white/[0.07] transition-all duration-300 shadow-xl flex flex-col justify-between group ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      {stepItem.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-colors">
                      {stepItem.icon}
                    </div>
                  </div>
                  <h3 className="font-display font-medium text-lg text-white mb-3">
                    Step {idx + 1}: {stepItem.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: FAQS (MATCHING OTHER PAGES)                         */}
      {/* ============================================================== */}
      <FAQs
        items={SCHOLARSHIPS_FAQS}
        titlePrefix="Frequently"
        titleHighlight="Asked Questions"
        subtitle="Everything you need to know about scholarships, eligibility, and early bird admission benefits at IMSR."
      />

      {/* ============================================================== */}
      {/* SECTION 8: CLOSING BANNER (SCREENSHOT 5)                       */}
      {/* ============================================================== */}
      <section
        id="enquire"
        className="py-20 sm:py-28 relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #02384d 0%, #00567a 50%, #008fa8 100%)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/10 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
              Take the First Step Towards Your Future
            </h2>

            <div className="max-w-2xl mx-auto text-white/90 font-light text-base sm:text-lg leading-relaxed space-y-4 mb-8">
              <p>
                Your ambitions deserve the right opportunities. Connect with Future Varsity – Institute of Management Studies &amp; Research to learn more about available scholarships, early bird admission offers, and the programmes that can help you work towards your goals.
              </p>
              <p className="text-white font-medium text-base sm:text-lg">
                Enquire today to understand your options and plan your next step with confidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/programs/bba-in-business-administration#apply"
                className="px-8 py-4 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-kanit font-medium text-[15px] uppercase tracking-[0.4px] transition-all duration-300 shadow-2xl inline-flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4.5 h-4.5 text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <a
                href="tel:+918526053333"
                className="px-8 py-4 rounded-full border border-white/30 hover:border-white/60 text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2.5"
              >
                <PhoneCall className="w-4.5 h-4.5 text-emerald-300" />
                <span>Talk To An Admission Counsellor</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </main>
  );
}
