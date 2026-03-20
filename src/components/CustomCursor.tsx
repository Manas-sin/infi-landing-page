"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // quickTo is highly optimized for mouse tracking without react state delay
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      // center the cursor exactly on the pointer (w-4 = 16px, center = 8px)
      xTo(e.clientX - 8); 
      yTo(e.clientY - 8);
    };

    // The scale of the cursor dot when hovering Interactive Elements (Clickables)
    const handleMouseHover = () => {
      gsap.to(cursor, { 
        opacity: 1, // Only visible when hovering clickable things
        scale: 4, 
        backgroundColor: "rgba(0, 229, 255, 0.4)", 
        border: "1px solid rgba(0, 229, 255, 0.8)",
        mixBlendMode: "screen", 
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { 
        opacity: 0, // Hidden natively
        scale: 1, 
        backgroundColor: "#fff", 
        border: "none",
        mixBlendMode: "difference", 
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Make sure we attach standard mouse tracking globally so we know where to reveal it
    window.addEventListener("mousemove", onMouseMove);

    // Initial setup for body hover interactions (Links, Buttons, etc.)
    const attachHover = () => {
      const interactiveElements = document.querySelectorAll("a, button, .hover-target, select, input, .feature-card");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseHover);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseHover);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    attachHover();
    
    // Auto-detect when new elements enter the DOM and attach the custom hover state
    const observer = new MutationObserver(() => attachHover());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white z-[9999] opacity-0" // Hidden by default
      style={{
        mixBlendMode: "difference", 
        pointerEvents: "none"
      }}
    />
  );
}
