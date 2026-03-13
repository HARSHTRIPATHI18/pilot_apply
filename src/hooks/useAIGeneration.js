import { useState } from "react";

const AI_FUNCTION_URL = "your_function_url_here";

async function callGemini(prompt) {
  const res = await fetch(AI_FUNCTION_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.text || "No response.";
}


export function useAIGeneration(profile, selectedJob) {
  const [coverLetter,  setCoverLetter]  = useState("");
  const [loadingCover, setLoadingCover] = useState(false);
  const [autofill,     setAutofill]     = useState("");
  const [loadingFill,  setLoadingFill]  = useState(false);

  // ── Cover Letter ──────────────────────────
  const generateCoverLetter = async () => {
    if (!selectedJob) return;
    setLoadingCover(true);
    setCoverLetter("");

    const prompt = `Write a compelling personalized cover letter.
Job: ${selectedJob.job_title} at ${selectedJob.employer_name}
Location: ${selectedJob.job_city || ""} ${selectedJob.job_country || ""}
Description: ${(selectedJob.job_description || "").slice(0, 400)}
Applicant Name: ${profile.name || "Alex"} | Title: ${profile.title || "Professional"} | Skills: ${profile.skills || "various"} | Summary: ${profile.summary || "experienced professional"} | Experience: ${profile.experience || "several years"}
Write 3 tight paragraphs under 280 words. Bold hook opener, 2 concrete wins, enthusiastic close. Never start with "I am writing to express".`;

    try {
      const text = await callGemini(prompt);
      setCoverLetter(text);
    } catch (e) {
      setCoverLetter("Failed to generate: " + e.message);
    }

    setLoadingCover(false);
  };

  const generateAutofill = async () => {
    if (!selectedJob) return;
    setLoadingFill(true);
    setAutofill("");

    const prompt = `Generate pre-filled application form answers.
Job: ${selectedJob.job_title} at ${selectedJob.employer_name}
Applicant: ${profile.name || "Alex"}, ${profile.title || "Professional"}, Skills: ${profile.skills || "relevant"}, Exp: ${profile.experience || "several years"}
Answer these 7 fields (2-3 sentences each). Format EXACTLY as **Field**\nAnswer:
**Why do you want to work here?**
**Greatest professional achievement?**
**Why leaving current role?**
**Expected salary?**
**Earliest start date?**
**LinkedIn headline (1 sentence)**
**Anything else we should know?**`;

    try {
      const text = await callGemini(prompt);
      setAutofill(text);
    } catch (e) {
      setAutofill("Failed to generate: " + e.message);
    }

    setLoadingFill(false);
  };
  
  const autofillSections = autofill
    ? autofill
        .split(/\*\*(.+?)\*\*/)
        .reduce((acc, part, i) => {
          if (i % 2 === 1) acc.push({ label: part, text: "" });
          else if (i > 0 && acc.length) acc[acc.length - 1].text = part.trim();
          return acc;
        }, [])
        .filter((x) => x.label)
    : [];

  return {
    coverLetter,
    generateCoverLetter,
    loadingCover,
    autofill,
    autofillSections,
    generateAutofill,
    loadingFill,
  };
}
