"use client";

import React from "react";
import Header from "@/components/layout/Header";
import BbaBusinessAdminHeroSection from "@/components/programs/bba-business-administration/BbaBusinessAdminHeroSection";
import ProgramSubNav from "@/components/programs/bba-business-administration/ProgramSubNav";
import BbaOverviewSection from "@/components/programs/bba-business-administration/BbaOverviewSection";
import BbaCareerStatsSection from "@/components/programs/bba-business-administration/BbaCareerStatsSection";
import BbaCurriculumSection from "@/components/programs/bba-business-administration/BbaCurriculumSection";
import BbaExperienceLearningSection from "@/components/programs/bba-business-administration/BbaExperienceLearningSection";
import BbaPlacementSection from "@/components/programs/bba-business-administration/BbaPlacementSection";
import PlacementPartners from "@/components/home/PlacementPartners";
import BookingSection from "@/components/home/BookingSection";
import FAQs from "@/components/ui/text-reveal-faqs";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

export default function BbaBusinessAdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative selection:bg-[#00bcda] selection:text-white font-sans">
      {/* HEADER MATCHING HOME & ABOUT US */}
      <Header activeNav="Programs" />

      {/* SECTION 1: HERO / PROGRAM HEADER */}
      <BbaBusinessAdminHeroSection />

      {/* STICKY PROGRAM SUB NAV */}
      <ProgramSubNav />

      {/* SECTION 2: PROGRAM OVERVIEW */}
      <BbaOverviewSection />

      {/* SECTION 3: CAREER STATS */}
      <BbaCareerStatsSection />

      {/* SECTION 4: PROGRAM CURRICULUM */}
      <BbaCurriculumSection />

      {/* SECTION 5: EXPERIENTIAL LEARNING */}
      <BbaExperienceLearningSection />

      {/* SECTION 6: INDUSTRY PLACEMENT & CAREER OUTCOMES */}
      <BbaPlacementSection />

      {/* SECTION 7: OUR INDUSTRY PLACEMENT PARTNERS */}
      <PlacementPartners />

      {/* SECTION 8: ADMISSIONS COUNSELING & CALENDLY BOOKING FORM */}
      <BookingSection />

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <FAQs />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP */}
      <BackToTop />
    </main>
  );
}
