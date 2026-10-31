"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";

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
        title: "Digital Marketing Careers in AI Era - Mr. Viken Shah",
        video: "/images/experiential-learning/masterclass/viken-shah-video.mp4",
        isVideo: true,
      },
      {
        title: "AI & Digital Transformation - Mr. Unnat Khetan",
        video: "/images/experiential-learning/masterclass/unnat-khetan-video.mp4",
        isVideo: true,
      },
      {
        title: "Digital Marketing Careers in the AI Era",
        image: "/images/experiential-learning/masterclass/viken-shah-1.jpg",
      },
      {
        title: "AI & Digital Transformation in Customer Experience",
        image: "/images/experiential-learning/masterclass/unnat-khetan-1.jpg",
      },
      {
        title: "Resume Writing & Profile Building - Ms. Hemangi Manchekar",
        image: "/images/experiential-learning/masterclass/hemangi-manchekar-1.jpg",
      },
      {
        title: "Private Equity: Capital to Value Creation - Mr. Piyush Somani",
        image: "/images/experiential-learning/masterclass/piyush-somani-1.jpg",
      },
      {
        title: "Marketing Beyond Textbooks - Ms. Hamita T.",
        image: "/images/experiential-learning/masterclass/hamita-t-1.jpg",
      },
      {
        title: "AI to Accelerate Your Career - Mr. Aneesh Dighe",
        image: "/images/experiential-learning/masterclass/aneesh-dighe-1.jpg",
      },
      {
        title: "From Classroom to Career - Mr. Amiet Padam",
        image: "/images/experiential-learning/masterclass/amiet-padam-1.jpg",
      },
      {
        title: "Money in Motion: Asset Management - Mr. Yash Ajmera",
        image: "/images/experiential-learning/masterclass/yash-ajmera-1.jpg",
      },
      {
        title: "Investor's Blueprint: Securities & Wealth - Dr. Hiral Trivedi",
        image: "/images/experiential-learning/masterclass/hiral-trivedi-1.jpg",
      },
      {
        title: "Marketing Technology & AI Marketing - Mr. Manan Shah",
        image: "/images/experiential-learning/masterclass/manan-shah-1.jpg",
      },
    ],
  },
  {
    id: "sahyog-club",
    name: "Sahyog Club (CSR)",
    items: [
      {
        title: "Beach Cleaning Drive at Marve Beach",
        image: "/images/experiential-learning/sahyog-club/beach-cleaning-1.jpg",
      },
      {
        title: "Environmental Sustainability & Clean Shoreline Action",
        image: "/images/experiential-learning/sahyog-club/beach-cleaning-2.jpg",
      },
      {
        title: "Social Impact & Volunteer Campus Action",
        image: "/images/student-life/activity/activity-left.jpg",
      },
      {
        title: "Community Health & Welfare Outreach",
        image: "/images/student-life/activity/activity-center-bottom.jpg",
      },
    ],
  },
  {
    id: "sports-club",
    name: "FitFuture Sports Club",
    items: [
      {
        title: "Apex Badminton League 2026",
        image: "/images/experiential-learning/sports-club/badminton-league-1.jpg",
      },
      {
        title: "Elite Kho-Kho Premier League",
        image: "/images/experiential-learning/sports-club/kho-kho-league-1.jpg",
      },
      {
        title: "Inter-College Sports & Athletics Meet",
        image: "/images/student-life/activity/activity-right-bottom.png",
      },
      {
        title: "Campus Badminton Tournament Showcase",
        image: "/images/student-life/activity/activity-center.jpg",
      },
    ],
  },
  {
    id: "cultural-club",
    name: "Vibrance Cultural Club",
    items: [
      {
        title: "Teachers Day Celebration & Cultural Tribute",
        image: "/images/experiential-learning/cultural-club/teachers-day-1.jpg",
      },
      {
        title: "Youth Talent & Performing Arts Showcase",
        image: "/images/experiential-learning/cultural-club/teachers-day-2.jpg",
      },
      {
        title: "IMSR Campus Cultural Fest & Talent Showcase",
        image: "/images/student-life/activity/activity-top.jpg",
      },
      {
        title: "Performing Arts, Theater & Musical Ensemble",
        image: "/images/student-life/activity/activity-left-bottom.jpg",
      },
    ],
  },
  {
    id: "industry-visit",
    name: "Industry Visit",
    items: [
      {
        title: "Educational Visit - Radio Mirchi Studio",
        image: "/images/experiential-learning/educational-visit/radio-mirchi-1.jpg",
      },
      {
        title: "Industrial Plant Visit to Parle & Jayesh Industries",
        image: "/images/new-folder/PARLE.jpg",
      },
      {
        title: "Corporate Headquarters & Media Interaction",
        image: "/images/student-life/activity/activity-right.jpg",
      },
      {
        title: "Enterprise Operations & Logistics Tour",
        image: "/images/student-life/activity/activity-right-bottom.png",
      },
    ],
  },
  {
    id: "workshop",
    name: "Workshop",
    items: [
      {
        title: "Interactive Hands-on Laboratory & Workshop Sessions",
        video: "/images/video.mp4",
        isVideo: true,
      },
      {
        title: "Business Etiquette For Modern Workplace - Mr. James Fernandes",
        image: "/images/new-folder/James.webp",
      },
      {
        title: "Stress Management & Executive Resilience - Ms. Gunjan Sidhu",
        image: "/images/new-folder/Gunjan.webp",
      },
      {
        title: "Design Thinking & Strategic Problem Solving",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
];

function ClubsVideoItem({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* TOP CONTROLS BADGES & ACTIONS */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          className="w-8 h-8 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-white text-white" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
          )}
        </button>

        {/* Mute / Unmute Toggle Button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="w-8 h-8 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-white" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-white" />
          )}
        </button>

        {/* Video Tag Indicator */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide">
          <span>Video</span>
        </div>
      </div>
    </div>
  );
}

export default function ClubsAndCommitteesSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("master-class");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  const activeCategory =
    CATEGORIES_DATA.find((c) => c.id === activeCategoryId) || CATEGORIES_DATA[0];

  // Seamless infinite loop: duplicate items so container can wrap without visual jumps
  const displayItems =
    activeCategory.items.length >= 2
      ? [...activeCategory.items, ...activeCategory.items]
      : activeCategory.items;

  // Handle URL category query params (?category=... or ?club=...) and smooth scroll to section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const parseUrlCategory = () => {
      try {
        const url = new URL(window.location.href);
        const catParam = url.searchParams.get("category") || url.searchParams.get("club");
        if (catParam && CATEGORIES_DATA.some((c) => c.id === catParam)) {
          setActiveCategoryId(catParam);
        }
        if (window.location.hash === "#clubs-and-committees") {
          setTimeout(() => {
            const el = document.getElementById("clubs-and-committees");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      } catch (err) {
        console.error(err);
      }
    };

    parseUrlCategory();
    window.addEventListener("hashchange", parseUrlCategory);
    window.addEventListener("popstate", parseUrlCategory);

    return () => {
      window.removeEventListener("hashchange", parseUrlCategory);
      window.removeEventListener("popstate", parseUrlCategory);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const cardStep = (containerWidth + 16) / 3;
      const halfScroll = container.scrollWidth / 2;

      if (direction === "left") {
        if (halfScroll > 0 && container.scrollLeft <= 10) {
          container.scrollLeft += halfScroll;
        }
        container.scrollBy({ left: -cardStep, behavior: "smooth" });
      } else {
        if (halfScroll > 0 && container.scrollLeft >= halfScroll - 10) {
          container.scrollLeft -= halfScroll;
        }
        container.scrollBy({ left: cardStep, behavior: "smooth" });
      }
    }
  };

  // INFINITE AUTO-SCROLL LOOP
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Reset scrollLeft smoothly on category switch
    container.scrollLeft = 0;

    let animationFrameId: number;
    const scrollSpeed = 0.8; // Smooth pixel step per frame

    const autoScrollLoop = () => {
      if (container && !isHoveredRef.current) {
        const halfScroll = container.scrollWidth / 2;
        if (halfScroll > 0 && container.scrollLeft >= halfScroll) {
          // Seamless loop back by exactly half without any jump
          container.scrollLeft -= halfScroll;
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
    <section
      id="clubs-and-committees"
      className="bg-zinc-950 text-white py-[100px] relative overflow-hidden border-t border-zinc-900 scroll-mt-20"
    >
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
                  {displayItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex-none w-[260px] sm:w-[280px] md:w-[calc((100%-32px)/3)] h-[440px] relative rounded-none overflow-hidden bg-zinc-900 border border-zinc-800/80 snap-start shadow-xl"
                    >
                      {/* CARD MEDIA (VIDEO OR IMAGE) */}
                      {item.isVideo && item.video ? (
                        <ClubsVideoItem src={item.video} title={item.title} />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          draggable={false}
                        />
                      )}

                      {/* BOTTOM GRADIENT OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                      {/* TITLE TEXT OVERLAY */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 pointer-events-none">
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
