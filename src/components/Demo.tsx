"use client";

import { useRef, useEffect, useState } from "react";
import { animate } from "animejs";

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Animate section label
          animate(".demo-label", {
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            ease: "outCubic",
          });

          // Animate title
          if (titleRef.current) {
            animate(titleRef.current, {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 150,
              ease: "outCubic",
            });
          }

          // Animate subtitle
          animate(".demo-sub", {
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 800,
            delay: 300,
            ease: "outCubic",
          });

          // Animate video wrapper with scale
          if (videoRef.current) {
            animate(videoRef.current, {
              scale: [0.9, 1],
              opacity: [0, 1],
              duration: 1000,
              delay: 450,
              ease: "outCubic",
            });
          }

          // Animate the play button with a continuous pulse
          animate(".play-btn-anim", {
            scale: [1, 1.08, 1],
            duration: 2000,
            loop: true,
            ease: "inOutSine",
            delay: 1200,
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="py-[100px] px-6 relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute w-[600px] h-[600px] -top-[20%] -right-[15%] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%)",
        }}
      />

      <div
        className="demo-label font-heading text-xs font-semibold uppercase tracking-[2px] text-accent mb-3 text-center"
        style={{ opacity: 0 }}
      >
        See it in action
      </div>
      <h2
        ref={titleRef}
        className="font-heading text-[clamp(28px,4vw,44px)] font-bold text-center mb-4 leading-tight"
        style={{ opacity: 0 }}
      >
        Padhai feels different with Infi
      </h2>
      <p
        className="demo-sub text-[17px] text-text-2 text-center max-w-[560px] mx-auto mb-[60px] leading-relaxed"
        style={{ opacity: 0 }}
      >
        Watch how students use Infi to clear doubts, check homework, and
        actually understand concepts.
      </p>

      <div
        ref={videoRef}
        className="max-w-[800px] mx-auto relative rounded-3xl overflow-hidden border border-glass-border bg-bg-2 aspect-video flex items-center justify-center cursor-pointer"
        style={{ opacity: 0 }}
        onClick={() => setPlaying(true)}
        role="button"
        aria-label="Play demo video"
      >
        {playing ? (
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-text-2">
            <div className="play-btn-anim w-20 h-20 rounded-full bg-linear-to-br from-accent to-teal flex items-center justify-center shadow-[0_4px_40px_rgba(0,229,255,0.3)]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#060610"
              >
                <polygon points="9,6 19,12 9,18" />
              </svg>
            </div>
            <span className="text-[15px]">Watch the 2-min demo</span>
          </div>
        )}
      </div>
    </section>
  );
}
