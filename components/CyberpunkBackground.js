"use client";

import { useEffect, useRef } from "react";

export default function CyberpunkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Palette (brand theme) ----
    const COLORS = {
      cyan: "rgba(170, 18, 16, OPACITY)", // crimson
      magenta: "rgba(167, 122, 131, OPACITY)", // mauve
      grid: "rgba(170, 18, 16, OPACITY)", // crimson links
      gridFar: "rgba(108, 27, 28, OPACITY)", // maroon
      highlight: "rgba(225, 214, 233, OPACITY)", // lavender highlight
      bg: "#271d22",
    };

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
    // STATIC FALLBACK for prefers-reduced-motion: one frame, no loop.
    // ---------------------------------------------------------------
    function drawStaticFallback() {
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, width, height);
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.6
      );
      grad.addColorStop(0, "rgba(170,18,16,0.12)");
      grad.addColorStop(1, "rgba(108,27,28,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    if (reduceMotion) {
      drawStaticFallback();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    // ---------------------------------------------------------------
    // DIGITAL RAIN
    // ---------------------------------------------------------------
    const GLYPHS = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const FONT_SIZE = 16;
    let columns = [];

    function initRain() {
      const count = Math.floor(width / FONT_SIZE);
      columns = new Array(count).fill(0).map(() => ({
        y: Math.random() * -height,
        speed: 2 + Math.random() * 4,
        hue: Math.random() > 0.75 ? "magenta" : "cyan",
      }));
    }
    initRain();

    function drawRain() {
      // Full-canvas translucent fill = the trail-fade background layer.
      // Must run BEFORE any foreground content is drawn this frame, or
      // the fade dims whatever was drawn before it.
      ctx.fillStyle = "rgba(39, 29, 34, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px monospace`;
      columns.forEach((col, i) => {
        const x = i * FONT_SIZE;
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const isHead = Math.random() > 0.95;
        if (isHead) {
          ctx.fillStyle = COLORS.highlight.replace("OPACITY", "0.9");
        } else {
          const color = col.hue === "magenta" ? COLORS.magenta : COLORS.cyan;
          ctx.fillStyle = color.replace("OPACITY", "0.35");
        }
        ctx.fillText(char, x, col.y);

        col.y += col.speed;
        if (col.y > height + FONT_SIZE) {
          col.y = Math.random() * -100;
          col.speed = 2 + Math.random() * 4;
        }
      });
    }

    // ---------------------------------------------------------------
    // CURSOR TRACKING — shared by the node network and the glow
    // ---------------------------------------------------------------
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
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Release the cursor effects when the pointer leaves the viewport,
    // instead of leaving the glow/repulsion parked at the last position.
    function onMouseLeave() {
      cursorActive = false;
    }
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);

    function updateCursor() {
      if (!cursorActive) return;
      cursorX += (targetX - cursorX) * 0.08;
      cursorY += (targetY - cursorY) * 0.08;
    }

    // ---------------------------------------------------------------
    // INTERACTIVE NODE NETWORK
    // ---------------------------------------------------------------
    const LINK_DIST = 140;
    const CURSOR_RADIUS = 150;
    let nodes = [];

    function initNodes() {
      const count = Math.max(18, Math.min(45, Math.floor((width * height) / 45000)));
      nodes = new Array(count).fill(0).map(() => {
        const bx = Math.random() * width;
        const by = Math.random() * height;
        return { bx, by, x: bx, y: by, phase: Math.random() * Math.PI * 2 };
      });
    }
    initNodes();

    // One consolidated resize handler instead of three separate listeners.
    function handleResize() {
      resize();
      initRain();
      initNodes();
    }
    window.addEventListener("resize", handleResize);

    function drawNodeNetwork(t) {
      for (const n of nodes) {
        let tx = n.bx + Math.sin(t * 0.0003 + n.phase) * 6;
        let ty = n.by + Math.cos(t * 0.00035 + n.phase) * 6;

        if (cursorActive) {
          const dx = tx - cursorX;
          const dy = ty - cursorY;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < CURSOR_RADIUS) {
            const push = (1 - dist / CURSOR_RADIUS) * 45;
            tx += (dx / dist) * push;
            ty += (dy / dist) * push;
          }
        }
        n.x += (tx - n.x) * 0.08;
        n.y += (ty - n.y) * 0.08;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = COLORS.grid.replace(
              "OPACITY",
              ((1 - dist / LINK_DIST) * 0.35).toFixed(2)
            );
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dist = cursorActive ? Math.hypot(n.x - cursorX, n.y - cursorY) : Infinity;
        const near = dist < CURSOR_RADIUS;
        ctx.fillStyle = near
          ? COLORS.highlight.replace("OPACITY", "0.9")
          : COLORS.magenta.replace("OPACITY", "0.55");
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ---------------------------------------------------------------
    // CURSOR GLOW
    // ---------------------------------------------------------------
    function drawCursorGlow() {
      if (!cursorActive) return;
      const radius = 180;
      const glow = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, radius);
      glow.addColorStop(0, "rgba(170, 18, 16, 0.18)");
      glow.addColorStop(0.5, "rgba(108, 27, 28, 0.08)");
      glow.addColorStop(1, "rgba(108, 27, 28, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cursorX - radius, cursorY - radius, radius * 2, radius * 2);
    }

    // ---------------------------------------------------------------
    // OCCASIONAL GLITCH FLICKER
    // ---------------------------------------------------------------
    function maybeGlitch() {
      if (Math.random() > 0.985) {
        const sliceY = Math.random() * height;
        const sliceH = 4 + Math.random() * 20;
        const offset = (Math.random() - 0.5) * 30;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(canvas, 0, sliceY, width, sliceH, offset, sliceY, width, sliceH);
        ctx.restore();
      }
    }

    // ---------------------------------------------------------------
    // MAIN LOOP — pauses when tab is hidden, cleans up on unmount
    // ---------------------------------------------------------------
    let rafId = null;

    function frame(t) {
      updateCursor();
      // Background/trail layer first, then foreground content drawn
      // crisp on top of it (previously the network was dimmed by the
      // rain fade because it was drawn before the fill).
      drawRain();
      drawNodeNetwork(t || 0);
      drawCursorGlow();
      maybeGlitch();
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId === null) {
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, width, height);
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

    // ---------------------------------------------------------------
    // CLEANUP — critical in React: prevents leaked loops/listeners
    // across route changes, hot-reloads, and unmounts.
    // ---------------------------------------------------------------
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
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}