import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery — DOT DevOps Team",
  description: "Moments, people and builds from DOT DevOps Team events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Visual Archive" title="GALLERY" sub="Moments. People. Builds." />
      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
