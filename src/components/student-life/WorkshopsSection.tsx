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
    title: "Executive Data Analytics & Power BI",
    desc: "Turn raw enterprise data into actionable executive insights using Power BI, SQL, and predictive models.",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Financial Modeling & Valuation",
    desc: "Build robust 3-statement models, DCF valuations, and LBO frameworks for corporate dealmakers.",
    src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Design Thinking & Product Strategy",
    desc: "Human-centric problem solving, empathy mapping, rapid prototyping, and lean validation loops.",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Applied Generative AI for Managers",
    desc: "Leverage enterprise AI tools, custom agent architectures, and automated workflow integrations.",
    src: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "05",
    title: "Pitching & Executive Presence",
    desc: "Command the boardroom with high-stakes pitch architecture, storytelling, and media mastery.",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "06",
    title: "Agile Execution & Scrum Leadership",
    desc: "Deliver complex enterprise projects on time with OKR alignment and Scrum framework simulations.",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function WorkshopsSection({
  id = "specialized-workshops",
  title = "Specialized",
  gradientTitle = "Workshops.",
  description = "Intensive, immersive bootcamps and hands-on laboratory sessions designed to equip management professionals with immediate, industry-ready technical and leadership competencies.",
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


