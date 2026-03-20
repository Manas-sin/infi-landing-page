"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // Parallax values for the premium background objects
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!introRef.current || !contentRef.current) return;

    // Fade out and scale up "Why Infi?" as you scroll PAST it (parallax)
    gsap.to(introRef.current, {
      scrollTrigger: {
        trigger: introRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      scale: 1.5,
      y: 100, // Move down slightly while it fades out
    });

    // Fade in the Content Cards as they scroll INTO view
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 100 },
      {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%", // Start animating when it is 80% entering the viewport
          end: "top 20%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
      }
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
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e5ff]/10 blur-[120px] pointer-events-none z-0"
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
        <p className="mt-6 text-xl md:text-2xl text-accent font-medium tracking-[4px] uppercase opacity-70">
          Scroll Down
        </p>
      </section>

      {/* Slide 3: Content Cards (Follows right underneath naturally) */}
      <section 
        ref={contentRef}
        className="min-h-screen w-full flex flex-col justify-center relative z-20 py-24"
      >
        <div className="flex flex-col mb-16 ml-6 md:ml-[10vw]">
          <h2 className="font-heading text-4xl md:text-6xl font-black mb-4 tracking-tight text-white">
            Har doubt ka saathi
          </h2>
          <p className="text-xl md:text-2xl text-text-2 max-w-[600px] leading-[1.6]">
            Not another answer engine. Infi actually teaches you — step by step, in Hinglish, at your pace.
          </p>
        </div>

        <div className="w-full overflow-visible relative flex py-4 group">
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
