"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModelViewer3D from "./ModelViewer3D";

interface ModelAsset {
  id: string;
  name: string;
  polyCount: string;
  rating: string;
  spec: string;
  image: string;
  sub: string;
}

const modelsList: ModelAsset[] = [
  {
    id: "sentinel",
    name: "Cybernetic Sentinel",
    polyCount: "128k Poly",
    rating: "9.8/10",
    spec: "Watertight Quad Mesh",
    image: "/model-sentinel.jpg",
    sub: "Mechanical android bust with studio turntable lighting",
  },
  {
    id: "astral",
    name: "Astral Crystal Bonsai",
    polyCount: "94k Poly",
    rating: "9.4/10",
    spec: "Sub-D Level 3 Rigged",
    image: "/model-astral.jpg",
    sub: "Bioluminescent crystal foliage with PBR emission maps",
  },
  {
    id: "hypercar",
    name: "Aerodynamic Hypercar",
    polyCount: "240k Poly",
    rating: "9.9/10",
    spec: "Class-A NURBS Surface",
    image: "/model-hypercar.jpg",
    sub: "Ultra-luxury sports vehicle with procedural chrome shaders",
  },
  {
    id: "exoskeleton",
    name: "Dynasty Exoskeleton",
    polyCount: "165k Poly",
    rating: "8.9/10",
    spec: "LOD 0-4 Optimized",
    image: "/model-sentinel.jpg",
    sub: "Armored chassis with normal, roughness, and metallic maps",
  },
  {
    id: "relic",
    name: "The Ancient Relic",
    polyCount: "82k Poly",
    rating: "9.2/10",
    spec: "Photogrammetry 8K",
    image: "/model-astral.jpg",
    sub: "Floating crystalline artifact with procedural subsurface scattering",
  },
];

