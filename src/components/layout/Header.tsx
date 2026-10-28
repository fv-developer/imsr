"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import SearchDrawer from "./SearchDrawer";

const TOP_NAV_LINKS = [
  { name: "Industry Placement", href: "/industry-placement" },
  { name: "Campus Tour", href: "/#campus-tour" },
  { name: "News & Blog", href: "/news-blog" },
  { name: "Events", href: "/events" },
  { name: "Contact Us", href: "/#contact" },
];

const MAIN_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Programs", href: "/#programs", hasMega: true },
  { name: "Student Life", href: "/student-life" },
  { name: "Faculty", href: "/faculty" },
];

const MEGA_MENU_DATA: Record<string, { title: string; href: string }[]> = {
  "BBA": [
    { title: "BBA (Hons.) in Business Administration", href: "/programs/bba-in-business-administration" },
    { title: "BBA (Hons.) in Business Administration (Marketing Management)", href: "/programs/bba-in-business-administration-marketing-management" },
    { title: "BBA (Hons.) in Business Administration (Entrepreneurship)", href: "/programs/bba-in-business-administration-entrepreneurship" },
    { title: "BBA (Hons.) in Artificial Intelligence", href: "/programs/bba-in-artificial-intelligence" },
  ],
  "B.Com": [
    { title: "B.Com (Hons.) in Business Administration", href: "/programs/bcom-in-business-administration" },
    { title: "B.Com (Hons.) in Business Administration (Marketing Management)", href: "/programs/bcom-in-business-administration-marketing-management" },
    { title: "B.Com (Hons.) in Business Administration (Entrepreneurship)", href: "/programs/bcom-in-business-administration-entrepreneurship" },
    { title: "B.Com (Hons.) in Business Administration (Artificial Intelligence)", href: "/programs/bcom-in-business-administration-artificial-intelligence" },
  ],
  "Digital Media & AI": [
    { title: "B.Sc (Hons.) in Digital Media & Growth Marketing", href: "/programs/bsc-in-digital-media-growth-marketing" },
    { title: "Diploma in Digital Media and Growth Marketing", href: "/programs/diploma-in-digital-media-and-growth-marketing" },
  ],
};

const MEGA_MENU_OVERVIEW_LIST = [
  { title: "Industry Placement Cell", href: "/industry-placement" },
  { title: "Experiential Learning Modules", href: "#" },
  { title: "Scholarships & Grants", href: "#" },
];

interface HeaderProps {
  activeNav?: string;
}

