# DreamFrame 3D — Next-Gen Creative AI & 3D Neural Studio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAssrar2007%2Fassrarweb)

A cinematic, modern web platform engineered with **Next.js 16**, **Three.js**, and hardware-accelerated **WebGL** featuring real-time 3D model generation, volumetric studio lighting, and smooth interactive controls.

---

## 🌟 Key Features

- **Interactive 3D GLB Model Studio (`ModelViewer3D`)**:
  - Full 360° orbital drag rotation and pinch/wheel zoom controls.
  - Multi-source studio lighting (Ambient, Key, Fill, and Rim illumination with floor shadows).
  - Dynamic shader rendering modes: **Wireframe**, **Clay Shaded**, and **Raytrace (RTX)**.
  - Automated turntable turntable rotation loop with timeline scrubbing.
- **Scroll-Driven Frame Animation**:
  - Seamless cinematic 150-frame sequence synchronized with page scroll.
- **Asymmetric Bento Grid Architecture**:
  - Glassmorphic card styling, responsive layout, dynamic metric counters, and hover micro-animations.
- **Dual Infinite Logo Marquees**:
  - Bi-directional continuous horizontal ticker with monochrome-to-color interactive transitions.

---

## 🚀 One-Click Deployment (Vercel)

Deploy your own copy of this project live to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAssrar2007%2Fassrarweb)

1. Click the **Deploy** button above.
2. Sign in with GitHub and select your repository: `Assrar2007/assrarweb`.
3. Click **Deploy** — Vercel will build and assign your free live HTTPS URL (e.g., `https://assrarweb.vercel.app`).

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build & start production server
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view the running app.

---

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack)
- **3D Graphics Engine**: [Three.js](https://threejs.org/) & `GLTFLoader` / `OrbitControls`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with modern Glassmorphism
- **Language**: TypeScript