export default function ModelCreatorSection() {
  const [activeModel, setActiveModel] = useState<ModelAsset>(modelsList[0]);
  const [ambienceLevel, setAmbienceLevel] = useState<number>(70);
  const [temperature, setTemperature] = useState<number>(24);
  const [renderMode, setRenderMode] = useState<"wireframe" | "shaded" | "raytrace">("shaded");
  const [activeTab, setActiveTab] = useState<"meshes" | "materials">("meshes");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPlayingTurntable, setIsPlayingTurntable] = useState<boolean>(true);
  const [activeLightPreset, setActiveLightPreset] = useState<number>(1);

  // Turntable and rotation are managed in hardware-accelerated WebGL by ModelViewer3D

  const handleNextModel = () => {
    const currentIndex = modelsList.findIndex((m) => m.id === activeModel.id);
    const nextIndex = (currentIndex + 1) % modelsList.length;
    setActiveModel(modelsList[nextIndex]);
  };

  const handlePrevModel = () => {
    const currentIndex = modelsList.findIndex((m) => m.id === activeModel.id);
    const prevIndex = (currentIndex - 1 + modelsList.length) % modelsList.length;
    setActiveModel(modelsList[prevIndex]);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#eef1f5] text-zinc-800 overflow-hidden z-20">
      {/* Background Soft Pastel Ambient Illumination */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/40 via-pink-100/30 to-transparent blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 w-[650px] h-[500px] rounded-full bg-gradient-to-tl from-blue-200/35 via-rose-100/30 to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-300/80 bg-white/70 backdrop-blur-md shadow-sm mb-3">
            <span className="text-xs text-purple-600">✦</span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-700 uppercase">
              3D Model Creator Studio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Synthesize Photorealistic 3D Assets
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mt-2 font-light">
            Generate production-ready watertight meshes, quad topologies, and 8K PBR material maps directly from prompt concepts.
          </p>
        </div>

        {/* MAIN DASHBOARD CONTAINER - EXACT REPLICA OF REFERENCE GLASS COCKPIT */}
        <div className="relative w-full rounded-[32px] sm:rounded-[44px] bg-gradient-to-br from-[#dfe4ee]/95 via-[#eae3f2]/90 to-[#f6e7ef]/95 border border-white/90 shadow-[0_30px_90px_-20px_rgba(30,20,50,0.12),0_0_0_1px_rgba(255,255,255,0.85)] backdrop-blur-3xl p-4 sm:p-6 lg:p-7 flex flex-col gap-4 sm:gap-6">
          
          {/* ================= TOP NAVIGATION BAR ================= */}
          <div className="w-full flex items-center justify-between gap-4">
            {/* Left brand tag / indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wider uppercase text-[11px]">Studio v3.2 Active</span>
            </div>

            {/* Center Frosted Capsule Bar (matching reference top center capsule) */}
            <div className="hidden md:flex items-center gap-5 px-5 py-2 rounded-full bg-white/50 border border-white/70 shadow-sm backdrop-blur-md text-zinc-600">
              <button
                type="button"
                className="hover:text-purple-600 transition-colors cursor-pointer"
                title="Home View"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </button>
              <button
                type="button"
                className="hover:text-purple-600 transition-colors cursor-pointer"
                title="Wireframe Mesh"
                onClick={() => setRenderMode("wireframe")}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </button>
              <button
                type="button"
                className="hover:text-purple-600 transition-colors cursor-pointer"
                title="Lighting Presets"
                onClick={() => setAmbienceLevel((prev) => (prev >= 90 ? 40 : prev + 15))}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </button>
              <button
                type="button"
                className="hover:text-purple-600 transition-colors cursor-pointer"
                title="VR Spatial Mode"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 10a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4z" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="12" r="2" />
                </svg>
              </button>
              <button
                type="button"
                className="hover:text-purple-600 transition-colors cursor-pointer"
                title="Export Settings"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
            </div>

            {/* Right Search & User Avatar (matching reference top right) */}
            <div className="flex items-center gap-3">
              {/* Search Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 border border-white/70 shadow-sm backdrop-blur-md">
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="bg-transparent text-xs text-zinc-700 placeholder-zinc-400 outline-none w-24 sm:w-32"
                />
                <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Message / Export Button */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/50 border border-white/70 shadow-sm backdrop-blur-md flex items-center justify-center text-zinc-600 hover:text-purple-600 transition-colors"
                title="Export USDZ/GLTF"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>

              {/* User Avatar with Green Active Dot */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/80 shadow-sm">
                <Image
                  src="/hero-model.jpg"
                  alt="Creator Avatar"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>
            </div>
          </div>

          {/* ================= THREE-COLUMN INTERIOR COCKPIT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            
            {/* ---------------- LEFT COLUMN (Cards 1 & 2) ---------------- */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 justify-between">
              
              {/* CARD 1: Customizable Ambience (Circular Dial) */}
              <div className="rounded-[26px] bg-white/45 border border-white/70 p-5 backdrop-blur-xl shadow-[0_8px_24px_rgba(30,20,50,0.04)] flex flex-col items-center justify-between flex-1">
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-700 tracking-tight">
                    Customizable Ambience
                  </span>
                  <span className="text-[10px] font-mono text-purple-600 font-semibold bg-purple-100/60 px-1.5 py-0.5 rounded-full">
                    HDR 8K
                  </span>
                </div>

                {/* Circular Gauge / Dial showing 70% */}
                <div className="relative my-3 flex items-center justify-center">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background Track Arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      stroke="rgba(200, 205, 220, 0.45)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="216"
                      strokeDashoffset="36"
                      strokeLinecap="round"
                    />
                    {/* Active Progress Arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      stroke="url(#purplePinkGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="216"
                      strokeDashoffset={216 - (216 * ambienceLevel) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                    <defs>
                      <linearGradient id="purplePinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Left & Right Bulb Icons on the perimeter */}
                  <div className="absolute left-2 text-zinc-400">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute right-2 text-purple-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
                    </svg>
                  </div>

                  {/* Center Value */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-zinc-800 tracking-tight">
                      {ambienceLevel}%
                    </span>
                    <span className="text-[10px] text-zinc-400 font-light uppercase tracking-wider">
                      Intensity
                    </span>
                  </div>
                </div>

                {/* 4 Mode Dots below the dial */}
                <div className="flex items-center gap-3 my-2">
                  {[1, 2, 3, 4].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveLightPreset(idx);
                        setAmbienceLevel(idx === 1 ? 70 : idx === 2 ? 85 : idx === 3 ? 55 : 95);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        activeLightPreset === idx
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-110"
                          : "bg-white/60 text-zinc-500 hover:bg-white"
                      }`}
                    >
                      <span className="text-[10px] font-mono">{idx}</span>
                    </button>
                  ))}
                </div>

                {/* Link */}
                <button
                  type="button"
                  onClick={() => setAmbienceLevel((prev) => (prev >= 90 ? 50 : prev + 10))}
                  className="text-[11px] text-purple-600 hover:text-purple-700 font-medium tracking-tight mt-1 transition-colors"
                >
                  Calibrate Studio Lighting →
                </button>
              </div>

              {/* CARD 2: Set Temperature / Guidance (Dial + 3 Buttons) */}
              <div className="rounded-[26px] bg-white/45 border border-white/70 p-5 backdrop-blur-xl shadow-[0_8px_24px_rgba(30,20,50,0.04)] flex flex-col items-center justify-between flex-1">
                <div className="w-full flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-zinc-700 tracking-tight">
                    Set Temperature
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-white/60 px-1.5 py-0.5 rounded-full">
                    CFG Scale
                  </span>
                </div>

                {/* Circular Gauge showing 24°C / CFG */}
                <div className="relative my-2 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border-4 border-dashed border-zinc-200 flex items-center justify-center bg-white/60 shadow-inner relative">
                    {/* Active Accent Bead */}
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />

                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-black text-zinc-800 tracking-tight">
                        {temperature}°C
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-wider">
                        LATENT RES
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Buttons below: Cold / Wind / Sleep equivalent -> Wireframe / Shaded / Raytrace */}
                <div className="grid grid-cols-3 gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRenderMode("wireframe");
                      setTemperature(18);
                    }}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      renderMode === "wireframe"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                        : "bg-white/60 text-zinc-600 hover:bg-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">Wire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRenderMode("shaded");
                      setTemperature(24);
                    }}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      renderMode === "shaded"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                        : "bg-white/60 text-zinc-600 hover:bg-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" fillOpacity="0.4" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">Shaded</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRenderMode("raytrace");
                      setTemperature(32);
                    }}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      renderMode === "raytrace"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                        : "bg-white/60 text-zinc-600 hover:bg-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">RTX</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ---------------- CENTER MAIN 3D VIEWPORT ---------------- */}
            <div className="lg:col-span-6 relative rounded-[30px] sm:rounded-[36px] bg-gradient-to-b from-white/50 via-white/30 to-white/60 border border-white/90 p-6 sm:p-8 flex flex-col justify-between items-center overflow-hidden shadow-inner backdrop-blur-2xl min-h-[500px] sm:min-h-[580px]">
              
              {/* Studio Stage Ambient Floor Reflections */}
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-300/30 via-pink-200/20 to-sky-200/25 blur-[90px]" />
                {/* Stage Lighting Columns */}
                <div className="absolute inset-x-8 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent blur-md" />
              </div>

              {/* Top Watermark / Brand Header (matching "NETFLIX" position in reference) */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.3em] uppercase text-zinc-800 drop-shadow-sm">
                  DREAMFRAME 3D
                </span>
                <span className="text-[9.5px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                  Real-time Neural Engine v3.2
                </span>
              </div>

              {/* Center 3D GLB Model Viewport with Interactive Orbit & Turntable Controls */}
              <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-2">
                <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
                  <ModelViewer3D
                    modelUrl="/3d-model.glb"
                    autoRotate={isPlayingTurntable}
                    autoRotateSpeed={2.0}
                    renderMode={renderMode}
                    ambienceLevel={ambienceLevel}
                    onAngleChange={(angle) => setRotationAngle(angle)}
                    rotationOffset={rotationAngle}
                  />
                </div>
              </div>

              {/* Bottom Large Display Title & Subtitle (matching "360 POD" in reference) */}
              <div className="relative z-10 w-full flex flex-col items-center text-center mt-2">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                  360° MESH GENERATOR
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-500 font-light max-w-lg mt-2 leading-relaxed">
                  Synthesize high-fidelity 3D meshes like never before. The Neural 3D Engine redefines immersion with cutting-edge volumetric diffusion designed for next-gen interactive virtual production.
                </p>
              </div>

            </div>

            {/* ---------------- RIGHT COLUMN (Asset Queue & Player) ---------------- */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 justify-between">
              
              {/* TOP CARD: Library / Queue (matching "Shows | Movies" & 5 items in reference) */}
              <div className="rounded-[26px] bg-white/45 border border-white/70 p-4 sm:p-5 backdrop-blur-xl shadow-[0_8px_24px_rgba(30,20,50,0.04)] flex flex-col justify-between flex-1">
                
                {/* Segmented Tab Switcher (matching Shows | Movies) */}
                <div className="flex items-center justify-between pb-3 border-b border-white/60 mb-2">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveTab("meshes")}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        activeTab === "meshes" ? "text-purple-600 font-bold" : "text-zinc-400 hover:text-zinc-600"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                      <span>3D Meshes</span>
                    </button>
                    <span className="text-zinc-300">|</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("materials")}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        activeTab === "materials" ? "text-purple-600 font-bold" : "text-zinc-400 hover:text-zinc-600"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      </svg>
                      <span>Materials</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400">
                    {modelsList.length} Items
                  </span>
                </div>

                {/* List of 5 items with thumbnails & rating (matching reference 5 rows) */}
                <div className="flex flex-col gap-2 my-1">
                  {modelsList.map((item) => {
                    const isSelected = activeModel.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveModel(item)}
                        className={`group flex items-center justify-between px-2.5 py-2 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-white/90 border-purple-400/60 shadow-md shadow-purple-500/10 scale-[1.02]"
                            : "bg-white/40 hover:bg-white/70 border-white/50 hover:border-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Circular Thumbnail */}
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/80 shrink-0 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          </div>
                          <div className="flex flex-col min-w-0 text-left">
                            <span className="text-xs font-semibold text-zinc-800 tracking-tight truncate leading-tight">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-light truncate leading-tight mt-0.5">
                              {item.polyCount}
                            </span>
                          </div>
                        </div>

                        {/* Rating pill on the right */}
                        <div className="flex items-center gap-1 shrink-0 pl-1">
                          <span className="text-[10px] font-mono font-medium text-purple-600 bg-purple-50 border border-purple-200/60 px-1.5 py-0.5 rounded-md">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Dots below list (matching reference) */}
                <div className="flex items-center justify-center gap-1.5 pt-2">
                  <span className="w-5 h-1.5 rounded-full bg-purple-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                </div>
              </div>

              {/* BOTTOM CARD: Player / Turntable Controller (matching bottom player bar in reference) */}
              <div className="rounded-[22px] bg-white/45 border border-white/70 p-4 backdrop-blur-xl shadow-[0_8px_24px_rgba(30,20,50,0.04)] flex flex-col gap-2.5">
                
                {/* Active Model Name Header */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-zinc-800 tracking-tight">
                      {activeModel.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {activeModel.spec}
                    </span>
                  </div>

                  {/* 360 Turntable icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-purple-600 ${isPlayingTurntable ? "animate-spin" : ""}`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  </div>
                </div>

                {/* Scrubbing Waveform / Timeline Bar */}
                <div className="w-full flex items-center gap-2">
                  <div className="w-full h-1.5 rounded-full bg-zinc-200/70 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${(rotationAngle / 360) * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 shrink-0">
                    {Math.round((rotationAngle / 360) * 100)}%
                  </span>
                </div>

                {/* Turntable Control Buttons [⏮ ◀ ⏸ ▶ ⏭] */}
                <div className="flex items-center justify-center gap-4 text-zinc-600 pt-1">
                  {/* Prev Asset */}
                  <button
                    type="button"
                    onClick={handlePrevModel}
                    className="hover:text-purple-600 transition-colors cursor-pointer"
                    title="Previous Model"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="19 20 9 12 19 4 19 20" />
                      <line x1="5" y1="19" x2="5" y2="5" />
                    </svg>
                  </button>

                  {/* Rotate Step Backward */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingTurntable(false);
                      setRotationAngle((prev) => (prev - 15 + 360) % 360);
                    }}
                    className="hover:text-purple-600 transition-colors cursor-pointer"
                    title="Rotate -15°"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 19 2 12 11 5 11 19" />
                    </svg>
                  </button>

                  {/* Play / Pause Turntable */}
                  <button
                    type="button"
                    onClick={() => setIsPlayingTurntable(!isPlayingTurntable)}
                    className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-500/30 transition-all cursor-pointer"
                    title={isPlayingTurntable ? "Pause Turntable" : "Play Turntable"}
                  >
                    {isPlayingTurntable ? (
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  {/* Rotate Step Forward */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingTurntable(false);
                      setRotationAngle((prev) => (prev + 15) % 360);
                    }}
                    className="hover:text-purple-600 transition-colors cursor-pointer"
                    title="Rotate +15°"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 19 22 12 13 5 13 19" />
                    </svg>
                  </button>

                  {/* Next Asset */}
                  <button
                    type="button"
                    onClick={handleNextModel}
                    className="hover:text-purple-600 transition-colors cursor-pointer"
                    title="Next Model"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 4 15 12 5 20 5 4" />
                      <line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
