export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  campus: "Malad Campus" | "Bhandup Campus" | "Ghatkopar Campus" | "Online";
  date: string;
  dayOfWeek: string;
  time: string;
  location: string;
  featuredImage: string;
  description: string;
  speaker: {
    name: string;
    role: string;
    avatar?: string;
  };
  mode: "Offline" | "Online" | "Hybrid";
  isFeatured?: boolean;
  status?: "upcoming" | "past";
}

export function checkIsPastEvent(event: EventItem): boolean {
  if (event.status === "past") return true;
  if (event.status === "upcoming") return false;

  const cleaned = event.date.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const eventDate = new Date(cleaned);
  if (isNaN(eventDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export const EVENT_CATEGORIES = [
  "All Categories",
  "Master Class",
  "Workshop",
  "Community Service Club",
  "Industry Visit",
  "Inhouse Events",
  "Students Club Activity",
  "Extra Curricular Activities",
  "Academic Conclave",
];

export const CAMPUS_OPTIONS = [
  "All Campuses",
  "Malad Campus",
  "Bhandup Campus",
  "Ghatkopar Campus",
  "Online",
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "e1",
    slug: "navigating-fundraising-landscape-capital-growth",
    title: "How to Navigate the Fundraising Landscape and Choose the Right Capital for Growth",
    category: "Master Class",
    campus: "Malad Campus",
    date: "29th September 2026",
    dayOfWeek: "Tuesday",
    time: "12:00 PM - 02:00 PM",
    location: "Auditorium, Malad Campus",
    featuredImage: "/images/new-folder/CASE-STUDY.webp",
    description: "An exclusive executive master class by top venture capitalists on equity structure, seed funding rounds, and growth capital for startups.",
    speaker: {
      name: "Vikram Malhotra",
      role: "Managing Partner, Apex Venture Capital",
    },
    mode: "Offline",
    isFeatured: true,
    status: "upcoming",
  },
  {
    id: "e2",
    slug: "ug-information-session-campus-tour",
    title: "UG Information Session, Curriculum Overview and Campus Tour 2026",
    category: "Inhouse Events",
    campus: "Malad Campus",
    date: "10th October 2026",
    dayOfWeek: "Saturday",
    time: "11:00 AM - 01:00 PM",
    location: "Main Campus Grounds & Seminar Hall, Malad",
    featuredImage: "/images/student-life/student-life.webp",
    description: "Interactive orientation and campus walkthrough for prospective BBA & B.Com honors students and parents.",
    speaker: {
      name: "Siddharth Verma",
      role: "Industry Placement Advisor",
    },
    mode: "Offline",
    status: "upcoming",
  },
  {
    id: "e3",
    slug: "ai-in-growth-marketing-webinar",
    title: "Attend Webinar: Leveraging Generative AI in Modern Growth Marketing",
    category: "Workshop",
    campus: "Online",
    date: "14th October 2026",
    dayOfWeek: "Wednesday",
    time: "04:00 PM - 05:30 PM",
    location: "Online via Zoom",
    featuredImage: "/images/hero-slider/hero-slider2.jpg",
    description: "Hands-on virtual workshop exploring AI prompt engineering, automated campaign workflows, and real-time audience analytics.",
    speaker: {
      name: "Prof. Priya Mehta",
      role: "Head of Digital Media & Tech",
    },
    mode: "Online",
    status: "upcoming",
  },
  {
    id: "e4",
    slug: "annual-community-cleanliness-drive-rotaract",
    title: "Annual Community Environmental & Cleanliness Drive",
    category: "Community Service Club",
    campus: "Bhandup Campus",
    date: "18th October 2026",
    dayOfWeek: "Sunday",
    time: "08:00 AM - 12:00 PM",
    location: "Bhandup Community Center & Local Parks",
    featuredImage: "/images/hero-slider/hero-slider3.jpg",
    description: "Join the IMSR Rotaract Social Club in creating community awareness and driving sustainable urban waste management initiatives.",
    speaker: {
      name: "Ananya Roy",
      role: "Rotaract & Community Lead",
    },
    mode: "Offline",
    status: "upcoming",
  },
  {
    id: "e5",
    slug: "industrial-visit-tata-consultancy-services",
    title: "Corporate Exposure: Industrial Visit to TCS Innovation Hub",
    category: "Industry Visit",
    campus: "Ghatkopar Campus",
    date: "15th August 2026",
    dayOfWeek: "Thursday",
    time: "09:30 AM - 04:00 PM",
    location: "TCS Enterprise Hub, Powai Tech Park",
    featuredImage: "/images/new-folder/Beach.webp",
    description: "On-site corporate exposure tour examining cloud architecture, enterprise AI labs, and digital transformation strategy.",
    speaker: {
      name: "Amitabh Nair",
      role: "Visiting Corporate Fellow",
    },
    mode: "Offline",
    status: "past",
  },
  {
    id: "e6",
    slug: "entrepreneurship-pitch-fest-student-club",
    title: "Incubation Pitch Fest 2026: Student Startup Showcase",
    category: "Students Club Activity",
    campus: "Malad Campus",
    date: "10th July 2026",
    dayOfWeek: "Wednesday",
    time: "10:00 AM - 03:00 PM",
    location: "Innovation Lab, Malad Campus",
    featuredImage: "/images/hero-slider/hero-slider1.jpg",
    description: "Student founders pitch their live business models to angel investors, startup mentors, and industry judges.",
    speaker: {
      name: "Dr. Vikram Joshi",
      role: "Analytics & Incubation Chair",
    },
    mode: "Offline",
    status: "past",
  },
  {
    id: "e7",
    slug: "cultural-fest-pulse-extra-curricular",
    title: "IMSR Pulse 2026: Inter-College Cultural & Sports Fest",
    category: "Extra Curricular Activities",
    campus: "Bhandup Campus",
    date: "05th June 2026",
    dayOfWeek: "Thursday",
    time: "09:00 AM - 06:00 PM",
    location: "Sports Complex & Auditorium, Bhandup",
    featuredImage: "/images/student-life/student-life.webp",
    description: "Annual flagship youth festival featuring dance competitions, drama, music battles, e-sports, and athletic tournaments.",
    speaker: {
      name: "Kavita Rao",
      role: "Student Affairs Director",
    },
    mode: "Offline",
    status: "past",
  },
  {
    id: "e8",
    slug: "national-academic-conclave-global-finance",
    title: "National Academic Conclave: Global Finance & Digital Currency Trends",
    category: "Academic Conclave",
    campus: "Ghatkopar Campus",
    date: "12th April 2026",
    dayOfWeek: "Thursday",
    time: "10:30 AM - 04:30 PM",
    location: "Conference Hall, Ghatkopar Campus",
    featuredImage: "/images/new-folder/CASE-STUDY.webp",
    description: "Renowned economists, fintech founders, and RBI policy advisors discuss the future of digital currency and global trade.",
    speaker: {
      name: "Dr. Rajesh Sharma",
      role: "Dean of Academic Affairs, IMSR",
    },
    mode: "Offline",
    status: "past",
  },
];
