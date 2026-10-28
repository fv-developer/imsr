"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardsData = [
  // 1. MASTERCLASS (2 items, single image)
  {
    title: "Digital Marketing Careers In The AI Era",
    speaker: "Mr. Viken Shah",
    category: "Masterclass",
    description: "IMSR hosted an insightful masterclass on Digital Marketing Careers in the AI Era, exploring essential digital skills, freelancing opportunities, and real-world marketing challenges.",
    image: "/images/experiential-learning/masterclass/viken-shah-1.jpg"
  },
  {
    title: "AI & Digital Transformation: Shaping Customer Experience",
    speaker: "Mr. Unnat Khetan",
    category: "Masterclass",
    description: "An inspiring masterclass bridging classroom learning with practical applications in digital transformation, consulting careers, and AI-enabled customer experiences.",
    image: "/images/experiential-learning/masterclass/unnat-khetan-1.jpg"
  },

  // 2. SPORTS CLUB (2 items, single image)
  {
    title: "Apex Badminton League 2026",
    speaker: "FitFuture Sports Club",
    category: "Sports Club",
    description: "Students showcased their athletic skills and competitive spirit at the Apex Badminton Tournament, creating an exciting experience filled with teamwork, agility, and sportsmanship.",
    image: "/images/experiential-learning/sports-club/badminton-league-1.jpg"
  },
  {
    title: "Elite Kho-Kho Premier League",
    speaker: "FitFuture Sports Club",
    category: "Sports Club",
    description: "A thrilling sporting tournament at the Elite Kho-Kho Premier League, bringing together teamwork, competitive energy, tactical agility, and sports excellence.",
    image: "/images/experiential-learning/sports-club/kho-kho-league-1.jpg"
  },

  // 3. CULTURAL CLUB (2 items, single image)
  {
    title: "Teachers Day Celebration & Cultural Showcase",
    speaker: "Vibrance Cultural Club",
    category: "Cultural Club",
    description: "Students celebrated Teachers' Day with heartfelt appreciation, enjoying choreographed dance, musical tributes, engaging activities, and memorable celebrations.",
    image: "/images/experiential-learning/cultural-club/teachers-day-1.jpg"
  },
  {
    title: "Youth Talent & Performing Arts Showcase",
    speaker: "Vibrance Cultural Club",
    category: "Cultural Club",
    description: "An energetic campus cultural gathering spotlighting musical ensembles, creative performances, and artistic expression among IMSR undergraduates.",
    image: "/images/experiential-learning/cultural-club/teachers-day-2.jpg"
  },

  // 4. COMMUNITY SERVICE / SAHYOG CLUB (2 items, single image)
  {
    title: "Beach Cleaning & Marine Conservation Drive",
    speaker: "Sahyog Club (CSR Initiative)",
    category: "Community Service",
    description: "As part of its CSR initiative, IMSR organized a Beach Cleaning Drive at Marve Beach to promote environmental sustainability, civic action, and community responsibility.",
    image: "/images/experiential-learning/sahyog-club/beach-cleaning-1.jpg"
  },
  {
    title: "Environmental Sustainability & Clean Shoreline Action",
    speaker: "Sahyog Club (CSR Initiative)",
    category: "Community Service",
    description: "Students actively engaged with local environmental stakeholders to foster awareness and sustainable coastal conservation practices.",
    image: "/images/experiential-learning/sahyog-club/beach-cleaning-2.jpg"
  },

  // 5. EDUCATIONAL / INDUSTRY VISIT (2 items, single image)
  {
    title: "Educational Visit - Radio Mirchi Studio",
    speaker: "Ms. Rashmi Raja",
    category: "Industry Visit",
    description: "Students gained real-world industry exposure through an educational visit to the Radio Mirchi Studio, exploring broadcasting workflows, live audio production, and mass media operations.",
    image: "/images/experiential-learning/educational-visit/radio-mirchi-1.jpg"
  },
  {
    title: "Industrial Visit To Parle & Jayesh Industries",
    speaker: "Industrial Experience Mandates",
    category: "Industry Visit",
    description: "Across global business hubs and plant floors, experience how corporate enterprises build, scale, and manage supply chains and distribution across commercial markets.",
    image: "/images/new-folder/PARLE.jpg"
  }
];

