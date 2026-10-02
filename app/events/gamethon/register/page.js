import Link from "next/link";
import PageHero from "@/components/PageHero";
import RegisterForm from "@/components/RegisterForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Gamethon Registration — DOT DevOps Team",
  description: "Register your team for the DOT DevOps Team Gamethon.",
};

export default function GamethonRegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Gamethon // Registration"
        title="GAMETHON REGISTRATION"
        sub="Secure your spot for Gamethon. Fields marked * are required."
        crumbs={
          <>
            <Link href="/events/gamethon" className="hover:text-brand-lav">
              Gamethon
            </Link>
            <span>/ Register</span>
          </>
        }
      />
      <section className="pb-24">
        <div className="max-w-[640px] mx-auto px-6">
          <Reveal className="panel panel-corners p-9 sm:p-6">
            <RegisterForm eventName="Gamethon" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
