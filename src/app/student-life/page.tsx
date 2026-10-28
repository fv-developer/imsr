"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import MaskedHeading from "@/components/ui/MaskedHeading";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import ClassroomSessions from "@/components/student-life/ClassroomSessions";
import ClubsAndCommitteesSection from "@/components/student-life/ClubsAndCommitteesSection";
import RecentActivitiesSection from "@/components/student-life/RecentActivitiesSection";
import MasterClassSection from "@/components/student-life/MasterClassSection";
import WorkshopsSection from "@/components/student-life/WorkshopsSection";
import StudentLifeStats from "@/components/student-life/StudentLifeStats";
import FAQs from "@/components/ui/text-reveal-faqs";
import { STUDENT_LIFE_FAQS, CAMPUS_LIFE_FAQS, EXPERIENTIAL_LEARNING_FAQS } from "@/data/faqsData";
import { ChevronRight } from "lucide-react";

const PARALLAX_IMAGES = [
  {
    src: "/images/student-life/activity/activity-center.jpg?v=6",
    alt: "IMSR Campus Activity Center",
  },
  {
    src: "/images/student-life/activity/activity-top.jpg?v=6",
    alt: "Student Activity Top",
  },
  {
    src: "/images/student-life/activity/activity-left.jpg?v=6",
    alt: "Student Activity Left",
  },
  {
    src: "/images/student-life/activity/activity-right.jpg?v=6",
    alt: "Student Activity Right",
  },
  {
    src: "/images/student-life/activity/activity-left-bottom.jpg?v=6",
    alt: "Student Activity Left Bottom",
  },
  {
    src: "/images/student-life/activity/activity-right-bottom.png?v=6",
    alt: "Student Activity Right Bottom",
  },
  {
    src: "/images/student-life/activity/activity-center-bottom.jpg?v=6",
    alt: "Student Activity Center Bottom",
  },
];

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

export default function StudentLifePage() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading text reveal
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

      // 2. Elements fade up
      gsap.fromTo(
        ".hero-fade-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER MATCHING HOME, ABOUT & PROGRAM PAGES */}
      <Header activeNav="Student Life" />

      {/* HERO BANNER MATCHING BBA PROGRAM PAGE HERO STYLE */}
      <section
        ref={containerRef}
        className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
      >
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/student-life/student-life.webp"
            alt="IMSR Student Life Background"
            fill
            className="object-cover object-center opacity-85 brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-zinc-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
          {/* BREADCRUMB */}
          <div className="hero-fade-item flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate">
              Student Life
            </span>
          </div>

          {/* HERO CONTENT */}
          <div className="max-w-4xl w-full flex flex-col items-start text-left">
            {/* MAIN TITLE */}
            <h1
              ref={headingRef}
              className="font-display font-medium text-[26px] leading-[27px] sm:text-[48px] sm:leading-[45px] tracking-tight text-white text-left mb-6"
            >
              <SplitText text="Vibrant Campus Life &" />
              <br className="hidden sm:inline" />
              <span
                className="font-medium inline-block pb-1 italic font-serif fade-up-scroll pr-3 opacity-0"
                style={{
                  background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Student Experience
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="hero-fade-item text-zinc-300 font-sans font-light text-[18px] leading-relaxed max-w-3xl mb-4 text-left">
              Experience a dynamic, holistic campus environment at IMSR designed to foster leadership, creativity, collaboration, and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENTIAL LEARNING HEADING SECTION */}
      <section 
        id="experiential-learning-heading" 
        className="pt-14 md:pt-16 pb-0 bg-white text-zinc-950 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="flex flex-col items-center w-full">
            <MaskedHeading
              text="EXPERIENTIAL LEARNING"
              mediaType="video"
              src="/images/video.mp4"
              poster="/images/campus_explore.jpg"
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={18}
              brightness={1}
              saturation={1}
              grayscale={false}
              duration={1.1}
              stagger={0.17}
              align="center"
              weight={700}
              tracking={0.02}
              lineHeight={0.85}
              textScale={0.15}
              className="font-display uppercase text-[50px] sm:text-[100px] md:text-[170px]"
              startTime={15}
            />
          </div>
        </div>
      </section>

      {/* STUDENT LIFE STATS COUNTERS (800+ Participants | 7 Events | 120+ Institutions) */}
      <StudentLifeStats />

      {/* ZOOM PARALLAX GALLERY SECTION */}
      <section className="bg-white text-zinc-950 relative z-10 w-full overflow-hidden -mt-20 font-sans">
        <ZoomParallax images={PARALLAX_IMAGES} />
      </section>

      {/* CLUBS & COMMITTEES SECTION */}
      <ClubsAndCommitteesSection />

      {/* RECENT ACTIVITIES SECTION (STICKY STACK CARDS EFFECT ON SCROLL) */}
      <RecentActivitiesSection />

      {/* CLASSROOM SESSIONS SECTION */}
      <ClassroomSessions />

      {/* EXECUTIVE MASTERCLASS SESSIONS SECTION */}
      <MasterClassSection />

      {/* SPECIALIZED WORKSHOPS SECTION */}
      <WorkshopsSection />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <FAQs
        categories={[
          { name: "Student Life & Events", items: STUDENT_LIFE_FAQS },
          { name: "Campus Life & Campuses", items: CAMPUS_LIFE_FAQS },
          { name: "Experiential Learning", items: EXPERIENTIAL_LEARNING_FAQS },
        ]}
        subtitle="Everything you need to know about student life, masterclasses, and campus experiences at FV - IMSR."
      />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP */}
      <BackToTop />
    </div>
  );
}
