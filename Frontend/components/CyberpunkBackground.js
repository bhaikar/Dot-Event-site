"use client";

import { useEffect, useRef } from "react";

/*
  PIPELINE BOARD
  Hack.MCE is run by a DevOps team, so the background is a build pipeline
  drawn as a circuit board: copper-style traces on a blueprint grid, with
  small "builds" (bright packets) travelling along them and landing on
  deploy pads that pulse when a build arrives.

  Layers, back to front:
    1. CSS backdrop  – wine-black base, crimson bloom behind the mascot, vignette
    2. CSS dot grid  – 32px blueprint dots, fading out toward the headline
    3. Canvas        – traces, vias, pads, packets, cursor light (cleared every frame)
*/

const BACKDROP_STYLE = {
  background: [
    "radial-gradient(120% 100% at 50% 45%, rgba(0,0,0,0) 55%, rgba(8,4,6,0.65) 100%)",
    "radial-gradient(55% 70% at 77% 48%, rgba(170,18,16,0.34) 0%, rgba(108,27,28,0.14) 42%, rgba(108,27,28,0) 72%)",
    "radial-gradient(50% 55% at 6% 0%, rgba(108,27,28,0.30) 0%, rgba(108,27,28,0) 70%)",
    "radial-gradient(70% 45% at 30% 108%, rgba(167,122,131,0.08) 0%, rgba(167,122,131,0) 70%)",
    "linear-gradient(180deg, #1d1419 0%, #150e12 55%, #100a0e 100%)",
  ].join(", "),
};

// Dots sit exactly on the 32px grid the traces are snapped to, so every
// trace visibly runs through the dots.
const GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, rgba(225,214,233,0.16) 1px, rgba(225,214,233,0) 1.5px)",
  backgroundSize: "32px 32px",
  backgroundPosition: "-16px -16px",
  WebkitMaskImage: "linear-gradient(to right, transparent 12%, #000 72%)",
  maskImage: "linear-gradient(to right, transparent 12%, #000 72%)",
};

