import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Sponsors — DOT DevOps Team",
  description: "Meet the sponsors and partners powering DOT DevOps Team events.",
};

function SponsorBox({ label, big }) {
  return (
    <div
      className={`rounded-2xl border flex items-center justify-center text-center font-head text-[11px] tracking-[0.08em] uppercase text-brand-text-dim transition-colors hover:border-brand-rose ${
        big ? "h-[140px] text-xs" : "h-[110px]"
      }`}
      style={{ borderColor: "var(--color-line)", background: "rgba(225,214,233,0.03)" }}
    >
      {label}
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Backers"
        title="OUR SPONSORS"
        sub="Powered by people who believe in innovation."
      />
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal className="mb-12">
            <h3 className="font-head text-[13px] tracking-[0.2em] uppercase text-brand-rose text-center mb-5">
              Title Sponsor
            </h3>
            <div className="max-w-[400px] mx-auto">
              <SponsorBox big label="Title Sponsor Slot — TBA" />
            </div>
          </Reveal>

          <Reveal className="mb-12">
            <h3 className="font-head text-[13px] tracking-[0.2em] uppercase text-brand-rose text-center mb-5">
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4.5">
              <SponsorBox label="Gold Sponsor — TBA" />
              <SponsorBox label="Gold Sponsor — TBA" />
              <SponsorBox label="Gold Sponsor — TBA" />
            </div>
          </Reveal>

          <Reveal className="mb-12">
            <h3 className="font-head text-[13px] tracking-[0.2em] uppercase text-brand-rose text-center mb-5">
              Silver Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4.5">
              <SponsorBox label="Silver — TBA" />
              <SponsorBox label="Silver — TBA" />
              <SponsorBox label="Silver — TBA" />
              <SponsorBox label="Silver — TBA" />
            </div>
          </Reveal>

          <Reveal className="mb-8">
            <h3 className="font-head text-[13px] tracking-[0.2em] uppercase text-brand-rose text-center mb-5">
              Partners
            </h3>
            <div className="grid grid-cols-2 gap-4.5">
              <SponsorBox label="Partner — TBA" />
              <SponsorBox label="Partner — TBA" />
            </div>
          </Reveal>

          <p className="text-center text-brand-rose text-[12.5px]">
            Sponsor names will be added here as partnerships are confirmed.
          </p>
        </div>
      </section>

      <CtaBand
        title="Become A Sponsor"
        sub="Partner with DOT DevOps Team and put your brand in front of the college's most driven builders, gamers and creators."
        ctaLabel="Partner With Us →"
        ctaHref="/sponsors"
      />
    </>
  );
}
