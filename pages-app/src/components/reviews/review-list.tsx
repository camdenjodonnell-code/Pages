import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";

import type { PopulatedReview } from "@/types";

type Props = {
  reviews: PopulatedReview[];
  showBook?: boolean;
};

export default function ReviewList({ reviews, showBook = true }: Props) {
  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <p className="text-sm font-medium text-slate-500">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id}>
          <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {review.user.username.slice(0, 2).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <Link
                    href={`/users/${review.user.username}`}
                    className="text-sm font-semibold text-slate-900 hover:underline"
                  >
                    {review.user.username}
                  </Link>
                  <time
                    dateTime={review.createdAt}
                    className="text-xs text-slate-500"
                  >
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                <StarIcon className="h-4 w-4" />
                {review.rating}/5
              </span>
            </header>

            {showBook && (
              <Link
                href={`/books/${review.book.id}`}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
              >
                {review.book.title} by {review.book.author}
              </Link>
            )}

            <p className="text-sm leading-relaxed text-slate-700">"{review.text}"</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
