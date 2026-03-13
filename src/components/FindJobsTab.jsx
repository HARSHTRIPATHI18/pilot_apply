import React, { useState } from "react";
import { PLATFORMS, GLOBAL_PLATFORMS, INDIA_PLATFORMS, DATE_FILTERS } from "../constants";
import { useJobSearch } from "../hooks/useJobSearch";
import JobCard from "./JobCard";

export default function FindJobsTab({ profile, selectedJob, onSelectJob, onGoToCoverLetter, onGoToAutofill }) {
  const [query,        setQuery]        = useState("");
  const [location,     setLocation]     = useState("");
  const [dateFilter,   setDateFilter]   = useState("all");
  const [selPlatforms, setSelPlatforms] = useState(PLATFORMS.map((p) => p.id));

  const { jobs, loading, error, searched, searchJobs } = useJobSearch(profile);

  const togglePlatform = (id) =>
    setSelPlatforms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleGroup = (arr) => {
    const ids   = arr.map((p) => p.id);
    const allOn = ids.every((id) => selPlatforms.includes(id));
    setSelPlatforms((prev) =>
      allOn ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]
    );
  };

  const handleSearch = () => searchJobs({ query, location, dateFilter });

  const openPlatform = (pid) => {
    const p = PLATFORMS.find((x) => x.id === pid);
    if (p) window.open(p.searchUrl(query || profile.title || "jobs", location || ""), "_blank");
  };

  const PlatformPill = ({ platform }) => {
    const active = selPlatforms.includes(platform.id);
    return (
      <div
        className="pill"
        onClick={() => togglePlatform(platform.id)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 13px", borderRadius: 20, cursor: "pointer",
          border:     `1.5px solid ${active ? platform.color : "#1E1F2B"}`,
          background: active ? platform.color + "18" : "#0F1018",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: active ? platform.color : "#454659" }}>●</span>
        <span style={{ fontSize: 12, color: active ? "#E8E9F0" : "#6B6D85", fontWeight: 500 }}>{platform.name}</span>
      </div>
    );
  };

  return (
    <div className="fade-up">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#fff" }}>
        Find Jobs
      </h2>
      <p style={{ color: "#6B6D85", fontSize: 13, marginBottom: 20 }}>
        Live results via Adzuna · 10 platforms · time filters.
      </p>

      {/* Search row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <input
          className="input-field input-focus"
          value={query}
          placeholder="Job title or keywords…"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ flex: 2 }}
        />
        <input
          className="input-field input-focus"
          value={location}
          placeholder="City, country, or Remote"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ flex: 1 }}
        />
        <button
          className="btn-primary hover-btn"
          onClick={handleSearch}
          disabled={loading}
          style={{ opacity: loading ? 0.65 : 1, whiteSpace: "nowrap" }}
        >
          {loading ? <span className="spin">⟳</span> : "Search"}
        </button>
      </div>

      {/* Date filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#454659", fontWeight: 600, marginRight: 2 }}>POSTED:</span>
        {DATE_FILTERS.map((f) => (
          <button
            key={f.id}
            className="pill hover-btn"
            onClick={() => setDateFilter(f.id)}
            style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1.5px solid",
              borderColor: dateFilter === f.id ? "#7C7FFF"   : "#1E1F2B",
              background:  dateFilter === f.id ? "#7C7FFF18" : "#0F1018",
              color:       dateFilter === f.id ? "#A5A8FF"   : "#6B6D85",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Platform toggles */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <button className="btn-ghost hover-btn" onClick={() => toggleGroup(GLOBAL_PLATFORMS)} style={{ fontSize: 11, padding: "5px 11px", borderRadius: 5 }}>
            🌐 Toggle Global
          </button>
          {GLOBAL_PLATFORMS.map((p) => <PlatformPill key={p.id} platform={p} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <button className="btn-ghost hover-btn" onClick={() => toggleGroup(INDIA_PLATFORMS)} style={{ fontSize: 11, padding: "5px 11px", borderRadius: 5 }}>
            🇮🇳 Toggle India
          </button>
          {INDIA_PLATFORMS.map((p) => <PlatformPill key={p.id} platform={p} />)}
        </div>
      </div>

      {/* Open portals directly */}
      {query && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20, padding: "10px 14px", background: "#0D0E14", borderRadius: 8, border: "1px solid #1E1F2B", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#454659", fontWeight: 600 }}>OPEN DIRECTLY:</span>
          {PLATFORMS.filter((p) => selPlatforms.includes(p.id)).map((p) => (
            <button
              key={p.id}
              className="hover-btn"
              onClick={() => openPlatform(p.id)}
              style={{ background: p.color + "1A", color: p.color, border: `1px solid ${p.color}44`, padding: "4px 11px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
            >
              {p.name} ↗
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <div className="error-banner">⚠ {error}</div>}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#454659", fontSize: 14 }}>
          <span className="spin" style={{ fontSize: 28 }}>⟳</span>
          <div style={{ marginTop: 12 }}>Fetching live jobs…</div>
        </div>
      )}

      {/* No results */}
      {!loading && searched && jobs.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#454659", fontSize: 14 }}>
          No jobs found. Try different keywords or broaden the time filter.
        </div>
      )}

      {/* Results */}
      {!loading && jobs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#454659", marginBottom: 2 }}>{jobs.length} live jobs found</div>
          {jobs.map((job, idx) => (
            <JobCard
              key={job.job_id || idx}
              job={job}
              isSelected={selectedJob?.job_id === job.job_id}
              onSelect={() => onSelectJob(selectedJob?.job_id === job.job_id ? null : job)}
              onCoverLetter={onGoToCoverLetter}
              onAutofill={onGoToAutofill}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#454659" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 14 }}>Enter a job title and location, then hit Search.</div>
        </div>
      )}
    </div>
  );
}
