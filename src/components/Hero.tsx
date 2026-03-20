"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const fadeUpText = {
  hidden: { y: "130%" },
  visible: { 
    y: "0%", 
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const fadeUpContent = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const typingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 2.0, // Delay until after the main headline loads
    },
  },
};

const TypewriterText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, filter: "blur(4px)" },
            visible: { opacity: 1, filter: "blur(0px)" }
          }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero({ isVisible = true }: { isVisible?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effects
  // Note: The `isVisible` prop is used for initial animation.
  // The `useState` for `isVisible` was in the instruction but not used in the provided snippet,
  // and would conflict with the prop. Assuming it was a partial instruction or typo for another variable.

  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // High-Performance Interactive Mouse Logic
  useEffect(() => {
    // 1. Aurora background tracking
    const xTo1 = gsap.quickTo(".aurora-1", "x", { duration: 1.5, ease: "power3.out" });
    const yTo1 = gsap.quickTo(".aurora-1", "y", { duration: 1.5, ease: "power3.out" });
    
    const xTo2 = gsap.quickTo(".aurora-2", "x", { duration: 2.5, ease: "power3.out" });
    const yTo2 = gsap.quickTo(".aurora-2", "y", { duration: 2.5, ease: "power3.out" });

    // 2. Movable Objects Parallax Field

    const fl1X = gsap.quickTo(".float-1", "x", { duration: 3, ease: "power2.out" });
    const fl1Y = gsap.quickTo(".float-1", "y", { duration: 3, ease: "power2.out" });
    


    const fl3X = gsap.quickTo(".float-3", "x", { duration: 5, ease: "power2.out" });
    const fl3Y = gsap.quickTo(".float-3", "y", { duration: 5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate delta from center
      const moveX = e.clientX - window.innerWidth / 2;
      const moveY = e.clientY - window.innerHeight / 2;

      // Aurora moves toward mouse
      xTo1(moveX * 0.8);
      yTo1(moveY * 0.8);
      
      xTo2(moveX * 0.4);
      yTo2(moveY * 0.4);

      // Main Badge moves inversely for extreme depth

      // Deep Parallax Floating Objects
      fl1X(moveX * -0.05);
      fl1Y(moveY * -0.05);



      fl3X(moveX * -0.25);
      fl3Y(moveY * -0.25);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="download"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 lg:px-12 pt-[160px] lg:pt-[200px] overflow-hidden bg-bg-1"
    >
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#060610]" />
        
        {/* Core tracking blob - Bright Teal */}
        <div 
          className="aurora-1 absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.55] mix-blend-screen blur-[120px] will-change-transform"
          style={{ background: "radial-gradient(circle at center, #00e5ff 0%, transparent 60%)" }}
        />
        
        {/* Slower floating secondary blob - Deep Violet */}
        <div 
          className="aurora-2 absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35] mix-blend-screen blur-[140px] will-change-transform"
          style={{ background: "radial-gradient(circle at center, #b388ff 0%, transparent 60%)" }}
        />
        
        {/* Ambient static emerald corner glow */}
        <div 
          className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full opacity-20 mix-blend-screen blur-[130px] animate-pulse"
          style={{ background: "radial-gradient(circle at center, #00bfa5 0%, transparent 70%)" }}
        />

        {/* Dense Cinematic Noise Overlay - Essential for premium gradient rendering */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/noise.png')" }} />
      </div>

      {/* ---------------- DEEP PARALLAX MOVABLE OBJECTS ---------------- */}
      
      {/* Object 1: Hollow Dashed Torus (Top Left) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0, rotate: 0 }} 
        animate={{ opacity: 0.3, scale: 1, rotate: 180 }} 
        transition={{ delay: 1, duration: 2.5, ease: "easeOut" }}
        className="float-1 absolute top-[15%] left-[8%] w-48 h-48 md:w-64 md:h-64 rounded-full border-[1px] border-accent/40 z-10 pointer-events-none mix-blend-screen hidden lg:block"
        style={{ borderStyle: "dashed" }}
      />
      


      {/* Object 3: Massive Rotating Technical Grid Asterisk (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, rotate: 90 }} 
        animate={{ opacity: 0.15, rotate: 0 }} 
        transition={{ delay: 1.4, duration: 2, ease: "easeOut" }}
        className="float-3 absolute top-[15%] right-[5%] z-0 pointer-events-none hidden lg:block"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="#b388ff" strokeWidth="0.5">
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <circle cx="50" cy="50" r="35" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="15" />
          </svg>
        </motion.div>
      </motion.div>


      {/* ---------------- AWWWARDS ARCHITECTURAL UI ELEMENTS ---------------- */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 1, delay: 1 }}
        className="absolute top-8 left-6 md:left-12 text-white/80 font-mono text-[10px] md:text-xs z-10 flex gap-3 items-center pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-accent/80 animate-pulse border border-accent"></span>
        <span>LAT: 28.61, LNG: 77.20</span>
        <span className="opacity-40">|</span>
        <span>SYS_STATUS: OPTIMAL</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-8 right-6 md:right-12 text-white/70 font-mono text-xs z-10 hidden md:block pointer-events-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="0" x2="12" y2="24" strokeWidth="0.5" />
          <line x1="0" y1="12" x2="24" y2="12" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 left-6 md:left-12 z-10 hidden md:flex flex-col items-center gap-6 pointer-events-none"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-[10px] uppercase font-mono tracking-[4px] text-white/60" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Scroll to Explore
          </div>
          <div className="w-[1px] h-20 bg-linear-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>



      {/* ---------------- MAIN CONTENT (CLEAN UN-OVERLAPPED STACKING) ---------------- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-center h-full pointer-events-none" // pointer-events-none parent ensures text doesn't block mouse
      >
        <div className="flex flex-col w-full h-full justify-center pointer-events-auto">
          
          {/* Top Canvas: Left-Center-Right Staggered Awwwards Typography */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex flex-col w-full mb-16 lg:mb-24" // Spaced far away from buttons
          >
            {/* Left Aligned */}
            <div className="overflow-hidden pb-2 lg:pb-4 w-full flex justify-start">
              <motion.div 
                variants={fadeUpText} 
                className="text-white font-black text-[clamp(50px,9vw,160px)] leading-[0.8] tracking-tighter uppercase drop-shadow-2xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                PADHAI
              </motion.div>
            </div>
            
            {/* Center Aligned */}
            <div className="overflow-hidden pb-2 lg:pb-4 w-full flex justify-center">
              <motion.div 
                variants={fadeUpText} 
                className="text-transparent bg-clip-text bg-linear-to-r from-accent to-teal font-black text-[clamp(50px,9vw,160px)] leading-[0.8] tracking-tighter uppercase drop-shadow-2xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                KA NAYA
              </motion.div>
            </div>
            
            {/* Right Aligned */}
            <div className="overflow-hidden pb-2 lg:pb-6 w-full flex justify-end pr-8 lg:pr-[20%] -mt-6 lg:-mt-12">
              <motion.div 
                variants={fadeUpText} 
                className="italic text-white opacity-90 font-light text-[clamp(65px,11vw,170px)] leading-[0.8] tracking-tight lowercase drop-shadow-2xl"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                companion.
              </motion.div>
            </div>
          </motion.h1>

          {/* Bottom Canvas: Description & Elegant CTAs locked safely at the bottom */}
          <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-end gap-10 mt-auto">
            
            <motion.div 
              variants={typingContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex flex-col items-start max-w-[500px] pl-8 md:pl-16 mt-6 lg:mt-8 mb-4 lg:mb-0"
            >
              <div className="text-[clamp(16px,1.5vw,22px)] font-light text-text-2 leading-[1.6]">
                <TypewriterText text="Infi is your AI study buddy that talks, listens, and solves with you — " />
                <TypewriterText text="in the language you actually think in." className="text-white font-medium pl-1 whitespace-nowrap" />
              </div>
              
            </motion.div>

            {/* Restored Overlapping App Download CTA Cards on the Right */}
            <motion.div 
              variants={typingContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row -space-y-4 sm:-space-y-0 sm:-space-x-8 w-full lg:w-auto z-50 pointer-events-auto group/cards origin-right pr-4 lg:pr-12 pb-4 lg:pb-0 scale-75 md:scale-90 xl:scale-100"
            >
              <a
                href="#"
                className="hover-target relative z-10 flex items-center gap-5 px-8 py-4 rounded-[1.25rem] border border-white/20 bg-white/10 backdrop-blur-2xl transition-all duration-500 group/btn shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-accent/60 hover:shadow-[0_20px_50px_rgba(0,229,255,0.25)] sm:group-hover/cards:-translate-x-4 sm:group-hover/cards:rotate-[-2deg] hover:!-translate-y-4 hover:!scale-110 hover:!rotate-[-4deg] hover:!z-30"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover/btn:text-accent transition-colors duration-300">
                  <path d="M17.9 5c-.1.1-3.2 1.9-3.2 5.7 0 4.5 3.9 6 4 6-.1.1-.6 2.2-2.1 4.3-1.3 1.9-2.6 3.7-4.7 3.7s-2.6-1.2-5-1.2c-2.5 0-3.2 1.3-5 1.3S-.7 23 .8 20.8c2.2-3.2 4.8-4.8 6.1-4.8 1.2 0 3.2 1.3 4.9 1.3 1 0 3.5-1 5.1-1.3-1.8-1.3-3.2-3.7-3.2-5.7 0-3.1 2.2-5 4.2-5.3zM13.4 0c.2 1.6-.5 3.2-1.5 4.4-1.1 1.2-2.8 2.1-4.3 2-.2-1.5.6-3.2 1.6-4.2C10.2 1 12.1.2 13.4 0z" />
                </svg>
                <div className="text-left flex flex-col">
                  <div className="text-[11px] text-text-3 font-medium tracking-wide uppercase">Download on the</div>
                  <div className="font-heading text-lg font-bold text-white">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="hover-target relative z-0 flex items-center gap-5 px-8 py-4 rounded-[1.25rem] border border-white/20 bg-white/10 backdrop-blur-2xl transition-all duration-500 group/btn shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-teal/60 hover:shadow-[0_20px_50px_rgba(0,191,165,0.25)] sm:group-hover/cards:translate-x-4 sm:group-hover/cards:rotate-[2deg] hover:!-translate-y-4 hover:!scale-110 hover:!rotate-[4deg] hover:!z-30"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover/btn:text-teal transition-colors duration-300">
                  <path d="M3.6 1.7L14 12 3.6 22.3c-.4-.3-.6-.8-.6-1.3V3c0-.5.2-1 .6-1.3zM14.8 12.8l2.8 2.8-8.4 4.8 5.6-7.6zM18.8 10.4l2.4 1.4c.5.3.8.8.8 1.4s-.3 1.1-.8 1.4l-2.4 1.4-3.2-3.2 3.2-4.4zM9.2 4.1l8.4 4.8-2.8 2.8-5.6-7.6z" />
                </svg>
                <div className="text-left flex flex-col">
                  <div className="text-[11px] text-text-3 font-medium tracking-wide uppercase">Get it on</div>
                  <div className="font-heading text-lg font-bold text-white">Google Play</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
