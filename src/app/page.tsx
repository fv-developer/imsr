"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SplitText from "@/components/ui/SplitText";
import AdmissionsTicker from "@/components/layout/AdmissionsTicker";
import AboutSection from "@/components/home/AboutSection";
import Programs from "@/components/home/Programs";
import MaskedHeading from "@/components/ui/MaskedHeading";
import ExperientialLearning from "@/components/home/ExperientialLearning";
import StatsOverview from "@/components/home/StatsOverview";
import PlacementPartners from "@/components/home/PlacementPartners";
import BbaPlacementSection from "@/components/programs/bba-business-administration/BbaPlacementSection";
import StudentTestimonials from "@/components/home/StudentTestimonials";
import FAQs from "@/components/ui/text-reveal-faqs";
import {
  HOME_FAQS,
  ADMISSIONS_FAQS,
  CAMPUS_LIFE_FAQS,
  EXPERIENTIAL_LEARNING_FAQS,
  CONTACT_US_FAQS,
} from "@/data/faqsData";
import CampusActivity from "@/components/home/CampusActivity";
import BackToTop from "@/components/layout/BackToTop";
import BookingSection from "@/components/home/BookingSection";
import ImageTrail from "@/components/react-bits/ImageTrail";
import AccordionGallery from "@/components/react-bits/AccordionGallery";
import StoryScrollSection from "@/components/home/StoryScrollSection";
import ExploreCampusHorizontal from "@/components/home/ExploreCampusHorizontal";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_NAV_LINKS = [
  { name: "Industry Placement", href: "#industry-relations" },
  { name: "Campus Tour", href: "#campus-tour" },
  { name: "News & Blog", href: "/news-blog" },
  { name: "Events", href: "#events" },
  { name: "Contact Us", href: "#contact" },
];

const MAIN_NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "#programs", hasMega: true },
  { name: "Student Life", href: "#student-life" },
  { name: "Faculty", href: "#faculty" },
];

const MEGA_MENU_DATA: Record<string, string[]> = {
  "BBA": [
    "BBA (Hons.) In Business Administration",
    "BBA (Hons.) in Business Administration (Entrepreneurship)",
    "BBA (Hons.) in Business Administration (Marketing Management)",
    "BBA (Hons.)* in Artificial Intelligence",
  ],
  "B.Com.": [
    "B.Com. (Hons.) in Business Administration",
    "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    "B.Com. (Hons.) in Business Administration (Marketing Management)",
    "B.Com. Hons. in BA (Artificial Intelligence)",
  ],
  "Digital Media & AI": [
    "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    "Diploma in Digital Media and Growth Marketing",
  ],
};

const MEGA_MENU_OVERVIEW_LIST = [
  "Highlights",
  "Curriculum & Faculty",
  "Admissions & Fees",
  "Immersions",
  "Entrepreneurship",
  "Career Prospects",
  "Class Profile",
];

const HERO_SLIDES = [
  {
    titleFirst: "Future",
    titleSecond: "Starts Here",
    bgImage: "/images/hero-slider/hero-slider1.jpg",
  },
  {
    titleFirst: "Lead",
    titleSecond: "Tomorrow",
    bgImage: "/images/hero-slider/hero-slider2.jpg",
  },
  {
    titleFirst: "Think",
    titleSecond: "Beyond",
    bgImage: "/images/hero-slider/hero-slider3.jpg",
  },
];

