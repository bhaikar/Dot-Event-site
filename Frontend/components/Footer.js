import Link from "next/link";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "./Icons";

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
];

const eventLinks = [
  { href: "/events/hackathon", label: "Hackathon" },
  { href: "/events/gamethon", label: "Gamethon" },
  { href: "/events/hackathon/register", label: "Register — Hackathon" },
  { href: "/events/gamethon/register", label: "Register — Gamethon" },
];

const socials = [
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/devops_malnad/" },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/devops-team-mce/posts/?feedView=all",
  },
  { Icon: GithubIcon, label: "GitHub", href: "https://github.com/Devops-Malnad" },
  { Icon: MailIcon, label: "Email", href: "mailto:devopsteammalnad@gmail.com" },
];

const linkClass =
  "block w-fit text-[13.5px] text-brand-text-dim hover:text-brand-lav hover:translate-x-1 transition-all duration-200 mb-2.5 last:mb-0";

const headingClass =
  "font-head text-[11px] tracking-[0.14em] uppercase text-brand-rose block mb-4";

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t mt-10 pt-14 pb-8"
      style={{ borderColor: "var(--color-line)" }}
    >
      {/* soft glowing line on top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg,transparent,var(--color-red-bright),transparent)",
          opacity: 0.6,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex justify-between gap-10 flex-wrap mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-3.5 w-fit">
              <div
                className="w-[54px] h-[54px] rounded-[13px] flex items-center justify-center font-head font-bold text-[17px] text-white transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_28px_var(--color-red-bright)]"
                style={{
                  background:
                    "linear-gradient(150deg,var(--color-red-bright),var(--color-burgundy))",
                }}
              >
                DOT
              </div>
              <div className="flex flex-col leading-tight">
                <b className="font-head font-bold text-[18px] transition-colors duration-300 group-hover:text-brand-lav">
                  DOT DEVOPS TEAM
                </b>
                <span className="font-head text-[10.5px] tracking-[0.2em] text-brand-rose uppercase transition-all duration-300 group-hover:tracking-[0.28em]">
                  College Tech Club
                </span>
              </div>
            </Link>
            <p className="text-brand-text-dim text-[13.5px] mt-3 max-w-[280px] leading-relaxed">
              Build • Learn • Connect • Create. A student-run technical club building
              futuristic experiences through code, community and competition.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-14 flex-wrap">
            <div>
              <b className={headingClass}>Explore</b>
              {exploreLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <b className={headingClass}>Events</b>
              {eventLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,var(--color-line),transparent)",
          }}
        />

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center flex-wrap gap-4 pt-6 mt-6 border-t"
          style={{ borderColor: "var(--color-line)" }}
        >
          <p className="text-[12px] text-brand-rose">
            © 2026 DOT DevOps Team. All systems operational.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="w-9 h-9 rounded-[9px] border flex items-center justify-center hover:border-red-500 hover:bg-red-950/30 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(220,38,38,0.25)] transition-all duration-200"
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