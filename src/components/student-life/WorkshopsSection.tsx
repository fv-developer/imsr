"use client";

import React from "react";
import { motion } from "framer-motion";
import InfinitePerspectiveSlider from "@/components/ui/infinite-perspective-slider";

export interface WorkshopItem {
  number: string;
  title: string;
  desc: string;
  src: string;
}

export interface WorkshopsSectionProps {
  id?: string;
  title?: string;
  gradientTitle?: string;
  description?: string;
  items?: WorkshopItem[];
  className?: string;
}

const DEFAULT_WORKSHOPS_DATA: WorkshopItem[] = [
  {
    number: "01",
    title: "Smart Classrooms & Lecture Theatres",
    desc: "Acoustically engineered, multimedia-enabled learning spaces built for interactive discussions and case study sessions.",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0894.jpg",
  },
  {
    number: "02",
    title: "High-Tech Computing & AI Labs",
    desc: "Next-gen computing infrastructure equipped with advanced analytics tools, business software, and high-speed networks.",
    src: "/images/campus_explore.jpg",
  },
  {
    number: "03",
    title: "Central Library & Digital Resource Centre",
    desc: "Vast collection of global business journals, management treatises, research databases, and quiet study alcoves.",
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Executive Seminar Halls & Boardrooms",
    desc: "Corporate-grade conference facilities designed for high-stakes presentations, panel debates, and industry symposiums.",
    src: "/images/imsr_campus_building.jpg",
  },
  {
    number: "05",
    title: "Incubation Centre & Innovation Pods",
    desc: "Collaborative ideation zones where student founders prototype business ventures and receive expert faculty mentorship.",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-IMG20240108165343.jpg",
  },
  {
    number: "06",
    title: "Student Lounges & Open Collaboration Arenas",
    desc: "Dynamic open spaces designed for team projects, peer interactions, student club activities, and campus networking.",
    src: "/images/student-life/activity/activity-center.jpg",
  },
];

export default function WorkshopsSection({
  id = "campus-tour",
  title = "Campus",
  gradientTitle = "Tour.",
  description = "Explore the state-of-the-art infrastructure, modern lecture theatres, innovation labs, central libraries, and vibrant collaborative spaces across IMSR campuses.",
  items = DEFAULT_WORKSHOPS_DATA,
  className = "",
}: WorkshopsSectionProps) {
  return (
    <section id={id} className={`bg-zinc-950 text-white py-[100px] relative overflow-hidden border-t border-zinc-900 ${className}`}>
      {/* GLOW BACKGROUND EFFECT */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(7, 116, 130, 0.4), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-10 md:mb-12">
        {/* HEADER SECTION ALIGNED WITH SITE DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* FLEX ROW: HEADING 40% | PARAGRAPH 60% */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            {/* LEFT SIDE 40%: HEADING */}
            <div className="w-full lg:w-[40%] flex flex-col items-start text-left">
              <h2 className="font-display font-medium text-[32px] sm:text-[48px] tracking-tight leading-[40px] sm:leading-[52px] text-white">
                {title}
                <br />
                <span
                  className="font-medium inline-block pb-1 italic font-serif pr-3"
                  style={{
                    background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {gradientTitle}
                </span>
              </h2>
            </div>

            {/* RIGHT SIDE 60%: PARAGRAPH ALIGNED TO TOP OF HEADING */}
            <div className="w-full lg:w-[60%] flex flex-col items-start text-left lg:pt-1.5">
              <p className="text-zinc-400 font-sans font-light text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D PERSPECTIVE INFINITE SLIDER */}
      <div className="w-full relative z-10">
        <InfinitePerspectiveSlider
          images={items}
          autoPlay={true}
          autoPlaySpeed={0.8}
          showScrollIndicator={false}
        />
      </div>
    </section>
  );
}


