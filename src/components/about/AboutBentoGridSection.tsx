"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  { name: "MKES", logo: "/images/collaboration-partner/mkes.png" },
  { name: "RADAV", logo: "/images/collaboration-partner/radav.png" },
  { name: "RAV", logo: "/images/collaboration-partner/rav.webp" },
  { name: "TSAP", logo: "/images/collaboration-partner/TSAP.png" },
];

const AWARD_LOGOS = [
  { name: "IMSR Award", logo: "/images/award/award.avif" },
  { name: "Education Excellence Award", logo: "/images/award/award.avif" },
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

            {/* Bottom Group: Logo boxes + Office Branch (Left) AND 70+ Team Members (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 flex-grow">
              
              {/* Sub-col Left: Small Logo Cards + Awards */}
              <div className="sm:col-span-6 flex flex-col gap-5">
                
                {/* Awards Marquee (Shows 2 in a row) */}
                <div className="bento-card w-[226px] sm:w-[246px] overflow-hidden rounded-[5px] select-none">
                  <div
                    className="flex items-center gap-4 w-max hover:[animation-play-state:paused]"
                    style={{ animation: "marquee 16s linear infinite" }}
                  >
                    {[...AWARD_LOGOS, ...AWARD_LOGOS, ...AWARD_LOGOS, ...AWARD_LOGOS].map((item, idx) => (
                      <div
                        key={idx}
                        className="w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] bg-[#f4f4f5] rounded-[5px] flex items-center justify-center shrink-0 shadow-sm p-3 relative overflow-hidden transition-transform duration-300 hover:scale-105 border border-zinc-200/60"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 105px, 115px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards Card */}
                <div className="bento-card bg-[#e5edff] rounded-[28px] p-6 sm:p-7 flex flex-col justify-center gap-3 flex-grow min-h-[220px]">
                  <h3 className="font-display text-[28px] sm:text-[32px] font-medium tracking-tight text-zinc-950 leading-none">
                    Awards
                  </h3>
                  <p className="text-zinc-700 text-[18px] leading-relaxed font-light">
                    Ranked 1st by EducationWorld Grand Jury India in the Emerging Study Programmes category for the 2025–26 rankings.
                  </p>
                </div>

              </div>

              {/* Sub-col Right: Vivid Orange Card (20+ Team members) */}
              <div className="sm:col-span-6 bento-card bg-[#d97706] text-white rounded-[28px] p-8 flex flex-col justify-between min-h-[350px]">
                <span className="font-display text-[48px] font-medium tracking-tight text-white">
                  70+
                </span>
                <div>
                  <h3 className="font-display font-medium text-2xl text-white mb-3">
                    Team Members
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

                {/* 4 Campuses Card */}
                <div className="bento-card bg-[#f4f4f5] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between flex-1 min-h-[185px]">
                  <span className="font-display text-[48px] font-medium tracking-tight text-zinc-950 leading-none">
                    4
                  </span>
                  
                  <div>
                    <h3 className="font-display font-medium text-2xl text-black mb-1">
                      Campuses
                    </h3>
                    <p className="text-zinc-600 text-[18px] leading-relaxed font-light">
                      Fostering academic excellence and industry immersion across premiere educational hubs.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Row Right: Femina Banner Image Card (Clickable with Apply Now Overlay Strip) */}
            <Link
              href="/#apply"
              className="bento-card relative w-full h-[240px] sm:h-[270px] rounded-[28px] overflow-hidden group shadow-sm border border-zinc-100 block cursor-pointer bg-zinc-950"
            >
              <Image
                src="/images/femina-banner.jpg"
                alt="Femina Banner - Apply Now"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Bottom Dark Overlay Strip - Image visible underneath with button pill */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 py-4 pt-14 flex items-end">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-zinc-950 font-kanit font-medium text-[14px] sm:text-[15px] uppercase tracking-wider shadow-lg transition-all duration-300 group-hover:bg-[#d4f000] group-hover:scale-[1.03]">
                  <span>Apply Now</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center transition-colors">
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
