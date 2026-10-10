"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ModelViewer3DProps {
  modelUrl?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  renderMode?: "wireframe" | "shaded" | "raytrace";
  ambienceLevel?: number;
  onAngleChange?: (angle: number) => void;
  rotationOffset?: number;
}

export default function ModelViewer3D({
  modelUrl = "/3d-model.glb",
  autoRotate = true,
  autoRotateSpeed = 2.0,
  renderMode = "shaded",
  ambienceLevel = 70,
  onAngleChange,
  rotationOffset = 0,
}: ModelViewer3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // References across lifecycle
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelSceneRef = useRef<THREE.Group | null>(null);
  const originalMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material | THREE.Material[]>>(new Map());
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Apply render mode to all meshes
  const applyRenderMode = useCallback(
    (mode: "wireframe" | "shaded" | "raytrace") => {
      const model = modelSceneRef.current;
      if (!model) return;

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const original = originalMaterialsRef.current.get(mesh);

          if (mode === "wireframe") {
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x9333ea,
              wireframe: true,
            });
          } else if (mode === "shaded") {
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xe5e7eb,
              roughness: 0.45,
              metalness: 0.2,
            });
          } else if (mode === "raytrace" && original) {
            mesh.material = original;
          }
        }
      });
    },
    []
  );

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 3.8);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, (ambienceLevel / 100) * 1.6);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);
    dirLightRef.current = keyLight;

    // Soft cool fill light
    const fillLight = new THREE.DirectionalLight(0xd8b4fe, 1.6);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Cinematic warm rim backlight
    const rimLight = new THREE.DirectionalLight(0xf472b6, 2.2);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Subtle bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xffffff, 0.8);
    bounceLight.position.set(0, -2, 1);
    scene.add(bounceLight);

    // 5. Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enableZoom = true;
    controls.minDistance = 1.6;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 1.75;
    controlsRef.current = controls;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));

    // 6. Floor shadow mesh
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(20, 10, 40, 0.35)");
      gradient.addColorStop(0.5, "rgba(30, 15, 50, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    scene.add(shadowPlane);

    // 7. GLTF Loader
    const loader = new GLTFLoader();
    setLoading(true);

    const configureModel = (gltfModel: THREE.Group) => {
      // Compute bounding box to center & scale
      const box = new THREE.Box3().setFromObject(gltfModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Center model relative to its pivot
      gltfModel.position.set(-center.x, -center.y, -center.z);

      // Uniform scaling to fit comfortably in viewport
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredScale = 2.4 / (maxDim || 1);

      // Create root group for pivot rotation
      const rootGroup = new THREE.Group();
      rootGroup.scale.setScalar(desiredScale);
      rootGroup.add(gltfModel);
      scene.add(rootGroup);
      modelSceneRef.current = rootGroup;

      // Position floor shadow just under model
      shadowPlane.position.y = -size.y * desiredScale * 0.5 - 0.05;

      // Cache original materials
      originalMaterialsRef.current.clear();
      gltfModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          originalMaterialsRef.current.set(mesh, mesh.material);
        }
      });

      // Apply initial render mode
      applyRenderMode(renderMode);
      setLoading(false);
    };

    const targetUrl = modelUrl || "/3d-model.glb";

    loader.load(
      targetUrl,
      (gltf) => {
        configureModel(gltf.scene);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadProgress(percent);
        } else {
          setLoadProgress((prev) => Math.min(prev + 12, 95));
        }
      },
      (error) => {
        console.warn("Primary GLB load failed, trying alternative URL:", error);
        const fallbackUrl =
          targetUrl === "/3d-model.glb"
            ? encodeURI("/3D Model/a6a759c98f7f4250bf1d5b67189eabe0 (1).glb")
            : "/3d-model.glb";

        loader.load(
          fallbackUrl,
          (fallbackGltf) => {
            configureModel(fallbackGltf.scene);
          },
          undefined,
          (err2) => {
            console.error("Fallback GLB load error:", err2);
            setLoading(false);
          }
        );
      }
    );

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let lastReportedAngle = -1;
    let lastReportTime = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();

      // Emit camera azimuth angle for telemetry HUD (throttled to ~80ms)
      if (onAngleChange && time - lastReportTime > 80) {
        const rad = controls.getAzimuthalAngle();
        const deg = Math.round(((rad * 180) / Math.PI + 360) % 360);
        if (deg !== lastReportedAngle) {
          lastReportedAngle = deg;
          lastReportTime = time;
          onAngleChange(deg);
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, applyRenderMode]);

  // Handle autoRotate updates
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = autoRotateSpeed;
    }
  }, [autoRotate, autoRotateSpeed]);

  // Handle lighting ambience level updates dynamically
  useEffect(() => {
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = (ambienceLevel / 100) * 1.6;
    }
    if (dirLightRef.current) {
      dirLightRef.current.intensity = 1.4 + (ambienceLevel / 100) * 1.2;
    }
  }, [ambienceLevel]);

  // Handle Rotation Step Offsets cleanly using Spherical coordinates
  useEffect(() => {
    if (!controlsRef.current || !cameraRef.current || rotationOffset === undefined) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const currentRad = controls.getAzimuthalAngle();
    const currentDeg = Math.round(((currentRad * 180) / Math.PI + 360) % 360);

    // Only reposition if difference is significant (> 2 deg) to prevent feedback loops
    if (Math.abs(currentDeg - rotationOffset) > 2) {
      const angleRad = (rotationOffset * Math.PI) / 180;
      const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta = angleRad;
      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }
  }, [rotationOffset]);

  // Handle renderMode changes
  useEffect(() => {
    applyRenderMode(renderMode);
  }, [renderMode, applyRenderMode]);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[380px] sm:min-h-[440px] cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-3xl z-20">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
            <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-zinc-700 mt-3 tracking-wide">
            Loading Neural 3D Mesh...
          </span>
          <span className="text-[10px] font-mono text-purple-600 mt-0.5">
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Interactive Helper Overlay (Floating subtle pill badge) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 z-10 ${
          isInteracting ? "opacity-30" : "opacity-90"
        }`}
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white/90 shadow-sm backdrop-blur-md text-[11px] font-medium text-zinc-600">
          <svg className="w-3.5 h-3.5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Drag to Orbit 360° • Pinch to Zoom</span>
        </div>
      </div>
    </div>
  );
}
