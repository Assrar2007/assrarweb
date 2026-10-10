"use client";

import { useState, useRef } from "react";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import LogoCarousel from "@/components/LogoCarousel";
import BentoGrid from "@/components/BentoGrid";
import ModelCreatorSection from "@/components/ModelCreatorSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [prompt, setPrompt] = useState(
    "Surreal open door in vibrant twilight flower meadow, pink clouds, floating islands, 8k cinematic masterpiece"
  );
  const [generating, setGenerating] = useState(false);
  const [generatedDone, setGeneratedDone] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setGeneratedDone(false);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedDone(true);
    }, 1200);
  };

  const presetPrompts = [
    "Surreal door in lavender flower meadow at twilight",
    "Floating islands with lush bonsai trees among pink clouds",
    "Bioluminescent dreamscape portal under crescent moon",
    "Futuristic iridescent glass architecture in floral landscape",
  ];

  return (
    <div className="relative w-full bg-black text-white selection:bg-purple-500/20 selection:text-white overflow-x-clip">
      {/* HERO SECTION - PINNED SCROLL-DRIVEN SEQUENCE */}
      <div
        ref={containerRef}
        className="relative h-[420vh] w-full bg-black"
      >
        {/* FULL-SCREEN STICKY VIEWPORT PINNED WHILE SCROLLING */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
          {/* CINEMATIC SCROLL-LINKED HTML5 CANVAS ANIMATION */}
          <ScrollCanvasSequence containerRef={containerRef} totalFrames={150} />

        {/* CINEMATIC DARK ATMOSPHERIC SHADOW/GRADIENT BEHIND LEFT TEXT */}
        {/* Strongest at 10–25%, fading out smoothly toward 45–50%, zero hard edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full z-[4]"
          aria-hidden="true"
        >
          {/* Directional gradient falloff: peak at 10-25%, vanishing by 48-50% */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.82) 15%, rgba(0, 0, 0, 0.68) 25%, rgba(0, 0, 0, 0.38) 36%, rgba(0, 0, 0, 0.12) 45%, rgba(0, 0, 0, 0) 50%)",
            }}
          />
          {/* Atmospheric soft radial blur centered behind the headline */}
          <div
            className="absolute top-[38%] left-[12%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.35) 55%, transparent 80%)",
            }}
          />
        </div>

        {/* TOP HEADER: CAPSULE NAV & CTA BUTTON */}
        <header className="relative z-50 w-full px-6 pt-6 sm:px-10 sm:pt-8 lg:px-14 flex items-center justify-between">
          {/* Left Capsule Nav */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Navigation Menu"
              className="group flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Orange icon badge */}
              <div className="w-4 h-4 rounded-full bg-[#ff551f] flex items-center justify-center p-[2px] shadow-[0_0_8px_rgba(255,85,31,0.5)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="w-2.5 h-2.5 text-black"
                >
                  <circle cx="12" cy="12" r="8" stroke="currentColor" />
                  <path d="M12 4v16" stroke="currentColor" />
                  <path d="M8 6c0 6 0 6 0 12" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 6c0 6 0 6 0 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Brand Title */}
              <span className="text-xs sm:text-[13px] font-normal tracking-tight text-white/90 group-hover:text-white">
                DreamFrame
              </span>

              {/* Minimal Hamburger */}
              <div className="flex flex-col gap-[3px] items-center justify-center w-3 pl-0.5">
                <span
                  className={`h-[1px] w-3 bg-white/80 rounded-full transition-transform duration-200 ${
                    menuOpen ? "rotate-45 translate-y-[4px]" : ""
                  }`}
                />
                <span
                  className={`h-[1px] w-3 bg-white/80 rounded-full transition-opacity duration-150 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-[1px] w-3 bg-white/80 rounded-full transition-transform duration-200 ${
                    menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute top-11 left-0 mt-2 w-56 rounded-2xl bg-black/90 border border-white/15 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-in fade-in duration-150">
                <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 px-3 py-1">
                  Studio
                </div>
                <div className="flex flex-col gap-0.5 text-xs font-normal">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setStudioOpen(true);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Prompt Canvas</span>
                    <span className="text-[10px] text-purple-300 font-medium">v3.2</span>
                  </button>
                  <a
                    href="#models"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    Neural Engines
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    Curated Archive
                  </a>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setStudioOpen(true);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-[#ff551f] hover:bg-[#ff551f]/10 transition-colors font-medium cursor-pointer"
                  >
                    Launch Studio
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Top CTA Button (as shown in reference screenshot) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStudioOpen(true)}
              className="flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-md text-white text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <span>Start Creating</span>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-black"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </header>

        {/* HERO MAIN BODY: LEFT CONTENT */}
        <main className="relative z-10 w-full flex-1 flex flex-col justify-between px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-2">
          {/* Top/Mid row: Left headline block positioned with pristine negative space */}
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-start">
            <div className="flex flex-col items-start space-y-3 sm:space-y-4 max-w-xl text-left">
              
              {/* Availability-style badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                <span className="text-[10px] text-purple-300">✦</span>
                <span className="text-[10px] sm:text-[10.5px] font-medium tracking-wider text-zinc-300 uppercase">
                  AI IMAGE GENERATOR
                </span>
              </div>

              {/* Eyebrow Text */}
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#e0c8ff]/90 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                SYNTHESIZE PHOTOREALISTIC
              </span>

              {/* Headline: Slightly bolder, clean white -> subtle lavender gradient + soft shadow/glow */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-bold tracking-[-0.03em] leading-[1.06]">
                <span className="bg-gradient-to-r from-white via-[#f8f5ff] to-[#d8b4fe] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(216,180,254,0.35)]">
                  AI VISUALS &
                  <br />
                  DIGITAL ART
                </span>
              </h1>

              {/* Sub-description with strong contrast & soft depth */}
              <p className="text-zinc-200/95 text-xs sm:text-[14px] leading-relaxed max-w-md font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] pt-1">
                DreamFrame empowers creators, designers, and studios to synthesize
                hyper-realistic imagery, surreal artwork, and production-grade assets in
                seconds.
              </p>
            </div>
          </div>

          {/* LOWER SECTION: OVERSIZED "DREAMFRAME" MAIN VISUAL */}
          {/* Centered horizontally, ~90vw wide, positioned at bottom, white/lavender gradient, pink glow & depth */}
          <div className="w-[90vw] max-w-[1550px] mx-auto text-center select-none pointer-events-none pb-2 sm:pb-3 flex flex-col items-center">
            <h2 className="text-[12.8vw] lg:text-[12.5vw] font-bold tracking-[-0.035em] leading-[0.88] whitespace-nowrap">
              <span className="bg-gradient-to-b from-white via-[#f3e8ff] to-[#d8b4fe] bg-clip-text text-transparent drop-shadow-[0_12px_40px_rgba(0,0,0,0.98)] drop-shadow-[0_0_40px_rgba(244,114,182,0.32)]">
                DREAMFRAME
              </span>
            </h2>

            {/* Cinematic subtle horizon light bar & sparkle flare beneath letters */}
            <div className="relative w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#d8b4fe]/60 to-transparent mt-2 sm:mt-3 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#f472b6,0_0_24px_#c084fc] blur-[0.5px]" />
              <div className="absolute w-24 h-1 bg-[#f472b6]/35 blur-sm" />
            </div>
          </div>
        </main>
      </div>
      </div>

      {/* SECTION 1: INFINITE LOGO CAROUSEL */}
      <LogoCarousel />

      {/* SECTION 2: BENTO GRID */}
      <BentoGrid />

      {/* SECTION 3: 3D MODEL CREATOR COCKPIT */}
      <ModelCreatorSection />

      {/* MINIMALIST STUDIO MODAL */}
      {studioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-white/10 p-6 space-y-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">
                  DreamFrame Studio
                </h3>
                <p className="text-xs text-zinc-500 font-light">
                  Neural Diffusion v3.2
                </p>
              </div>
              <button
                onClick={() => setStudioOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {/* Prompt Form */}
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-normal uppercase tracking-wider text-zinc-500 mb-1.5">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl bg-black border border-white/10 focus:border-white/30 p-3 text-xs text-zinc-200 placeholder-zinc-600 transition-colors resize-none outline-none font-light"
                  placeholder="Describe your vision..."
                />
              </div>

              {/* Preset Chips */}
              <div>
                <span className="text-[10px] font-normal uppercase tracking-wider text-zinc-600 block mb-1.5">
                  Presets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetPrompts.map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPrompt(sample)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setStudioOpen(false)}
                  className="px-3 py-1.5 text-xs font-light text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="px-5 py-1.5 rounded-full bg-[#ff551f] hover:bg-[#ff6835] text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {generating ? "Synthesizing..." : "Generate"}
                </button>
              </div>

              {/* Render feedback */}
              {generatedDone && (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-zinc-300 font-light text-center">
                  Generation simulated and saved to workspace.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
