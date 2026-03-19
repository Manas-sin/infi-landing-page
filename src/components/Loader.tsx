"use client";

import { useEffect, useState, useRef } from "react";
import { animate } from "animejs";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"show" | "zoom" | "done">("show");
  const phaseRef = useRef(phase);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      const dotWrapper = document.querySelector(".loader-dot-wrapper") as HTMLElement;
      const root = document.querySelector(".loader-root") as HTMLElement;
      if (!dotWrapper || !root) return;

      dotWrapper.style.opacity = "1";

      const dotRect = dotWrapper.getBoundingClientRect();
      const restY = dotRect.top;
      const startY = restY - 400;

      dotWrapper.style.top = `${startY}px`;
      dotWrapper.style.transform = "translateY(0)";

      const dropTimer = setTimeout(() => {
        // Natural ball bouncing physics
        let pos = startY;
        let vel = 0;
        const g = 0.0018;
        const bounce = 0.7;
        const ground = restY;
        let bouncing = true;

        const update = () => {
          // Apply gravity
          vel += g * 16.67;
          pos += vel;

          // Bounce when hitting ground
          if (pos >= ground) {
            pos = ground;
            vel = -vel * bounce;

            // Stop when energy is low
            if (Math.abs(vel) < 2) {
              bouncing = false;
              vel = 0;
            }
          }

          // Apply position
          const offset = pos - startY;
          dotWrapper.style.transform = `translateY(${offset}px)`;

          // Color based on velocity/height
          const speed = Math.abs(vel);
          let color = "#00e5ff";
          let glow = "0 0 30px #00e5ffcc, 0 0 60px #00e5ff88";

          if (speed > 8) {
            color = "#00e5ff"; // Falling fast - cyan
          } else if (speed > 4) {
            color = "#00bfa5"; // Bouncing - teal
          } else {
            color = "#ffb300"; // Slow - amber
          }

          if (color === "#00bfa5") {
            glow = "0 0 25px #00bfa5aa, 0 0 50px #00bfa566";
          } else if (color === "#ffb300") {
            glow = "0 0 20px #ffb30099, 0 0 40px #ffb30055";
          }

          dotWrapper.style.background = `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${color} 50%, rgba(0,0,0,0) 100%)`;
          dotWrapper.style.boxShadow = glow;

          if (bouncing) {
            requestAnimationFrame(update);
          }
        };

        // Start falling
        vel = 0.5;
        requestAnimationFrame(update);
      }, 1700);

      animate(".loader-welcome", {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 600,
        easing: "easeOutCubic",
      });

      animate(".loader-brand-i", {
        opacity: [0, 1],
        duration: 400,
        delay: 500,
        easing: "linear",
      });

      animate(".loader-brand-3", {
        opacity: [0, 1],
        duration: 400,
        delay: 900,
        easing: "linear",
      });

      animate(".loader-brand-w", {
        opacity: [0, 1],
        duration: 400,
        delay: 1300,
        easing: "linear",
      });

      const zoomTimer = setTimeout(() => {
        setPhase("zoom");

        animate(dotWrapper, {
          scale: [1, 80],
          duration: 900,
          easing: "easeInQuart",
        });

        const bgLayers = root.querySelectorAll(
          ".loader-aurora-layer, .loader-orbs, .loader-grid, .loader-rays, .loader-bloom, .loader-grain, .loader-vignette"
        );
        animate(bgLayers, { opacity: [1, 0], duration: 500, easing: "easeOut" });

        const letters = root.querySelectorAll(".loader-welcome, .loader-brand-i, .loader-brand-3, .loader-brand-w");
        animate(letters, { opacity: [1, 0], duration: 250, easing: "linear" });
      }, 4500);

      const doneTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 5500);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(dropTimer);
        clearTimeout(zoomTimer);
        clearTimeout(doneTimer);
      };
    }, 100);

    return () => clearTimeout(initTimer);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="loader-root">
      <div className="loader-aurora-layer">
        <div className="loader-aurora-blob loader-aurora-blob-1" />
        <div className="loader-aurora-blob loader-aurora-blob-2" />
        <div className="loader-aurora-blob loader-aurora-blob-3" />
        <div className="loader-aurora-blob loader-aurora-blob-4" />
        <div className="loader-aurora-blob loader-aurora-blob-5" />
      </div>

      <div className="loader-orbs">
        <div className="loader-orb loader-orb-1" />
        <div className="loader-orb loader-orb-2" />
        <div className="loader-orb loader-orb-3" />
        <div className="loader-orb loader-orb-4" />
        <div className="loader-orb loader-orb-5" />
      </div>

      <div className="loader-grid" />
      <div className="loader-rays" />
      <div className="loader-bloom" />
      <div className="loader-grain" />
      <div className="loader-vignette" />

      <div className="loader-content">
        <p className="loader-welcome">Welcome to</p>
        <div className="loader-brand">
          <span className="loader-brand-i">
            ı
            <span className="loader-dot-wrapper" ref={dotRef}>
              <span className="loader-dot-core" />
            </span>
          </span>
          <span className="loader-brand-3">3</span>
          <span className="loader-brand-w">W</span>
        </div>
      </div>
    </div>
  );
}
