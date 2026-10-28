"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, BookOpen, GraduationCap, Building2, UserCheck, Calendar, Sparkles } from "lucide-react";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Searchable items across IMSR Website
const SEARCH_DATABASE = [
  // Programs
  {
    title: "BBA (Hons.) in Business Administration",
    category: "Program",
    href: "/programs/bba-in-business-administration",
    keywords: "bba business administration undergraduate degree management bachelors",
    icon: GraduationCap,
  },
  {
    title: "BBA (Hons.) in Business Administration (Marketing Management)",
    category: "Program",
    href: "/programs/bba-in-business-administration-marketing-management",
    keywords: "bba marketing management growth advertising branding sales business",
    icon: GraduationCap,
  },
  {
    title: "BBA (Hons.) in Business Administration (Entrepreneurship)",
    category: "Program",
    href: "/programs/bba-in-business-administration-entrepreneurship",
    keywords: "bba entrepreneurship startup business innovation founder management",
    icon: GraduationCap,
  },
  {
    title: "BBA (Hons.) in Artificial Intelligence",
    category: "Program",
    href: "/programs/bba-in-artificial-intelligence",
    keywords: "bba ai artificial intelligence business technology data analytics future",
    icon: GraduationCap,
  },
  {
    title: "B.Com (Hons.) in Business Administration",
    category: "Program",
    href: "/programs/bcom-in-business-administration",
    keywords: "bcom commerce finance accounting business administration hons degree",
    icon: GraduationCap,
  },
  {
    title: "B.Com (Hons.) in Business Administration (Marketing Management)",
    category: "Program",
    href: "/programs/bcom-in-business-administration-marketing-management",
    keywords: "bcom marketing commercial marketing advertising sales finance",
    icon: GraduationCap,
  },
  {
    title: "B.Com (Hons.) in Business Administration (Entrepreneurship)",
    category: "Program",
    href: "/programs/bcom-in-business-administration-entrepreneurship",
    keywords: "bcom entrepreneurship startup business venture commerce finance",
    icon: GraduationCap,
  },
  {
    title: "B.Com (Hons.) in Business Administration (Artificial Intelligence)",
    category: "Program",
    href: "/programs/bcom-in-business-administration-artificial-intelligence",
    keywords: "bcom ai artificial intelligence commerce technology fintech data",
    icon: GraduationCap,
  },
  {
    title: "B.Sc (Hons.) in Digital Media & Growth Marketing",
    category: "Program",
    href: "/programs/bsc-in-digital-media-growth-marketing",
    keywords: "bsc digital media growth marketing technology analytics content creation",
    icon: GraduationCap,
  },
  {
    title: "Diploma in Digital Media and Growth Marketing",
    category: "Diploma",
    href: "/programs/diploma-in-digital-media-and-growth-marketing",
    keywords: "diploma digital media growth marketing short course certification",
    icon: BookOpen,
  },

  // Admissions & Financials
  {
    title: "Admissions 2026 - Apply Online",
    category: "Admissions",
    href: "/#apply",
    keywords: "apply online admission 2026 booking form registration eligibility fees cutoff",
    icon: UserCheck,
  },
  {
    title: "Scholarships & Financial Grants",
    category: "Admissions",
    href: "/#programs",
    keywords: "scholarship grant fee financial assistance merit aid discount waiver",
    icon: Sparkles,
  },

  // Campus & Facilities
  {
    title: "Campus Tour & Infrastructure",
    category: "Campus Life",
    href: "/#campus-tour",
    keywords: "campus tour infrastructure Malad Mumbai facilities library hostel classrooms lab",
    icon: Building2,
  },
  {
    title: "Industry Placement & Corporate Cell",
    category: "Career",
    href: "/industry-placement",
    keywords: "placement industry career jobs internship package recruiters companies hiring",
    icon: Building2,
  },
  {
    title: "Student Life & Campus Clubs",
    category: "Campus Life",
    href: "/student-life",
    keywords: "student life events cultural sports clubs festival activities community",
    icon: Calendar,
  },
  {
    title: "Faculty Directory & Academic Mentors",
    category: "Academics",
    href: "/#faculty",
    keywords: "faculty teachers professors mentors team leadership experts dean",
    icon: UserCheck,
  },
  {
    title: "About Institute of Management Studies and Research",
    category: "About Us",
    href: "/about-us",
    keywords: "about imsr history vision mission accreditation futurevarsity mkes group",
    icon: BookOpen,
  },
  {
    title: "News & Blog",
    category: "News",
    href: "/news-blog",
    keywords: "news articles blog events updates announcements press stories imsr",
    icon: BookOpen,
  },
  {
    title: "Contact Us & Campus Address",
    category: "Contact",
    href: "/#contact",
    keywords: "contact address email phone number map location Malad Mumbai enquiry",
    icon: Building2,
  },
];

