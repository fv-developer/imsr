"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  categoryId?: string;
}

// Data sourced from Home Page Experiential Learning section
// 1 Video Card, 1 Swiper Slider Card, remaining cards use Single Images
const STACK_CARDS_DATA: StackCardData[] = [
  // 1. MASTERCLASS (2 items: 1 Video, 1 Swiper Slider)
  {
    id: 1,
    type: "video",
    title: "Digital Marketing Careers In The AI Era",
    speaker: "Mr. Viken Shah (Founder, Jaybee Digital)",
    categoryId: "master-class",
    description: "IMSR hosted an insightful masterclass on Digital Marketing Careers in the AI Era, exploring essential digital skills, freelancing opportunities, and real-world marketing challenges.",
    image: "/images/experiential-learning/masterclass/viken-shah-1.jpg",
    videoUrl: "/images/experiential-learning/masterclass/viken-shah-video.mp4",
  },
  {
    id: 2,
    type: "slider",
    title: "AI & Digital Transformation: Shaping Customer Experience",
    speaker: "Mr. Unnat Khetan",
    categoryId: "master-class",
    description: "An inspiring masterclass bridging classroom learning with practical applications in digital transformation, consulting careers, and AI-enabled customer experiences.",
    slides: [
      { image: "/images/experiential-learning/masterclass/unnat-khetan-1.jpg" },
      { image: "/images/experiential-learning/masterclass/unnat-khetan-2.jpg" },
    ],
  },

  // 2. SPORTS CLUB (2 items, single images)
  {
    id: 3,
    type: "image",
    title: "Apex Badminton League 2026",
    speaker: "FitFuture Sports Club",
    categoryId: "sports-club",
    description: "Students showcased their athletic skills and competitive spirit at the Apex Badminton Tournament, creating an exciting experience filled with teamwork, agility, and sportsmanship.",
    image: "/images/experiential-learning/sports-club/badminton-league-1.jpg",
  },
  {
    id: 4,
    type: "image",
    title: "Elite Kho-Kho Premier League",
    speaker: "FitFuture Sports Club",
    categoryId: "sports-club",
    description: "A thrilling sporting tournament at the Elite Kho-Kho Premier League, bringing together teamwork, competitive energy, tactical agility, and sports excellence.",
    image: "/images/experiential-learning/sports-club/kho-kho-league-1.jpg",
  },

  // 3. CULTURAL CLUB (2 items: 1 Swiper Slider, 1 Single Image)
  {
    id: 5,
    type: "slider",
    title: "Teachers Day Celebration & Cultural Showcase",
    speaker: "Vibrance Cultural Club",
    categoryId: "cultural-club",
    description: "Students celebrated Teachers' Day with heartfelt appreciation, enjoying choreographed dance, musical tributes, engaging activities, and memorable celebrations.",
    slides: [
      { image: "/images/experiential-learning/cultural-club/teachers-day-1.jpg" },
      { image: "/images/experiential-learning/cultural-club/teachers-day-2.jpg" },
    ],
  },
  {
    id: 6,
    type: "image",
    title: "Youth Talent & Performing Arts Showcase",
    speaker: "Vibrance Cultural Club",
    categoryId: "cultural-club",
    description: "An energetic campus cultural gathering spotlighting musical ensembles, creative performances, and artistic expression among IMSR undergraduates.",
    image: "/images/student-life/activity/activity-top.jpg",
  },

  // 4. COMMUNITY SERVICE / SAHYOG CLUB (2 items: 1 Swiper Slider, 1 Single Image)
  {
    id: 7,
    type: "slider",
    title: "Beach Cleaning & Marine Conservation Drive",
    speaker: "Sahyog Club (CSR Initiative)",
    categoryId: "sahyog-club",
    description: "As part of its CSR initiative, IMSR organized a Beach Cleaning Drive at Marve Beach to promote environmental sustainability, civic action, and community responsibility.",
    slides: [
      { image: "/images/experiential-learning/sahyog-club/beach-cleaning-1.jpg" },
      { image: "/images/experiential-learning/sahyog-club/beach-cleaning-2.jpg" },
    ],
  },
  {
    id: 8,
    type: "image",
    title: "Environmental Sustainability & Clean Shoreline Action",
    speaker: "Sahyog Club (CSR Initiative)",
    categoryId: "sahyog-club",
    description: "Students actively engaged with local environmental stakeholders to foster awareness and sustainable coastal conservation practices.",
    image: "/images/experiential-learning/sahyog-club/beach-cleaning-2.jpg",
  },

  // 5. EDUCATIONAL / INDUSTRY VISIT (2 items: 2 Single Images)
  {
    id: 9,
    type: "image",
    title: "Educational Visit - Radio Mirchi Studio",
    speaker: "Ms. Rashmi Raja",
    categoryId: "industry-visit",
    description: "Students gained real-world industry exposure through an educational visit to the Radio Mirchi Studio, exploring broadcasting workflows, live audio production, and mass media operations.",
    image: "/images/experiential-learning/educational-visit/radio-mirchi-1.jpg",
  },
  {
    id: 10,
    type: "image",
    title: "Industrial Visit To Parle & Jayesh Industries",
    speaker: "Industrial Experience Mandates",
    categoryId: "industry-visit",
    description: "Across global business hubs and plant floors, experience how corporate enterprises build, scale, and manage supply chains and distribution across commercial markets.",
    image: "/images/new-folder/PARLE.jpg",
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
                  <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-zinc-950 tracking-tight leading-[1.2] sm:leading-[1.22] lg:leading-[1.25] mb-3">
                    {card.title}
                  </h3>

                  {/* SPEAKER / SUBTITLE */}
                  {card.speaker && (
                    <p className="text-xs sm:text-sm font-sans font-semibold text-[#00629f] italic uppercase tracking-wider mb-4 leading-normal">
                      {card.speaker}
                    </p>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-zinc-600 font-sans font-light text-sm sm:text-base leading-relaxed mb-8">
                    {card.description}
                  </p>

                  {/* SINGLE EXPLORE MORE BUTTON */}
                  <div>
                    <Link
                      href={`/student-life?category=${card.categoryId || "master-class"}#clubs-and-committees`}
                      className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                    >
                      <span>Explore More</span>
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
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
            {activeVideo.endsWith(".mp4") ? (
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={`${activeVideo}?autoplay=1`}
                title="Experiential Masterclass Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
