"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutVisionMissionParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Fade out Vision subtitle
      tl.to(
        visionRef.current?.querySelector(".vision-sub") || [],
        { opacity: 0, height: 0, marginTop: 0, duration: 0.4, ease: "power2.out" },
        0.05
      );

      // 2. Shrink Vision title font size (72px -> 36px, opacity 1 -> 0.7)
      tl.to(
        visionRef.current?.querySelector(".vision-title") || [],
        { fontSize: "36px", opacity: 0.7, duration: 0.5, ease: "power2.inOut" },
        0.1
      );

      // 3. Cross-fade Background Images with subtle parallax zoom scale
      tl.to(bg1Ref.current, { scale: 1.08, duration: 1.0, ease: "power1.out" }, 0.1);
      tl.fromTo(
        bg2Ref.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1.0, duration: 1.0, ease: "power2.inOut" },
        0.15
      );

      // 4. Expand Mission Title font size (36px -> 72px, opacity 0.7 -> 1.0, pure white)
      tl.to(
        missionRef.current?.querySelector(".mission-title") || [],
        { fontSize: "72px", opacity: 1.0, duration: 0.6, ease: "power2.inOut" },
        0.35
      );

      // 5. Reveal Mission Subtitle
      tl.fromTo(
        missionRef.current?.querySelector(".mission-sub") || [],
        { opacity: 0, height: 0, marginTop: 0 },
        { opacity: 1, height: "auto", marginTop: "1.25rem", duration: 0.5, ease: "power2.out" },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* BACKGROUND IMAGE 1: Vision Image */}
      <div ref={bg1Ref} className="absolute inset-0 z-0">
        <Image
          src="/images/about-us/vision.webp"
          alt="IMSR Vision Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* BACKGROUND IMAGE 2: Mission Image */}
      <div ref={bg2Ref} className="absolute inset-0 z-0 opacity-0">
        <Image
          src="/images/about-us/mission.webp"
          alt="IMSR Mission Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CENTER CONTENT CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-6 sm:gap-10">
        
        {/* OUR VISION BLOCK */}
        <div ref={visionRef} className="flex flex-col items-center justify-center">
          <h2 className="vision-title font-display font-medium text-[72px] leading-[72px] tracking-tight text-white transition-all duration-300">
            Our Vision
          </h2>
          <p className="vision-sub font-sans font-light text-zinc-200 text-base sm:text-lg md:text-[18px] max-w-3xl mt-4 leading-relaxed overflow-hidden">
            To empower the next generation of business leaders, entrepreneurs, and innovators through transformative education, strong values, and future-ready skills. We envision creating globally aware professionals who can navigate a changing world, drive meaningful innovation, and contribute positively to business, society, and the world.
          </p>
        </div>

        {/* OUR MISSION BLOCK */}
        <div ref={missionRef} className="flex flex-col items-center justify-center">
          <h2 className="mission-title font-display font-medium text-[36px] leading-[40px] tracking-tight text-white opacity-70 transition-all duration-300">
            Our Mission
          </h2>
          <p className="mission-sub font-sans font-light text-zinc-200 text-base sm:text-lg md:text-[18px] max-w-3xl leading-relaxed opacity-0 h-0 overflow-hidden">
            Our mission is to provide future-focused, industry-oriented education that creates meaningful opportunities for students to learn, explore, and grow. Through a multidisciplinary and practical approach to education, we strive to empower the next generation of leaders, entrepreneurs, and innovators with the knowledge, skills, and confidence to create meaningful impact in the world.
          </p>
        </div>

      </div>
    </section>
  );
}
