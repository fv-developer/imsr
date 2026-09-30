"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStickyStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImg1Ref = useRef<HTMLDivElement>(null);
  const rightImg2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading Scroll Reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".anim-word");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Curtain & Image Scale Reveal Animations
      const imageContainers = [
        leftImageRef.current,
        rightImg1Ref.current,
        rightImg2Ref.current,
      ].filter(Boolean);

      imageContainers.forEach((container) => {
        if (!container) return;
        const img = container.querySelector("img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          },
        });

        // Polygon curtain wipe reveal
        tl.fromTo(
          container,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.1,
            ease: "power4.inOut",
          }
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.28 },
            { scale: 1, duration: 1.2, ease: "power3.out" },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-zinc-900 pt-16 pb-20 md:pt-24 md:pb-28 border-t border-zinc-100 font-sans select-none"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* 2-COLUMN MAIN GRID MATCHING DESIGN REFERENCE */}
        {/* 2-COLUMN MAIN GRID: IMAGES LEFT, CONTENT RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: 3-IMAGE MOSAIC GRID */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch min-h-[460px]">
            {/* Left Column of Image Grid: 1 Tall Vertical Image */}
            <div
              ref={leftImageRef}
              className="relative w-full h-[320px] sm:h-full rounded-[12px] overflow-hidden border border-zinc-100 group shadow-xs"
            >
              <Image
                src="/images/about-us/about-us.jpeg"
                alt="IMSR Campus Experience"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30" />
            </div>

            {/* Right Column of Image Grid: 2 Stacked Images */}
            <div className="flex flex-col gap-4 sm:gap-5 h-full">
              {/* Top Image Card */}
              <div
                ref={rightImg1Ref}
                className="relative w-full h-[150px] sm:h-[180px] rounded-[12px] overflow-hidden border border-zinc-100 group shadow-xs"
              >
                <Image
                  src="/images/about-us/right-2.webp"
                  alt="IMSR Students Group"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Image Card */}
              <div
                ref={rightImg2Ref}
                className="relative w-full h-[220px] sm:h-[260px] sm:flex-1 rounded-[12px] overflow-hidden border border-zinc-100 group shadow-xs"
              >
                <Image
                  src="/images/about-us/right-1.jpg"
                  alt="IMSR Campus Activity"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: HEADING & ALL PARAGRAPHS */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2
              ref={headingRef}
              className="font-display text-3xl sm:text-4xl md:text-[50px] font-medium text-zinc-950 leading-[40px]"
              style={{ lineHeight: "40px" }}
            >
              <SplitText text="Institute of Management" />
              <span 
                className="font-serif italic font-medium block pb-1 fade-up-scroll"
                style={{
                  background: "linear-gradient(135deg, #42d392, #00629f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Studies &amp; Research
              </span>
            </h2>

            {/* Paragraph 1 */}
            <p className="font-sans font-light text-[#333] text-[18px] leading-relaxed">
              Shaping transformative academic and leadership experiences that inspire ambitious minds and foster meaningful connections across business, management, strategy, and innovation.
            </p>

            {/* Paragraph 2 */}
            <p className="font-sans font-light text-[#333] text-[18px] leading-relaxed">
              Our academic approach brings together strong theoretical foundations and experiential learning, enabling students to learn from experienced faculty, engage with industry professionals, and gain practical exposure through projects, workshops, and real-world business experiences. Through comprehensive industry immersions, mentorship programs, and career placement support, we empower our graduates to lead with integrity, innovation, and global perspective.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
