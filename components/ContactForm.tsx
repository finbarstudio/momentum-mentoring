"use client";

import { useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New enquiry — Momentum Mentoring website");
    data.append("from_name", "Momentum Mentoring website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p className="contact__thanks">
        Thanks for reaching out — we'll be in touch soon.
      </p>
    );
  }

  return (
    <form className="contact__form" onSubmit={onSubmit}>
      <label className="field">
        <span>Your Name</span>
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label className="field">
        <span>Email Address</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span>Phone Number</span>
        <input type="tel" name="phone" autoComplete="tel" />
      </label>
      <label className="field">
        <span>Preferred Contact Method</span>
        <select name="preferred_contact_method" defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          <option>Email</option>
          <option>Phone</option>
          <option>Either</option>
        </select>
      </label>
      <label className="field field--full">
        <span>Short Message</span>
        <textarea name="message" rows={4} placeholder="Hello!" />
      </label>

      {/* honeypot for spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <button
        className="contact__submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
      {status === "error" && (
        <p className="contact__err">
          Something went wrong — please email us directly at
          info@momentummentoring.co.
        </p>
      )}
    </form>
  );
}
