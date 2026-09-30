"use client";

import React from "react";
import { motion } from "framer-motion";

interface SessionCard {
  id: string;
  title: string;
  description: string;
  bgColor: string;
}

const SESSIONS_DATA: SessionCard[] = [
  {
    id: "01",
    title: "Regular Lectures",
    description:
      "To positively impact the perspective of our students, lectures are delivered by our experienced core team of faculty, along with visiting faculty from top Management Institutes, and professionals from the Industry.",
    bgColor: "bg-[#0a947a]",
  },
  {
    id: "02",
    title: "Assignments & Projects",
    description:
      "Assignments and projects are a part of our curricula. These provide our students ample opportunities to meet, interact and build relations with popular and experienced individuals in the Industry, under the able guidance of our dedicated faculty.",
    bgColor: "bg-[#df7400]",
  },
  {
    id: "03",
    title: "Knowledge Workshops",
    description:
      "To keep our students updated with the current affairs in the Management Industry, we frequently organize uniquely designed workshops that focus on industry-oriented themes shortlisted by our team of experts.",
    bgColor: "bg-[#800e5c]",
  },
  {
    id: "04",
    title: "Simulated Sessions",
    description:
      "We have developed an exceptional methodology that helps replicate the process of organizing and managing situations in real time. Students are trained to formulate a model event and present it live in the classroom.",
    bgColor: "bg-[#0082c8]",
  },
];

export default function ClassroomSessions() {
  return (
    <section 
      className="text-white py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79, 7, 65) 100%)",
      }}
    >
      {/* GLOW DECORATIVE BACKGROUND */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-20"
        style={{
          background: "radial-gradient(ellipse at top, rgba(0, 188, 218, 0.25), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-[15px] relative z-10">
        {/* HEADER SECTION ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-14 md:mb-20"
        >
          <h2 className="font-display font-medium text-[32px] sm:text-[48px] tracking-tight leading-[40px] sm:leading-[48px] text-white mb-6">
            Classroom{" "}
            <span
              className="font-medium inline-block pb-1 italic font-serif pr-3"
              style={{
                background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sessions.
            </span>
          </h2>
          <p className="text-zinc-200 font-sans font-light text-base sm:text-lg leading-relaxed max-w-3xl">
            An immersive multi-dimensional pedagogical framework designed to blend academic rigor with real-world executive management experience.
          </p>
        </motion.div>

        {/* 4 COLORED CARDS GRID CONTAINER WITH STAGGERED REVEAL */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.18,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {SESSIONS_DATA.map((session) => (
            <motion.div
              key={session.id}
              variants={{
                hidden: { opacity: 0, y: 45, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.215, 0.61, 0.355, 1],
                  },
                },
              }}
              className={`${session.bgColor} relative pt-[70px] pb-[70px] px-6 md:px-8 flex flex-col justify-between text-white transition-all duration-300 hover:brightness-105 group`}
            >
              {/* TOP RIGHT GIANT NUMBER */}
              <span className="absolute top-6 right-6 font-display font-bold text-6xl md:text-7xl text-white/20 select-none pointer-events-none">
                {session.id}
              </span>

              <div className="flex flex-col justify-start h-full">
                {/* HEADING (FONT-WEIGHT: 400, LINE-HEIGHT: 35PX, MARGIN-BOTTOM: 10PX) */}
                <h3 
                  className="font-sans text-[26px] font-normal text-white tracking-tight mb-[10px] break-words pr-12"
                  style={{ lineHeight: "30px" }}
                >
                  {session.title}
                </h3>

                {/* PARAGRAPH (FONT-SIZE: 17PX, FONT-WEIGHT: 300) */}
                <p className="text-[#f3f3f3] text-[17px] font-sans font-light leading-relaxed break-words">
                  {session.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
