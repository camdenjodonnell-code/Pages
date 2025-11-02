import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import ReviewForm from "@/components/reviews/review-form";
import ReviewList from "@/components/reviews/review-list";
import { getCurrentUser } from "@/lib/auth";
import { getBookDetail } from "@/lib/mockService";

type Props = {
  params: { bookId: string };
};

export default async function BookPage({ params }: Props) {
  const { bookId } = params;
  const [bookDetail, currentUser] = await Promise.all([
    getBookDetail(bookId),
    getCurrentUser(),
  ]);

  if (!bookDetail) {
    notFound();
  }

  const { book, averageRating, reviews, relatedLists } = bookDetail;

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-[280px_1fr]">
        <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
          <Image
            src={book.coverImage}
            alt={`${book.title} cover`}
            width={400}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
              {book.genre}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {book.title}
            </h1>
            <p className="text-lg text-slate-600">by {book.author}</p>
            <p className="text-sm leading-relaxed text-slate-600">
              {book.description}
            </p>
          </div>
          <div className="grid gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3">
            <div>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Published
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {new Date(book.publicationDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Average rating
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {averageRating ? `${averageRating.toFixed(1)} / 5` : "Not rated yet"}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Reviews
              </span>
              <p className="text-sm font-semibold text-slate-800">{reviews.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Reader reviews
            </h2>
            <span className="text-sm text-slate-500">
              Showing {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </div>
          <ReviewList reviews={reviews} showBook={false} />
        </section>

        <aside className="space-y-6">
          {currentUser ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Reviewing as
              <span className="ml-1 font-semibold text-slate-900">
                {currentUser.username}
              </span>
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              <p className="font-semibold">Want to review this book?</p>
              <p>
                <Link
                  href="/sign-in"
                  className="underline underline-offset-2 hover:text-amber-800"
                >
                  Sign in with a demo account
                </Link>{" "}
                to save your thoughts once authentication is wired up.
              </p>
            </div>
          )}
          <ReviewForm bookTitle={book.title} />

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              Featured in lists
            </h3>
            {relatedLists.length ? (
              <ul className="space-y-3 text-sm text-slate-600">
                {relatedLists.map((list) => (
                  <li key={list.id}>
                    <Link
                      href={`/lists#${list.id}`}
                      className="font-semibold text-slate-800 hover:text-slate-900 hover:underline"
                    >
                      {list.title}
                    </Link>
                    <p className="text-xs text-slate-500">{list.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                This title hasn&apos;t been added to any lists yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
