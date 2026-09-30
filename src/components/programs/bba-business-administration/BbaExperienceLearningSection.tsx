"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextScrollAnimation } from "@/components/ui/text-scroll-animation";
import { Play, ArrowUpRight, X } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlideItem {
  image: string;
}

interface StackCardData {
  id: number;
  type: "video" | "slider" | "image";
  title: string;
  speaker: string;
  description: string;
  image?: string;
  videoUrl?: string;
  slides?: SlideItem[];
}

// Data sourced from Home Page Experiential Learning section
// 1 Video Card, 1 Swiper Slider Card, remaining cards use Single Images
const STACK_CARDS_DATA: StackCardData[] = [
  {
    id: 1,
    type: "video",
    title: "Entrepreneurship In Event Industry",
    speaker: "Ms. Pooja Vaidya",
    description: "An intensive masterclass on developing leadership, innovation, and key entrepreneurial ventures across the global event management space.",
    image: "/images/new-folder/Pooja.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    type: "slider",
    title: "Visit To Parle & Jayesh Industries",
    speaker: "Industrial Experience Mandates",
    description: "Across global business hubs and plant floors, experience how companies build, scale, and operate in different commercial markets.",
    slides: [
      { image: "/images/new-folder/PARLE.jpg" },
      { image: "/images/hero-slider/hero-slider1.jpg" },
      { image: "/images/hero-slider/hero-slider2.jpg" },
    ],
  },
  {
    id: 3,
    type: "image",
    title: "Fashion Communication & Fashion Entrepreneurship",
    speaker: "Ms. Suvidha Joshi Patil",
    description: "Insights into luxury fashion media, brand positioning, creative direction, and establishing sustainable business models in luxury retail.",
    image: "/images/new-folder/Suvidha.webp",
  },
  {
    id: 4,
    type: "image",
    title: "Business Etiquette For The Modern Workplace",
    speaker: "Mr. James Fernandes",
    description: "Hands-on corporate workshop focusing on executive communications, cross-cultural ethics, professional presence, and boardroom conduct.",
    image: "/images/new-folder/James.webp",
  },
  {
    id: 5,
    type: "image",
    title: "Stress Management & Executive Resilience",
    speaker: "Ms. Gunjan Sidhu",
    description: "Practical mindfulness techniques, mental resilience building, and emotional intelligence strategies for high-performance corporate careers.",
    image: "/images/new-folder/Gunjan.webp",
  },
  {
    id: 6,
    type: "image",
    title: "Beach Yoga & Holistic Vitality Retreat",
    speaker: "Wellness & Life Skills Division",
    description: "Morning wellness retreats promoting holistic health, team building, and physical vitality amidst open seaside surroundings.",
    image: "/images/new-folder/Beach.webp",
  },
  {
    id: 7,
    type: "image",
    title: "Case Study Competition & Hackathon",
    speaker: "Academic Excellence Board",
    description: "Competitive hackathons and case study challenges where students analyze real-world corporate dilemmas and present strategic solutions.",
    image: "/images/new-folder/CASE-STUDY.webp",
  },
];

