import Link from "next/link";

import SignInForm from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16">
      <div className="w-full max-w-xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ? Back to Pages
        </Link>
        <SignInForm />
        <p className="text-center text-sm text-slate-500">
          New here?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-slate-800 underline-offset-2 hover:underline"
          >
            Join the waitlist
          </Link>
        </p>
      </div>
    </div>
  );
}
