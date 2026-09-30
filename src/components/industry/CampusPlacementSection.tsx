"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardCarousel } from "@/components/ui/card-carousel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SplitText helper for heading animation matching News & Blog
const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden pb-2">
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

// PLACEMENT STATS DATA
interface StatItem {
  id: string;
  targetValue: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const PLACEMENT_STATS: StatItem[] = [
  {
    id: "s1",
    targetValue: 30,
    decimals: 0,
    suffix: "+",
    label: "Companies Onboarding",
  },
  {
    id: "s2",
    targetValue: 10.5,
    decimals: 1,
    suffix: "LPA",
    label: "Average CTC",
  },
  {
    id: "s4",
    targetValue: 18.5,
    decimals: 2,
    suffix: "LPA",
    label: "Highest CTC",
  },
  {
    id: "s5",
    targetValue: 650,
    decimals: 0,
    suffix: "+",
    label: "Students Placed",
  },
];

// CAROUSEL IMAGES DATA (DUPLICATED FOR SMOOTH SWIPER 3D COVERFLOW LOOP)
const BASE_CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 1",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 2",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 3",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 4",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 5",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    alt: "Placement Conclave Highlight 6",
  },
];

const CAROUSEL_IMAGES = [...BASE_CAROUSEL_IMAGES, ...BASE_CAROUSEL_IMAGES];

// INLINE STAT ITEM COMPONENT WITH SPECIFIC BACKGROUND & MATCHED FONT SIZE
const StatItemRow = ({ stat }: { stat: StatItem }) => {
  const [count, setCount] = useState<number>(0);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: itemRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.targetValue,
            duration: 2.0,
            ease: "power2.out",
            onUpdate: () => {
              setCount(obj.val);
            },
          });
        },
      });
    }, itemRef);

    return () => ctx.revert();
  }, [stat.targetValue]);

  const formattedValue = count.toFixed(stat.decimals);

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center justify-center text-center w-full px-2 py-6 sm:px-4 lg:px-6 relative border-b sm:border-b-0 sm:border-r border-white/15 last:border-b-0 last:border-r-0"
    >
      <div className="font-display font-medium text-3xl sm:text-4xl lg:text-[50px] xl:text-[60px] text-white tracking-normal leading-none mb-2 whitespace-nowrap flex items-baseline justify-center gap-1.5">
        <span className="tracking-tight">{formattedValue}</span>
        <span className="text-[0.6em] font-normal text-white/90 tracking-[0.08em]">{stat.suffix.trim()}</span>
      </div>
      <p
        className="font-sans text-zinc-300 text-center mt-2 whitespace-nowrap"
        style={{
          fontSize: "14px",
          letterSpacing: "0",
          fontWeight: 400,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
};

export default function CampusPlacementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // GSAP HEADING ANIMATION MATCHING NEWS & BLOG
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".anim-word");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-white border-b border-zinc-200/60 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
        
        {/* 1. HEADING SECTION: "Campus Placement" (MARGIN BOTTOM 8) */}
        <div className="text-center w-full max-w-7xl mx-auto mb-8 overflow-hidden">
          <h2
            ref={headingRef}
            className="font-display font-medium text-[36px] sm:text-[68px] md:text-[95px] lg:text-[115px] text-zinc-950 tracking-tight leading-none mb-4 whitespace-nowrap cursor-default select-none"
          >
            <SplitText text="Campus Placement" />
          </h2>
        </div>

        {/* 2. COUNTER SECTION WITH CUSTOM GRADIENT BACKGROUND & DIVIDERS */}
        <div
          className="w-full rounded-3xl p-3 sm:p-5 mb-[100px] shadow-xl border border-white/10 text-white"
          style={{
            background: "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79, 7, 65) 100%)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 items-center justify-center">
            {PLACEMENT_STATS.map((stat) => (
              <StatItemRow
                key={stat.id}
                stat={stat}
              />
            ))}
          </div>
        </div>

      </div>

      {/* 3. CARD CAROUSEL SLIDER (COVERFLOW 3D EFFECT WITH SWIPER) */}
      <div className="w-full">
        <CardCarousel
          images={CAROUSEL_IMAGES}
          autoplayDelay={2000}
          showPagination={true}
          showNavigation={false}
        />
      </div>
    </section>
  );
}
