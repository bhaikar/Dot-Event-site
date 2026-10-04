import EventDetail from "@/components/EventDetail";
import { hackathonCfg } from "@/data/events";

export const metadata = {
  title: "Hackathon — DOT DevOps Team",
  description: hackathonCfg.desc,
};

export default function HackathonPage() {
  return <EventDetail cfg={hackathonCfg} />;
}
