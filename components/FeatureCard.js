import Reveal from "./Reveal";

export default function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay} className="panel panel-corners p-6">
      <div
        className="w-11 h-11 rounded-[10px] mb-4.5 flex items-center justify-center"
        style={{
          background: "linear-gradient(150deg,var(--color-burgundy),var(--color-red))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {icon}
      </div>
      <h4 className="text-[16px] uppercase tracking-wide mb-2.5">{title}</h4>
      <p className="text-[13.5px] text-brand-text-dim">{desc}</p>
    </Reveal>
  );
}
