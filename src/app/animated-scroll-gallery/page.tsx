"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import MaskedHeading from "@/components/ui/MaskedHeading";
import StudentLifeAnimatedGallery from "@/components/student-life/StudentLifeAnimatedGallery";

export default function AnimatedScrollGalleryPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER */}
      <Header />

      {/* TOP SPACER FOR FIXED HEADER */}
      <div className="pt-28 bg-white" />

      {/* EXPERIENTIAL LEARNING HEADING SECTION */}
      <section 
        id="experiential-learning-heading" 
        className="pt-12 pb-0 bg-white text-zinc-950 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="flex flex-col items-center w-full">
            <MaskedHeading
              text="EXPERIENTIAL LEARNING"
              mediaType="video"
              src="/images/video.mp4"
              poster="/images/campus_explore.jpg"
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={18}
              brightness={1}
              saturation={1}
              grayscale={false}
              duration={1.1}
              stagger={0.17}
              align="center"
              weight={700}
              tracking={0.02}
              lineHeight={0.85}
              textScale={0.15}
              className="font-display uppercase text-[50px] sm:text-[100px] md:text-[170px]"
              startTime={15}
              endTime={80}
            />
          </div>
        </div>
      </section>

      {/* 3D SCROLLING ANIMATED GALLERY SECTION */}
      <StudentLifeAnimatedGallery />

      {/* FOOTER */}
      <Footer />

      {/* BACK TO TOP */}
      <BackToTop />
    </div>
  );
}
