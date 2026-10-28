"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { ProgramConfig } from "@/data/programsData";

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

export default function ProgramHeroSection({ config }: { config: ProgramConfig }) {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading text reveal
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

      // 2. Elements fade up
      gsap.fromTo(
        ".hero-fade-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
    >
      {/* HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={config?.heroImage || "/images/programs/bba-In-business-administration/program-bg.jpg"}
          alt={`${config?.title || "Program"} Background`}
          fill
          className="object-cover object-center opacity-85 brightness-95"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-zinc-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
        
        {/* BREADCRUMB */}
        <div className="hero-fade-item flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-600" />
          <Link href="/#programs" className="hover:text-white transition-colors">
            Programs
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-600" />
          <span className="text-zinc-200 font-medium truncate">
            {config?.breadcrumbTitle || config?.title}
          </span>
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-4xl w-full flex flex-col items-start text-left">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="flex flex-col gap-2">
            
            {/* MAIN TITLE */}
            <h1
              ref={headingRef}
              className="font-display font-medium text-[32px] sm:text-[48px] tracking-tight leading-[45px] text-white text-left mb-6"
            >
              <SplitText text={config?.heroPrefix || ""} />
              <br className="hidden sm:inline" />
              <span
                className="font-medium inline-block pb-1 italic font-serif fade-up-scroll pr-3 opacity-0"
                style={{
                  background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {config?.heroHighlight || ""}
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="hero-fade-item text-zinc-300 font-sans font-light text-[18px] leading-relaxed max-w-3xl mb-4 text-left">
              {config?.heroDescription || ""}
            </p>

            {/* CTA BUTTONS */}
            <div className="hero-fade-item flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="#apply"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00629f] to-[#00bcda] text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:opacity-95 transition-all duration-300 shadow-lg shadow-[#00629f]/25 flex items-center gap-2 group"
              >
                APPLY NOW FOR 2027
                <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="#curriculum"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-kanit font-medium text-[15px] uppercase tracking-[0.4px] transition-all duration-300 shadow-md flex items-center gap-2 group"
              >
                DOWNLOAD BROCHURE
                <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-zinc-950" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
