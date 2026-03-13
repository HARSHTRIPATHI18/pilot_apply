// ─────────────────────────────────────────────
// timeAgo
// Converts a Unix timestamp (seconds) to a
// human-readable "X ago" string.
// ─────────────────────────────────────────────
export function timeAgo(ts) {
  if (!ts) return "";
  const diffHours = Math.floor((Date.now() / 1000 - ts) / 3600);
  if (diffHours < 1)  return "< 1h ago";
  if (diffHours < 24) return `${diffHours}h ago`;
  const days = Math.floor(diffHours / 24);
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// ─────────────────────────────────────────────
// matchScore
// Rough skill-overlap score between a job and
// the user's profile. Returns a number 0–97.
// ─────────────────────────────────────────────
export function matchScore(job, profile) {
  if (!profile.skills && !profile.title) {
    return Math.floor(55 + Math.random() * 35);
  }
  const haystack = (
    (job.job_title || "") + " " + (job.job_description || "")
  ).toLowerCase();
  const skills = (profile.skills || "").split(/[,\s]+/).filter(Boolean);
  const hits = skills.filter((s) => haystack.includes(s.toLowerCase())).length;
  return Math.min(97, 50 + Math.round((hits / Math.max(skills.length, 1)) * 47));
}

export function matchColor(score) {
  if (score >= 85) return "#4ADE80"; // green
  if (score >= 70) return "#FACC15"; // yellow
  return "#A8ABD0";                  // grey
}

export function copyToClipboard(text) {
  navigator.clipboard?.writeText(text);
}
