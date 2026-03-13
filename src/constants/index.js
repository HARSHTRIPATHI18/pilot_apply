export const PLATFORMS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    flag: "🌐",
    color: "#0A66C2",
    searchUrl: (q, l) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=${encodeURIComponent(l)}`,
  },
  {
    id: "indeed",
    name: "Indeed",
    flag: "🌐",
    color: "#003A9B",
    searchUrl: (q, l) =>
      `https://www.indeed.com/jobs?q=${encodeURIComponent(q)}&l=${encodeURIComponent(l)}`,
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    flag: "🌐",
    color: "#0CAA41",
    searchUrl: (q, l) =>
      `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(q)}&locKeyword=${encodeURIComponent(l)}`,
  },
  {
    id: "ziprecruiter",
    name: "ZipRecruiter",
    flag: "🌐",
    color: "#FF6B00",
    searchUrl: (q, l) =>
      `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(q)}&location=${encodeURIComponent(l)}`,
  },
  {
    id: "monster",
    name: "Monster",
    flag: "🌐",
    color: "#6E00FF",
    searchUrl: (q, l) =>
      `https://www.monster.com/jobs/search?q=${encodeURIComponent(q)}&where=${encodeURIComponent(l)}`,
  },
  {
    id: "wellfound",
    name: "Wellfound",
    flag: "🌐",
    color: "#FF4154",
    searchUrl: (q) =>
      `https://wellfound.com/jobs?q=${encodeURIComponent(q)}`,
  },
  // ── India ──
  {
    id: "naukri",
    name: "Naukri",
    flag: "🇮🇳",
    color: "#FF7555",
    searchUrl: (q, l) =>
      `https://www.naukri.com/${encodeURIComponent(q.toLowerCase().replace(/ /g, "-"))}-jobs${
        l ? "-in-" + encodeURIComponent(l.toLowerCase().replace(/ /g, "-")) : ""
      }`,
  },
  {
    id: "shine",
    name: "Shine",
    flag: "🇮🇳",
    color: "#E84A5F",
    searchUrl: (q, l) =>
      `https://www.shine.com/job-search/${encodeURIComponent(q.toLowerCase().replace(/ /g, "-"))}-jobs${
        l ? "-in-" + encodeURIComponent(l.toLowerCase().replace(/ /g, "-")) : ""
      }`,
  },
  {
    id: "foundit",
    name: "Foundit",
    flag: "🇮🇳",
    color: "#8B5CF6",
    searchUrl: (q, l) =>
      `https://www.foundit.in/search/jobs?searchType=simple&query=${encodeURIComponent(q)}&location=${encodeURIComponent(l)}`,
  },
  {
    id: "internshala",
    name: "Internshala",
    flag: "🇮🇳",
    color: "#00ADB5",
    searchUrl: (q) =>
      `https://internshala.com/jobs/${encodeURIComponent(q.toLowerCase().replace(/ /g, "-"))}-jobs`,
  },
];

export const GLOBAL_PLATFORMS = PLATFORMS.filter((p) => p.flag === "🌐");
export const INDIA_PLATFORMS  = PLATFORMS.filter((p) => p.flag === "🇮🇳");

// ─────────────────────────────────────────────
// Date / Time Filters
// jsVal maps to JSearch's date_posted param.
// ─────────────────────────────────────────────
export const DATE_FILTERS = [
  { id: "all",    label: "Any time",    jsVal: null     },
  { id: "day",    label: "Last 24 hrs", jsVal: "today"  },
  { id: "3days",  label: "Last 3 days", jsVal: "3days"  },
  { id: "week",   label: "Last week",   jsVal: "week"   },
  { id: "month",  label: "Last month",  jsVal: "month"  },
];

export const TABS = ["Profile", "Find Jobs", "Cover Letter", "Application Kit"];

export const DEFAULT_PROFILE = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
};
