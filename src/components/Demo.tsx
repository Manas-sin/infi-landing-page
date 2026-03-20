"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Demo() {
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax Values for the Premium Background Objects
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["-10%", "-50%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!introRef.current || !videoRef.current) return;

    // Fade out and scale up "Padhai feels different" as you scroll PAST it
    gsap.to(introRef.current, {
      scrollTrigger: {
        trigger: introRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      scale: 1.2,
      y: 50,
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
        className="absolute w-[800px] h-[800px] top-[10%] left-[50%] -translate-x-1/2 rounded-full blur-[150px] pointer-events-none z-0"
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
        className="h-screen w-full flex flex-col items-center justify-center px-4 relative z-10"
      >
        <div className="font-heading text-sm font-semibold uppercase tracking-[3px] text-accent mb-6 bg-accent/10 border border-accent/30 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
          See it in action
        </div>
        <h2 className="font-heading text-[clamp(40px,6vw,90px)] font-black text-center mb-6 leading-[1.05] tracking-tight text-white drop-shadow-2xl">
          Padhai feels different
        </h2>
        <p className="text-[clamp(16px,2vw,24px)] text-text-2 text-center max-w-[600px] leading-relaxed font-light">
          Watch how students use Infi to clear doubts, check homework, and entirely bypass frustration.
        </p>
      </section>

      {/* Slide 5 equivalent: Video Container Section */}
      <section 
        ref={videoRef}
        className="min-h-screen w-full flex items-center justify-center relative z-20 py-24"
      >
        <div className="relative w-[90vw] max-w-[1100px] aspect-video rounded-[32px] md:rounded-[48px] border border-glass-border bg-black/40 backdrop-blur-2xl overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.5)] flex items-center justify-center group pointer-events-auto">
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
