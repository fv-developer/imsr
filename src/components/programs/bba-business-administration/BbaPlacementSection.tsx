"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudentPlacementData {
  id: number;
  name: string;
  photo: string;
  company: string;
  companyLogoBg: string;
  package: string;
  role: string;
  batch: string;
  location: string;
}

const STUDENTS_PLACED_DATA: StudentPlacementData[] = [
  {
    id: 1,
    name: "Pooja Sharma",
    photo: "/images/New folder/Pooja.webp",
    company: "Google",
    companyLogoBg: "from-[#4285F4] to-[#34A853]",
    package: "₹52.0 LPA",
    role: "Associate Product Manager",
    batch: "BBA (Hons.) 2024",
    location: "Bengaluru, India",
  },
  {
    id: 2,
    name: "James Wilson",
    photo: "/images/New folder/James.webp",
    company: "Microsoft",
    companyLogoBg: "from-[#00A4EF] to-[#7FBA00]",
    package: "₹34.5 LPA",
    role: "Strategy & Tech Consultant",
    batch: "BBA (Hons.) 2024",
    location: "Hyderabad, India",
  },
  {
    id: 3,
    name: "Suvidha Verma",
    photo: "/images/New folder/Suvidha.webp",
    company: "McKinsey & Co.",
    companyLogoBg: "from-[#00205B] to-[#00529B]",
    package: "₹28.0 LPA",
    role: "Junior Associate Consultant",
    batch: "BBA 2024",
    location: "Mumbai, India",
  },
  {
    id: 4,
    name: "Gunjan Mehta",
    photo: "/images/New folder/Gunjan.webp",
    company: "Goldman Sachs",
    companyLogoBg: "from-[#7399C6] to-[#1D4ED8]",
    package: "₹26.5 LPA",
    role: "Financial Analyst",
    batch: "BBA (Hons.) 2024",
    location: "Bengaluru, India",
  },
  {
    id: 5,
    name: "Aarav Patel",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    company: "Amazon",
    companyLogoBg: "from-[#FF9900] to-[#FF6600]",
    package: "₹24.0 LPA",
    role: "Operations Strategy Lead",
    batch: "BBA 2024",
    location: "Gurugram, India",
  },
  {
    id: 6,
    name: "Ananya Deshmukh",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    company: "Deloitte Digital",
    companyLogoBg: "from-[#86BC25] to-[#111111]",
    package: "₹22.5 LPA",
    role: "Business Transformation Analyst",
    batch: "BBA (Hons.) 2024",
    location: "Mumbai, India",
  },
  {
    id: 7,
    name: "Rohan Gupta",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    company: "BCG",
    companyLogoBg: "from-[#008651] to-[#005030]",
    package: "₹31.0 LPA",
    role: "Management Consultant",
    batch: "BBA 2024",
    location: "New Delhi, India",
  },
  {
    id: 8,
    name: "Vikramaditya Shah",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    company: "J.P. Morgan",
    companyLogoBg: "from-[#111111] to-[#333333]",
    package: "₹29.5 LPA",
    role: "Corporate Banking Analyst",
    batch: "BBA (Hons.) 2024",
    location: "Mumbai, India",
  },
];

function CompanyLogo({ company }: { company: string }) {
  if (company === "Google") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }
  if (company === "Microsoft") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23">
        <path fill="#f35325" d="M1 1h10v10H1z"/>
        <path fill="#81bc06" d="M12 1h10v10H12z"/>
        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
        <path fill="#ffba08" d="M12 12h10v10H12z"/>
      </svg>
    );
  }
  if (company === "McKinsey & Co.") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#00205B" />
        <path fill="#ffffff" d="M4 6h3.5l2.5 6 2.5-6H16v12h-3v-7.2L10.7 18H9.3L7 10.8V18H4V6z" />
      </svg>
    );
  }
  if (company === "Goldman Sachs") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#7399C6" />
        <text x="12" y="15" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">GS</text>
      </svg>
    );
  }
  if (company === "Amazon") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#232F3E" />
        <path fill="#FF9900" d="M16.5 16c-2.8 1.4-6.6 1.8-9.8.4-.4-.2-.8.2-.5.5 3.3 2.1 8.2 1.8 11.2-.2.3-.2.1-.8-.4-.7zm1.3-1.4c-.2-.3-1.1-.1-1.5.1s-.4.6-.2.9c.2.3 1.3.3 1.7-.1.4-.4.2-.6 0-.9z"/>
        <path fill="#ffffff" d="M13.2 11.5c0-1.1-.6-1.7-1.6-1.7-.9 0-1.6.6-1.8 1.5h-1.2c.2-1.5 1.5-2.6 3.1-2.6 1.9 0 2.9 1.1 2.9 2.7v3.5c0 .7.2 1 .5 1 .3 0 .6-.2.8-.5l.8.8c-.5.7-1.2 1.1-2 1.1-.9 0-1.4-.5-1.4-1.4v-.5c-.5.6-1.1 1-2 1-1.4 0-2.3-.9-2.3-2.1 0-1.4 1.2-2.2 3.1-2.2h1.1v-.3zm-1.2 2.6c.7 0 1.2-.3 1.2-.8v-.6h-1c-.8 0-1.4.3-1.4.9 0 .5.5.8 1.2.8z"/>
      </svg>
    );
  }
  if (company === "Deloitte Digital") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#111111" />
        <text x="5" y="16" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">D</text>
        <circle cx="17" cy="15" r="2" fill="#86BC25" />
      </svg>
    );
  }
  if (company === "BCG") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#008651" />
        <text x="12" y="15" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">BCG</text>
      </svg>
    );
  }
  if (company === "J.P. Morgan") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1e293b" />
        <text x="12" y="15" fill="#ffffff" fontSize="7.5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">JPM</text>
      </svg>
    );
  }

  return (
    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-xs font-bold text-white">
      {company.charAt(0)}
    </div>
  );
}

