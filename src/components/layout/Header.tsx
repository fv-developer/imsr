"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

const TOP_NAV_LINKS = [
  { name: "Industry Placement", href: "/#industry-relations" },
  { name: "Campus Tour", href: "/#campus-tour" },
  { name: "Blog & Events", href: "/#blog" },
  { name: "Contact Us", href: "/#contact" },
];

const MAIN_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/#programs", hasMega: true },
  { name: "Student Life", href: "/#student-life" },
  { name: "Faculty", href: "/#faculty" },
];

const MEGA_MENU_DATA: Record<string, { title: string; href: string }[]> = {
  "B.B.A.": [
    { title: "B.B.A. (Hons.) In Business Administration", href: "/programs/bba-business-administration" },
    { title: "B.B.A.(Hons.) in Business Administration (Entrepreneurship)", href: "/#programs" },
    { title: "B.B.A. (Hons.) in Digital Marketing", href: "/#programs" },
  ],
  "B.Com.": [
    { title: "B.Com. (Hons.) in Business Administration (Entrepreneurship)", href: "/#programs" },
    { title: "B.Com. (Hons.) in Business Administration", href: "/#programs" },
  ],
  "Digital Media & AI": [
    { title: "B.Sc. (Hons.) in Digital Media & Growth Marketing", href: "/#programs" },
    { title: "Diploma in Digital Media and Growth Marketing", href: "/#programs" },
    { title: "B.B.A. (Hons.)* in Artificial Intelligence", href: "/#programs" },
  ],
};

const MEGA_MENU_OVERVIEW_LIST = [
  "Industry Placement Cell",
  "Experiential Learning Modules",
  "Scholarships & Grants",
  "Admissions Booking 2025",
];

interface HeaderProps {
  activeNav?: string;
}

export default function Header({ activeNav }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>("B.B.A.");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-md border-b border-zinc-200 py-3"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5"
        }`}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        {/* Top level bar (Hidden on scroll) */}
        {!isScrolled && (
          <div className="hidden lg:block border-b border-white/10 pb-2.5 mb-2.5">
            <div className="max-w-7xl mx-auto px-[15px] flex items-center justify-end text-[13.5px] font-kanit font-light tracking-wider text-zinc-300">
              <div className="flex items-center gap-6">
                {TOP_NAV_LINKS.map((link, idx) => (
                  <Link key={idx} href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Nav level bar */}
        <div className="max-w-7xl mx-auto px-[15px] flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-48 md:w-56">
              <Image
                src="/images/logo.png"
                alt="IMSR Logo"
                fill
                className={`object-contain object-left transition-all duration-300 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-6 lg:gap-8 md:gap-10">
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {MAIN_NAV_LINKS.map((link, idx) => {
                const isActive = activeNav === link.name;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      if (link.hasMega) {
                        setIsMegaMenuOpen(true);
                      } else {
                        setIsMegaMenuOpen(false);
                      }
                    }}
                    className="py-2"
                  >
                    <Link
                      href={link.href}
                      className={`menu-underline-effect hover:text-brand-secondary transition-colors duration-200 uppercase flex items-center gap-1.5 font-kanit text-[15px] font-medium tracking-wide ${
                        isScrolled ? "text-zinc-950" : "text-zinc-100"
                      } ${isActive ? "text-brand-secondary font-semibold" : ""}`}
                    >
                      <span>{link.name}</span>
                      {link.hasMega && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-250 ${
                            isMegaMenuOpen
                              ? "rotate-180 text-brand-secondary"
                              : isScrolled
                              ? "text-zinc-600"
                              : "text-zinc-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hidden sm:flex items-center gap-6">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-1 hover:text-brand-secondary transition-colors duration-200 ${
                  isScrolled ? "text-zinc-800" : "text-zinc-200"
                }`}
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/#apply"
                className="btn-fill-effect px-[30px] py-[10px] rounded-full bg-brand-secondary text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] border border-transparent shadow-sm select-none active:scale-[0.98] transition-all duration-[350ms] flex items-center justify-center"
                style={{ "--btn-hover-bg": "#00937e", height: "auto" } as React.CSSProperties}
              >
                <span className="relative z-10">Apply Now</span>
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 hover:text-brand-secondary transition-colors duration-200 ${
                isScrolled ? "text-zinc-900" : "text-white"
              }`}
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            {/* DYNAMIC MEGA MENU DROPDOWN */}
            <div
              className={`absolute top-full left-0 right-0 max-w-[1100px] mx-auto bg-white text-zinc-900 border border-zinc-200/80 rounded-2xl shadow-2xl transition-all duration-355 ease-in-out z-50 ${
                isMegaMenuOpen
                  ? "opacity-100 translate-y-2 pointer-events-auto visible"
                  : "opacity-0 -translate-y-4 pointer-events-none invisible"
              }`}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="py-12 px-12 grid grid-cols-12 gap-0 items-start">
                <div className="col-span-4 flex flex-col items-start pr-8">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Category
                  </span>
                  <div className="flex flex-col gap-0 w-full">
                    {Object.keys(MEGA_MENU_DATA).map((category, idx) => {
                      const isActive = activeMegaCategory === category;
                      return (
                        <button
                          key={idx}
                          onMouseEnter={() => setActiveMegaCategory(category)}
                          className={`font-kanit text-[17px] text-left transition-all duration-200 flex items-center gap-4 w-full pr-4 py-1 outline-none select-none ${
                            isActive
                              ? "text-zinc-950 font-medium pl-2 translate-x-1"
                              : "text-zinc-400 hover:text-zinc-800 font-light"
                          }`}
                        >
                          <span>{category}</span>
                          {isActive && (
                            <span className="text-zinc-950 text-lg font-sans font-light transition-transform duration-200">
                              &rarr;
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="col-span-4 flex flex-col items-start px-8 border-l border-zinc-200">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Programs
                  </span>
                  <div className="flex flex-col gap-3 w-full">
                    {MEGA_MENU_DATA[activeMegaCategory]?.map((prog, idx) => (
                      <Link key={idx} href={prog.href} className="w-full flex" onClick={() => setIsMegaMenuOpen(false)}>
                        <span className="program-underline-effect font-kanit font-normal text-[14px] text-zinc-600 hover:text-brand-primary transition-all duration-200 cursor-pointer select-none">
                          {prog.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 flex flex-col items-start pl-8 border-l border-zinc-200">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Programme Overview
                  </span>
                  <div className="flex flex-col gap-3 w-full">
                    {MEGA_MENU_OVERVIEW_LIST.map((item, idx) => (
                      <Link key={idx} href="/#programs" className="w-full flex" onClick={() => setIsMegaMenuOpen(false)}>
                        <span className="program-underline-effect font-kanit font-normal text-[14px] text-zinc-600 hover:text-brand-primary transition-all duration-200 cursor-pointer select-none">
                          {item}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-800 py-6 px-6 shadow-xl flex flex-col gap-5 z-50">
            <div className="flex flex-col gap-4">
              {MAIN_NAV_LINKS.map((link, idx) => (
                <div key={idx}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-kanit font-medium text-sm tracking-widest text-zinc-300 hover:text-brand-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="h-px bg-zinc-800 my-2" />
            <Link
              href="/#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-[10px] px-[30px] rounded-full bg-brand-secondary text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px]"
            >
              Apply Now
            </Link>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-6">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3 text-zinc-400">
                <Search className="w-5 h-5" />
                <span className="font-display text-lg text-white font-medium">Search IMSR</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs, admissions, campus..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00bcda] transition-colors"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
