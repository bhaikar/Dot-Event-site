"use client";
import { useState } from "react";
import { galleryData, galleryFilters } from "@/data/gallery";
import { CloseIcon } from "./Icons";

export default function GalleryGrid() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

  const visible = filter === "all" ? galleryData : galleryData.filter((g) => g.cat === filter);

  return (
    <>
      <div className="flex gap-2.5 flex-wrap justify-center mb-11">
        {galleryFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-head text-xs tracking-[0.1em] uppercase py-2.5 px-4.5 rounded-full border transition-colors ${
              filter === f.key ? "text-brand-lav" : "text-brand-text-dim"
            }`}
            style={{
              borderColor: filter === f.key ? "var(--color-red-bright)" : "var(--color-line)",
              background: filter === f.key ? "rgba(170,18,16,0.1)" : "transparent",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="masonry">
        {visible.map((g) => (
          <div
            key={g.t}
            onClick={() => setActive(g)}
            className="masonry-item rounded-2xl overflow-hidden relative cursor-pointer border group"
            style={{ borderColor: "var(--color-line)" }}
          >
            <img
              src={g.src}
              alt={g.t}
              className="w-full object-cover"
              style={{ height: g.h }}
            />
            <div
              className="absolute left-0 right-0 bottom-0 p-3.5 font-head text-[11px] tracking-[0.08em] uppercase text-brand-lav opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(0deg, rgba(20,14,17,0.85), transparent)" }}
            >
              {g.t}
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center p-10"
          style={{ background: "rgba(15,10,12,0.94)", backdropFilter: "blur(10px)" }}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 w-[42px] h-[42px] rounded-[10px] border flex items-center justify-center"
            style={{ borderColor: "var(--color-line)" }}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <div className="max-w-[640px] w-full text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.t}
              className="w-full rounded-2xl object-cover"
              style={{ height: 320 }}
            />
            <p className="mt-4.5 font-head tracking-[0.08em] uppercase">{active.t}</p>
          </div>
        </div>
      )}
    </>
  );
}
