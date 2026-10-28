"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, CheckCircle2, Clock } from "lucide-react";

interface ScholarshipOffersSectionProps {
  image?: string;
}

export default function ScholarshipOffersSection({
  image = "/images/student-life/student-life.webp",
}: ScholarshipOffersSectionProps) {
  return (
    <section
      id="scholarships-offers"
      className="bg-zinc-950 text-white py-20 sm:py-24 border-t border-zinc-900 relative overflow-hidden font-sans"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00629f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#42d392]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* FULL WIDTH BOX (LEFT 40% IMAGE | RIGHT 60% CONTENT + BUTTON) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* LEFT 40%: IMAGE CONTAINER */}
            <div className="w-full lg:w-[40%] relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden bg-zinc-950 group">
              <Image
                src={image}
                alt="Scholarships & Early Bird Offers at Future Varsity"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* FLOATING BENEFIT BADGE ON IMAGE */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42d392] to-[#00bcda] flex items-center justify-center text-zinc-950 shrink-0 shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wider text-emerald-400">
                      Cohort 2027 Priority
                    </p>
                    <p className="text-sm font-medium text-white">
                      Up to 50% Merit Scholarships
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 60%: CONTENT & BUTTON */}
            <div
              className="w-full lg:w-[60%] p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative"
              style={{
                background:
                  "linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(79 7 65) 100%)",
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00bcda]">
                    Exclusive Financial Grants
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00bcda]" />
                  <span className="text-xs text-zinc-400 font-light flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" /> Limited Seats
                  </span>
                </div>

                <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight mb-4 leading-snug">
                  Scholarships &{" "}
                  <span
                    className="font-medium inline-block pb-0.5 italic font-serif"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(66, 211, 146), rgb(0, 188, 218))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Early Bird Offers at Future Varsity.
                  </span>
                </h3>

                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-8">
                  Future Varsity rewards visionary applicants who take early initiative in shaping their corporate careers. Unlock tailored tuition credits, merit recognition, and financial assistance across all undergraduate programmes.
                </p>

                {/* KEY BULLETS */}
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#42d392] shrink-0" />
                    <span>Simple, transparent evaluation process alongside standard application</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#42d392] shrink-0" />
                    <span>Applicable across 3-year Bachelor's & 4-year Honours tracks</span>
                  </div>
                </div>
              </div>

              {/* BUTTON WITH # TAG */}
              <div className="pt-2 flex flex-col items-start gap-2.5">
                <Link
                  href="#apply"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00629f] to-[#00bcda] text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:opacity-95 transition-all duration-300 shadow-lg shadow-[#00629f]/30 inline-flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98] w-auto"
                >
                  <span>Apply For Scholarship</span>
                  <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <p className="text-xs text-zinc-400 font-light italic">
                  * Grants allocated on a first-come, first-served basis.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