const PROGRAMS_DATA = [
  {
    title: "BBA (Hons.) in Business Administration (Entrepreneurship)",
    category: "BBA",
    duration: "4 Years",
    desc: "Develop foundational business acumen with specialized training in product launch, venture scale, and corporate innovation.",
  },
  {
    title: "BBA (Hons.) in Business Administration (Marketing Management)",
    category: "BBA",
    duration: "4 Years",
    desc: "Learn brand positioning, consumer psychology, market analytics, and digital engagement strategies.",
  },
  {
    title: "BBA (Hons.) In Business Administration",
    category: "BBA",
    duration: "4 Years",
    desc: "A comprehensive foundation in corporate management, organizational leadership, and international trade.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Align financial accounts, taxation laws, and auditing workflows with venture capital management.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Marketing Management)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Focus on commercial business operations, product marketing, supply chain sales, and customer relations.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Acquire high-level competencies in commercial analysis, financial statistics, and corporate accounting.",
  },
  {
    title: "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    category: "Digital Media & AI",
    duration: "3 Years",
    desc: "Excel in content strategy, SEO frameworks, performance ads, conversion rate optimization, and search rankings.",
  },
  {
    title: "Diploma in Digital Media and Growth Marketing",
    category: "Digital Media & AI",
    duration: "1 Year",
    desc: "A fast-track program focused on digital growth tools, social branding, visual content creation, and copywriting.",
  },
  {
    title: "BBA (Hons.)* in Artificial Intelligence",
    category: "Digital Media & AI",
    duration: "4 Years",
    desc: "Understand high-level business intelligence, machine learning strategies, predictive statistics, and cognitive workflow design.",
  },
  {
    title: "B.Com. Hons. in BA (Artificial Intelligence)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Integrate algorithmic financial models, automated corporate database audit routines, and AI ledger services.",
  },
];

