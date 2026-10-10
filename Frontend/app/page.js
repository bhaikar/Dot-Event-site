import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import SponsorStrip from "@/components/SponsorStrip";
import { hackathonCfg, gamethonCfg, EVENT_DATES_SHORT } from "@/data/events";
import mascot from "@/public/images/mascot.webp";

export default function HomePage() {
  return (
    <>
      <section className="min-h-[100svh] flex items-center pt-[110px] pb-[60px] relative overflow-hidden">
        <div
          className="hero-ring r1"
          style={{
            width: 420,
            height: 420,
            left: "calc(50% + 60px)",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          className="hero-ring r2"
          style={{
            width: 520,
            height: 520,
            left: "calc(50% + 60px)",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 items-center w-full relative z-10 text-center md:text-left">
          <div>
            <Reveal className="eyebrow-pill">
              <span className="dot" />
              Hack.MCE 6.0 — DOT DevOps Team
            </Reveal>
            <Reveal
              delay={80}
              as="h1"
              id="hero-title"
              className="text-[clamp(42px,7vw,78px)] uppercase my-5"
              style={{
                background:
                  "linear-gradient(180deg,#fdf6f8 0%, var(--color-lav) 55%, var(--color-rose) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              BUILD BOLDER
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg,var(--color-red-bright),var(--color-rose))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                TOGETHER
              </span>
            </Reveal>
            <Reveal delay={140} as="p" className="text-[17px] text-brand-text-dim max-w-[440px] mb-8 mx-auto md:mx-0">
              Ideas <span className="text-brand-rose mx-1.5">×</span> Code{" "}
              <span className="text-brand-rose mx-1.5">×</span> Collaborate{" "}
              <span className="text-brand-rose mx-1.5">×</span> Innovate — the technical club
              engineering the college&apos;s next generation of builders.
            </Reveal>
            <Reveal delay={200} className="flex gap-3.5 flex-wrap mb-9 justify-center md:justify-start">
              <Link href="/events" className="btn btn-primary">
                Explore Events →
              </Link>
              <Link href="/about" className="btn btn-ghost">
                About Us →
              </Link>
            </Reveal>
            <Reveal delay={260} className="flex gap-8 flex-wrap justify-center md:justify-start">
              <div className="flex flex-col gap-0.5">
                <b className="font-head text-2xl">02</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">
                  Flagship Events
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <b className="font-head text-2xl uppercase">{EVENT_DATES_SHORT}</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">
                  Event Dates
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <b className="font-head text-2xl">24H</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">
                  Hackathon Format
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative flex items-center justify-center min-h-[420px]">
            <div className="hud-chip hidden sm:flex" style={{ top: "6%", left: "2%" }}>
              <span className="ind" />
              SYS.ONLINE
            </div>
            <div className="hud-chip hidden sm:flex" style={{ bottom: "12%", right: "0%" }}>
              <span className="ind" />
              BUILD // LEARN // CREATE
            </div>
            <div className="hud-chip hidden sm:flex" style={{ top: "44%", right: "-4%" }}>
              <span className="ind" />
              UNIT_DOT-01
            </div>
            <div className="hero-mascot-wrap relative z-[2]">
              <Image
                src={mascot}
                alt="DOT DevOps Team mascot"
                priority
                className="w-[min(360px,72vw)] h-auto"
              />
            </div>
          </div>
        </div>
        <div className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-head text-[9px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="bar" />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-11">
            <div>
              <span className="label">What&apos;s Next</span>
              <h2 className="text-[clamp(28px,4vw,42px)] uppercase mt-2.5">Upcoming Events</h2>
            </div>
            <p className="text-brand-text-dim text-[15px] max-w-[480px]">
              Two flagship formats. One mission — push what a college tech club can build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
            <EventCard event={hackathonCfg} />

            <EventCard event={gamethonCfg} />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal className="panel panel-corners grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-12">
            <div>
              <span className="label">Who We Are</span>
              <h2 className="text-[clamp(24px,3.6vw,36px)] uppercase my-3.5">About DOT DevOps Team</h2>
              <p className="text-brand-text-dim text-[15px] max-w-[460px]">
                We&apos;re a student-run technical club building real skills through hackathons,
                workshops and community-driven projects — powered by curiosity and code.
              </p>
              <Link href="/about" className="btn btn-ghost mt-6.5 inline-flex">
                Know More →
              </Link>
            </div>
            <div className="flex gap-8 flex-wrap">
              <div>
                <b className="font-head text-2xl block">2022</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">Founded</span>
              </div>
              <div>
                <b className="font-head text-2xl block">10+</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">Workshops</span>
              </div>
              <div>
                <b className="font-head text-2xl block">02</b>
                <span className="text-[11px] tracking-[0.14em] uppercase text-brand-rose">
                  Flagship Events
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SponsorStrip />
    </>
  );
}
