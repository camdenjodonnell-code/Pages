"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const DEMO_EMAILS = [
  "alex@example.com",
  "brooke@example.com",
  "cam@example.com",
];

export default function SignInForm() {
  const [email, setEmail] = useState(DEMO_EMAILS[0]);
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("We couldn't sign you in. Try a demo email from the list below.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500">
          Pages is in demo mode. Sign in with one of the sample accounts below to
          explore the experience.
        </p>
      </div>

      <fieldset className="space-y-3">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </fieldset>

      <fieldset className="space-y-3">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </fieldset>

      {error && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">Demo accounts</p>
        <ul className="mt-2 space-y-1">
          {DEMO_EMAILS.map((demoEmail) => (
            <li key={demoEmail}>
              <button
                type="button"
                onClick={() => setEmail(demoEmail)}
                className="text-left font-medium text-slate-700 underline-offset-2 hover:underline"
              >
                {demoEmail}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
