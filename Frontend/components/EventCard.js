"use client";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import Reveal from "./Reveal";

/**
 * HUD-style event card (SVG design). Takes an event config from data/events.js.
 * - Whole card links to the event details page (stretched link).
 * - "Register" button links to the registration page (sits above the stretched link).
 * - The SVG animations only run while the card is on-screen, and are paused
 *   when the visitor prefers reduced motion.
 *
 * The SVG is purely visual (aria-hidden). Real <Link>s are layered on top so
 * Next.js client navigation, keyboard focus and screen readers all still work.
 */

// Shrinks a font size so `text` fits in `maxW` (approximate glyph width = cw * size)
const fit = (text, maxW, size, cw = 0.6) =>
  Math.min(size, maxW / Math.max(text.length, 1) / cw);

// SVG <text> can't wrap, so wrap the description by character count
function wrapText(str, maxChars, maxLines) {
  const words = String(str || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    if (line && (line + " " + w).length > maxChars) {
      lines.push(line);
      line = w;
    } else {
      line = line ? line + " " + w : w;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const cut = lines.slice(0, maxLines);
    const last = cut[maxLines - 1];
    cut[maxLines - 1] = (last.length > maxChars - 1 ? last.slice(0, maxChars - 1) : last) + "…";
    return cut;
  }
  return lines;
}

const MONO = "'JetBrains Mono', monospace";

export default function EventCard({ event }) {
  const cardRef = useRef(null);
  const svgRef = useRef(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name) => `${name}-${uid}`;

  useEffect(() => {
    const card = cardRef.current;
    const svg = svgRef.current;
    if (!card || !svg || typeof svg.pauseAnimations !== "function") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      svg.pauseAnimations();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const detailsHref = `/events/${event.slug}`;
  const up = (v) => String(v ?? "").toUpperCase();

  const name = up(event.name);
  const code = up(event.code);
  const duration = up(event.duration);
  const mode = up(event.mode);
  const prize = String(event.prizePool ?? "");
  const dates = up(event.dates);
  const kickoff = up(event.kickoff);
  const status = `STATUS: ${up(event.status)}`;
  const descLines = wrapText(event.desc, 42, 6);

  // Tags row: widths follow the label length; stop when the row is full
  const tags = [];
  let tx = 0;
  for (const t of event.tags || []) {
    const label = up(t);
    const w = Math.round(label.length * 6.2 + 20);
    if (tx + w > 378) break;
    tags.push({ label, x: tx, w });
    tx += w + 8;
  }

  const pillW = Math.max(82, Math.round(duration.length * 6.1 + 28));

  return (
    <Reveal className="group relative transition-transform duration-300 hover:-translate-y-1.5">
      <div ref={cardRef} className="relative w-full mx-auto max-w-[470px]" style={{ aspectRatio: "470 / 700" }}>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 470 700"
          width="100%"
          height="100%"
          aria-hidden="true"
          focusable="false"
          style={{
            display: "block",
            background: "#040204",
            borderRadius: 28,
            fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            pointerEvents: "none",
          }}
        >
          <defs>
            <radialGradient id={id("cardBg")} cx="80%" cy="12%" r="75%">
              <stop offset="0%" stopColor="#4a040b" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#0c0608" stopOpacity="1" />
              <stop offset="100%" stopColor="#050305" stopOpacity="1" />
            </radialGradient>

            <radialGradient id={id("radarSweep")} cx="375" cy="85" r="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff1a38" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#8a0014" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8a0014" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={id("laser")} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff1a38" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff2642" stopOpacity="1" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff1a38" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={id("btn")} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e60026" />
              <stop offset="50%" stopColor="#b8001a" />
              <stop offset="100%" stopColor="#e60026" />
            </linearGradient>

            <filter id={id("crimsonGlow")} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id={id("softGlow")} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern id={id("dots")} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill="#ffffff" opacity="0.08" />
            </pattern>

            <clipPath id={id("clip")}>
              <rect x="22" y="22" width="426" height="656" rx="22" />
            </clipPath>
          </defs>

          {/* 1. AMBIENT PULSING BREATHING BACKLIGHT */}
          <rect x="18" y="18" width="434" height="664" rx="26" fill="none" stroke="#e60026" strokeWidth="14" opacity="0.22" filter={`url(#${id("crimsonGlow")})`}>
            <animate attributeName="opacity" values="0.12;0.4;0.12" dur="2.8s" repeatCount="indefinite" />
          </rect>

          {/* 2. TRAVELING PERIMETER LASER BEAM */}
          <rect x="20" y="20" width="430" height="660" rx="24" fill="none" stroke="#251218" strokeWidth="2.5" />
          <rect x="20" y="20" width="430" height="660" rx="24" fill="none" stroke={`url(#${id("laser")})`} strokeWidth="4.5" strokeDasharray="160 2000" filter={`url(#${id("softGlow")})`}>
            <animate attributeName="stroke-dashoffset" values="0; -2160" dur="4s" repeatCount="indefinite" />
          </rect>

          {/* 3. MAIN INNER CARD CONTAINER */}
          <rect x="22" y="22" width="426" height="656" rx="22" fill={`url(#${id("cardBg")})`} stroke="#381017" strokeWidth="1" />

          <g clipPath={`url(#${id("clip")})`}>
            <rect x="22" y="22" width="426" height="300" fill={`url(#${id("dots")})`} opacity="0.8" />

            {/* 4. SEARCHING RADAR WITH BLIP TARGETS */}
            <g opacity="0.55">
              <circle cx="375" cy="85" r="40" fill="none" stroke="#e60026" strokeWidth="0.9" strokeDasharray="3,3" />
              <circle cx="375" cy="85" r="85" fill="none" stroke="#e60026" strokeWidth="0.9" />
              <circle cx="375" cy="85" r="130" fill="none" stroke="#e60026" strokeWidth="0.9" />
              <circle cx="375" cy="85" r="175" fill="none" stroke="#e60026" strokeWidth="0.9" strokeDasharray="2,4" />
              <line x1="200" y1="85" x2="375" y2="85" stroke="#e60026" strokeWidth="0.8" />
              <line x1="375" y1="85" x2="375" y2="260" stroke="#e60026" strokeWidth="0.8" />
            </g>

            <path d="M 375 85 L 235 150 A 165 165 0 0 1 280 225 Z" fill={`url(#${id("radarSweep")})`}>
              <animateTransform attributeName="transform" type="rotate" from="0 375 85" to="360 375 85" dur="4.5s" repeatCount="indefinite" />
            </path>
            <circle cx="375" cy="85" r="3.5" fill="#ff4d66" filter={`url(#${id("softGlow")})`} />

            <circle cx="320" cy="140" r="3.5" fill="#ff2642" filter={`url(#${id("softGlow")})`}>
              <animate attributeName="opacity" values="0;1;0.8;0" dur="4.5s" repeatCount="indefinite" begin="1.2s" />
              <animate attributeName="r" values="2;5;2" dur="4.5s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle cx="280" cy="95" r="3" fill="#ff2642" filter={`url(#${id("softGlow")})`}>
              <animate attributeName="opacity" values="0;1;0.7;0" dur="4.5s" repeatCount="indefinite" begin="2.6s" />
              <animate attributeName="r" values="2;4.5;2" dur="4.5s" repeatCount="indefinite" begin="2.6s" />
            </circle>
          </g>

          {/* Top telemetry row */}
          <g transform="translate(46, 52)">
            <circle cx="8" cy="10" r="4.5" fill="#ff1a38" filter={`url(#${id("softGlow")})`}>
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="8" cy="10" r="8" fill="none" stroke="#ff4d64" strokeWidth="1.2">
              <animate attributeName="r" values="4;13" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text x="26" y="14" fill="#ff4d66" fontSize={fit(`LIVE PROTOCOL // ${code}`, 215, 11.5, 0.73)} fontWeight="700" fontFamily={MONO} letterSpacing="1.5">
              LIVE PROTOCOL // {code}
            </text>

            <g transform={`translate(${350 - pillW}, 0)`}>
              <rect x="0" y="0" width={pillW} height="22" rx="11" fill="#24070b" stroke="#e60026" strokeWidth="1" />
              <text x="14" y="15" fill="#ff7084" fontSize="9.5" fontWeight="700" fontFamily={MONO}>{duration}</text>
            </g>
          </g>

          {/* Title & prize pool */}
          <g transform="translate(46, 114)">
            <text x="0" y="24" fill="#ffffff" fontSize={fit(name, 195, 28, 0.7)} fontWeight="900" letterSpacing="-0.5">{name}</text>
            <text x="0" y="44" fill="#9e9198" fontSize={fit(mode, 225, 10, 0.65)} fontWeight="600" fontFamily={MONO} letterSpacing="0.5">{mode}</text>

            <g transform="translate(255, 0)">
              <text x="95" y="24" textAnchor="end" fill="#ffffff" fontSize={fit(prize, 105, 24, 0.62)} fontWeight="900" fontFamily={MONO}>{prize}</text>
              <text x="95" y="40" textAnchor="end" fill="#ff4d66" fontSize="9" fontWeight="700" fontFamily={MONO} letterSpacing="1">BOUNTY POOL</text>
            </g>
          </g>

          {/* Timeline box */}
          <g transform="translate(46, 185)">
            <rect x="0" y="0" width="378" height="62" rx="12" fill="#0d070b" stroke="#2c171e" strokeWidth="1" />

            <g transform="translate(18, 16)">
              <text x="0" y="11" fill="#756770" fontSize="9.5" fontWeight="600" fontFamily={MONO}>TIMELINE</text>
              <text x="0" y="30" fill="#ffffff" fontSize={fit(dates, 165, 12.5)} fontWeight="700" fontFamily={MONO}>{dates}</text>
            </g>

            <line x1="195" y1="12" x2="195" y2="50" stroke="#2c171e" strokeWidth="1" />

            <g transform="translate(210, 16)">
              <text x="0" y="11" fill="#756770" fontSize="9.5" fontWeight="600" fontFamily={MONO}>KICKOFF TIME</text>
              <text x="0" y="30" fill="#ff4d66" fontSize={fit(kickoff, 150, 12.5)} fontWeight="700" fontFamily={MONO}>{kickoff}</text>
            </g>
          </g>

          {/* 5. READ-ONLY BRIEF & SPECS */}
          <g transform="translate(46, 268)">
            <rect x="0" y="0" width="378" height="205" rx="14" fill="#090507" stroke="#2e0f15" strokeWidth="1.2" />

            <g transform="translate(16, 16)">
              <rect x="0" y="0" width="138" height="20" rx="5" fill="#1f090e" stroke="#4d0e19" strokeWidth="1" />
              <text x="8" y="14" fill="#ff4d66" fontSize="9.5" fontWeight="700" fontFamily={MONO} letterSpacing="0.5">EVENT BRIEF &amp; SPECS</text>
            </g>

            <text x="362" y="30" textAnchor="end" fill="#695b64" fontSize="9.5" fontFamily={MONO} letterSpacing="0.5">DIRECTIVE // 0x4F</text>

            <g transform="translate(16, 56)">
              {descLines.map((l, i) => (
                <text key={i} x="0" y={14 + i * 20} fill="#ece5e7" fontSize="12" fontFamily={MONO}>{l}</text>
              ))}
            </g>

            <line x1="16" y1="168" x2="362" y2="168" stroke="#1d0d12" strokeWidth="1" />
            <text x="16" y="188" fill="#695b64" fontSize={fit(status, 215, 10)} fontFamily={MONO}>{status}</text>
            <text x="362" y="188" textAnchor="end" fill="#ff4d66" fontSize="10" fontFamily={MONO}>BROADCAST ACTIVE</text>
          </g>

          {/* Tags row */}
          <g transform="translate(46, 494)">
            {tags.map((t) => (
              <g key={t.label} transform={`translate(${t.x}, 0)`}>
                <rect x="0" y="0" width={t.w} height="25" rx="6" fill="#140a0e" stroke="#2d151c" strokeWidth="1" />
                <text x="10" y="16" fill="#998d94" fontSize="10" fontFamily={MONO}>{t.label}</text>
              </g>
            ))}
          </g>

          {/* 6. ACTION BUTTON (visual only; the real link is layered on top) */}
          <g transform="translate(46, 538)">
            <rect x="0" y="0" width="378" height="48" rx="14" fill={`url(#${id("btn")})`} stroke="#ff4d66" strokeWidth="1.2" filter={`url(#${id("crimsonGlow")})`}>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="164" y="29" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="800" fontFamily={MONO} letterSpacing="1">REGISTER TEAM</text>
            <text x="248" y="29" fill="#ffffff" fontSize="14" fontWeight="900">
              →
              <animateTransform attributeName="transform" type="translate" values="0 0; 4 0; 0 0" dur="1.2s" repeatCount="indefinite" />
            </text>
          </g>

          {/* Base moving separator beam */}
          <g transform="translate(46, 612)">
            <rect x="0" y="0" width="378" height="2" rx="1" fill="#1a0b10" />
            <rect x="0" y="-1.5" width="120" height="5" rx="2.5" fill={`url(#${id("laser")})`} filter={`url(#${id("softGlow")})`}>
              <animate attributeName="x" values="-130; 378" dur="3.8s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>

        {/* Whole-card link → details page */}
        <Link
          href={detailsHref}
          className="absolute inset-0 z-20 rounded-[28px]"
          aria-label={`View ${event.name} details`}
        />

        {/* Register link, positioned exactly over the SVG button (46,538 → 378×48 in a 470×700 box) */}
        <Link
          href={event.registerHref}
          aria-label={`Register for ${event.name}`}
          className="absolute z-30 transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          style={{
            left: "9.787%",
            top: "76.857%",
            width: "80.426%",
            height: "6.857%",
            borderRadius: "3.7% / 29%",
          }}
        />
      </div>
    </Reveal>
  );
}