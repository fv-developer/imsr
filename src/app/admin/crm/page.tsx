"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  Phone,
  MessageSquare,
  Clock,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Plus,
  Lock,
  LogOut,
  Send,
  UserCheck,
  Building2,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  PhoneCall,
  Shield,
  Smartphone
} from "lucide-react";

export interface Lead {
  id: string;
  dateTime: string;
  name: string;
  phone: string;
  altPhone?: string;
  email: string;
  status: string; // "New Leads", "Contacted", "Interested", "Cold", "Warm", "Admitted", "Not Interested", "Lost"
  assignee: { name: string; initials: string; color: string };
  course: string;
  city: string;
  state: string;
  programLevel: string;
  leadSource: string;
  utmSource?: string;
  activityHistory: {
    id: string;
    type: "created" | "note" | "status" | "whatsapp" | "call";
    text: string;
    timestamp: string;
    author?: string;
  }[];
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "LEAD-101",
    dateTime: "03 Sept 2026 01:24 pm",
    name: "Muhammad Sohel majid shaikh",
    phone: "+91 9699921586",
    altPhone: "—",
    email: "majidmtv8686@gmail.com",
    status: "New Leads",
    assignee: { name: "Varsha Shah", initials: "VS", color: "bg-red-600" },
    course: "B.B.A. (Hons.) Business Administration",
    city: "Mumbai",
    state: "Maharashtra",
    programLevel: "Bachelor",
    leadSource: "School / College",
    utmSource: "google",
    activityHistory: [
      {
        id: "act-1",
        type: "created",
        text: "Lead created — Muhammad Sohel majid shaikh | 9699921586 | majidmtv8686@gmail.com | B.B.A. (Hons.)",
        timestamp: "03 SEPT 2026, 01:24 PM",
      },
    ],
  },
  {
    id: "LEAD-102",
    dateTime: "02 Sept 2026 11:17 am",
    name: "Rohan VISHWAKARMA",
    phone: "+91 9136463759",
    altPhone: "+91 9876543210",
    email: "rohanvishwakarma262@gmail.com",
    status: "Interested",
    assignee: { name: "Varsha Shah", initials: "VS", color: "bg-red-600" },
    course: "B.B.A. (Hons.) Business Administration",
    city: "Mumbai",
    state: "Maharashtra",
    programLevel: "Bachelor",
    leadSource: "Online Search",
    utmSource: "facebook",
    activityHistory: [
      {
        id: "act-2",
        type: "created",
        text: "Lead submitted via website form — Rohan VISHWAKARMA",
        timestamp: "02 SEPT 2026, 11:17 AM",
      },
      {
        id: "act-3",
        type: "status",
        text: "Status updated to Interested by Varsha Shah",
        timestamp: "02 SEPT 2026, 02:30 PM",
      },
    ],
  },
  {
    id: "LEAD-103",
    dateTime: "25 Aug 2026 02:41 pm",
    name: "Soham Dhayalkar",
    phone: "+91 7045183128",
    altPhone: "—",
    email: "dhayalkarsoham@gmail.com",
    status: "Contacted",
    assignee: { name: "Santosh Tiwari", initials: "ST", color: "bg-red-600" },
    course: "B.B.A. (Hons.) Business Administration",
    city: "Mumbai",
    state: "Maharashtra",
    programLevel: "Bachelor",
    leadSource: "Online Search",
    utmSource: "instagram",
    activityHistory: [
      {
        id: "act-4",
        type: "created",
        text: "Lead submitted via website form",
        timestamp: "25 AUG 2026, 02:41 PM",
      },
    ],
  },
  {
    id: "LEAD-104",
    dateTime: "19 Aug 2026 12:46 pm",
    name: "Riddhesh Methar",
    phone: "+91 8108690037",
    altPhone: "—",
    email: "metharriddhesh88@gmail.com",
    status: "Warm",
    assignee: { name: "Santosh Tiwari", initials: "ST", color: "bg-red-600" },
    course: "B.B.A. (Hons.) Business Administration",
    city: "Thane",
    state: "Maharashtra",
    programLevel: "Bachelor",
    leadSource: "Direct Referral",
    utmSource: "direct",
    activityHistory: [
      {
        id: "act-5",
        type: "created",
        text: "Lead created — Riddhesh Methar",
        timestamp: "19 AUG 2026, 12:46 PM",
      },
    ],
  },
  {
    id: "LEAD-105",
    dateTime: "18 Aug 2026 04:15 pm",
    name: "Ananya Sharma",
    phone: "+91 9820011223",
    altPhone: "—",
    email: "ananya.sharma@gmail.com",
    status: "Admitted",
    assignee: { name: "Varsha Shah", initials: "VS", color: "bg-red-600" },
    course: "B.B.A. (Hons.) Business Administration",
    city: "Navi Mumbai",
    state: "Maharashtra",
    programLevel: "Bachelor",
    leadSource: "College Education Fair",
    utmSource: "education-fair",
    activityHistory: [
      {
        id: "act-6",
        type: "created",
        text: "Lead created — Ananya Sharma",
        timestamp: "18 AUG 2026, 04:15 PM",
      },
    ],
  },
];

