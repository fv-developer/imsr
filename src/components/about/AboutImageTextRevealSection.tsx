"use client";

import React from "react";
import ImageTextReveal from "@/components/ui/imgtext-reveal-scroll-animation";

export default function AboutImageTextRevealSection() {
  return (
    <section 
      className="relative w-full text-white py-8 md:py-16 overflow-hidden border-t border-teal-900/30"
      style={{
        background: "linear-gradient(123deg, rgb(6, 153, 176) 0%, rgb(0, 38, 33) 100%)"
      }}
    >
      <ImageTextReveal />
    </section>
  );
}
