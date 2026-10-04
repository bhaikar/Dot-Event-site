"use client";
import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { CheckIcon } from "./Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

export default function RegisterForm({ eventName }) {
  const isHackathon = eventName === "Hackathon";
  const [values, setValues] = useState({
    teamName: "",
    college: "",
    leader: "",
    email: "",
    phone: "",
    member2: "",
    member3: "",
    member4: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.teamName.trim()) next.teamName = "Please enter a name.";
    if (!values.college.trim()) next.college = "Please enter your institution.";
    if (!values.leader.trim()) next.leader = "Please enter a name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!PHONE_RE.test(values.phone.trim())) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // NOTE: no backend is wired up yet — this only simulates a submission.
    // Swap this block for a real API call / Supabase insert / email trigger
    // when the backend is ready.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-7">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-5.5 flex items-center justify-center"
          style={{
            background: "linear-gradient(150deg,var(--color-red-bright),var(--color-burgundy))",
            boxShadow: "0 0 40px var(--color-glow)",
          }}
        >
          <CheckIcon />
        </div>
        <h3 className="text-2xl uppercase mb-2.5">Registration Received</h3>
        <p className="text-brand-text-dim text-[14px] max-w-[340px] mx-auto mb-6">
          Thanks for registering for {eventName}. Our team will reach out with further details via
          email.
        </p>
        <Link href="/events" className="btn btn-ghost">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
        <Field
          label={isHackathon ? "Team Name *" : "Participant / Team Name *"}
          placeholder="e.g. Byte Busters"
          value={values.teamName}
          onChange={(v) => update("teamName", v)}
          error={errors.teamName}
        />
        <Field
          label="College / Institution *"
          placeholder="Your college name"
          value={values.college}
          onChange={(v) => update("college", v)}
          error={errors.college}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
        <Field
          label={isHackathon ? "Team Leader Name *" : "Leader Name *"}
          placeholder="Full name"
          value={values.leader}
          onChange={(v) => update("leader", v)}
          error={errors.leader}
        />
        <Field
          label="Email *"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
        />
      </div>
      <Field
        label="Phone Number *"
        type="tel"
        placeholder="10-digit mobile number"
        value={values.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
      />

      <div className="border-t border-dashed mt-1.5 pt-5" style={{ borderColor: "var(--color-line)" }}>
        <label className="font-head text-[11.5px] tracking-[0.12em] uppercase text-brand-rose block mb-3.5">
          Team Members (optional)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
          <Field
            label="Team Member 2"
            placeholder="Full name"
            value={values.member2}
            onChange={(v) => update("member2", v)}
          />
          <Field
            label="Team Member 3"
            placeholder="Full name"
            value={values.member3}
            onChange={(v) => update("member3", v)}
          />
        </div>
        <Field
          label="Team Member 4"
          placeholder="Full name"
          value={values.member4}
          onChange={(v) => update("member4", v)}
        />
      </div>

      <div className="form-row mb-5">
        <label className="block font-head text-[11.5px] tracking-[0.12em] uppercase text-brand-rose mb-2.5">
          {isHackathon
            ? "Anything else we should know? (optional)"
            : "Game / Track Preference (optional)"}
        </label>
        <textarea
          rows={3}
          placeholder={
            isHackathon
              ? "Prior hackathon experience, tech stack, etc."
              : "Preferred game title or track, if known."
          }
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit Registration →
      </button>

      <div
        className="flex gap-2.5 py-3.5 px-4 rounded-[10px] border text-[12.5px] text-brand-text-dim mt-5.5"
        style={{ borderColor: "var(--color-line)", background: "rgba(225,214,233,0.04)" }}
      >
        <span className="flex-none">
          <CheckIcon />
        </span>
        <span>
          Your information is collected only for event coordination by DOT DevOps Team and will
          not be shared with third parties.
        </span>
      </div>
    </form>
  );
}

function Field({ label, placeholder, value, onChange, error, type = "text" }) {
  return (
    <div className={`form-row mb-5 ${error ? "invalid" : ""}`}>
      <label className="block font-head text-[11.5px] tracking-[0.12em] uppercase text-brand-rose mb-2.5">
        {label}
      </label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <div className="text-[12px] mt-1.5 font-head" style={{ color: "#e98a86" }}>{error}</div>}
    </div>
  );
}
