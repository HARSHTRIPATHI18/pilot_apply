# ApplyAI — Job Application Assistant

## Setup

```bash
npx create-react-app job-assistant
cd job-assistant
```

Copy all files from this folder into the project, then:

```bash
npm start
```

``` check for place holder values for API keys in respective files : 
src/hooks/useJobSearch.js
src/firebase.js
src/hooks/useAIGeneration.js ```
---

## Folder Structure

```
src/
│
├── constants/
│   └── index.js          ← All platforms, date filters, tab names, default profile
│                           Edit here to add/remove job portals or time filters
│
├── utils/
│   └── helpers.js        ← Pure utility functions (timeAgo, matchScore, matchColor, clipboard)
│                           No React — easy to unit test
│
├── hooks/
│   ├── useJobSearch.js   ← JSearch (RapidAPI) fetch logic + state
│   └── useAIGeneration.js← Anthropic API calls for cover letter + autofill
│                           Change the AI prompt here if you want different output style
│
├── styles/
│   └── global.css        ← All CSS in one place: colors, spacing, animations, utility classes
│                           Edit here to retheme the whole app
│
├── components/
│   ├── Header.jsx          ← Top nav bar with logo + tab buttons
│   ├── ProfileTab.jsx      ← Profile form (tab 0)
│   ├── FindJobsTab.jsx     ← Search + platform/date filters + results (tab 1)
│   ├── JobCard.jsx         ← Individual job result card (used inside FindJobsTab)
│   ├── CoverLetterTab.jsx  ← Cover letter generator (tab 2)
│   └── ApplicationKitTab.jsx← Autofill form answers (tab 3)
│
└── App.jsx               ← Root: owns shared state (tab, profile, selectedJob)
                            Thin orchestration only — no business logic here
```

---

## Common Changes

| What you want to change            | File to edit                          |
|------------------------------------|---------------------------------------|
| Add a new job portal               | `constants/index.js` → PLATFORMS      |
| Add a new time filter              | `constants/index.js` → DATE_FILTERS   |
| Change cover letter prompt style   | `hooks/useAIGeneration.js`            |
| Add a new autofill question        | `hooks/useAIGeneration.js`            |
| Change colors / fonts / spacing    | `styles/global.css`                   |
| Add a new tab                      | `constants/index.js` + `App.jsx`      |
| Change match score algorithm       | `utils/helpers.js` → matchScore()     |

---

## API Keys

- **JSearch (RapidAPI):** Enter in the Find Jobs tab UI. Get it at https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
- **Anthropic API:** The cover letter and autofill features call `api.anthropic.com` directly. This works out of the box in the Claude artifact environment. For local use, you'll need to proxy the request through a small backend to keep your key safe.
