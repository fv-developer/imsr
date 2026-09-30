"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Recruiter {
  name: string;
  logo: string;
}

const RECRUITERS: Recruiter[] = [
  { name: "ABEC Exhibitions", logo: "/images/placement-partners/7NinaIFAbhXbY1Pqw7ZgFDf98BYi2cfEPIx6JXNQ.webp" },
  { name: "Panasonic", logo: "/images/placement-partners/1bDBJefHU4A3Nu5fAMVzFbpBethA9p7GooVKi9hr.webp" },
  { name: "Hudl", logo: "/images/placement-partners/NieZ4wdrtsDSDNpwIwhC5QACL0FpiSUhaCBAZ3bW.webp" },
  { name: "DNA Networks", logo: "/images/placement-partners/v3HWnWDcDoA1UHXdJxGizJ5aLeSGwnVPdEnowfXF.webp" },
  { name: "Pidilite", logo: "/images/placement-partners/yg9NasX0Z0GkXjZXw9i6yJgaD2nU9k9tqOES0dec.webp" },
  { name: "BookMyShow", logo: "/images/placement-partners/GWTuIKLAyByVW7y29ve4uXVzeD7MkNZlYPK4oovN.webp" },
  { name: "JIO World Centre", logo: "/images/placement-partners/9Ktm1I8dfp2ONyYd58lJtNdIe6vb9pHK66BgFTRu.webp" },
  { name: "Wizcraft", logo: "/images/placement-partners/LwwepfjTq5HdNkTipqL4svxigN6X9hIUTHvbia1A.webp" },
  { name: "Sony Pictures", logo: "/images/placement-partners/BDqnvYvWFkfH4OTFxFBnrAky0dAYEwVLUkhucw6s.webp" },
  { name: "70 EMG", logo: "/images/placement-partners/mtgFIZBdDTunxUoMrAYiYaqc9LAq9bUKMk6sBXTI.webp" },
  { name: "Percept", logo: "/images/placement-partners/DcQqKWVA5oe4xbkEqxogbx7n3QhP9iihM2xkkaGi.webp" },
  { name: "Messe Muenchen", logo: "/images/placement-partners/erfKwlt1aGpBb0Ks1SG6D5JfCTIHQ9eN6peh5D89.webp" },
  { name: "Reset Live", logo: "/images/placement-partners/jQYD9geUfjJRxVTZW1JYwQjNy5klmEQNsAx2CT95.webp" },
  { name: "Informa Markets", logo: "/images/placement-partners/s8NoJNGqYJKHwPhDqLqzO1TUoFoDEEwS6PoIW6q4.webp" },
  { name: "7 Shades Events", logo: "/images/placement-partners/xEj19aiB9aD5nmVlgapwbg9nqGhJWOQzwbuburpM.webp" },
  { name: "IKEA", logo: "/images/placement-partners/LUpxd1AHk819Yyg28caRHOMstcjBv0qRi6dgDWoE.webp" },
  { name: "The Times Group", logo: "/images/placement-partners/CLybP1uDUSGTlgqXAM6U6J5phsUKMsRlPuwlZ1L7.webp" },
  { name: "Dreamzkraft", logo: "/images/placement-partners/iDRycEYjbd9l7WjneVAjk9jEWqJFhuqZNq4F3dCR.webp" },
  { name: "Kokilaben Hospital", logo: "/images/placement-partners/7tjSpiHpWLBLpvshCmmIlO6hyCk4WdLTqziix6eQ.webp" },
  { name: "OTM Travel Show", logo: "/images/placement-partners/AtYe9b3hU2xHgrOzh653gIjPEpFpzBGhHJ0YQXQ2.webp" },
  { name: "Nash Experiences", logo: "/images/placement-partners/I5I9SPwgWq6eVlHM6AK79u2wUeOQcXgiRvJBvAYh.webp" },
  { name: "Seventy Seven", logo: "/images/placement-partners/RsI34LdE5pahmGcN9M72qwfYUBRrAQiHamhaBrSz.webp" },
  { name: "The Souled Store", logo: "/images/placement-partners/GWKaFeLGQsA2MLkpJgElPz0IhDEtzb0XRoXxYcAG.webp" },
  { name: "Tamarind Global", logo: "/images/placement-partners/shwZChjP4DiiIowJUiVagSGSh5JS85XXjcMzg09o.webp" },
  { name: "Orra Events", logo: "/images/placement-partners/XydV5WqeyNgvagaTFlmFkSy7STeXYwBRWxoo1Boh.webp" },
  { name: "Golden Chariot", logo: "/images/placement-partners/VBYXIM1zCmEnNzNU7Q1fKuklXoNqlwq9vDggImWK.webp" },
  { name: "Dharma Cornerstone", logo: "/images/placement-partners/UL9xjtySsIegKzMHbXkYMPX8jSwSSrjJTIqv3mJ1.webp" },
  { name: "Craftworld Events", logo: "/images/placement-partners/oRHCijK7tJIFNNRPA6ijwRjpQ1MO5Gx82P4OuqoZ.webp" },
  { name: "The Wedding Story", logo: "/images/placement-partners/6092m4GnpSj30nfh89Dr1pHq0ro3IR91FdjZeyGu.webp" },
  { name: "SFA Sports", logo: "/images/placement-partners/rI67JNgckFu18wjQa8m8Rdq7BsBxN9Q770fdO4Kf.webp" },
];

export default function OurRecruitersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin left side column at top (140px) during scroll on desktop viewports matching ExperientialLearning
      if (window.innerWidth >= 1024 && sectionRef.current) {
        const leftCol = sectionRef.current.querySelector<HTMLElement>(".recruiters-left");
        const gridCol = sectionRef.current.querySelector<HTMLElement>(".recruiter-grid");
        if (leftCol && gridCol) {
          ScrollTrigger.create({
            trigger: leftCol,
            start: "top 140px",
            endTrigger: gridCol,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        }
      }

      // Reveal animation for heading lines
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".anim-heading-line");
        gsap.fromTo(
          lines,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate logo cards on scroll
      gsap.fromTo(
        ".recruiter-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".recruiter-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 text-white font-sans select-none border-t border-b border-white/10 relative"
      style={{
        background: "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79, 7, 65) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: GSAP TOP-PINNED STICKY TITLE & SUBTITLE */}
          <div className="lg:col-span-4 recruiters-left w-full mb-6 lg:mb-0">
            <h2
              ref={headingRef}
              className="font-display font-medium text-[45px] sm:text-[65px] tracking-tight mb-6 leading-none sm:leading-[1.02]"
            >
              <span className="block text-white anim-heading-line leading-none">
                Our
              </span>
              <span
                className="block italic anim-heading-line leading-none mt-1"
                style={{
                  background: "linear-gradient(135deg, #42d392, #00629f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Recruiters
              </span>
            </h2>
            <p className="text-zinc-200 font-sans text-base sm:text-lg font-light leading-relaxed max-w-sm mt-4">
              Top global corporations and industry leaders partner with IMSR to recruit future-ready leaders.
            </p>
          </div>

          {/* RIGHT COLUMN: Grid of White Cards containing Logos Only */}
          <div className="lg:col-span-8 recruiter-grid">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {RECRUITERS.map((item, index) => (
                <div
                  key={index}
                  className="recruiter-card bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center h-[85px] sm:h-[105px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  {/* Logo Container (Logo Only) */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 140px, 180px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