const WHY_IMSR_FEATURES = [
  {
    title: "Experiential Curriculum",
    desc: "No boring lectures. Build real startups, manage live investment funds, and work on corporate consulting briefs.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Elite Practitioner Faculty",
    desc: "Learn from CXOs, Founders, and veteran consultants rather than just academic theoreticians.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Unrivaled Placements",
    desc: "A stellar track record with 98% package placement and partnerships with over 50 global companies.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Home2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("BBA");
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeSlide, setActiveSlide] = useState(0);
  const isInitialSlide = useRef(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const exploreCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);



  // Monitor Scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic hero slide changer (every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Slide change text/CTA animation
  useEffect(() => {
    if (isInitialSlide.current) {
      isInitialSlide.current = false;
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-cta",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeSlide]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background fade-in
      tl.fromTo(
        ".hero-bg",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      // Fade in buttons
      tl.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.9"
      );

      // Stats counters trigger on scroll
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const counterObj = { value: 0 };
          gsap.to(counterObj, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = Math.floor(counterObj.value).toString() + (el.textContent?.includes("+") ? "+" : "");
            },
          });
        });
      }

      // Image Reveal Animations using ScrollTrigger (Cameron Knight Clip-Path style)
      const revealContainers = document.querySelectorAll(".reveal-container");
      revealContainers.forEach((container) => {
        const img = container.querySelector(".reveal-img");
        if (!img) return;

        // Reset state via GSAP to avoid flashes
        gsap.set(container, { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(img, { scale: 1.3 });

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Animate clip-path to reveal container from left to right
        revealTimeline.to(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power2.inOut",
        });

        // Simultaneously scale down image to 1
        revealTimeline.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<" // Starts at the exact same time as the clipPath reveal
        );
      });

      // Fade-up scroll triggers for paragraphs
      const fadeUpElements = document.querySelectorAll(".fade-up-scroll");
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            }
          }
        );
      });

      // Generic ScrollTrigger initializers for Design System reusable classes
      gsap.utils.toArray(".fade-up").forEach((el: any) => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".fade-down").forEach((el: any) => {
        gsap.fromTo(el, { y: -35, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".fade-left").forEach((el: any) => {
        gsap.fromTo(el, { x: 35, opacity: 0 }, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".fade-right").forEach((el: any) => {
        gsap.fromTo(el, { x: -35, opacity: 0 }, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".scale-in").forEach((el: any) => {
        gsap.fromTo(el, { scale: 0.95, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        });
      });

      // Stats counter counting animations
      const stats = document.querySelectorAll('.stat-count');
      stats.forEach((stat) => {
        const targetVal = parseInt(stat.getAttribute('data-target') || '0');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            stat.textContent = Math.floor(obj.val) + '+';
          }
        });
      });

      // Stats lines scale animations
      const lines = document.querySelectorAll('.stat-line');
      lines.forEach((line) => {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          }
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden text-zinc-900 font-sans">
      
      {/* 1. DUAL-LEVEL NAVBAR */}
      <Header activeNav="Home" />

      {/* 2. PREMIUM HERO BANNER */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 overflow-hidden select-none"
      >
        {/* Background Slider Images with slowly zooming effect */}
        <div className="absolute inset-0 z-0 overflow-hidden hero-bg">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.bgImage}
                alt={`IMSR Campus Slide ${idx + 1}`}
                fill
                className={`object-cover object-center brightness-[0.42] ${
                  idx === activeSlide ? "animate-ken-burns" : ""
                }`}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Diagonal Light Leak overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent opacity-80 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-[15px] flex flex-col justify-center items-start min-h-[calc(100vh-180px)]">
          <div ref={textGroupRef} className="max-w-4xl flex flex-col items-start text-left text-white pr-4">
            
            {/* Giant Slogan (Header) */}
            <h1 className="hero-title-part font-display font-medium text-5xl sm:text-7xl md:text-[90px] tracking-tight leading-[0.85] text-white select-none flex flex-col items-start gap-y-0">
              <SplitText text={HERO_SLIDES[activeSlide].titleFirst} active={true} className="text-white" />
              <SplitText text={HERO_SLIDES[activeSlide].titleSecond} active={true} className="text-brand-secondary" />
            </h1>

            {/* CTA buttons group - One button per slide */}
            <div className="hero-cta mt-12 flex flex-wrap gap-4 items-center">
              {activeSlide === 0 && (
                <Link
                  href="#download-brochure"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6.5 h-[50px] rounded-full border border-white/20 bg-white/10 text-white font-kanit text-[15px] font-medium uppercase tracking-[0.4px] shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "50px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>DOWNLOAD BROCHURE</span>
                    <svg
                      className="w-4.5 h-4.5 group-hover:translate-y-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                </Link>
              )}

              {activeSlide === 1 && (
                <Link
                  href="#campus-tour"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6.5 h-[50px] rounded-full border border-white/20 bg-white/10 text-white font-kanit text-[15px] font-medium uppercase tracking-[0.4px] shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "50px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>VISIT CAMPUS</span>
                    <svg
                      className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </Link>
              )}

              {activeSlide === 2 && (
                <Link
                  href="#programs"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6.5 h-[50px] rounded-full border border-white/20 bg-white/10 text-white font-kanit text-[15px] font-medium uppercase tracking-[0.4px] shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "50px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>VIEW PROGRAM</span>
                    <svg
                      className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. INFINITE ADMISSIONS TICKER */}
      <AdmissionsTicker />

      {/* 4. ABOUT IMSR SECTION */}
      <AboutSection />

      {/* 6. OUR ACADEMIC PROGRAMS */}
      <Programs />

      {/* 5. STATS OVERVIEW SECTION */}
      <StatsOverview />



      {/* NEW: EXPLORE CAMPUS HORIZONTAL PINNED SCROLL SECTION */}
      <ExploreCampusHorizontal />

      {/* 6. STUDENT LIFE SECTION */}
      <section 
        id="student-life" 
        className="py-24 text-white relative z-20 overflow-hidden"
        style={{ background: "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79 7 65) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="flex flex-col items-center w-full">
            <MaskedHeading
              text="STUDENT LIFE"
              mediaType="video"
              src="/images/video.mp4"
              poster="/images/campus_explore.jpg"
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={18}
              brightness={1}
              saturation={1}
              grayscale={false}
              duration={1.1}
              stagger={0.17}
              align="center"
              weight={700}
              tracking={0.02}
              lineHeight={0.85}
              textScale={0.15}
              className="font-display uppercase text-[80px] md:text-[250px]"
              startTime={15}
              endTime={80}
            />
          </div>
          <ExperientialLearning />
        </div>
      </section>

      {/* 6.5. CAMPUS ACTIVITY MASONRY GALLERY */}
      <CampusActivity />

      {/* 7. INDUSTRY PLACEMENT */}
      <BbaPlacementSection />

      {/* 8. STUDENT TESTIMONIAL VIDEO SLIDER */}
      <StudentTestimonials />

      {/* 9. INDUSTRY PLACEMENT PARTNERS */}
      <PlacementPartners />

      {/* ADMISSIONS & CAREER BOOKING SECTION */}
      <BookingSection />

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <FAQs
        categories={[
          { name: "General", items: HOME_FAQS },
          { name: "Admissions", items: ADMISSIONS_FAQS },
          { name: "Campus Life", items: CAMPUS_LIFE_FAQS },
          { name: "Experiential Learning", items: EXPERIENTIAL_LEARNING_FAQS },
          { name: "Contact & Campuses", items: CONTACT_US_FAQS },
        ]}
        subtitle="Everything you need to know about FV - IMSR Admissions, Programmes, and Campus Life."
      />

      {/* 11. GLOBAL FOOTER */}
      <Footer />

      {/* BACK TO TOP FLOATING BUTTON */}
      <BackToTop />

      {/* 7. FULL-SCREEN SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-white text-zinc-900 flex flex-col items-center pt-24 px-[15px] transition-all duration-300">
          {/* Close button */}
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
            aria-label="Close search"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Content Container */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-start">
            {/* Search Input Box */}
            <div className="w-full h-[45px] flex items-center border border-[#00629f] rounded-lg overflow-hidden shadow-sm mb-8 bg-white">
              <input
                type="text"
                placeholder="Search programs, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow h-full px-[15px] text-[14px] font-normal outline-none bg-white text-zinc-800 font-sans"
                autoFocus
              />
              <button 
                onClick={() => {
                  // Trigger search logic or just show filtered results below
                }}
                className="bg-[#00629f] text-white font-sans font-medium text-sm px-8 h-full tracking-wider hover:bg-[#004e80] transition-colors flex items-center justify-center"
              >
                Search
              </button>
            </div>

            {/* If query is empty, show Trending Searches */}
            {!searchQuery ? (
              <div className="w-full flex flex-col items-start">
                <div className="w-full flex items-center gap-2 text-zinc-500 text-xs font-medium tracking-wider mb-6">
                  <svg className="w-4 h-4 text-[#00629f]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Trending Searches
                </div>

                <div className="w-full flex flex-col">
                  {[
                    "BBA (Hons.) In Business Administration",
                    "BBA (Hons.)* in Artificial Intelligence",
                    "B.Sc. (Hons.) in Digital Media & Growth Marketing",
                    "B.Com. Hons. in BA (Artificial Intelligence)",
                    "Diploma in Digital Media and Growth Marketing"
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(item)}
                      className="py-4 w-full flex justify-between items-center group text-left cursor-pointer hover:bg-zinc-50 px-2 transition-colors duration-200 border-none bg-transparent"
                    >
                      <span className="text-zinc-800 font-sans font-medium text-[15px] group-hover:text-brand-primary transition-colors duration-200">
                        {item}
                      </span>
                      <span className="text-[10px] text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full tracking-wider font-light">
                        Program
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // If query is present, show matching results
              <div className="w-full flex flex-col items-start">
                <div className="w-full text-zinc-500 text-xs font-medium tracking-wider mb-6">
                  Search Results for "{searchQuery}"
                </div>

                <div className="w-full flex flex-col max-h-[50vh] overflow-y-auto pr-2">
                  {PROGRAMS_DATA.filter((p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 ? (
                    PROGRAMS_DATA.filter((p) =>
                      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        className="py-5 w-full flex flex-col items-start gap-1 text-left px-2"
                      >
                        <div className="w-full flex justify-between items-start gap-4">
                          <span className="text-zinc-900 font-sans font-medium text-[16px] hover:text-brand-primary transition-colors duration-200">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full tracking-wider font-light whitespace-nowrap">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-zinc-500 font-sans text-sm font-light leading-relaxed max-w-2xl mt-1">
                          {item.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-zinc-500 text-sm font-light w-full text-center">
                      No programs or courses found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
