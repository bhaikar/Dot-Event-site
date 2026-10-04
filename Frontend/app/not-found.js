import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-[150px] pb-[60px] text-center">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="eyebrow-pill">
          <span className="dot" />
          404
        </div>
        <h1 className="text-[clamp(38px,7vw,64px)] uppercase mt-4.5 mb-2.5">SIGNAL LOST</h1>
        <p className="text-brand-text-dim text-[15px] max-w-[480px] mx-auto">
          This route doesn&apos;t exist in the DOT DevOps Team system.
        </p>
        <div className="mt-7.5">
          <Link href="/" className="btn btn-primary">
            Return Home →
          </Link>
        </div>
      </div>
    </section>
  );
}
