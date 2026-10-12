"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BscDigitalMediaGrowthMarketingPage() {
  const config = PROGRAMS_CONFIG["bsc-digital-media-growth-marketing"];
  return <ProgramPageTemplate config={config} />;
}
