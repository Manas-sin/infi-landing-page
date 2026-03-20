"use client";

import { useState, useCallback } from "react";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Demo from "./Demo";
import FAQ from "./FAQ";
import Footer from "./Footer";

export default function PageWrapper() {
  const [loading, setLoading] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => setPageVisible(true), 100);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleComplete} />}

      {/* Color screen overlay */}
      {!loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 197,
            background: "#00bfa5",
            opacity: pageVisible ? 0 : 1,
            transition: "opacity 0.8s ease 0s",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Page sections — appear one by one */}
      <div
        style={{
          opacity: pageVisible ? 1 : 0,
          transition: pageVisible ? "opacity 0.4s ease" : "none",
        }}
      >
        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
          }}
        >
          <Navbar />
        </div>

        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease 0.5s, transform 0.45s ease 0.5s",
          }}
        >
          <Hero isVisible={pageVisible} />
        </div>

        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease 1.0s, transform 0.45s ease 1.0s",
          }}
        >
          <Features />
        </div>

        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease 1.5s, transform 0.45s ease 1.5s",
          }}
        >
          <Demo />
        </div>

        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease 2.0s, transform 0.45s ease 2.0s",
          }}
        >
          <FAQ />
        </div>

        <div
          style={{
            opacity: pageVisible ? 1 : 0,
            transform: pageVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease 2.5s, transform 0.45s ease 2.5s",
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
}
