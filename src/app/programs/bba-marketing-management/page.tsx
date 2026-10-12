"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BbaMarketingManagementPage() {
  const config = PROGRAMS_CONFIG["bba-marketing-management"];
  return <ProgramPageTemplate config={config} />;
}