const STATUS_CONFIG: Record<
  string,
  { label: string; dotColor: string; bgClass: string; textClass: string; borderClass: string }
> = {
  "New Leads": {
    label: "New Leads",
    dotColor: "#3b82f6",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
    borderClass: "border-blue-200",
  },
  Contacted: {
    label: "Contacted",
    dotColor: "#eab308",
    bgClass: "bg-amber-50",
    textClass: "text-amber-700",
    borderClass: "border-amber-200",
  },
  Interested: {
    label: "Interested",
    dotColor: "#22c55e",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-700",
    borderClass: "border-emerald-200",
  },
  Cold: {
    label: "Cold",
    dotColor: "#06b6d4",
    bgClass: "bg-cyan-50",
    textClass: "text-cyan-700",
    borderClass: "border-cyan-200",
  },
  Warm: {
    label: "Warm",
    dotColor: "#f97316",
    bgClass: "bg-orange-50",
    textClass: "text-orange-700",
    borderClass: "border-orange-200",
  },
  Admitted: {
    label: "Admitted",
    dotColor: "#a855f7",
    bgClass: "bg-purple-50",
    textClass: "text-purple-700",
    borderClass: "border-purple-200",
  },
  "Not Interested": {
    label: "Not Interested",
    dotColor: "#ef4444",
    bgClass: "bg-red-50",
    textClass: "text-red-700",
    borderClass: "border-red-200",
  },
  Lost: {
    label: "Lost",
    dotColor: "#6b7280",
    bgClass: "bg-gray-100",
    textClass: "text-gray-700",
    borderClass: "border-gray-300",
  },
};

