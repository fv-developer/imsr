"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Fade up scroll elements
      const fadeElements = containerRef.current?.querySelectorAll(".fade-up-scroll");
      fadeElements?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // 2. Image Reveal Animations
      const revealContainers = containerRef.current?.querySelectorAll(".reveal-container");
      revealContainers?.forEach((container) => {
        const img = container.querySelector(".reveal-img");
        if (!img) return;

        gsap.set(container, { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(img, { scale: 1.3 });

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        revealTimeline.to(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power2.inOut",
        });

        revealTimeline.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-white relative z-20 overflow-hidden font-display">
      <div className="max-w-7xl mx-auto px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Image */}
          <div className="lg:col-span-4 flex justify-start">
            <div 
              className="relative w-full max-w-[380px] aspect-[2/3] overflow-hidden rounded-[10px] reveal-container"
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            >
              <Image
                src="/images/home/about/about-left.png"
                alt="Graduate Student"
                fill
                className="object-cover reveal-img"
              />
            </div>
          </div>

          {/* Right Column: Content and Landscape Image */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-medium text-zinc-950 leading-[40px]">
                <SplitText text="Transform Your Future with" />
                <span 
                  className="font-medium mt-2 block pb-1 fade-up-scroll"
                  style={{
                    background: "linear-gradient(135deg, #42d392, #00629f)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Institute of Management
                </span>
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
              <p className="mt-6 text-[#333] font-sans font-light leading-relaxed max-w-2xl text-[18px] fade-up-scroll">
                Build the knowledge, skills, and confidence needed to shape a successful career. Institute of Management Studies &amp; Research offers industry-focused learning, expert guidance, and opportunities to help you turn your ambitions into meaningful professional growth.
              </p>
            </div>

            {/* Bottom Row: Badge & Right Image */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-8 lg:gap-12 w-full">
              {/* Circular Badge */}
              <Link
                href="/about"
                className="relative overflow-hidden group w-[150px] h-[150px] rounded-full border border-zinc-400 hover:border-brand-primary flex flex-col items-center justify-center select-none cursor-pointer flex-shrink-0 transition-colors duration-300"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                  
                  const centerX = e.clientX - rect.left - rect.width / 2;
                  const centerY = e.clientY - rect.top - rect.height / 2;
                  gsap.to(e.currentTarget, {
                    x: centerX * 0.2,
                    y: centerY * 0.2,
                    duration: 0.5,
                    ease: "power3.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                  });
                }}
              >
                {/* Bubble fill background */}
                <div 
                  className="absolute bg-brand-primary rounded-full pointer-events-none w-0 h-0 group-hover:w-[300px] group-hover:h-[300px] transition-[width,height] duration-[600ms] ease-out z-0"
                  style={{
                    top: 'var(--y, 50%)',
                    left: 'var(--x, 50%)',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="flex flex-col items-start font-sans font-medium text-[15px] tracking-wider text-zinc-950 group-hover:text-white transition-colors duration-300 leading-tight">
                    <span>EXPLORE US</span>
                    <span>MORE</span>
                  </div>
                  <svg
                    className="w-[18px] h-[18px] text-zinc-950 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </Link>

              {/* Landscape Image */}
              <div 
                className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px] reveal-container flex-grow"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              >
                <Image
                  src="/images/home/about/about-right.png"
                  alt="Students Group"
                  fill
                  className="object-cover reveal-img"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
