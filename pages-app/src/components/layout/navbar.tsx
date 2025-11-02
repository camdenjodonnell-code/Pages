import Link from "next/link";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import SignOutButton from "@/components/layout/sign-out-button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/search" },
  { name: "Lists", href: "/lists" },
];

export default async function Navbar() {
  // Force dynamic evaluation so the navbar reflects auth state.
  cookies();
  const user = await getCurrentUser();

  const profileHref = user ? `/users/${user.username}` : "/sign-in";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 md:px-12">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
            PG
          </span>
          Pages
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-slate-900"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={profileHref}
            className="transition-colors hover:text-slate-900"
          >
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/users/${user.username}`}
                className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-white md:flex"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {user.username.slice(0, 2).toUpperCase()}
                </span>
                {user.username}
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
