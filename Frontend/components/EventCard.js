"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

/**
 * EventCard
 * Props: href, glyph, iconLabel, name, desc, tags, accent, big
 * New:   day    -> "5–6" or "7"
 *        month  -> "Nov"
 *        dateNote (optional) -> small text next to the date, e.g. "Two days"
 */
export default function EventCard({
  href,
  glyph,
  iconLabel,
  name,
  desc,
  tags,
  accent,
  big,
  day,
  month,
  dateNote,
}) {
  const glowRef = useRef(null);

  // Track the cursor so the glow follows it. The listener is attached to the
  // card's root element, so it works even if <Reveal> doesn't forward handlers.
  useEffect(() => {
    const card = glowRef.current?.parentElement;
    if (!card) return;

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    card.addEventListener("pointermove", onMove);
    return () => card.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Reveal
      as={Link}
      href={href}
      className={`group panel panel-corners relative overflow-hidden block transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-red-bright,#ff4a3d)] ${
        big ? "p-10" : "p-[30px]"
      }`}
      style={{ borderColor: accent }}
    >
      {/* Layer 1: soft spotlight that follows the cursor */}
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${accent}, transparent 70%)`,
        }}
      />

      {/* Layer 2: bright glow that only shows on the border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--color-brand-red-bright, #ff4a3d), transparent 65%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />

      {/* Ghost number */}
      <span
        aria-hidden="true"
        className="absolute -top-[30px] -right-5 font-head font-bold pointer-events-none select-none transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-1 motion-reduce:transform-none"
        style={{
          fontSize: 140,
          color: "transparent",
          WebkitTextStroke: "1px var(--color-line)",
          opacity: 0.5,
        }}
      >
        {glyph}
      </span>

      {/* Content sits above the glow layers */}
      <div className="relative z-10">
        <span className="label">{iconLabel}</span>
        <h3 className={`uppercase mb-4 mt-4 ${big ? "text-[38px]" : "text-[30px]"}`}>{name}</h3>

        {/* Date stub */}
        {day && (
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex flex-col items-center justify-center min-w-[68px] px-3 py-2 border transition-colors duration-300 group-hover:bg-white/5"
              style={{ borderColor: accent, background: "rgba(255,255,255,0.025)" }}
            >
              <span className="font-head text-[10px] tracking-[0.18em] uppercase text-brand-lav leading-none mb-1.5">
                {month}
              </span>
              <span className="font-head font-bold text-[26px] leading-none">{day}</span>
            </div>
            {dateNote && <span className="text-[13px] text-brand-text-dim">{dateNote}</span>}
          </div>
        )}

        <p className="text-brand-text-dim text-[14.5px] mb-5.5">{desc}</p>

        <div className="flex gap-2 flex-wrap mb-5">
          {tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between gap-2 font-head text-[12.5px] tracking-[0.12em] uppercase text-brand-lav border-t pt-4"
          style={{ borderColor: "var(--color-line)" }}
        >
          View Event
          <span className="text-brand-red-bright transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transform-none">
            →
          </span>
        </div>
      </div>
    </Reveal>
  );
}