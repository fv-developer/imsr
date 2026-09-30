"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ActivityCardData {
  id: number;
  title: string;
  speaker: string;
  category: string;
  description: string;
  image: string;
}

const ACTIVITIES_CARDS_DATA: ActivityCardData[] = [
  {
    id: 1,
    title: "Celebrate Campus Engagements",
    speaker: "Student Activity Cell",
    category: "Campus Life",
    description:
      "Jump into campus clubs, activities, and virtual connections that spark growth and transformative experiences. Join our MU Virtual Clubs on Discord and Zoom for epic collaborations!",
    image: "/images/student-life/activity/activity-center.jpg",
  },
  {
    id: 2,
    title: "Annual Youth Cultural Conclave & Fest",
    speaker: "Cultural Board",
    category: "Cultural Fest",
    description:
      "An energetic annual celebration featuring inter-college music battles, fashion showcases, theatrical acts, and youth performances across Western India.",
    image: "/images/new-folder/Beach.webp",
  },
  {
    id: 3,
    title: "Entrepreneurial Pitch Night & Hackathon",
    speaker: "E-Cell & Incubation Board",
    category: "Innovation & Startup",
    description:
      "Aspiring student founders present business prototypes and real-world commercial solutions to angel investors and industry leaders.",
    image: "/images/new-folder/CASE-STUDY.webp",
  },
];

export default function RecentActivitiesSection() {
  const containerRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger Card Stacking Effect matching Experiential Learning Section
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>(".recent-stack-card");
    const cardsWrapper = containerRef.current.querySelector<HTMLElement>(".recent-cards-stack-wrapper");
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
      id="recent-activities"
      className="w-full relative bg-white py-16 md:py-24 overflow-hidden font-sans select-none border-t border-zinc-100 z-20"
    >
      {/* GSAP PIN-SPACER CENTERED ALIGNMENT FIX */}
      <style jsx global>{`
        .recent-cards-stack-wrapper .pin-spacer {
          margin-left: auto !important;
          margin-right: auto !important;
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
      `}</style>

      {/* CENTERED STACKED CARDS CONTAINER (NO TOP HEADING) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center w-full">
        <div className="recent-cards-stack-wrapper w-full max-w-[1100px] mx-auto space-y-8 lg:space-y-12 relative flex flex-col items-center">
          {ACTIVITIES_CARDS_DATA.map((card) => {
            return (
              <div
                key={card.id}
                className="recent-stack-card w-full max-w-[1100px] mx-auto bg-[#090e1a] text-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl border border-white/10 flex flex-col group origin-top"
              >
                {/* TOP WIDE IMAGE BANNER */}
                <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 mb-6 sm:mb-8">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 1100px"
                  />
                </div>

                {/* BOTTOM CONTENT: HEADING ONLY (23px, weight 500) */}
                <div className="px-2 sm:px-4 pb-2 text-left">
                  <h3
                    className="font-display text-white tracking-tight leading-snug"
                    style={{ fontSize: "23px", fontWeight: 500 }}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
