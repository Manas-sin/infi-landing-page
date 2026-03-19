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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-glass-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-none cursor-pointer py-6 flex items-center justify-between font-heading text-base font-medium text-text-1 text-left hover:text-accent transition-colors"
      >
        {q}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 shrink-0 text-text-3"
          style={{ color: open ? "#00e5ff" : undefined }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] text-text-2 leading-[1.7]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[100px] px-6 bg-bg-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-xs font-semibold uppercase tracking-[2px] text-accent mb-3 text-center"
      >
        FAQ
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-[clamp(28px,4vw,44px)] font-bold text-center mb-16 leading-tight"
      >
        Common questions
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-[680px] mx-auto"
      >
        {faqs.map((faq) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </motion.div>
    </section>
  );
}
