"use client";

import React from "react";
import Header from "@/components/layout/Header";
import ProgramHeroSection from "./ProgramHeroSection";
import ProgramSubNav from "@/components/programs/bba-business-administration/ProgramSubNav";
import ProgramOverviewSection from "./ProgramOverviewSection";
import ProgramCareerStatsSection from "./ProgramCareerStatsSection";
import ProgramCurriculumSection from "./ProgramCurriculumSection";
import BbaExperienceLearningSection from "@/components/programs/bba-business-administration/BbaExperienceLearningSection";
import ScholarshipOffersSection from "./ScholarshipOffersSection";
import BbaPlacementSection from "@/components/programs/bba-business-administration/BbaPlacementSection";
import StudentSuccessStories from "@/components/home/StudentSuccessStories";
import PlacementPartners from "@/components/home/PlacementPartners";
import BookingSection from "@/components/home/BookingSection";
import FAQs from "@/components/ui/text-reveal-faqs";
import { getProgramFaqs } from "@/data/faqsData";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { ProgramConfig } from "@/data/programsData";

export default function ProgramPageTemplate({ config }: { config: ProgramConfig }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative selection:bg-[#00bcda] selection:text-white font-sans">
      {/* HEADER MATCHING ALL PAGES */}
      <Header activeNav="Programs" />

      {/* SECTION 1: HERO / PROGRAM HEADER */}
      <ProgramHeroSection config={config} />

      {/* STICKY PROGRAM SUB NAV */}
      <ProgramSubNav />

      {/* SECTION 2: PROGRAM OVERVIEW */}
      <ProgramOverviewSection config={config} />

      {/* SECTION 3: CAREER STATS */}
      <ProgramCareerStatsSection config={config} />

      {/* SECTION 4: PROGRAM CURRICULUM */}
      <ProgramCurriculumSection config={config} />

      {/* SECTION 5: EXPERIENTIAL LEARNING */}
      <BbaExperienceLearningSection />

      {/* SCHOLARSHIPS & EARLY BIRD OFFERS */}
      <ScholarshipOffersSection />

      {/* SECTION 6: INDUSTRY PLACEMENT */}
      <BbaPlacementSection />

      {/* STUDENT SUCCESS STORIES (Temporarily hidden as requested) */}
      {/* <StudentSuccessStories /> */}

      {/* SECTION 7: OUR INDUSTRY PLACEMENT PARTNERS */}
      <PlacementPartners />

      {/* SECTION 8: ADMISSIONS COUNSELING & CALENDLY BOOKING FORM */}
      <BookingSection />

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <FAQs
        items={getProgramFaqs(config?.slug || "")}
        subtitle={`Frequently asked questions about the ${config?.title || "selected"} programme.`}
      />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP */}
      <BackToTop />
    </main>
  );
}
