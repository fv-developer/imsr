"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BbaArtificialIntelligencePage() {
  const config = PROGRAMS_CONFIG["bba-artificial-intelligence"];
  return <ProgramPageTemplate config={config} />;
}
