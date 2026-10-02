import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand({ title, sub, ctaLabel, ctaHref }) {
  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <Reveal
          className="text-center rounded-[18px] py-[50px] px-[30px] border"
          style={{
            background: "linear-gradient(150deg, rgba(170,18,16,0.18), rgba(108,27,28,0.1))",
            borderColor: "var(--color-line-red)",
          }}
        >
          <h3 className="text-[clamp(24px,4vw,34px)] uppercase mb-3.5">{title}</h3>
          <p className="text-brand-text-dim mb-6 max-w-[440px] mx-auto">{sub}</p>
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
