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
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top py-2 -my-2">
          <span className="split-word inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </span>
  );
};

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    illustration: (
      <div className="w-full h-48 mb-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors duration-500 drop-shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/10 to-transparent" />
        <div className="flex items-center gap-2 z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
              animate={{ height: [15, 60, 15] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    ),
    title: "Voice Tutor",
    desc: "Just talk. Ask your doubt in Hindi, English, or Hinglish — Infi listens and explains like a personal teacher sitting next to you.",
    color: "#00e5ff",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    illustration: (
      <div className="w-full h-48 mb-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors duration-500 drop-shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b388ff]/10 to-transparent" />
        <div className="relative w-28 h-28 border-2 border-dashed border-[#b388ff]/40 rounded-2xl flex items-center justify-center z-10">
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-[#b388ff] shadow-[0_0_15px_2px_#b388ff]"
            animate={{ y: [0, 110, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    ),
    title: "Photo Check",
    desc: "Snap a photo of your homework. Infi checks every step — marks what's right, shows where you went wrong, and explains the fix.",
    color: "#b388ff",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00bfa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    illustration: (
      <div className="w-full h-48 mb-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors duration-500 drop-shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00bfa5]/10 to-transparent" />
        <div className="flex flex-col gap-4 w-full px-12 z-10 w-full h-full justify-center">
          <motion.div 
            className="h-10 w-2/3 bg-[#00bfa5]/20 rounded-2xl rounded-bl-sm border border-[#00bfa5]/30 self-start p-2 shadow-[0_0_15px_#00bfa522] origin-bottom-left"
            animate={{ scale: [0.8, 1, 1, 1, 0.8], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.8, 0.9, 1], ease: "backOut" }}
          >
            <div className="w-2/3 h-2 bg-[#00bfa5]/40 rounded-full mt-1.5 ml-2" />
          </motion.div>
          <motion.div 
            className="h-10 w-[70%] bg-white/10 rounded-2xl rounded-br-sm border border-white/20 self-end p-2 origin-bottom-right flex items-center"
            animate={{ scale: [0.8, 0.8, 1, 1, 0.8], opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 10] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.4, 0.8, 1], ease: "backOut" }}
          >
            <div className="flex gap-1.5 ml-3">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-white/50" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
              <motion.div className="w-1.5 h-1.5 rounded-full bg-white/50" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-1.5 h-1.5 rounded-full bg-white/50" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
            </div>
          </motion.div>
        </div>
      </div>
    ),
    title: "Chat & Solve",
    desc: "Type your question, get step-by-step solutions. Infi never gives you the direct answer — it guides you so you actually learn.",
    color: "#00bfa5",
  },
];

const marqueeItems = [...features]; // Removed duplication since we use scroll pinning now

const TiltCard = ({ f, i }: { f: any; i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[85vw] md:w-[450px] shrink-0 flex flex-col p-10 md:p-12 rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-xl relative transition-colors duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing group shadow-2xl z-10"
    >
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none group-hover:opacity-100 rounded-[40px]"
        style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}33, transparent 70%)` }}
      />
      
      {/* 3D Pop-out Content wrapper */}
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full pointer-events-none">
        <div className="pointer-events-auto">
          {f.illustration}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 shrink-0"
            style={{ boxShadow: `0 0 20px ${f.color}22` }}
          >
            <div className="scale-75 flex items-center justify-center">{f.icon}</div>
          </div>
          <h3 className="font-heading text-3xl font-bold text-white tracking-tight">
            {f.title}
          </h3>
        </div>
        <p className="text-xl text-text-2 leading-[1.6] font-light">
          {f.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function Features() {
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: sectionScroll } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal movement based on how deep we scroll into the 300vh container
  const cardsX = useTransform(sectionScroll, [0, 1], ["0%", "-60%"]);

  // Mouse interactivity for the movable element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize mouse position relative to the center of the window
    const x = (e.clientX / window.innerWidth - 0.5) * 100; // -50 to 50
    const y = (e.clientY / window.innerHeight - 0.5) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax values for the premium background objects
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!introRef.current || !contentRef.current) return;

    const introTitle = introRef.current.querySelector("h2");
    const scrollIndicator = introRef.current.querySelector(".scroll-indicator");

    if (introTitle) {
      // Continuously scale the text up based entirely on scroll position, 
      // without magically fading out. It simply grows and natural scrolling takes it off-screen.
      gsap.fromTo(introTitle,
        { scale: 0.5, opacity: 1 }, // Starts at half size, but fully visible
        {
          scrollTrigger: {
            trigger: introRef.current,
            start: "top bottom", // Starts when entering from the bottom
            end: "bottom top",   // Continues all the way until it leaves the top
            scrub: 1,            // Smoothly tied to scroll position
          },
          scale: 2.2, // Grows to 2.2x normal size at the peak, subtle enough not to obliterate the screen
          opacity: 1, // Remains solid
          ease: "none"
        }
      );
    }

    if (scrollIndicator) {
      // Fade out the scroll indicator normally without scaling it massively
      gsap.to(scrollIndicator, {
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "top -50%",
          scrub: true,
        },
        opacity: 0,
        y: 100,
      });
    }

    // Fade in the Slide 3 Header elements sequentially
    const featureHeaderElements = contentRef.current.querySelectorAll(".features-header-wrapper > *");
    const featureMarquee = contentRef.current.querySelector(".features-marquee");

    // We keep opacity: 1 on the parent and animate the children!
    gsap.set(contentRef.current, { opacity: 1, y: 0 });

    const tlFeatures = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 75%", // Triggers slightly earlier than before
        end: "top 15%",
        scrub: 1,
      }
    });

    // We no longer fade the wrapper; we animate the individual words up like a curtain reveal!
    const words = contentRef.current.querySelectorAll(".split-word");
    
    tlFeatures.fromTo(words, 
      { y: "120%", rotateZ: 5, opacity: 0 },
      {
        y: "0%",
        rotateZ: 0,
        opacity: 1,
        stagger: 0.04, // Very fast ripple effect
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Fade in the cards wrapper nicely
    gsap.fromTo(featureMarquee,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: featureMarquee,
          start: "top 85%",
          end: "top 60%",
          scrub: 1
        }
      }
    );

    // ------------------------------------------------------------------
    // HORIZONTAL PINNING SCROLL FOR CARDS
    // ------------------------------------------------------------------
    // Removed buggy GSAP pin. Now handled via bulletproof CSS Sticky + Framer Motion.

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-bg-2 overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/noise.png')" }} />
      
      {/* -------------------------------------------------------- */}
      {/* Premium Floating Background Elements                     */}
      {/* -------------------------------------------------------- */}
      
      {/* Element 1: Giant blurred cyan orb */}
      <motion.div 
        style={{ y: bgY1 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e5ff]/10 blur-[60px] pointer-events-none z-0 transform-gpu"
      />

      {/* Element 2: Glassmorphic geometric diamond floating */}
      <motion.div 
        style={{ y: bgY2 }}
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] right-[10%] w-[120px] h-[120px] pointer-events-none z-0 transform-gpu"
      >
        <div className="w-full h-full rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(179,136,255,0.1)] transform rotate-45 transform-gpu" />
      </motion.div>

      {/* Element 3: Tiny high-tech crosshair accent */}
      <motion.div 
        style={{ y: bgY3 }}
        animate={{ rotate: [0, -90] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[25%] opacity-40 pointer-events-none z-0 transform-gpu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="1" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </motion.div>

      {/* DYNAMIC FLOATING BALLS ANIMATION */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          // Deterministic pseudo-random values based on index to avoid hydration mismatch
          const size = (i * 17) % 30 + 10;
          const left = (i * 23) % 100;
          const top = (i * 37) % 200;
          const duration = (i * 13) % 10 + 10;
          const delay = -((i * 11) % 20);
          const yMovement = -((i * 19) % 100) - 50;
          const xMovement = (i * 29) % 50 - 25;
          const scaleTarget = ((i * 31) % 50) / 100 + 1;
          const opacity = ((i * 7) % 40) / 100 + 0.1;

          return (
            <motion.div
              key={`ball-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}vh`,
                background: i % 2 === 0 ? "radial-gradient(circle, #00e5ff 0%, transparent 70%)" : "radial-gradient(circle, #b388ff 0%, transparent 70%)",
                opacity: opacity,
              }}
              animate={{
                y: [0, yMovement, 0],
                x: [0, xMovement, 0],
                scale: [1, scaleTarget, 1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Removed static marquee css blocks to rely upon Interactive Motion & GSAP Scrubbing */}

      {/* Slide 2: Why Infi Intro (Takes full 100vh normally, so 1 scroll passes it) */}
      <section 
        ref={introRef}
        className="h-screen w-full flex flex-col items-center justify-center relative z-10"
      >
        <h2 className="font-heading text-[clamp(60px,12vw,180px)] font-black leading-[1.05] tracking-tighter text-white drop-shadow-2xl text-center w-full">
          Why Infi?
        </h2>
        
        {/* Creative Awwwards-style Scrolling Indicator */}
        <div className="scroll-indicator absolute bottom-12 md:bottom-24 flex flex-col items-center gap-6 opacity-80">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-text-3">
            Discover
          </span>
          <div className="w-[1px] h-16 md:h-24 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-[2px] -left-[0.5px] h-[50%] bg-gradient-to-b from-transparent via-accent to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </section>

      {/* Slide 3: Content Cards (Follows right underneath naturally) */}
      <section 
        ref={contentRef}
        className="h-[200vh] w-full relative z-20"
      >
        <div 
          onMouseMove={handleMouseMove}
          className="sticky top-0 h-screen w-full flex flex-col justify-center py-24"
        >
          <div className="features-header-wrapper flex flex-col mb-16 ml-6 md:ml-[10vw] relative z-20">
            
            {/* INTERACTIVE MOVABLE ELEMENT - Professional & Cool Abstract Geometric Sphere */}
            <motion.div 
              style={{ x: smoothMouseX, y: smoothMouseY }}
              className="absolute -top-12 -left-8 md:-top-20 md:-left-16 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-[-1] will-change-transform transform-gpu opacity-60"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent/10 to-[#00e5ff]/10 blur-[30px] mix-blend-screen absolute inset-0" />
              <svg className="absolute inset-0 w-full h-full text-white/10 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)] animate-spin-slow" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"/>
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5"/>
                <ellipse cx="50" cy="50" rx="40" ry="12" stroke="currentColor" strokeWidth="0.5" transform="rotate(30 50 50)"/>
                <ellipse cx="50" cy="50" rx="40" ry="12" stroke="currentColor" strokeWidth="0.5" transform="rotate(-30 50 50)"/>
                <circle cx="50" cy="50" r="40" stroke="url(#sphereGradient)" strokeWidth="0.5"/>
                <defs>
                  <linearGradient id="sphereGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00e5ff" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#b388ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* ADVANCED TEXT ANIMATION */}
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-4 tracking-tight text-white" style={{ perspective: "1000px" }}>
              <SplitText text="Har doubt ka saathi" />
            </h2>
            <p className="text-xl md:text-2xl text-text-2 max-w-[600px] leading-[1.6]">
              <SplitText text="Not another answer engine. Infi actually teaches you — step by step, in Hinglish, at your pace." />
            </p>
          </div>

          <div className="features-marquee w-full h-[550px] overflow-visible relative flex py-4 mt-8" style={{ perspective: "1500px" }}>
            <motion.div 
              style={{ x: cardsX }}
              className="cards-slider-track flex gap-8 md:gap-16 w-max pl-6 md:pl-[10vw] will-change-transform"
            >
              {marqueeItems.map((f, i) => (
                <TiltCard key={i} f={f} i={i} />
              ))}
              {/* A spacer at the end so the last card doesn't hit the absolute edge */}
              <div className="w-[10vw] md:w-[200px] shrink-0 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
