import React, { useState } from "react";
import { signInWithPopup }  from "firebase/auth";
import { auth, provider }   from "../firebase";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      // App.jsx listener picks up the user automatically
    } catch (e) {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:       "100vh",
      background:      "#0B0C10",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontFamily:      "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{
        animation:    "fadeUp .4s ease forwards",
        textAlign:    "center",
        padding:      "48px 40px",
        background:   "#0D0E14",
        border:       "1px solid #1E1F2B",
        borderRadius: 20,
        maxWidth:     420,
        width:        "90%",
      }}>
        {/* Logo */}
        <div style={{
          width:          56,
          height:         56,
          borderRadius:   14,
          background:     "linear-gradient(135deg, #7C7FFF, #C77DFF)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       28,
          margin:         "0 auto 20px",
        }}>
          🧭
        </div>

        <h1 style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      28,
          fontWeight:    800,
          color:         "#fff",
          marginBottom:  8,
          letterSpacing: "-0.5px",
        }}>
          ApplyAI
        </h1>

        <p style={{ color: "#6B6D85", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          Your AI-powered job application assistant.<br />
          Sign in to save your profiles across all devices.
        </p>

        {/* Features list */}
        <div style={{ marginBottom: 32, textAlign: "left" }}>
          {[
            ["🔍", "Live job search across 10 platforms"],
            ["✍", "AI cover letters tailored to each role"],
            ["📋", "Auto-filled application form answers"],
            ["👤", "Multiple profiles for different roles"],
            ["☁",  "Everything saved to cloud automatically"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{icon}</span>
              <span style={{ fontSize: 13, color: "#A8ABD0" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Google sign-in button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width:        "100%",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            gap:          12,
            background:   loading ? "#1E1F2B" : "#fff",
            border:       "none",
            borderRadius: 10,
            padding:      "13px 20px",
            fontSize:     15,
            fontWeight:   600,
            color:        loading ? "#454659" : "#1a1a1a",
            cursor:       loading ? "not-allowed" : "pointer",
            fontFamily:   "inherit",
            transition:   "opacity .15s",
          }}
        >
          {loading ? (
            "Signing in…"
          ) : (
            <>
              {/* Google G icon */}
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {error && (
          <p style={{ color: "#FF9999", fontSize: 13, marginTop: 12 }}>{error}</p>
        )}

        <p style={{ color: "#2A2B35", fontSize: 11, marginTop: 20 }}>
          Your data is stored securely in Firebase and never shared.
        </p>
      </div>
    </div>
  );
}
