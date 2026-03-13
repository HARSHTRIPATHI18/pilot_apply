import React from "react";
import { TABS } from "../constants";

export default function Header({ activeTab, onTabChange }) {
  return (
    <header
      style={{
        background:    "#0D0E14",
        borderBottom:  "1px solid #1E1F2B",
        padding:       "0 28px",
        position:      "sticky",
        top:           0,
        zIndex:        100,
      }}
    >
      <div
        style={{
          maxWidth:       980,
          margin:         "0 auto",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          height:         62,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width:           32,
              height:          32,
              borderRadius:    8,
              background:      "linear-gradient(135deg, #7C7FFF, #C77DFF)",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              fontSize:        16,
            }}
          >
            🧭
          </div>
          <span
            style={{
              fontFamily:    "'Syne', sans-serif",
              fontWeight:    700,
              fontSize:      18,
              color:         "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            Harsh-AI
          </span>
          <span
            style={{
              fontSize:      11,
              background:    "#1E1F2B",
              color:         "#7C7FFF",
              borderRadius:  4,
              padding:       "2px 7px",
              fontWeight:    600,
              letterSpacing: "0.5px",
            }}
          >
            BETA
          </span>
        </div>

        {/* Tab buttons */}
        <nav style={{ display: "flex", gap: 4 }}>
          {TABS.map((label, index) => (
            <button
              key={label}
              onClick={() => onTabChange(index)}
              className="hover-btn"
              style={{
                padding:    "6px 14px",
                borderRadius: 6,
                fontSize:   13,
                fontWeight: 500,
                border:     "none",
                color:      activeTab === index ? "#fff"      : "#6B6D85",
                background: activeTab === index ? "#1E1F2B"   : "none",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
