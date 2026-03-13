import React, { useState } from "react";
import { TABS } from "../constants";

export default function Header({ activeTab, onTabChange, user, onSignOut }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header style={{ background: "#0D0E14", borderBottom: "1px solid #1E1F2B", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #7C7FFF, #C77DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.3px" }}>ApplyAI</span>
          <span style={{ fontSize: 11, background: "#1E1F2B", color: "#7C7FFF", borderRadius: 4, padding: "2px 7px", fontWeight: 600, letterSpacing: "0.5px" }}>BETA</span>
        </div>

        {/* Center: tabs */}
        <nav style={{ display: "flex", gap: 4 }}>
          {TABS.map((label, index) => (
            <button
              key={label}
              onClick={() => onTabChange(index)}
              style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                cursor: "pointer", border: "none", fontFamily: "inherit",
                color:      activeTab === index ? "#fff"    : "#6B6D85",
                background: activeTab === index ? "#1E1F2B" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right: user avatar */}
        {user && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #1E1F2B", borderRadius: 20, padding: "4px 12px 4px 4px", cursor: "pointer" }}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7C7FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 600 }}>
                  {user.displayName?.[0] || "U"}
                </div>
              )}
              <span style={{ fontSize: 13, color: "#A8ABD0", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.displayName?.split(" ")[0] || "User"}
              </span>
              <span style={{ fontSize: 10, color: "#454659" }}>▾</span>
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#13141A", border: "1px solid #1E1F2B", borderRadius: 10, padding: 8, minWidth: 180, zIndex: 200 }}>
                <div style={{ padding: "8px 12px", borderBottom: "1px solid #1E1F2B", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{user.displayName}</div>
                  <div style={{ fontSize: 11, color: "#454659", marginTop: 2 }}>{user.email}</div>
                </div>
                <button
                  onClick={() => { setShowMenu(false); onSignOut(); }}
                  style={{ width: "100%", background: "none", border: "none", padding: "8px 12px", color: "#FF7555", fontSize: 13, cursor: "pointer", textAlign: "left", borderRadius: 6, fontFamily: "inherit" }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