export default function BbaExperienceLearningSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // GSAP ScrollTrigger Card Stacking Effect matching Home Page
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>(".bba-stack-card");
    const cardsWrapper = containerRef.current.querySelector<HTMLElement>(".bba-cards-stack-wrapper");
    if (!cards.length || !cardsWrapper) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          gsap.to(card, {
            scale: 0.88,
            opacity: 0,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 140px",
              endTrigger: nextCard,
              end: "top 140px",
              scrub: true,
              pin: true,
              pinSpacing: false,
            },
          });
        } else {
          ScrollTrigger.create({
            trigger: card,
            start: "top 140px",
            endTrigger: cardsWrapper,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience-learning"
      className="w-full relative bg-white pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden font-sans select-none"
    >
      {/* CUSTOM SWIPER & GSAP STYLES */}
      <style jsx global>{`
        .bba-cards-stack-wrapper .pin-spacer {
          margin-left: auto !important;
          margin-right: auto !important;
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
        .bba-experiential-swiper .swiper-pagination {
          bottom: 16px !important;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: auto !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .bba-experiential-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .bba-experiential-swiper .swiper-pagination-bullet-active {
          background: #ffffff !important;
          width: 22px !important;
          border-radius: 9999px !important;
        }
      `}</style>

      {/* TEAL GLOW RIGHT BACKGROUND EFFECT */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top right,
              rgba(56, 193, 182, 0.40),
              transparent 70%
            )
          `,
          filter: "blur(90px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center w-full">
        
        {/* HEADING SECTION */}
        <div className="exp-fade mb-12 md:mb-16 overflow-hidden w-full flex justify-center text-center">
          <TextScrollAnimation
            text="Experiential Learning"
            className="py-0"
          />
        </div>

        {/* STACKED CARDS CONTAINER (MAX-W 1100PX CENTERED) */}
        <div className="bba-cards-stack-wrapper w-full max-w-[1100px] mx-auto space-y-8 lg:space-y-12 relative flex flex-col items-center">
          {STACK_CARDS_DATA.map((card) => {
            return (
              <div
                key={card.id}
                className="bba-stack-card w-full max-w-[1100px] mx-auto bg-white rounded-3xl p-[30px] shadow-2xl border border-zinc-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center origin-top"
              >
                {/* LEFT MEDIA COLUMN */}
                <div className="lg:col-span-6 w-full">
                  {/* VIDEO MEDIA CARD (ONLY CARD 1) */}
                  {card.type === "video" && card.image && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group bg-zinc-950">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                      
                      {/* HIGH-IMPACT PLAY BUTTON */}
                      <div
                        onClick={() => card.videoUrl && setActiveVideo(card.videoUrl)}
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group/play z-20"
                      >
                        {/* Outer Radar Ripple animation ring */}
                        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/40 animate-ping opacity-30 pointer-events-none" />
                        
                        {/* Ambient Blur Glow */}
                        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 blur-md group-hover/play:scale-125 transition-transform duration-500 pointer-events-none" />

                        {/* Main Glassmorphic Play Disc */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover/play:scale-110 group-hover/play:bg-white group-hover/play:text-zinc-950 group-hover/play:border-white transition-all duration-300">
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5 group-hover/play:translate-x-0.5 transition-transform" />
                        </div>

                        {/* Watch Video Micro Badge */}
                        <div className="mt-3 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white opacity-90 group-hover/play:opacity-100 group-hover/play:scale-105 transition-all duration-300 pointer-events-none shadow-md">
                          Watch Video
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SWIPER SLIDER CARD (ONLY CARD 2) */}
                  {card.type === "slider" && card.slides && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-zinc-950">
                      <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        speed={800}
                        className="bba-experiential-swiper w-full h-full rounded-2xl"
                      >
                        {card.slides.map((slide, sIdx) => (
                          <SwiperSlide key={sIdx} className="relative w-full aspect-[4/3]">
                            <Image
                              src={slide.image}
                              alt={card.title}
                              fill
                              className="object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}

                  {/* SINGLE IMAGE CARDS (CARDS 3, 4, 5, 6, 7) */}
                  {card.type === "image" && card.image && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group bg-zinc-950">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                    </div>
                  )}
                </div>

                {/* RIGHT CONTENT COLUMN */}
                <div className="lg:col-span-6 flex flex-col justify-center items-start w-full">
                  
                  {/* TITLE / HEADING */}
                  <h3
                    className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-zinc-950 tracking-tight mb-2"
                    style={{ lineHeight: "30px" }}
                  >
                    {card.title}
                  </h3>

                  {/* SPEAKER / SUBTITLE */}
                  {card.speaker && (
                    <p className="text-xs sm:text-sm font-sans font-semibold text-[#00629f] italic uppercase tracking-wider mb-4">
                      {card.speaker}
                    </p>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-zinc-600 font-sans font-light text-sm sm:text-base leading-relaxed mb-8">
                    {card.description}
                  </p>

                  {/* SINGLE EXPLORE MORE BUTTON */}
                  <div>
                    <button
                      onClick={() => {
                        if (card.videoUrl) setActiveVideo(card.videoUrl);
                      }}
                      className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                    >
                      <span>Explore More</span>
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* VIDEO PREVIEW MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              aria-label="Close Video"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`${activeVideo}?autoplay=1`}
              title="Experiential Masterclass Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
