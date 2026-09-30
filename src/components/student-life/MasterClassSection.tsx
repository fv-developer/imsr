"use client";

import React from "react";
import { motion } from "framer-motion";
import AccordionGallery from "@/components/ui/AccordionGallery";

export interface MasterClassItem {
  image: string;
  label: string;
  link?: string;
  alt?: string;
}

export interface MasterClassSectionProps {
  id?: string;
  title?: string;
  gradientTitle?: string;
  description?: string;
  items?: MasterClassItem[];
  theme?: "light" | "dark";
  accentColor?: string;
  gradientBg?: string;
  defaultIndex?: number;
  height?: number;
  className?: string;
}

const DEFAULT_MASTERCLASS_ITEMS: MasterClassItem[] = [
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    label: "Executive Leadership & Global Strategy",
    link: "#",
    alt: "Executive Leadership Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    label: "Corporate Financial Governance",
    link: "#",
    alt: "Corporate Finance Workshop"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    label: "AI & Digital Business Transformation",
    link: "#",
    alt: "AI Business Strategy Session"
  },
  {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    label: "Marketing Innovation & Consumer Insights",
    link: "#",
    alt: "Marketing Innovation Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    label: "Entrepreneurship & Venture Scaleup",
    link: "#",
    alt: "Entrepreneurship Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    label: "Supply Chain & Global Logistics",
    link: "#",
    alt: "Supply Chain Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    label: "Strategic Negotiations & M&A",
    link: "#",
    alt: "Strategic Negotiations Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    label: "Sustainable Business & ESG Management",
    link: "#",
    alt: "ESG Management Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    label: "Data Analytics & Business Intelligence",
    link: "#",
    alt: "Data Analytics Masterclass"
  },
  {
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop",
    label: "Executive PR & Corporate Reputation",
    link: "#",
    alt: "Corporate Reputation Masterclass"
  }
];

export default function MasterClassSection({
  id = "master-classes",
  title = "Master Class",
  gradientTitle = "Sessions.",
  description = "Interactive executive masterclasses led by industry leaders, C-suite executives, and global strategists designed to bridge academic frameworks with enterprise execution.",
  items = DEFAULT_MASTERCLASS_ITEMS,
  theme = "light",
  accentColor,
  gradientBg,
  defaultIndex = 4,
  height = 500,
  className = "",
}: MasterClassSectionProps) {
  const isDark = theme === "dark";

  const resolvedAccent = accentColor || (isDark ? "#00bcda" : "#00b4d8");
  const resolvedGradient =
    gradientBg ||
    (isDark
      ? "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))"
      : "linear-gradient(135deg, rgb(7, 116, 130), rgb(0, 130, 200))");

  return (
    <section
      id={id}
      className={`${
        isDark
          ? "bg-zinc-950 text-white border-t border-zinc-900"
          : "bg-[#f8f9fa] text-zinc-900"
      } py-[100px] relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* HEADER SECTION WITH MOTION FADE UP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          {/* FLEX ROW: HEADING 40% | PARAGRAPH 60% EXACT TOP ALIGNMENT */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            {/* LEFT SIDE 40%: HEADING */}
            <div className="w-full lg:w-[40%] flex flex-col items-start text-left">
              <h2
                className={`font-display font-medium text-[32px] sm:text-[48px] tracking-tight leading-[40px] sm:leading-[52px] ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}
              >
                {title}
                <br />
                <span
                  className="font-medium inline-block pb-1 italic font-serif pr-3"
                  style={{
                    background: resolvedGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {gradientTitle}
                </span>
              </h2>
            </div>

            {/* RIGHT SIDE 60%: PARAGRAPH */}
            <div className="w-full lg:w-[60%] flex flex-col items-start text-left lg:pt-1.5">
              <p
                className={`font-sans font-light text-base sm:text-lg leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ACCORDION GALLERY COMPONENT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full"
        >
          <AccordionGallery
            items={items}
            defaultIndex={defaultIndex}
            expandRatio={0.46}
            trigger="hover"
            height={height}
            gap={8}
            radius={14}
            accentColor={resolvedAccent}
            textColor="#ffffff"
            overlayColor={isDark ? "#09090b" : "#020d1a"}
            grayscale={true}
          />
        </motion.div>
      </div>
    </section>
  );
}

