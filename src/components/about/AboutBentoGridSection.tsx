"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutBentoGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".bento-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: (index % 5) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-16 md:py-24 border-t border-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BENTO GRID MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ================= LEFT 6-COL BLOCK ================= */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Top Row: Meeting Image */}
            <div className="bento-card relative w-full h-[260px] sm:h-[300px] rounded-[28px] overflow-hidden group shadow-sm border border-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Executive Boardroom Meeting"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Group: Logo boxes + Office Branch (Left) AND 20+ Team members (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 flex-grow">
              
              {/* Sub-col Left: Small Logo Cards + 2 Office Branch */}
              <div className="sm:col-span-6 flex flex-col gap-5">
                
                {/* 2 Small Logo Boxes */}
                <div className="flex items-center gap-4">
                  {/* Blue Logo Box (Behance style) */}
                  <div className="bento-card w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] bg-[#0052ff] rounded-[24px] flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform duration-300">
                    <span className="font-display font-extrabold text-white text-3xl tracking-tighter">Bē</span>
                  </div>
                  {/* Light Gray Logo Box (Play/Media style) */}
                  <div className="bento-card w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] bg-[#f4f4f5] rounded-[24px] flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-[#00629f]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                </div>

                {/* 2 Office Branch Card */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-7 flex flex-col justify-between flex-grow min-h-[220px]">
                  <span className="font-display text-[48px] font-medium tracking-tight text-zinc-950">
                    2
                  </span>
                  
                  <div>
                    <h3 className="font-display font-medium text-2xl text-black mb-0">
                    Collaboration Partner
                  </h3>
                    <p className="text-zinc-600 text-[18px] leading-relaxed font-light">
                      Our office fosters creativity and innovation across 7 global locations.
                    </p>
                  </div>
                </div>

              </div>

              {/* Sub-col Right: Vivid Orange Card (20+ Team members) */}
              <div className="sm:col-span-6 bento-card bg-[#d97706] text-white rounded-[28px] p-8 flex flex-col justify-between min-h-[350px]">
                <span className="font-display text-[48px] font-medium tracking-tight text-white">
                  20+
                </span>
                <div>
                  <h3 className="font-display font-medium text-2xl text-white mb-3">
                    Team members
                  </h3>
                  <p className="text-white/90 text-[18px] leading-relaxed font-light">
                    Our team is committed to delivering exceptional results with unwavering dedication. We collaborate closely to ensure every project exceeds expectations.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT 6-COL BLOCK ================= */}
          <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
            
            {/* Top Row Right: 30+ Programs (Black) + Vision & Mission (Light) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              
              {/* 30+ Programs Card (Dark Black) */}
              <div className="sm:col-span-6 bento-card bg-[#033d62] text-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[380px]">
                <span className="font-display text-[30px] font-medium tracking-tight text-white">
                  Affiliation with
                </span>
                <div>
                  <h3 className="font-display font-medium text-2xl text-white mb-3">
                   University of Mumbai
                  </h3>
                  <p className="text-white-400 text-[18px] leading-relaxed font-light text-white">
                    We are committed to excellence and continuous improvement in every project. Our passion drives us to consistently deliver outstanding results.
                  </p>
                </div>
              </div>

              {/* Right Side Column (Vision + Mission) */}
              <div className="sm:col-span-6 flex flex-col gap-5">
                
                {/* Vision Card */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between flex-1 min-h-[185px]">
                  <span className="font-display text-[48px] font-medium tracking-tight text-zinc-950">
                    Vision
                  </span>
                  <div>
                    <p className="text-zinc-600 text-[18px] leading-relaxed font-light mt-3">
                      To deliver innovative solutions that enhance everyday life through user-centric design.
                    </p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between flex-1 min-h-[185px]">
                  <span className="font-display text-[48px] font-medium tracking-tight text-zinc-950">
                    Mission
                  </span>
                  <div>
                    <p className="text-zinc-600 text-[18px] leading-relaxed font-light mt-3">
                      Achieve remarkable returns with our proven strategies, delivering a 500% ROI.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Row Right: Workspace / Lounge Image Card */}
            <div className="bento-card relative w-full h-[240px] sm:h-[270px] rounded-[28px] overflow-hidden group shadow-sm border border-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="Modern Workspace Lounge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
