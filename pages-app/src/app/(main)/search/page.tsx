import Link from "next/link";

import BookCard from "@/components/cards/book-card";
import { getCurrentUser } from "@/lib/auth";
import { searchEntities } from "@/lib/mockService";

type Props = {
  searchParams?: { q?: string };
};

export default async function SearchPage({ searchParams }: Props) {
  const [currentUser, queryResults] = await Promise.all([
    getCurrentUser(),
    searchEntities(searchParams?.q?.trim() ?? ""),
  ]);

  const query = searchParams?.q?.trim() ?? "";
  const results = queryResults;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Search the Pages library
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Find books, people, and lists to follow. Try searching for genres like
            ?fantasy? or friends like ?alexreader?.
          </p>
        </div>
        <form method="get" className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row">
          <label className="sr-only" htmlFor="search">
            Search books or users
          </label>
          <input
            id="search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search books, authors, or users"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
        {currentUser && (
          <p className="text-xs text-slate-500">
            Tip: You&apos;re signed in as {currentUser.username}. Use search to follow more
            readers you trust.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Books
        </h2>
        {results.books.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                href={`/books/${book.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
            No books match ?{query}?. Try a different author, title, or genre.
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Readers
        </h2>
        {results.users.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.users.map((user) => (
              <li key={user.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href={`/users/${user.username}`}
                      className="text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {user.username}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {user.followers.length} followers ? {user.following.length} following
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {user.username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-xs text-slate-500">{user.bio}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
            No readers match that search yet.
          </div>
        )}
      </section>
    </div>
  );
}
