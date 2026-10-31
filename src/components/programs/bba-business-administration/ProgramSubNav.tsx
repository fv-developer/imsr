"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, BookOpen, Layers, Sparkles, Briefcase, HelpCircle, PhoneCall } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const PROGRAM_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: <Layers className="w-[18px] h-[18px]" /> },
  { id: "curriculum", label: "Curriculum", icon: <BookOpen className="w-[18px] h-[18px]" /> },
  { id: "experience-learning", label: "Experience Learning", icon: <Sparkles className="w-[18px] h-[18px]" /> },
  { id: "industry-placement", label: "Industry Placement", icon: <Briefcase className="w-[18px] h-[18px]" /> },
  { id: "faqs", label: "FAQ's", icon: <HelpCircle className="w-[18px] h-[18px]" /> },
];

export default function ProgramSubNav() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky positioning check
      if (wrapperRef.current) {
        const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
        // When wrapper reaches header height (72px)
        if (wrapperTop <= 72) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }

      // 2. Active section tracking
      const sections = PROGRAM_NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(PROGRAM_NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* PLACEHOLDER WHEN FIXED TO PREVENT PAGE LAYOUT JUMP */}
      {isSticky && <div className="h-13 w-full" />}

      <div
        id="program-sub-nav"
        className={`w-full bg-[#00629f] text-white shadow-lg transition-all duration-200 ${
          isSticky
            ? "fixed top-[68px] md:top-[72px] left-0 z-40 shadow-xl animate-in fade-in duration-200"
            : "relative z-30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-13 overflow-x-auto no-scrollbar gap-2 sm:gap-6">
            
            {/* NAV ITEMS */}
            <nav className="flex items-center space-x-1 sm:space-x-2 min-w-max h-full">
              {PROGRAM_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`relative px-3.5 py-2 text-[13px] uppercase tracking-wider font-medium text-white transition-all duration-200 flex items-center gap-2 rounded-[10px] ${
                      isActive
                        ? "font-semibold bg-[#004d7c] shadow-inner"
                        : "opacity-85 hover:opacity-100 hover:bg-white/10"
                    }`}
                  >
                    {item.icon && (
                      <span className={isActive ? "text-[#42d392]" : "text-blue-200/80"}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* CALL FOR INQUIRY RIGHT BUTTON */}
            <div className="flex items-center pl-4 border-l border-white/20 min-w-max">
              <a
                href="tel:+918508173333"
                className="px-4 py-1.5 rounded-full bg-white hover:bg-zinc-100 text-[#00629f] font-medium text-[14px] uppercase tracking-normal transition-all duration-200 flex items-center gap-2 shadow-sm hover:scale-[1.02]"
              >
                <PhoneCall className="w-[18px] h-[18px] text-[#00629f]" />
                <span>Call For Inquiry</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
