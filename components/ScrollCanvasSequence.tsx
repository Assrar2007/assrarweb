"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollCanvasSequenceProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollCanvasSequence({
  totalFrames = 150,
  containerRef,
}: ScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Progressive High-Performance WebP Frame Loader
  useEffect(() => {
    let isCancelled = false;

    // Helper to get formatted frame path
    const getFrameUrl = (idx: number) => {
      const numStr = String(idx + 1).padStart(3, "0");
      return `/frames/frame-${numStr}.webp`;
    };

    // Load a single frame and return a promise
    const loadFrame = (idx: number): Promise<HTMLImageElement> => {
      if (imagesRef.current[idx] && loadedFlagsRef.current[idx]) {
        return Promise.resolve(imagesRef.current[idx]!);
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          loadedFlagsRef.current[idx] = true;
          if (idx === 0) {
            setFirstFrameReady(true);
          }
          resolve(img);
        };
        img.onerror = () => {
          // Fallback check: try .png if webp fails
          const fallbackImg = new Image();
          const numStr = String(idx + 1).padStart(3, "0");
          fallbackImg.src = `/frames/frame-${numStr}.png`;
          fallbackImg.onload = () => {
            if (isCancelled) return;
            imagesRef.current[idx] = fallbackImg;
            loadedFlagsRef.current[idx] = true;
            if (idx === 0) setFirstFrameReady(true);
            resolve(fallbackImg);
          };
          fallbackImg.onerror = () => {
            resolve(img);
          };
        };
      });
    };

    // 1. Immediately load frame 0 with highest priority so hero appears without delay
    loadFrame(0).then(() => {
      if (isCancelled) return;

      // 2. Concurrently preload all 150 WebP frames in order
      const queue = Array.from({ length: totalFrames }, (_, i) => i);
      const concurrency = 12; // 12 parallel requests for fast prefetch of ~200KB files
      let queueIdx = 0;

      const worker = async () => {
        while (queueIdx < queue.length && !isCancelled) {
          const idx = queue[queueIdx++];
          await loadFrame(idx);
        }
      };

      for (let i = 0; i < concurrency; i++) {
        worker();
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // Scroll tracking & Frame rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    // Helper to find closest available loaded frame to prevent any blank frames
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(targetIndex)));
      if (imagesRef.current[clamped] && loadedFlagsRef.current[clamped]) {
        return imagesRef.current[clamped];
      }

      // Search outward for nearest loaded frame
      for (let offset = 1; offset < totalFrames; offset++) {
        const lower = clamped - offset;
        if (lower >= 0 && imagesRef.current[lower] && loadedFlagsRef.current[lower]) {
          return imagesRef.current[lower];
        }
        const upper = clamped + offset;
        if (upper < totalFrames && imagesRef.current[upper] && loadedFlagsRef.current[upper]) {
          return imagesRef.current[upper];
        }
      }

      return imagesRef.current[0] || null;
    };

    // Resize canvas respecting devicePixelRatio (Retina support)
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        lastDrawnFrameRef.current = -1; // force redraw
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Calculate scroll progress directly linked to scroll position
    const handleScroll = () => {
      let progress = 0;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollRange =
          rect.height > window.innerHeight
            ? rect.height - window.innerHeight
            : window.innerHeight;
        progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      } else {
        const maxScroll = window.innerHeight;
        progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Persistent Animation Loop (requestAnimationFrame with smooth lerp)
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const prefersReduced = motionQuery.matches;

      if (prefersReduced) {
        currentFrameRef.current = target;
      } else {
        // Smooth cinematic interpolation (lerp factor 0.08)
        const lerpFactor = 0.08;
        const diff = target - currentFrameRef.current;
        if (Math.abs(diff) < 0.001) {
          currentFrameRef.current = target;
        } else {
          currentFrameRef.current += diff * lerpFactor;
        }
      }

      const frameToDrawIndex = Math.round(currentFrameRef.current);

      // Redraw whenever target frame changes or if canvas was resized
      if (frameToDrawIndex !== lastDrawnFrameRef.current || lastDrawnFrameRef.current === -1) {
        const img = getBestAvailableImage(frameToDrawIndex);
        if (img && img.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;

          // Object-fit: cover calculation
          const scale = Math.max(cw / iw, ch / ih);
          const drawW = iw * scale;
          const drawH = ih * scale;
          const drawX = (cw - drawW) / 2;
          const drawY = (ch - drawH) / 2;

          ctx.drawImage(img, 0, 0, iw, ih, drawX, drawY, drawW, drawH);
          lastDrawnFrameRef.current = frameToDrawIndex;
        }
      }

      // Continuous loop never stops
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalFrames, containerRef, firstFrameReady]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* Pinned HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover"
        style={{
          background: "#080603",
        }}
      />

      {/* Subtle top edge fade gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
