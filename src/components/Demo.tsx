"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Helper to split text into manageable word blocks for GSAP
const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="split-word inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </span>
  );
};

export default function Demo() {
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Interactive mouse values for the logical node graphics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 60; // range -30 to 30
    const y = (e.clientY / window.innerHeight - 0.5) * 60;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax Values for the Premium Background Objects
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["-10%", "-50%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!introRef.current || !videoRef.current) return;

    // Remove the complex entrance timeline that was causing the blank space bug
    // Framer Motion viewport triggers will be used instead for absolute reliability

    // Fade out and scale up everything smoothly together as you scroll PAST it
    gsap.to(introRef.current, {
      scrollTrigger: {
        trigger: introRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      scale: 1.1,
      y: 100,
    });

    // Fade in the Video as it scrolls INTO view
    gsap.fromTo(videoRef.current, 
      { opacity: 0, scale: 0.9, y: 100 },
      {
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 85%", // Start animating when it enters the viewport
          end: "top 30%",
          scrub: 1,
        },
        opacity: 1,
        scale: 1,
        y: 0,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-bg-2 overflow-hidden relative">
      
      {/* -------------------------------------------------------- */}
      {/* Premium Floating Background Elements                     */}
      {/* -------------------------------------------------------- */}
      
      {/* Element 1: Giant beautifully moving cyan/purple blur */}
      <motion.div
        style={{ y: bgY1 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] top-[10%] left-[50%] -translate-x-1/2 rounded-full blur-[150px] pointer-events-none z-0 will-change-transform transform-gpu"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1), rgba(179,136,255,0.05) 70%)" }} />
      </motion.div>

      {/* Element 2: A minimalist, high-end rotating glass ring */}
      <motion.div 
        style={{ y: bgY2 }}
        animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] left-[5%] w-[250px] h-[250px] pointer-events-none z-0 opacity-40"
      >
        <div className="w-full h-full rounded-full border border-white/10 border-dashed backdrop-blur-sm" />
        <div className="absolute top-0 right-1/2 w-4 h-4 bg-[#b388ff] rounded-full blur-[2px]" />
      </motion.div>

      {/* Element 3: Tiny high-tech data dots sliding up rapidly */}
      <motion.div 
        style={{ y: bgY3 }}
        className="absolute bottom-[-10%] right-[15%] flex gap-2 opacity-30 pointer-events-none z-0"
      >
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full" />
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-white rounded-full" />
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#b388ff] rounded-full" />
      </motion.div>

      {/* Slide 4 equivalent: Text Intro Section */}
      <section 
        ref={introRef}
        onMouseMove={handleMouseMove}
        className="h-screen w-full flex flex-col items-center justify-center px-4 relative z-10"
      >
        {/* LOGICAL GRAPHICS BACKGROUND (Interacts with Mouse) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.35]">
          <motion.div 
            style={{ x: springX, y: springY }}
            className="relative w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] flex items-center justify-center"
          >
            {/* Outer dotted logic ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/10 border-dashed"
            />
            {/* Inner steady logic ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute w-[60%] h-[60%] rounded-full border border-[#00e5ff]/20"
            >
              {/* Nodes representing clearing doubts & checking homework */}
              <div className="absolute top-0 right-[20%] w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_#00e5ff] transform -translate-y-1/2" />
              <div className="absolute bottom-[-1px] left-[30%] w-3 h-3 bg-violet rounded-full shadow-[0_0_15px_#b388ff] transform translate-y-1/2" />
              <div className="absolute top-[40%] left-[-1px] w-2 h-2 bg-teal rounded-full shadow-[0_0_10px_#00bfa5] transform -translate-x-1/2" />
            </motion.div>
            
            {/* Connecting logic path across the center */}
            <svg className="absolute w-[80%] h-[80%] text-white/5" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M10,50 Q40,20 50,50 T90,50" />
              <path d="M50,10 Q20,40 50,50 T50,90" />
            </svg>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="demo-pill relative z-10 flex flex-col items-center mb-6"
        >
          <div className="flex items-center gap-4 mb-2 opacity-90">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent" />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_12px_#00e5ff]" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h3 
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-light text-[clamp(32px,5vw,70px)] tracking-tight capitalize drop-shadow-[0_0_40px_rgba(0,229,255,0.2)]"
            style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}
          >
            See it in action.
          </h3>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 font-heading text-[clamp(40px,6vw,90px)] font-black text-center mb-6 leading-[1.05] tracking-tight text-white drop-shadow-2xl" 
          style={{ perspective: "1000px" }}
        >
          <SplitText text="Padhai feels different" />
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 text-[clamp(16px,2vw,24px)] text-text-2 text-center max-w-[700px] leading-relaxed font-light"
        >
          <SplitText text="Watch how students use Infi to clear doubts, check homework, and entirely bypass frustration." />
        </motion.p>
      </section>

      {/* Slide 5 equivalent: Video Container Section */}
      <section 
        ref={videoRef}
        className="min-h-screen w-full flex items-center justify-center relative z-20 py-24"
      >
        <div className="relative w-[90vw] max-w-[1100px] aspect-video rounded-[32px] md:rounded-[48px] border border-glass-border bg-black/40 backdrop-blur-2xl overflow-hidden isolate shadow-[0_20px_100px_rgba(0,0,0,0.5)] flex items-center justify-center group pointer-events-auto will-change-transform transform-gpu">
          <div className="absolute inset-[-2px] bg-gradient-to-tr from-accent/20 via-transparent to-purple-500/20 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <iframe
            src="https://www.youtube.com/embed/x78PnPd-V-A?autoplay=1&mute=1&loop=1&playlist=x78PnPd-V-A&controls=0&showinfo=0&rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full transform scale-[1.01]" 
          />
        </div>
      </section>
    </div>
  );
}
