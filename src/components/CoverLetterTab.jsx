import React from "react";
import { copyToClipboard } from "../utils/helpers";
import { useState } from "react";

export default function CoverLetterTab({
  selectedJob,
  coverLetter,
  loadingCover,
  onGenerate,
  onChangeJob,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fade-up">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#fff" }}>
        Cover Letter
      </h2>
      <p style={{ color: "#6B6D85", fontSize: 13, marginBottom: 22 }}>
        AI-written, personalized to the selected role.
      </p>

      {/* No job selected */}
      {!selectedJob ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          Select a job from{" "}
          <span style={{ color: "#7C7FFF", cursor: "pointer" }} onClick={onChangeJob}>
            Find Jobs
          </span>{" "}
          first.
        </div>
      ) : (
        <>
          {/* Selected job banner */}
          <div className="selected-job-bar">
            <div>
              <span style={{ fontWeight: 600, color: "#fff" }}>{selectedJob.job_title}</span>
              <span style={{ color: "#6B6D85", fontSize: 13 }}> at {selectedJob.employer_name}</span>
            </div>
            <button className="btn-ghost hover-btn" onClick={onChangeJob} style={{ fontSize: 12, padding: "4px 10px" }}>
              Change ✕
            </button>
          </div>

          {/* Generate button */}
          <button
            className="btn-primary hover-btn"
            onClick={onGenerate}
            disabled={loadingCover}
            style={{ marginBottom: 20, opacity: loadingCover ? 0.65 : 1 }}
          >
            {loadingCover ? (
              <><span className="spin">⟳</span> Generating…</>
            ) : coverLetter ? (
              "✦ Regenerate"
            ) : (
              "✦ Generate Cover Letter"
            )}
          </button>

          {/* Output */}
          {coverLetter && (
            <div className="fade-up">
              <div className="output-box">{coverLetter}</div>
              <button className="btn-ghost hover-btn" onClick={handleCopy}>
                {copied ? "✓ Copied!" : "⎘ Copy to Clipboard"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
