import Link from "next/link";

import BookCard from "@/components/cards/book-card";
import ReviewList from "@/components/reviews/review-list";
import { books } from "@/data/mockData";
import { getCurrentUser } from "@/lib/auth";
import { getHomeFeed } from "@/lib/mockService";

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  const feed = await getHomeFeed(currentUser?.id);

  const highlightedBooks = books.slice(0, 4).map((book) => {
    const bookReviews = feed.filter((review) => review.book.id === book.id);
    const averageRating = bookReviews.length
      ? bookReviews.reduce((acc, review) => acc + review.rating, 0) /
        bookReviews.length
      : 0;

    return {
      book,
      averageRating,
    };
  });

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {currentUser ? `${currentUser.username}'s reading world` : "Your Pages feed"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Track what you read, share reviews with friends, and discover the next
            book worth staying up late for.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Community feed
            </h2>
            <Link
              href="/search"
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Find more books
            </Link>
          </div>
          <ReviewList reviews={feed} />
        </div>

        <aside className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900">
            Trending on Pages
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {highlightedBooks.map(({ book, averageRating }) => (
              <BookCard
                key={book.id}
                book={book}
                averageRating={averageRating || undefined}
                href={`/books/${book.id}`}
              />
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
