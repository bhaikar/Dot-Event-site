import Link from "next/link";
import PageHero from "@/components/PageHero";
import RegisterForm from "@/components/RegisterForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Hackathon Registration — DOT DevOps Team",
  description: "Register your team for the DOT DevOps Team Hackathon.",
};

export default function HackathonRegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Hackathon // Registration"
        title="HACKATHON REGISTRATION"
        sub="Secure your spot for Hackathon. Fields marked * are required."
        crumbs={
          <>
            <Link href="/events/hackathon" className="hover:text-brand-lav">
              Hackathon
            </Link>
            <span>/ Register</span>
          </>
        }
      />
      <section className="pb-24">
        <div className="max-w-[640px] mx-auto px-6">
          <Reveal className="panel panel-corners p-9 sm:p-6">
            <RegisterForm eventName="Hackathon" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
