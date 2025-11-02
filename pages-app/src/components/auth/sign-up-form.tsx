"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Claim your Pages handle</h1>
        <p className="text-sm text-slate-500">
          Full account creation is coming soon. Sign up to reserve your username and
          we&apos;ll notify you when the beta opens.
        </p>
      </div>

      <fieldset className="space-y-3">
        <label htmlFor="signup-username" className="text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          id="signup-username"
          name="username"
          required
          minLength={3}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="e.g. bookish-elli"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </fieldset>

      <fieldset className="space-y-3">
        <label htmlFor="signup-email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Notify me
      </button>

      {submitted && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thanks! We saved {username || "your"} username and will reach out via {email || "email"}
          when invites start rolling out.
        </p>
      )}
    </form>
  );
}
