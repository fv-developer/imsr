"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import FacultyScholarsReferenceSection from "@/components/faculty/FacultyScholarsReferenceSection";
import AboutAcademicCouncilSection from "@/components/about/AboutAcademicCouncilSection";
import FAQs from "@/components/ui/text-reveal-faqs";
import { FACULTY_MENTORS_FAQS } from "@/data/faqsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden pb-1">
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

export default function FacultyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade-in
      gsap.fromTo(
        ".faculty-hero-bg",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Heading word reveal animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".anim-word");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.1,
          }
        );

        const gradientSpan = headingRef.current.querySelector(".fade-up-scroll");
        if (gradientSpan) {
          gsap.fromTo(
            gradientSpan,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.35,
              ease: "power3.out",
            }
          );
        }
      }

      // Hero subtitle & items fade-up
      gsap.fromTo(
        ".faculty-hero-animate",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      {/* HEADER WITH ACTIVE FACULTY NAV */}
      <Header activeNav="Faculty" />

      {/* HERO BANNER MATCHING BREADCRUMB & HERO DESIGN */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
      >
        {/* HERO BACKGROUND */}
        <div className="absolute inset-0 z-0 faculty-hero-bg overflow-hidden">
          <Image
            src="/images/hero-slider/hero-slider2.jpg"
            alt="IMSR Distinguished Faculty & Mentors"
            fill
            className="object-cover object-center brightness-[0.38]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
          {/* BREADCRUMB NAVIGATION */}
          <div className="faculty-hero-animate flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate">Faculty</span>
          </div>

          {/* HERO TITLE & SUBTITLE */}
          <div className="max-w-4xl w-full flex flex-col items-start text-left">
            <h1
              ref={headingRef}
              className="font-display font-medium text-[26px] leading-[27px] sm:text-[48px] sm:leading-[45px] tracking-tight text-white text-left mb-6"
            >
              <SplitText text="World-Class Faculty &" />
              <br className="hidden sm:inline" />
              <span
                className="font-medium inline-block pb-1 italic font-serif fade-up-scroll pr-3 opacity-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Industry Practitioners
              </span>
            </h1>

            <p className="faculty-hero-animate text-zinc-300 font-sans font-light text-[18px] leading-relaxed max-w-3xl mb-4 text-left">
              Learn from distinguished scholars, seasoned C-suite executives, and global thought leaders who bring real-world mastery and transformative insights to every classroom.
            </p>
          </div>
        </div>
      </section>

      {/* REFERENCE SECTION: BUILT BY SCHOLARS, LED BY INDUSTRY PRACTITIONERS */}
      <FacultyScholarsReferenceSection />

      {/* FACULTY SECTION: MEET OUR FACULTY, MENTORS & COUNSELLORS (SAME AS ABOUT US PAGE) */}
      <AboutAcademicCouncilSection />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <FAQs
        items={FACULTY_MENTORS_FAQS}
        subtitle="Everything you need to know about our distinguished faculty, expert scholars, and industry mentorship."
      />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </div>
  );
}