export default function CrmPortalPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all-leads");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");

  // Dropdown states inside Drawer
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);

  // Note & WhatsApp inputs
  const [customNote, setCustomNote] = useState<string>("");
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState<string>(
    "Hello! Thank you for inquiring about B.B.A. (Hons.) Business Administration at IMSR. When would be a good time for a short academic guidance call?"
  );

  // Get current active lead object
  const activeLeadIndex = leads.findIndex((l) => l.id === selectedLeadId);
  const activeLead = activeLeadIndex !== -1 ? leads[activeLeadIndex] : null;

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "All" || lead.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handler: Update Lead Status
  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedLeadId) return;
    setLeads((prevLeads) =>
      prevLeads.map((l) => {
        if (l.id === selectedLeadId) {
          const nowStr = new Date().toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return {
            ...l,
            status: newStatus,
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                type: "status",
                text: `Status updated to "${newStatus}" by Admin`,
                timestamp: nowStr,
              },
              ...l.activityHistory,
            ],
          };
        }
        return l;
      })
    );
    setIsStatusDropdownOpen(false);
  };

  // Handler: Add Custom Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadId || !customNote.trim()) return;

    const nowStr = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setLeads((prevLeads) =>
      prevLeads.map((l) => {
        if (l.id === selectedLeadId) {
          return {
            ...l,
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                type: "note",
                text: `Note: ${customNote.trim()}`,
                timestamp: nowStr,
                author: "CRM Admin",
              },
              ...l.activityHistory,
            ],
          };
        }
        return l;
      })
    );
    setCustomNote("");
    setIsNoteModalOpen(false);
  };

  // Handler: Send Direct WhatsApp Message
  const handleSendWhatsApp = () => {
    if (!activeLead) return;
    const cleanPhone = activeLead.phone.replace(/[^0-9]/g, "");
    const encodedMsg = encodeURIComponent(customWhatsAppMsg);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    // Add activity log
    const nowStr = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setLeads((prevLeads) =>
      prevLeads.map((l) => {
        if (l.id === activeLead.id) {
          return {
            ...l,
            activityHistory: [
              {
                id: `act-${Date.now()}`,
                type: "whatsapp",
                text: `WhatsApp message initiated to ${activeLead.phone}`,
                timestamp: nowStr,
              },
              ...l.activityHistory,
            ],
          };
        }
        return l;
      })
    );

    setIsWhatsAppModalOpen(false);
    window.open(whatsappUrl, "_blank");
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ["ID,DateTime,Name,Phone,Email,Status,Assignee,Course,City,State"];
    const rows = leads.map((l) =>
      `"${l.id}","${l.dateTime}","${l.name}","${l.phone}","${l.email}","${l.status}","${l.assignee.name}","${l.course}","${l.city}","${l.state}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CRM_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f6f9] text-slate-800 font-sans overflow-hidden select-none">
      
      {/* ================================================================= */}
      {/* 1. LEFT FIXED SIDEBAR MENU (NON-OVERLAPPING FLEX CHILD) */}
      {/* ================================================================= */}
      <aside className="w-60 shrink-0 bg-[#1e293b] text-white flex flex-col justify-between shadow-xl z-20">
        <div>
          {/* LOGO & BRAND TITLE */}
          <div className="p-5 border-b border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00629f] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white">Hello Careers</h1>
              <p className="text-[11px] text-slate-400 font-medium">CRM Admin Portal</p>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-3 space-y-1 mt-2">
            <button
              onClick={() => setActiveTab("all-leads")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "all-leads"
                  ? "bg-[#00629f] text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>All Leads</span>
            </button>

            <button
              onClick={() => setActiveTab("lead-statuses")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "lead-statuses"
                  ? "bg-[#00629f] text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Lead Statuses</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp-api")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "whatsapp-api"
                  ? "bg-[#00629f] text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp API</span>
            </button>

            <button
              onClick={() => setActiveTab("sub-admins")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "sub-admins"
                  ? "bg-[#00629f] text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>Sub-Admin Users</span>
            </button>

            <button
              onClick={() => setActiveTab("change-password")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "change-password"
                  ? "bg-[#00629f] text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Lock className="w-4 h-4 text-orange-400" />
              <span>Change Password</span>
            </button>
          </nav>
        </div>

        {/* BOTTOM USER PROFILE BADGE */}
        <div className="p-4 border-t border-slate-700/60 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">CRM Main Admin</p>
              <p className="text-[10px] text-slate-400 uppercase font-mono">Super Admin</p>
            </div>
            <button
              onClick={() => alert("Logged out successfully.")}
              title="Logout"
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================================================================= */}
      {/* 2. MAIN CONTENT AREA (FLEX-1 FULL WIDTH) */}
      {/* ================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f4f6f9]">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">All Leads</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredLeads.length} total leads
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH INPUT */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629f]/30 w-64 bg-slate-50 text-slate-800"
              />
            </div>

            {/* EXPORT BUTTON */}
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export</span>
            </button>

            {/* REFRESH BUTTON */}
            <button
              onClick={() => alert("Refreshed leads data.")}
              title="Refresh"
              className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 transition shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* STATUS FILTER BADGES SCROLLBAR */}
        <div className="px-6 py-3 bg-white border-b border-slate-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Filter:</span>
          {["All", "New Leads", "Contacted", "Interested", "Cold", "Warm", "Admitted", "Not Interested", "Lost"].map(
            (statusKey) => {
              const isActive = selectedStatusFilter === statusKey;
              return (
                <button
                  key={statusKey}
                  onClick={() => setSelectedStatusFilter(statusKey)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    isActive
                      ? "bg-[#00629f] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {statusKey}
                </button>
              );
            }
          )}
        </div>

        {/* DATA TABLE CONTAINER */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-4 w-10">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-0" />
                  </th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assignee</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">City</th>
                  <th className="p-4">State</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG["New Leads"];
                  const isSelected = selectedLeadId === lead.id;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected ? "bg-blue-50/70" : "hover:bg-slate-50/80"
                      }`}
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-0" />
                      </td>

                      {/* DATE */}
                      <td className="p-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {lead.dateTime}
                      </td>

                      {/* NAME */}
                      <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                        {lead.name}
                      </td>

                      {/* PHONE */}
                      <td className="p-4 font-mono text-slate-600 whitespace-nowrap">
                        {lead.phone}
                      </td>

                      {/* EMAIL */}
                      <td className="p-4 text-slate-600 max-w-[180px] truncate">
                        {lead.email}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[11px] border ${cfg.bgClass} ${cfg.textClass} ${cfg.borderClass}`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: cfg.dotColor }}
                          />
                          {lead.status}
                        </span>
                      </td>

                      {/* ASSIGNEE */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center ${lead.assignee.color}`}
                          >
                            {lead.assignee.initials}
                          </span>
                          <span className="text-slate-700 font-medium text-xs">
                            {lead.assignee.name}
                          </span>
                        </div>
                      </td>

                      {/* COURSE */}
                      <td className="p-4 text-slate-700 max-w-[200px] truncate">
                        {lead.course}
                      </td>

                      {/* CITY */}
                      <td className="p-4 text-slate-700">{lead.city}</td>

                      {/* STATE */}
                      <td className="p-4 text-slate-700">{lead.state}</td>

                      {/* ACTION BUTTON */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLeadId(lead.id);
                          }}
                          className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-[#00629f] hover:text-white hover:border-[#00629f] font-semibold text-xs transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ================================================================= */}
      {/* 3. RIGHT-SIDE SLIDE-OVER DRAWER (MATCHING UPLOADED REFERENCE DESIGN) */}
      {/* ================================================================= */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            
            {/* DRAWER TOP BAR (CLOSE + PREV/NEXT NAVIGATION) */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
              <button
                onClick={() => setSelectedLeadId(null)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 flex items-center justify-center text-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeLeadIndex <= 0}
                  onClick={() => setSelectedLeadId(leads[activeLeadIndex - 1].id)}
                  className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 text-slate-700"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  disabled={activeLeadIndex >= leads.length - 1}
                  onClick={() => setSelectedLeadId(leads[activeLeadIndex + 1].id)}
                  className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 text-slate-700"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* DRAWER CONTENT SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* LEAD NAME & STATUS DROPDOWN ROW */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                    {activeLead.name}
                  </h2>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center ${activeLead.assignee.color}`}
                    >
                      {activeLead.assignee.initials}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {activeLead.assignee.name}
                    </span>
                  </div>
                </div>

                {/* STATUS SELECTOR DROPDOWN BUTTON */}
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition shadow-xs"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          STATUS_CONFIG[activeLead.status]?.dotColor || "#3b82f6",
                      }}
                    />
                    <span>{activeLead.status}</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1" />
                  </button>

                  {/* STATUS DROPDOWN MENU */}
                  {isStatusDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in duration-150">
                      {Object.keys(STATUS_CONFIG).map((stKey) => {
                        const isCurr = activeLead.status === stKey;
                        const cfg = STATUS_CONFIG[stKey];
                        return (
                          <button
                            key={stKey}
                            onClick={() => handleUpdateStatus(stKey)}
                            className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: cfg.dotColor }}
                              />
                              <span>{stKey}</span>
                            </div>
                            {isCurr && <Check className="w-3.5 h-3.5 text-blue-600" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* LEAD METADATA GRID (PHONE, EMAIL, COURSE, CITY, STATE, SOURCE) */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60 text-xs">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Phone
                  </p>
                  <p className="font-bold text-slate-900 font-mono text-sm">{activeLead.phone}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Email
                  </p>
                  <p className="font-bold text-slate-900 truncate">{activeLead.email}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Course
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100/80 text-amber-900 border border-amber-200">
                    {activeLead.course}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    State
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-yellow-100/80 text-yellow-900 border border-yellow-200">
                    {activeLead.state}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    City
                  </p>
                  <p className="font-semibold text-slate-800">{activeLead.city}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Lead Source
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-200">
                    {activeLead.leadSource}
                  </span>
                </div>
              </div>

              {/* 4 QUICK ACTION CIRCLE BUTTONS ROW (CALL, CALL LATER, WHATSAPP, ADD NOTE) */}
              <div className="pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
                  Quick Actions
                </p>
                <div className="grid grid-cols-4 gap-3">
                  
                  {/* 1. CALL BUTTON */}
                  <a
                    href={`tel:${activeLead.phone}`}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs transition">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">CALL</span>
                  </a>

                  {/* 2. CALL LATER BUTTON */}
                  <button
                    onClick={() => handleUpdateStatus("Contacted")}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 border border-slate-200/80 hover:border-amber-200 transition group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-amber-600 text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs transition">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">CALL LATER</span>
                  </button>

                  {/* 3. WHATSAPP DIRECT MESSAGE BUTTON */}
                  <button
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-200 transition group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-emerald-600 text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs transition">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">WHATSAPP</span>
                  </button>

                  {/* 4. ADD NOTE BUTTON */}
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-200 transition group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-purple-600 text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs transition">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">ADD NOTE</span>
                  </button>

                </div>
              </div>

              {/* ACTIVITY HISTORY TIMELINE */}
              <div className="border-t border-slate-200/80 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                    Activity History
                  </h4>
                  <span className="text-[11px] font-semibold text-blue-600">
                    {activeLead.activityHistory.length} entries
                  </span>
                </div>

                <div className="space-y-3">
                  {activeLead.activityHistory.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 font-medium leading-relaxed">{act.text}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-1">
                          {act.timestamp} {act.author ? `• by ${act.author}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 4. MODAL: WHATSAPP DIRECT MESSAGE SENDER */}
      {/* ================================================================= */}
      {isWhatsAppModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Send WhatsApp Message</h3>
                  <p className="text-xs text-slate-500 font-mono">To: {activeLead.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Message Content:
              </label>
              <textarea
                rows={4}
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none bg-slate-50 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 5. MODAL: ADD NOTE TO LEAD */}
      {/* ================================================================= */}
      {isNoteModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <form
            onSubmit={handleAddNote}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Add Internal Note</h3>
                  <p className="text-xs text-slate-500 font-medium">{activeLead.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Note Details:
              </label>
              <textarea
                rows={3}
                placeholder="Type internal remarks, callback summary, or student preferences..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500/30 focus:outline-none bg-slate-50 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md"
              >
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