export default function CyberpunkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Palette (brand theme) ----
    const RGB = {
      crimson: [196, 28, 26],
      mauve: [167, 122, 131],
      maroon: [108, 27, 28],
      lavender: [225, 214, 233],
    };
    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    let width, height, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // ---------------------------------------------------------------
    // CURSOR TRACKING
    // ---------------------------------------------------------------
    const CURSOR_RADIUS = 170;
    let targetX = width / 2;
    let targetY = height / 2;
    let cursorX = targetX;
    let cursorY = targetY;
    let cursorActive = false;

    function onMouseMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorActive = true;
    }
    function onMouseLeave() {
      cursorActive = false;
    }
    function updateCursor() {
      if (!cursorActive) return;
      cursorX += (targetX - cursorX) * 0.08;
      cursorY += (targetY - cursorY) * 0.08;
    }

    // ---------------------------------------------------------------
    // ROUTES — orthogonal traces with 45° bends, snapped to a 32px grid.
    // Every route is: edge -> lead-in -> diagonal shift -> straight run -> pad
    // ---------------------------------------------------------------
    const G = 32;
    const snap = (v) => Math.round(v / G) * G;
    const rand = (a, b) => a + Math.random() * (b - a);

    let routes = [];
    let allPaths = null;
    let traceGradient = null;

    // Quieter on the left so the headline stays readable.
    function xStrength(x) {
      if (width < 900) return 0.6;
      const t = Math.min(1, Math.max(0, (x / width - 0.28) / 0.45));
      const s = t * t * (3 - 2 * t);
      return 0.35 + 0.65 * s;
    }

    function buildRoutes() {
      routes = [];
      const mobile = width < 900;
      const target = mobile ? 8 : Math.max(12, Math.min(26, Math.round(width / 70)));
      const usedRows = new Set();
      let guard = 0;

      while (routes.length < target && guard++ < target * 14) {
        const ey = snap(rand(G * 2, height - G * 2));
        const row = ey / G;
        if (usedRows.has(row) || usedRows.has(row - 1) || usedRows.has(row + 1)) continue;
        const ex = snap(mobile ? rand(width * 0.35, width - G) : rand(width * 0.5, width - G * 2));

        const kind = Math.random();
        let raw;
        if (kind < 0.6) {
          // enters from the left edge
          const sy = snap(rand(G * 2, height - G * 2));
          const d = Math.abs(ey - sy);
          const lo = G * 2;
          const hi = ex - d - G * 2;
          if (hi <= lo) continue;
          const x1 = snap(rand(lo, hi));
          raw = [[-G, sy], [x1, sy], [x1 + d, ey], [ex, ey]];
        } else {
          // drops in from the top or rises from the bottom
          const fromTop = kind < 0.8;
          const y1 = snap(rand(G * 3, height - G * 3));
          const d = Math.abs(ey - y1);
          const lo = G * 2;
          const hi = ex - d - G * 2;
          if (hi <= lo) continue;
          const sx = snap(rand(lo, hi));
          raw = [[sx, fromTop ? -G : height + G], [sx, y1], [sx + d, ey], [ex, ey]];
        }

        // drop zero-length segments
        const pts = raw.filter(
          (p, i) => i === 0 || p[0] !== raw[i - 1][0] || p[1] !== raw[i - 1][1]
        );
        if (pts.length < 2) continue;

        const lens = [];
        let total = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
          lens.push(l);
          total += l;
        }

        const path = new Path2D();
        path.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);

        const tint = Math.random() < 0.2 ? RGB.mauve : RGB.crimson;
        const packetCount = Math.random() < 0.5 ? 2 : 1;
        const packets = new Array(packetCount).fill(0).map(() => ({
          d: rand(0, total),
          speed: rand(1.4, 2.8),
          near: false,
        }));

        usedRows.add(row);
        routes.push({
          pts,
          lens,
          total,
          path,
          tint,
          packets,
          pulse: 0,
          // bend points get a small via marker
          vias: pts.slice(1, -1),
          pad: pts[pts.length - 1],
        });
      }

      allPaths = new Path2D();
      routes.forEach((r) => allPaths.addPath(r.path));

      traceGradient = ctx.createLinearGradient(0, 0, width, 0);
      traceGradient.addColorStop(0, rgba(RGB.crimson, 0.1));
      traceGradient.addColorStop(0.5, rgba(RGB.crimson, 0.2));
      traceGradient.addColorStop(1, rgba(RGB.crimson, 0.4));
    }
    buildRoutes();

    const head = { x: 0, y: 0 };
    const tmp = { x: 0, y: 0 };
    function posAt(r, d, out) {
      let rem = Math.max(0, Math.min(d, r.total));
      for (let i = 0; i < r.lens.length; i++) {
        if (rem <= r.lens[i] || i === r.lens.length - 1) {
          const t = r.lens[i] ? rem / r.lens[i] : 0;
          const a = r.pts[i];
          const b = r.pts[i + 1];
          out.x = a[0] + (b[0] - a[0]) * t;
          out.y = a[1] + (b[1] - a[1]) * t;
          return out;
        }
        rem -= r.lens[i];
      }
      return out;
    }

    // ---------------------------------------------------------------
    // DRAWING
    // ---------------------------------------------------------------
    function drawTraces() {
      ctx.lineWidth = 1.25;
      ctx.lineJoin = "round";
      ctx.strokeStyle = traceGradient;
      ctx.stroke(allPaths);
    }

    function drawVias() {
      ctx.lineWidth = 1;
      for (const r of routes) {
        for (const v of r.vias) {
          const s = xStrength(v[0]);
          ctx.strokeStyle = rgba(RGB.mauve, (0.55 * s).toFixed(3));
          ctx.strokeRect(v[0] - 2.5, v[1] - 2.5, 5, 5);
        }
      }
    }

    function drawPads() {
      for (const r of routes) {
        const [x, y] = r.pad;
        const s = xStrength(x);
        // idle pad: ring + dot
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = rgba(RGB.crimson, (0.7 * s).toFixed(3));
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(RGB.lavender, (0.55 * s).toFixed(3));
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        // arrival pulse: ring expands and fades
        if (r.pulse > 0) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = rgba(RGB.crimson, (0.6 * r.pulse * s).toFixed(3));
          ctx.beginPath();
          ctx.arc(x, y, 5 + (1 - r.pulse) * 22, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Traces light up around the cursor. One radial gradient is used as the
    // stroke colour, so the fade-out is free.
    function drawCursorTraces() {
      if (!cursorActive) return;
      const g = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, CURSOR_RADIUS * 1.4);
      g.addColorStop(0, rgba(RGB.lavender, 0.8));
      g.addColorStop(0.35, rgba(RGB.crimson, 0.75));
      g.addColorStop(1, rgba(RGB.crimson, 0));
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = g;
      ctx.stroke(allPaths);
    }

    const TAIL_STEPS = 8;
    const TAIL_STEP_PX = 9;
    function drawPackets() {
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      for (const r of routes) {
        for (const p of r.packets) {
          if (p.d < 0) continue;
          posAt(r, p.d, head);
          const s = xStrength(head.x);
          const boost = p.near ? 1.35 : 1;

          // tail: short segments with falling opacity
          let px = head.x;
          let py = head.y;
          for (let i = 1; i <= TAIL_STEPS; i++) {
            const dd = p.d - i * TAIL_STEP_PX;
            if (dd < 0) break;
            posAt(r, dd, tmp);
            const a = Math.min(1, (1 - i / (TAIL_STEPS + 1)) * 0.75 * s * boost);
            ctx.strokeStyle = rgba(r.tint, a.toFixed(3));
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(tmp.x, tmp.y);
            ctx.stroke();
            px = tmp.x;
            py = tmp.y;
          }

          // head: soft halo + bright core
          ctx.fillStyle = rgba(RGB.crimson, (0.2 * s * boost).toFixed(3));
          ctx.beginPath();
          ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = rgba(RGB.lavender, Math.min(1, 0.95 * s * boost).toFixed(3));
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawCursorGlow() {
      if (!cursorActive) return;
      const radius = 190;
      const glow = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, radius);
      glow.addColorStop(0, "rgba(196, 28, 26, 0.16)");
      glow.addColorStop(0.5, "rgba(108, 27, 28, 0.07)");
      glow.addColorStop(1, "rgba(108, 27, 28, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cursorX - radius, cursorY - radius, radius * 2, radius * 2);
    }

    function updateRoutes(dt) {
      for (const r of routes) {
        for (const p of r.packets) {
          posAt(r, Math.max(0, p.d), head);
          p.near =
            cursorActive && Math.hypot(head.x - cursorX, head.y - cursorY) < CURSOR_RADIUS;
          // builds speed up when you point at them
          p.d += p.speed * (p.near ? 2.4 : 1) * dt;
          if (p.d > r.total) {
            r.pulse = 1;
            p.d = -rand(20, r.total * 0.5); // wait, then ship the next build
            p.speed = rand(1.4, 2.8);
          }
        }
        if (r.pulse > 0) r.pulse = Math.max(0, r.pulse - 0.018 * dt);
      }
    }

    function drawScene(animated) {
      ctx.clearRect(0, 0, width, height);
      drawTraces();
      drawVias();
      if (animated) drawCursorTraces();
      drawPads();
      if (animated) {
        drawPackets();
        drawCursorGlow();
      }
    }

    // ---------------------------------------------------------------
    // RESIZE
    // ---------------------------------------------------------------
    function handleResize() {
      resize();
      buildRoutes();
      if (reduceMotion) drawScene(false);
    }
    window.addEventListener("resize", handleResize);

    // Reduced motion: draw the board once, no packets, no cursor effects.
    if (reduceMotion) {
      drawScene(false);
      return () => window.removeEventListener("resize", handleResize);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);

    // ---------------------------------------------------------------
    // MAIN LOOP — pauses when tab is hidden, cleans up on unmount
    // ---------------------------------------------------------------
    let rafId = null;
    let lastT = null;

    function frame(t) {
      // dt = 1 at 60fps, so speed feels the same on 120/144Hz screens
      const dt = lastT === null ? 1 : Math.min((t - lastT) / 16.67, 3);
      lastT = t;
      updateCursor();
      updateRoutes(dt);
      drawScene(true);
      rafId = requestAnimationFrame(frame);
    }
    function start() {
      if (rafId === null) {
        lastT = null;
        rafId = requestAnimationFrame(frame);
      }
    }
    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function onVisibilityChange() {
      document.hidden ? stop() : start();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    start();

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* DOM order = paint order: backdrop, grid, then canvas on top. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={BACKDROP_STYLE}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={GRID_STYLE}
      />
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />
    </>
  );
}