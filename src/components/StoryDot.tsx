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
  const dotColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#00e5ff", "#b388ff", "#00bfa5", "#ff4081", "#2979ff"]
  );

  // An intensely glowing shadow for the dot itself
  const coreShadow = useMotionTemplate`0 0 30px 10px ${dotColor}80, 0 0 60px 20px ${dotColor}40`;

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
  const yPath = buildPath(-5, 95); 

  // Smooth elegant curving across the page. Lands near the center/left of the footer INFI text.
  const xPath = [
    50, 75, 25, 80, 20, 65, 35, 75, 25, 60, 30, 80, 50
  ]; 

  const progressSteps = Array.from({ length: 13 }, (_, i) => i / 12);
  const rawYPos = useTransform(scrollYProgress, progressSteps, yPath.map(y => `${y}vh`));
  const rawXPos = useTransform(scrollYProgress, progressSteps, xPath.map(x => `${x}vw`));

  // --------------------------------------------------------
  // Apply a gentle Physics Spring so it follows the scroll 
  // with a buttery smooth lag, like a floating fairy
  // --------------------------------------------------------
  const stiffness = 80;
  
  const dotY = useSpring(rawYPos, { stiffness, damping: 25, mass: 1 });
  const dotX = useSpring(rawXPos, { stiffness, damping: 25, mass: 1 });

  // Scale the physical dot
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 0.95, 1], [0.8, 1, 0.9, 1.5]);
  
  // At the footer (1.0), the massive ambient light expands massively to light up "INFI"
  const auraScale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 5]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [0.3, 0.3, 0.6]);

  // Fade out the physical dot slightly at the end if desired, or keep it bright
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 1]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-visible">
      
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
          style={{ backgroundColor: dotColor, width: "300px", height: "300px" }}
          className="rounded-full blur-[100px] mix-blend-screen" 
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
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          style={{ backgroundColor: dotColor, width: "24px", height: "24px", boxShadow: coreShadow }}
          className="rounded-full flex items-center justify-center mix-blend-screen"
        >
          {/* Intense breathing white-hot core */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[50%] h-[50%] bg-white rounded-full blur-[1px] relative z-50" 
          />
        </motion.div>
      </motion.div>

    </div>
  );
}