const POPULAR_SEARCH_TAGS = [
  "BBA (Hons.)",
  "Digital Marketing",
  "Admissions 2026",
  "Campus Tour",
  "Faculty",
  "Industry Placement",
  "Diploma Programs",
  "Scholarships",
];

const QUICK_DESTINATIONS = [
  { label: "Explore Programs", href: "/#programs" },
  { label: "Book Campus Tour", href: "/#campus-tour" },
  { label: "Admissions 2026", href: "/#apply" },
  { label: "Placement Statistics", href: "/industry-placement" },
];

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = searchQuery.trim()
    ? SEARCH_DATABASE.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Right Side Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[100] w-full max-w-[450px] sm:w-[450px] bg-white text-zinc-900 shadow-2xl flex flex-col transition-transform duration-350 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Search Drawer"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-primary" />
            <h2 className="font-kanit font-medium text-xl text-zinc-900 tracking-tight">
              Search IMSR
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-full transition-all duration-200 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-6 border-b border-zinc-100 bg-zinc-50/60">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-zinc-200 rounded-[10px] font-kanit text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
          {searchQuery.trim() === "" ? (
            <div className="space-y-8">
              {/* Popular Searches */}
              <div>
                <h3 className="text-[11px] font-kanit font-bold tracking-widest text-zinc-400 uppercase mb-3.5">
                  POPULAR SEARCHES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 rounded-xl bg-zinc-100/80 hover:bg-brand-primary hover:text-white text-zinc-700 text-xs font-kanit font-normal transition-all duration-200 cursor-pointer border border-zinc-200/50 hover:border-brand-primary active:scale-95"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Destinations */}
              <div>
                <h3 className="text-[11px] font-kanit font-bold tracking-widest text-zinc-400 uppercase mb-3.5">
                  QUICK NAVIGATION
                </h3>
                <div className="flex flex-col divide-y divide-zinc-100 bg-zinc-50/50 rounded-2xl border border-zinc-100 overflow-hidden">
                  {QUICK_DESTINATIONS.map((dest, idx) => (
                    <Link
                      key={idx}
                      href={dest.href}
                      onClick={onClose}
                      className="px-4 py-3.5 flex items-center justify-between text-xs font-kanit font-medium text-zinc-700 hover:text-brand-primary hover:bg-white transition-all duration-150 group"
                    >
                      <span>{dest.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-kanit font-bold tracking-widest text-zinc-400 uppercase">
                  RESULTS ({filteredResults.length})
                </h3>
              </div>

              {filteredResults.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredResults.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={onClose}
                        className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-100 flex items-start gap-3.5 transition-all duration-200 group cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-white text-brand-primary border border-zinc-200/60 shadow-2xs group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-[10px] font-kanit font-normal uppercase tracking-wider text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-md">
                              {item.category}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-200" />
                          </div>
                          <h4 className="font-kanit font-normal text-sm text-zinc-800 group-hover:text-brand-primary transition-colors leading-snug truncate">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="font-kanit font-medium text-zinc-800 text-sm mb-1">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="font-kanit text-zinc-500 text-xs max-w-xs mx-auto">
                    Try searching for BBA, Digital Marketing, Admissions, Campus, or Placement.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
