import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import BookCard from "@/components/cards/book-card";
import ReviewList from "@/components/reviews/review-list";
import { getUserProfile } from "@/lib/mockService";

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;
  const profile = await getUserProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm lg:flex-row lg:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
          <Image
            src={profile.avatar}
            alt={`${profile.username} avatar`}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {profile.username}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{profile.bio}</p>
          </div>
          <dl className="grid gap-4 text-sm text-slate-500 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <dt className="text-xs uppercase tracking-wide">Reviews</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {profile.stats.reviewsCount}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <dt className="text-xs uppercase tracking-wide">Lists</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {profile.stats.listsCount}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <dt className="text-xs uppercase tracking-wide">Followers</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {profile.stats.followersCount}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <dt className="text-xs uppercase tracking-wide">Following</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {profile.stats.followingCount}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent reviews</h2>
          <Link
            href="/search"
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Discover more books
          </Link>
        </div>
        <ReviewList reviews={profile.reviews} />
      </section>

      <section className="space-y-4" id="lists">
        <h2 className="text-lg font-semibold text-slate-900">
          {profile.username}&apos;s lists
        </h2>
        {profile.lists.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {profile.lists.map((list) => (
              <article
                key={list.id}
                id={list.id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {list.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{list.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {list.books.map((book) => (
                    <BookCard key={book.id} book={book} href={`/books/${book.id}`} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
            No lists yet. Once {profile.username} creates one, it will appear here.
          </div>
        )}
      </section>
    </div>
  );
}
