const functions = require("firebase-functions");
const https = require("https");

const ADZUNA_APP_ID  = "your_app_id_here";
const ADZUNA_APP_KEY = "your_app_key_here"; 

const GEMINI_API_KEY = "your_api_key_here";
const GEMINI_MODEL = "gemini-1.5-pro"; 

exports.searchJobs = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }

  const { query, location, countryCode, daysOld } = req.query;

  const params = new URLSearchParams({
    app_id:           ADZUNA_APP_ID,
    app_key:          ADZUNA_APP_KEY,
    results_per_page: "20",
    what:             query || "",
    ...(location ? { where: location } : {}),
    ...(daysOld  ? { max_days_old: daysOld } : {}),
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${countryCode || "in"}/search/1?${params}`;

  https.get(url, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => { data += chunk; });
    apiRes.on("end", () => {
      res.set("Content-Type", "application/json");
      res.status(apiRes.statusCode).send(data);
    });
  }).on("error", (e) => {
    res.status(500).json({ error: e.message });
  });
});

// ── Gemini cover letter + autofill ──
exports.generateAI = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }

  const { prompt } = req.body;
  if (!prompt) { res.status(400).json({ error: "No prompt provided" }); return; }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

 try {
    const response = await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 1000 },
      }),
    });
    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
