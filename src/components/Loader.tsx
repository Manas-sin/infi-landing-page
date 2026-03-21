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

      // Setup Spotlight Ticker
      const updateLight = () => {
        const rect = dotWrapper.getBoundingClientRect();
        root.style.setProperty("--dot-x", `${rect.left + rect.width / 2}px`);
        root.style.setProperty("--dot-y", `${rect.top + rect.height / 2}px`);
      };
      gsap.ticker.add(updateLight);

      // ===== FIND THE "i" LETTER POSITION =====
      // Get the position of the "i" letter - this tells us where to land the dot
      const brandI = document.querySelector(".loader-brand-i") as HTMLElement;
      const brandRect = brandI?.getBoundingClientRect();

      // We now rely on pure CSS (left and top percentage in globals.css) for alignment
      // so the dot remains perfectly centered scaled on the "i" even on resize.

      // ===== CONTROL SETTINGS =====
      // The dot's resting place directly on the 'i' will be conceptually `y: 0`. 
      // We start it high up off-screen using a viewport height percentage.
      const landingY = "0px";
      const startY = "-400px"; // Drop from 400px above
      
      // Set initial position - high above the "i"
      gsap.set(dotWrapper, { x: "-50%", y: startY });

      // ===== START BOUNCE ANIMATION =====
      // Wait 900ms after page load before dropping the dot
      const dropTimer = setTimeout(() => {
        const bgLayers = root.querySelectorAll(
          ".loader-aurora-layer, .loader-orbs, .loader-grid, .loader-rays, .loader-bloom, .loader-grain, .loader-vignette"
        );
        const letters = root.querySelectorAll(".loader-welcome, .loader-brand-i, .loader-brand-3, .loader-brand-w");
        
        // Create GSAP timeline - this sequences all bounce animations together
        const tl = gsap.timeline({
          onComplete: () => {
             // The timeline is entirely finished (including the teal flash). Hand off to PageWrapper landing page instantly.
             setPhase("done");
             onComplete();
          }
        });

        // ===== DROP & BOUNCE PHYSICS =====
        // Bounce height mapping - how high the dot bounces (in responsive vw)
        const bounce1 = "-10vw";
        const bounce2 = "-4vw";
        const bounce3 = "-2vw";

        // STEP 1: DROP - Fast, accelerating fall (gravity)
        tl.fromTo(dotWrapper,
          { y: startY, scaleX: 1, scaleY: 1 },
          {
            y: landingY,   
            duration: 0.45,
            ease: "power3.in", // Gravity acceleration
            scaleY: 1.25, // Stretch vertically while falling
            scaleX: 0.8,  // Condense horizontally
            transformOrigin: "bottom center", // Crucial: Pin to the floor for flat impact
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

        // SQUASH ON IMPACT 1
        .to(dotWrapper, {
          scaleY: 0.4,
          scaleX: 1.6,
          duration: 0.08,
          ease: "power2.out"
        })

        // STEP 2: FIRST BOUNCE UP
        .to(dotWrapper, {
          y: bounce1,
          scaleY: 1.1,
          scaleX: 0.9,
          duration: 0.3,
          ease: "power2.out" // Decelerate to peak
        })

        // STEP 3: FIRST BOUNCE DOWN
        .to(dotWrapper, {
          y: landingY,
          scaleY: 1.15,
          scaleX: 0.85,
          duration: 0.3,
          ease: "power2.in" // Accelerate to floor
        })

        // SQUASH ON IMPACT 2
        .to(dotWrapper, {
          scaleY: 0.6,
          scaleX: 1.4,
          duration: 0.06,
          ease: "power2.out"
        })

        // STEP 4: SECOND BOUNCE UP
        .to(dotWrapper, {
          y: bounce2, 
          scaleY: 1.05,
          scaleX: 0.95,
          duration: 0.2,
          ease: "power2.out"
        })

        // STEP 5: SECOND BOUNCE DOWN
        .to(dotWrapper, {
          y: landingY,
          scaleY: 1.05,
          scaleX: 0.95,
          duration: 0.2,
          ease: "power2.in"
        })

        // SQUASH ON IMPACT 3
        .to(dotWrapper, {
          scaleY: 0.85,
          scaleX: 1.15,
          duration: 0.05,
          ease: "power2.out"
        })

        // STEP 6: THIRD BOUNCE UP (Higher trajectory before the massive drop)
        .to(dotWrapper, {
          y: bounce3, 
          scaleX: 1,
          scaleY: 1,
          duration: 0.15,
          ease: "power2.out"
        }, "expandLight")

        // STEP 7: THE FINAL IMPACT (Squashes heavily)
        .to(dotWrapper, {
          y: landingY,
          scaleY: 0.6,
          scaleX: 1.4,
          duration: 0.12,
          ease: "power2.in"
        }, "expandLight+=0.15")
        
        // ANTICIPATION POP: Snap back to perfect roundness right before bursting!
        .to(dotWrapper, {
          scaleY: 1,
          scaleX: 1,
          background: "#00bfa5", // Start turning teal instantly
          boxShadow: "none",
          duration: 0.1,
          ease: "back.out(3)" // Dramatic cartoon pop
        }, "expandLight+=0.27")

        // Fade out inner cyan core precisely as it pops
        .to(".loader-dot-core", {
          opacity: 0,
          duration: 0.1
        }, "expandLight+=0.27")

        // KINETIC CAMERA DIVE (Perfect Circle Explosion)
        .to(dotWrapper, {
          scale: 40, // Massive enough to cover all corners
          duration: 0.5,
          ease: "power3.in" // Accelerating dive through the dot into the screen!
        }, "expandLight+=0.37")

        // Sync the mask explosion flawlessly to the dot's camera dive
        .to(root, {
          "--light-radius": "2500px",
          duration: 0.5,
          ease: "power3.in"
        }, "expandLight+=0.37")

        // Prepare and Flash the color overlay at the climax of the dive to guarantee flawless coverage
        .set(".loader-color-overlay", {
          display: "block",
          background: "#00bfa5",
          opacity: 0,
          transition: "none"
        }, "expandLight+=0.37")
        .to(".loader-color-overlay", {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut"
        }, "expandLight+=0.7") 

        // Clean out legacy artifacts safely inside the dark dive sequence
        .to(bgLayers, { opacity: 0, duration: 0.3, ease: "power2.in" }, "expandLight+=0.5")
        .to(letters, { opacity: 0, duration: 0.2, ease: "none" }, "expandLight+=0.5");
      }, 900);

      // ===== LETTER REVEAL ANIMATIONS =====
      // The letters are immediately made opaque so the traveling spotlight dictates their visibility
      gsap.to(".loader-welcome, .loader-brand-i, .loader-brand-3, .loader-brand-w", {
        opacity: 1,
        y: 0,
        duration: 0.2, // Fast reveal before drop starts
      });

      return () => {
        clearTimeout(initTimer);
        clearTimeout(dropTimer);
        gsap.ticker.remove(updateLight);
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
