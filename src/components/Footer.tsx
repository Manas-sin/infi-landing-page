"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import SocialEnvelope from "./SocialEnvelope";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax for massive footer text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  useEffect(() => {
    // Apply massive magnetic effects to social icons
    const magneticTargets = document.querySelectorAll(".magnetic-social");
    magneticTargets.forEach((target) => {
      const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "elastic.out(1, 0.3)" });

      target.addEventListener("mousemove", (e) => {
        const mouseEvent = e as MouseEvent;
        const rect = (target as HTMLElement).getBoundingClientRect();
        const relX = mouseEvent.clientX - rect.left - rect.width / 2;
        const relY = mouseEvent.clientY - rect.top - rect.height / 2;
        xTo(relX * 0.4);
        yTo(relY * 0.4);
      });

      target.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }, []);

  return (
    <footer ref={containerRef} className="relative pt-[100px] bg-[#060610] overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-16 mb-24 z-10">
        
        {/* Brand Left */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="font-heading text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent to-teal">
            infi
          </div>
          <p className="text-xl text-text-2 leading-[1.6] font-light max-w-[350px]">
            Your AI study companion for Class 6–12. Voice, chat, photo check — padhai made entirely personal.
          </p>
        </div>

        {/* Link Columns Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <h4 className="font-heading text-xs font-bold uppercase tracking-[2px] text-text-3 mb-6">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover-target text-lg text-text-2 hover:text-white transition-colors duration-300 relative inline-block group"
                    >
                      {link.label}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Extreme Massive Text Footer Parallax - beautifully illuminates at the end of the scroll journey */}
      <motion.div 
        style={{ y: yBg, scale: scaleText }}
        className="w-full flex justify-center items-end select-none pointer-events-none mt-10 overflow-visible px-4 relative z-0"
      >
        <motion.span 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.8, 0.95, 1], [0.03, 0.1, 1]), // Dramatically lights up
            textShadow: useTransform(
              scrollYProgress, 
              [0.9, 1], 
              ["0px 0px 0px rgba(41, 121, 255, 0)", "0px 0px 150px rgba(41, 121, 255, 0.8)"]
            )
          }}
          className="font-heading font-black text-[clamp(150px,25vw,400px)] leading-[0.7] tracking-tighter text-white whitespace-nowrap uppercase transition-colors duration-500"
        >
          INFI
        </motion.span>
      </motion.div>

      {/* Bottom Legal bar */}
      <div className="w-full border-t border-white/5 bg-[#060610] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-sm text-text-3 font-medium tracking-wide">
            &copy; 2026 Infi by Rankguru Technology Solutions. All rights reserved.
          </span>
          <div className="flex gap-6">
            {/* Elegant Social Envelope instead of standard links */}
            <div className="relative overflow-visible z-50">
              <SocialEnvelope />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
