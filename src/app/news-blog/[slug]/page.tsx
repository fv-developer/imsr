"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  Mail,
  ArrowRight,
  BookOpen,
  Tag,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { ARTICLES_DATA, Article } from "@/data/articlesData";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  if (!article) {
    notFound();
  }

  const recentPosts = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 4);

  const categoriesWithCounts = Array.from(
    new Set(ARTICLES_DATA.map((a) => a.category))
  ).map((cat) => ({
    name: cat,
    count: ARTICLES_DATA.filter((a) => a.category === cat).length,
  }));

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans">
      {/* LIGHT BLACK / DARK HEADER */}
      <Header activeNav="News & Blog" />

      {/* LIGHT BLACK TOP BANNER (200px HEIGHT) */}
      <div className="relative h-[200px] min-h-[200px] w-full flex flex-col justify-end bg-zinc-950 text-white pb-6 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px] w-full">
          {/* BREADCRUMB NAVIGATION */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-400 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/news-blog" className="hover:text-white transition-colors">
              News &amp; Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200 font-medium truncate max-w-xs sm:max-w-md lg:max-w-xl">
              {article.title}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: 70% DETAIL / 30% RIGHT SIDEBAR */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: 70% WIDTH (8/12 COLS) */}
            <main className="lg:col-span-8 flex flex-col">
              
              {/* Category Badge & Meta Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#00BCD4]/10 text-[#00A3C4] text-xs font-kanit font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-zinc-300 text-xs">•</span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-kanit">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{article.date}</span>
                </div>
                <span className="text-zinc-300 text-xs">•</span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-kanit">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Main Heading Title */}
              <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-[1.15] mb-6">
                {article.title}
              </h1>

              {/* Author Card Header */}
              <div className="flex items-center gap-4 py-4 mb-8 border-t border-b border-zinc-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-kanit font-semibold text-sm text-zinc-900">
                    {article.author.name}
                  </span>
                  <span className="font-sans text-xs text-zinc-500">
                    {article.author.role}
                  </span>
                </div>
              </div>

              {/* Featured Image BELOW Heading, Meta & Author */}
              <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden mb-10 shadow-sm border border-zinc-100">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Article Content Body */}
              <div
                className="prose prose-zinc max-w-none font-sans text-zinc-700 text-[17px] leading-relaxed mb-12 space-y-6 [&_p]:text-[17px] [&_li]:text-[17px] [&_strong]:font-medium [&_b]:font-medium [&_h1]:font-medium [&_h2]:font-medium [&_h3]:font-medium [&_h4]:font-medium [&_h5]:font-medium [&_h6]:font-medium [&_th]:font-medium"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* ARTICLE FAQS ACCORDION SECTION */}
              {article.faqs && article.faqs.length > 0 && (
                <div className="mb-12 pt-8 border-t border-zinc-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-2xl sm:text-3xl text-zinc-950">
                        Frequently Asked Questions
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-500">
                        Key strategic insights and common queries regarding this article topic
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5">
                    {article.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "bg-white border-brand-primary/40 shadow-sm"
                              : "bg-zinc-50/80 hover:bg-white border-zinc-200/80"
                          }`}
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-kanit font-medium text-base sm:text-lg text-zinc-900 cursor-pointer"
                          >
                            <span className="flex-1 leading-snug">{faq.question}</span>
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                isOpen
                                  ? "bg-brand-primary text-white rotate-180"
                                  : "bg-zinc-200/70 text-zinc-600"
                              }`}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-5 pt-0 sm:px-5 text-zinc-600 font-sans text-sm sm:text-base leading-relaxed border-t border-zinc-100/80 mt-1 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Article Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-10 pt-6 border-t border-zinc-100">
                  <span className="text-xs font-kanit font-semibold text-zinc-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </span>
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-kanit font-normal hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* BLOG SHARE OPTIONS SECTION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white text-brand-primary shadow-2xs border border-zinc-200/60">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-kanit font-semibold text-base text-zinc-900">
                      Share this article
                    </h4>
                    <p className="font-sans text-xs text-zinc-500">
                      Spread knowledge with your academic and professional network
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-3 rounded-2xl bg-white border border-zinc-200 hover:border-brand-primary text-zinc-700 hover:text-brand-primary transition-all duration-200 shadow-2xs cursor-pointer flex items-center gap-2 text-xs font-kanit font-medium"
                    title="Copy Link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      article.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white border border-zinc-200 hover:border-[#1DA1F2] text-zinc-700 hover:text-[#1DA1F2] transition-colors shadow-2xs"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white border border-zinc-200 hover:border-[#0A66C2] text-zinc-700 hover:text-[#0A66C2] transition-colors shadow-2xs"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      article.title
                    )}&body=${encodeURIComponent(
                      `Check out this article from IMSR: ${article.title}`
                    )}`}
                    className="p-3 rounded-2xl bg-white border border-zinc-200 hover:border-brand-primary text-zinc-700 hover:text-brand-primary transition-colors shadow-2xs"
                    aria-label="Share via Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </main>

            {/* RIGHT SIDEBAR: 30% WIDTH (4/12 COLS) */}
            <aside className="lg:col-span-4 flex flex-col gap-10 sticky top-28">
              
              {/* CATEGORIES WIDGET */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-2xs">
                <h3 className="font-kanit font-semibold text-lg text-zinc-900 mb-5 pb-3 border-b border-zinc-200 flex items-center justify-between">
                  <span>Categories</span>
                  <BookOpen className="w-4 h-4 text-brand-primary" />
                </h3>
                <div className="flex flex-col gap-2.5">
                  {categoriesWithCounts.map((cat, idx) => (
                    <Link
                      key={idx}
                      href="/news-blog"
                      className="px-4 py-3 rounded-2xl bg-white hover:bg-brand-primary hover:text-white border border-zinc-200/70 text-zinc-700 text-sm font-kanit font-medium flex items-center justify-between transition-all duration-200 group cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 group-hover:bg-white/20 text-zinc-500 group-hover:text-white text-xs font-semibold">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RECENT POSTS WIDGET */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-2xs">
                <h3 className="font-kanit font-semibold text-lg text-zinc-900 mb-5 pb-3 border-b border-zinc-200">
                  Recent Articles
                </h3>
                <div className="flex flex-col gap-5">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/news-blog/${post.slug}`}
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 shrink-0">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-kanit font-semibold text-brand-primary uppercase tracking-wider">
                          {post.category}
                        </span>
                        <h4 className="font-kanit font-medium text-xs sm:text-sm text-zinc-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-[11px] text-zinc-400 font-sans mt-1">
                          {post.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ADMISSIONS CTA CARD */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/15 rounded-full blur-2xl pointer-events-none" />
                <h3 className="font-display font-medium text-2xl text-white mb-3 leading-tight">
                  Start Your Leadership Journey
                </h3>
                <p className="font-sans font-light text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Explore IMSR&apos;s industry-aligned BBA &amp; B.Com degree programs for the 2026 academic session.
                </p>
                <Link
                  href="/#apply"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-brand-secondary text-white font-kanit font-medium text-sm uppercase tracking-[0.4px] hover:bg-brand-secondary/90 transition-all duration-200 shadow-md"
                >
                  <span>Apply Now 2026</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </aside>

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
