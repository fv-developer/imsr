"use client";

import React from "react";
import ProgramPageTemplate from "@/components/programs/templates/ProgramPageTemplate";
import { PROGRAMS_CONFIG } from "@/data/programsData";

export default function DiplomaSecurityManagementPage() {
  const config = PROGRAMS_CONFIG["diploma-in-security-management"];
  return <ProgramPageTemplate config={config} />;
}
