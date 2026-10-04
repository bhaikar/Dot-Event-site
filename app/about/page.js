import Image from "next/image";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";
import Reveal from "@/components/Reveal";
import { BuildIcon, LearnIcon, CollabIcon, InnovateIcon, CheckIcon } from "@/components/Icons";
import mascot from "@/public/images/mascot.webp";

export const metadata = {
  title: "About Us — DOT DevOps Team",
  description: "Learn about DOT DevOps Team — a college technical club building the next generation of tech creators.",
};

const pillars = [
  { icon: <BuildIcon />, title: "Build", desc: "Ship real projects through hackathons and sprints, not just theory." },
  { icon: <LearnIcon />, title: "Learn", desc: "Workshops and sessions on the tools modern developers actually use." },
  { icon: <CollabIcon />, title: "Collaborate", desc: "Cross-discipline teams — coders, designers, gamers, creators." },
  { icon: <InnovateIcon />, title: "Innovate", desc: "Push ideas into working products at competitive, high-energy events." },
];

const team = ["Lead Organizer", "Tech Lead", "Design Lead", "Community Lead"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Club"
        title="ABOUT US"
        sub="Building the next generation of tech creators."
      />

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label">Who We Are</span>
              <h2 className="text-[clamp(26px,3.8vw,38px)] uppercase my-4">
                A Community Engineered For Builders
              </h2>
              <p className="text-brand-text-dim text-[15px]">
                DOT DevOps Team is a college technical club centered on technology, innovation and
                real-world development. We bring students together to learn, ship, and compete —
                through hackathons, workshops and hands-on collaboration that goes beyond the
                classroom.
              </p>
              <ul className="flex flex-col gap-3 mt-5">
                {[
                  "Hands-on technical workshops & sessions",
                  "Flagship events: Hackathon & Gamethon",
                  "A peer network of builders, gamers and creators",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 items-start text-[14px] text-brand-text-dim">
                    <span className="text-brand-red-bright mt-0.5 flex-none">
                      <CheckIcon />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel panel-corners p-8 relative overflow-hidden">
              <Image src={mascot} alt="DOT mascot" className="w-[70%] mx-auto h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-11">
            <span className="label">Our Pillars</span>
            <h2 className="text-[clamp(28px,4vw,42px)] uppercase mt-2.5">How We Operate</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5.5">
            {pillars.map((p, i) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} desc={p.desc} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal className="panel panel-corners text-center p-12">
            <span className="label justify-center">Our Mission</span>
            <h2 className="text-[clamp(26px,4vw,40px)] uppercase mt-4 mx-auto max-w-[720px]">
              Empowering students to build bolder — together, through code and community.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-11">
            <div>
              <span className="label">The People</span>
              <h2 className="text-[clamp(28px,4vw,42px)] uppercase mt-2.5">Our Team</h2>
            </div>
            <p className="text-brand-text-dim text-[15px] max-w-[480px]">
              Core organizing team — profiles to be finalized.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5.5">
            {team.map((role, i) => (
              <Reveal key={role} delay={i * 60} className="panel panel-corners p-5.5 text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-head text-xl text-white border"
                  style={{
                    background: "linear-gradient(150deg,var(--color-burgundy),var(--color-red))",
                    borderColor: "var(--color-line-red)",
                  }}
                >
                  DOT
                </div>
                <h4 className="text-[15px] uppercase mb-1">Name TBA</h4>
                <span className="text-[12px] text-brand-rose">{role}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
