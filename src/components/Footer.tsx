"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="pt-[60px] pb-8 px-6 border-t border-glass-border">
      <div className="max-w-[1100px] mx-auto flex justify-between items-start flex-wrap gap-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[300px]"
        >
          <div className="font-heading text-[32px] font-extrabold gradient-text-teal mb-3">
            infi
          </div>
          <p className="text-sm text-text-3 leading-relaxed">
            Your AI study companion for Class 6–12. Voice, chat, photo check —
            padhai made personal.
          </p>
        </motion.div>

        {/* Link Columns */}
        {[
          {
            title: "Product",
            links: [
              { href: "#features", label: "Features" },
              { href: "#demo", label: "Demo" },
              { href: "#faq", label: "FAQ" },
            ],
          },
          {
            title: "Company",
            links: [
              { href: "#", label: "About" },
              { href: "#", label: "Careers" },
              { href: "#", label: "Contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { href: "#", label: "Privacy Policy" },
              { href: "#", label: "Terms of Service" },
            ],
          },
        ].map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
          >
            <h4 className="font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-text-2 mb-4">
              {col.title}
            </h4>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-text-3 mb-2.5 hover:text-text-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Bottom */}
      <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-glass-border flex justify-between items-center flex-wrap gap-3">
        <span className="text-[13px] text-text-3">
          &copy; 2026 Infi by Rankguru Technology Solutions. All rights
          reserved.
        </span>
        <div className="flex gap-4">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="text-text-3 hover:text-accent transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          {/* Twitter */}
          <a
            href="#"
            aria-label="Twitter"
            className="text-text-3 hover:text-accent transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          {/* YouTube */}
          <a
            href="#"
            aria-label="YouTube"
            className="text-text-3 hover:text-accent transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
