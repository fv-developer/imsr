"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BookOpen, Clock, GraduationCap, MapPin, CircleCheckBig } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIGHLIGHT_CARDS = [
  {
    icon: <Award className="w-6 h-6 text-[#42d392]" />,
    label: "DEGREE",
    value: "BBA (Hons.)",
    subtext: "Undergraduate Honors Degree",
    accentBg: "bg-[#42d392]/10 border-[#42d392]/20",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-[#00bcda]" />,
    label: "ELIGIBILITY",
    value: "10+2 Passouts",
    subtext: "Any stream from recognized board",
    accentBg: "bg-[#00bcda]/10 border-[#00bcda]/20",
  },
  {
    icon: <Clock className="w-6 h-6 text-[#00629f]" />,
    label: "DURATION",
    value: "3 years (Bachelor’s)",
    subtext: "4 years (Honours, as per NEP 2020)",
    accentBg: "bg-[#00629f]/10 border-[#00629f]/20",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
    label: "PROGRAM LEVEL",
    value: "Undergraduate",
    subtext: "NEP 2020 Aligned 4-Year Structure",
    accentBg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: <MapPin className="w-6 h-6 text-cyan-400" />,
    label: "STUDY MODE",
    value: "On Campus",
    subtext: "Full-time interactive learning",
    accentBg: "bg-cyan-400/10 border-cyan-400/20",
  },
];

const OVERVIEW_POINTS = [
  "Comprehensive learning across Business Management, Finance, Marketing, Entrepreneurship, and Strategy.",
  "Practical exposure to business analytics, digital tools, data-driven decision-making, and real-world projects.",
  "Industry case studies, expert-led masterclasses, workshops, and experiential learning opportunities.",
  "Internship opportunities that provide students with meaningful corporate and industry exposure.",
  "Mentorship and guidance from experienced faculty and industry professionals to support career development.",
];

export default function BbaOverviewSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".overview-fade");
      elements?.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="overview"
      className="py-20 md:py-28 bg-[#f8f9fa] text-zinc-900 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="overview-fade max-w-3xl mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-950 leading-[30px] sm:leading-[1.15]">
            Building Visionary{" "}
            <span
              className="italic font-serif pr-2 inline-block"
              style={{
                background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 98, 159))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Business Leaders
            </span>
          </h2>
          <p className="mt-4 text-zinc-600 text-[18px] font-light leading-relaxed">
            A comprehensive business management programme designed to Develop strong Foundations in Management, Strategy, Finance, Marketing, Operations and Leadership while preparing students for diverse business careers.
          </p>
        </div>

        {/* 5 STAT / KEY HIGHLIGHT CARDS GRID */}
        <div className="overview-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-16">
          {HIGHLIGHT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${card.accentBg} border`}>
                  {card.icon}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                  {card.label}
                </p>
                <h3 className="font-display text-[17px] leading-[20px] font-medium text-zinc-900 group-hover:text-[#00629f] transition-colors">
                  {card.value}
                </h3>
              </div>
              <p className="text-xs text-zinc-500 font-light mt-3 border-t border-zinc-100 pt-2.5">
                {card.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* DETAILED CONTENT: 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: DESCRIPTION & KEY HIGHLIGHT POINTS */}
          <div className="overview-fade lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-zinc-950">
              Why Pursue BBA (Hons.) at IMSR?
            </h3>
            
            <p className="text-zinc-600 font-light leading-relaxed text-[18px]">
              The BBA (Hons.) at IMSR combines academic foundations with practical business exposure, helping students develop strategic thinking, managerial capabilities, analytical skills, and leadership confidence for the evolving business landscape.
            </p>

            <ul className="space-y-3.5 pt-2">
              {OVERVIEW_POINTS.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <CircleCheckBig className="w-[20px] h-[20px] text-[#00629f] shrink-0 mt-1" />
                  <span className="text-zinc-700 text-[17px] font-normal leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT COLUMN: FEATURE CARD / IMAGE WITH STAT OVERLAY */}
          <div className="overview-fade lg:col-span-5 relative">
            <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 group">
              <Image
                src="/images/programs/bba-In-business-administration/program-bg.jpg"
                alt="BBA Overview Feature Image"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              
              {/* UNIVERSITY OF MUMBAI AFFILIATION OVERLAY CARD */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-zinc-900 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 rounded-xl bg-white border border-zinc-200/80 p-1.5 shadow-sm flex items-center justify-center">
                  <Image
                    src="/images/programs/bba-In-business-administration/university-of-mumbai-logo.png"
                    alt="University of Mumbai Logo"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-base sm:text-lg text-zinc-950 leading-snug">
                    Affiliated with University of Mumbai
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 font-light mt-0.5">
                    Recognized Degree &amp; Academic Curriculum
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
