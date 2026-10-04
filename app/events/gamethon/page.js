import EventDetail from "@/components/EventDetail";
import { gamethonCfg } from "@/data/events";

export const metadata = {
  title: "Gamethon — DOT DevOps Team",
  description: gamethonCfg.desc,
};

export default function GamethonPage() {
  return <EventDetail cfg={gamethonCfg} />;
}
