"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BcomEntrepreneurshipPage() {
  const config = PROGRAMS_CONFIG["bcom-entrepreneurship"];
  return <ProgramPageTemplate config={config} />;
}
