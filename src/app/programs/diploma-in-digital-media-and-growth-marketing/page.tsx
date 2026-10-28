"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function DiplomaDigitalMediaPage() {
  const config = PROGRAMS_CONFIG["diploma-in-digital-media-and-growth-marketing"];
  return <ProgramPageTemplate config={config} />;
}
