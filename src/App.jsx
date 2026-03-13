import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut }  from "firebase/auth";
import { auth }                          from "./firebase";

import "./styles/global.css";

import { useProfiles }   from "./hooks/useProfiles";
import { useAIGeneration } from "./hooks/useAIGeneration";

import LoginScreen       from "./components/LoginScreen";
import Header            from "./components/Header";
import ProfileTab        from "./components/ProfileTab";
import FindJobsTab       from "./components/FindJobsTab";
import CoverLetterTab    from "./components/CoverLetterTab";
import ApplicationKitTab from "./components/ApplicationKitTab";

export default function App() {
  const [user,        setUser]        = useState(undefined); 
  const [tab,         setTab]         = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  const {
    profiles,
    activeProfileId,
    loading: profilesLoading,
    handleProfileChange,
    handleSwitchProfile,
    handleAddProfile,
    handleDeleteProfile,
    handleRenameProfile,
  } = useProfiles(user);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || {};

  // ── AI generation ──
  const {
    coverLetter,
    generateCoverLetter,
    loadingCover,
    autofillSections,
    generateAutofill,
    loadingFill,
  } = useAIGeneration(activeProfile, selectedJob);

  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0C10", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 28, animation: "spin .8s linear infinite", display: "inline-block" }}>⟳</span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  if (profilesLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0C10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "sans-serif" }}>
        <span style={{ fontSize: 28, animation: "spin .8s linear infinite", display: "inline-block", color: "#7C7FFF" }}>⟳</span>
        <span style={{ color: "#454659", fontSize: 13 }}>Loading your profiles…</span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B0C10" }}>
      <Header activeTab={tab} onTabChange={setTab} user={user} onSignOut={() => signOut(auth)} />

      {/* Active profile pill — shown on all tabs except Profile */}
      {tab !== 0 && (
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "12px 28px 0" }}>
          <div
            onClick={() => setTab(0)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#13141A", border: "1px solid #1E1F2B", borderRadius: 20, padding: "5px 14px", cursor: "pointer" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7C7FFF", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#A8ABD0" }}>Active profile:</span>
            <span style={{ fontSize: 12, color: "#7C7FFF", fontWeight: 600 }}>{activeProfile.name}</span>
            <span style={{ fontSize: 11, color: "#454659" }}>— click to switch</span>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "20px 28px 28px" }}>

        {tab === 0 && (
          <ProfileTab
            profiles={profiles}
            activeProfileId={activeProfileId}
            onProfileChange={handleProfileChange}
            onSwitchProfile={handleSwitchProfile}
            onAddProfile={handleAddProfile}
            onDeleteProfile={handleDeleteProfile}
            onRenameProfile={handleRenameProfile}
          />
        )}

        {tab === 1 && (
          <FindJobsTab
            profile={activeProfile}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            onGoToCoverLetter={() => setTab(2)}
            onGoToAutofill={() => setTab(3)}
          />
        )}

        {tab === 2 && (
          <CoverLetterTab
            selectedJob={selectedJob}
            coverLetter={coverLetter}
            loadingCover={loadingCover}
            onGenerate={generateCoverLetter}
            onChangeJob={() => { setSelectedJob(null); setTab(1); }}
          />
        )}

        {tab === 3 && (
          <ApplicationKitTab
            selectedJob={selectedJob}
            autofillSections={autofillSections}
            loadingFill={loadingFill}
            onGenerate={generateAutofill}
            onChangeJob={() => { setSelectedJob(null); setTab(1); }}
          />
        )}

      </main>
    </div>
  );
}
