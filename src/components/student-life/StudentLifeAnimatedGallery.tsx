"use client";

import React from "react";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from "@/components/ui/animated-gallery";

const IMAGES_1 = [
  "/images/student-life/activity/activity-left.jpg",
  "/images/student-life/activity/activity-left-bottom.jpg",
  "/images/student-life/activity/activity-top.jpg",
  "/images/student-life/activity/activity-center.jpg",
];

const IMAGES_2 = [
  "/images/student-life/activity/activity-center.jpg",
  "/images/student-life/activity/activity-top.jpg",
  "/images/student-life/activity/activity-center-bottom.jpg",
  "/images/student-life/activity/activity-left-bottom.jpg",
  "/images/student-life/activity/activity-right-bottom.jpg",
  "/images/student-life/activity/activity-right.jpg",
];

const IMAGES_3 = [
  "/images/student-life/activity/activity-right.jpg",
  "/images/student-life/activity/activity-right-bottom.jpg",
  "/images/student-life/activity/activity-top.jpg",
  "/images/student-life/activity/activity-center-bottom.jpg",
];

export default function StudentLifeAnimatedGallery() {
  return (
    <section className="relative bg-white w-full overflow-visible">
      {/* GLOW DECORATIVE BACKGROUND */}
      <div 
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        style={{
          background: "linear-gradient(to right, rgba(0, 98, 159, 0.15), rgba(0, 188, 218, 0.15), rgba(66, 211, 146, 0.15))",
          filter: "blur(84px)",
          mixBlendMode: "screen",
        }}
      />

      <ContainerScroll className="relative w-full">
        <ContainerSticky className="sticky top-0 left-0 w-full flex items-center justify-center overflow-hidden">
          <GalleryContainer className="w-full max-w-full p-0 px-0 py-0">
            {/* COLUMN 1 */}
            <GalleryCol 
              yProgressRange={[0, 1]} 
              yRange={["0%", "-15%"]} 
              className="mt-0"
            >
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-zinc-200"
                  src={imageUrl}
                  alt={`Student Life gallery item ${index + 1}`}
                />
              ))}
            </GalleryCol>

            {/* CENTER COLUMN */}
            <GalleryCol 
              className="mt-0" 
              yProgressRange={[0, 1]} 
              yRange={["0%", "-60%"]}
            >
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-zinc-200"
                  src={imageUrl}
                  alt={`Student Life gallery item ${index + 5}`}
                />
              ))}
            </GalleryCol>

            {/* COLUMN 3 */}
            <GalleryCol 
              yProgressRange={[0, 1]} 
              yRange={["0%", "-15%"]} 
              className="mt-0"
            >
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-zinc-200"
                  src={imageUrl}
                  alt={`Student Life gallery item ${index + 9}`}
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
