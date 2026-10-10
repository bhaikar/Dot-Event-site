"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] pt-[calc(16px+env(safe-area-inset-top,0px))]">
        <div
          className="max-w-[1240px] mx-auto px-5 h-[66px] flex items-center justify-between rounded-2xl backdrop-blur-xl transition-colors"
          style={{
            background: "rgba(39,29,34,0.72)",
            border: `1px solid ${scrolled ? "rgba(170,18,16,0.4)" : "var(--color-line)"}`,
          }}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/DotLogo.png"
              alt="DOT DevOps Team logo"
              width={38}
              height={38}
              priority
              className="h-[38px] w-[38px] object-contain"
            />
            <div className="flex flex-col leading-tight">
              <b className="font-head font-bold text-[14.5px] tracking-wide">DEVOPS TEAM</b>
              <span className="font-head text-[9.5px] tracking-[0.2em] text-brand-rose uppercase">
                Hack.MCE 6.0
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2.5 font-head text-[12.5px] tracking-[0.14em] uppercase rounded-lg transition-colors ${active ? "text-brand-lav" : "text-brand-text-dim hover:text-brand-lav hover:bg-white/5"
                    }`}
                >
                  {l.label}
                  {active && (
                    <span
                      className="absolute left-4 right-4 -bottom-px h-0.5 rounded-full"
                      style={{ background: "var(--color-red-bright)", boxShadow: "0 0 8px 1px var(--color-glow)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/events" className="btn btn-ghost hidden md:inline-flex !py-2.5 !px-4 !text-[11.5px]">
              Explore Events
            </Link>
            <Link
              href="/events/hackathon/register"
              className="btn btn-primary !py-2.5 !px-4 !text-[11.5px]"
            >
              Register
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-[9px] border flex flex-col items-center justify-center gap-1"
              style={{ borderColor: "var(--color-line)", background: "rgba(225,214,233,0.04)" }}
            >
              <span
                className="w-[18px] h-0.5 rounded-full bg-brand-lav transition-transform"
                style={open ? { transform: "translateY(6px) rotate(45deg)" } : {}}
              />
              <span
                className="w-[18px] h-0.5 rounded-full bg-brand-lav transition-opacity"
                style={open ? { opacity: 0 } : {}}
              />
              <span
                className="w-[18px] h-0.5 rounded-full bg-brand-lav transition-transform"
                style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : {}}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-1.5 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ background: "rgba(20,14,17,0.98)", backdropFilter: "blur(20px)" }}
      >
        {NAV_LINKS.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-head text-[26px] tracking-wide uppercase py-3.5 ${active ? "text-brand-lav" : "text-brand-text-dim"
                }`}
            >
              {l.label}
            </Link>
          );
        })}
        <Link
          href="/events/hackathon/register"
          onClick={() => setOpen(false)}
          className="btn btn-primary mt-5"
        >
          Register Now
        </Link>
      </div>
    </>
  );
}
