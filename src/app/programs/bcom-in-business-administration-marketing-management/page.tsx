"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function BcomMarketingManagementPage() {
  const config = PROGRAMS_CONFIG["bcom-in-business-administration-marketing-management"];
  return <ProgramPageTemplate config={config} />;
}
