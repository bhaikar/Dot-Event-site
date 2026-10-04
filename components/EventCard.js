"use client";
import Link from "next/link";
import Reveal from "./Reveal";

export default function EventCard({ href, glyph, iconLabel, name, desc, tags, accent, big }) {
  return (
    <Reveal
      as={Link}
      href={href}
      className={`panel panel-corners relative overflow-hidden block transition-transform duration-300 hover:-translate-y-1.5 ${
        big ? "p-10" : "p-[30px]"
      }`}
      style={{ borderColor: accent }}
    >
      <span
        className="absolute -top-[30px] -right-5 font-head font-bold pointer-events-none select-none"
        style={{
          fontSize: 140,
          color: "transparent",
          WebkitTextStroke: "1px var(--color-line)",
          opacity: 0.5,
        }}
      >
        {glyph}
      </span>
      <span className="label">{iconLabel}</span>
      <h3 className={`uppercase mb-2.5 mt-4 ${big ? "text-[38px]" : "text-[30px]"}`}>{name}</h3>
      <p className="text-brand-text-dim text-[14.5px] mb-5.5">{desc}</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <div
        className="flex items-center justify-between gap-2 font-head text-[12.5px] tracking-[0.12em] uppercase text-brand-lav border-t pt-4 group"
        style={{ borderColor: "var(--color-line)" }}
      >
        View Event <span className="text-brand-red-bright transition-transform">→</span>
      </div>
    </Reveal>
  );
}
