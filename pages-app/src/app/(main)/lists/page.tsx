import Link from "next/link";

import BookCard from "@/components/cards/book-card";
import { getAllLists } from "@/lib/mockService";

export default async function ListsPage() {
  const lists = await getAllLists();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Curated lists from the Pages community
        </h1>
        <p className="text-sm text-slate-500">
          Build collections around vibes, years, or goals. All lists here are built from
          our demo library so you can sketch future ideas.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {lists.map((list) => (
          <article
            key={list.id}
            id={list.id}
            className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{list.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{list.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
                  Curated by
                  <Link
                    href={`/users/${list.owner.username}`}
                    className="ml-2 font-semibold text-slate-700 underline-offset-2 hover:underline"
                  >
                    {list.owner.username}
                  </Link>
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {list.books.map((book) => (
                <BookCard key={book.id} book={book} href={`/books/${book.id}`} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
