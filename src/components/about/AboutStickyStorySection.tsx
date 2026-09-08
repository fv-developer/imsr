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
  const leftColRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
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

      if (window.innerWidth >= 1024 && rightColRef.current && leftColRef.current) {
        ScrollTrigger.create({
          trigger: rightColRef.current,
          start: "top 90px",
          endTrigger: leftColRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-zinc-900 pt-16 pb-24 md:pt-24 md:pb-36 border-t border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* 2-COLUMN MAIN GRID MATCHING DESIGN REFERENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: HEADING + PARAGRAPH + MAIN TALL IMAGE */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col gap-6">
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-[53px] font-medium text-zinc-950 leading-[48px]">
              <SplitText text="Institute of Management" />
              <span 
                className="font-medium block pb-1 fade-up-scroll"
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
            

            {/* Paragraph matching existing homepage typography */}
            <p className="font-sans font-light text-[#333] text-[18px] leading-relaxed max-w-xl">
              Crafting compelling academic and leadership experiences that captivate ambitious minds and drive meaningful connections across management, business strategy, and research fields.
            </p>

            {/* Left Main Tall Image (Border Radius 10px) */}
            <div
              ref={leftImageRef}
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-w-full rounded-[10px] overflow-hidden border border-zinc-100 group mt-2"
            >
              <Image
                src="/images/about-us/about-us.jpeg"
                alt="IMSR Campus Event"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ON DESKTOP SCROLL */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 lg:sticky lg:top-[90px] self-start flex flex-col gap-8"
          >
            {/* Top Image Grid: Right 2 (Middle Left Offset) + Right 1 (Top Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Middle Left Offset Image */}
              <div
                ref={rightImg2Ref}
                className="relative w-full aspect-[4/3] sm:aspect-[3/4] rounded-[10px] overflow-hidden border border-zinc-100 group sm:translate-y-10"
              >
                <Image
                  src="/images/about-us/right-1.jpg"
                  alt="IMSR Campus Activity"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Top Right Image */}
              <div
                ref={rightImg1Ref}
                className="relative w-full aspect-[4/3] sm:aspect-[3/4] rounded-[10px] overflow-hidden border border-zinc-100 group"
              >
                <Image
                  src="/images/about-us/right-2.webp"
                  alt="IMSR Students Group"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Two Paragraphs Below Images */}
            <div className="flex flex-col gap-5 pt-8 sm:pt-14 pb-16 sm:pb-24">
              <p className="font-sans font-light text-[#333] text-[18px] leading-relaxed">
                Our unique academic approach merges deep theoretical principles with active experiential learning, providing students access to world-class faculty, professional research labs, and corporate brand partners.
              </p>

              <p className="font-sans font-light text-[#333] text-[18px] leading-relaxed">
                Through comprehensive industry immersions, mentorship programs, and career placement support, we empower our graduates to lead with integrity, innovation, and global perspective.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