export default function BbaPlacementSection() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // GSAP Entry Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".placement-anim");
      elements?.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
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

  // Auto-slide placement cards carousel with loop & hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current || !carouselRef.current) return;

      const container = carouselRef.current;
      const cardWidth = 360;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="industry-placement"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isPaused.current = false;
      }}
      className="py-20 md:py-28 text-white relative overflow-hidden font-sans bg-[#222] group/section select-none"
    >
      {/* INTERACTIVE MOUSE SPOTLIGHT GLOW EFFECT */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 188, 218, 0.18), rgba(66, 211, 146, 0.1), transparent 70%)`,
        }}
      />

      {/* BACKGROUND DECORATIVE AMBIENT GLOWS & GRID PATTERN EFFECT */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00629f]/15 rounded-full blur-[140px] transition-transform duration-700 group-hover/section:scale-110" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#00bcda]/15 rounded-full blur-[150px] transition-transform duration-700 group-hover/section:scale-110" />
        
        {/* SVG GRID PATTERN EFFECT */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: 0.10,
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
          }}
        >
          <svg className="w-full h-full" width="100%" height="100%">
            <pattern id="industry-section-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#industry-section-grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* STUDENTS PLACED CAROUSEL */}
        <div className="w-full">
          {/* HEADER & NAVIGATION CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div className="max-w-2xl">
              <h3
                className="placement-anim font-display font-medium tracking-tight text-white mb-3"
                style={{ fontSize: "48px", lineHeight: "54px" }}
              >
                Industry{" "}
                <span
                  className="italic font-serif pr-2 inline-block"
                  style={{
                    background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Placement
                </span>
              </h3>
              <p
                className="placement-anim text-zinc-300 font-light leading-relaxed"
                style={{ fontSize: "18px" }}
              >
                Discover where our top BBA graduates are building high-impact careers across leading global tech companies, strategy consultancies, and financial institutions.
              </p>
            </div>

            {/* CAROUSEL NAVIGATION ARROWS */}
            <div className="placement-anim flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollCarousel("left")}
                aria-label="Previous Student"
                className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-zinc-950 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                aria-label="Next Student"
                className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-zinc-950 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SMOOTH HORIZONTAL CAROUSEL */}
          <div
            ref={carouselRef}
            className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {STUDENTS_PLACED_DATA.map((student) => (
              <div
                key={student.id}
                className="placement-anim snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-2xl hover:border-white/30 hover:bg-white/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-white"
              >
                {/* TOP BRAND ACCENT BAR */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${student.companyLogoBg}`} />

                <div>
                  {/* STUDENT PHOTO + CTC PACKAGE BADGE */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 bg-white/5">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    {/* CTC PACKAGE BADGE */}
                    <div className="inline-flex flex-col items-end">
                      <span className="text-[13px] uppercase font-medium tracking-wider text-white mb-0.5">
                        PACKAGE CTC
                      </span>
                      <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-sans font-medium text-sm md:text-base rounded-full shadow-xs">
                        {student.package}
                      </span>
                    </div>
                  </div>

                  {/* STUDENT NAME & ROLE */}
                  <h4 className="font-display font-medium text-lg sm:text-xl text-white group-hover:text-[#00bcda] transition-colors mb-1">
                    {student.name}
                  </h4>
                  <p className="text-[16px] font-normal text-white mb-3 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#00bcda] shrink-0" />
                    {student.role}
                  </p>
                </div>

                {/* FOOTER COMPANY & BATCH INFO */}
                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center shrink-0 p-1 shadow-xs">
                      <CompanyLogo company={student.company} />
                    </div>
                    <span className="text-xs font-semibold text-white truncate">
                      {student.company}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-normal shrink-0">
                    {student.batch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
