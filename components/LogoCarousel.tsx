"use client";

import React from "react";

const row1Items = [
  {
    name: "Adobe Firefly",
    sub: "Creative Suite",
    iconColor: "text-red-400",
    bgGlow: "from-red-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3q1 4 4 6a6 6 0 1 1-8 0q3-2 4-6z" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Runway ML",
    sub: "Video Synthesis",
    iconColor: "text-amber-400",
    bgGlow: "from-amber-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "OpenAI Lab",
    sub: "Neural Models",
    iconColor: "text-purple-400",
    bgGlow: "from-purple-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" fill="currentColor" fillOpacity="0.4" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
      </svg>
    ),
  },
  {
    name: "Midjourney",
    sub: "Generative Art",
    iconColor: "text-orange-400",
    bgGlow: "from-orange-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
      </svg>
    ),
  },
  {
    name: "NVIDIA Omniverse",
    sub: "Spatial AI",
    iconColor: "text-emerald-400",
    bgGlow: "from-emerald-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9z" />
        <circle cx="12" cy="11" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Unreal Engine 5",
    sub: "Realtime 3D",
    iconColor: "text-cyan-400",
    bgGlow: "from-cyan-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.3" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const row2Items = [
  {
    name: "Synthesia AI",
    sub: "Avatar Engine",
    iconColor: "text-pink-400",
    bgGlow: "from-pink-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Figma Studio",
    sub: "Design Systems",
    iconColor: "text-teal-400",
    bgGlow: "from-teal-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
      </svg>
    ),
  },
  {
    name: "Vercel Enterprise",
    sub: "Edge Cloud",
    iconColor: "text-purple-400",
    bgGlow: "from-purple-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Lumina Nexus",
    sub: "Neural Render",
    iconColor: "text-yellow-400",
    bgGlow: "from-yellow-500/15 to-transparent",
    isHighlighted: true,
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Stability AI",
    sub: "Open Latent",
    iconColor: "text-indigo-400",
    bgGlow: "from-indigo-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
      </svg>
    ),
  },
  {
    name: "Sony Creative Labs",
    sub: "Cinema Visuals",
    iconColor: "text-blue-400",
    bgGlow: "from-blue-500/15 to-transparent",
    svg: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function LogoCarousel() {
  return (
    <section className="relative w-full pt-4 sm:pt-6 pb-14 sm:pb-20 bg-black overflow-hidden z-20">
      {/* Background Subtle Cosmic Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-[120px]" />
      </div>

      {/* Centered Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-6 sm:mb-8 flex flex-col items-center">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-[#161026]/90 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)] mb-3">
          <span className="text-[10px] text-purple-400">✦</span>
          <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#d8b4fe] uppercase">
            ENTERPRISE NEURAL NETWORK
          </span>
        </div>

        {/* Uppercase Subtitle */}
        <p className="text-zinc-400 text-xs sm:text-[13px] font-normal tracking-[0.18em] uppercase">
          POWERING NEXT-GEN CREATIVE STUDIOS & GLOBAL AI LABS
        </p>
      </div>

      {/* Marquee Container with edge mask fade */}
      <div className="relative z-10 w-full flex flex-col gap-5 sm:gap-7 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        
        {/* ROW 1: Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="animate-marquee-left pause-hover flex items-center gap-8 sm:gap-12 py-2">
            {[...row1Items, ...row1Items, ...row1Items].map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="group/brand flex items-center gap-3 px-3 py-1.5 shrink-0 cursor-pointer transition-all duration-300 filter grayscale contrast-125 opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105"
              >
                {/* Floating Brand Icon */}
                <div className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/brand:scale-110">
                  {item.svg}
                </div>
                <div className="flex flex-col text-left select-none">
                  <span className="text-xs sm:text-[14px] font-semibold text-zinc-300 group-hover/brand:text-white tracking-tight leading-tight transition-colors duration-200">
                    {item.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 group-hover/brand:text-zinc-300 font-light tracking-wide leading-tight mt-0.5 transition-colors duration-200">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="animate-marquee-right pause-hover flex items-center gap-8 sm:gap-12 py-2">
            {[...row2Items, ...row2Items, ...row2Items].map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="group/brand flex items-center gap-3 px-3 py-1.5 shrink-0 cursor-pointer transition-all duration-300 filter grayscale contrast-125 opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105"
              >
                {/* Floating Brand Icon */}
                <div className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/brand:scale-110">
                  {item.svg}
                </div>
                <div className="flex flex-col text-left select-none">
                  <span className="text-xs sm:text-[14px] font-semibold text-zinc-300 group-hover/brand:text-white tracking-tight leading-tight transition-colors duration-200">
                    {item.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 group-hover/brand:text-zinc-300 font-light tracking-wide leading-tight mt-0.5 transition-colors duration-200">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
