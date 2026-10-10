import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { hackathonCfg, gamethonCfg } from "@/data/events";

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
            <EventCard event={hackathonCfg} />
            <EventCard event={gamethonCfg} />
          </div>
        </div>
      </section>
    </>
  );
}
