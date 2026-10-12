"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function DiplomaDigitalMediaGrowthMarketingPage() {
  const config = PROGRAMS_CONFIG["diploma-digital-media-growth-marketing"];
  return <ProgramPageTemplate config={config} />;
}
