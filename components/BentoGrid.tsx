"use client";

import Image from "next/image";

export default function BentoGrid() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-black text-white overflow-hidden z-20">
      {/* Cosmic background ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(236,72,153,0.06)_40%,transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] rounded-full bg-purple-950/20 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-3">
            <span className="text-xs text-purple-400">✦</span>
            <span className="text-[10.5px] font-medium tracking-[0.2em] text-[#d8b4fe] uppercase">
              Modular Architecture
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Built for Studio-Grade Visual Production
          </h2>
        </div>

        {/* BENTO GRID CONTAINER - MATCHING REFERENCE IMAGE 1:1 */}
        <div className="flex flex-col gap-4 sm:gap-5">
          
          {/* ================= TOP ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            
            {/* CARD 1 (Top Left, 8 Columns): "TOP SKILLS PRO" Equivalent */}
            <div className="lg:col-span-7 xl:col-span-8 relative min-h-[300px] sm:min-h-[340px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#1a122e] via-[#100b1e] to-[#07050d] border border-purple-500/20 p-6 sm:p-10 flex flex-col justify-between group shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
              {/* Background ambient radial glow */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />

              {/* Card Content Layout */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center h-full">
                {/* Left Typography Block */}
                <div className="sm:col-span-6 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8b4fe] mb-2">
                    Studio Core v3.2
                  </span>
                  <h3 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tighter leading-[0.92] text-white">
                    <span className="block bg-gradient-to-r from-white via-[#f3e8ff] to-[#d8b4fe] bg-clip-text text-transparent">
                      PRO
                    </span>
                    <span className="block text-white">CREATIVE</span>
                    <span className="block text-[#c084fc]">SUITE</span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed mt-4 max-w-xs">
                    Next-generation collaboration suite designed for digital artists, art directors, and VFX houses.
                  </p>
                </div>

                {/* Right Photograph Block (Creators in Studio) */}
                <div className="sm:col-span-6 relative h-[200px] sm:h-full min-h-[220px] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/bento-creators.jpg"
                    alt="Digital Creators at Work"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* CARD 2 (Top Right, 4 Columns): Console / Stage Lights Equivalent */}
            <div className="lg:col-span-5 xl:col-span-4 relative min-h-[300px] sm:min-h-[340px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-zinc-950 border border-white/10 group shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
              {/* Background Image: High contrast console/spotlights */}
              <Image
                src="/bento-stage.jpg"
                alt="Neural Synthesis Cluster"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

              {/* Top-Right Badge: "(20)(26)" / Tech Glyph */}
              <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-purple-300">
                <span>3.2</span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                  Hardware Acceleration
                </span>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  128K H100 Cluster Inference
                </span>
              </div>
            </div>
          </div>

          {/* ================= MIDDLE & LOWER AREA ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* CARD 3 (Left Column, Tall Vertical Card): Dance / Kinetic Movement Equivalent */}
            <div className="lg:col-span-4 xl:col-span-4 relative h-full min-h-[480px] sm:min-h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black border border-white/10 group shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between">
              {/* Background Image: Expressive dancers in spotlight */}
              <Image
                src="/bento-vertical.jpg"
                alt="Dynamic Motion & Choreography"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

              {/* Top-Left Circular Badge (Matching the yellow dot in reference) */}
              <div className="relative top-6 left-6 z-10 w-6 h-6 rounded-full bg-[#d8b4fe] shadow-[0_0_15px_#d8b4fe] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              {/* Bottom Label Overlay */}
              <div className="relative z-10 p-6 flex flex-col">
                <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#d8b4fe]">
                  Latent Physics Engine
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                  Kinetic Movement & Dynamic Choreography
                </h4>
              </div>
            </div>

            {/* RIGHT COLUMN (8 Columns): Holds Card 4 on top, and Card 5 + (Card 6, Card 7) below */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-4 sm:gap-5 h-full justify-between">
              
              {/* CARD 4 (Wide Horizontal Card): "ОБРАЗОВАТЕЛЬНАЯ ПРОГРАММА" Equivalent */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#20133c] via-[#160c2c] to-[#120824] border border-purple-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group shadow-[0_8px_30px_rgba(0,0,0,0.8)] shrink-0">
                {/* Purple light beam overlay */}
                <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-purple-500/20 blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col max-w-xl">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#d8b4fe] uppercase mb-1">
                    Neural Diffusion Program
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    Sub-Second 8K Latent Synthesis
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#f472b6]">
                      0.8 SECONDS
                    </span>
                    <span className="text-zinc-600">—</span>
                    <span className="text-xs sm:text-sm text-zinc-300 font-light">
                      Certified Lossless Generation
                    </span>
                  </div>
                </div>

                {/* Circular Arrow Button (Matching the big circled arrow in reference) */}
                <div className="relative z-10 self-end sm:self-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d8b4fe] hover:bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(216,180,254,0.4)] group-hover:scale-105 group-hover:rotate-45 transition-all duration-300 cursor-pointer">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-black"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LOWER SPLIT ROW: Card 5 (Left) and Card 6 + 7 (Right Stack) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 flex-1 items-stretch">
                
                {/* CARD 5 (Lower Middle, ~7 cols): Diploma / Certificate Equivalent */}
                <div className="sm:col-span-7 h-full relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6 flex flex-col justify-between group shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                  {/* Subtle background preview */}
                  <Image
                    src="/hero-model.jpg"
                    alt="Verified Production IP"
                    fill
                    className="object-cover object-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

                  {/* Header Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      IP Protection
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">✓ Verified</span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 mt-auto pt-6">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase leading-snug">
                      Commercial IP Clearance & Royalty-Free Licensing
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 font-light mt-1.5">
                      Indemnified for global cinema, AAA games, and commercial campaigns.
                    </p>
                  </div>
                </div>

                {/* RIGHT STACK (~5 cols): Card 6 (Logo) and Card 7 (Dark Capsule) */}
                <div className="sm:col-span-5 h-full flex flex-col gap-4 sm:gap-5 justify-between">
                  
                  {/* CARD 6: Partner Logo Card ("International Dance Center" Equivalent) */}
                  <div className="flex-1 rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-[#241744] to-[#120a24] border border-purple-500/25 p-5 sm:p-6 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-[#d8b4fe] flex items-center justify-center text-black font-bold text-xs">
                        DF
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">CORE</span>
                    </div>
                    <div className="mt-auto pt-4">
                      <span className="text-xs sm:text-[13px] font-semibold text-white tracking-tight block">
                        OmniVision Network
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light block mt-0.5">
                        Global Diffusion Grid
                      </span>
                    </div>
                  </div>

                  {/* CARD 7: Dark Pill/Rectangle ("САНКТ-ПЕТЕРБУРГ" Equivalent) */}
                  <div className="h-[56px] sm:h-[62px] rounded-[20px] sm:rounded-[26px] bg-black border border-white/15 px-5 py-3 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.8)] shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">
                        SF • TOKYO • LONDON
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      0.8ms
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
