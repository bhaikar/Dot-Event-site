import Link from "next/link";
import Reveal from "./Reveal";

export default function SponsorStrip() {
  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-9">
          <span className="label">Powered By</span>
          <h2 className="text-[clamp(28px,4vw,42px)] uppercase mt-2.5">Our Sponsors &amp; Partners</h2>
        </div>
        <Reveal className="flex flex-wrap gap-4 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-1 basis-[150px] max-w-[180px] h-[76px] flex items-center justify-center rounded-xl border font-head text-[11px] tracking-[0.08em] uppercase text-brand-text-dim"
              style={{ borderColor: "var(--color-line)", background: "rgba(225,214,233,0.03)" }}
            >
              Sponsor {i}
            </div>
          ))}
        </Reveal>
        <div className="text-center mt-8">
          <Link href="/sponsors" className="btn btn-ghost">
            View All Sponsors →
          </Link>
        </div>
      </div>
    </section>
  );
}
