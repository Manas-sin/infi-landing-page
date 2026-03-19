"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    iconClass: "bg-accent/10",
    title: "Voice Tutor",
    desc: "Just talk. Ask your doubt in Hindi, English, or Hinglish — Infi listens and explains like a personal teacher sitting next to you.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="2">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    iconClass: "bg-violet/10",
    title: "Photo Check",
    desc: "Snap a photo of your homework. Infi checks every step — marks what's right, shows where you went wrong, and explains the fix.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bfa5" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    iconClass: "bg-teal/10",
    title: "Chat & Solve",
    desc: "Type your question, get step-by-step solutions. Infi never gives you the direct answer — it guides you so you actually learn.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from(".features-label", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
      });

      gsap.from(".features-title", {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      });

      gsap.from(".features-sub", {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      });

      // Cards staggered animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: cards,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-[100px] px-6 bg-bg-2">
      <div className="features-label font-heading text-xs font-semibold uppercase tracking-[2px] text-accent mb-3 text-center">
        Why Infi?
      </div>
      <h2 className="features-title font-heading text-[clamp(28px,4vw,44px)] font-bold text-center mb-4 leading-tight">
        Har doubt ka saathi
      </h2>
      <p className="features-sub text-[17px] text-text-2 text-center max-w-[560px] mx-auto mb-[60px] leading-relaxed">
        Not another answer engine. Infi actually teaches you — step by step, in
        Hinglish, at your pace.
      </p>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto"
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="feature-card glass-card p-9 hover:translate-y-[-4px]"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${f.iconClass}`}
            >
              {f.icon}
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2.5">
              {f.title}
            </h3>
            <p className="text-[15px] text-text-2 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
