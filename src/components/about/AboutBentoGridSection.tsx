"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLABORATION_LOGOS = [
  { name: "BKBC", logo: "/images/collaboration-partner/bkbc.png" },
  { name: "MKES", logo: "/images/collaboration-partner/mkes.png" },
  { name: "RADAV", logo: "/images/collaboration-partner/radav.png" },
  { name: "RAV", logo: "/images/collaboration-partner/rav.webp" },
  { name: "TCSC", logo: "/images/collaboration-partner/tcsc.png" },
];

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
    <section ref={containerRef} className="w-full bg-white py-16 md:py-24 border-t border-zinc-100 font-sans select-none">
      {/* CUSTOM SWIPER PAGINATION STYLES */}
      <style jsx global>{`
        .collaboration-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #71717a;
          opacity: 0.4;
          margin: 0 4px !important;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .collaboration-pagination .swiper-pagination-bullet-active {
          background: #00629f;
          opacity: 1;
          width: 18px;
          border-radius: 4px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BENTO GRID MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ================= LEFT 6-COL BLOCK ================= */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Top Row: Campus Tour Video */}
            <div className="bento-card relative w-full h-[260px] sm:h-[300px] rounded-[28px] overflow-hidden group shadow-sm border border-zinc-100 bg-black">
              <video
                src="/images/campus-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Bottom Overlay Strip */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-4 pt-12 flex items-end">
                <h3 className="font-display font-medium text-2xl text-white tracking-tight">
                  Campus Tour
                </h3>
              </div>
            </div>

            {/* Bottom Group: Logo boxes + Office Branch (Left) AND 20+ Team members (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 flex-grow">
              
              {/* Sub-col Left: Small Logo Cards + 2 Global Campuses */}
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

                {/* 2 Global Campuses Card */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-7 flex flex-col justify-between flex-grow min-h-[220px]">
                  <span className="font-display text-[48px] font-medium tracking-tight text-zinc-950">
                    2
                  </span>
                  
                  <div>
                    <h3 className="font-display font-medium text-2xl text-black mb-1">
                      Global Campuses
                    </h3>
                    <p className="text-zinc-600 text-[18px] leading-relaxed font-light">
                      Fostering academic excellence and industry immersion across premiere educational hubs.
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
            
            {/* Top Row Right: University Affiliation + Collaboration Partners & Awards */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              
              {/* Affiliation Card (Dark Blue) */}
              <div className="sm:col-span-6 bento-card bg-[#033d62] text-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
                <div>
                  {/* University of Mumbai Logo Container (Centered) */}
                  <div className="w-full h-[140px] flex items-center justify-center mb-4">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/affiliation-partner/University_of_Mumbai.png"
                        alt="University of Mumbai Affiliation Logo"
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-2xl text-white mt-1 mb-2">
                    Affiliation with University of Mumbai
                  </h3>
                </div>

                <div>
                  <p className="text-white/90 text-[18px] leading-relaxed font-light mt-1">
                    We are committed to delivering industry-focused education, practical learning, and meaningful experiences that prepare students for the future of business.
                  </p>
                </div>
              </div>

              {/* Right Side Column (Collaboration Partners Swiper + Awards) */}
              <div className="sm:col-span-6 flex flex-col gap-5">
                
                {/* Our Collaboration Partner Card with Swiper Logo Auto-Slider & External Pagination Dots */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between flex-1 min-h-[220px] border border-zinc-200/60 overflow-hidden">
                  <div>
                    <h3 className="font-display text-[22px] sm:text-[24px] font-medium tracking-tight text-zinc-950 mb-3">
                      Collaboration Partners
                    </h3>
                    
                    {/* Swiper Auto-Slide Logo Carousel */}
                    <div className="w-full h-[85px] bg-white rounded-2xl p-2 border border-zinc-200/80 shadow-sm overflow-hidden flex items-center justify-center relative">
                      <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2200, disableOnInteraction: false }}
                        pagination={{ el: ".collaboration-pagination", clickable: true }}
                        loop={true}
                        slidesPerView={1}
                        className="w-full h-full"
                      >
                        {COLLABORATION_LOGOS.map((partner, idx) => (
                          <SwiperSlide key={idx} className="flex items-center justify-center h-full">
                            <div className="relative w-full h-[65px] flex items-center justify-center p-1">
                              <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>

                  {/* External Swiper Pagination Container (Outside logo box) */}
                  <div className="collaboration-pagination flex justify-center items-center mt-3 h-4" />
                </div>

                {/* Awards Card */}
                <div className="bento-card bg-[#e5edff] rounded-[28px] p-6 sm:p-7 flex flex-col justify-center gap-3 flex-1 min-h-[185px]">
                  <h3 className="font-display text-[28px] sm:text-[32px] font-medium tracking-tight text-zinc-950 leading-none">
                    Awards
                  </h3>
                  <p className="text-zinc-700 text-[18px] leading-relaxed font-light">
                    Ranked 1st by EducationWorld Grand Jury India in the Emerging Study Programmes category for the 2025–26 rankings.
                  </p>
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
