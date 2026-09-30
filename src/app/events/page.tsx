"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Filter,
  RotateCcw,
  Sparkles,
  Search,
  SlidersHorizontal,
  X,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import {
  EVENTS_DATA,
  EVENT_CATEGORIES,
  CAMPUS_OPTIONS,
  EventItem,
  checkIsPastEvent,
} from "@/data/eventsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSplitText = ({ text }: { text: string }) => {
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

export default function EventsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Filter States
  const [eventTab, setEventTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCampus, setSelectedCampus] = useState<string>("All Campuses");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [campusDropdownOpen, setCampusDropdownOpen] = useState<boolean>(false);

  const campusDropdownRef = useRef<HTMLDivElement>(null);

  // Close campus dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        campusDropdownRef.current &&
        !campusDropdownRef.current.contains(event.target as Node)
      ) {
        setCampusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered Events computation
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((evt) => {
      // Past / Upcoming Event Tab Filter
      const isPast = checkIsPastEvent(evt);
      if (eventTab === "upcoming" && isPast) return false;
      if (eventTab === "past" && !isPast) return false;

      // Campus Filter
      if (
        selectedCampus !== "All Campuses" &&
        evt.campus.toLowerCase() !== selectedCampus.toLowerCase()
      ) {
        return false;
      }
      // Category Filter
      if (
        selectedCategory !== "All Categories" &&
        evt.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [eventTab, selectedCampus, selectedCategory]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCampus("All Campuses");
    setSelectedCategory("All Categories");
    setSearchQuery("");
  };

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current) return;

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
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.1,
          }
        );

        const gradientSpan = headingRef.current.querySelector(".fade-up-scroll");
        if (gradientSpan) {
          gsap.fromTo(
            gradientSpan,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.35,
              ease: "power3.out",
            }
          );
        }
      }

      gsap.fromTo(
        ".hero-fade-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER */}
      <Header activeNav="Events" />

      {/* HERO BANNER MATCHING BREADCRUMB & HERO STYLE */}
      <section
        ref={containerRef}
        className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
      >
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/student-life/student-life.webp"
            alt="IMSR Events Background"
            fill
            className="object-cover object-center opacity-85 brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-zinc-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
          {/* BREADCRUMB NAVIGATION */}
          <div className="hero-fade-item flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate">Events</span>
          </div>

          {/* HERO TITLE & SUBTITLE */}
          <div className="max-w-4xl w-full flex flex-col items-start text-left">
            <h1
              ref={headingRef}
              className="font-display font-medium text-[26px] leading-[27px] sm:text-[48px] sm:leading-[45px] tracking-tight text-white text-left mb-6"
            >
              <HeroSplitText text="Campus Life & Executive" />
              <br className="hidden sm:inline" />
              <span
                className="font-medium inline-block pb-1 italic font-serif fade-up-scroll pr-3 opacity-0"
                style={{
                  background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Upcoming Events & Conclaves
              </span>
            </h1>
            <p className="hero-fade-item text-zinc-300 font-sans font-light text-[18px] leading-relaxed max-w-3xl mb-4 text-left">
              Discover master classes, academic conclaves, workshops, industrial visits, and cultural fests happening across IMSR campuses.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN EVENTS FILTER & LISTING SECTION */}
      <section className="relative py-14 md:py-20 bg-zinc-50/70 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
          
          {/* MOBILE FILTER TRIGGER BUTTON */}
          <div className="lg:hidden mb-6 flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
            <div className="flex items-center gap-2 font-kanit font-normal text-[18px] text-zinc-900">
              <Filter className="w-4.5 h-4.5 text-brand-primary" />
              <span>Filter Events ({filteredEvents.length})</span>
            </div>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-kanit font-semibold flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDEBAR FILTERS (DESKTOP) */}
            <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-6 sticky top-28">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
                
                {/* FILTER HEADER */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200/80">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                    <h3 className="font-kanit font-bold text-base text-zinc-900 uppercase tracking-wider">
                      Filters
                    </h3>
                  </div>
                  {(selectedCampus !== "All Campuses" ||
                    selectedCategory !== "All Categories") && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-kanit font-medium text-brand-primary hover:text-brand-secondary flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {/* EVENT CATEGORY FILTER GROUP */}
                <div>
                  <h4 className="font-kanit font-bold text-xs text-zinc-400 uppercase tracking-wider mb-3">
                    Event Category
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {EVENT_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-[10px] py-[5px] rounded-[5px] border-b border-[#ccc] text-[14px] font-normal flex items-center justify-start gap-2.5 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-brand-primary text-white border-brand-primary"
                              : "text-zinc-700 hover:bg-zinc-100/80"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                              isSelected
                                ? "border-white bg-white"
                                : "border-zinc-300"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                            )}
                          </div>
                          <span className="truncate">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </aside>

            {/* MOBILE FILTER MODAL / DRAWER */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex justify-end">
                <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
                      <h3 className="font-kanit font-bold text-lg text-zinc-900">
                        Filter Events
                      </h3>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* CATEGORY MOBILE */}
                    <div className="mb-6">
                      <h4 className="font-kanit font-bold text-xs text-zinc-400 uppercase tracking-wider mb-3">
                        Event Category
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {EVENT_CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setMobileFilterOpen(false);
                              }}
                              className={`w-full text-left px-[10px] py-[6px] rounded-[5px] border-b border-[#ccc] text-[15px] font-normal flex items-center justify-start gap-2.5 transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-brand-primary text-white border-brand-primary"
                                  : "text-zinc-700 hover:bg-zinc-100/80 bg-white"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "border-white bg-white"
                                    : "border-zinc-300"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                )}
                              </div>
                              <span className="truncate">{cat}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SELECT CAMPUS MOBILE */}
                    <div>
                      <h4 className="font-kanit font-bold text-xs text-zinc-400 uppercase tracking-wider mb-3">
                        Select Campus
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {CAMPUS_OPTIONS.map((campus) => {
                          const isSelected = selectedCampus === campus;
                          return (
                            <button
                              key={campus}
                              onClick={() => {
                                setSelectedCampus(campus);
                                setMobileFilterOpen(false);
                              }}
                              className={`w-full text-left px-[10px] py-[6px] rounded-[5px] border-b border-[#ccc] text-[15px] font-normal flex items-center justify-start gap-2.5 transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-zinc-950 text-white border-zinc-950"
                                  : "text-zinc-700 hover:bg-zinc-100/80 bg-white"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  isSelected ? "bg-brand-secondary" : "bg-zinc-300"
                                }`}
                              />
                              <span className="truncate">{campus}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full mt-6 py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-kanit font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-transform"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* RIGHT MAIN EVENT CARDS GRID */}
            <main className="lg:col-span-8 xl:col-span-9 flex flex-col">
              
              {/* RESULTS HEADER & CAMPUS DROPDOWN FILTER ON RIGHT */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200/80">
                <div className="flex flex-col gap-2">
                  {/* UPCOMING / PAST EVENTS TAB SWITCHER */}
                  <div className="flex items-center gap-1.5 p-1 bg-zinc-200/70 rounded-xl w-fit">
                    <button
                      onClick={() => setEventTab("upcoming")}
                      className={`px-3.5 py-1.5 rounded-lg text-[16px] sm:text-[13px] font-normal transition-all duration-200 cursor-pointer ${
                        eventTab === "upcoming"
                          ? "bg-zinc-950 text-white shadow-xs"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Upcoming Events
                    </button>
                    <button
                      onClick={() => setEventTab("past")}
                      className={`px-3.5 py-1.5 rounded-lg text-[16px] sm:text-[13px] font-normal transition-all duration-200 cursor-pointer ${
                        eventTab === "past"
                          ? "bg-zinc-950 text-white shadow-xs"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Past Events
                    </button>
                  </div>

                  <div>
                    <h2 className="font-display font-medium text-[20px] text-zinc-950 tracking-tight">
                      {eventTab === "upcoming" ? "Upcoming Events" : "Past Events"}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
                      Showing <span className="font-semibold text-zinc-900">{filteredEvents.length}</span> {filteredEvents.length === 1 ? "event" : "events"} matching criteria
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: CAMPUS FILTER DROPDOWN (HIDDEN ON MOBILE, AVAILABLE IN MOBILE FILTER DRAWER) */}
                <div className="hidden lg:flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
                  {/* CAMPUS DROPDOWN FILTER BUTTON & POPUP MENU */}
                  <div className="relative" ref={campusDropdownRef}>
                    <button
                      onClick={() => setCampusDropdownOpen((prev) => !prev)}
                      className={`px-4 py-2.5 rounded-full border text-[13px] font-medium uppercase tracking-wider flex items-center gap-2.5 transition-all duration-200 cursor-pointer shadow-2xs ${
                        campusDropdownOpen || selectedCampus !== "All Campuses"
                          ? "bg-zinc-950 text-white border-zinc-950 shadow-md"
                          : "bg-white text-zinc-800 border-zinc-200/90 hover:border-zinc-400 hover:bg-zinc-50"
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${selectedCampus !== "All Campuses" ? "text-brand-secondary" : "text-zinc-500"}`} />
                      <span>
                        {selectedCampus === "All Campuses" ? "Select Campus" : selectedCampus}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          campusDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* CAMPUS DROPDOWN MENU */}
                    {campusDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-zinc-200/90 shadow-2xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 mb-1 border-b border-zinc-100 flex items-center justify-between text-[11px] font-kanit font-bold text-zinc-400 uppercase tracking-wider">
                          <span>Filter by Campus</span>
                          {selectedCampus !== "All Campuses" && (
                            <button
                              onClick={() => {
                                setSelectedCampus("All Campuses");
                                setCampusDropdownOpen(false);
                              }}
                              className="text-brand-primary hover:underline lowercase font-normal cursor-pointer"
                            >
                              reset
                            </button>
                          )}
                        </div>

                        <div className="max-h-60 overflow-y-auto flex flex-col gap-1 px-1.5 py-1">
                          {CAMPUS_OPTIONS.map((campus) => {
                            const isSelected = selectedCampus === campus;

                            return (
                              <button
                                key={campus}
                                onClick={() => {
                                  setSelectedCampus(campus);
                                  setCampusDropdownOpen(false);
                                }}
                                className={`w-full text-left px-[10px] py-[5px] rounded-[5px] border-b border-[#ccc] text-[14px] font-normal flex items-center justify-start gap-2.5 transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-zinc-950 text-white border-zinc-950"
                                    : "text-zinc-700 hover:bg-zinc-100"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    isSelected ? "bg-brand-secondary" : "bg-zinc-300"
                                  }`}
                                />
                                <span className="truncate">{campus}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* EVENT CARDS GRID (3 CARDS PER ROW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="group bg-white rounded-2xl overflow-hidden p-3 border border-zinc-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                    style={{ borderRadius: "calc(var(--radius) * 1)" }}
                  >
                    {/* Event Image Container */}
                    <div
                      className="relative w-full overflow-hidden bg-zinc-900 shrink-0"
                      style={{
                        height: "calc(var(--spacing) * 65)",
                        borderRadius: "calc(var(--radius) * 1)",
                      }}
                    >
                      <Image
                        src={event.featuredImage}
                        alt={event.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                      
                      {/* Bottom Overlay Badges: Both Tags Shifted to Bottom */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                        <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-zinc-900 text-[10px] font-kanit font-semibold uppercase tracking-wider shadow-xs truncate max-w-[130px]">
                          {event.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-zinc-950/80 backdrop-blur-xs text-white text-[10px] font-kanit font-semibold tracking-wider truncate max-w-[120px]">
                          {event.campus}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Heading, Divider Line, Time and Date */}
                    <div className="pt-3 pb-1 px-1 flex flex-col flex-1 justify-between">
                      <h3 className="font-display text-[15px] font-medium tracking-[0.4px] text-zinc-950 group-hover:text-brand-primary transition-colors leading-snug line-clamp-3 mb-2">
                        {event.title}
                      </h3>

                      <div>
                        {/* DIVIDER LINE */}
                        <div className="border-t border-zinc-200/80 my-2.5" />

                        {/* TIME AND DATE AFTER HEADING & DIVIDER LINE (START TIME ONLY) */}
                        <div className="flex items-center justify-between text-xs text-zinc-500 font-kanit pt-0.5">
                          <div className="flex items-center gap-1.5 font-medium text-zinc-700">
                            <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-normal">
                              <Clock className="w-3 h-3 text-zinc-400 shrink-0" />
                              <span>{event.time.split("-")[0].trim()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* EMPTY RESULTS STATE */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-20 px-6 bg-white rounded-3xl border border-zinc-200/80 shadow-xs flex flex-col items-center">
                  <div className="p-4 rounded-full bg-zinc-100 text-zinc-400 mb-4">
                    <Filter className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-medium text-2xl text-zinc-900 mb-2">
                    No Events Found
                  </h3>
                  <p className="font-sans text-zinc-500 text-sm max-w-md mx-auto mb-6">
                    No upcoming events match your selected campus or category filter criteria. Try adjusting your filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-full bg-brand-primary text-white font-kanit font-medium text-xs uppercase tracking-wider hover:bg-brand-primary/90 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </main>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </div>
  );
}
