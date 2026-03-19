"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#demo", label: "Demo" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 py-4 border-b border-glass-border bg-bg/85 backdrop-blur-[20px]"
    >
      <a href="#" className="font-heading text-[28px] font-extrabold gradient-text-teal">
        infi
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            className="text-sm text-text-2 hover:text-text-1 transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#download"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="px-6 py-2.5 rounded-full bg-linear-to-br from-accent to-teal text-bg font-heading text-sm font-semibold hover:opacity-85 transition-opacity"
        >
          Download
        </motion.a>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
        aria-label="Menu"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block w-[22px] h-[2px] bg-text-1 rounded-sm"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          className="block w-[22px] h-[2px] bg-text-1 rounded-sm"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block w-[22px] h-[2px] bg-text-1 rounded-sm"
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 flex flex-col gap-5 p-8 bg-bg/95 backdrop-blur-[20px] border-b border-glass-border md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-text-2 hover:text-text-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-full bg-linear-to-br from-accent to-teal text-bg font-heading text-sm font-semibold text-center hover:opacity-85 transition-opacity"
            >
              Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
