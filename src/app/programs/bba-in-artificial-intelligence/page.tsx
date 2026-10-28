"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BbaArtificialIntelligencePage() {
  const config = PROGRAMS_CONFIG["bba-in-artificial-intelligence"];
  return <ProgramPageTemplate config={config} />;
}
