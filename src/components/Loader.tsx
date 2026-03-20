"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"show" | "zoom" | "done">("show");
  const phaseRef = useRef(phase);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    // ===== INITIAL SETUP =====
    const initTimer = setTimeout(() => {
      const dotWrapper = document.querySelector(".loader-dot-wrapper") as HTMLElement;
      const root = document.querySelector(".loader-root") as HTMLElement;
      if (!dotWrapper || !root) return;

      // Make the dot visible (starts hidden via CSS)
      dotWrapper.style.opacity = "1";

      // ===== FIND THE "i" LETTER POSITION =====
      // Get the position of the "i" letter - this tells us where to land the dot
      const brandI = document.querySelector(".loader-brand-i") as HTMLElement;
      const brandRect = brandI?.getBoundingClientRect();

      // Check if user is on mobile or desktop
      const isMobile = window.innerWidth < 768;
      // Shift dot left slightly so it aligns with the center of the "i"
      const centerOffset = isMobile ? -6 : -14;

      // ===== SET INITIAL DOT POSITION =====
      // Position dot horizontally - GSAP will handle vertical position
      dotWrapper.style.left = `calc(50% + ${centerOffset}px)`;
      dotWrapper.style.top = "auto"; // Let GSAP handle Y position

      // ===== CONTROL SETTINGS =====
      // 1. GAP - Distance between dot and "i" when landed (negative = above "i")
      // -35 = dot lands 35px above the "i"
      const gapOffset = -35;

      // 2. BOUNCE HEIGHT - Height of first bounce (set below in bounceHeight variable)
      // 30 = first bounce goes 30px up from landing position

      // Calculate landing position (dot lands at "i" + gap)
      const landingY = brandRect ? brandRect.top + window.scrollY + gapOffset : 100;
      // Start 400px above the landing position
      const startY = landingY - 400;

      // Set initial position - 400px above the "i"
      gsap.set(dotWrapper, { x: "-10%", y: startY });

      // ===== START BOUNCE ANIMATION =====
      // Wait 900ms after page load before dropping the dot
      const dropTimer = setTimeout(() => {
        // Create GSAP timeline - this sequences all bounce animations together
        const tl = gsap.timeline({
          onComplete: () => {
            // ===== AFTER 2 BOUNCES: START ZOOM TRANSITION =====
            setPhase("zoom");

            // Show color overlay behind the expanding dot (cyan/teal glow)
            // Prepare dot to serve as the teal screen-fill
            dotWrapper.style.background = "#00bfa5"; // Solid Teal, no alpha transparency
            dotWrapper.style.boxShadow = "none";
            
            // Hide the inner cyan/white core so the teal wrapper is visible!
            const dotCore = dotWrapper.querySelector(".loader-dot-core") as HTMLElement;
            if (dotCore) {
              gsap.to(dotCore, { opacity: 0, duration: 0.2 });
            }
            
            const colorOverlay = root.querySelector(".loader-color-overlay") as HTMLElement;
            if (colorOverlay) {
              colorOverlay.style.display = "block"; 
              colorOverlay.style.background = "#00bfa5"; // Solid Teal overlay
              colorOverlay.style.opacity = "0";
              colorOverlay.style.transition = "none"; // GSAP takes full control
            }

            // Step 1: Dot gets big (half screen)
            gsap.to(dotWrapper, {
              scale: 25, // roughly half the screen height/width depending on device
              duration: 0.5,
              ease: "power2.inOut", 
              onComplete: () => {
                 // Step 2: Show the teal color on the whole screen
                 gsap.to(colorOverlay, { 
                   opacity: 1, 
                   duration: 0.3, // slightly longer for dramatic flash
                   onComplete: () => {
                     // The screen is perfectly Teal. Hand off to PageWrapper landing page
                     setPhase("done");
                     onComplete();
                   }
                 });
              }
            });

            // Fade out background layers (aurora blobs, etc.) to keep it clean
            const bgLayers = root.querySelectorAll(
              ".loader-aurora-layer, .loader-orbs, .loader-grid, .loader-rays, .loader-bloom, .loader-grain, .loader-vignette"
            );
            gsap.to(bgLayers, { opacity: 0, duration: 0.4, ease: "power2.out" });

            // Fade out the brand letters (Welcome to, i, 3, W)
            const letters = root.querySelectorAll(".loader-welcome, .loader-brand-i, .loader-brand-3, .loader-brand-w");
            gsap.to(letters, { opacity: 0, duration: 0.2, ease: "none" });
          }
        });

        // ===== DROP & BOUNCE PHYSICS =====
        // Bounce height - how high the dot bounces (in pixels)
        // 250 = bounces 250px above landing position
        const bounceHeight = 250;

        // STEP 1: DROP - Fall from top to the "i"
        // Duration 0.6s - faster drop
        tl.fromTo(dotWrapper,
          { y: startY }, // Start at 400px above "i"
          {
            y: landingY,   // End at the "i" position
            duration: 0.6,
            ease: "power2.in", // Accelerating fall (like real gravity)
            // While falling, change color based on animation progress:
            // 0-30%: cyan (fast falling), 30-60%: teal (first bounce), 60-100%: amber (slowing)
            onUpdate: function() {
              const progress = this.progress();
              const color = progress < 0.3 ? "#00e5ff" : progress < 0.6 ? "#00bfa5" : "#ffb300";
              const glow = progress < 0.3 ? "0 0 30px #00e5ffcc, 0 0 60px #00e5ff88"
                : progress < 0.6 ? "0 0 25px #00bfa5aa, 0 0 50px #00bfa566"
                : "0 0 20px #ffb30099, 0 0 40px #ffb30055";
              dotWrapper.style.background = `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${color} 50%, rgba(0,0,0,0) 100%)`;
              dotWrapper.style.boxShadow = glow;
            }
          }
        )

        // STEP 2: FIRST BOUNCE UP - bounce up from landing position
        // sine.out = smooth deceleration at the top of the bounce
        .to(dotWrapper, {
          y: landingY - bounceHeight, // 250px above landing
          duration: 0.6,
          ease: "sine.out"
        })

        // STEP 3: FIRST BOUNCE DOWN - return to landing position
        // sine.in = smooth acceleration downward
        .to(dotWrapper, {
          y: landingY,
          duration: 0.6,
          ease: "sine.in"
        })

        // STEP 4: SECOND BOUNCE UP - smaller bounce (60% of first)
        .to(dotWrapper, {
          y: landingY - (bounceHeight * 0.6), // 150px above landing
          duration: 0.4,
          ease: "sine.out"
        })

        // STEP 5: SECOND BOUNCE DOWN - settle back
        .to(dotWrapper, {
          y: landingY,
          duration: 0.4,
          ease: "sine.in"
        })

        // STEP 6: THIRD BOUNCE UP - tiny bounce (30% of first)
        .to(dotWrapper, {
          y: landingY - (bounceHeight * 0.3), // 75px above landing
          duration: 0.25,
          ease: "sine.out"
        })

        // STEP 7: FINAL SETTLE - stop at landing position
        .to(dotWrapper, {
          y: landingY,
          duration: 0.25,
          ease: "sine.in"
        });
      }, 900);

      // ===== LETTER REVEAL ANIMATIONS =====
      // These animate the brand letters appearing one by one

      // STEP 1: "Welcome to" - fades in and slides up
      // Duration 0.4s, ease:power3.out = smooth deceleration
      gsap.to(".loader-welcome", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      // STEP 2: "i" - appears after 0.3s delay
      // ease:none = instant start after delay (linear)
      gsap.to(".loader-brand-i", {
        opacity: 1,
        duration: 0.25,
        delay: 0.3,
        ease: "none",
      });

      // STEP 3: "3" - appears after 0.55s delay (staggered)
      gsap.to(".loader-brand-3", {
        opacity: 1,
        duration: 0.25,
        delay: 0.55,
        ease: "none",
      });

      gsap.to(".loader-brand-w", {
        opacity: 1,
        duration: 0.25,
        delay: 0.8,
        ease: "none",
      });

      return () => {
        clearTimeout(initTimer);
        clearTimeout(dropTimer);
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

      {/* Color overlay that shows during zoom */}
      <div className="loader-color-overlay" />

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
