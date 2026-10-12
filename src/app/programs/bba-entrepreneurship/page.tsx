"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BbaEntrepreneurshipPage() {
  const config = PROGRAMS_CONFIG["bba-entrepreneurship"];
  return <ProgramPageTemplate config={config} />;
}
