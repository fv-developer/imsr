"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutStickyStorySection from "@/components/about/AboutStickyStorySection";
import AboutImageTextRevealSection from "@/components/about/AboutImageTextRevealSection";
import AboutBentoGridSection from "@/components/about/AboutBentoGridSection";
import AboutVisionMissionParallax from "@/components/about/AboutVisionMissionParallax";
import AboutAcademicCouncilSection from "@/components/about/AboutAcademicCouncilSection";
import FAQs from "@/components/ui/text-reveal-faqs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_NAV_LINKS = [
  { name: "Industry Placement", href: "/#industry-relations" },
  { name: "Campus Tour", href: "/#campus-tour" },
  { name: "Blog & Events", href: "/#blog" },
  { name: "Contact Us", href: "/#contact" },
];

const MAIN_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/#programs", hasMega: true },
  { name: "Student Life", href: "/#student-life" },
  { name: "Faculty", href: "/#faculty" },
];

const MEGA_MENU_DATA: Record<string, string[]> = {
  "B.B.A.": [
    "B.B.A. (Hons.) In Business Administration",
    "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
    "B.B.A.(Hons.) in Business Administration (Marketing Management)",
    "B.B.A. (Hons.)* in Artificial Intelligence",
  ],
  "B.Com.": [
    "B.Com. (Hons.) in Business Administration",
    "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    "B.Com. (Hons.) in Business Administration (Marketing Management)",
    "B.Com. Hons. in BA (Artificial Intelligence)",
  ],
  "Digital Media & AI": [
    "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    "Diploma in Digital Media and Growth Marketing",
  ],
};

const MEGA_MENU_OVERVIEW_LIST = [
  "Highlights",
  "Curriculum & Faculty",
  "Admissions & Fees",
  "Immersions",
  "Entrepreneurship",
  "Career Prospects",
  "Class Profile",
];

export default function AboutUsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero background
      gsap.fromTo(
        ".about-hero-bg",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Hero text stagger
      gsap.fromTo(
        ".about-hero-animate",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden text-zinc-900 font-sans">
      {/* HEADER MATCHING HOME & PROGRAM PAGES */}
      <Header activeNav="About Us" />

      {/* HERO BANNER */}
      <section ref={heroRef} className="relative min-h-[85vh] w-full flex flex-col justify-end pt-32 pb-[60px] overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 z-0 about-hero-bg overflow-hidden">
          <Image
            src="/images/hero-slider/hero-slider2.jpg"
            alt="IMSR Campus Leadership"
            fill
            className="object-cover object-center brightness-[0.38]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-start">
          <div className="about-hero-animate flex items-center gap-2 text-xs md:text-sm font-normal uppercase tracking-widest text-brand-secondary mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <span className="text-white">About Us</span>
          </div>

          <h1 className="about-hero-animate font-display font-medium text-4xl sm:text-5xl md:text-[70px] tracking-tight leading-[1.05] text-white max-w-4xl mb-6">
            Empowering <span className="text-brand-secondary">Pioneers</span> of Business & Innovation
          </h1>

          <p className="about-hero-animate text-zinc-300 font-sans font-light text-[18px] max-w-3xl leading-relaxed mb-8">
            The Institute of Management Studies and Research (IMSR) is dedicated to nurturing transformative leaders, entrepreneurs, and global business executives through cutting-edge experiential education.
          </p>
        </div>
      </section>

      {/* DUAL-COLUMN STICKY STORY SECTION */}
      <AboutStickyStorySection />

       {/* VISION & MISSION PARALLAX SCROLL SECTION */}
      <AboutVisionMissionParallax />

       {/* BENTO GRID STATS & MISSION SECTION */}
      <AboutBentoGridSection />

      {/* ACADEMIC AND INDUSTRY COUNCIL SECTION */}
      <AboutAcademicCouncilSection />

      {/* SCROLL TEXT IMAGE REVEAL ANIMATION SECTION */}
      <AboutImageTextRevealSection />

      {/* FREQUENTLY ASKED QUESTIONS (FAQS) SECTION */}
      <FAQs />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP */}
      <BackToTop />
    </div>
  );
}
