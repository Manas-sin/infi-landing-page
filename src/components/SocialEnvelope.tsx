"use client";

import { motion } from "framer-motion";

export default function SocialEnvelope() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="relative w-36 h-24 group cursor-pointer perspective-[1000px] z-50 float-animation"
    >
      {/* ---------------- Envelope Back Base ---------------- */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-white/5 backdrop-blur-md rounded-[1.25rem] border border-white/10 shadow-xl z-0" />
      
      {/* ---------------- Stacked Colorful Minimalist Cards ---------------- */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center z-10 transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-16">
        
        {/* Instagram */}
        <a 
          href="#" 
          className="absolute bottom-0 w-12 h-12 rounded-[0.8rem] bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-md flex items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:-translate-x-[4.5rem] group-hover:-rotate-12 group-hover:scale-110 hover:!scale-125 hover:!rotate-[-8deg] hover:!z-50"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        
        {/* Twitter / X */}
        <a 
          href="#" 
          className="absolute bottom-0 w-12 h-12 rounded-[0.8rem] bg-black shadow-lg border border-white/20 flex items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:-translate-x-6 group-hover:-rotate-4 group-hover:scale-110 hover:!scale-125 hover:!rotate-0 hover:!z-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        
        {/* LinkedIn */}
        <a 
          href="#" 
          className="absolute bottom-0 w-12 h-12 rounded-[0.8rem] bg-[#0077b5] shadow-md flex items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:translate-x-6 group-hover:rotate-4 group-hover:scale-110 hover:!scale-125 hover:!rotate-0 hover:!z-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        
        {/* GitHub */}
        <a 
          href="#" 
          className="absolute bottom-0 w-12 h-12 rounded-[0.8rem] bg-white text-black shadow-md flex items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:translate-x-[4.5rem] group-hover:rotate-12 group-hover:scale-110 hover:!scale-125 hover:!rotate-8 hover:!z-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </a>
      </div>

      {/* ---------------- Envelope Front Flap / Pocket ---------------- */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-white/10 backdrop-blur-3xl rounded-b-[1.25rem] border-t border-white/20 shadow-[0_-5px_15px_rgba(0,0,0,0.2)] z-20 pointer-events-none flex flex-col items-center justify-start overflow-hidden pt-2">
        {/* Sharp envelope V flap detail via borders */}
        <div className="absolute top-0 w-0 h-0 border-l-[4.5rem] border-r-[4.5rem] border-t-[1.5rem] border-l-transparent border-r-transparent border-t-white/20 mx-auto pointer-events-none mix-blend-overlay" />
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/50 mt-5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">Connect</span>
      </div>
    </motion.div>
  );
}
