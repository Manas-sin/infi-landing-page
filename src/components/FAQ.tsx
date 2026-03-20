"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Which classes and boards does Infi support?",
    a: "Infi supports Class 6 to 12 across CBSE, ICSE, and major State Boards. It covers Maths, Science, and more subjects are being added.",
  },
  {
    q: "Is Infi free to use?",
    a: "Infi is free to start — you get daily Sparks (credits) for voice, chat, and photo check. Need more? You can grab extra Sparks anytime from the in-app shop.",
  },
  {
    q: "Can I talk to Infi in Hindi?",
    a: "Yes! Infi understands Hindi, English, and Hinglish. Speak or type naturally in whatever language you're comfortable with — Infi adapts to you.",
  },
  {
    q: "Will Infi just give me the answer?",
    a: "No — and that's the point. Infi guides you step-by-step so you understand the concept. It gives hints, breaks problems down, and only moves on when you've got it. Like a good tutor, not a cheat sheet.",
  },
  {
    q: "How does Photo Check work?",
    a: "Take a photo of your homework or any problem. Infi scans it, identifies each step, marks correct ones with a green check and incorrect ones with a red cross, then explains what went wrong and how to fix it.",
  },
  {
    q: "What are Sparks?",
    a: "Sparks are Infi's credits. Each voice session, chat, or photo check uses some Sparks. You get free Sparks daily, and can earn more by inviting friends or purchase them from the shop.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10 overflow-hidden w-full group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-none cursor-pointer py-10 md:py-14 flex items-center justify-between font-heading text-[clamp(24px,3vw,44px)] font-semibold text-text-1 text-left hover-target relative"
      >
        {/* Hover Background Layer */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
        
        <span className="group-hover:text-accent transition-colors duration-500 pr-10">{q}</span>
        
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-bg-1 transition-colors duration-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pb-10 md:pb-16 text-[clamp(18px,1.5vw,22px)] text-text-2 leading-[1.8] max-w-[800px] w-[90%] font-light">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[150px] px-6 md:px-12 bg-bg-2 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Graphic */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-sm font-semibold uppercase tracking-[3px] text-accent mb-6"
        >
          FAQ
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[clamp(50px,7vw,100px)] font-black mb-20 leading-[1] tracking-tight"
        >
          Got doubts?
        </motion.h2>

        <div className="w-full flex flex-col border-t border-white/10">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
