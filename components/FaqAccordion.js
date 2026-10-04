"use client";
import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="panel panel-corners py-2 px-7">
      {items.map((f, i) => (
        <div key={f.q} className={`faq-item border-b last:border-b-0 py-5 ${openIndex === i ? "open" : ""}`} style={{ borderColor: "var(--color-line)" }}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="faq-q flex justify-between items-center gap-4 w-full text-left"
          >
            <h4 className="text-[15.5px] font-semibold font-body normal-case">{f.q}</h4>
            <span className="faq-plus font-head text-xl text-brand-red-bright flex-none">+</span>
          </button>
          <div className="faq-a text-[13.5px] text-brand-text-dim">
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
