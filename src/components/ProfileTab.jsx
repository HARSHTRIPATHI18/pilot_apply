import React, { useState } from "react";

const TEXT_FIELDS = [
  { label: "Full Name",    field: "name",     placeholder: "Full Name"              },
  { label: "Target Title", field: "title",    placeholder: "Software Engineer"        },
  { label: "Email",        field: "email",    placeholder: "harsh@example.com"        },
  { label: "Phone",        field: "phone",    placeholder: "+91 -xxxxxxxxxx"          },
  { label: "Location",     field: "location", placeholder: "Bengaluru, India"      },
  { label: "LinkedIn URL", field: "linkedin", placeholder: "linkedin.com/in/harsh"    },
];

const TEXTAREA_FIELDS = [
  { label: "Professional Summary", field: "summary",    placeholder: "e.g. 4 years of backend experience in Node.js, AWS, and distributed systems...", rows: 3 },
  { label: "Key Skills",           field: "skills",     placeholder: "e.g. Node.js, Python, AWS, Docker, Kubernetes, PostgreSQL, Redis...",            rows: 2 },
  { label: "Work Experience",      field: "experience", placeholder: "Company · Role · Years — key achievements and impact...",                        rows: 4 },
  { label: "Education",            field: "education",  placeholder: "Degree, School, Year...",                                                        rows: 2 },
];

const BADGE_COLORS = [
  "#7C7FFF", "#C77DFF", "#FF7555", "#0CAA41",
  "#FF4154", "#00ADB5", "#FACC15", "#FF6B00",
];

export default function ProfileTab({
  profiles,
  activeProfileId,
  onProfileChange,
  onSwitchProfile,
  onAddProfile,
  onDeleteProfile,
  onRenameProfile,
}) {
  const [saved,       setSaved]       = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [newName,     setNewName]     = useState("");
  const [addingNew,   setAddingNew]   = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const activeIndex   = profiles.findIndex((p) => p.id === activeProfileId);
  const badgeColor    = BADGE_COLORS[activeIndex % BADGE_COLORS.length];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRenameSubmit = (id) => {
    if (newName.trim()) onRenameProfile(id, newName.trim());
    setEditingName(null);
    setNewName("");
  };

  const handleAddSubmit = () => {
    if (newRoleName.trim()) {
      onAddProfile(newRoleName.trim());
      setNewRoleName("");
      setAddingNew(false);
    }
  };

  return (
    <div className="fade-up">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#fff" }}>
        Profiles
      </h2>
      <p style={{ color: "#6B6D85", fontSize: 13, marginBottom: 20 }}>
        Create one profile per role you're targeting. The active profile powers job matching, cover letters, and autofill.
      </p>

      {/* ── Profile switcher ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
        {profiles.map((p, idx) => {
          const isActive = p.id === activeProfileId;
          const color    = BADGE_COLORS[idx % BADGE_COLORS.length];
          return (
            <div key={p.id}>
              {editingName === p.id ? (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")  handleRenameSubmit(p.id);
                      if (e.key === "Escape") { setEditingName(null); setNewName(""); }
                    }}
                    style={{ background: "#1E1F2B", border: `1.5px solid ${color}`, borderRadius: 7, padding: "5px 10px", color: "#fff", fontSize: 13, fontFamily: "inherit", outline: "none", width: 140 }}
                  />
                  <button onClick={() => handleRenameSubmit(p.id)} style={{ background: color, border: "none", borderRadius: 5, padding: "5px 10px", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>✓</button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Main tab */}
                  <button
                    onClick={() => onSwitchProfile(p.id)}
                    className="hover-btn"
                    style={{
                      background:   isActive ? color + "22" : "#13141A",
                      border:       `1.5px solid ${isActive ? color : "#1E1F2B"}`,
                      borderRight:  "none",
                      borderRadius: "8px 0 0 8px",
                      padding:      "7px 14px",
                      color:        isActive ? "#fff" : "#6B6D85",
                      fontSize:     13,
                      fontWeight:   isActive ? 600 : 400,
                      cursor:       "pointer",
                      fontFamily:   "inherit",
                      display:      "flex",
                      alignItems:   "center",
                      gap:          7,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? color : "#454659", display: "inline-block" }} />
                    {p.name}
                  </button>
                  {/* Rename + delete */}
                  <div style={{ display: "flex", border: `1.5px solid ${isActive ? color : "#1E1F2B"}`, borderLeft: "none", borderRadius: "0 8px 8px 0", overflow: "hidden" }}>
                    <button
                      onClick={() => { setEditingName(p.id); setNewName(p.name); }}
                      title="Rename"
                      style={{ background: isActive ? color + "11" : "#0F1018", border: "none", borderRight: `1px solid ${isActive ? color + "44" : "#1E1F2B"}`, padding: "7px 9px", color: "#6B6D85", fontSize: 11, cursor: "pointer" }}
                    >✏</button>
                    {profiles.length > 1 && (
                      <button
                        onClick={() => onDeleteProfile(p.id)}
                        title="Delete"
                        style={{ background: isActive ? color + "11" : "#0F1018", border: "none", padding: "7px 9px", color: "#6B6D85", fontSize: 11, cursor: "pointer" }}
                      >✕</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add new */}
        {addingNew ? (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              autoFocus
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")  handleAddSubmit();
                if (e.key === "Escape") { setAddingNew(false); setNewRoleName(""); }
              }}
              placeholder="e.g. Cloud Engineer"
              style={{ background: "#13141A", border: "1.5px solid #7C7FFF", borderRadius: 7, padding: "6px 12px", color: "#fff", fontSize: 13, fontFamily: "inherit", outline: "none", width: 170 }}
            />
            <button onClick={handleAddSubmit} style={{ background: "#7C7FFF", border: "none", borderRadius: 6, padding: "6px 12px", color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Add</button>
            <button onClick={() => { setAddingNew(false); setNewRoleName(""); }} style={{ background: "#1E1F2B", border: "none", borderRadius: 6, padding: "6px 12px", color: "#6B6D85", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setAddingNew(true)}
            className="hover-btn"
            style={{ background: "none", border: "1.5px dashed #2A2B35", borderRadius: 8, padding: "7px 14px", color: "#454659", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
          >
            + New Profile
          </button>
        )}
      </div>

      {/* ── Active profile indicator ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "10px 14px", background: badgeColor + "11", border: `1px solid ${badgeColor}33`, borderRadius: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: badgeColor, display: "inline-block" }} />
        <span style={{ fontSize: 13, color: badgeColor, fontWeight: 600 }}>Editing: {activeProfile?.name}</span>
        <span style={{ fontSize: 12, color: "#454659", marginLeft: 4 }}>— fields below belong to this profile only</span>
      </div>

      {/* ── Form ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {TEXT_FIELDS.map(({ label, field, placeholder }) => (
          <div key={field}>
            <label className="field-label">{label}</label>
            <input
              className="input-field input-focus"
              value={activeProfile?.[field] || ""}
              placeholder={placeholder}
              onChange={(e) => onProfileChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>

      {TEXTAREA_FIELDS.map(({ label, field, placeholder, rows }) => (
        <div key={field} style={{ marginBottom: 14 }}>
          <label className="field-label">{label}</label>
          <textarea
            className="input-field input-focus"
            value={activeProfile?.[field] || ""}
            placeholder={placeholder}
            rows={rows}
            onChange={(e) => onProfileChange(field, e.target.value)}
          />
        </div>
      ))}

      <button className="btn-primary hover-btn" onClick={handleSave}>
        {saved ? "✓ Saved!" : "Save Profile"}
      </button>
    </div>
  );
}
