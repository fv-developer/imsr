"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  {
    target: 800,
    suffix: "+",
    label: "Participants",
  },
  {
    target: 7,
    suffix: "",
    label: "Events",
  },
  {
    target: 120,
    suffix: "+",
    label: "Institutions Participated",
  },
];

export default function StudentLifeStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animated Counter Numbers
      const counterElements = containerRef.current?.querySelectorAll<HTMLElement>(".stat-counter-num");
      counterElements?.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute("data-target") || "0");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });

      // Fade-up animation for stat items
      gsap.fromTo(
        ".stat-item-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white text-zinc-950 relative z-20 font-sans"
      style={{ paddingTop: "50px", paddingBottom: "50px" }}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center justify-center">
          {STATS_DATA.map((item, idx) => {
            const isLast = idx === STATS_DATA.length - 1;
            return (
              <div
                key={idx}
                className={`stat-item-anim flex flex-col items-center justify-center text-center px-3 py-2 ${
                  !isLast ? "md:border-r md:border-zinc-200/90" : ""
                }`}
              >
                {/* SERIF STAT NUMBER */}
                <div className="flex items-baseline font-serif font-normal text-zinc-950 text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-tight">
                  <span className="stat-counter-num" data-target={item.target}>
                    0
                  </span>
                  {item.suffix && (
                    <span className="font-serif font-normal text-[40px] sm:text-[50px] md:text-[60px] ml-0.5 text-zinc-950">
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* CLEAN LABEL */}
                <p
                  className="mt-3 font-sans tracking-wide"
                  style={{
                    textTransform: "uppercase",
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: 300,
                  }}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
