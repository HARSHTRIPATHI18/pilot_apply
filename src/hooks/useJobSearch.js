import { useState, useCallback } from "react";
import { DATE_FILTERS } from "../constants";
import { matchScore } from "../utils/helpers";

// ─────────────────────────────────────────────
// ⚠️  PASTE YOUR ADZUNA CREDENTIALS BELOW
// Get them free at: developer.adzuna.com
// ─────────────────────────────────────────────
const ADZUNA_APP_ID  = "your_app_id_here";
const ADZUNA_APP_KEY = "_your_app_key_here_";

const COUNTRY_CODES = {
  "india":          "in",
  "bengaluru":      "in",
  "bangalore":      "in",
  "mumbai":         "in",
  "delhi":          "in",
  "hyderabad":      "in",
  "pune":           "in",
  "chennai":        "in",
  "uk":             "gb",
  "london":         "gb",
  "usa":            "us",
  "new york":       "us",
  "san francisco":  "us",
  "remote":         "gb", // default to GB for remote
};

function getCountryCode(location) {
  if (!location) return "in"; // default to India
  const loc = location.toLowerCase();
  for (const [key, code] of Object.entries(COUNTRY_CODES)) {
    if (loc.includes(key)) return code;
  }
  return "in"; // fallback to India
}

export function useJobSearch(profile) {
  const [jobs,     setJobs]     = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [searched, setSearched] = useState(false);

  const searchJobs = useCallback(
    async ({ query, location, dateFilter }) => {
      if (!query.trim()) return;

      setLoading(true);
      setError("");
      setJobs([]);
      setSearched(true);

      const countryCode = getCountryCode(location);

      // Build date filter — Adzuna uses max_days_old param
      const df = DATE_FILTERS.find((f) => f.id === dateFilter);
      const daysOld = df?.id === "day"   ? 1
                    : df?.id === "3days" ? 3
                    : df?.id === "week"  ? 7
                    : df?.id === "month" ? 30
                    : null;

const params = new URLSearchParams({
  query,
  countryCode,
  ...(location ? { location } : {}),
  ...(daysOld  ? { daysOld: String(daysOld) } : {}),
});

      try {
        const fnUrl = `https://searchjobs-sg6cmaia7q-uc.a.run.app?${params}`;
        const res = await fetch(fnUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const raw  = data.results || [];

        // Normalize Adzuna response to match our app's expected shape
        const normalized = raw.map((job) => ({
          job_id:                 job.id,
          job_title:              job.title,
          employer_name:          job.company?.display_name || "Unknown Company",
          job_city:               job.location?.display_name || "",
          job_country:            job.location?.area?.[0] || "",
          job_is_remote:          job.title?.toLowerCase().includes("remote") || false,
          job_employment_type:    job.contract_time || job.contract_type || "",
          job_description:        job.description || "",
          job_apply_link:         job.redirect_url || "",
          job_posted_at_timestamp: job.created ? new Date(job.created).getTime() / 1000 : null,
          job_min_salary:         job.salary_min || null,
          job_max_salary:         job.salary_max || null,
          job_salary_currency:    "₹",
          job_salary_period:      "yr",
          job_publisher:          "Adzuna",
          _match:                 matchScore(
            { job_title: job.title, job_description: job.description },
            profile
          ),
        }));

        setJobs(normalized);
      } catch (e) {
        setError("Failed to fetch jobs: " + e.message);
      }

      setLoading(false);
    },
    [profile]
  );

  return { jobs, loading, error, searched, searchJobs };
}