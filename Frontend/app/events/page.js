import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Events — DOT DevOps Team",
  description: "Explore Hackathon and Gamethon — the flagship events of DOT DevOps Team.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Flagship Programs" title="EVENTS" sub="Explore. Compete. Create." />
      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventCard
              big
              href="/events/hackathon"
              glyph="01"
              iconLabel="Build Event"
              name="Hackathon"
              desc="A high-intensity build sprint where developers design, code and ship working products under pressure."
              tags={["Build", "Code", "Collaborate"]}
              accent="rgba(170,18,16,0.35)"
            />
            <EventCard
              big
              href="/events/gamethon"
              glyph="02"
              iconLabel="Play Event"
              name="Gamethon"
              desc="A competitive arena for gamers and game-builders — create, play and compete for the top spot."
              tags={["Create", "Play", "Compete"]}
              accent="rgba(167,122,131,0.3)"
            />
          </div>
        </div>
      </section>
    </>
  );
}