export default function ExperientialLearning() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>(".experiential-card");
    const container = containerRef.current.querySelector<HTMLElement>(".cards-container");
    if (!cards.length || !container) return;

    const ctx = gsap.context(() => {
      // Pin the left column dynamically during scroll on desktop viewports
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: containerRef.current?.querySelector(".experiential-left"),
          start: "top 140px",
          endTrigger: container,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }

      // Loop over cards and attach GSAP ScrollTrigger pin & shrink stacking effect (all viewports)
      const cardStartOffset = window.innerWidth < 768 ? "top 80px" : "top 140px";

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          gsap.to(card, {
            scale: 0.9,
            opacity: 0,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: cardStartOffset,
              endTrigger: nextCard,
              end: cardStartOffset,
              scrub: true,
              pin: true,
              pinSpacing: false,
            }
          });
        } else {
          // Last card pins until the container bottom finishes
          ScrollTrigger.create({
            trigger: card,
            start: cardStartOffset,
            endTrigger: container,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      // Refresh ScrollTrigger positions
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-28 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div className="lg:col-span-5 experiential-left w-full">
          <h2 
            className="font-display font-medium text-[45px] sm:text-[65px] tracking-tight pb-2 leading-[45px] sm:leading-[62px]"
          >
            <span className="block text-white">
              Experiential
            </span>
            <span 
              className="block italic"
              style={{
                background: "linear-gradient(135deg, #42d392, #00629f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Learning
            </span>
          </h2>
          <p className="mt-6 text-cyan-100 font-sans font-light leading-relaxed text-[18px] max-w-md">
            Gain practical knowledge through hands-on projects, industry exposure, internships, and real-world experiences that help students develop essential skills and confidently prepare for successful careers.
          </p>
          <button 
            className="hidden lg:flex btn-fill-effect mt-10 items-center justify-center gap-3 w-[150px] !h-[150px] rounded-full border border-white/60 bg-transparent text-white hover:text-zinc-950 transition-all duration-[350ms] group cursor-pointer shadow-lg" 
            style={{ "--btn-hover-bg": "#ffffff" } as React.CSSProperties}
            aria-label="Explore Us More"
          >
            <div className="flex flex-col text-left text-[13px] font-display font-medium leading-[1.2] uppercase tracking-[0.05em]">
              <span>Explore Us</span>
              <span>More</span>
            </div>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>

        {/* Right Column - Stacking Cards */}
        <div className="lg:col-span-7 block space-y-6 cards-container w-full relative">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="experiential-card flex flex-col sm:flex-row bg-white shadow-xl overflow-hidden rounded-[10px] hover:shadow-2xl transition-shadow duration-300 w-full origin-top"
            >
              {/* Image Section */}
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:min-h-[220px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center bg-white">
                <span className="inline-block self-start px-3 py-1 bg-[#7f0741]/10 text-[#7f0741] font-sans font-semibold text-xs uppercase tracking-wider rounded-full mb-3">
                  {card.category}
                </span>
                <h4 className="font-display font-medium uppercase text-xl md:text-2xl text-zinc-900 leading-snug mb-2 tracking-tight">
                  {card.title}
                </h4>
                {card.speaker && (
                  <p className="text-[18px] font-sans font-normal italic text-[#007482] mb-3">
                    {card.speaker}
                  </p>
                )}
                <p className="text-zinc-600 font-sans font-light text-[16px] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile Simple Button (below cards) */}
          <div className="mt-8 flex lg:hidden justify-start w-full pt-2">
            <a
              href="/about-us"
              className="px-7 py-3 rounded-full bg-white text-zinc-950 font-kanit font-medium text-[14px] uppercase tracking-wider flex items-center gap-3 shadow-md hover:bg-zinc-100 transition-colors"
            >
              <span>Explore Us More</span>
              <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
