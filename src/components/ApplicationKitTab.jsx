import React, { useState } from "react";
import { copyToClipboard } from "../utils/helpers";

export default function ApplicationKitTab({
  selectedJob,
  autofillSections,
  loadingFill,
  onGenerate,
  onChangeJob,
}) {
  const [copied, setCopied] = useState("");

  const copy = (text, key) => {
    copyToClipboard(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1800);
  };

  const copyAll = () => {
    const all = autofillSections.map((s) => `${s.label}\n${s.text}`).join("\n\n");
    copy(all, "all");
  };

  return (
    <div className="fade-up">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#fff" }}>
        Application Kit
      </h2>
      <p style={{ color: "#6B6D85", fontSize: 13, marginBottom: 22 }}>
        Pre-filled answers for common application form questions.
      </p>

      {/* No job selected */}
      {!selectedJob ? (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
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
            <span style={{ fontWeight: 600, color: "#fff" }}>{selectedJob.job_title}</span>
            <span style={{ color: "#6B6D85", fontSize: 13, fontWeight: 400 }}> at {selectedJob.employer_name}</span>
          </div>

          {/* Generate button */}
          <button
            className="btn-primary hover-btn"
            onClick={onGenerate}
            disabled={loadingFill}
            style={{
              marginBottom: 20,
              opacity:      loadingFill ? 0.65 : 1,
              background:   "linear-gradient(135deg, #C77DFF, #7C7FFF)",
            }}
          >
            {loadingFill ? (
              <><span className="spin">⟳</span> Generating…</>
            ) : autofillSections.length > 0 ? (
              "✦ Regenerate"
            ) : (
              "✦ Generate Form Answers"
            )}
          </button>

          {/* Answer cards */}
          {autofillSections.length > 0 && (
            <div className="fade-up">
              {autofillSections.map((item, i) => (
                <div key={i} className="autofill-card">
                  <div className="autofill-card-label">{item.label}</div>
                  <div className="autofill-card-text">{item.text}</div>
                  <button
                    className="btn-ghost hover-btn"
                    onClick={() => copy(item.text, "af" + i)}
                    style={{ marginTop: 10, fontSize: 11, padding: "5px 12px" }}
                  >
                    {copied === "af" + i ? "✓ Copied!" : "⎘ Copy"}
                  </button>
                </div>
              ))}

              <button className="btn-ghost hover-btn" onClick={copyAll} style={{ marginTop: 4 }}>
                {copied === "all" ? "✓ All Copied!" : "⎘ Copy All"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