export default function Header({ activeNav }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>("BBA");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

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

  // Lock body scroll and pause Lenis when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-none lg:shadow-md border-b border-zinc-200 py-3"
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
            <div className="relative h-10 sm:h-12 w-40 sm:w-48 md:w-56">
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
                    className="py-2 relative group"
                  >
                    <Link
                      href={link.href}
                      className={`menu-underline-effect hover:text-brand-secondary transition-colors duration-200 uppercase flex items-center gap-1.5 font-kanit text-[15px] font-medium tracking-wide ${
                        isScrolled ? "text-zinc-950" : "text-zinc-100"
                      } ${isActive ? "text-brand-secondary font-semibold" : ""}`}
                    >
                      <span>{link.name}</span>
                      {(link.hasMega || (link as any).hasDropdown) && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-250 ${
                            isMegaMenuOpen && link.hasMega
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

            <div className="flex items-center gap-2 sm:gap-6">
              {/* Search Icon (Visible on mobile & desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 hover:text-brand-secondary transition-colors duration-200 rounded-full ${
                  isScrolled ? "text-zinc-800 hover:bg-zinc-100" : "text-zinc-100 hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Apply Now Button (Desktop) */}
              <Link
                href="/#apply"
                className="hidden sm:flex btn-fill-effect px-[30px] py-[10px] rounded-full bg-brand-secondary text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] border border-transparent shadow-sm select-none active:scale-[0.98] transition-all duration-[350ms] items-center justify-center"
                style={{ "--btn-hover-bg": "#00937e", height: "auto" } as React.CSSProperties}
              >
                <span className="relative z-10">Apply Now</span>
              </Link>

              {/* Mobile Drawer Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 hover:text-brand-secondary transition-colors duration-200 rounded-lg ${
                  isScrolled ? "text-zinc-900 hover:bg-zinc-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Open Menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            {/* DYNAMIC MEGA MENU DROPDOWN (DESKTOP) */}
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
                      <Link key={idx} href={item.href} className="w-full flex" onClick={() => setIsMegaMenuOpen(false)}>
                        <span className="program-underline-effect font-kanit font-normal text-[14px] text-zinc-600 hover:text-brand-primary transition-all duration-200 cursor-pointer select-none">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE FULL-WIDTH SLIDE-IN MENU DRAWER */}
        <div
          className={`fixed inset-0 h-dvh w-full max-w-full bg-white text-zinc-900 z-[9999] lg:hidden flex flex-col transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200/90 bg-white flex-shrink-0">
            <div className="relative h-10 w-44">
              <Image
                src="/images/logo.png"
                alt="IMSR Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Content (Unified single menu list with natural height scroll) */}
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-1 bg-white overscroll-contain no-scrollbar"
            style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          >
            
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Home"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "About Us"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              About Us
            </Link>

            {/* Programs Expandable Section */}
            <div className="rounded-xl">
              <button
                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                className={`w-full flex items-center justify-between py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                  activeNav === "Programs" || mobileProgramsOpen
                    ? "text-brand-secondary bg-zinc-50 font-medium"
                    : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
                }`}
              >
                <span>Programs</span>
                <svg
                  className={`w-4.5 h-4.5 transition-transform duration-200 ${
                    mobileProgramsOpen ? "rotate-180 text-brand-secondary" : "text-zinc-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Submenu with 100% natural auto height */}
              {mobileProgramsOpen && (
                <div 
                  className="ml-4 pl-3.5 border-l-2 border-brand-secondary/30 my-3 space-y-4"
                  style={{ height: "auto", maxHeight: "none" }}
                >
                  {Object.entries(MEGA_MENU_DATA).map(([category, progs]) => (
                    <div key={category} className="space-y-2">
                      <span className="text-[17px] font-medium text-brand-secondary uppercase tracking-wider block !font-medium">
                        {category}
                      </span>
                      <div className="space-y-1.5">
                        {progs.map((p, pIdx) => (
                          <Link
                            key={pIdx}
                            href={p.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-[16px] font-sans font-normal tracking-normal text-zinc-700 hover:text-brand-primary py-1 transition-colors leading-snug"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Student Life */}
            <Link
              href="/student-life"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Student Life"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Student Life
            </Link>

            {/* Faculty */}
            <Link
              href="/faculty"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Faculty"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Faculty
            </Link>

            {/* Industry Placement */}
            <Link
              href="/industry-placement"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Industry Placement"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Industry Placement
            </Link>

            {/* Campus Tour */}
            <Link
              href="/#campus-tour"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary transition-colors"
            >
              Campus Tour
            </Link>

            {/* News & Blog */}
            <Link
              href="/news-blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "News & Blog"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              News & Blog
            </Link>

            {/* Events */}
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Events"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Events
            </Link>

            {/* Contact Us */}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3.5 rounded-xl text-[17px] font-kanit font-normal transition-colors ${
                activeNav === "Contact Us"
                  ? "bg-brand-secondary/10 text-brand-secondary font-medium"
                  : "text-zinc-800 hover:bg-zinc-50 hover:text-brand-primary"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Drawer Bottom Action CTA */}
          <div className="p-5 border-t border-zinc-200/90 bg-white flex-shrink-0">
            <Link
              href="/#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-3.5 px-6 rounded-full bg-brand-secondary hover:bg-[#00937e] text-white font-kanit font-medium text-base uppercase tracking-wider transition-colors shadow-md active:scale-[0.98]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      {/* SEARCH DRAWER */}
      <SearchDrawer isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
