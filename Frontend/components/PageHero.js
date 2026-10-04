import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, sub, crumbs }) {
  return (
    <section className="pt-[150px] pb-[60px] text-center relative">
      <div className="max-w-[1240px] mx-auto px-6">
        {crumbs && (
          <div className="flex gap-2 justify-center items-center font-head text-[11px] tracking-[0.1em] uppercase text-brand-rose mb-3.5">
            {crumbs}
          </div>
        )}
        <div className="eyebrow-pill">
          <span className="dot" />
          {eyebrow}
        </div>
        <Reveal as="h1" className="text-[clamp(38px,7vw,64px)] uppercase mt-4.5 mb-2.5">
          {title}
        </Reveal>
        <Reveal
          as="p"
          delay={80}
          className="text-brand-text-dim text-[15px] max-w-[480px] mx-auto"
        >
          {sub}
        </Reveal>
      </div>
    </section>
  );
}
