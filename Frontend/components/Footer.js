import Link from "next/link";
import { InstagramIcon, LinkedinIcon, GithubIcon, DiscordIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t mt-10 pt-14 pb-8" style={{ borderColor: "var(--color-line)" }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex justify-between gap-10 flex-wrap mb-10">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div
                className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center font-head font-bold text-[13px] text-white"
                style={{ background: "linear-gradient(150deg,var(--color-red-bright),var(--color-burgundy))" }}
              >
                DOT
              </div>
              <div className="flex flex-col leading-tight">
                <b className="font-head font-bold text-[14.5px]">DOT DEVOPS TEAM</b>
                <span className="font-head text-[9.5px] tracking-[0.2em] text-brand-rose uppercase">
                  College Tech Club
                </span>
              </div>
            </Link>
            <p className="text-brand-text-dim text-[13.5px] mt-2.5 max-w-[280px]">
              Build • Learn • Connect • Create. A student-run technical club building futuristic
              experiences through code, community and competition.
            </p>
          </div>
          <div className="flex gap-14 flex-wrap">
            <div>
              <b className="font-head text-[11px] tracking-[0.14em] uppercase text-brand-rose block mb-3.5">
                Explore
              </b>
              <Link href="/about" className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5">
                About Us
              </Link>
              <Link href="/events" className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5">
                Events
              </Link>
              <Link href="/gallery" className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5">
                Gallery
              </Link>
              <Link href="/sponsors" className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav">
                Sponsors
              </Link>
            </div>
            <div>
              <b className="font-head text-[11px] tracking-[0.14em] uppercase text-brand-rose block mb-3.5">
                Events
              </b>
              <Link
                href="/events/hackathon"
                className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5"
              >
                Hackathon
              </Link>
              <Link
                href="/events/gamethon"
                className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5"
              >
                Gamethon
              </Link>
              <Link
                href="/events/hackathon/register"
                className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav mb-2.5"
              >
                Register — Hackathon
              </Link>
              <Link
                href="/events/gamethon/register"
                className="block text-[13.5px] text-brand-text-dim hover:text-brand-lav"
              >
                Register — Gamethon
              </Link>
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,var(--color-line),transparent)" }} />

        <div className="flex justify-between items-center flex-wrap gap-4 pt-6 mt-6 border-t" style={{ borderColor: "var(--color-line)" }}>
          <p className="text-[12px] text-brand-rose">© 2026 DOT DevOps Team. All systems operational.</p>
          <div className="flex gap-2.5">
            {[
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: LinkedinIcon, label: "LinkedIn" },
              { Icon: GithubIcon, label: "GitHub" },
              { Icon: DiscordIcon, label: "Discord" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                title={label}
                className="w-9 h-9 rounded-[9px] border flex items-center justify-center hover:border-red-500 hover:bg-red-950/30 transition-colors"
                style={{ borderColor: "var(--color-line)" }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
