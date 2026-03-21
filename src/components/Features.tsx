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
    title: "Chat & Solve",
    desc: "Type your question, get step-by-step solutions. Infi never gives you the direct answer — it guides you so you actually learn.",
    color: "#00bfa5",
  },
];

const marqueeItems = [...features, ...features];

export default function Features() {
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
    )
    // Marquee glides in shortly after
    .fromTo(featureMarquee,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      },
      "-=0.7" // overlaps with the end of the text stagger
    );

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
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e5ff]/10 blur-[120px] pointer-events-none z-0"
      />

      {/* Element 2: Glassmorphic geometric diamond floating */}
      <motion.div 
        style={{ y: bgY2 }}
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] right-[10%] w-[120px] h-[120px] pointer-events-none z-0"
      >
        <div className="w-full h-full rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(179,136,255,0.1)] transform rotate-45" />
      </motion.div>

      {/* Element 3: Tiny high-tech crosshair accent */}
      <motion.div 
        style={{ y: bgY3 }}
        animate={{ rotate: [0, -90] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[25%] opacity-40 pointer-events-none z-0"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="1" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

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
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full flex flex-col justify-center relative z-20 py-24"
      >
        <div className="features-header-wrapper flex flex-col mb-16 ml-6 md:ml-[10vw] relative">
          
          {/* INTERACTIVE MOVABLE ELEMENT */}
          <motion.div 
            style={{ x: smoothMouseX, y: smoothMouseY }}
            className="absolute -top-12 -left-8 md:-top-20 md:-left-16 w-24 h-24 md:w-40 md:h-40 pointer-events-none z-[-1] will-change-transform transform-gpu"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent/20 to-violet/20 blur-[20px] mix-blend-screen" />
            <svg className="absolute inset-0 w-full h-full text-white/10 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0" />
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

        <div className="features-marquee w-full overflow-visible relative flex py-4 group">
          <div className="flex gap-8 md:gap-16 w-max animate-marquee pl-6 md:pl-[10vw]">
            {marqueeItems.map((f, i) => (
              <div
                key={i}
                className="w-[85vw] md:w-[450px] shrink-0 flex flex-col p-10 md:p-12 rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none hover-glow"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}33, transparent 70%)` }}
                />
                <style dangerouslySetInnerHTML={{ __html: `
                  .shrink-0:hover .hover-glow { opacity: 1; }
                `}} />
                <div>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-8 border border-white/10 bg-white/5"
                    style={{ boxShadow: `0 0 30px ${f.color}22` }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-heading text-3xl font-bold mb-4 text-white tracking-tight">
                    {f.title}
                  </h3>
                </div>
                <p className="text-xl text-text-2 leading-[1.6] font-light">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
