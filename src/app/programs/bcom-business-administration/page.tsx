"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BcomBusinessAdministrationPage() {
  const config = PROGRAMS_CONFIG["bcom-business-administration"];
  return <ProgramPageTemplate config={config} />;
}
