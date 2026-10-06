"use client";
import { useState } from "react";
import { CheckIcon } from "./Icons";
import {
  generateTransactionId,
  generateTicketId,
  getTicketPrice,
  updateDate,
  updateTime,
} from "@/lib/registration-helpers";
import { getSupabasePublic } from "@/lib/supabase-public";

// ── Validation patterns ────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{10}$/;

export default function RegisterForm({ eventName }) {
  const isHackathon = eventName === "Hackathon";

  // ── Form values ──────────────────────────────────────────
  const [values, setValues] = useState({
    teamName: "",
    college: "",
    leader: "",
    email: "",
    phone: "",
    whatsapp: "",
    member2: "",
    member3: "",
    member4: "",
    notes: "",
    terms: false,
    whatsappSame: true,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
    if (!PHONE_RE.test(values.phone.trim())) next.phone = "Please enter a valid 10-digit phone number.";
    if (!values.whatsappSame && !PHONE_RE.test(values.whatsapp.trim())) {
      next.whatsapp = "Please enter a valid 10-digit WhatsApp number.";
    }
    if (!values.member2.trim()) next.member2 = "Please enter a name.";
    if (!values.terms) next.terms = "You must agree to the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const ticket = isHackathon ? "Hackathon" : "Gameathon";
      const uuid = generateTransactionId();
      const date = updateDate();
      const timeApplication = updateTime();
      const ticketId = generateTicketId(uuid, date, ticket);
      const ticketPrice = getTicketPrice(ticket);

      const members = [
        String(values.member2).trim(),
        values.member3 ? String(values.member3).trim() : "",
        values.member4 ? String(values.member4).trim() : "",
      ];

      const teamData = {
        teamName: values.teamName.trim(),
        leaderName: values.leader.trim(),
        mobile: values.phone.trim(),
        whatsapp: values.whatsappSame ? values.phone.trim() : values.whatsapp.trim(),
        members,
        ticket,
        uuid,
        ticketId,
        date,
        timeApplication,
        timeUtr: "None",
        utr: "None",
        receiptID: "None",
        ticketPrice,
        paymentStatus: "UNDER_VERIFICATION",
      };

      // Secondary write to public.registration_extras (email, college, notes)
      // Await with timeout to prevent race condition with page navigation
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const insertPromise = getSupabasePublic()
          .from("registration_extras")
          .insert({
            uuid,
            ticket_id: ticketId,
            email: values.email.trim(),
            college: values.college.trim(),
            notes: values.notes.trim() || null,
          })
          .then(({ error }) => {
            if (error) {
              console.error("registration_extras insert failed:", error);
            }
          })
          .catch((err) => {
            console.error("registration_extras insert error:", err);
          });

        const timeoutPromise = new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });

        await Promise.race([insertPromise, timeoutPromise]);
      }

      sessionStorage.setItem("teamData", JSON.stringify(teamData));
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/registration/Payment_gate.html";
    } catch (err) {
      console.error("Registration redirect error:", err);
      setErrors({ _form: "An unexpected error occurred. Please try again." });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors._form && (
        <div
          className="mb-5 p-3.5 rounded-[10px] text-[13px] font-head"
          style={{
            background: "rgba(170,18,16,0.15)",
            border: "1px solid rgba(170,18,16,0.4)",
            color: "#e98a86",
          }}
        >
          {errors._form}
        </div>
      )}

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

      {/* Phone + WhatsApp */}
      <Field
        label="Phone Number *"
        type="tel"
        placeholder="10-digit mobile number"
        value={values.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
      />

      <div className="form-row mb-5">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={values.whatsappSame}
            onChange={(e) => update("whatsappSame", e.target.checked)}
            className="accent-brand-red-bright w-4 h-4"
          />
          <span className="font-head text-[11.5px] tracking-[0.12em] uppercase text-brand-rose">
            WhatsApp number same as phone
          </span>
        </label>
      </div>

      {!values.whatsappSame && (
        <Field
          label="WhatsApp Number *"
          type="tel"
          placeholder="10-digit WhatsApp number"
          value={values.whatsapp}
          onChange={(v) => update("whatsapp", v)}
          error={errors.whatsapp}
        />
      )}

      {/* Team members */}
      <div className="border-t border-dashed mt-1.5 pt-5" style={{ borderColor: "var(--color-line)" }}>
        <label className="font-head text-[11.5px] tracking-[0.12em] uppercase text-brand-rose block mb-3.5">
          Team Members
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
          <Field
            label="Team Member 2 *"
            placeholder="Full name"
            value={values.member2}
            onChange={(v) => update("member2", v)}
            error={errors.member2}
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

      {/* Notes */}
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

      {/* Terms checkbox */}
      <div className={`form-row mb-5 ${errors.terms ? "invalid" : ""}`}>
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={values.terms}
            onChange={(e) => update("terms", e.target.checked)}
            className="accent-brand-red-bright w-4 h-4 mt-0.5 flex-none"
          />
          <span className="text-[13px] text-brand-text-dim leading-relaxed">
            I have read and agree to the{" "}
            <strong className="text-brand-lav">Terms &amp; Conditions</strong>. I confirm the
            information provided is accurate.
          </span>
        </label>
        {errors.terms && (
          <div className="text-[12px] mt-1.5 ml-6.5 font-head" style={{ color: "#e98a86" }}>
            {errors.terms}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? "Redirecting to Payment…" : "Continue to Payment →"}
      </button>

      <div
        className="flex gap-2.5 py-3.5 px-4 rounded-[10px] border text-[12.5px] text-brand-text-dim mt-5.5"
        style={{ borderColor: "var(--color-line)", background: "rgba(225,214,233,0.04)" }}
      >
        <span className="flex-none">
          <CheckIcon />
        </span>
        <span>
          Your information is collected only for event coordination by DOT DevOps Team and will not
          be shared with third parties.
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
