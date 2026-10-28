"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, ArrowRight, Clock, User, Calendar, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { ARTICLES_DATA, Article } from "@/data/articlesData";
import FAQs from "@/components/ui/text-reveal-faqs";
import { BLOG_NEWS_EVENTS_FAQS } from "@/data/faqsData";

import SplitText from "@/components/ui/SplitText";

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

export default function NewsArticlesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const featuredArticle = ARTICLES_DATA.find((a) => a.isFeatured) || ARTICLES_DATA[0];
  
  const categories = ["All", ...Array.from(new Set(ARTICLES_DATA.map((a) => a.category)))];

  const gridArticles = ARTICLES_DATA.filter((a) => {
    if (a.id === featuredArticle.id) return false;
    if (selectedCategory === "All") return true;
    return a.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Heading text reveal
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

      // 2. Elements fade up
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

      // 3. News & Articles Section Title Animation
      if (container.querySelectorAll(".news-heading-anim").length > 0) {
        gsap.fromTo(
          ".news-heading-anim",
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".news-heading-container",
              start: "top 85%",
            },
          }
        );
      }

      // 4. Featured Banner Scale Entrance
      if (container.querySelectorAll(".featured-banner-card").length > 0) {
        gsap.fromTo(
          ".featured-banner-card",
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".featured-banner-card",
              start: "top 85%",
            },
          }
        );
      }

      // 5. Category Filter Buttons Stagger Entrance
      if (container.querySelectorAll(".category-tab-btn").length > 0) {
        gsap.fromTo(
          ".category-tab-btn",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".category-filter-bar",
              start: "top 90%",
            },
          }
        );
      }

      // 6. Card entrance animation
      if (container.querySelectorAll(".article-card").length > 0) {
        gsap.fromTo(
          ".article-card",
          { y: 45, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".article-grid-section",
              start: "top 85%",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER */}
      <Header activeNav="News & Blog" />

      {/* HERO BANNER MATCHING BREADCRUMB & HERO STYLE */}
      <section
        ref={containerRef}
        className="relative min-h-[85vh] w-full flex flex-col justify-end bg-zinc-950 text-white pt-32 pb-[60px] overflow-hidden"
      >
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/student-life/student-life.webp"
            alt="IMSR News & Blog Background"
            fill
            className="object-cover object-center opacity-85 brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-zinc-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-[15px] w-full flex flex-col items-start text-left">
          {/* BREADCRUMB MATCHING STUDENT LIFE PAGE */}
          <div className="hero-fade-item flex items-center gap-2 text-sm text-zinc-400 mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate">
              News &amp; Blog
            </span>
          </div>

          {/* HERO TITLE & SUBTITLE */}
          <div className="max-w-4xl w-full flex flex-col items-start text-left">
            <h1
              ref={headingRef}
              className="font-display font-medium text-[26px] leading-[27px] sm:text-[48px] sm:leading-[45px] tracking-tight text-white text-left mb-6"
            >
              <HeroSplitText text="Insights & Ideas shaping" />
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
                The Future of Business
              </span>
            </h1>
            <p className="hero-fade-item text-zinc-300 font-sans font-light text-[18px] leading-relaxed max-w-3xl mb-4 text-left">
              Stay updated with stories, guides, academic achievements, and strategic insights shaping leadership, business, design, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="relative py-16 md:py-24 bg-zinc-50/70 border-b border-zinc-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
          
          {/* FEATURED BANNER SECTION */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="news-heading-container text-center max-w-5xl mx-auto mb-10">
                <h2 className="news-heading-anim font-display font-medium text-5xl sm:text-7xl lg:text-[120px] text-zinc-900 tracking-tight leading-[0.95] mb-4 transition-transform duration-300 cursor-default select-none">
                  <SplitText text="News & Blog" />
                </h2>
                <p className="news-heading-anim font-sans text-zinc-500 text-base sm:text-lg max-w-xl mx-auto">
                  Handpicked strategic analysis &amp; executive highlights
                </p>
              </div>

              <div className="featured-banner-card relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 border border-zinc-800 group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full">
                  <Image
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-zinc-950/20 to-transparent" />

                  {/* FEATURED CARD CONTENT */}
                  <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-brand-orange text-white text-xs font-kanit font-medium uppercase tracking-wider shadow-sm animate-pulse">
                        Featured
                      </span>
                    </div>

                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 mb-3 font-kanit font-normal">
                        <span className="text-brand-secondary font-medium uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                        <span>•</span>
                        <span>{featuredArticle.date}</span>
                        <span>•</span>
                        <span>{featuredArticle.readTime}</span>
                      </div>

                      <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4 transition-colors duration-300">
                        <Link href={`/news-blog/${featuredArticle.slug}`} className="hover:text-brand-secondary transition-colors text-white">
                          {featuredArticle.title}
                        </Link>
                      </h3>

                      <p className="font-sans font-light text-zinc-300 text-base sm:text-[17px] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-6 max-w-2xl">
                        {featuredArticle.excerpt}
                      </p>

                      <Link
                        href={`/news-blog/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] transition-all duration-200 active:scale-95 shadow-md group/btn"
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY FILTER TABS */}
          <div className="category-filter-bar flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-zinc-200">
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-zinc-900">
              Explore All Articles
            </h3>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-tab-btn px-4.5 py-2.5 rounded-xl text-[14px] font-kanit font-normal transition-all duration-200 cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-brand-primary text-white shadow-sm scale-105"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ARTICLES GRID SECTION (MATCHING REFERENCE GRID) */}
          <div className="article-grid-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <article
                key={article.id}
                className="article-card group bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 text-[11px] font-kanit font-medium uppercase tracking-wider shadow-xs border border-zinc-200/50">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5 font-kanit">
                      <span className="text-brand-primary font-medium">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>

                    <h4 className="font-display font-medium text-xl text-zinc-900 group-hover:text-brand-primary transition-colors leading-snug mb-3 line-clamp-2">
                      <Link href={`/news-blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>

                    <p className="font-sans font-light text-zinc-500 text-[17px] leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-6 pb-6 pt-0 mt-auto">
                  <Link
                    href={`/news-blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-brand-primary font-kanit font-medium text-sm hover:text-brand-secondary transition-colors group/link"
                  >
                    <span>Read blog</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {gridArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200">
              <p className="font-kanit text-zinc-600 text-base mb-2">
                No articles found in category &ldquo;{selectedCategory}&rdquo;
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-brand-primary font-medium text-sm hover:underline"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <FAQs
        items={BLOG_NEWS_EVENTS_FAQS}
        subtitle="Frequently asked questions about FV - IMSR insights, publications, and student event highlights."
      />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </div>
  );
}
