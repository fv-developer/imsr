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
  batch?: string;
}

const STUDENTS_PLACED_DATA: StudentPlacementData[] = [
  {
    id: 1,
    name: "Dhruv Modi",
    photo: "/images/industry-placment/Dhruv Modi.png",
    company: "OPENEDGE EDUCATION LLP",
    companyLogoBg: "from-[#00bcda] to-[#00629f]",
    package: "4.2 LPA",
    role: "Career Development Executive",
    batch: "BBA 2024",
  },
  {
    id: 2,
    name: "Moksh Jain",
    photo: "/images/industry-placment/Moksh Jain.png",
    company: "Tripkartz",
    companyLogoBg: "from-[#42d392] to-[#00a876]",
    package: "3 LPA",
    role: "Marketing Executive",
    batch: "BBA 2024",
  },
  {
    id: 3,
    name: "Shivpriya Pandey",
    photo: "/images/industry-placment/Shivpriya_Pandey-removebg-preview.png",
    company: "Avocation Educational Services Pvt. Ltd. (Yocket)",
    companyLogoBg: "from-[#f59e0b] to-[#ea580c]",
    package: "6.5 LPA",
    role: "Business Development Executive",
    batch: "BBA 2024",
  },
  {
    id: 4,
    name: "Bhumi Mishra",
    photo: "/images/industry-placment/Bhumi Mishra.png",
    company: "Messe Muechen",
    companyLogoBg: "from-[#ec4899] to-[#a855f7]",
    package: "4,04,560",
    role: "Brand Executive - MARCOM",
    batch: "BBA 2024",
  },
  {
    id: 5,
    name: "Suyash Tiwari",
    photo: "/images/industry-placment/Suyash Tiwari.png",
    company: "Calvin Klein",
    companyLogoBg: "from-[#3b82f6] to-[#1d4ed8]",
    package: "4 LPA",
    role: "Customer Relations Officer",
    batch: "BBA 2024",
  },
  {
    id: 6,
    name: "Utsavi Mehta",
    photo: "/images/new-folder/Gunjan.webp",
    company: "Adapt Fintech Advisors Private Limited",
    companyLogoBg: "from-[#10b981] to-[#059669]",
    package: "3.6 LPA",
    role: "Business Development Executive",
    batch: "BBA 2024",
  },
];

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
      className="py-20 md:py-28 text-white relative overflow-hidden font-sans group/section select-none"
      style={{ background: "linear-gradient(178deg, rgba(93, 212, 231, 1) 0%, rgba(0, 147, 126, 1) 100%)" }}
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
                className="placement-anim font-display font-medium tracking-tight text-white mb-3 text-[30px] sm:text-[48px] leading-[34px] sm:leading-[54px]"
              >
                Industry{" "}
                <span
                  className="italic font-serif pr-2 inline-block text-[#222]"
                  style={{ color: "#222" }}
                >
                  Placement
                </span>
              </h3>
              <p
                className="placement-anim text-white/90 font-light leading-relaxed"
                style={{ fontSize: "18px" }}
              >
                IMSR provided the perfect launchpad for my career. The practical training sessions gave me real-world business context that set me apart during placements.
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
                className="placement-anim snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-[#004c43] border border-white/15 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-2xl hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-white"
                style={{ backgroundColor: "#004c43" }}
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
                  <p className="text-[15px] font-normal text-white/90 mb-3 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#00bcda] shrink-0" />
                    {student.role}
                  </p>
                </div>

                {/* FOOTER COMPANY & BATCH INFO (NO LOGO, ONLY COMPANY NAME) */}
                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-white/95 truncate" title={student.company}>
                    {student.company}
                  </span>
                  {student.batch && (
                    <span className="text-[11px] text-white/60 font-normal shrink-0">
                      {student.batch}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
