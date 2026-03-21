"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

export default function StoryDot() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Soft, beautiful Story Colors transitioning organically
  // Color sequences map directly to the narrative arc (Cyan -> Violet -> Viridian -> Pink -> Blue)
  const color1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["rgba(0,229,255,1)", "rgba(179,136,255,1)", "rgba(0,191,165,1)", "rgba(255,64,129,1)", "rgba(41,121,255,1)"]);
  const color1alt = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["rgba(0,191,165,1)", "rgba(0,229,255,1)", "rgba(179,136,255,1)", "rgba(255,171,64,1)", "rgba(0,191,165,1)"]);
  const color04 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["rgba(0,229,255,0.4)", "rgba(179,136,255,0.4)", "rgba(0,191,165,0.4)", "rgba(255,64,129,0.4)", "rgba(41,121,255,0.4)"]);
  const color015 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["rgba(0,229,255,0.15)", "rgba(179,136,255,0.15)", "rgba(0,191,165,0.15)", "rgba(255,64,129,0.15)", "rgba(41,121,255,0.15)"]);
  const color006 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["rgba(0,229,255,0.06)", "rgba(179,136,255,0.06)", "rgba(0,191,165,0.06)", "rgba(255,64,129,0.06)", "rgba(41,121,255,0.06)"]);

  const haloBg = useMotionTemplate`radial-gradient(circle, ${color04}, ${color015}, transparent)`;
  const shellBorder = useMotionTemplate`1px solid ${color015}`;
  const shellShadow = useMotionTemplate`inset 0 0 12px ${color015}`;
  const coreBg = useMotionTemplate`radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), ${color1} 40%, ${color1alt} 70%, transparent 100%)`;
  const coreShadow = useMotionTemplate`0 0 20px ${color04}, 0 0 40px ${color015}`;

  // Create an elegant, sweeping S-curve path for the floating companion
  const pathLength = 12;
  const buildPath = (start: number, end: number) => {
    const arr = [];
    for (let i = 0; i <= pathLength; i++) {
      if (i === 0) arr.push(start);
      else if (i === pathLength) arr.push(end);
      else arr.push(start + ((end - start) * (i / pathLength)));
    }
    return arr;
  };

  // The dot floats all the way down to the footer
  // It now starts at 55vh to align beautifully perfectly next to the "companion." text
  const yPath = buildPath(55, 95); 

  // Smooth, subtle elegant curving across the entire page, left, center, and right.
  // Starting on the right (85vw) and sweeping freely back and forth
  const xPath = [
    85, 15, 80, 20, 75, 10, 65, 25, 70, 15, 85, 25, 50
  ];

  const progressSteps = Array.from({ length: 13 }, (_, i) => i / 12);
  const rawYPos = useTransform(scrollYProgress, progressSteps, yPath.map(y => `${y}vh`));
  const rawXPos = useTransform(scrollYProgress, progressSteps, xPath.map(x => `${x}vw`));

  // --------------------------------------------------------
  // Apply a gentle Physics Spring so it follows the scroll 
  // with an incredibly heavy, professional, "zero-gravity" lag
  // --------------------------------------------------------
  const stiffness = 30; // Very soft spring, takes its time
  
  const dotY = useSpring(rawYPos, { stiffness, damping: 20, mass: 1.5 });
  const dotX = useSpring(rawXPos, { stiffness, damping: 20, mass: 1.5 });

  // Scale the physical dot
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 0.95, 1], [0.8, 1, 0.9, 1.5]);
  
  // At the footer (1.0), the massive ambient light expands massively to light up "INFI"
  const auraScale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 5]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [0.3, 0.3, 0.6]);

  // Dot opacity remains 1 across the journey except for exit if needed
  const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 1]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }} // Waits exactly for "companion." text to slide into place!
      className="pointer-events-none fixed inset-0 z-[9999] overflow-visible"
    >
      
      {/* 
        The Massive Ambient Light Aura 
        This follows the dot and casts a huge glowing "flashlight" effect on the background.
        At the footer, it scales up 5x to fully illuminate the INFI text!
      */}
      <motion.div
        style={{
          position: "absolute", 
          top: dotY, 
          left: dotX, 
          scale: auraScale, 
          opacity: auraOpacity,
          x: "-50%", 
          y: "-50%",
          zIndex: -1
        }}
        className="flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: color04 as any, width: "300px", height: "300px", willChange: "transform" }}
          className="rounded-full blur-[60px] mix-blend-screen transform-gpu"
        />
      </motion.div>

      {/* The Single Brilliant Floating Dot */}
      <motion.div
        style={{ 
          position: "absolute", 
          top: dotY, 
          left: dotX, 
          scale: dotScale, 
          opacity: opacity, 
          x: "-50%", 
          y: "-50%" 
        }}
        className="flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0, 10, 0], x: [0, 4, -4, 3, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          style={{ width: "72px", height: "72px" }}
          className="relative inline-flex flex-col items-center justify-center rounded-full pointer-events-auto"
        >
          {/* Exact Replica of spark-halo */}
          <motion.div 
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-[40%] rounded-full blur-[20px]" 
            style={{ background: haloBg }}
          />
          
          {/* Exact Replica of spark-shell (spark-full state) */}
          <motion.div 
            className="absolute inset-[8%] rounded-full backdrop-blur-[2px]"
            style={{ 
              background: color006, 
              border: shellBorder,
              boxShadow: shellShadow
            }}
          />
          
          {/* Exact Replica of spark-core (spark-full state) */}
          <motion.div 
            className="relative w-[55%] h-[55%] rounded-full z-10"
            style={{ 
              background: coreBg,
              boxShadow: coreShadow
            }}
          />
          
          {/* Exact Replica of spark-highlight WITH 3D Parallax Reflection Tracking */}
          <motion.div 
            animate={{ 
              x: [0, 15, -10, 8, 0], // The highlight drifts across the surface to simulate 3D rotation
              y: [0, -5, 8, -4, 0]  
            }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-[18%] left-[22%] w-[20%] h-[20%] rounded-full bg-white/70 blur-[2px] z-20"
          />
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
