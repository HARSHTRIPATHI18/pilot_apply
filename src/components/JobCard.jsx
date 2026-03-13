import React from "react";
import { PLATFORMS } from "../constants";
import { timeAgo, matchColor } from "../utils/helpers";

export default function JobCard({ job, isSelected, onSelect, onCoverLetter, onAutofill }) {
  const pub      = job.job_publisher || "";
  const pubColor = PLATFORMS.find((p) => pub.toLowerCase().includes(p.name.toLowerCase()))?.color || "#888";

  return (
    <div
      className="hover-card"
      onClick={onSelect}
      style={{
        background:   isSelected ? "#161722" : "#0F1018",
        border:       `1px solid ${isSelected ? "#7C7FFF44" : "#1E1F2B"}`,
        borderRadius: 12,
        padding:      "14px 18px",
      }}
    >
      {/* ── Top row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

        {/* Left: job details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title + badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{job.job_title}</span>
            {pub && (
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: pubColor + "22", color: pubColor, fontWeight: 600 }}>
                {pub}
              </span>
            )}
            {job.job_is_remote && (
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#00ADB522", color: "#00ADB5", fontWeight: 600 }}>
                Remote
              </span>
            )}
          </div>

          {/* Meta line */}
          <div style={{ fontSize: 13, color: "#6B6D85" }}>
            <span style={{ color: "#A8ABD0", fontWeight: 500 }}>{job.employer_name}</span>
            {job.job_city            ? ` · ${job.job_city}`                      : ""}
            {job.job_country         ? `, ${job.job_country}`                    : ""}
            {job.job_employment_type ? ` · ${job.job_employment_type}`           : ""}
            {job.job_posted_at_timestamp ? ` · ${timeAgo(job.job_posted_at_timestamp)}` : ""}
          </div>

          {/* Salary */}
          {job.job_min_salary && (
            <div style={{ fontSize: 12, color: "#7C7FFF", marginTop: 4, fontWeight: 500 }}>
              {job.job_salary_currency || "$"}
              {job.job_min_salary?.toLocaleString()}–{job.job_max_salary?.toLocaleString()}
              {" /"}{job.job_salary_period || "yr"}
            </div>
          )}
        </div>

        {/* Right: match score + apply link */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginLeft: 16 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: matchColor(job._match) }}>
              {job._match}%
            </div>
            <div style={{ fontSize: 10, color: "#454659", fontWeight: 600 }}>MATCH</div>
          </div>
          {job.job_apply_link && (
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 11, color: "#7C7FFF", textDecoration: "none", fontWeight: 600, border: "1px solid #7C7FFF44", padding: "4px 10px", borderRadius: 5 }}
            >
              Apply ↗
            </a>
          )}
        </div>
      </div>

      {/* ── Expanded section ── */}
      {isSelected && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1E1F2B" }}>
          <p style={{ fontSize: 13, color: "#9899B0", lineHeight: 1.6, marginBottom: 10 }}>
            {(job.job_description || "").slice(0, 320)}
            {(job.job_description || "").length > 320 ? "…" : ""}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="hover-btn"
              onClick={(e) => { e.stopPropagation(); onCoverLetter(); }}
              style={{ background: "#7C7FFF22", color: "#7C7FFF", border: "1px solid #7C7FFF44", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              ✍ Cover Letter
            </button>
            <button
              className="hover-btn"
              onClick={(e) => { e.stopPropagation(); onAutofill(); }}
              style={{ background: "#C77DFF22", color: "#C77DFF", border: "1px solid #C77DFF44", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              📋 Autofill Kit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
