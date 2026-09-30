"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface StudentPlacement {
  id: string;
  name: string;
  photo: string;
  designation: string;
  company: string;
  year: string;
}

const PLACED_STUDENTS: StudentPlacement[] = [
  // 2024–25 Batch
  {
    id: "p1",
    name: "Anurag Kulkarni",
    photo: "/images/new-folder/story-cover-1.png",
    designation: "Marketing Specialist",
    company: "Jio World Centre",
    year: "2024–25",
  },
  {
    id: "p2",
    name: "Harsha Chouhan",
    photo: "/images/new-folder/story-cover-2.png",
    designation: "Brand Strategist",
    company: "Seventy Seven",
    year: "2024–25",
  },
  {
    id: "p3",
    name: "Aniket Dhondkar",
    photo: "/images/new-folder/story-cover-3.png",
    designation: "Operations Manager",
    company: "Orra Events",
    year: "2024–25",
  },
  {
    id: "p4",
    name: "Pooja Vaidya",
    photo: "/images/new-folder/Pooja.webp",
    designation: "Event Specialist",
    company: "Sony Pictures",
    year: "2024–25",
  },
  {
    id: "p5",
    name: "Suvidha Patil",
    photo: "/images/new-folder/Suvidha.webp",
    designation: "Creative Director",
    company: "Panasonic",
    year: "2024–25",
  },
  {
    id: "p6",
    name: "James Fernandes",
    photo: "/images/new-folder/James.webp",
    designation: "Corporate Consultant",
    company: "IKEA",
    year: "2024–25",
  },
  {
    id: "p7",
    name: "Gunjan Sidhu",
    photo: "/images/new-folder/Gunjan.webp",
    designation: "HR Lead",
    company: "BookMyShow",
    year: "2024–25",
  },
  {
    id: "p8",
    name: "Rohan Kulkarni",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    designation: "Growth Analyst",
    company: "Pidilite",
    year: "2024–25",
  },
  {
    id: "p9",
    name: "Priya Nair",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    designation: "Digital Lead",
    company: "Wizcraft",
    year: "2024–25",
  },
  {
    id: "p10",
    name: "Yash Kapoor",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    designation: "Business Analyst",
    company: "Times Group",
    year: "2024–25",
  },

  // 2023–24 Batch
  {
    id: "p11",
    name: "Vikas Ranade",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    designation: "Account Manager",
    company: "ABEC Exhibitions",
    year: "2023–24",
  },
  {
    id: "p12",
    name: "Neha Joshi",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    designation: "Campaign Lead",
    company: "Percept",
    year: "2023–24",
  },
  {
    id: "p13",
    name: "Sahil Deshmukh",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    designation: "Product Associate",
    company: "Hudl",
    year: "2023–24",
  },
  {
    id: "p14",
    name: "Tanvi Kulkarni",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    designation: "Trade Analyst",
    company: "Messe Muenchen",
    year: "2023–24",
  },
  {
    id: "p15",
    name: "Siddharth Roy",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    designation: "Corporate Associate",
    company: "Informa Markets",
    year: "2023–24",
  },

  // 2022–23 Batch
  {
    id: "p16",
    name: "Amit Trivedi",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    designation: "Business Strategist",
    company: "DNA Networks",
    year: "2022–23",
  },
  {
    id: "p17",
    name: "Kavita Rao",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
    designation: "PR Manager",
    company: "70 EMG",
    year: "2022–23",
  },
  {
    id: "p18",
    name: "Varun Sen",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
    designation: "Marketing Analyst",
    company: "Reset Live",
    year: "2022–23",
  },
  {
    id: "p19",
    name: "Pooja Hegde",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    designation: "Communications Lead",
    company: "Tamarind Global",
    year: "2022–23",
  },
  {
    id: "p20",
    name: "Nikhil Sawant",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    designation: "Talent Specialist",
    company: "Dharma Cornerstone",
    year: "2022–23",
  },
];

const YEARS = ["2024–25", "2023–24", "2022–23"];

export default function StudentPlacementsSection() {
  const [selectedYear, setSelectedYear] = useState<string>("2024–25");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredStudents = PLACED_STUDENTS.filter(
    (student) => student.year === selectedYear
  );

  // GSAP Fade-up effect when changing year tab
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".student-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [selectedYear]);

  return (
    <section
      className="py-20 md:py-28 text-white relative overflow-hidden font-sans select-none"
      style={{ background: "linear-gradient(207deg, rgb(2 185 214) 0%, rgb(15 98 87) 100%)" }}
    >
      {/* BACKGROUND SVG GRID ACCENT EFFECT */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="placements-section-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#placements-section-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px] relative z-10">
        
        {/* HEADING & YEAR FILTER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-100 font-sans block mb-1">
              Career Success
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              <span className="text-zinc-950">Student</span>{" "}
              <span className="font-serif italic text-white">Placements</span>
            </h2>
          </div>

          {/* YEAR FILTER OPTIONS (RIGHT SIDE) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {YEARS.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-zinc-950 shadow-md scale-105"
                      : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-md"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-COLUMN GRID (1 ROW = 5 CARDS ON DESKTOP) */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="student-card bg-white rounded-xl border border-white/20 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative w-full aspect-[4/4.5] bg-zinc-100 overflow-hidden">
                <Image
                  src={student.photo}
                  alt={student.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Student Info */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white text-left">
                <div>
                  <h3
                    className="font-display text-zinc-950 leading-snug group-hover:text-[#0f6257] transition-colors"
                    style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "0px" }}
                  >
                    {student.name}
                  </h3>
                  <p
                    className="font-sans text-zinc-500 font-normal mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {student.designation}
                  </p>
                </div>

                {/* Company Name */}
                <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                  <span
                    className="font-sans text-[#0f6257] truncate"
                    style={{ fontSize: "16px", fontWeight: 500 }}
                  >
                    {student.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
