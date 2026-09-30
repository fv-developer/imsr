"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

interface MasterclassCard {
  id: string;
  tag: string;
  title: string;
  speaker: string;
  image: string;
  videoSrc?: string;
}

const MASTERCLASSES: MasterclassCard[] = [
  {
    id: "m1",
    tag: "IMSR EXECUTIVE",
    title: "STRATEGIC HR MANAGEMENT & LEADERSHIP",
    speaker: "Dr. Sunita Deshmukh (Ex-ISB)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    videoSrc: "/images/video.mp4",
  },
  {
    id: "m2",
    tag: "IMSR MASTERCLASS",
    title: "MASTER THE ART OF DECISION MAKING",
    speaker: "Dr. Vikramaditya Roy (Former IIT Bombay)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    videoSrc: "/images/video.mp4",
  },
  {
    id: "m3",
    tag: "IMSR DIGITAL",
    title: "BUSINESS TRANSFORMATION IN THE DIGITAL AGE",
    speaker: "Dr. Kavita Nambiar (Stanford Postdoc)",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    videoSrc: "/images/video.mp4",
  },
  {
    id: "m4",
    tag: "IMSR FINANCE",
    title: "GLOBAL FINANCE & VENTURE CAPITAL STRATEGY",
    speaker: "Prof. Rajesh Kulkarni (LSE Fellow)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    videoSrc: "/images/video.mp4",
  },
];

const AVATAR_STACK = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
];

export default function FacultyScholarsReferenceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative py-20 md:py-24 text-white overflow-hidden border-b border-zinc-900/80"
      style={{
        background: "linear-gradient(123deg, rgb(6, 153, 176) 0%, rgb(0, 38, 33) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: BADGE, HEADING & DESCRIPTION */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* AVATAR CLUSTER BADGE */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/90 mb-8 shadow-inner">
              <div className="flex items-center -space-x-2">
                {AVATAR_STACK.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-6 h-6 rounded-full border-2 border-zinc-950 overflow-hidden shrink-0"
                  >
                    <Image
                      src={src}
                      alt="Faculty mentor"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs font-kanit font-semibold text-zinc-200 tracking-wide uppercase">
                500+ Masters & Industry Mentors
              </span>
            </div>

            {/* MAIN HEADING */}
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[44px] tracking-tight leading-[1.15] text-white text-left mb-6">
              Built by <span className="font-semibold text-white">Scholars</span>,
              <br />
              Led by{" "}
              <span
                className="font-serif italic font-medium inline-block pr-4 pb-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Industry Practitioners
              </span>
            </h2>

            {/* SUBTITLE */}
            <p className="font-sans font-light text-zinc-100 text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
              At IMSR, your classroom is powered by premier academics and global
              business leaders, from IIMs to McKinsey, from Wharton to Google. Our
              faculty don&apos;t just teach the playbook. They wrote it.
            </p>
          </div>

          {/* RIGHT COLUMN: TOP RIGHT NAVIGATION & CAROUSEL CARDS */}
          <div className="lg:col-span-7 w-full flex flex-col overflow-hidden">
            
            {/* TOP RIGHT NAVIGATION ARROWS (WHITE BACKGROUND) */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-950" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5 text-zinc-950" />
              </button>
            </div>

            {/* CAROUSEL CARDS SLIDER */}
            <div
              ref={scrollRef}
              className="flex items-center gap-5 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {MASTERCLASSES.map((item) => {
                const isPlaying = playingCardId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isPlaying) setPlayingCardId(item.id);
                    }}
                    className="group relative flex-none w-[260px] sm:w-[290px] h-[400px] sm:h-[430px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer snap-start transition-all duration-300 hover:scale-[1.02] shadow-2xl flex flex-col justify-between p-6 pt-[40px]"
                  >
                    {isPlaying ? (
                      <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
                        <video
                          src={item.videoSrc}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        {/* BACKGROUND IMAGE */}
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

                        {/* HEADING ON TOP (GAP 40PX FROM TOP, FONT WEIGHT 500, CENTER ALIGNED) */}
                        <div className="relative z-10 text-center w-full px-1">
                          <h3 className="font-display font-medium text-lg sm:text-xl text-white leading-tight uppercase tracking-tight line-clamp-3 text-center">
                            {item.title}
                          </h3>
                        </div>

                        {/* CENTER / BOTTOM PLAY BUTTON */}
                        <div className="relative z-10 self-center my-auto">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
