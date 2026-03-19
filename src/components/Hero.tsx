"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="download"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden"
    >
      {/* Three.js Background */}
      <HeroScene />

      {/* Blobs */}
      <div
        className="absolute w-[500px] h-[500px] top-[5%] -right-[10%] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%)",
          animation: "blobFloat1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] bottom-[10%] -left-[8%] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(179,136,255,0.12), transparent 70%)",
          animation: "blobFloat2 10s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/8 border border-accent/15 text-[13px] text-accent font-medium mb-6"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          Class 6–12 | CBSE, ICSE, State Boards
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-heading text-[clamp(36px,6vw,64px)] font-extrabold leading-[1.1] mb-5 max-w-[700px]"
        >
          Padhai ka naya
          <br />
          <span className="gradient-text">companion.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[clamp(16px,2vw,20px)] text-text-2 max-w-[520px] leading-relaxed mb-10 mx-auto"
        >
          Infi is your AI study buddy that talks, listens, and solves with you —
          in the language you actually think in.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-4 flex-wrap justify-center mb-8"
        >
          <a
            href="#"
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl glass-card hover:translate-y-[-2px] transition-all"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.9 5c-.1.1-3.2 1.9-3.2 5.7 0 4.5 3.9 6 4 6-.1.1-.6 2.2-2.1 4.3-1.3 1.9-2.6 3.7-4.7 3.7s-2.6-1.2-5-1.2c-2.5 0-3.2 1.3-5 1.3S-.7 23 .8 20.8c2.2-3.2 4.8-4.8 6.1-4.8 1.2 0 3.2 1.3 4.9 1.3 1 0 3.5-1 5.1-1.3-1.8-1.3-3.2-3.7-3.2-5.7 0-3.1 2.2-5 4.2-5.3zM13.4 0c.2 1.6-.5 3.2-1.5 4.4-1.1 1.2-2.8 2.1-4.3 2-.2-1.5.6-3.2 1.6-4.2C10.2 1 12.1.2 13.4 0z" />
            </svg>
            <div className="text-left">
              <div className="text-[11px] text-text-3">Download on the</div>
              <div className="font-heading text-base font-semibold">
                App Store
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl glass-card hover:translate-y-[-2px] transition-all"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.6 1.7L14 12 3.6 22.3c-.4-.3-.6-.8-.6-1.3V3c0-.5.2-1 .6-1.3zM14.8 12.8l2.8 2.8-8.4 4.8 5.6-7.6zM18.8 10.4l2.4 1.4c.5.3.8.8.8 1.4s-.3 1.1-.8 1.4l-2.4 1.4-3.2-3.2 3.2-4.4zM9.2 4.1l8.4 4.8-2.8 2.8-5.6-7.6z" />
            </svg>
            <div className="text-left">
              <div className="text-[11px] text-text-3">Get it on</div>
              <div className="font-heading text-base font-semibold">
                Google Play
              </div>
            </div>
          </a>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[13px] text-text-3"
        >
          Free to start <span className="text-accent font-semibold">⚡</span>{" "}
          No credit card needed
        </motion.p>
      </div>
    </section>
  );
}
