"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BcomArtificialIntelligencePage() {
  const config = PROGRAMS_CONFIG["bcom-artificial-intelligence"];
  return <ProgramPageTemplate config={config} />;
}
