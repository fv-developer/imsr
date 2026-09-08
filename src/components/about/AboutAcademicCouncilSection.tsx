"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  image: string;
}

export type TabCategory = "founding" | "academicians" | "experts" | "mentors";

const COUNCIL_DATA: Record<TabCategory, CouncilMember[]> = {
  founding: [
    {
      id: "f1",
      name: "Dr. Vikramaditya Roy",
      role: "Founding Academic Dean",
      credentials: "Former Director of Management Studies, IIT Bombay | PhD IIM Ahmedabad",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "f2",
      name: "Prof. Sunita Deshmukh",
      role: "Co-Founder & Vice Chair",
      credentials: "Ex-Dean of Executive Education, ISB | Senior Research Fellow, Oxford",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "f3",
      name: "Dr. Edward Rogers",
      role: "Chief Academic Officer",
      credentials: "Former Chief Knowledge Officer, NASA Goddard Space Flight Center",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "f4",
      name: "Dr. Daniel Garrett",
      role: "Strategic Academic Advisor",
      credentials: "Executive Director, Cornell University International Business Program",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "f5",
      name: "Prof. Arvind Subramanian",
      role: "Distinguished Founding Fellow",
      credentials: "Former Chief Economic Advisor | Fellow, Harvard Kennedy School",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
  ],
  academicians: [
    {
      id: "a1",
      name: "Dr. Meera Iyer",
      role: "Head of Marketing & Analytics",
      credentials: "PhD Business Analytics, Wharton School | 15+ Yrs Academic Leadership",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "a2",
      name: "Prof. Rajesh Kulkarni",
      role: "Professor of Financial Economics",
      credentials: "PhD Finance, London School of Economics | Editor, Journal of Finance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "a3",
      name: "Dr. Kavita Nambiar",
      role: "Chairperson, Digital Business",
      credentials: "Postdoc Stanford AI Lab | Former Research Director, INSEAD",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "a4",
      name: "Prof. Alok Mukherjee",
      role: "Professor of Strategy & Innovation",
      credentials: "PhD Corporate Governance, Cambridge University | Author of 4 Books",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "a5",
      name: "Dr. Shalini Kapoor",
      role: "Head of Experiential Learning",
      credentials: "PhD Organizational Behavior, Kellogg School of Management",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
    },
  ],
  experts: [
    {
      id: "e1",
      name: "Mr. Manoj Kohli",
      role: "Chief Industry Evangelist",
      credentials: "Former Country Head, SoftBank Group | Ex-MD & CEO, Bharti Airtel",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "e2",
      name: "Ms. Ananya Chawla",
      role: "Global Managing Director",
      credentials: "Partner, McKinsey & Company | Board Member, Global FinTech Alliance",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "e3",
      name: "Mr. Tarun Gangwar",
      role: "Venture Partner & Strategist",
      credentials: "Former Director, Vedantu | Managing Partner, Horizon Capital",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "e4",
      name: "Ms. Ritu Mathur",
      role: "VP of Enterprise Innovation",
      credentials: "Vice President, Microsoft APAC | Board Director, AI Enterprise Council",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "e5",
      name: "Mr. Siddharth Mehta",
      role: "Chief Strategy Advisor",
      credentials: "Senior Managing Director, Blackstone India | Angel Investor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
  ],
  mentors: [
    {
      id: "m1",
      name: "Mr. Pratham Mittal",
      role: "Entrepreneurship Mentor",
      credentials: "Founder, Outgrow | Angel Investor & Startup Incubator Mentor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m2",
      name: "Ms. Priyanka Sen Gupta",
      role: "Executive Leadership Coach",
      credentials: "Former Chief Human Resources Officer, Unilever South Asia",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m3",
      name: "Dr. Rohan Bansal",
      role: "Global Alumni Mentor",
      credentials: "Senior Product Lead, Google AI | Stanford Executive Scholar",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m4",
      name: "Ms. Neha Singhania",
      role: "Venture Mentor",
      credentials: "Co-Founder, Catalyst Ventures | Mentor at NITI Aayog Atal Innovation",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m5",
      name: "Mr. Aditya Vardhan",
      role: "Corporate Finance Mentor",
      credentials: "Former Managing Director, Goldman Sachs | Strategic Growth Mentor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

const TABS: { key: TabCategory; label: string }[] = [
  { key: "founding", label: "Founding Academic Council" },
  { key: "academicians", label: "Academicians" },
  { key: "experts", label: "Industry Experts" },
  { key: "mentors", label: "Mentors" },
];

export default function AboutAcademicCouncilSection() {
  const [activeTab, setActiveTab] = useState<TabCategory>("founding");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentMembers = COUNCIL_DATA[activeTab] || [];

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".anim-word");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );

        const gradientSpan = headingRef.current.querySelector(".fade-up-scroll");
        if (gradientSpan) {
          gsap.fromTo(
            gradientSpan,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.25,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#f3f3f3] py-16 md:py-24 border-t border-zinc-200/60 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADING */}
        <div className="mb-6 sm:mb-8">
          <h2 ref={headingRef} className="font-display font-medium text-3xl sm:text-4xl md:text-[48px] text-zinc-950 tracking-tight leading-tight flex flex-wrap items-baseline gap-x-3">
            <SplitText text="Meet Our Faculty," />
            <span
              className="font-medium inline-block pr-3 italic font-serif fade-up-scroll opacity-0"
              style={{
                background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 98, 159))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mentors &amp; Counsellors
            </span>
          </h2>
        </div>

        {/* TABS FILTER BAR & ALIGNED SLIDER CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          
          {/* TABS */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-300 whitespace-nowrap border ${
                    isActive
                      ? "bg-[#00629f] text-white border-[#00629f] shadow-sm"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:text-zinc-950"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* NAVIGATION ARROWS ALIGNED WITH BUTTONS */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-950 text-zinc-800 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-950 text-zinc-800 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

        {/* CAROUSEL SLIDER CONTAINER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6 -mx-2 px-2"
            >
              {currentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-none w-[220px] sm:w-[240px] lg:w-[calc((100%-80px)/5)] snap-start group cursor-pointer"
                >
                  {/* Image Box with soft mint/teal background tint & bottom name overlay */}
                  <div className="relative w-full aspect-[3/4] rounded-[12px] overflow-hidden bg-gradient-to-b from-[#e6f4f1] to-[#d8ede8] border border-zinc-100 shadow-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Bottom gradient shadow overlay for name readability */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-end p-4">
                      <h3 className="font-display font-medium text-white text-[14px] uppercase tracking-[0.4px] leading-snug drop-shadow-sm">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  {/* Details Below Image */}
                  <div className="pt-4 flex flex-col gap-1">
                    <p className="font-display font-medium text-zinc-950 text-[17px] sm:text-[18px] leading-snug">
                      {member.role}
                    </p>
                    <p className="font-sans font-light text-zinc-500 text-xs sm:text-[14.5px] leading-relaxed line-clamp-2">
                      {member.credentials}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
