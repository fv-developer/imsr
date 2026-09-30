"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";

interface CategoryItem {
  title: string;
  image?: string;
  video?: string;
  isVideo?: boolean;
}

interface Category {
  id: string;
  name: string;
  items: CategoryItem[];
}

const CATEGORIES_DATA: Category[] = [
  {
    id: "master-class",
    name: "Master Class",
    items: [
      {
        title: "IMSR Campus Masterclass & Executive Workshops",
        video: "/images/campus-video.mp4",
        isVideo: true,
      },
      {
        title: "Executive Leadership & Global Strategy",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Corporate Financial Governance",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "AI & Digital Business Transformation",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Marketing Innovation & Consumer Insights",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "workshop",
    name: "Workshop",
    items: [
      {
        title: "Interactive Hands-on Laboratory & Lab Sessions",
        video: "/images/video.mp4",
        isVideo: true,
      },
      {
        title: "Executive Data Analytics & Power BI",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Financial Modeling & Valuation",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Design Thinking & Product Strategy",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Applied Generative AI for Managers",
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "community-service",
    name: "Community Service Club",
    items: [
      {
        title: "Social Impact & Volunteer Campus Action",
        video: "/images/campus-video.mp4",
        isVideo: true,
      },
      {
        title: "Social Impact Drive & Youth Mentorship",
        image: "/images/student-life/activity/activity-left.jpg",
      },
      {
        title: "Environmental Sustainability Campaign",
        image: "/images/student-life/activity/activity-left-bottom.jpg",
      },
      {
        title: "Community Health & Welfare Outreach",
        image: "/images/student-life/activity/activity-center-bottom.jpg",
      },
      {
        title: "Educational Volunteer Program",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "industry-visit",
    name: "Industry Visit",
    items: [
      {
        title: "Live Corporate Headquarters & Industry Interaction",
        video: "/images/video.mp4",
        isVideo: true,
      },
      {
        title: "Enterprise Operations & Logistics Tour",
        image: "/images/student-life/activity/activity-right.jpg",
      },
      {
        title: "Corporate Headquarters Interaction",
        image: "/images/student-life/activity/activity-right-bottom.png",
      },
      {
        title: "Financial District & Banking Hub Visit",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Tech Innovation & Startup Incubator Tour",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "inhouse-events",
    name: "Inhouse Events",
    items: [
      {
        title: "Annual IMSR Management Fest & Conclave Highlights",
        video: "/images/campus-video.mp4",
        isVideo: true,
      },
      {
        title: "Annual Leadership & Strategy Conclave",
        image: "/images/student-life/activity/activity-center.jpg",
      },
      {
        title: "IMSR Campus Cultural Fest & Talent Showcase",
        image: "/images/student-life/activity/activity-top.jpg",
      },
      {
        title: "Inter-Department Management Case Challenge",
        image: "/images/student-life/activity/activity-center-bottom.jpg",
      },
      {
        title: "Entrepreneurship Pitch Night",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "student-club",
    name: "Students Club Activity",
    items: [
      {
        title: "Student Forum & Toastmasters Debating Circle",
        video: "/images/video.mp4",
        isVideo: true,
      },
      {
        title: "Debate & Toastmasters Public Speaking Forum",
        image: "/images/student-life/activity/activity-left.jpg",
      },
      {
        title: "Finance & Investment Student Circle",
        image: "/images/student-life/activity/activity-right.jpg",
      },
      {
        title: "Marketing & Brand Building Guild",
        image: "/images/student-life/activity/activity-top.jpg",
      },
      {
        title: "Product Design & Innovation Lab",
        image: "/images/student-life/activity/activity-center.jpg",
      },
    ],
  },
  {
    id: "extra-curricular",
    name: "Extra Curricular Activities",
    items: [
      {
        title: "Inter-College Sports & Cultural Campus Showcase",
        video: "/images/campus-video.mp4",
        isVideo: true,
      },
      {
        title: "Inter-College Sports & Athletics Meet",
        image: "/images/student-life/activity/activity-right-bottom.png",
      },
      {
        title: "Performing Arts, Theater & Musical Ensemble",
        image: "/images/student-life/activity/activity-left-bottom.jpg",
      },
      {
        title: "Visual Arts & Campus Photography Club",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Outdoor Leadership & Trekking Expeditions",
        image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
];

export default function ClubsAndCommitteesSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("master-class");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  const activeCategory =
    CATEGORIES_DATA.find((c) => c.id === activeCategoryId) || CATEGORIES_DATA[0];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const cardStep = (containerWidth + 16) / 3;
      const scrollAmount = direction === "left" ? -cardStep : cardStep;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // INFINITE AUTO-SCROLL LOOP
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.8; // Smooth pixel step per frame

    const autoScrollLoop = () => {
      if (container && !isHoveredRef.current) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 4) {
          // Loop back smoothly to the beginning
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(autoScrollLoop);
    };

    animationFrameId = requestAnimationFrame(autoScrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategoryId]);

  return (
    <section className="bg-zinc-950 text-white py-[100px] relative overflow-hidden border-t border-zinc-900">
      {/* BACKGROUND GLOW EFFECT */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(7, 116, 130, 0.4), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* SUBTLE LIGHT GRID PATTERN OVERLAY (EXACT GRID MATCHING HOMEPAGE PLACEMENT SECTION) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] z-0"
        style={{
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)",
        }}
      >
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="experiential-learning-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#experiential-learning-grid)" />
        </svg>
      </div>

      {/* CONTAINER WRAPPER MATCHING SITE DESIGN */}
      <div className="max-w-7xl mx-auto px-[15px] relative z-10">
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h2 className="font-display font-medium text-[40px] sm:text-[56px] md:text-[70px] tracking-tight leading-tight text-white mb-0">
            Clubs & Committees
          </h2>
          <span
            className="font-medium inline-block font-display text-[30px] sm:text-[38px] md:text-[48px]"
            style={{
              background: "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            @IMSR
          </span>
        </div>

        {/* MAIN LAYOUT: SIDEBAR TABS (LEFT) & GALLERY (RIGHT) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 w-full">
          {/* LEFT SIDEBAR: TAB LIST */}
          <div className="w-full lg:w-[275px] flex-none flex flex-col items-start">
            {/* TAB TITLE WITH UNDERLINE INDICATOR */}
            <div className="mb-4 pb-2 border-b border-emerald-400/40 w-full text-left">
              <span className="text-emerald-400 font-medium text-xs tracking-widest uppercase">
                Experiential Learning
              </span>
            </div>

            {/* LIST OF CATEGORIES */}
            <div className="flex flex-col gap-2.5 w-full">
              {CATEGORIES_DATA.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`group w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-black border-zinc-800 text-zinc-950 shadow-xl"
                        : "bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center flex-none">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                      <span
                        className={`tracking-normal capitalize transition-colors whitespace-nowrap ${
                          isActive ? "text-white font-normal" : "text-zinc-400 group-hover:text-white font-normal"
                        }`}
                        style={{
                          fontSize: "17px",
                          textTransform: "capitalize",
                          fontWeight: 400,
                        }}
                      >
                        {cat.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: CAROUSEL GALLERY */}
          <div className="w-full lg:flex-1 min-w-0 relative">
            {/* CAROUSEL SCROLL CONTROLS */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={() => handleScroll("left")}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                aria-label="Previous slides"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                aria-label="Next slides"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* CARDS LIST WITH ANIMATE PRESENCE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div
                  ref={scrollContainerRef}
                  onMouseEnter={() => {
                    isHoveredRef.current = true;
                  }}
                  onMouseLeave={() => {
                    isHoveredRef.current = false;
                  }}
                  className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {activeCategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex-none w-[260px] sm:w-[280px] md:w-[calc((100%-32px)/3)] h-[440px] relative rounded-none overflow-hidden bg-zinc-900 border border-zinc-800/80 snap-start shadow-xl"
                    >
                      {/* CARD MEDIA (VIDEO OR IMAGE) */}
                      {item.isVideo && item.video ? (
                        <video
                          src={item.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          draggable={false}
                        />
                      )}

                      {/* VIDEO TAG BADGE IF VIDEO */}
                      {item.isVideo && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                          <Play className="w-3 h-3 fill-white text-white" />
                          <span>Video</span>
                        </div>
                      )}

                      {/* BOTTOM GRADIENT OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* TITLE TEXT OVERLAY */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <h3
                          className="text-[16px] capitalize leading-snug tracking-normal text-white opacity-100 font-normal"
                          style={{
                            fontSize: "16px",
                            textTransform: "capitalize",
                            fontWeight: 400,
                            letterSpacing: "0px",
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
