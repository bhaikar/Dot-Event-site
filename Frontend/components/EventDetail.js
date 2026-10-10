import Link from "next/link";
import Reveal from "./Reveal";
import CtaBand from "./CtaBand";
import FaqAccordion from "./FaqAccordion";
import { BuildIcon, CheckIcon } from "./Icons";

export default function EventDetail({ cfg }) {
  return (
    <>
      <section className="pt-[150px] pb-10">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex gap-2 font-head text-[11px] tracking-[0.1em] uppercase text-brand-rose mb-3.5">
            <Link href="/events" className="hover:text-brand-lav">
              Events
            </Link>
            <span>/ {cfg.name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <Reveal className="eyebrow-pill">
                <span className="dot" />
                {cfg.tag}
              </Reveal>
              <Reveal as="h1" delay={80} className="text-[clamp(44px,8vw,84px)] uppercase my-3.5">
                {cfg.name}
              </Reveal>
              <Reveal as="p" delay={140} className="text-brand-text-dim text-[15px] max-w-[520px]">
                {cfg.desc}
              </Reveal>
              <Reveal delay={200} className="flex gap-3.5 flex-wrap mt-7">
                <Link href={cfg.registerHref} className="btn btn-primary">
                  Register Now →
                </Link>
                <a href="#events-about" className="btn btn-ghost">
                  Learn More
                </a>
              </Reveal>
            </div>
            <Reveal delay={100} className="panel panel-corners p-6.5 flex flex-col gap-4.5">
              <InfoRow label="Dates" value={cfg.dates} />
              <InfoRow label="Kickoff" value={cfg.kickoff} />
              <InfoRow label="Format" value={cfg.format} />
              <InfoRow label="Team Size" value={cfg.teamSize} />
              <InfoRow label="Mode" value={cfg.mode} />
              <InfoRow label="Prize Pool" value={cfg.prizePool} last />
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-head text-[11px] tracking-[0.1em] uppercase text-brand-rose">
                  Status
                </span>
                <span className="status-badge">
                  <span className="ind" />
                  {cfg.status}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section n="01" title={`About The ${cfg.name}`} id="events-about">
        <p className="text-brand-text-dim text-[15px] max-w-[760px]">{cfg.about}</p>
      </Section>

      <Section n="02" title={cfg.formatSectionTitle}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cfg.formatCards.map((c) => (
            <Reveal key={c.t} className="panel panel-corners p-6">
              <div
                className="w-11 h-11 rounded-[10px] mb-4.5 flex items-center justify-center"
                style={{ background: "linear-gradient(150deg,var(--color-burgundy),var(--color-red))" }}
              >
                <BuildIcon />
              </div>
              <h4 className="text-[16px] uppercase mb-2.5">{c.t}</h4>
              <p className="text-[13.5px] text-brand-text-dim">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section n="03" title="Rules & Guidelines">
        <Reveal className="panel panel-corners">
          <ul className="flex flex-col gap-3.5">
            {cfg.rules.map((r, i) => (
              <li key={r} className="flex gap-3.5 py-4 px-4.5 text-[14px] text-brand-text-dim items-start">
                <b className="font-head text-[13px] text-brand-lav min-w-[26px]">
                  {String(i + 1).padStart(2, "0")}
                </b>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section n="04" title="Timeline">
        <Reveal className="panel panel-corners px-7 py-2">
          <div className="flex flex-col">
            {cfg.timeline.map((t, i) => (
              <div
                key={t.title}
                className={`grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-5 py-5 relative ${
                  i !== cfg.timeline.length - 1 ? "border-b" : ""
                }`}
                style={{ borderColor: "var(--color-line)" }}
              >
                <b className="font-head text-[13px] text-brand-rose tracking-wide">{t.time}</b>
                <div>
                  <h4 className="text-[16px] uppercase mb-1.5">{t.title}</h4>
                  <p className="text-brand-text-dim text-[13.5px]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section n="05" title="Prizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Reveal
            className="panel panel-corners text-center p-7"
            style={{
              borderColor: "var(--color-line-red)",
              background: "linear-gradient(160deg, rgba(170,18,16,0.16), rgba(39,29,34,0.6))",
            }}
          >
            <div className="font-head text-xs tracking-[0.2em] text-brand-rose uppercase mb-3">Winner</div>
            <div className="font-head text-2xl mb-2">Prize TBA</div>
            <p className="text-brand-text-dim text-[12.5px]">Details announced soon</p>
          </Reveal>
          <Reveal className="panel panel-corners text-center p-7">
            <div className="font-head text-xs tracking-[0.2em] text-brand-rose uppercase mb-3">Runner Up</div>
            <div className="font-head text-2xl mb-2">Prize TBA</div>
            <p className="text-brand-text-dim text-[12.5px]">Details announced soon</p>
          </Reveal>
          <Reveal className="panel panel-corners text-center p-7">
            <div className="font-head text-xs tracking-[0.2em] text-brand-rose uppercase mb-3">
              Special Mention
            </div>
            <div className="font-head text-2xl mb-2">Prize TBA</div>
            <p className="text-brand-text-dim text-[12.5px]">Details announced soon</p>
          </Reveal>
        </div>
      </Section>

      <Section n="06" title="Eligibility">
        <Reveal className="panel panel-corners p-7">
          <ul className="flex flex-col gap-3">
            {cfg.eligibility.map((e) => (
              <li key={e} className="flex gap-2.5 items-start text-[14px] text-brand-text-dim">
                <span className="text-brand-red-bright mt-0.5 flex-none">
                  <CheckIcon />
                </span>
                {e}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section n="07" title="FAQ">
        <FaqAccordion items={cfg.faq} />
      </Section>

      <CtaBand
        title={`Ready To ${cfg.ctaVerb}?`}
        sub={`Secure your spot for ${cfg.name} — registration takes less than two minutes.`}
        ctaLabel="Register Now →"
        ctaHref={cfg.registerHref}
      />
    </>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div
      className={`flex justify-between items-center text-[13.5px] ${!last ? "pb-3.5 border-b" : ""}`}
      style={!last ? { borderColor: "var(--color-line)" } : {}}
    >
      <span className="font-head text-[11px] tracking-[0.1em] uppercase text-brand-rose">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Section({ n, title, id, children }) {
  return (
    <section id={id} className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <h2 className="text-[clamp(24px,3.4vw,34px)] uppercase mb-6.5">
          <span className="font-head text-brand-red-bright text-[13px] mr-2.5">{n}</span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
